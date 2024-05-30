package org.example.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class SeatEntity {
    private int index;
    private int row;
    private int column;
    private int cinemaIndex;
    private boolean isReservation;
    private LocalDateTime screeningTime;
}
