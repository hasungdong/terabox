package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"index"})
public class UserCardEntity {
    private int index;
    private String userEmail;
    private String cardName;
    private int point;
}
