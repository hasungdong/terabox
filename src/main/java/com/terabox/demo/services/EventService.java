package com.terabox.demo.services;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.EventEntity;
import com.terabox.demo.mappers.EventMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventMapper eventMapper;

    public EventEntity[] getEvents(SearchDto searchDto){
        searchDto.setTotalCount(this.eventMapper.selectEventsCountBySearch(searchDto));
        searchDto.setMaxPage(searchDto.getTotalCount() / searchDto.getCountPerPage() + (searchDto.getTotalCount() % searchDto.getCountPerPage() == 0 ? 0 : 1));
        searchDto.setMinPage(1);

        searchDto.setOffset(searchDto.getCountPerPage() * (searchDto.getRequestPage() - 1));


        return this.eventMapper.selectEventsBySearch(searchDto);
    }
}
