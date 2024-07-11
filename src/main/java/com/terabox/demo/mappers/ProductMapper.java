package com.terabox.demo.mappers;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.ProductEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ProductMapper {
    ProductEntity selectProductByIndex(@Param("index") int index);

    ProductEntity[] selectProductsByName(@Param("name") String name);

    ProductEntity selectProductByNamePrice(@Param("name") String name,
                                           @Param("price") int price);

    ProductEntity selectProductMaxSale();

    int selectProductsCountBySearch(SearchDto searchDto);

    ProductEntity[] selectProductsBySearch(SearchDto searchDto);

    ProductEntity[] selectProductsFourByTypeTicket();

    ProductEntity[] selectProductsFourByTypeDfg();
    ProductEntity[] selectProductsFourByTypePoint();

    int updateProduct(ProductEntity product);
}
