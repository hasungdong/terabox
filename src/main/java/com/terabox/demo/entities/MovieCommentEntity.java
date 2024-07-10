package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class MovieCommentEntity {
    private int index;
    private int movieIndex;
    private String userEmail;
    private String content;
    private LocalDateTime createdAt;
    private int grade;
    private String favorite;

    @Override
    public String toString() {
        return "\"index\":" + index + "," +
                "\"movieIndex\":" + movieIndex + "," +
                "\"userEmail\":\"" + userEmail + "\"," +
                "\"content\":\"" + content + "\"," +
                "\"createdAt\":\"" + createdAt + "\"," +
                "\"grade\":" + grade + "," +
                "\"favorite\":\"" + favorite + "\"";
    }

}
