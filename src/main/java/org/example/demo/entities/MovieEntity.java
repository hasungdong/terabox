package org.example.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class MovieEntity {
    private int index;
    private String  name;
    private LocalDateTime releaseDate;
    private LocalDateTime playingTime;
    private byte[] thumbnail;
    private float grade;
    private int view;
    private boolean isSingle;
}
