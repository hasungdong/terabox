package com.terabox.demo.mappers;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.EventEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface EventMapper {

    EventEntity selectEventByIndex(@Param("index") int index);
    EventEntity[] selectEventsByTitle(@Param("title") String title);

    int selectEventsCountBySearch(SearchDto searchDto);

    EventEntity[] selectEventsBySearch(SearchDto searchDto);

}
