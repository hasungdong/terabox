package com.terabox.demo.services;

import com.terabox.demo.entities.EventEntity;
import com.terabox.demo.entities.ProductEntity;
import com.terabox.demo.mappers.EventMapper;
import com.terabox.demo.mappers.StoreMapper;
import lombok.RequiredArgsConstructor;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.mappers.AdminMapper;
import com.terabox.demo.mappers.MovieMapper;
import com.terabox.demo.results.CommonResult;
import com.terabox.demo.results.Result;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {
    private final AdminMapper adminMapper;
    private final MovieMapper movieMapper;
    private final StoreMapper storeMapper;
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
        ProductEntity[] dbProducts = this.storeMapper.selectProductsByName(product.getName());
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

    public Result patchMovie(MovieEntity movie){
        if (movie.getIndex() < 1){
            return CommonResult.FAILURE;
        }
        MovieEntity dbMovie = this.movieMapper.selectMovieByIndex(movie.getIndex());
        if (dbMovie == null){
            return CommonResult.FAILURE;
        }
        dbMovie.setTitle(movie.getTitle());
        dbMovie.setReleaseDate(movie.getReleaseDate());
        dbMovie.setPlayingTime(movie.getPlayingTime());
        if (movie.getThumbnail().length == 0){

        }else {
            dbMovie.setThumbnail(movie.getThumbnail());
            dbMovie.setThumbnailFileName(movie.getThumbnailFileName());
            dbMovie.setThumbnailContentType(movie.getThumbnailContentType());
        }
        dbMovie.setGrade(movie.getGrade());
        dbMovie.setView(movie.getView());
        dbMovie.setSingle(movie.isSingle());
        dbMovie.setAgeLimit(movie.getAgeLimit());
        dbMovie.setDimensionType(movie.getDimensionType());
        return this.adminMapper.updateMovie(dbMovie) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Result patchProduct(ProductEntity product){
        if (product.getIndex() < 1){
            return CommonResult.FAILURE;
        }
        ProductEntity dbProduct = this.storeMapper.selectProductByIndex(product.getIndex());
        if (dbProduct == null){
            return CommonResult.FAILURE;
        }
        dbProduct.setName(product.getName());
        dbProduct.setPrice(product.getPrice());
        dbProduct.setQuantity(product.getQuantity());
        if (product.getThumbnail().length == 0){

        }else {
            dbProduct.setThumbnail(product.getThumbnail());
            dbProduct.setThumbnailFileName(product.getThumbnailFileName());
            dbProduct.setThumbnailContentType(product.getThumbnailContentType());
        }
        dbProduct.setType(product.getType());
        return this.adminMapper.updateProduct(dbProduct) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Result patchEvent(EventEntity event){
        if (event.getIndex() < 1){
            return CommonResult.FAILURE;
        }
        EventEntity dbEvent = this.eventMapper.selectEventByIndex(event.getIndex());
        if (dbEvent == null){
            return CommonResult.FAILURE;
        }
        dbEvent.setTitle(event.getTitle());
        dbEvent.setStartDate(event.getStartDate());
        dbEvent.setEndDate(event.getEndDate());
        dbEvent.setDiscountRate(event.getDiscountRate());
        if (event.getThumbnail().length == 0){

        }else {
            dbEvent.setThumbnail(event.getThumbnail());
            dbEvent.setThumbnailFileName(event.getThumbnailFileName());
            dbEvent.setThumbnailContentType(event.getThumbnailContentType());
        }
        return this.adminMapper.updateEvent(dbEvent) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Result deleteMovie(int index){
        if (index < 1){
            return CommonResult.FAILURE;
        }
        MovieEntity dbMovie = this.movieMapper.selectMovieByIndex(index);
        if (dbMovie == null){
            return CommonResult.FAILURE;
        }
        return this.adminMapper.deleteMovieByIndex(index) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Result deleteProduct(int index){
        if (index < 1){
            return CommonResult.FAILURE;
        }
        ProductEntity dbProduct = this.storeMapper.selectProductByIndex(index);
        if (dbProduct == null){
            return CommonResult.FAILURE;
        }
        return this.adminMapper.deleteProductByIndex(index) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Result deleteEvent(int index){
        if (index < 1){
            return CommonResult.FAILURE;
        }
        EventEntity dbEvent = this.eventMapper.selectEventByIndex(index);
        if (dbEvent == null){
            return CommonResult.FAILURE;
        }
        return this.adminMapper.deleteEventByIndex(index) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }
}
