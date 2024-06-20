package com.terabox.demo.controllers;


import com.terabox.demo.entities.OrderEntity;
import com.terabox.demo.results.CommonResult;
import com.terabox.demo.services.OrderService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "store")
public class OrderController {
    private final OrderService orderService;


    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    /* 결제 완료 했을떄 들어가는 값 */
    @PostMapping(value = "order",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody /*이거 안적어줘서 계속 템플릿 없다고 뜬거였음 */
    public String postOrder(OrderEntity order,@RequestParam("productIndex")int productIndex){
        CommonResult result = this.orderService.postOrder(order,productIndex);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result",result.name().toLowerCase());
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
