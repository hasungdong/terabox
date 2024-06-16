package com.terabox.demo.mappers;

import com.terabox.demo.dtos.RegionCountDto;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.entities.TheaterEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BookingMapper {

  List<MovieEntity> selectMoviesByScreeningDate(@Param("screeningDate") String screeningDate);

  List<RegionCountDto> selectTheaterCountsByRegion();
  TheaterEntity[] selectTheatersByRegion(@Param("region") String region);

}

//  TheaterEntity[] selectTheatersByScreeningDate(@Param("screeningDate") String screeningDate);
//  TheaterEntity[] selectTheatersByDateAndMovie(@Param("screeningDate") String screeningDate,
//                                               @Param("movieIndex") int movieIndex);
//  ScreeningInfoEntity[] selectScreeningTimes(@Param("screeningDate") String screeningDate,
//                                             @Param("movieIndex") int movieIndex,
//                                             @Param("cinemaIndex") int cinemaIndex);