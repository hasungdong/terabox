package com.terabox.demo.services;

import com.terabox.demo.entities.EventEntity;
import com.terabox.demo.entities.ProductEntity;
import com.terabox.demo.mappers.EventMapper;
import com.terabox.demo.mappers.ProductMapper;
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
    private final ProductMapper productMapper;
    private final EventMapper eventMapper;

    public Result addMovie(MovieEntity movie){
        if (movie == null ||
        movie.getTitle().length() < 1 || movie.getTitle().length() > 100){
            return CommonResult.FAILURE;
        }
//        같은 이름에 개봉일까지 같으면 같은 영화로 판정
//        title, releaseDate에 PK 걸면 됐지만 index가 없으면 다른 테이블에서 외래키 참조할 수가 없어서 이렇게 했음
        MovieEntity[] dbMovies = this.movieMapper.selectMoviesByTitle(movie.getTitle());
        if (dbMovies != null){
            for (MovieEntity dbMovie : dbMovies) {
                if (dbMovie.getReleaseDate().equals(movie.getReleaseDate())){
                    return CommonResult.FAILURE_DUPLICATE;
                }
            }
        }
        movie.setView(0);
        movie.setGrade(0);
        return this.adminMapper.insertMovie(movie) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Result addProduct(ProductEntity product) {
        if (product == null ||
                product.getName().length() < 1 || product.getName().length() > 100){
            return CommonResult.FAILURE;
        }
//        이름과 가격이 같으면 같은 상품
        ProductEntity[] dbProducts = this.productMapper.selectProductsByName(product.getName());
        if (dbProducts != null){
            for (ProductEntity dbProduct : dbProducts) {
                if (dbProduct.getPrice() == product.getPrice()){
                    return CommonResult.FAILURE_DUPLICATE;
                }
            }
        }
        return this.adminMapper.insertProduct(product) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Result addEvent(EventEntity event) {
        if (event == null ||
            event.getTitle().length() < 1 || event.getTitle().length() > 100){
            return CommonResult.FAILURE;
        }
//        이름이 시작일이 같으면 같은 이벤트
        EventEntity[] dbEvents = this.eventMapper.selectEventsByTitle(event.getTitle());
        if (dbEvents != null){
            for (EventEntity dbEvent : dbEvents) {
                if (dbEvent.getStartDate().equals(event.getStartDate())){
                    return CommonResult.FAILURE_DUPLICATE;
                }
            }
        }
        return this.adminMapper.insertEvent(event) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Result modifyMovie(String title){
        return null;
    }

    public Result modifyProduct(String name){
        return null;
    }

    public Result modifyEvent(String title){
        return null;
    }

    public Result deleteMovie(String title){
        return null;
    }

    public Result deleteProduct(String name){
        return null;
    }

    public Result deleteEvent(String title){
        if (title == null || title.length() < 1 || title.length() > 100){
            return CommonResult.FAILURE;
        }
        EventEntity[] dbEvents = this.eventMapper.selectEventsByTitle(title);
        if (dbEvents == null){

        }
        return null;
    }
}
