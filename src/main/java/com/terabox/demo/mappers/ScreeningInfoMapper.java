package com.terabox.demo.mappers;

import com.terabox.demo.entities.ScreeningInfoEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ScreeningInfoMapper {
    int insertScreeningInfo(ScreeningInfoEntity screeningInfo);


}
