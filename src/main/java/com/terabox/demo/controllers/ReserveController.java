package com.terabox.demo.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "booking")
public class ReserveController {
    @GetMapping(value = "reserve", produces = MediaType.TEXT_HTML_VALUE)
    public String getBooking() {

        return "booking/reserve";
    }
}