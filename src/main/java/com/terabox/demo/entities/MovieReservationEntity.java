package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class MovieReservationEntity {
    private int index;
    private int seatIndex;
    private int screeningInfoIndex;
    private int price;
}
