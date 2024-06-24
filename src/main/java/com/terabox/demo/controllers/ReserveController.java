package com.terabox.demo.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "booking")
public class ReserveController {
    @GetMapping(value = "reserve", produces = MediaType.TEXT_HTML_VALUE)
    public String getBooking() {
        return "booking/reserve";
    }

//    여기 어차피 없애고 나중에 xhr로 만들게 해야됨
    @GetMapping(value = "orderThree", produces = MediaType.TEXT_HTML_VALUE)
    public String getOrderThree(){
        return "booking/orderThree";
    }

    @GetMapping(value = "orderTwo", produces = MediaType.TEXT_HTML_VALUE)
    public String getOrderTwo(){
        return "booking/orderTwo";
    }
}
