package com.terabox.demo.controllers;

import com.terabox.demo.results.Result;
import lombok.RequiredArgsConstructor;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.services.AdminService;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequestMapping(value = "/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping(value = "/addMovie", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postAddMovie(@RequestParam("_thumbnail") MultipartFile thumbnail,
                               MovieEntity movie) throws IOException {
        movie.setThumbnail(thumbnail.getBytes());
        movie.setThumbnailFileName(thumbnail.getName());
        movie.setThumbnailContentType(thumbnail.getContentType());
        Result result = this.adminService.addMovie(movie);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @PostMapping(value = "/addProduct", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postAddProduct(){
        return null;
    }
}
