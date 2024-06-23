package com.terabox.demo.mappers;

import com.terabox.demo.vos.ScreeningInfoVo;
import com.terabox.demo.entities.ScreeningInfoEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;

@Mapper
public interface ScreeningInfoMapper {
    int insertScreeningInfo(ScreeningInfoEntity screeningInfo);

    int updateScreeningInfoByIndex(ScreeningInfoEntity screeningInfo);

    ScreeningInfoEntity selectScreeningInfoByIndex(@Param("index") int index);

    ScreeningInfoEntity[] selectScreeningInfosByCinemaAndDate(LocalDate screeningDate, int cinemaIndex);

    ScreeningInfoVo[] selectScreeningInfoVoByCinemaAndDate(@Param("screeningDate") LocalDate screeningDate,
                                                           @Param("cinemaIndex") int cinemaIndex);

}
