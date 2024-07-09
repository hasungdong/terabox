package com.terabox.demo.services;

import com.terabox.demo.entities.SeatPriceEntity;
import com.terabox.demo.mappers.SeatPriceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SeatPriceService {
    private final SeatPriceMapper seatPriceMapper;

    public SeatPriceEntity[] getSeatPrices(){
        return this.seatPriceMapper.selectSeatPrices();
    }
}
