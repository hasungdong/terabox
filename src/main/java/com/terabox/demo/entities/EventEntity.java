package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class EventEntity {
    private int index;
    private byte[] thumbnail;
    private String  title;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate startDate;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate endDate;
    private int discountRate;
    private String thumbnailFileName;
    private String thumbnailContentType;
}
