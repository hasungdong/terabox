package com.terabox.demo.services;

import com.terabox.demo.results.CommonResult;
import com.terabox.demo.results.Result;
import com.terabox.demo.vos.ScreeningInfoVo;
import com.terabox.demo.entities.ScreeningInfoEntity;
import com.terabox.demo.mappers.ScreeningInfoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
@Transactional
public class ScreeningInfoService {
    private final ScreeningInfoMapper screeningInfoMapper;

////    극장 안의 한 관에 대해 하루치의 상영정보를 추가하는 메서드
//    public CommonResult addScreeningInfoOnDay(ScreeningInfoEntity screeningInfo){
//        if (screeningInfo == null){
//            return CommonResult.FAILURE;
//        }
//        ScreeningInfoEntity[] dbScreeningInfo = this.screeningInfoMapper.selectScreeningInfoByDate(screeningInfo.getScreeningDate());
////        하루 전체에 대해 상영정보를 추가하려고 하는데,
////        해당 날짜에 대해 db에서 값을 가져올 때 값이 단 하나라도 있으면 중복임
//        if (dbScreeningInfo != null){
//            return CommonResult.FAILURE_DUPLICATE;
//        }
//        screeningInfo.setMovieIndex(null);
//        for (int i = 1; i <= screeningInfo.getCinemaIndex(); i++) {
//            this.screeningInfoMapper.insertScreeningInfo(screeningInfo);
//        }
//        return null;
//    }

//    public ScreeningInfoEntity[] getScreeningInfo(LocalDate screeningDate, int cinemaIndex){
////        상영정보 못가져오면 직접 추가한 다음 가져오려고 함
//        if (this.screeningInfoMapper.selectScreeningInfoByCinemaAndDate(screeningDate, cinemaIndex) == null){
////            어차피 추가할 때 영화가 무조건 null이고, 그러면 가격도 0임 당연히
//            ScreeningInfoEntity tempInfo = new ScreeningInfoEntity();
//            tempInfo.setCinemaIndex(cinemaIndex);
//            tempInfo.setScreeningDate(screeningDate);
//            tempInfo.setMovieIndex(null);
//            tempInfo.setPrice(0);
////            이러면 현재 한 관에 대해서 12번 실행된다.
//            for (int i = 0; i <= 22; i= i+2) {
//                tempInfo.setScreeningTime(LocalTime.parse("0" + i + ":00:00"));
//                this.screeningInfoMapper.insertScreeningInfo(tempInfo);
//            }
//        }
//        return this.screeningInfoMapper.selectScreeningInfoByCinemaAndDate(screeningDate, cinemaIndex);
//    }

    public ScreeningInfoVo[] getScreeningInfoVos(LocalDate screeningDate, int cinemaIndex){
//        상영정보 못가져오면 직접 추가한 다음 가져오려고 함
        if (this.screeningInfoMapper.selectScreeningInfosByCinemaAndDate(screeningDate, cinemaIndex).length < 1){
//            어차피 추가할 때 영화가 무조건 null이고, 그러면 가격도 0임 당연히
            ScreeningInfoEntity tempInfo = new ScreeningInfoEntity();
            tempInfo.setCinemaIndex(cinemaIndex);
            tempInfo.setScreeningDate(screeningDate);
            tempInfo.setMovieIndex(null);
//            이러면 현재 한 관에 대해서 12번 실행된다.
            for (int i = 0; i <= 22; i= i+2) {
                tempInfo.setScreeningTime(LocalTime.parse(String.format("%02d:00:00", i)));
                this.screeningInfoMapper.insertScreeningInfo(tempInfo);
            }
        }
        return this.screeningInfoMapper.selectScreeningInfoVoByCinemaAndDate(screeningDate.toString(), cinemaIndex);
    }

    public Result patchScreeningInfo(int index, int movieIndex) {
        if (index < 1 || movieIndex < 1){
            return CommonResult.FAILURE;
        }
//        상영정보에 영화 빼고 값을 다 넣어놓은 틀을 먼저 잡아놓고,
//        그 다음에 영화 값만 받아서 수정하는 구조라서
//        검색해서 나오는 엔티티가 없으면 뭔가 잘못된 상황이라서 실패 반환
        ScreeningInfoEntity dbScreeningInfo = this.screeningInfoMapper.selectScreeningInfoByIndex(index);
        if (dbScreeningInfo == null){
            return CommonResult.FAILURE;
        }
        dbScreeningInfo.setMovieIndex(movieIndex);
        return this.screeningInfoMapper.updateScreeningInfoByIndex(dbScreeningInfo) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }
}
