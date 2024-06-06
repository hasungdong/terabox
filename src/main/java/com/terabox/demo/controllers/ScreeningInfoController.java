package com.terabox.demo.controllers;

import com.terabox.demo.services.ScreeningInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.time.LocalTime;

@Controller
@RequestMapping(value = "screeningInfo")
@RequiredArgsConstructor
public class ScreeningInfoController {
    private final ScreeningInfoService screeningInfoService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getScreeningInfo(@RequestParam("screeningDate")@DateTimeFormat(pattern = "yyyy-mm-dd") LocalDate screeningDate,
                                   @RequestParam("screeningTime") LocalTime screeningTime,
                                   @RequestParam("regionCode") String regionCode,
                                   @RequestParam("theaterName") String theaterName) {

        return null;
    }
}
