package org.example.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class ProductEntity {
    private int index;
    private String name;
    private int price;
    private int quantity;
    private byte[] thumbnail;
}
