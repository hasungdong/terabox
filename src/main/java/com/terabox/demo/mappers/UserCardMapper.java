package com.terabox.demo.mappers;

import com.terabox.demo.entities.UserCardEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserCardMapper {
    UserCardEntity selectUserCard (String userEmail, String cardName);
    int updateMoney(UserCardEntity userCard);
}
