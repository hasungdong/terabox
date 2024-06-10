package com.terabox.demo.vos;

import com.terabox.demo.entities.ScreeningInfoEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalTime;

@Data
@EqualsAndHashCode(callSuper = true)
public class ScreeningInfoVo extends ScreeningInfoEntity {
    private String theaterName;
    private String regionCode;
    private int cinemaNumber;
    private String movieTitle;
    private LocalTime playingTime;
}
