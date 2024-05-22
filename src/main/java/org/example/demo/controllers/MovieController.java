package org.example.demo.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "movie")
public class MovieController {

    @GetMapping(value = "allMovie", produces = MediaType.TEXT_HTML_VALUE)
    public String getIndex(){
        return "movie/allMovie";
    }
}
