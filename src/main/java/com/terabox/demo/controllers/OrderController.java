package com.terabox.demo.controllers;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabox.demo.dtos.MovieOrderDto;
import com.terabox.demo.entities.OrderEntity;
import com.terabox.demo.entities.ProductPaymentTargetEntity;
import com.terabox.demo.entities.UserEntity;
import com.terabox.demo.exceptions.TransactionalException;
import com.terabox.demo.results.CommonResult;
import com.terabox.demo.results.OrderResult;
import com.terabox.demo.results.Result;
import com.terabox.demo.services.OrderService;
import com.terabox.demo.vos.OrderVo;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(value = "order")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /* 결제 완료 했을떄 들어가는 값 */
    @PostMapping(value = "product", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody /*이거 안적어줘서 계속 템플릿 없다고 뜬거였음 */
    public String postProduct(OrderEntity order,
                              ProductPaymentTargetEntity productPaymentTarget,
                              @RequestParam("cardName") String cardName,
                              @SessionAttribute(value = "user",required = false)UserEntity user) {
        CommonResult result = this.orderService.postProductOrder(order, productPaymentTarget, cardName, user);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    /* 결제 완료 했을떄 들어가는 값 */
    @PostMapping(value = "movie", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postMovie(@SessionAttribute(value = "user", required = false) UserEntity user,
                            OrderEntity order,
                            @RequestParam("movieOrderDto") String movieOrderDtoJson,
                            @RequestParam("seatIndexesString") String seatIndexesString) throws JsonProcessingException {
        String replace = seatIndexesString.replace("[", "").replace("]", "");
        String[] seatIndexArray = replace.split(", ");
        int[] temp = new int[seatIndexArray.length];
        for (int i = 0; i < seatIndexArray.length; i++) {
            temp[i] = Integer.parseInt(seatIndexArray[i]);
        }
        Result postMovieOrderResult;
        ObjectMapper objectMapper = new ObjectMapper();
        MovieOrderDto movieOrderDto = objectMapper.readValue(movieOrderDtoJson, MovieOrderDto.class);
        movieOrderDto.setSeatIndexes(temp);
//        예외가 발생해도 클라이언트 측에서는 오류 페이지가 아니라 우리가 만든 경고창이 뜨게 하기 위해서 예외처리
        try {
            postMovieOrderResult = this.orderService.postMovieOrder(user, order, movieOrderDto);
        } catch (TransactionalException ignored) {
//            예외 발생시 에러
            postMovieOrderResult = OrderResult.ORDER_ERROR;
        }
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", postMovieOrderResult.name().toLowerCase());
        return responseObject.toString();
    }


    @GetMapping(value = "productOrder",produces = MediaType.TEXT_HTML_VALUE)
    public String  getProductOrder(@SessionAttribute(value = "user",required = false)UserEntity user,
                                        Model model){
        OrderVo[] tempList = this.orderService.selectOrderList(user);
        List<OrderVo> list = new ArrayList<>();
        if (tempList == null ||tempList.length == 0){
            System.out.println(1);
        }  else {
            for (OrderVo orderVo : tempList) {
                if (orderVo.getMovieTitle() == null){
                    list.add(orderVo);

                    System.out.println(list);
                }
            }
        }
        model.addAttribute("list", list);
        return "order/productOrder";
    }

    @GetMapping(value = "movieOrder",produces = MediaType.TEXT_HTML_VALUE)
    public String  getMovieOrder(@SessionAttribute(value = "user",required = false)UserEntity user,
                                 Model model){

        OrderVo[] tempList = this.orderService.selectOrderList(user);
        List<OrderVo> list = new ArrayList<>();
        if (tempList == null || tempList.length == 0){
            System.out.println(2);
        }  else {
            for (OrderVo orderVo : tempList) {
                if (orderVo.getMovieTitle() != null){
                    list.add(orderVo);
                }
            }
        }
        model.addAttribute("list", list);
        return "order/movieOrder";
    }
}
