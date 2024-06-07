package com.terabox.demo.controllers;

import com.terabox.demo.services.RegionService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "region")
@RequiredArgsConstructor
public class RegionController {
    private final RegionService regionService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getRegions(){
        JSONObject responseObject = new JSONObject();
        responseObject.put("regions", regionService.getRegions());
        return responseObject.toString();
    }
}
