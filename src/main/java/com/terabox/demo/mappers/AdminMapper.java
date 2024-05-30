package com.terabox.demo.mappers;

import com.terabox.demo.entities.EventEntity;
import com.terabox.demo.entities.ProductEntity;
import org.apache.ibatis.annotations.Mapper;
import com.terabox.demo.entities.MovieEntity;

@Mapper
public interface AdminMapper {
    int insertMovie(MovieEntity movie);

    int insertProduct(ProductEntity product);

    int insertEvent(EventEntity event);

    int updateMovie(MovieEntity movie);

    int updateProduct(ProductEntity product);

    int updateEvent(EventEntity event);

    int deleteMovie(MovieEntity movie);

    int deleteProduct(ProductEntity product);

    int deleteEvent(EventEntity event);
}
