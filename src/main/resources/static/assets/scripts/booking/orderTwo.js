const orderTwoContainer = document.querySelector('.order-two-container');
const selectPeopleCells = orderTwoContainer.querySelectorAll('.cell');
const adultCell = orderTwoContainer.querySelector('.cell.adult');
const teenagerCell = orderTwoContainer.querySelector('.cell.teenager');
const oldCell = orderTwoContainer.querySelector('.cell.old');
const disabledCell = orderTwoContainer.querySelector('.cell.disabled');
const seats = orderTwoContainer.querySelectorAll('.my-seat > .seat');
const selectSeatButtons = orderTwoContainer.querySelectorAll('.seat-condition.standard');

const seatTypeCounts = orderTwoContainer.querySelectorAll('.pay-area > .count > span');
let adultCount;
let teenagerCount;
let oldCount;
let disabledCount;

const otherTime = orderTwoContainer.querySelector('.other-time');

// 다른 관람시간대 보였다 안보였다 하기
otherTime.querySelector('.now').onclick = () => {
    if (!otherTime.classList.contains('on')){
        otherTime.classList.add('on');

        const otherLis = otherTime.querySelectorAll('.other > li');
        otherLis.forEach(otherLi => otherLi.onclick = () => {
            otherTime.querySelector('.now').innerText = otherLi.querySelector('.btn').innerText;
            otherTime.classList.remove('on');
        });
    } else {
        otherTime.classList.remove('on');
    }
}

seatTypeCounts.forEach(seatTypeCount => {
    if (seatTypeCount.classList.contains('adult')){
        adultCount = seatTypeCount.querySelector('em');
    }
    if (seatTypeCount.classList.contains('teenager')){
        teenagerCount = seatTypeCount.querySelector('em');
    }
    if (seatTypeCount.classList.contains('old')){
        oldCount = seatTypeCount.querySelector('em');
    }
    if (seatTypeCount.classList.contains('disabled')){
        disabledCount = seatTypeCount.querySelector('em');
    }
});

// 인원수 증가 감소 버튼 구현
selectPeopleCells.forEach(selectPeopleCell => {
    const sortingSeats = () => {
        // 좌석이 선택된 경우
        let seatsIncludingValue = [];
        // 좌석을 고를 수 있는 상태
        let seatsCanIncludeValue = [];
        // 좌석을 고를 수 없는 상태
        let seatsNotIncludingValue = [];
        // 좌석을 경우에 따라 배열에 담기
        seats.forEach(seat => {
            if (seat.classList.contains('choice')) {
                seatsIncludingValue.push(seat);
            } else if (seat.classList.contains('possible')) {
                seatsCanIncludeValue.push(seat);
            } else {
                seatsNotIncludingValue.push(seat);
            }
        });
    }

    let seatsIncludingValue = [];
    // 좌석을 고를 수 있는 상태
    let seatsCanIncludeValue = [];
    // 좌석을 고를 수 없는 상태
    let seatsNotIncludingValue = [];
    // 좌석을 경우에 따라 배열에 담기
    seats.forEach(seat => {
        if (seat.classList.contains('choice')) {
            seatsIncludingValue.push(seat);
        } else if (seat.classList.contains('possible')) {
            seatsCanIncludeValue.push(seat);
        } else {
            seatsNotIncludingValue.push(seat);
        }
    });

    // 인원수 증가
    selectPeopleCell.querySelector('.up').onclick = () => {
        let SumCellsCount = 0;
        selectPeopleCells.forEach(selectPeopleCell => {
            SumCellsCount += parseInt(selectPeopleCell.querySelector('.now').innerText);
        });

        // 8명보다 많이 선택하는 거 방지
        if (SumCellsCount >= 8) {
            alertCover.show();
            new MessageObj({
                title: '알림',
                content: `인원선택은 총 8명까지 가능합니다.`,
                buttons: [
                    {
                        text: '확인', onclick: instance => {
                            instance.hide();
                            alertCover.hide();
                        }
                    }
                ]
            }).show();
            return;
        }

        seatsIncludingValue = [];
        // 좌석을 고를 수 있는 상태
        seatsCanIncludeValue = [];
        // 좌석을 고를 수 없는 상태
        seatsNotIncludingValue = [];
        // 좌석을 경우에 따라 배열에 담기
        seats.forEach(seat => {
            if (seat.classList.contains('choice')) {
                seatsIncludingValue.push(seat);
            } else if (seat.classList.contains('possible')) {
                seatsCanIncludeValue.push(seat);
            } else {
                seatsNotIncludingValue.push(seat);
            }
        });

        seatsNotIncludingValue[0].classList.add('possible');
        // 변화를 줬으면 다시 나눠담기
        seatsIncludingValue = [];
        // 좌석을 고를 수 있는 상태
        seatsCanIncludeValue = [];
        // 좌석을 고를 수 없는 상태
        seatsNotIncludingValue = [];
        // 좌석을 경우에 따라 배열에 담기
        seats.forEach(seat => {
            if (seat.classList.contains('choice')) {
                seatsIncludingValue.push(seat);
            } else if (seat.classList.contains('possible')) {
                seatsCanIncludeValue.push(seat);
            } else {
                seatsNotIncludingValue.push(seat);
            }
        });

        selectPeopleCell.querySelector('.now').innerText = parseInt(selectPeopleCell.querySelector('.now').innerText) + 1;
        // 경로석
        if (selectPeopleCell.classList.contains('old')) {
            // 0에서 1로 갈때만 알림창이 떠야되니까
            if (parseInt(selectPeopleCell.querySelector('.now').innerText) === 1) {
                alertCover.show();
                new MessageObj({
                    title: '알림',
                    content: `◆ 경로 : 만 65세 이상(신분증) <br> <br>경로요금은 만65세 이상 고객에게만 적용되며, 상영관 입장시 본인신분증을 제시해 주시기 바랍니다(*미지참시 입장 제한) <br> <br>*경로선택 시 추가 할인이 제한될 수 있습니다`,
                    buttons: [
                        {
                            text: '확인', onclick: instance => {
                                instance.hide();
                                alertCover.hide();
                            }
                        }
                    ]
                }).show();
                document.querySelector('._obj-message').style.width = '400px';
            }
        }
        // 우대석, 장애인
        if (selectPeopleCell.classList.contains('disabled')) {
            // 0에서 1로 갈때만 알림창이 떠야되니까
            if (parseInt((selectPeopleCell.querySelector('.now').innerText)) === 1) {
                alertCover.show();
                new MessageObj({
                    title: '알림',
                    content: `※만 65세이상 고객님께서는 [경로]발권 부탁드립니다(*지점별 상이) <br><br>◆ 우대요금은 장애인 고객에게 적용되며, 상영관 입장 시 본인확인 증빙서류를 제시해 주시기 바랍니다. <br>(미지참 시 입장 제한) <br><br>- 장애인: 1~6급 (복지카드) <br>- 국가유공자: (국가유공자증) <br><br>위 항목 외 지점별 우대요금 추가적용 대상은 직원확인 후 발권이 가능합니다 <br>*우대선택 시 추가 할인이 제한될 수 있습니다. <br>*국가유공자증에 한하며, 국가유공자 유족증 등은 할인이 불가합니다.`,
                    buttons: [
                        {
                            text: '확인', onclick: instance => {
                                instance.hide();
                                alertCover.hide();
                            }
                        }
                    ]
                }).show();
                document.querySelector('._obj-message').style.width = '400px';
            }
        }

        if (seatsCanIncludeValue.length !== 0) {
            document.getElementById('pageNext').classList.remove('active');
            document.getElementById('pageNext').classList.add('disabled');
        }

        // 변경이 있을 때 값이 1 오르고 내리는 식이 아니라 그냥 전체 값을 다시 설정하는 거
        if (seatsIncludingValue.length >= parseInt(adultCell.querySelector('.now').innerText)){
            adultCount.innerText = parseInt(adultCell.querySelector('.now').innerText);

            if (seatsIncludingValue.length >=
                parseInt(adultCell.querySelector('.now').innerText) +
                parseInt(teenagerCell.querySelector('.now').innerText)){
                teenagerCount.innerText = parseInt(teenagerCell.querySelector('.now').innerText);

                if (seatsIncludingValue.length >=
                    parseInt(adultCell.querySelector('.now').innerText) +
                    parseInt(teenagerCell.querySelector('.now').innerText) +
                    parseInt(oldCell.querySelector('.now').innerText)){
                    oldCount.innerText = parseInt(oldCell.querySelector('.now').innerText);

                    if (seatsIncludingValue.length >=
                        parseInt(adultCell.querySelector('.now').innerText) +
                        parseInt(teenagerCell.querySelector('.now').innerText) +
                        parseInt(oldCell.querySelector('.now').innerText) +
                        parseInt(disabledCell.querySelector('.now').innerText)){
                        disabledCount.innerText = parseInt(disabledCell.querySelector('.now').innerText);
                    } else {
                        disabledCount.innerText = seatsIncludingValue.length
                            - parseInt(adultCell.querySelector('.now').innerText)
                            - parseInt(teenagerCell.querySelector('.now').innerText)
                            - parseInt(oldCell.querySelector('.now').innerText);
                    }
                } else {
                    oldCount.innerText = seatsIncludingValue.length
                        - parseInt(adultCell.querySelector('.now').innerText)
                        - parseInt(teenagerCell.querySelector('.now').innerText);
                }
            } else {
                teenagerCount.innerText = seatsIncludingValue.length - parseInt(adultCell.querySelector('.now').innerText);
            }
        }


        seatTypeCounts.forEach(seatTypeCount => seatTypeCount.querySelector('em').innerText === '0' ? seatTypeCount.style.display = 'none' : seatTypeCount.style.display = 'block');
    }

//     감소 버튼 눌렀을 때
    selectPeopleCell.querySelector('.down').onclick = () => {
        if (parseInt(selectPeopleCell.querySelector('.now').innerText) === 0) {
            return;
        }

        seatsIncludingValue = [];
        // 좌석을 고를 수 있는 상태
        seatsCanIncludeValue = [];
        // 좌석을 고를 수 없는 상태
        seatsNotIncludingValue = [];
        // 좌석을 경우에 따라 배열에 담기
        seats.forEach(seat => {
            if (seat.classList.contains('choice')) {
                seatsIncludingValue.push(seat);
            } else if (seat.classList.contains('possible')) {
                seatsCanIncludeValue.push(seat);
            } else {
                seatsNotIncludingValue.push(seat);
            }
        });

        // 고른 좌석에 회색없이 보라색만 있는 경우
        // 기본 상태의 좌석이 8개보다 적으면서(전체 좌석수가 8개임)
        if (seatsNotIncludingValue.length < 8) {
            // 값을 고를 수 있는 좌석이 있다면
            if (seatsCanIncludeValue.length > 0) {
                selectPeopleCell.querySelector('.now').innerText = parseInt(selectPeopleCell.querySelector('.now').innerText) - 1;

                // 변경이 있을 때 값이 1 오르고 내리는 식이 아니라 그냥 전체 값을 다시 설정하는 거
                if (seatsIncludingValue.length >= parseInt(adultCell.querySelector('.now').innerText)){
                    adultCount.innerText = parseInt(adultCell.querySelector('.now').innerText);

                    if (seatsIncludingValue.length >=
                        parseInt(adultCell.querySelector('.now').innerText) +
                        parseInt(teenagerCell.querySelector('.now').innerText)){
                        teenagerCount.innerText = parseInt(teenagerCell.querySelector('.now').innerText);

                        if (seatsIncludingValue.length >=
                            parseInt(adultCell.querySelector('.now').innerText) +
                            parseInt(teenagerCell.querySelector('.now').innerText) +
                            parseInt(oldCell.querySelector('.now').innerText)){
                            oldCount.innerText = parseInt(oldCell.querySelector('.now').innerText);

                            if (seatsIncludingValue.length >=
                                parseInt(adultCell.querySelector('.now').innerText) +
                                parseInt(teenagerCell.querySelector('.now').innerText) +
                                parseInt(oldCell.querySelector('.now').innerText) +
                                parseInt(disabledCell.querySelector('.now').innerText)){
                                disabledCount.innerText = parseInt(disabledCell.querySelector('.now').innerText);
                            } else {
                                disabledCount.innerText = seatsIncludingValue.length
                                    - parseInt(adultCell.querySelector('.now').innerText)
                                    - parseInt(teenagerCell.querySelector('.now').innerText)
                                    - parseInt(oldCell.querySelector('.now').innerText);
                            }
                        } else {
                            oldCount.innerText = seatsIncludingValue.length
                                - parseInt(adultCell.querySelector('.now').innerText)
                                - parseInt(teenagerCell.querySelector('.now').innerText);
                        }
                    } else {
                        teenagerCount.innerText = seatsIncludingValue.length - parseInt(adultCell.querySelector('.now').innerText);
                    }
                }

                seatTypeCounts.forEach(seatTypeCount => seatTypeCount.querySelector('em').innerText === '0' ? seatTypeCount.style.display = 'none' : seatTypeCount.style.display = 'block');

                // 값을 고를 수 있는 좌석의 맨 뒤값에 possible을 지운다.
                // == 기본 상태 좌석으로 변경
                seatsCanIncludeValue[seatsCanIncludeValue.length - 1].classList.remove('possible');

                // 변화를 줬으면 다시 나눠담기
                seatsIncludingValue = [];
                // 좌석을 고를 수 있는 상태
                seatsCanIncludeValue = [];
                // 좌석을 고를 수 없는 상태
                seatsNotIncludingValue = [];
                // 좌석을 경우에 따라 배열에 담기
                seats.forEach(seat => {
                    if (seat.classList.contains('choice')) {
                        seatsIncludingValue.push(seat);
                    } else if (seat.classList.contains('possible')) {
                        seatsCanIncludeValue.push(seat);
                    } else {
                        seatsNotIncludingValue.push(seat);
                    }
                });
                // 이거는 빼고 난 후에 값을 고를 수 있는 좌석이 없는 거고,
                // 밑에 else 문은 아직 빼기 전인데 값을 고를 수 있는 좌석이 없는 거임
                if (seatsCanIncludeValue.length === 0) {
                    document.getElementById('pageNext').classList.remove('disabled');
                    document.getElementById('pageNext').classList.add('active');
                }
            } else {
                // 값을 고를 수 있는 좌석이 없다면
                alertCover.show();
                new MessageObj({
                    title: '알림',
                    content: `선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?`,
                    buttons: [
                        {
                            text: '취소', onclick: instance => {
                                instance.hide();
                                alertCover.hide();
                            }
                        },
                        {
                            // 여기 구현 해야됨 나중에
                            text: '확인', onclick: instance => {
                                instance.hide();
                                alertCover.hide();
                            }
                        }
                    ]
                }).show();
                document.querySelector('._obj-message').style.width = '400px';
            }
        }
    }

    selectSeatButtons.forEach(selectSeatButton => {
        // 좌석 선택 버튼에 마우스 올라갔을 때
        selectSeatButton.onmouseenter = () => {
            // 자바스크립트의 함수는 페이지 로드와 동시에 위에서부터 전부 다 실행된다.
            // 그래서 up 버튼 누르기 전에 지금 함수가 먼저 실행됐기 때문에 위에서 배열 값을 바꾼게 여기서 적용된 상태가 아니다.
            // 그래서 배열을 사용하고 싶으면 분류를 새로 해줘야됨
            seatsIncludingValue = [];
            // 좌석을 고를 수 있는 상태
            seatsCanIncludeValue = [];
            // 좌석을 고를 수 없는 상태
            seatsNotIncludingValue = [];
            // 좌석을 경우에 따라 배열에 담기
            seats.forEach(seat => {
                if (seat.classList.contains('choice')) {
                    seatsIncludingValue.push(seat);
                } else if (seat.classList.contains('possible')) {
                    seatsCanIncludeValue.push(seat);
                } else {
                    seatsNotIncludingValue.push(seat);
                }
            });

            // 관람 인원이 남아서 좌석을 선택할 수 있을 때
            if (seatsCanIncludeValue.length > 0) {
                // 예매완료, 선택 불가 좌석 눌렀을 때
                if (selectSeatButton.classList.contains('finish') ||
                    selectSeatButton.classList.contains('impossible')) {
                    return;
                }
                // on 붙으면 보라색으로 바뀜
                selectSeatButton.classList.add('on');

                selectSeatButton.onmouseleave = () => {
                    selectSeatButton.classList.remove('on');
                }

            }
        }

        // 좌석 선택 버튼 눌렀을 때
        selectSeatButton.onclick = () => {
            // 예매완료, 선택 불가 좌석 눌렀을 때
            if (selectSeatButton.classList.contains('finish') ||
                selectSeatButton.classList.contains('impossible')) {
                return;
            }

            // 관람 인원 없이 좌석 선택 하려고 할 때
            let SumCellsCount = 0;
            selectPeopleCells.forEach(selectPeopleCell => {
                SumCellsCount += parseInt(selectPeopleCell.querySelector('.now').innerText);
            });

            if (SumCellsCount === 0) {
                alertCover.show();
                new MessageObj({
                    title: '알림',
                    content: `관람하실 인원을 먼저 선택해주세요.`,
                    buttons: [
                        {
                            text: '확인', onclick: instance => {
                                instance.hide();
                                alertCover.hide();
                            }
                        }
                    ]
                }).show();
                return;
            }

            // 자바스크립트의 함수는 페이지 로드와 동시에 위에서부터 전부 다 실행된다.
            // 그래서 up 버튼 누르기 전에 지금 함수가 먼저 실행됐기 때문에 위에서 배열 값을 바꾼게 여기서 적용된 상태가 아니다.
            // 그래서 배열을 사용하고 싶으면 분류를 새로 해줘야됨
            seatsIncludingValue = [];
            // 좌석을 고를 수 있는 상태
            seatsCanIncludeValue = [];
            // 좌석을 고를 수 없는 상태
            seatsNotIncludingValue = [];
            // 좌석을 경우에 따라 배열에 담기
            seats.forEach(seat => {
                if (seat.classList.contains('choice')) {
                    seatsIncludingValue.push(seat);
                } else if (seat.classList.contains('possible')) {
                    seatsCanIncludeValue.push(seat);
                } else {
                    seatsNotIncludingValue.push(seat);
                }
            });

            // 관람인원 수보다 좌석을 더 많이 고르려고 할 때
            if (seatsCanIncludeValue.length === 0) {
                if (!selectSeatButton.classList.contains('choice')) {
                    alertCover.show();
                    new MessageObj({
                        title: '알림',
                        content: `좌석 선택이 완료되었습니다.`,
                        buttons: [
                            {
                                text: '확인', onclick: instance => {
                                    instance.hide();
                                    alertCover.hide();
                                }
                            }
                        ]
                    }).show();
                    return;
                }
            }

            // 선택되지 않았으면서 장애인석인 좌석 눌렀을 때
            if (selectSeatButton.classList.contains('disabled') &&
                !selectSeatButton.classList.contains('choice')) {
                alertCover.show();
                new MessageObj({
                    title: '알림',
                    content: `해당좌석은 장애인 전용 좌석으로 일반고객은 다른 좌석을 선택하여 주시기 바랍니다.`,
                    buttons: [
                        {
                            text: '확인', onclick: instance => {
                                instance.hide();
                                alertCover.hide();
                            }
                        }
                    ]
                }).show();
                document.querySelector('._obj-message').style.width = '300px';
            }

            // 값을 고를 수 있는 좌석에 값 채우기
            if (selectSeatButton.classList.contains('common') ||
                selectSeatButton.classList.contains('disabled')) {

                // 누른 버튼 보라색 > 회색, 회색이면 보라색으로
                selectSeatButton.classList.toggle('choice')

                // 바꾸고 난 후에 선택되었으면
                if (selectSeatButton.classList.contains('choice')) {
                    seatsCanIncludeValue[0].classList.add('choice');
                    seatsCanIncludeValue[0].classList.remove('possible');
                    // 변화를 줬으면 다시 나눠담기
                    seatsIncludingValue = [];
                    // 좌석을 고를 수 있는 상태
                    seatsCanIncludeValue = [];
                    // 좌석을 고를 수 없는 상태
                    seatsNotIncludingValue = [];
                    // 좌석을 경우에 따라 배열에 담기
                    seats.forEach(seat => {
                        if (seat.classList.contains('choice')) {
                            seatsIncludingValue.push(seat);
                        } else if (seat.classList.contains('possible')) {
                            seatsCanIncludeValue.push(seat);
                        } else {
                            seatsNotIncludingValue.push(seat);
                        }
                    });

                    // 좌석에 값도 저장
                    seatsIncludingValue[seatsIncludingValue.length - 1].innerText = selectSeatButton.querySelector('.num').innerText;

                    // 좌석 골랐을 때 값을 고를 수 있는 좌석을 전부 사용했으면
                    if (seatsCanIncludeValue.length === 0) {
                        document.getElementById('pageNext').classList.remove('disabled');
                        document.getElementById('pageNext').classList.add('active');
                    }


                    // 선택된 좌석의 수가 성인cell의 숫자값보다 작거나 같으면
                    if (seatsIncludingValue.length <= parseInt(adultCell.querySelector('.now').innerText)) {
                        // adult의 값을 1 올리고 보여준다.
                        seatTypeCounts.forEach(seatTypeCount => {
                            if (seatTypeCount.classList.contains('adult')) {
                                seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) + 1}`;
                                seatTypeCount.style.display = 'block';
                            }
                        });
                        //     선택된 좌석이 성인 + 청소년 수보다 작을 경우
                    } else if (seatsIncludingValue.length <= parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText)) {
                        // 청소년cell의 값을 1 올리고 보여준다.
                        seatTypeCounts.forEach(seatTypeCount => {
                            if (seatTypeCount.classList.contains('teenager')) {
                                seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) + 1}`;
                                seatTypeCount.style.display = 'block';
                            }
                        });
                        //     선택된 좌석이 성인 + 청소년 + 경로 수보다 작을 경우
                    } else if (seatsIncludingValue.length <= parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText) + parseInt(oldCell.querySelector('.now').innerText)) {
                        // 경로cell의 값을 1 올리고 보여준다.
                        seatTypeCounts.forEach(seatTypeCount => {
                            if (seatTypeCount.classList.contains('old')) {
                                seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) + 1}`;
                                seatTypeCount.style.display = 'block';
                            }
                        });
                        //     선택된 좌석이 성인 + 청소년 + 경로 + 우대 수보다 작을 경우
                    } else if (seatsIncludingValue.length <= parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText) + parseInt(oldCell.querySelector('.now').innerText) + parseInt(disabledCell.querySelector('.now').innerText)) {
                        // 우대cell의 값을 1 올리고 보여준다.
                        seatTypeCounts.forEach(seatTypeCount => {
                            if (seatTypeCount.classList.contains('disabled')) {
                                seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) + 1}`;
                                seatTypeCount.style.display = 'block';
                            }
                        });
                    }

                    //     바꾸고 난 뒤에 선택되지 않게 되었으면
                } else {
                    // 선택된 좌석 중에 제일 뒤를 빼고
                    seatsIncludingValue[seatsIncludingValue.length - 1].classList.remove('choice');
                    // 변화를 줬으면 다시 나눠담기
                    seatsIncludingValue = [];
                    // 좌석을 고를 수 있는 상태
                    seatsCanIncludeValue = [];
                    // 좌석을 고를 수 없는 상태
                    seatsNotIncludingValue = [];
                    // 좌석을 경우에 따라 배열에 담기
                    seats.forEach(seat => {
                        if (seat.classList.contains('choice')) {
                            seatsIncludingValue.push(seat);
                        } else if (seat.classList.contains('possible')) {
                            seatsCanIncludeValue.push(seat);
                        } else {
                            seatsNotIncludingValue.push(seat);
                        }
                    });

                    // 아무것도 아닌 자리 중 맨 앞을 선택 가능한 자리로 바꾼다.
                    seatsNotIncludingValue[0].classList.add('possible');
                    // 변화를 줬으면 다시 나눠담기
                    seatsIncludingValue = [];
                    // 좌석을 고를 수 있는 상태
                    seatsCanIncludeValue = [];
                    // 좌석을 고를 수 없는 상태
                    seatsNotIncludingValue = [];
                    // 좌석을 경우에 따라 배열에 담기
                    seats.forEach(seat => {
                        if (seat.classList.contains('choice')) {
                            seatsIncludingValue.push(seat);
                        } else if (seat.classList.contains('possible')) {
                            seatsCanIncludeValue.push(seat);
                        } else {
                            seatsNotIncludingValue.push(seat);
                        }
                    });

                    // 좌석 이름을 -로 변경
                    seatsCanIncludeValue[0].innerText = '-';

                    // 선택할 수 있는 좌석이 다시 생겼으니 다음 버튼 비활성화
                    if (seatsCanIncludeValue.length !== 0) {
                        document.getElementById('pageNext').classList.remove('active');
                        document.getElementById('pageNext').classList.add('disabled');
                    }

                    // 성인 청소년 경로 우대 구분해서 숫자 바뀌게
                    const seatTypeCounts = orderTwoContainer.querySelectorAll('.pay-area > .count > span');

                    // 선택된 좌석의 수가 성인 + 청소년 + 경로의 숫자값보다 크거나 같으면
                    if (seatsIncludingValue.length >= parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText) + parseInt(oldCell.querySelector('.now').innerText)) {
                        // adult의 값을 1 올리고 보여준다.
                        seatTypeCounts.forEach(seatTypeCount => {
                            if (seatTypeCount.classList.contains('disabled')) {
                                seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) - 1}`;
                                if (seatsIncludingValue.length === parseInt(adultCell.querySelector('.now').innerText) +
                                    parseInt(teenagerCell.querySelector('.now').innerText) +
                                    parseInt(oldCell.querySelector('.now').innerText)) {
                                    seatTypeCount.style.display = 'none';
                                }
                            }
                        });
                        //     선택된 좌석이 성인 + 청소년 수보다 크거나 같은 경우
                    } else if (seatsIncludingValue.length >= parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText)) {
                        // 경로cell의 값을 1 내리고 보여준다.
                        seatTypeCounts.forEach(seatTypeCount => {
                            if (seatTypeCount.classList.contains('old')) {
                                seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) - 1}`;
                                if (seatsIncludingValue.length === parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText)) {
                                    seatTypeCount.style.display = 'none';
                                }
                            }
                        });
                        //     선택된 좌석이 성인보다 크거나 같은 경우
                    } else if (seatsIncludingValue.length >= parseInt(adultCell.querySelector('.now').innerText)) {
                        // 청소년cell의 값을 1 내리고 보여준다.
                        seatTypeCounts.forEach(seatTypeCount => {
                            if (seatTypeCount.classList.contains('teenager')) {
                                seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) - 1}`;
                                if (seatsIncludingValue.length === parseInt(adultCell.querySelector('.now').innerText)) {
                                    seatTypeCount.style.display = 'none';
                                }
                            }
                        });
                        //     선택된 좌석이 0보다 크거나 같은 경우
                    } else if (seatsIncludingValue.length >= 0) {
                        // 성인cell 값을 1 내리고 보여준다.
                        seatTypeCounts.forEach(seatTypeCount => {
                            if (seatTypeCount.classList.contains('adult')) {
                                seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) - 1}`;
                                if (seatsIncludingValue.length === 0) {
                                    seatTypeCount.style.display = 'none';
                                }
                            }
                        });
                    }
                }
            }
        }
    });
});

