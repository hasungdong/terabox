package com.terabox.demo.controllers;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.EventEntity;
import com.terabox.demo.results.CommonResult;
import com.terabox.demo.results.Result;
import com.terabox.demo.services.EventService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "event")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping(value = "/proceedingEvent", produces = MediaType.TEXT_HTML_VALUE)
    public String getIndex(){
        return "event/proceedingEvent";
    }

    @GetMapping(value = "/pastEvent")
    public String getEnd(){
        return "event/pastEvent";
    }

    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getSearch(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                            SearchDto searchDto){
        searchDto.setRequestPage(page);
        EventEntity[] events = this.eventService.getEvents(searchDto);
        JSONObject responseObject = new JSONObject();
        responseObject.put("search", searchDto);
        responseObject.put("events", events);
        if (events == null){
            responseObject.put("result", CommonResult.FAILURE);
        } else {
            responseObject.put("result", CommonResult.SUCCESS);
        }
        return responseObject.toString();
    }
}
