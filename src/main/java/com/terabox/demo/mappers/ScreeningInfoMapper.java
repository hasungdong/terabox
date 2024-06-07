package com.terabox.demo.mappers;

import com.terabox.demo.entities.ScreeningInfoEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;

@Mapper
public interface ScreeningInfoMapper {
    int insertScreeningInfo(ScreeningInfoEntity screeningInfo);

    int updateScreeningInfo(ScreeningInfoEntity screeningInfo);

    ScreeningInfoEntity[] selectScreeningInfoByDate(@Param("screeningDate")LocalDate screeningDate);

}
