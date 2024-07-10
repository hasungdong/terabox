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
//    private Integer productIndex; // 1
//    private int quantity; // 1
    private Integer productPaymentTargetIndex;

    private int price; // 1
    private int userCardMappingIndex;
    private LocalDateTime createdAt;

    private int totalSale; // 할인금액 1
    private int totalPrice; // 상품 총 금액 1

    @Override
    public String toString() {
        return "OrderEntity{" +
                "index=" + index +
                ", userEmail='" + userEmail + '\'' +
                ", movieReservationIndex=" + movieReservationIndex +
                ", productPaymentTargetIndex=" + productPaymentTargetIndex +
                ", price=" + price +
                ", userCardMappingIndex=" + userCardMappingIndex +
                ", createdAt=" + createdAt +
                ", totalSale=" + totalSale +
                ", totalPrice=" + totalPrice +
                '}';
    }
}
