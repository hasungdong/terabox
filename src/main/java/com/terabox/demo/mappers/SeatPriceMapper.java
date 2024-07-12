package com.terabox.demo.mappers;

import com.terabox.demo.entities.SeatEntity;
import com.terabox.demo.entities.SeatPriceEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SeatPriceMapper {
    SeatPriceEntity[] selectSeatPrices();

    SeatEntity selectSeatsByIndex(int index);

    int updateSeat(SeatEntity seat);
}
