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
    private int point;
    private int mileage;
    private boolean isAdmin;
}
