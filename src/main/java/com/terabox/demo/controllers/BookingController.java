package com.terabox.demo.controllers;


import com.terabox.demo.dtos.RegionCountDto;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.entities.TheaterEntity;
import com.terabox.demo.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequiredArgsConstructor
@RequestMapping(value = "booking")
public class BookingController {

  private final BookingService bookingService;

  @GetMapping(value = "", produces = MediaType.TEXT_HTML_VALUE)
  public String getBooking() {
    return "booking/booking";
  }

  @PostMapping(value = "/movie", produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public List<MovieEntity> getMoviesByDate(@RequestParam("date") String date) {
    return bookingService.getMoviesByDate(date);
  }

  @PostMapping(value = "/theaters/count-by-region", produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public List<RegionCountDto> getTheaterCountsByRegion() {
    return bookingService.getTheaterCountsByRegion();
  }

  @PostMapping(value = "/theaters/by-region", produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public List<TheaterEntity> getTheatersByRegion(@RequestParam("region") String region) {
    return bookingService.getTheatersByRegion(region);
  }
}
