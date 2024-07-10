package com.terabox.demo.dtos;


import com.terabox.demo.entities.MovieCommentEntity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class MovieCommentDto extends MovieCommentEntity {

    /*MovieCommentDto 의 부모 변수 까지 toString 하는법 */
    @Override
    public String toString() {
        return "{" +
                "\"commentLikeCount\":" + "\"" + commentLikeCount + "\"" +
                ", \"isSaved\":" + "\"" + isSaved + "\"" +
                ", " + super.toString() +
                '}';
    }

    // 댓글 좋아요 수 , 신고수
    private int commentLikeCount;
    private boolean isSaved;


}
