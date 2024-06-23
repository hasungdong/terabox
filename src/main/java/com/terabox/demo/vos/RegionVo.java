package com.terabox.demo.vos;

import com.terabox.demo.entities.RegionEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@EqualsAndHashCode(callSuper = true)
public class RegionVo extends RegionEntity {
    private String codeTwo;
    private String textTwo;
}
