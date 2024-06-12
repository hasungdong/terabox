package com.terabox.demo.mappers;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.ProductEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface StoreMapper {
    ProductEntity selectProductByIndex(@Param("index") int index);

    ProductEntity[] selectProductsByName(@Param("name") String name);

    ProductEntity selectProductByNamePrice(@Param("name") String name,
                                              @Param("price") int price);

    int selectProductsCountBySearch(SearchDto searchDto);

    ProductEntity[] selectProductsBySearch(SearchDto searchDto);
}
