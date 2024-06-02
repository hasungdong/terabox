package com.terabox.demo.mappers;

import com.terabox.demo.entities.EventEntity;
import com.terabox.demo.entities.ProductEntity;
import org.apache.ibatis.annotations.Mapper;
import com.terabox.demo.entities.MovieEntity;
import org.apache.ibatis.annotations.Param;

//adminMapper가 따로 있는 이유는 insert update delete를 관리자만 다룰 수 있기 때문에 다른 곳에선 admin용 기능에 접근 못하게 하려고 만들었음
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
