package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class ScreeningInfoEntity {
    private int index;
    private int movieIndex;
    private int eventIndex;
    private int theaterIndex;
    private LocalTime screeningTime;
    private LocalDate screeningDate;
    private int price;
}
