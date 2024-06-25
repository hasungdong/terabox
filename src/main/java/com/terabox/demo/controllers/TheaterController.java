package com.terabox.demo.controllers;

import com.terabox.demo.services.EventService;
import com.terabox.demo.services.RegionService;
import com.terabox.demo.services.TheaterService;
import com.terabox.demo.vos.RegionVo;
import com.terabox.demo.vos.TheaterVo;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "theater")
@RequiredArgsConstructor
public class TheaterController {
    private final TheaterService theaterService;
    private final RegionService regionService;
    private final EventService eventService;

//    theater/list html 페이지 보여주는거
    @GetMapping(value = "/list", produces = MediaType.TEXT_HTML_VALUE)
    public String getList(Model model){
        RegionVo[] regions = this.regionService.getRegionsOnTheaterList();
        model.addAttribute("regionVos", regions);
        TheaterVo[] theaters = this.theaterService.getTheatersOnTheaterList();
        model.addAttribute("theaterVos", theaters);
        model.addAttribute("events", this.eventService.getEventsAll());
        model.addAttribute("eventTwo", this.eventService.getEventsTwoStartDate());
        return "theater/list";
    }

    @GetMapping(value = "/detail", produces = MediaType.TEXT_HTML_VALUE)
    public String getDetail(@RequestParam("index") int index, Model model){
        model.addAttribute("theater", this.theaterService.getTheater(index));
        RegionVo[] regions = this.regionService.getRegionsOnTheaterList();
        model.addAttribute("regionVos", regions);
        TheaterVo[] theaters = this.theaterService.getTheatersOnTheaterList();
        model.addAttribute("theaterVos", theaters);
        return "theater/detail";
    }

//    db에 극장 이름들 불러오는거
    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getTheater(@RequestParam("regionCode") String regionCode) {
        JSONObject responseObject = new JSONObject();
        responseObject.put("theaters", this.theaterService.getTheatersByRegionCode(regionCode));
        return responseObject.toString();
    }
}
