package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class CinemaEntity {
    private int index;
    private int theaterIndex;
    private int number;
}
