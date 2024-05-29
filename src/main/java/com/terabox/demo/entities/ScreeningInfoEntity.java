package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class ScreeningInfoEntity {
    private int index;
    private int movieIndex;
    private int eventIndex;
    private int theaterIndex;
    private LocalDateTime screeningDatetime;
    private int price;
}
