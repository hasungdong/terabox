package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"name", "discountRate"})
public class CardEntity {
    private String name;
    private int discountRate;
}
