package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class MovieCommentLikesEntity {
    private int index;
    private int movieCommentIndex;
    private String userEmail;
    private LocalDateTime createdAt;
}
