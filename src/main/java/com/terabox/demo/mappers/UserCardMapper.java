package com.terabox.demo.mappers;

import com.terabox.demo.entities.OrderEntity;
import com.terabox.demo.entities.UserCardEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserCardMapper {
    UserCardEntity selectUserCard (OrderEntity order);
    int updateMoney(UserCardEntity userCard);
}
