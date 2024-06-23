package com.terabox.demo.controllers;

import com.terabox.demo.services.CinemaService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "cinema")
@RequiredArgsConstructor
public class CinemaController {
    private final CinemaService cinemaService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getCinema(@RequestParam("theaterIndex") int theaterIndex){
        JSONObject responseObject = new JSONObject();
        responseObject.put("cinemas", this.cinemaService.getCinemas(theaterIndex));
        return responseObject.toString();
    }
}
