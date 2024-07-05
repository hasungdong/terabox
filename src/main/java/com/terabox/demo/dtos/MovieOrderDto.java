package com.terabox.demo.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;

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

    @Override
    public String toString() {
        return "MovieOrderDto{" +
                "adultCount=" + adultCount +
                ", teenagerCount=" + teenagerCount +
                ", oldCount=" + oldCount +
                ", disabledCount=" + disabledCount +
                ", seatIndexes=" + Arrays.toString(seatIndexes) +
                ", screeningInfoIndex=" + screeningInfoIndex +
                ", cardName='" + cardName + '\'' +
                '}';
    }

}
