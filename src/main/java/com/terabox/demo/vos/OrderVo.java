package com.terabox.demo.vos;

import com.terabox.demo.entities.OrderEntity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class OrderVo extends OrderEntity {
    private String productName;
    private int productQuantity;

}
