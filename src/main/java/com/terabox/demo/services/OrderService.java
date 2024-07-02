package com.terabox.demo.services;

import com.terabox.demo.dtos.MovieOrderDto;
import com.terabox.demo.entities.*;
import com.terabox.demo.mappers.OrderMapper;
import com.terabox.demo.mappers.ProductMapper;
import com.terabox.demo.mappers.SeatPriceMapper;
import com.terabox.demo.mappers.UserCardMapper;
import com.terabox.demo.results.CommonResult;
import com.terabox.demo.results.Result;
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
    private final SeatPriceMapper seatPriceMapper;

    @Autowired
    public OrderService(OrderMapper orderMapper, UserCardMapper userCardMapper, ProductMapper productMapper, SeatPriceMapper seatPriceMapper) {
        this.orderMapper = orderMapper;
        this.userCardMapper = userCardMapper;
        this.productMapper = productMapper;
        this.seatPriceMapper = seatPriceMapper;
    }

    /* 결제하기 누르면 결제되는 창 */
    public CommonResult postProductOrder(OrderEntity order,
                                         @RequestParam("productIndex") int productIndex,
                                         String cardName) {

//        여기 바꿔야댐
//        이메일은 어차피 로그인 세션에서 가져오면 됨
        order.setUserEmail("1234@naver.com");
        order.setMovieReservationIndex(null);
        order.setCreatedAt(LocalDateTime.now());


        UserCardEntity cardDb = this.userCardMapper.selectUserCard(order, cardName);
        ProductEntity product = this.productMapper.selectProductByIndex(productIndex);

        if (cardDb == null) {
            return CommonResult.FAILURE;
        }
        if (cardDb.getMoney() < order.getTotalPrice()) {
            return CommonResult.FAILURE_NOT_POINT;
        }
        if (product.getQuantity() < order.getQuantity()) {
            return CommonResult.FAILURE_QUANTITY;
        }

        //결제 금액만큼 포인트 차감되는 쿼리
        order.setUserCardMappingIndex(cardDb.getIndex());
        cardDb.setMoney(cardDb.getMoney() - order.getTotalPrice());
        product.setQuantity(product.getQuantity() - order.getQuantity());

        if (this.productMapper.updateProduct(product) < 1) {
            return CommonResult.FAILURE;
        }
        if (this.userCardMapper.updateMoney(cardDb) < 1) {
            return CommonResult.FAILURE;
        }
        return this.orderMapper.insertOrder(order) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

//    public UserCardEntity selectEmail(OrderEntity order){
//        return this.userCardMapper.selectUserCard(order);
//    }

    public OrderVo[] selectOrderList(String userEmail) {
        ModelAndView model = new ModelAndView();
        OrderVo[] dbOrder = this.orderMapper.selectEmailByList(userEmail);
        model.addObject("list", dbOrder);
        return dbOrder;
    }

    //    영화 결제
    public Result postMovieOrder(UserEntity user,
                                 OrderEntity order,
                                 MovieOrderDto movieOrderDto) {
        if (user == null) {
            return CommonResult.FAILURE;
        }
//                보안 취약점 방지
        order.setUserEmail(user.getEmail());
        order.setProductIndex(null);
        order.setCreatedAt(LocalDateTime.now());
        order.setPrice(0);

//        유효성 검사
//        이메일이랑 카드 이름으로 카드 가져왔을 때,
//        카드가 존재하면 결제 대상 카드를 가져온 카드로 지정한다.
        UserCardEntity dbCard = this.userCardMapper.selectUserCard(order, movieOrderDto.getCardName());
        if (dbCard == null) {
            return CommonResult.FAILURE;
        }
        order.setUserCardMappingIndex(dbCard.getIndex());

        //        잔고 부족을 위한 변수 선언
        int totalPrice = 0;
        int adultPrice = 0;
        int teenagerPrice = 0;
        int oldPrice = 0;
        int disabledPrice = 0;

//        받은 좌석 갯수만큼 반복
        SeatPriceEntity[] seatPrices = this.seatPriceMapper.selectSeatPrices();
        for (SeatPriceEntity seatPrice : seatPrices) {
//            받은 좌석 타입 종류에 따라 가격 다르게 설정
            switch (seatPrice.getType()) {
                case "adult":
                    adultPrice = seatPrice.getPrice() * movieOrderDto.getAdultCount();
                    //                    해당 타입의 개수만큼 반복
                    for (int i = 0; i < movieOrderDto.getAdultCount(); i++) {
                        totalPrice += adultPrice;
                    }
                    break;
                case "teenager":
                    teenagerPrice = seatPrice.getPrice() * movieOrderDto.getAdultCount();
                    //                    해당 타입의 개수만큼 반복
                    for (int i = 0; i < movieOrderDto.getTeenagerCount(); i++) {
                        totalPrice += teenagerPrice;
                    }
                    break;
                case "old":
                    oldPrice = seatPrice.getPrice() * movieOrderDto.getOldCount();
                    //                    해당 타입의 개수만큼 반복
                    for (int i = 0; i < movieOrderDto.getOldCount(); i++) {
                        totalPrice += oldPrice;
                    }
                    break;
                case "disabled":
                    disabledPrice = seatPrice.getPrice() * movieOrderDto.getDisabledCount();
                    //                    해당 타입의 개수만큼 반복
                    for (int i = 0; i < movieOrderDto.getDisabledCount(); i++) {
                        totalPrice += disabledPrice;
                    }
                    break;
                default:
                    return CommonResult.FAILURE;
            }
        }

//        통장에 돈이 모자라면 실패
        if (dbCard.getMoney() < totalPrice){
            return CommonResult.FAILURE_NOT_POINT;
        }

//        영화예약 엔티티 생성
        MovieReservationEntity movieReservationEntity = new MovieReservationEntity();
        movieReservationEntity.setScreeningInfoIndex(movieOrderDto.getScreeningInfoIndex());

//        결제하려는 좌석의 총 개수
        int totalCount = movieOrderDto.getAdultCount() +
                movieOrderDto.getTeenagerCount() +
                movieOrderDto.getOldCount() +
                movieOrderDto.getDisabledCount();

//        총 개수만큼 반복
        for (int i = 0; i < totalCount; i++) {
//            seatIndexes의 길이가 좌석 총 길이와 반드시 같아서 i 사용해도 문제 없다.
            movieReservationEntity.setSeatIndex(movieOrderDto.getSeatIndexes()[i]);

//            MovieReservation 테이블에 insert 결과에 따라 다른 로직
            if (this.orderMapper.insertMovieReservation(movieReservationEntity) != 1){
                return CommonResult.FAILURE;
            }

//            insert 성공했으면 바로 불러온다.
            MovieReservationEntity dbMovieReservation = this.orderMapper.selectMovieReservationBySeatScreeningInfo(movieOrderDto.getScreeningInfoIndex(), movieOrderDto.getSeatIndexes()[i]);

//            불러온 엔티티의 index를 order의 멤버변수로 지정
            order.setMovieReservationIndex(dbMovieReservation.getIndex());
            if (this.orderMapper.insertOrder(order) != 1){
                return CommonResult.FAILURE;
            }

        }
        return CommonResult.SUCCESS;
    }
}
