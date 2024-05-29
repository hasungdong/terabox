package com.terabox.demo.mappers;

import com.terabox.demo.entities.MovieEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MovieMapper {
    MovieEntity selectMovieByIndex(@Param("index") int index);

    MovieEntity[] selectMoviesByTitle(@Param("title") String title);
}
