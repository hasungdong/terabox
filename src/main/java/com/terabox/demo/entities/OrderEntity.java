package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class OrderEntity {
    private int index;
    private String userEmail;
    private Integer movieReservationIndex;
    private Integer productIndex;
    private int price;
    private int userCardMappingIndex;
    private int quantity;
    private LocalDateTime createdAt;
}
