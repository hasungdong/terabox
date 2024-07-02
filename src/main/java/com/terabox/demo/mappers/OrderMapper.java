package com.terabox.demo.mappers;

import com.terabox.demo.entities.MovieReservationEntity;
import com.terabox.demo.entities.OrderEntity;
import com.terabox.demo.vos.OrderVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OrderMapper {
    int insertOrder(OrderEntity order);

    int insertMovieReservation(MovieReservationEntity movieReservation);

    OrderVo[] selectEmailByList(@Param("email") String email);

    MovieReservationEntity selectMovieReservationBySeatScreeningInfo(
            @Param("screeningInfoIndex") int screeningInfoIndex,
            @Param("seatIndex") int seatIndex);






}
