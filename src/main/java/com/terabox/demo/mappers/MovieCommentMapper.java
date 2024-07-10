package com.terabox.demo.mappers;


import com.terabox.demo.dtos.MovieCommentDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MovieCommentMapper {
    Double selectMovieGrade(@Param("movieIndex") int movieIndex);

    MovieCommentDto[] selectMovieNewest(@Param("movieIndex") int movieIndex, @Param("by")String by,@Param("countPerPage") int countPerPage,@Param("offset") int offset); //댓글 최신순 가져오기

    int selectCommentCount(int movieIndex);

}
