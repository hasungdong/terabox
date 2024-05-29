package com.terabox.demo.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "theater")
public class TheaterController {

    @GetMapping(value = "/list", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountGuide(){
        return "theater/list";
    }
}
