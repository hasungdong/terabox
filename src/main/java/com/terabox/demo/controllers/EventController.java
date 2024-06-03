package com.terabox.demo.controllers;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.EventEntity;
import com.terabox.demo.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "event")
@RequiredArgsConstructor
public class EventController extends AbstractGeneralController{
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
        return this.parseResponse(searchDto, events, "events").toString();
//        JSONObject responseObject = new JSONObject();
//        responseObject.put("search", searchDto);
//        responseObject.put("events", events);
//        if (events == null){
//            responseObject.put("result", CommonResult.FAILURE.name().toLowerCase());
//        } else {
//            responseObject.put("result", CommonResult.SUCCESS.name().toLowerCase());
//        }
//        return responseObject.toString();
    }

    @GetMapping(value = "/image")
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@RequestParam(value = "index", required = false, defaultValue = "0") int index){
        EventEntity event = this.eventService.getEvent(index);
        byte[] thumbnail = event.getThumbnail();
        if (thumbnail == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentLength(thumbnail.length)
                .contentType(MediaType.parseMediaType(event.getThumbnailContentType()))
                .body(thumbnail);
    }
}
