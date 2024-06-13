package com.terabox.demo.controllers;

import com.terabox.demo.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "benefit")
@RequiredArgsConstructor
public class MembershipController {
    private final EventService eventService;

    @GetMapping(value = "membership", produces = MediaType.TEXT_HTML_VALUE)
    public String getGuide(){
        return "benefit/membership";
    }

    @GetMapping(value = "vipLounge", produces = MediaType.TEXT_HTML_VALUE)
    public String getLounge(Model model){
        model.addAttribute("events", this.eventService.getEventsAll());
        model.addAttribute("eventsCount", this.eventService.getEventsAllCount());
        return "benefit/vipLounge";
    }

//    여기 이렇게 하는 거 맞나?
    @GetMapping(value = "discount/guide", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountGuide(Model model){
        model.addAttribute("events", this.eventService.getEventsAll());
        model.addAttribute("eventsCount", this.eventService.getEventsAllCount());
        return "benefit/discount/guide";
    }

    @GetMapping(value = "discount/creditcard", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountCreditCard(Model model){
        model.addAttribute("events", this.eventService.getEventsAll());
        model.addAttribute("eventsCount", this.eventService.getEventsAllCount());
        return "benefit/discount/creditcard";
    }

    @GetMapping(value = "discount/telecomcard", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountTelecomCard(Model model){
        model.addAttribute("events", this.eventService.getEventsAll());
        model.addAttribute("eventsCount", this.eventService.getEventsAllCount());
        return "benefit/discount/telecomcard";
    }

    @GetMapping(value = "discount/pointcard", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountPointCard(Model model){
        model.addAttribute("events", this.eventService.getEventsAll());
        model.addAttribute("eventsCount", this.eventService.getEventsAllCount());
        return "benefit/discount/pointcard";
    }

    @GetMapping(value = "discount/giftcard", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountGiftCard(Model model){
        model.addAttribute("events", this.eventService.getEventsAll());
        model.addAttribute("eventsCount", this.eventService.getEventsAllCount());
        return "benefit/discount/giftcard";
    }
}
