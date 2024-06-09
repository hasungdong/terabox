package com.terabox.demo.controllers;

import com.terabox.demo.services.RegionService;
import com.terabox.demo.services.ScreeningInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Controller
@RequestMapping(value = "screeningInfo")
@RequiredArgsConstructor
public class ScreeningInfoController {
    private final ScreeningInfoService screeningInfoService;
    private final RegionService regionService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getScreeningInfo(@RequestParam("screeningDate")@DateTimeFormat(pattern = "yyyy-mm-dd") LocalDate screeningDate,
                                   @RequestParam("screeningTime") LocalTime screeningTime,
                                   @RequestParam("regionCode") String regionCode,
                                   @RequestParam("theaterName") String theaterName) {

        return null;
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postScreeningInfo(@RequestParam("screeningDate")@DateTimeFormat(pattern = "yyyy-mm-dd") LocalDate screeningDate,
                                   @RequestParam("cinemaNumber") int cinemaNumber,
                                   @RequestParam("regionCode") String regionCode,
                                   @RequestParam("theaterName") String theaterName) {


        return null;
    }
}
