package com.terabox.demo.mappers;

import com.terabox.demo.entities.ProductEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ProductMapper {
    ProductEntity selectProductByName(@Param("name") String name);
}
