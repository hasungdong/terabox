package com.terabox.demo.dtos;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
public class RegionCountDto {
  private String region;
  private int count;
}
