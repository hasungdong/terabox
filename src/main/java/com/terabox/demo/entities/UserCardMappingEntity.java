package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"userEmail", "cardName"})
public class UserCardMappingEntity {
    private String userEmail;
    private String cardName;
}
