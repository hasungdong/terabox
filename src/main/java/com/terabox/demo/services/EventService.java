package com.terabox.demo.services;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.EventEntity;
import com.terabox.demo.mappers.EventMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class EventService {
    private final EventMapper eventMapper;

    public EventEntity getEvent(int index){
        return this.eventMapper.selectEventByIndex(index);
    }

    public EventEntity[] getEvents(SearchDto searchDto){
        searchDto.setTotalCount(this.eventMapper.selectEventsCountBySearch(searchDto));
        searchDto.setMaxPage(searchDto.getTotalCount() / searchDto.getCountPerPage() + (searchDto.getTotalCount() % searchDto.getCountPerPage() == 0 ? 0 : 1));
        searchDto.setMinPage(1);

        searchDto.setOffset(searchDto.getCountPerPage() * (searchDto.getRequestPage() - 1));
        return this.eventMapper.selectEventsBySearch(searchDto);
    }

    public EventEntity[] getEventsAll(){
        return this.eventMapper.selectEventsAll();
    }

    public int getEventsAllCount(){
        return this.eventMapper.selectEventsAllCount();
    }

    public EventEntity[] getEventsTwoStartDate(){
        return this.eventMapper.selectEventsTwoStartDate();
    }
}
