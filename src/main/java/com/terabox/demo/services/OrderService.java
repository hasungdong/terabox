package com.terabox.demo.services;

import com.terabox.demo.entities.OrderEntity;
import com.terabox.demo.entities.ProductEntity;
import com.terabox.demo.entities.UserCardEntity;
import com.terabox.demo.mappers.OrderMapper;
import com.terabox.demo.mappers.ProductMapper;
import com.terabox.demo.mappers.UserCardMapper;
import com.terabox.demo.results.CommonResult;
import com.terabox.demo.vos.OrderVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;

@Service
public class OrderService {
    private final OrderMapper orderMapper;
    private final UserCardMapper userCardMapper;
    private final ProductMapper productMapper;
    @Autowired
    public OrderService(OrderMapper orderMapper, UserCardMapper userCardMapper, ProductMapper productMapper) {
        this.orderMapper = orderMapper;
        this.userCardMapper = userCardMapper;
        this.productMapper = productMapper;
    }

    /* 결제하기 누르면 결제되는 창 */
    public CommonResult postOrder(OrderEntity order,@RequestParam("productIndex") int productIndex){

//        여기 바꿔야댐
//        이메일은 어차피 로그인 세션에서 가져오면 됨
        order.setUserEmail("1234@naver.com");
        order.setMovieReservationIndex(null);
        order.setCreatedAt(LocalDateTime.now());


        UserCardEntity cardDb = this.userCardMapper.selectUserCard(order);
        ProductEntity product = this.productMapper.selectProductByIndex(productIndex);

        if (cardDb == null){
            return CommonResult.FAILURE;
        }
        if (cardDb.getMoney() < order.getTotalPrice()){
            return CommonResult.FAILURE_NOT_POINT;
        }
        if (product.getQuantity() < order.getQuantity()){
            return CommonResult.FAILURE_QUANTITY;
        }

        //결제 금액만큼 포인트 차감되는 쿼리
        order.setUserCardMappingIndex(cardDb.getIndex());
        cardDb.setMoney(cardDb.getMoney() - order.getTotalPrice());
        product.setQuantity(product.getQuantity()- order.getQuantity());

        if (this.productMapper.updateProduct(product)< 1){
            return CommonResult.FAILURE;
        }
        if (this.userCardMapper.updateMoney(cardDb) < 1){
            return CommonResult.FAILURE;
        }
        return this.orderMapper.insertOrder(order) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public UserCardEntity selectEmail(OrderEntity order){
        return this.userCardMapper.selectUserCard(order);
    }

    public OrderVo[] selectOrderList(String userEmail){
        ModelAndView model = new ModelAndView();
        OrderVo[] dbOrder = this.orderMapper.selectEmailByList(userEmail);
        model.addObject("list", dbOrder);
        return dbOrder;
    }
}
