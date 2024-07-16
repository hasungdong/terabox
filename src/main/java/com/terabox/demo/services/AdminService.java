package com.terabox.demo.services;

import com.terabox.demo.entities.EventEntity;
import com.terabox.demo.entities.ProductEntity;
import com.terabox.demo.mappers.*;
import lombok.RequiredArgsConstructor;
import com.terabox.demo.entities.MovieEntity;
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

    public Result patchMovie(MovieEntity movie){
        if (movie.getIndex() < 1){
            return CommonResult.FAILURE;
        }
//        index를 통해 가져온 영화
        MovieEntity dbMovie = this.movieMapper.selectMovieByIndex(movie.getIndex());
        if (dbMovie == null){
//            이게 null이면 없는 영화인건데 없으면 당연히 수정도 못함
            return CommonResult.FAILURE;
        }
//        중복 검사
//        movie의 제목과 시작일로 검색했을 때 나올 때,
//        만약 나왔을 때 위에서 index로 가져온 dbMovie의 값과 일치하는 건 괜찮다.

//        제목과 개봉일을 통해 가져온 영화
        MovieEntity dbMovieTR = this.movieMapper.selectMovieByTitleReleaseDate(movie.getTitle(), movie.getReleaseDate());
        if (dbMovieTR == null){
//            1. 제목과 시작일을 db에 없는 값으로 변경하려고 하는 경우
            dbMovie.setTitle(movie.getTitle());
            dbMovie.setReleaseDate(movie.getReleaseDate());
            dbMovie.setPlayingTime(movie.getPlayingTime());
//        받은 사진이 없으면, 사진은 수정 안하겠다
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
//            이거 밑에 로직이랑 똑같은데 dbTR인 경우를 따로 안빼주면 밑에서 dbTR 쓸때 NPE 발생함 그래서 어쩔 수 없이 이렇게 냅둠
        }
        if (!(dbMovieTR.getReleaseDate().equals(dbMovie.getReleaseDate()) && dbMovieTR.getTitle().equals(dbMovie.getTitle()))){
//           3. 이건 영화의 제목과 개봉일을 바꾸려고 하는데, 바꾸기 위해 입력한 값이 db의 다른 영화의 제목과 개봉일인 경우
            return CommonResult.FAILURE_DUPLICATE;
        }
//        2. 제목과 시작일은 그대로 두고, 나머지 값만 변경하는 경우
        dbMovie.setTitle(movie.getTitle());
        dbMovie.setReleaseDate(movie.getReleaseDate());
        dbMovie.setPlayingTime(movie.getPlayingTime());
//        받은 사진이 없으면, 사진은 수정 안하겠다
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
        dbMovie.setExplanation(movie.getExplanation());
        dbMovie.setSubExplanation(movie.getSubExplanation());

        return this.adminMapper.updateMovie(dbMovie) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Result patchProduct(ProductEntity product){
        if (product.getIndex() < 1){
            return CommonResult.FAILURE;
        }
//        index를 통해 가져온 상품
        ProductEntity dbProduct = this.productMapper.selectProductByIndex(product.getIndex());
        if (dbProduct == null){
            return CommonResult.FAILURE;
        }
//        중복 검사
        //        product의 이름과 가격으로 검색했을 때 나올 때,
//        만약 나왔을 때 위에서 index로 가져온 dbProduct 값과 일치하는 건 괜찮다.

//        이름과 가격을 통해 가져온 상품
        ProductEntity dbProductNP = this.productMapper.selectProductByNamePrice(product.getName(), product.getPrice());
        if (dbProductNP == null){
//            1. 이름과 가격을 db에 없는 값으로 변경하려는 경우
            dbProduct.setName(product.getName());
            dbProduct.setPrice(product.getPrice());
            dbProduct.setQuantity(product.getQuantity());
            //        받은 사진이 없으면, 사진은 수정 안하겠다
            if (product.getThumbnail().length == 0){

            }else {
                dbProduct.setThumbnail(product.getThumbnail());
                dbProduct.setThumbnailFileName(product.getThumbnailFileName());
                dbProduct.setThumbnailContentType(product.getThumbnailContentType());
            }
            dbProduct.setType(product.getType());
//            이거 밑에 로직이랑 똑같은데 dbNP인 경우를 따로 안빼주면 밑에서 dbNP 쓸때 NPE 발생함 그래서 어쩔 수 없이 이렇게 냅둠
            return this.adminMapper.updateProduct(dbProduct) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
        }
        if (!(dbProductNP.getName().equals(dbProduct.getName()) && dbProductNP.getPrice() == (dbProduct.getPrice()))){
//           3. 이건 상품의 이름과 가격을 바꾸려고 하는데, 바꾸기 위해 입력한 값이 db의 다른 상품의 이름과 가격인 경우
            return CommonResult.FAILURE_DUPLICATE;
        }
//        2. 이름과 가격은 그대로 두고, 나머지 값만 변경하는 경우
        dbProduct.setName(product.getName());
        dbProduct.setPrice(product.getPrice());
        dbProduct.setQuantity(product.getQuantity());
        //        받은 사진이 없으면, 사진은 수정 안하겠다
        if (product.getThumbnail().length == 0){

        }else {
            dbProduct.setThumbnail(product.getThumbnail());
            dbProduct.setThumbnailFileName(product.getThumbnailFileName());
            dbProduct.setThumbnailContentType(product.getThumbnailContentType());
        }
        dbProduct.setType(product.getType());
        dbProduct.setSubTitle(product.getSubTitle());
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
//        중복 검사
        //        event의 이름과 가격으로 검색했을 때 나올 때,
//        만약 나왔을 때 위에서 index로 가져온 dbEvent 값과 일치하는 건 괜찮다.
        //        이름과 가격을 통해 가져온 상품
        EventEntity dbEventTS = this.eventMapper.selectEventByTitleStartDate(event.getTitle(), event.getStartDate());
        if (dbEventTS == null){
            //            1. 이름과 가격을 db에 없는 값으로 변경하려는 경우
            dbEvent.setTitle(event.getTitle());
            dbEvent.setStartDate(event.getStartDate());
            dbEvent.setEndDate(event.getEndDate());
            dbEvent.setDiscountRate(event.getDiscountRate());
            //        받은 사진이 없으면, 사진은 수정 안하겠다
            if (event.getThumbnail().length == 0){

            }else {
                dbEvent.setThumbnail(event.getThumbnail());
                dbEvent.setThumbnailFileName(event.getThumbnailFileName());
                dbEvent.setThumbnailContentType(event.getThumbnailContentType());
            }
//            이거 밑에 로직이랑 똑같은데 dbTS인 경우를 따로 안빼주면 밑에서 dbTS 쓸때 NPE 발생함 그래서 어쩔 수 없이 이렇게 냅둠
            return this.adminMapper.updateEvent(dbEvent) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
        }
        if (!(dbEventTS.getTitle().equals(dbEvent.getTitle()) && dbEventTS.getStartDate().equals(dbEvent.getStartDate()))){
            //           3. 이건 이벤트의 제목과 시작일을 바꾸려고 하는데, 바꾸기 위해 입력한 값이 db의 다른 이벤트의 제목과 시작일인 경우
            return CommonResult.FAILURE_DUPLICATE;
        }
//        2. 제목과 시작일은 그대로 두고, 나머지 값만 변경하는 경우

        dbEvent.setTitle(event.getTitle());
        dbEvent.setStartDate(event.getStartDate());
        dbEvent.setEndDate(event.getEndDate());
        dbEvent.setDiscountRate(event.getDiscountRate());
        //        받은 사진이 없으면, 사진은 수정 안하겠다
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
        ProductEntity dbProduct = this.productMapper.selectProductByIndex(index);
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
