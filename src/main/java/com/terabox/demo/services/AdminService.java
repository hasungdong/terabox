package com.terabox.demo.services;

import com.terabox.demo.results.movie.AddResult;
import lombok.RequiredArgsConstructor;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.mappers.AdminMapper;
import com.terabox.demo.mappers.MovieMapper;
import com.terabox.demo.results.CommonResult;
import com.terabox.demo.results.Result;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminMapper adminMapper;
    private final MovieMapper movieMapper;

    public Result addMovie(MovieEntity movie){
        if (movie == null ||
        movie.getTitle().length() < 1 || movie.getTitle().length() > 100){
            System.out.println(1);
            return CommonResult.FAILURE;
        }
//        같은 이름에 개봉일까지 같으면 같은 영화로 판정
        MovieEntity[] dbMovies = this.movieMapper.selectMoviesByTitle(movie.getTitle());
        if (dbMovies != null){
            System.out.println(2);
            for (MovieEntity dbMovie : dbMovies) {
                if (dbMovie.getReleaseDate() == movie.getReleaseDate()){
                    return AddResult.FAILURE_DUPLICATE_MOVIE;
                }
            }
        }
        movie.setView(0);
        movie.setGrade(0);
        return this.adminMapper.insertMovie(movie) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }
}
