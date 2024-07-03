package com.terabox.demo.services;

import com.terabox.demo.dtos.RegionCountDto;
import com.terabox.demo.dtos.ScreeningInfoDto;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.entities.SeatEntity;
import com.terabox.demo.entities.SeatPriceEntity;
import com.terabox.demo.entities.TheaterEntity;
import com.terabox.demo.mappers.BookingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {
  private final BookingMapper bookingMapper;

  public List<MovieEntity> getAllMovies(Integer userAge) {
    List<MovieEntity> allMovies = bookingMapper.selectAllMovies();
    System.out.println("Total movies fetched: " + allMovies.size()); // 콘솔 로그 추가

    if (userAge != null) {
      List<MovieEntity> filteredMovies = allMovies.stream()
              .filter(movie -> {
                int ageLimit = getAgeLimit(movie.getAgeLimit());
                System.out.println("Movie: " + movie.getTitle() + ", Age Limit: " + ageLimit); // 콘솔 로그 추가
                return userAge >= ageLimit;
              })
              .collect(Collectors.toList());
      System.out.println("Filtered movies based on age: " + filteredMovies.size()); // 콘솔 로그 추가
      return filteredMovies;
    }

    return allMovies;
  }

  private int getAgeLimit(String ageLimit) {
    switch (ageLimit) {
      case "12":
        return 12;
      case "15":
        return 15;
      case "19":
        return 19;
      case "all":
      default:
        return 0;
    }
  }

  public List<RegionCountDto> getTheaterCountsByRegion() {
    return bookingMapper.selectTheaterCountsByRegion();
  }

  public List<TheaterEntity> getTheatersByRegion(String region) {
    return bookingMapper.selectTheatersByRegion(region);
  }

  public List<ScreeningInfoDto> getScreeningInfoByTheaterAndMovie(List<Integer> theaterIndexes, List<Integer> movieIndexes, String date) {
    return bookingMapper.selectScreeningInfoByDateMoviesTheaters(date, movieIndexes, theaterIndexes);
  }

  public List<SeatEntity> getSeatsByScreeningInfo(int screeningInfoIndex) {
    return bookingMapper.selectSeatsByScreeningInfo(screeningInfoIndex);
  }

  public List<SeatPriceEntity> getSeatPrices() {
    return bookingMapper.selectSeatPrices();
  }
}
