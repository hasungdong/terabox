package com.terabox.demo.mappers;

import com.terabox.demo.entities.TheaterEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TheaterMapper {
    TheaterEntity[] selectTheatersByRegionCode(String regionCode);
}
