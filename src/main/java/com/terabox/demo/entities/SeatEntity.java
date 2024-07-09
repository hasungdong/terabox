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
    private String seatStatus;
}
