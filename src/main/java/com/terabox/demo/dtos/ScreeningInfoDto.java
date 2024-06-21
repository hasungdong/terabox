package com.terabox.demo.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScreeningInfoDto {
  private String screeningTime;
  private String playingTime;
  private String movieTitle;
  private String dimensionType;
  private String theaterName;
  private String cinemaNumber;
}
