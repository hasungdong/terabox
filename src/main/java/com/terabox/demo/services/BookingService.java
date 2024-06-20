package com.terabox.demo.services;

import com.terabox.demo.dtos.RegionCountDto;
import com.terabox.demo.entities.MovieEntity;
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

  public List<MovieEntity> getMoviesByDate(String date) {
    return bookingMapper.selectMoviesByScreeningDate(date);
  }

  public List<RegionCountDto> getTheaterCountsByRegion() {
    return bookingMapper.selectTheaterCountsByRegion();
  }

  public List<TheaterEntity> getTheatersByRegion(String region) {
    return Arrays.asList(bookingMapper.selectTheatersByRegion(region));
  }
}

