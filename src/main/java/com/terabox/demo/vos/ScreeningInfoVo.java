package com.terabox.demo.vos;

import com.terabox.demo.entities.ScreeningInfoEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalTime;

@Data
@EqualsAndHashCode(callSuper = true)
public class ScreeningInfoVo extends ScreeningInfoEntity {
    private String theaterName;
    private int cinemaNumber;
    private String regionText;
    private String movieTitle;
    private String movieDimensionType;
    private LocalTime moviePlayingTime;
    private String ageLimit;   // 추가된 필드

    @Override
    public String toString() {
        return "ScreeningInfoVo{" +
                "theaterName='" + theaterName + '\'' +
                ", cinemaNumber=" + cinemaNumber +
                ", regionText='" + regionText + '\'' +
                ", movieTitle='" + movieTitle + '\'' +
                ", movieDimensionType='" + movieDimensionType + '\'' +
                ", moviePlayingTime=" + moviePlayingTime +
                ", ageLimit='" + ageLimit + '\'' +
                '}';
    }
}
