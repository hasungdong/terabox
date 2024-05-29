package com.terabox.demo.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "event")
public class EventController {

    @GetMapping(value = "/proceedingEvent", produces = MediaType.TEXT_HTML_VALUE)
    public String getIndex(){
        return "event/proceedingEvent";
    }

    @GetMapping(value = "/pastEvent")
    public String getEnd(){
        return "event/pastEvent";
    }
}
