package com.terabox.demo.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MovieOrderDto {
    private int adultCount;
    private int teenagerCount;
    private int oldCount;
    private int disabledCount;
    private int[] seatIndexes;
    private int screeningInfoIndex;
    private String cardName;
}
