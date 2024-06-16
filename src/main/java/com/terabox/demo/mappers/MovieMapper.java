package com.terabox.demo.mappers;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.entities.ScreeningInfoEntity;
import com.terabox.demo.entities.TheaterEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;



@Mapper
public interface MovieMapper {
    MovieEntity selectMovieByIndex(@Param("index") int index);

    MovieEntity[] selectMoviesByTitle(@Param("title") String title);

    int selectMoviesCountBySearch(SearchDto searchDto);

    MovieEntity[] selectMoviesBySearch(SearchDto searchDto);


}
