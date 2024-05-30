package org.example.demo.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "movie")
public class MovieController {

    @GetMapping(value = "allMovie", produces = MediaType.TEXT_HTML_VALUE)
    public String getAllMovie(){
        return "movie/allMovie";
    }

    @GetMapping(value = "allMovie/admin", produces = MediaType.TEXT_HTML_VALUE)
    public String getAllMovieAdmin(){
//        나중에 관리자 로그인인지 확인하는 로직 추가
        return "movie/allMovieAdmin";
    }
}
