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

    private int totalSale; // 할인금액
    private int totalPrice; // 상품 총 금액

    @Override
    public String toString() {
        return "OrderEntity{" +
                "index=" + index +
                ", userEmail='" + userEmail + '\'' +
                ", movieReservationIndex=" + movieReservationIndex +
                ", productIndex=" + productIndex +
                ", price=" + price +
                ", userCardMappingIndex=" + userCardMappingIndex +
                ", quantity=" + quantity +
                ", createdAt=" + createdAt +
                ", totalSale=" + totalSale +
                ", totalPrice=" + totalPrice +
                '}';
    }
}
