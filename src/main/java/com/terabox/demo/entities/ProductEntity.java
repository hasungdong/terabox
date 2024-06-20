package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@EqualsAndHashCode(of = "name")
public class ProductEntity {
    private int index;
    private String name;
    private int price;
    private int quantity;
    private byte[] thumbnail;
    private String thumbnailFileName;
    private String thumbnailContentType;
    private String type;
    private String subTitle;
}
