package com.terabox.demo.services;

import com.terabox.demo.dtos.MovieCommentDto;
import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.*;
import com.terabox.demo.mappers.MovieCommentLikeMapper;
import com.terabox.demo.mappers.MovieCommentMapper;
import com.terabox.demo.mappers.MovieLikeMapper;
import com.terabox.demo.mappers.MovieMapper;
import com.terabox.demo.results.CommonResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class MovieService {
    private final MovieMapper movieMapper;
    private final MovieCommentLikeMapper movieCommentLikeMapper;
    private final MovieLikeMapper movieLikeMapper;
    private final MovieCommentMapper movieCommentMapper;

    public MovieEntity getMovie(int index){
        return this.movieMapper.selectMovieByIndex(index);
    }

    public MovieEntity[] getMovies(SearchDto searchDto){
        searchDto.setTotalCount(this.movieMapper.selectMoviesCountBySearch(searchDto));
        searchDto.setMaxPage(searchDto.getTotalCount() / searchDto.getCountPerPage() + (searchDto.getTotalCount() % searchDto.getCountPerPage() == 0 ? 0 : 1));
        searchDto.setMinPage(1);
        searchDto.setOffset(searchDto.getCountPerPage() * (searchDto.getRequestPage() - 1));
        return this.movieMapper.selectMoviesBySearch(searchDto);
    }

    public MovieEntity[] getAllMovies(String keyword) {
        return movieMapper.selectMovieAll(keyword);
    }

    public CommonResult postMovieComment(MovieCommentEntity comment){
        System.out.println(comment);
        return this.movieMapper.insertMovieComment(comment) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;

    }


    public MovieCommentDto[] getComment(int movieIndex) {
        return this.movieMapper.selectComments(movieIndex);
    }

    public int getCommentCount(int movieIndex) {
        return this.movieMapper.selectCountComments(movieIndex);
    }

    /*영화 댓글 좋아요 */
    /*좋아요 누르면 체크 되고 한번 더 누르면 취소되는 로직 */
    public CommonResult toggle(int movieCommentIndex,String userEmail){
        int affectedRows;

        /* 나중에 로그인 로직 구현하면 자동으로 넘어오게 해야함 */
        if (this.movieCommentLikeMapper.selectCommentLikeByIndex(movieCommentIndex,userEmail) == null){
            MovieCommentLikesEntity CommentLikes = new MovieCommentLikesEntity();
            CommentLikes.setMovieCommentIndex(movieCommentIndex);
            CommentLikes.setCreatedAt(LocalDateTime.now());
            CommentLikes.setUserEmail(userEmail);
            affectedRows = this.movieCommentLikeMapper.insertMovieCommentLike(CommentLikes);
        }
        else{
            affectedRows = this.movieCommentLikeMapper.deleteMovieCommentLikeByEmail(movieCommentIndex,userEmail);

        }

        return affectedRows > 0 ? CommonResult.SUCCESS:CommonResult.FAILURE;


    }


    /*영화 좋아요 */
    /*좋아요 누르면 체크 되고 한번 더 누르면 취소되는 로직 */
    public CommonResult MovieLikeToggle(int movieIndex,String userEmail){
        int MovieLikeRows;

        /* 나중에 로그인 로직 구현하면 자동으로 넘어오게 해야함 */
        if (this.movieLikeMapper.selectMovieLikeByIndex(movieIndex,userEmail)==null){
            MovieLikeEntity movieLike = new MovieLikeEntity();
            movieLike.setMovieIndex(movieIndex);
            movieLike.setCreatedAt(LocalDateTime.now());
            movieLike.setUserEmail(userEmail);
            MovieLikeRows = this.movieLikeMapper.insertMovieLike(movieLike);
            System.out.println(MovieLikeRows);
        }
        else{
            MovieLikeRows = this.movieLikeMapper.deleteMovieLikeByEmail(movieIndex,userEmail);
//            System.out.println(MovieLikeRows);
        }

        return MovieLikeRows > 0 ? CommonResult.SUCCESS:CommonResult.FAILURE;


    }

    public MovieLikeEntity getMovieLike(int movieIndex, String userEmail ){
        return this.movieLikeMapper.selectMovieLikeByIndex(movieIndex, userEmail);
    }


    public int getMovieCommentLike(int movieIndex){
        return this.movieLikeMapper.selectMovieCountByIndex(movieIndex);
    }

    //   조회수 올리는 로직
    public MovieEntity getUpdate(int index){
        MovieEntity db = this.movieMapper.selectMovieByIndex(index);
        db.setView(db.getView()+1);
        System.out.println(db.getView());
        this.movieMapper.upDateMovie(db);
        return db;
    }

    public Double getMovieGrade(int movieIndex){
        return this.movieCommentMapper.selectMovieGrade(movieIndex);
    }

    //댓글 최신순 가져오기
    public MovieCommentDto[] getMovieCommentNewest(int movieIndex, String by, SearchDto searchDto , UserEntity user){
        searchDto.setTotalCount(this.movieCommentMapper.selectCommentCount(movieIndex));
        searchDto.setCountPerPage(10);
        searchDto.setMaxPage(searchDto.getTotalCount() / searchDto.getCountPerPage() + (searchDto.getTotalCount() % searchDto.getCountPerPage() == 0 ? 0 : 1));
        if (searchDto.getMaxPage() < 1){
            searchDto.setMaxPage(1);
        }
        searchDto.setMinPage(1);
        searchDto.setOffset(searchDto.getCountPerPage() * (searchDto.getRequestPage() - 1));
        System.out.println(searchDto);
        MovieCommentDto[] movieCommentDtos = this.movieCommentMapper.selectMovieNewest(movieIndex, by, searchDto.getCountPerPage(), searchDto.getOffset());

        /*댓글 좋아요 눌렀을때  파란색 아이콘 들어가게 하는 로직*/
        for (MovieCommentDto movieCommentDto : movieCommentDtos) {
            if (user == null){ // 로그인 안되있을떄
                movieCommentDto.setSaved(false);

            } else {
                // Saved 에 내 계정으로 좋아요 누른게 있다면 true 없다면 false
                movieCommentDto.setSaved(this.movieCommentLikeMapper.selectCommentLikeByIndex(movieCommentDto.getIndex(),user.getEmail()) != null); // 아이디랑 movieIndex 넣어주고 useEmail 이 없을시
                System.out.println(movieCommentDto.isSaved());
            }

        }

        return movieCommentDtos;
    }
}
