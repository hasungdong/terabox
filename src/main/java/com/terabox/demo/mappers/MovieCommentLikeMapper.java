package com.terabox.demo.mappers;


import com.terabox.demo.entities.MovieCommentLikesEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MovieCommentLikeMapper {
    int insertMovieCommentLike(MovieCommentLikesEntity movieCommentLikesEntity);

    int deleteMovieCommentLikeByEmail(@Param("movieCommentIndex")int movieCommentIndex,
                                      @Param("userEmail")String userEmail );

    MovieCommentLikesEntity selectCommentLikeByIndex(@Param("movieCommentIndex")int movieCommentIndex
            ,@Param("userEmail") String userEmail);

//    int selectCountCommentLikeBy(@Param("movieCommentIndex")int movieCommentIndex);



}
