package com.terabox.demo.dtos;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@EqualsAndHashCode
public class ScreeningInfoGetDto {
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate screeningDate;
    private int cinemaIndex;
}
