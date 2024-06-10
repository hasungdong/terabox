package com.terabox.demo.controllers;

import com.terabox.demo.services.ScreeningInfoService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.json.JSONObject;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Controller
@RequestMapping(value = "screeningInfo")
@RequiredArgsConstructor
public class ScreeningInfoController {
    private final ScreeningInfoService screeningInfoService;

//    한 관에 대해 하루치의 상영정보들 받아오기
    @GetMapping(value = "/vo", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getScreeningInfoVo(@DateTimeFormat(pattern = "yyyy-mm-dd")@RequestParam("screeningDate") LocalDate screeningDate,
                                   @RequestParam("cinemaIndex") int cinemaIndex) {
        JSONObject responseObject = new JSONObject();
        responseObject.put("screeningInfoVos", this.screeningInfoService.getScreeningInfoVos(screeningDate, cinemaIndex));
        return responseObject.toString();
    }

//    상영정보 부분 수정
    @PatchMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchScreeningInfo(@Param("index") int index,
                                     @Param("movieIndex") int movieIndex) {
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", this.screeningInfoService.patchScreeningInfo(index, movieIndex).name().toLowerCase());
        return responseObject.toString();
    }
}
