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

    @PostMapping(value = "/movie", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postMovie(@RequestParam("_thumbnail") MultipartFile thumbnail,
                               MovieEntity movie) throws IOException {
        movie.setThumbnail(thumbnail.getBytes());
        movie.setThumbnailFileName(thumbnail.getOriginalFilename());
        movie.setThumbnailContentType(thumbnail.getContentType());
        Result result = this.adminService.addMovie(movie);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @PostMapping(value = "/product", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postProduct(@RequestParam("_thumbnail") MultipartFile thumbnail,
                                 ProductEntity product) throws IOException {
        product.setThumbnail(thumbnail.getBytes());
        product.setThumbnailFileName(thumbnail.getOriginalFilename());
        product.setThumbnailContentType(thumbnail.getContentType());
        Result result = this.adminService.addProduct(product);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @PostMapping(value = "/event", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postEvent(@RequestParam("_thumbnail") MultipartFile thumbnail,
                                 EventEntity event) throws IOException {
        event.setThumbnail(thumbnail.getBytes());
        event.setThumbnailFileName(thumbnail.getOriginalFilename());
        event.setThumbnailContentType(thumbnail.getContentType());
        Result result = this.adminService.addEvent(event);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @PatchMapping(value = "/movie", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchMovie(@RequestParam(value = "_thumbnail", required = false) MultipartFile thumbnail,
                             MovieEntity movie) throws IOException {
        if (thumbnail != null){
            movie.setThumbnail(thumbnail.getBytes());
            movie.setThumbnailFileName(thumbnail.getOriginalFilename());
            movie.setThumbnailContentType(thumbnail.getContentType());
        }
        Result result = this.adminService.patchMovie(movie);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @PatchMapping(value = "/product", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchProduct(@RequestParam(value = "_thumbnail", required = false) MultipartFile thumbnail,
                               ProductEntity product) throws IOException {
        if (thumbnail != null){
            product.setThumbnail(thumbnail.getBytes());
            product.setThumbnailFileName(thumbnail.getOriginalFilename());
            product.setThumbnailContentType(thumbnail.getContentType());
        }
        Result result = this.adminService.patchProduct(product);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @PatchMapping(value = "/event", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchEvent(@RequestParam(value = "_thumbnail", required = false) MultipartFile thumbnail,
                             EventEntity event) throws IOException {
        if (thumbnail != null){
            event.setThumbnail(thumbnail.getBytes());
            event.setThumbnailFileName(thumbnail.getOriginalFilename());
            event.setThumbnailContentType(thumbnail.getContentType());
        }
        Result result = this.adminService.patchEvent(event);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @DeleteMapping(value = "/movie", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteMovie(@RequestParam("index") int index) {
        Result result = this.adminService.deleteMovie(index);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @DeleteMapping(value = "/product", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteProduct(@RequestParam("index") int index) {
        Result result = this.adminService.deleteProduct(index);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @DeleteMapping(value = "/event", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteEvent(@RequestParam("index") int index) {
        Result result = this.adminService.deleteEvent(index);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }
}
