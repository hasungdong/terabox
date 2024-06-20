package com.terabox.demo.services;

import com.terabox.demo.entities.EmailAuthEntity;
import com.terabox.demo.entities.UserEntity;
import com.terabox.demo.mappers.UserMapper;
import com.terabox.demo.misc.MailSender;
import com.terabox.demo.regexes.EmailAuthRegex;
import com.terabox.demo.regexes.UserRegex;
import com.terabox.demo.results.CommonResult;
import com.terabox.demo.results.Result;
import com.terabox.demo.results.user.RegisterResult;
import com.terabox.demo.results.user.SendRegisterEmailResult;
import com.terabox.demo.results.user.VerifyEmailAuthResult;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.token.Sha512DigestUtils;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine springTemplateEngine;

    // 이메일 인증번호 확인 서비스 로직
    private static void prepareEmailAuth(EmailAuthEntity emailAuth) throws NoSuchAlgorithmException {
        emailAuth.setCode(RandomStringUtils.randomNumeric(6)); // 랜덤한 6가지 문자열을 줌 -> setCode에 지정.
        emailAuth.setSalt(Sha512DigestUtils.shaHex(String.format("%s%s%f%f",
                emailAuth.getEmail(),
                emailAuth.getCode(),
                SecureRandom.getInstanceStrong().nextDouble(),
                SecureRandom.getInstanceStrong().nextDouble())));
        emailAuth.setCreatedAt(LocalDateTime.now());
        emailAuth.setExpiresAt(LocalDateTime.now().plusMinutes(3)); // 유효시간을 현재시간에서 + 3분으로 지정하였다.
        emailAuth.setExpired(false); // 만료됨을 false로
        emailAuth.setVerified(false); // 확인됨을 fasle로
        emailAuth.setUsed(false); // 사용됨을 false로
    }

    public Result sendRegisterEmail(EmailAuthEntity emailAuth) throws NoSuchAlgorithmException, MessagingException {
        if (emailAuth == null ||
                !EmailAuthRegex.email.tests(emailAuth.getEmail())) {
            return CommonResult.FAILURE;
        }
        if (this.userMapper.selectUserByEmail(emailAuth.getEmail()) != null) {
            return SendRegisterEmailResult.FAILURE_DUPLICATE_EMAIL;
        }
        prepareEmailAuth(emailAuth);
        if (this.userMapper.insertEmailAuth(emailAuth) != 1) {
            return CommonResult.FAILURE;
        }
        Context context = new Context();
        context.setVariable("code", emailAuth.getCode());

        new MailSender(this.mailSender)
                .setFrom("naakoko47@gmail.com")
                .setSubject("[TeraBox] 회원가입 인증번호")
                .setTo(emailAuth.getEmail())
                .setText(this.springTemplateEngine.process("user/resetPasswordEmail", context), true)
                .send();
        return CommonResult.SUCCESS;
    }

    // 인증번호 확인 로직
    public Result verifyEmailAuth(EmailAuthEntity emailAuth) {
        if (emailAuth == null) {
            return CommonResult.FAILURE;
        }
        if (!EmailAuthRegex.email.tests(emailAuth.getEmail()) ||
                !EmailAuthRegex.code.tests(emailAuth.getCode()) ||
                !EmailAuthRegex.salt.tests(emailAuth.getSalt())) {
            System.out.println(emailAuth.getEmail());
            System.out.println(emailAuth.getCode());
            System.out.println(emailAuth.getSalt());
            return CommonResult.FAILURE;
        }
        EmailAuthEntity dbEmailAuth = this.userMapper.selectEmailAuthByEmailCodeSalt(
                emailAuth.getEmail(),
                emailAuth.getCode(),
                emailAuth.getSalt());
        if (dbEmailAuth == null || dbEmailAuth.isVerified() || dbEmailAuth.isUsed()) {
            return CommonResult.FAILURE;
        }
        if (dbEmailAuth.isExpired() || dbEmailAuth.getExpiresAt().isBefore(LocalDateTime.now())) {
            return VerifyEmailAuthResult.FAILURE_EXPIRED;
        }
        dbEmailAuth.setVerified(true);
        return this.userMapper.updateEmailAuth(dbEmailAuth) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }

    @Transactional
    public Result register(EmailAuthEntity emailAuth, UserEntity user) {
        if (emailAuth == null ||
            !EmailAuthRegex.email.tests(emailAuth.getEmail()) ||
            !EmailAuthRegex.code.tests(emailAuth.getCode()) ||
            !EmailAuthRegex.salt.tests(emailAuth.getSalt()) ||
            user == null ||
            !UserRegex.email.tests(user.getEmail()) ||
            !UserRegex.password.tests(user.getPassword()) ||
            !UserRegex.nickname.tests(user.getNickname())) {
            System.out.println("정규화 안맞음");
            System.out.println(user.getEmail());
            System.out.println(user.getPassword());
            System.out.println(user.getNickname());
            return CommonResult.FAILURE;
        }
        EmailAuthEntity dbEmailAuth = this.userMapper.selectEmailAuthByEmailCodeSalt(emailAuth.getEmail(), emailAuth.getCode(), emailAuth.getSalt());
        if (dbEmailAuth == null || !dbEmailAuth.isVerified() || dbEmailAuth.isUsed()) {
            System.out.println("이메일 인증을 하지 않았음");
            return CommonResult.FAILURE;
        }
        if (this.userMapper.selectUserByEmail(emailAuth.getEmail()) != null) {
            System.out.println("이미 사용중인 이메일 입니다. (이메일 중복)");
            return RegisterResult.FAILURE_DUPLICATE_EMAIL;
        }
        if (this.userMapper.selectUserByNickname(user.getNickname()) != null) {
            System.out.println("이미 사용중인 닉네임 입니다. (닉네임 중복)");
            return RegisterResult.FAILURE_DUPLICATE_NICKNAME;
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword())); // 해시화 사용 유저의 비밀번호 <<
        user.setCreatedAt(LocalDateTime.now()); // 현재로
        user.setAdmin(false);
        user.setMembershipCode("일반");
        user.setPoint(0);
        user.setMileage(0);
        System.out.println(user.getEmail());
        System.out.println(user.getPassword());
        System.out.println(user.getNickname());
        System.out.println(user.getBirth());
        if (this.userMapper.insertUser(user) != 1) {
            System.out.println("insert 실패");
            return CommonResult.FAILURE;
        }
        dbEmailAuth.setUsed(true);
        return this.userMapper.updateEmailAuth(dbEmailAuth) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }

    public String getEmailByNickname(String nickname) {
        if (!UserRegex.nickname.tests(nickname)) {
            return null;
        }
        UserEntity dbUser = this.userMapper.selectUserByNickname(nickname);
        return dbUser != null
                ? dbUser.getEmail()
                : null;
    }

    public Result sendResetPasswordEmail(EmailAuthEntity emailAuth) throws MessagingException {
        if (emailAuth == null ||
                !EmailAuthRegex.email.tests(emailAuth.getEmail())) {
            return CommonResult.FAILURE;
        }
        if (this.userMapper.selectUserByEmail(emailAuth.getEmail()) == null) {
            return CommonResult.FAILURE;
        }
        Context context = new Context();
        context.setVariable("code", emailAuth.getCode());
        new MailSender(this.mailSender)
                .setFrom("naakoko47@gmail.com")
                .setSubject("[TeraBox] 비밀번호 재설정 인증번호")
                .setTo(emailAuth.getEmail())
                .setText(this.springTemplateEngine.process("user/resetPasswordEmail", context), true)
                .send();

        return CommonResult.SUCCESS;
    }

    @Transactional
    public Result resetPassword(EmailAuthEntity emailAuth, UserEntity user) {
        if (emailAuth == null ||
                !EmailAuthRegex.email.tests(emailAuth.getEmail()) ||
                !EmailAuthRegex.code.tests(emailAuth.getCode()) ||
                !EmailAuthRegex.salt.tests(emailAuth.getSalt()) ||
                user == null ||
                !UserRegex.email.tests(user.getEmail()) ||
                !UserRegex.password.tests(user.getPassword())) {
            return CommonResult.FAILURE;
        }

        EmailAuthEntity dbEmailAuth = this.userMapper.selectEmailAuthByEmailCodeSalt(emailAuth.getEmail(), emailAuth.getCode(), emailAuth.getSalt());
        if (dbEmailAuth == null || !dbEmailAuth.isVerified() || dbEmailAuth.isUsed()) {
            return CommonResult.FAILURE;
        }
        user.setCreatedAt(LocalDateTime.now());
        user.setAdmin(false);
        user.setMembershipCode("일반"); // 이거 물어보기
        user.setMileage(0);
        user.setPoint(0);
        dbEmailAuth.setUsed(true);

        this.userMapper.updateEmailAuth(dbEmailAuth);

        UserEntity dbUser = this.userMapper.selectUserByEmail(user.getEmail());
        dbUser.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return this.userMapper.updateUser(dbUser) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }


    public Result login(UserEntity user) {
        if (user == null ||
                !UserRegex.email.tests(user.getEmail()) ||
                !UserRegex.password.tests(user.getPassword())) {
            return CommonResult.FAILURE;
        }
        UserEntity dbUser = this.userMapper.selectUserByEmail(user.getEmail());
        if (!BCrypt.checkpw(user.getPassword(), dbUser.getPassword())) {
            return CommonResult.FAILURE;
        }
        user.setEmail(dbUser.getEmail());
        user.setPassword(dbUser.getPassword());
        user.setNickname(dbUser.getNickname());
        user.setCreatedAt(dbUser.getCreatedAt());
        user.setAdmin(dbUser.isAdmin());
        user.setMembershipCode(dbUser.getMembershipCode());
        user.setPoint(dbUser.getPoint());
        user.setMileage(dbUser.getMileage());

        return CommonResult.SUCCESS;
    }
}
