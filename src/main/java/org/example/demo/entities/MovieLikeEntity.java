package org.example.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class MovieLikeEntity {
    private int index;
    private int movieIndex;
    private String  userEmail;
    private LocalDateTime createdAt;
}
