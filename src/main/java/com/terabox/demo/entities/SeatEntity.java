package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class SeatEntity {
    private int index;
    private int row;
    private int column;
    private int cinemaIndex;
    private String seatStatusType;
    private LocalDate screeningDate;
    private LocalTime screeningTime;

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
