package com.terabox.demo.mappers;

import com.terabox.demo.dtos.RegionCountDto;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.entities.TheaterEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BookingMapper {

  List<MovieEntity> selectAllMovies();
  List<MovieEntity> selectMoviesByScreeningDate(@Param("screeningDate") String screeningDate);
  List<RegionCountDto> selectTheaterCountsByRegion();
  TheaterEntity[] selectTheatersByRegion(@Param("region") String region);

}
