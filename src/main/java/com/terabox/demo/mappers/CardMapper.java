package com.terabox.demo.mappers;

import com.terabox.demo.entities.CardEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestParam;

@Mapper
public interface CardMapper {
    CardEntity selectCard(@RequestParam("selectedValue")String selectedValue);

}
