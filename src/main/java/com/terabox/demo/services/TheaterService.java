package com.terabox.demo.services;

import com.terabox.demo.entities.TheaterEntity;
import com.terabox.demo.mappers.TheaterMapper;
import com.terabox.demo.vos.TheaterVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TheaterService {
    private final TheaterMapper theaterMapper;

    public TheaterEntity[] getTheatersByRegionCode(String regionCode) {
        return this.theaterMapper.selectTheatersByRegionCode(regionCode);
    }


    public TheaterVo[] getTheatersOnTheaterList(){
        return this.theaterMapper.selectTheatersOnTheaterList();
    }
}
