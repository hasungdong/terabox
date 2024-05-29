package com.terabox.demo.mappers;

import org.apache.ibatis.annotations.Mapper;
import com.terabox.demo.entities.MovieEntity;

@Mapper
public interface AdminMapper {
    int insertMovie(MovieEntity movie);


}
