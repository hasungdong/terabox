package com.terabox.demo.controllers;

import com.terabox.demo.services.TheaterService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "theater")
@RequiredArgsConstructor
public class TheaterController {
    private final TheaterService theaterService;

//    theater/list html 페이지 보여주는거
    @GetMapping(value = "/list", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountGuide(){
        return "theater/list";
    }

//    db에 극장 이름들 불러오는거
    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getTheater(@RequestParam("regionCode") String regionCode) {
        JSONObject responseObject = new JSONObject();
        responseObject.put("theaters", this.theaterService.getTheaters(regionCode));
        return responseObject.toString();
    }
}
