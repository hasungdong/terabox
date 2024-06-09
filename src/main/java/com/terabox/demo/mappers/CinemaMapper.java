package com.terabox.demo.mappers;

import com.terabox.demo.entities.CinemaEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CinemaMapper {
    CinemaEntity[] selectCinemasByTheaterIndex(int theaterIndex);
}
