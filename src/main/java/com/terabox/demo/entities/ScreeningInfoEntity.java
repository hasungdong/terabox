package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class ScreeningInfoEntity {
    private int index;
    private Integer movieIndex;
    private int cinemaIndex;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate screeningDate;
    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime screeningTime;
}
