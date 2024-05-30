package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class MovieEntity {
    private int index;
    private String title;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate releaseDate;
    private LocalTime playingTime;
    private byte[] thumbnail;
    private String thumbnailFileName;
    private String thumbnailContentType;
    private float grade;
    private int view;
    private boolean isSingle;
}