package com.terabox.demo.controllers;


import com.terabox.demo.dtos.MovieOrderDto;
import com.terabox.demo.entities.OrderEntity;
import com.terabox.demo.entities.UserEntity;
import com.terabox.demo.exceptions.TransactionalException;
import com.terabox.demo.results.CommonResult;
import com.terabox.demo.results.OrderResult;
import com.terabox.demo.results.Result;
import com.terabox.demo.services.OrderService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "order")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /* 결제 완료 했을떄 들어가는 값 */
    @PostMapping(value = "product",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody /*이거 안적어줘서 계속 템플릿 없다고 뜬거였음 */
    public String postProduct(OrderEntity order,
                              @RequestParam("productIndex")int productIndex,
                              @RequestParam("cardName") String cardName){
        CommonResult result = this.orderService.postProductOrder(order,productIndex, cardName);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result",result.name().toLowerCase());
        return responseObject.toString();
    }

    /* 결제 완료 했을떄 들어가는 값 */
    @PostMapping(value = "movie",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postMovie(@SessionAttribute("user") UserEntity user,
                            OrderEntity order,
                            MovieOrderDto movieOrderDto){
        Result postMovieOrderResult;
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


    @GetMapping(value = "myMegaBox",produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMyMegaBox(@RequestParam(value = "user_email",required = false)String userEmail){
        ModelAndView model = new ModelAndView();
        userEmail = "1234@naver.com";
        model.addObject("list",this.orderService.selectOrderList(userEmail));
        model.setViewName("store/myMegabox");
       return model;
    }
}
