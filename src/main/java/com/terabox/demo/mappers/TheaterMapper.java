package com.terabox.demo.mappers;

import com.terabox.demo.entities.TheaterEntity;
import com.terabox.demo.vos.TheaterVo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TheaterMapper {
    TheaterEntity[] selectTheatersByRegionCode(String regionCode);

    TheaterVo[] selectTheatersOnTheaterList();

    TheaterEntity selectTheaterByIndex(int index);
}
