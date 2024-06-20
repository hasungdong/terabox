package com.terabox.demo.mappers;

import com.terabox.demo.entities.EmailAuthEntity;
import com.terabox.demo.entities.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    int insertEmailAuth(EmailAuthEntity emailAuth);

    int insertUser(UserEntity user);

    EmailAuthEntity selectEmailAuthByEmailCodeSalt(@Param("email") String email,
                                                   @Param("code") String code,
                                                   @Param("salt") String salt);

    UserEntity selectUserByEmail(@Param("email") String email);

    UserEntity selectUserByNickname(@Param("nickname") String nickname);

    int updateEmailAuth(EmailAuthEntity emailAuth); // EmailAuthEntity 이메일 인증 데이터 업데이트

    int updateUser(UserEntity userEntity);
}
