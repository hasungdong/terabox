package com.terabox.demo.controllers;

import com.terabox.demo.entities.EmailAuthEntity;
import com.terabox.demo.entities.UserEntity;
import com.terabox.demo.exceptions.TransactionalException;
import com.terabox.demo.results.CommonResult;
import com.terabox.demo.results.Result;
import com.terabox.demo.services.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "user")
public class UserController {

    private final UserService userService;

    // 버튼을 눌렀을때 이메일 인증번호 보내기 6/10추가 (김성민)
    @PostMapping(value = "/registerEmail", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postRegisterThree(EmailAuthEntity emailAuth) throws MessagingException, NoSuchAlgorithmException {
        Result result = this.userService.sendRegisterEmail(emailAuth);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("salt", emailAuth.getSalt());
        }
        return responseObject.toString();
    }

    @PatchMapping(value = "/registerEmail", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchRegisterEmail(EmailAuthEntity emailAuth) {
        Result result = this.userService.verifyEmailAuth(emailAuth);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postIndex(EmailAuthEntity emailAuth, UserEntity user) {
        Result result = this.userService.register(emailAuth, user);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    // 카드 삽입
    @PostMapping(value = "/createCard", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postCreateCard(@RequestParam("email") String email) {
        Result result;
        try {
            result = this.userService.postCreateCard(email);
        } catch (TransactionalException exception) {
            result = CommonResult.FAILURE;
        }
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @GetMapping(value = "/email", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getEmail(@RequestParam("nickname") String nickname) {
        JSONObject responseObject = new JSONObject();
        String emailResult = this.userService.getEmailByNickname(nickname);
        if (emailResult == null) {
            responseObject.put("result", "failure");
        } else {
            responseObject.put("result", "success");
            responseObject.put("email", emailResult);
        }
        return responseObject.toString();
    }

    @PostMapping(value = "resetPasswordEmail", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postResetPasswordEmail(EmailAuthEntity emailAuth) throws MessagingException, NoSuchAlgorithmException {
        Result result = this.userService.sendResetPasswordEmail(emailAuth);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("salt", emailAuth.getSalt());
            System.out.println(emailAuth.getSalt());
        }
        return responseObject.toString();
    }

    @PatchMapping(value = "resetPasswordEmail", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchResetPasswordEmail(EmailAuthEntity emailAuth) {
        Result result = this.userService.verifyEmailAuth(emailAuth);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    @PatchMapping(value = "resetPassword", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchResetPassword(EmailAuthEntity emailAuth, UserEntity user) {
        Result result = this.userService.resetPassword(emailAuth, user);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    // 로그인 관련 컨트롤러
    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postLogin(HttpSession session, UserEntity user) {
        Result result = this.userService.login(user);
        if (result == CommonResult.SUCCESS) {
            session.setAttribute("user", user);
        }
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    @GetMapping(value = "/logout", produces = MediaType.TEXT_HTML_VALUE)
    public String getLogout(HttpSession session) {
        session.setAttribute("user", null);
        return "redirect:/";
    }
}
