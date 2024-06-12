package com.terabox.demo.services;

import com.terabox.demo.entities.RegionEntity;
import com.terabox.demo.mappers.RegionMapper;
import com.terabox.demo.vos.RegionVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegionService {
    private final RegionMapper regionMapper;

    public RegionVo[] getRegionsOnTheaterList(){
        return this.regionMapper.selectRegionsOnTheaterList();
    }

    public RegionEntity[] getRegions(){
        return this.regionMapper.selectRegions();
    }
}
