package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode(of = "code")
@ToString
public class RegionEntity {
    private String code;
    private String text;
    private String populationRanking;
}
