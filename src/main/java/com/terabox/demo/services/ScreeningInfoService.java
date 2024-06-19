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


    //    상영정보 가져오는데, 만약 없다면 추가도 해주는 메서드
    public ScreeningInfoVo[] getScreeningInfoVos(LocalDate screeningDate, int cinemaIndex) {
//        상영정보 못가져오면 직접 추가한 다음 가져오려고 함
        if (this.screeningInfoMapper.selectScreeningInfosByCinemaAndDate(screeningDate, cinemaIndex).length < 1) {
//            어차피 추가할 때 영화가 무조건 null이고, 그러면 가격도 0임 당연히
            ScreeningInfoEntity tempInfo = new ScreeningInfoEntity();
            tempInfo.setCinemaIndex(cinemaIndex);
            tempInfo.setScreeningDate(screeningDate);
            tempInfo.setMovieIndex(null);
//            이러면 현재 한 관에 대해서 6번 실행된다.
            for (int i = 0; i <= 20; i = i + 4) {
                tempInfo.setScreeningTime(LocalTime.parse(String.format("%02d:00:00", i)));
                int isSuccess = this.screeningInfoMapper.insertScreeningInfo(tempInfo);
                if (isSuccess != 1) {
                    System.out.println(i + "시간대에서 오류 발생");
                }
            }
        }
        return this.screeningInfoMapper.selectScreeningInfoVoByCinemaAndDate(screeningDate, cinemaIndex);
    }

    //    상영정보 부분 수정
    public Result patchScreeningInfo(int index, Integer movieIndex) {
//        if문만 있으면 break;가 안먹어서 약간의 꼼수
        if (index < 1 || movieIndex < 1) {
            do {
                if (movieIndex == -1) {
//                    html에서 null을 넘기는게 안되더라 그래서 null이면 -1을 넘기게 만들었음
                    movieIndex = null;
                    break;
                }
                return CommonResult.FAILURE;
            } while (true);
        }
//        상영정보에 영화 빼고 값을 다 넣어놓은 틀을 먼저 잡아놓고,
//        그 다음에 영화 값만 받아서 수정하는 구조라서
//        검색해서 나오는 엔티티가 없으면 뭔가 잘못된 상황이라서 실패 반환
        ScreeningInfoEntity dbScreeningInfo = this.screeningInfoMapper.selectScreeningInfoByIndex(index);
        if (dbScreeningInfo == null) {
            return CommonResult.FAILURE;
        }
        dbScreeningInfo.setMovieIndex(movieIndex);
        return this.screeningInfoMapper.updateScreeningInfoByIndex(dbScreeningInfo) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }
}
