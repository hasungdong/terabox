package com.terabox.demo.services;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.MovieEntity;
import com.terabox.demo.mappers.MovieMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MovieService {
    private final MovieMapper movieMapper;

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
}
