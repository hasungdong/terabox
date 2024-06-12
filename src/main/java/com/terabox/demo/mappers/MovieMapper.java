package com.terabox.demo.mappers;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.MovieEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;

@Mapper
public interface MovieMapper {
    MovieEntity selectMovieByIndex(@Param("index") int index);

    MovieEntity selectMovieByTitleReleaseDate(@Param("title") String title,
                                              @Param("releaseDate") LocalDate releaseDate);

    MovieEntity[] selectMoviesByTitle(@Param("title") String title);

    int selectMoviesCountBySearch(SearchDto searchDto);

    MovieEntity[] selectMoviesBySearch(SearchDto searchDto);
}
