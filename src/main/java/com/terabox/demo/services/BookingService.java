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

/*  등록된 모든영화를 부르는 창 */
  public List<MovieEntity> getAllMovies(Integer userAge) {
    List<MovieEntity> allMovies = bookingMapper.selectAllMovies();
//유저의 나이에 따라 영화 분류
    if (userAge != null) {
      return allMovies.stream()
        .filter(movie -> {
          int ageLimit;
          switch (movie.getAgeLimit()) {
            case "12":
              ageLimit = 12;
              break;
            case "15":
              ageLimit = 15;
              break;
            case "19":
              ageLimit = 19;
              break;
            case "all":
            default:
              ageLimit = 0;
          }
          return userAge >= ageLimit;
        })
        .collect(Collectors.toList());
    }

    return allMovies;
  }

/*  지역별 영화 분류하여 카운트*/
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