package com.terabox.demo.vos;

import com.terabox.demo.entities.ScreeningInfoEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ScreeningInfoVo extends ScreeningInfoEntity {
    private String theaterName;
    private int cinemaNumber;
    private String regionText;
    private String movieTitle;
}
