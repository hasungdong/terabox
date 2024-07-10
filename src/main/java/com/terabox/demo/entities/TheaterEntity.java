package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class TheaterEntity {
    private int index;
    private String name;
    private String regionCode;

    @Override
    public String toString() {
        return "TheaterEntity{" +
                "index=" + index +
                ", name='" + name + '\'' +
                ", regionCode='" + regionCode + '\'' +
                '}';
    }
}
