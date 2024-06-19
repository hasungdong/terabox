package com.terabox.demo.results;

public enum CommonResult implements Result{
    FAILURE,
    FAILURE_DUPLICATE,
    SUCCESS,
    FAILURE_NOT_POINT, //포인트 부족한 카드로 결제시
    FAILURE_QUANTITY //수량 업데이트 안됐을떄
}
