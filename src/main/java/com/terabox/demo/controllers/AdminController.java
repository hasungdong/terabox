package com.terabox.demo.controllers;

import com.terabox.demo.entities.EventEntity;
import com.terabox.demo.entities.ProductEntity;
import com.terabox.demo.results.Result;
import lombok.RequiredArgsConstructor;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.services.AdminService;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
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
    public String postAddProduct(@RequestParam("_thumbnail") MultipartFile thumbnail,
                                 ProductEntity product) throws IOException {
        product.setThumbnail(thumbnail.getBytes());
        product.setThumbnailFileName(thumbnail.getName());
        product.setThumbnailContentType(thumbnail.getContentType());
        Result result = this.adminService.addProduct(product);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @PostMapping(value = "/addEvent", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postAddEvent(@RequestParam("_thumbnail") MultipartFile thumbnail,
                                 EventEntity event) throws IOException {
        event.setThumbnail(thumbnail.getBytes());
        event.setThumbnailFileName(thumbnail.getName());
        event.setThumbnailContentType(thumbnail.getContentType());
        Result result = this.adminService.addEvent(event);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @DeleteMapping(value = "/deleteMovie", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteAddMovie(@RequestParam("index") int index) {
        Result result = this.adminService.deleteMovie(index);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @DeleteMapping(value = "/deleteProduct", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteAddProduct(@RequestParam("index") int index) {
        Result result = this.adminService.deleteProduct(index);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @DeleteMapping(value = "/deleteEvent", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteAddEvent(@RequestParam("index") int index) {
        Result result = this.adminService.deleteEvent(index);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }
}
