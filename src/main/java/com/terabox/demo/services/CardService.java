package com.terabox.demo.services;

import com.terabox.demo.entities.CardEntity;
import com.terabox.demo.mappers.CardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardService {
    private final CardMapper cardMapper;

    public CardEntity[] getCards(){
        return this.cardMapper.selectCards();
    }

    public int getCardsCount(){
        return this.cardMapper.selectCardsCount();
    }

    public CardEntity getCard(String name){
        return this.cardMapper.selectCardByName(name);
    }
}
