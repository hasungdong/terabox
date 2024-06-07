package com.terabox.demo.services;

import com.terabox.demo.entities.ScreeningInfoEntity;
import com.terabox.demo.mappers.ScreeningInfoMapper;
import com.terabox.demo.results.CommonResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ScreeningInfoService {
    private final ScreeningInfoMapper screeningInfoMapper;

//    극장 안의 한 관에 대해 하루치의 상영정보를 추가하는 메서드
    public CommonResult addScreeningInfoOnDay(ScreeningInfoEntity screeningInfo){
        if (screeningInfo == null){
            return CommonResult.FAILURE;
        }
        ScreeningInfoEntity[] dbScreeningInfo = this.screeningInfoMapper.selectScreeningInfoByDate(screeningInfo.getScreeningDate());
//        하루 전체에 대해 상영정보를 추가하려고 하는데,
//        해당 날짜에 대해 db에서 값을 가져올 때 값이 단 하나라도 있으면 중복임
        if (dbScreeningInfo != null){
            return CommonResult.FAILURE_DUPLICATE;
        }
        screeningInfo.setMovieIndex(null);
        for (int i = 1; i <= screeningInfo.getCinemaIndex(); i++) {
            this.screeningInfoMapper.insertScreeningInfo(screeningInfo);
        }
        return null;
    }
}
