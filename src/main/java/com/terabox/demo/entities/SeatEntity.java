package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class SeatEntity {
    private int index;
    private int row;
    private int column;
    private int cinemaIndex;
    private String seatStatusType;

    @Override
    public String toString() {
        return "SeatEntity{" +
                "index=" + index +
                ", row=" + row +
                ", column=" + column +
                ", cinemaIndex=" + cinemaIndex +
                ", seatStatusType='" + seatStatusType + '\'' +
                '}';
    }
}
