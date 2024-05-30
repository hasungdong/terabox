package org.example.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class OrderEntity {
    private int index;
    private String  userEmail;
    private int movieReservationIndex;
    private int productIndex;
    private int price;
    private LocalDateTime createdAt;
}
