package com.terabox.demo.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "store")
@RequiredArgsConstructor
public class StoreController extends AbstractGeneralController {

    @GetMapping(value = "store", produces = MediaType.TEXT_HTML_VALUE)
    public String getStore(){
//        db에 있는 product 4개 가져오기
        return "store/store";
    }

    @GetMapping(value = "storeDetail", produces = MediaType.TEXT_HTML_VALUE)
    public String getStoreDetail() {
        return "store/storeDetail";
    }

    @GetMapping(value = "order", produces = MediaType.TEXT_HTML_VALUE)
    public String getOrder() {
        return "store/order";
    }

    @GetMapping(value = "terms",produces = MediaType.TEXT_HTML_VALUE)
    public String getTerms(){
        return "store/terms";
    }

}
