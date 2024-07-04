package com.terabox.demo.controllers;

import com.terabox.demo.dtos.MovieCommentDto;
import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.MovieCommentEntity;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.results.CommonResult;
import com.terabox.demo.services.MovieService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Controller
@RequestMapping(value = "movie")
@RequiredArgsConstructor
public class MovieController extends AbstractGeneralController {
    private final MovieService movieService;

    @GetMapping(value = "allMovie", produces = MediaType.TEXT_HTML_VALUE)
    public String getAllMovie(Model model){
        MovieEntity[] allMovie = this.movieService.getAllMovies();
        model.addAttribute("allMovie",allMovie);
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
        System.out.println(searchDto);
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

    @GetMapping(value = "movie", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public MovieEntity getMovie(@Param("index") int index){
        return this.movieService.getMovie(index);
    }

    @GetMapping(value = "movieDetail", produces = MediaType.TEXT_HTML_VALUE)
    public String getMovieDetail(@RequestParam("index")int index, Model model){
        MovieEntity movieIndex = this.movieService.getMovie(index);
        MovieCommentEntity[] allComment = this.movieService.getComment(index);
        model.addAttribute("movieIndex",movieIndex);
        model.addAttribute("allComment",allComment);
        model.addAttribute("commentCount", this.movieService.getCommentCount(index));
        model.addAttribute("movieLikeCount",this.movieService.getMovieLike(index));
        model.addAttribute("movieView",this.movieService.getUpdate(index));
        model.addAttribute("MovieGrade",this.movieService.getMovieGrade(index) == null ? 0.0 : this.movieService.getMovieGrade(index));
        return "movie/movieDetail";
    }


    @PostMapping(value = "movieComment", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postMovieDetail(MovieCommentEntity comment, @RequestParam(value = "userEmail", required = false) String userEmail){
        userEmail = "eletoa123";
        comment.setUserEmail(userEmail);
        comment.setCreatedAt(LocalDateTime.now());
        CommonResult result = this.movieService.postMovieComment(comment);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result",result.name().toLowerCase());
        return responseObject.toString();
    }

    /*영화 좋아요 */
    @PostMapping(value = "movieLike", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postMovieLike(@RequestParam("movieIndex") int movieIndex,@RequestParam(value = "userEmail", required = false) String userEmail){
        userEmail = "gktjdehd3333@gmail.com";
        JSONObject responseObject = new JSONObject();
        CommonResult movieLikeToggle = this.movieService.MovieLikeToggle(movieIndex,userEmail);
        responseObject.put("movieLikeToggle",movieLikeToggle.name().toLowerCase());

        return responseObject.toString();
    }


    @PostMapping(value = "movieCommentLike", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postMovieCommentLike( @RequestParam("movieCommentIndex")int movieCommentIndex, @RequestParam(value = "userEmail", required = false) String userEmail){
        userEmail = "gktjdehd3333@gmail.com";
        System.out.println(userEmail);
        System.out.println(movieCommentIndex);
        JSONObject responseObject = new JSONObject();
        CommonResult likeResult = this.movieService.toggle(movieCommentIndex,userEmail);
        responseObject.put("likeResult",likeResult.name().toLowerCase());
        return responseObject.toString();
    }

    @GetMapping(value = "movieDetailReview", produces = MediaType.TEXT_HTML_VALUE)
    public String getAllMovieReview(@RequestParam("index")int index,Model model){
        MovieEntity movieIndex = this.movieService.getMovie(index);
        MovieCommentEntity[] allComment = this.movieService.getComment(index); //영화 댓글 전체 다 가져오기
        model.addAttribute("movieIndex",movieIndex);
        model.addAttribute("allComment",allComment);
        model.addAttribute("commentCount", this.movieService.getCommentCount(index)); //영화 댓글 전체 수 가져오기
        model.addAttribute("movieLikeCount",this.movieService.getMovieLike(index));//댓글 좋아요
        model.addAttribute("movieView",this.movieService.getUpdate(index)); //조회수 올리는 로직
        model.addAttribute("MovieGrade",this.movieService.getMovieGrade(index) == null ? 0.0 : this.movieService.getMovieGrade(index)); //영화 평점
        return "movie/movieDetailReview";
    }

    @GetMapping(value = "movieReviews", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String  getAllMovieReviews(@RequestParam("index")int index,
                                      @RequestParam("by")String  by, SearchDto searchDto,@RequestParam(value = "page",required = false,defaultValue = "1" )int page) {
        searchDto.setRequestPage(page);
        MovieCommentDto[] movieCommentDtos = this.movieService.getMovieCommentNewest(index, by, searchDto);
        JSONObject responseObject = new JSONObject();
        responseObject.put("movieCommentDtos", movieCommentDtos);
        responseObject.put("searchDto", searchDto);
        return responseObject.toString();
    }
}
