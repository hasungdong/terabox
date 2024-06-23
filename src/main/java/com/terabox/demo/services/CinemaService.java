package com.terabox.demo.services;

import com.terabox.demo.entities.CinemaEntity;
import com.terabox.demo.mappers.CinemaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CinemaService {
    private final CinemaMapper cinemaMapper;

    public CinemaEntity[] getCinemas(int theaterIndex) {
        return this.cinemaMapper.selectCinemasByTheaterIndex(theaterIndex);
    }
}
