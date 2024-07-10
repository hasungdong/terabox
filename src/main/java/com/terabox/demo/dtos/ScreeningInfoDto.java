package com.terabox.demo.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScreeningInfoDto {
  private int index;
  private String screeningTime;
  private String endTime;
  private String playingTime;
  private String movieTitle;
  private String dimensionType;
  private String theaterName;
  private String cinemaNumber;
  private byte[] thumbnail;  // 추가된 필드
  private String ageLimit;   // 추가된 필드
  private String screeningDate; // 추가된 필드
}

