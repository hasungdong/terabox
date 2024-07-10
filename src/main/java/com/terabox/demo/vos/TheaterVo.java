package com.terabox.demo.vos;

import com.terabox.demo.entities.TheaterEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@EqualsAndHashCode(callSuper = true)
public class TheaterVo extends TheaterEntity {
    private String regionCodeTwo;
}
