package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "email")
public class UserEntity {
    private String email;
    private String password;
    private String nickname;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate birth;
    private String membershipCode;
    private LocalDateTime createdAt;
//    private int point; 유저에 카드가 통장처럼 사용되는 중이라 유저에 포인트가 있으면 안됨
    private int mileage;
    private boolean isAdmin;
}