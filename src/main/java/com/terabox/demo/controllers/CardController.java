package com.terabox.demo.controllers;

import com.terabox.demo.entities.CardEntity;
import com.terabox.demo.services.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "card")
public class CardController {
    private final CardService cardService;

    @GetMapping(value = "search", produces = MediaType.APPLICATION_JSON_VALUE)
    public CardEntity getSearch(@RequestParam("name") String name){
        return this.cardService.getCard(name);
    }
}
