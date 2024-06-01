package com.terabox.demo.mappers;

import com.terabox.demo.entities.EventEntity;
import com.terabox.demo.entities.ProductEntity;
import org.apache.ibatis.annotations.Mapper;
import com.terabox.demo.entities.MovieEntity;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AdminMapper {
    int insertMovie(MovieEntity movie);

    int insertProduct(ProductEntity product);

    int insertEvent(EventEntity event);

    int updateMovie(MovieEntity movie);

    int updateProduct(ProductEntity product);

    int updateEvent(EventEntity event);

    int deleteMovieByIndex(@Param("index") int index);

    int deleteProductByIndex(@Param("index") int index);

    int deleteEventByIndex(@Param("index") int index);
}
