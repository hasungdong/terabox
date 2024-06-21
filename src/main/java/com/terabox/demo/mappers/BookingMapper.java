package com.terabox.demo.mappers;

import com.terabox.demo.dtos.RegionCountDto;
import com.terabox.demo.dtos.ScreeningInfoDto;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.entities.ScreeningInfoEntity;
import com.terabox.demo.entities.TheaterEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BookingMapper {

  List<MovieEntity> selectAllMovies();
  List<RegionCountDto> selectTheaterCountsByRegion();
  List<TheaterEntity> selectTheatersByRegion(@Param("region") String region);

  List<ScreeningInfoDto> selectScreeningInfoByDateMovieTheater(
          @Param("screeningDate") String screeningDate,
          @Param("movieIndex") int movieIndex,
          @Param("cinemaIndex") int cinemaIndex
  );
}



