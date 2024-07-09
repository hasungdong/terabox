package com.terabox.demo.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping(value = "/home", produces = MediaType.TEXT_HTML_VALUE)
    public String getIndex(){
        return "home";
    }

    @GetMapping(value = "/home2", produces = MediaType.TEXT_HTML_VALUE)
    public String getIndex2(){
        return "home2";
    }
}
