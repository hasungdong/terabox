package com.terabox.demo.mappers;

import com.terabox.demo.entities.OrderEntity;
import com.terabox.demo.vos.OrderVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestParam;

@Mapper
public interface OrderMapper {
    int insertOrder(OrderEntity order);

    OrderVo[] selectEmailByList(@RequestParam("email")String email);






}
