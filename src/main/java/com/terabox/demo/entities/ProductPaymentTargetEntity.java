package com.terabox.demo.entities;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class ProductPaymentTargetEntity {
    private Integer index;
    private int productIndex;
    private int quantity;
}
