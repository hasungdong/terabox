package org.example.demo.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "admin")
public class AdminController {

    @PostMapping(value = "/addMovie", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postAddMovie(){
        return null;
    }
}
