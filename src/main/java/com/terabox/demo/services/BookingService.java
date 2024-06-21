package com.terabox.demo.services;

import com.terabox.demo.dtos.RegionCountDto;
import com.terabox.demo.dtos.ScreeningInfoDto;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.entities.ScreeningInfoEntity;
import com.terabox.demo.entities.TheaterEntity;
import com.terabox.demo.mappers.BookingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {
  private final BookingMapper bookingMapper;

  public List<MovieEntity> getAllMovies() {
    return bookingMapper.selectAllMovies();
  }

  public List<RegionCountDto> getTheaterCountsByRegion() {
    return bookingMapper.selectTheaterCountsByRegion();
  }

  public List<TheaterEntity> getTheatersByRegion(String region) {
    return bookingMapper.selectTheatersByRegion(region);
  }

  public List<ScreeningInfoDto> getScreeningInfoByDateMovieTheater(String date, int movieIndex, int cinemaIndex) {
    return bookingMapper.selectScreeningInfoByDateMovieTheater(date, movieIndex, cinemaIndex);
  }
}



