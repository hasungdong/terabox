package com.terabox.demo.controllers;

import com.terabox.demo.entities.CardEntity;
import com.terabox.demo.services.CardService;
import com.terabox.demo.services.OrderService;
import com.terabox.demo.services.ScreeningInfoService;
import com.terabox.demo.vos.ScreeningInfoVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "booking")
@RequiredArgsConstructor
public class ReserveController {
    private final CardService cardService;
    private final OrderService orderService;
    private final ScreeningInfoService screeningInfoService;

    @GetMapping(value = "reserve", produces = MediaType.TEXT_HTML_VALUE)
    public String getBooking() {
        return "booking/reserve";
    }

//    여기 어차피 없애고 나중에 xhr로 만들게 해야됨
    @GetMapping(value = "orderThree", produces = MediaType.TEXT_HTML_VALUE)
    public String getOrderThree(
            @RequestParam(value = "screeningInfoIndex", required = false) Integer screeningInfoIndex,
            @RequestParam(value = "seatIndexes", required = false) Integer[] seatIndexes,
            Model model){
        model.addAttribute("seatIndexes", seatIndexes);
        ScreeningInfoVo screeningInfoVo = this.screeningInfoService.getScreeningInfoVos(screeningInfoIndex);
        model.addAttribute("screeningInfoVo", screeningInfoVo);
        CardEntity[] cards = this.cardService.getCards();
        model.addAttribute("cards", cards);
        return "booking/orderThree";
    }

    @GetMapping(value = "orderTwo", produces = MediaType.TEXT_HTML_VALUE)
    public String getOrderTwo(){
        return "booking/orderTwo";
    }
}
