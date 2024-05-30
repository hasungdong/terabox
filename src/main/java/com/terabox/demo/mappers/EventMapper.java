package com.terabox.demo.mappers;

import com.terabox.demo.entities.EventEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface EventMapper {
    EventEntity selectEventByTitle(@Param("title") String title);
}
