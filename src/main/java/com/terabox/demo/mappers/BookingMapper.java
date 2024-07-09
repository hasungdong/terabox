package com.terabox.demo.mappers;

import com.terabox.demo.dtos.RegionCountDto;
import com.terabox.demo.dtos.ScreeningInfoDto;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.entities.SeatEntity;
import com.terabox.demo.entities.SeatPriceEntity;
import com.terabox.demo.entities.TheaterEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BookingMapper {
  List<MovieEntity> selectAllMovies();
  List<RegionCountDto> selectTheaterCountsByRegion();
  List<TheaterEntity> selectTheatersByRegion(@Param("region") String region);
  List<ScreeningInfoDto> selectScreeningInfoByDateMoviesTheaters(
          @Param("screeningDate") String screeningDate,
          @Param("movieIndexes") List<Integer> movieIndexes,
          @Param("theaterIndexes") List<Integer> theaterIndexes);
  List<SeatEntity> selectSeatsByScreeningInfo(@Param("screeningInfoIndex") int screeningInfoIndex);
  List<SeatPriceEntity> selectSeatPrices();
}
