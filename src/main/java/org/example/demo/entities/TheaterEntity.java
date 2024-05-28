package org.example.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class TheaterEntity {
    private int index;
    private String  name;
    private String  regionCode;
}
