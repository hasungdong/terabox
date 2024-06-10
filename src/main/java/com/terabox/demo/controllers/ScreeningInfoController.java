package com.terabox.demo.controllers;

import com.terabox.demo.dtos.ScreeningInfoGetDto;
import com.terabox.demo.services.RegionService;
import com.terabox.demo.services.ScreeningInfoService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
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
    public String getScreeningInfo(@DateTimeFormat(pattern = "yyyy-mm-dd")@RequestParam("screeningDate") LocalDate screeningDate,
                                   @RequestParam("cinemaIndex") int cinemaIndex) {
        JSONObject responseObject = new JSONObject();
        responseObject.put("screeningInfo", this.screeningInfoService.getScreeningInfo(screeningDate, cinemaIndex));
        return responseObject.toString();
    }

    @GetMapping(value = "/vo", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getScreeningInfoVo(@DateTimeFormat(pattern = "yyyy-mm-dd")@RequestParam("screeningDate") LocalDate screeningDate,
                                   @RequestParam("cinemaIndex") int cinemaIndex) {
        JSONObject responseObject = new JSONObject();
        responseObject.put("screeningInfo", this.screeningInfoService.getScreeningInfoVos(screeningDate, cinemaIndex));
        return responseObject.toString();
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
