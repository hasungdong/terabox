package com.terabox.demo.controllers;

import com.terabox.demo.dtos.MovieOrderDto;
import com.terabox.demo.entities.CardEntity;
import com.terabox.demo.entities.SeatPriceEntity;
import com.terabox.demo.services.CardService;
import com.terabox.demo.services.ScreeningInfoService;
import com.terabox.demo.services.SeatPriceService;
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
    private final ScreeningInfoService screeningInfoService;
    private final SeatPriceService seatPriceService;

    @GetMapping(value = "reserve", produces = MediaType.TEXT_HTML_VALUE)
    public String getBooking() {
        return "booking/reserve";
    }

//    여기 어차피 없애고 나중에 xhr로 만들게 해야됨
    @GetMapping(value = "orderThree", produces = MediaType.TEXT_HTML_VALUE)
    public String getOrderThree(
            MovieOrderDto movieOrderDto,
            Model model){
        movieOrderDto.setAdultCount(2);
        movieOrderDto.setTeenagerCount(3);
        movieOrderDto.setOldCount(1);
        movieOrderDto.setDisabledCount(1);
        SeatPriceEntity[] seatPrices = this.seatPriceService.getSeatPrices();
        for (SeatPriceEntity seatPrice : seatPrices) {
            switch (seatPrice.getType()) {
                case "adult":
                    model.addAttribute("adultPrice", Math.max(seatPrice.getPrice(), 0));
                    break;
                case "teenager":
                    model.addAttribute("teenagerPrice", Math.max(seatPrice.getPrice(), 0));
                    break;
                case "old":
                    model.addAttribute("oldPrice", Math.max(seatPrice.getPrice(), 0));
                    break;
                case "disabled":
                    model.addAttribute("disabledPrice", Math.max(seatPrice.getPrice(), 0));
                    break;
                default:
            }
        }
        model.addAttribute("movieOrderDto", movieOrderDto);
        ScreeningInfoVo screeningInfoVo = this.screeningInfoService.getScreeningInfoVos(movieOrderDto.getScreeningInfoIndex());
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
