package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "email")
public class UserEntity {
    private String email;
    private String password;
    private String nickname;
    private LocalDateTime birth;
    private String address;
    private String membershipCode;
    private LocalDateTime createdAt;
    private int point;
    private int mileage;
    private boolean isAdmin;
}
