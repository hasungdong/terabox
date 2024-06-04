package com.terabox.demo.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "benefit")
public class MembershipController {

    @GetMapping(value = "membership", produces = MediaType.TEXT_HTML_VALUE)
    public String getGuide(Model model){

        return "benefit/membership";
    }

    @GetMapping(value = "vipLounge", produces = MediaType.TEXT_HTML_VALUE)
    public String getLounge(Model model){

        return "benefit/vipLounge";
    }

//    여기 이렇게 하는 거 맞나?
    @GetMapping(value = "discount/guide", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountGuide(){
        return "benefit/discount/guide";
    }

    @GetMapping(value = "discount/creditcard", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountCreditCard(){
        return "benefit/discount/creditcard";
    }

    @GetMapping(value = "discount/telecomcard", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountTelecomCard(){
        return "benefit/discount/telecomcard";
    }

    @GetMapping(value = "discount/pointcard", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountPointCard(){
        return "benefit/discount/pointcard";
    }

    @GetMapping(value = "discount/giftcard", produces = MediaType.TEXT_HTML_VALUE)
    public String getDiscountGiftCard(){
        return "benefit/discount/giftcard";
    }
}
