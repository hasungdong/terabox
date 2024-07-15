package com.terabox.demo.controllers;

import com.terabox.demo.dtos.ProductDto;
import com.terabox.demo.dtos.StoreOrderDto;
import com.terabox.demo.entities.ProductEntity;
import com.terabox.demo.entities.UserEntity;
import com.terabox.demo.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "store")
@RequiredArgsConstructor
public class StoreController {
    private final ProductService productService;

    @GetMapping(value = "store", produces = MediaType.TEXT_HTML_VALUE)
    public String getStore(Model model){
        // db 에 있는 product 이미지 4개 가져오기,배열로 가져오기.
        ProductEntity[] productsTicket = this.productService.getStoreTicket();
        ProductEntity[] productsDfg = this.productService.getStoreDfg();
        ProductEntity[] productsPointer = this.productService.getStorePoint();
        ProductEntity productMax = this.productService.getProductMaxSale();
        model.addAttribute("productsTicket",productsTicket);
        model.addAttribute("productsDfg",productsDfg);
        model.addAttribute("productsPointer",productsPointer);
        model.addAttribute("productMax", productMax);

        return "store/store";
    }

    @GetMapping(value = "storeDetail", produces = MediaType.TEXT_HTML_VALUE)
    public String getStoreDetail(@RequestParam(value = "index",required = false)int index,Model model){
        ProductEntity storeDetail = this.productService.getStoreIndex(index);
        model.addAttribute("storeDetail",storeDetail);
        return "store/storeDetail";
    }

    @GetMapping(value = "order", produces = MediaType.TEXT_HTML_VALUE)
    public String getOrder(@SessionAttribute(value = "user",required = false) UserEntity user,
                           @RequestParam(value = "index", required = false)int index, ProductDto productDto, Model model ) {
        if (user == null){
            return "redirect:/";
        }
        ProductEntity order = this.productService.getStoreIndex(index);
        model.addAttribute("inputText",productDto.getInputText());
        model.addAttribute("price",productDto.getPrice());
        model.addAttribute("order",order);
        model.addAttribute("totalSale",productDto.getTotalSale());
        return "store/order";
    }



    /* 카드 선택하면 할인되는 */
    @GetMapping(value = "card",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public StoreOrderDto getCard(@RequestParam("cardName")String cardName, @RequestParam("rOrderTotalPrice")int rOrderTotalPrice){
//        JSONObject responseObject = new JSONObject();
//        responseObject.put("result", this.productService.getStoreSale(selectedValue, rOrderTotalPrice));
//        System.out.println(selectedValue);
        return this.productService.getStoreSale(cardName, rOrderTotalPrice);
    }

    @GetMapping(value = "terms",produces = MediaType.TEXT_HTML_VALUE)
    public String getTerms(){
        return "store/terms";
    }


//    @GetMapping(value = "/payment",produces = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseBody
//    public String getPayment(OrderEntity order){
//        JSONObject responseObject = new JSONObject();
//        responseObject.put("userEmail", this.orderService.selectEmail(order));
//        return responseObject.toString();
//    }

}
