package org.example.demo.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StoreController {

    @GetMapping(value = "store", produces = MediaType.TEXT_HTML_VALUE)
    public String getIndex(){
        return "store/store";
    }
}
