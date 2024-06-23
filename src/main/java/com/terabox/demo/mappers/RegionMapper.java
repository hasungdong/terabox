package com.terabox.demo.mappers;

import com.terabox.demo.entities.RegionEntity;
import com.terabox.demo.vos.RegionVo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RegionMapper {
    RegionEntity[] selectRegions();

    RegionVo[] selectRegionsOnTheaterList();


}
