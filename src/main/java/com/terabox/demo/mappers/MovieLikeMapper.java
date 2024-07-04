package com.terabox.demo.mappers;

import com.terabox.demo.entities.MovieLikeEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

@Mapper
public interface MovieLikeMapper {

    //영화 좋아요
    int insertMovieLike(MovieLikeEntity movieLikeEntity);

    int deleteMovieLikeByEmail(@Param("movieIndex")int movieIndex,@Param("userEmail")String userEmail);

    MovieLikeEntity selectMovieLikeByIndex(@Param("movieIndex")int movieIndex
            ,@Param("userEmail") String userEmail);

    int selectMovieCountByIndex(@RequestParam("movieIndex")int movieIndex);
}
