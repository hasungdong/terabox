package com.terabox.demo.controllers;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.results.CommonResult;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;

@Controller
public abstract class AbstractGeneralController {
    protected <T> JSONObject parseResponse(SearchDto searchDto, T[] ts, String key) {
        JSONObject responseObject = new JSONObject();
        responseObject.put("search", new JSONObject(searchDto.toString()));
        responseObject.put(key, ts);
        if (ts == null) {
            responseObject.put("result", CommonResult.FAILURE.name().toLowerCase());
        } else {
            responseObject.put("result", CommonResult.SUCCESS.name().toLowerCase());
        }
        return responseObject;
    }
}
