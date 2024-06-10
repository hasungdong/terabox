package com.terabox.demo.mappers;

import com.terabox.demo.vos.ScreeningInfoVo;
import com.terabox.demo.entities.ScreeningInfoEntity;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;

@Mapper
public interface ScreeningInfoMapper {
    int insertScreeningInfo(ScreeningInfoEntity screeningInfo);

    int updateScreeningInfo(ScreeningInfoEntity screeningInfo);

    ScreeningInfoEntity[] selectScreeningInfoByCinemaAndDate(LocalDate screeningDate, int cinemaIndex);

    ScreeningInfoVo[] selectScreeningInfoVoByCinemaAndDate(LocalDate screeningDate, int cinemaIndex);

}
