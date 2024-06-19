package com.terabox.demo.dtos;

import lombok.Data;


@Data
public class ProductDto {
    private int inputText;
    private String price;//안됐던 이유가 price 는 콤마를 찍고 문자열로 바꼈기 때문이다.
    private int totalSale;




}
