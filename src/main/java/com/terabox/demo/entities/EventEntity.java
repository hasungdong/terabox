package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class EventEntity {
    private int index;
    private byte[] thumbnail;
    private String  title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int discountRate;
    private String thumbnailFileName;
    private String thumbnailContentType;
}
