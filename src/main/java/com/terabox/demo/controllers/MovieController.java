package com.terabox.demo.controllers;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.services.MovieService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "movie")
@RequiredArgsConstructor
public class MovieController extends AbstractGeneralController {
    private final MovieService movieService;

    @GetMapping(value = "allMovie", produces = MediaType.TEXT_HTML_VALUE)
    public String getAllMovie(){
        return "movie/allMovie";
    }

    @GetMapping(value = "allMovie/admin", produces = MediaType.TEXT_HTML_VALUE)
    public String getAllMovieAdmin(){
//        나중에 관리자 로그인인지 확인하는 로직 추가
        return "movie/allMovieAdmin";
    }

    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getSearch(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                            SearchDto searchDto){
        searchDto.setRequestPage(page);
        MovieEntity[] movies = this.movieService.getMovies(searchDto);
        return this.parseResponse(searchDto, movies, "movies").toString();
//        return responseObject.toString();

//        JSONObject responseObject = new JSONObject();
//        responseObject.put("search", searchDto);
//        responseObject.put("movies", movies);
//        if (movies == null){
//            responseObject.put("result", CommonResult.FAILURE.name().toLowerCase());
//        } else {
//            responseObject.put("result", CommonResult.SUCCESS.name().toLowerCase());
//        }
//        return responseObject.toString();
    }

    @GetMapping(value = "/image")
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@RequestParam(value = "index", required = false, defaultValue = "0") int index){
        MovieEntity movie = this.movieService.getMovie(index);
        byte[] thumbnail = movie.getThumbnail();
        if (thumbnail == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentLength(thumbnail.length)
                .contentType(MediaType.parseMediaType(movie.getThumbnailContentType()))
                .body(thumbnail);
    }

//    @GetMapping(value = "movie", produces = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseBody
//    public String getProduct(@Param("index") int index){
//        MovieEntity movie = this.movieService.getMovie(index);
//        JSONObject responseObject = new JSONObject();
//        responseObject.put("movie", movie.toString());
//        return responseObject.toString();
//    }

    @GetMapping(value = "movie", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public MovieEntity getMovie(@Param("index") int index){
        return this.movieService.getMovie(index);
    }
}
