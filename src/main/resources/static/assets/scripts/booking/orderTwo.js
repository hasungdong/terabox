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
let seatPrices = {
  adult: 0,
  teenager: 0,
  old: 0,
  disabled: 0
};

const otherTime = orderTwoContainer.querySelector('.other-time');

// 다른 관람시간대 보였다 안보였다 하기
otherTime.querySelector('.now').onclick = () => {
  if (!otherTime.classList.contains('on')) {
    otherTime.classList.add('on');

    const otherLis = otherTime.querySelectorAll('.other > li');
    otherLis.forEach(otherLi => otherLi.onclick = () => {
      otherTime.querySelector('.now').innerText = otherLi.querySelector('.btn').innerText;
      otherTime.classList.remove('on');
    });
  } else {
    otherTime.classList.remove('on');
  }
};

seatTypeCounts.forEach(seatTypeCount => {
  if (seatTypeCount.classList.contains('adult')) {
    adultCount = seatTypeCount.querySelector('em');
  }
  if (seatTypeCount.classList.contains('teenager')) {
    teenagerCount = seatTypeCount.querySelector('em');
  }
  if (seatTypeCount.classList.contains('old')) {
    oldCount = seatTypeCount.querySelector('em');
  }
  if (seatTypeCount.classList.contains('disabled')) {
    disabledCount = seatTypeCount.querySelector('em');
  }
});

function updateOrderPrice() {
  const orderPriceComma = orderTwoContainer.querySelector('.pay-area > .pay > .money > em');
  let orderPrice;
  orderPrice = parseInt(adultCount.innerText) * seatPrices.adult +
    parseInt(teenagerCount.innerText) * seatPrices.teenager +
    parseInt(oldCount.innerText) * seatPrices.old +
    parseInt(disabledCount.innerText) * seatPrices.disabled;
  orderPriceComma.innerText = orderPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
  };

  let seatsIncludingValue = [];
  let seatsCanIncludeValue = [];
  let seatsNotIncludingValue = [];
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
    seatsCanIncludeValue = [];
    seatsNotIncludingValue = [];
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
    seatsCanIncludeValue = [];
    seatsNotIncludingValue = [];
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

    // 버튼 활성, 비활성화
    if (seatsCanIncludeValue.length !== 0) {
      document.getElementById('pageNext').classList.remove('active');
      document.getElementById('pageNext').classList.add('disabled');
    }

    // 변경이 있을 때 값이 1 오르고 내리는 식이 아니라 그냥 전체 값을 다시 설정하는 거
    if (seatsIncludingValue.length >= parseInt(adultCell.querySelector('.now').innerText)) {
      adultCount.innerText = parseInt(adultCell.querySelector('.now').innerText);

      if (seatsIncludingValue.length >=
        parseInt(adultCell.querySelector('.now').innerText) +
        parseInt(teenagerCell.querySelector('.now').innerText)) {
        teenagerCount.innerText = parseInt(teenagerCell.querySelector('.now').innerText);

        if (seatsIncludingValue.length >=
          parseInt(adultCell.querySelector('.now').innerText) +
          parseInt(teenagerCell.querySelector('.now').innerText) +
          parseInt(oldCell.querySelector('.now').innerText)) {
          oldCount.innerText = parseInt(oldCell.querySelector('.now').innerText);

          if (seatsIncludingValue.length >=
            parseInt(adultCell.querySelector('.now').innerText) +
            parseInt(teenagerCell.querySelector('.now').innerText) +
            parseInt(oldCell.querySelector('.now').innerText) +
            parseInt(disabledCell.querySelector('.now').innerText)) {
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

    // 각 타입의 개수가 0이면 그 타입은 안보이게 한다.
    // 예: 노인 티켓이 현재 0개면 노인 글씨는 안보인다
    seatTypeCounts.forEach(seatTypeCount => seatTypeCount.querySelector('em').innerText === '0' ? seatTypeCount.style.display = 'none' : seatTypeCount.style.display = 'block');

    updateOrderPrice();
  };

//     감소 버튼 눌렀을 때
  selectPeopleCell.querySelector('.down').onclick = () => {
    if (parseInt(selectPeopleCell.querySelector('.now').innerText) === 0) {
      return;
    }

    seatsIncludingValue = [];
    seatsCanIncludeValue = [];
    seatsNotIncludingValue = [];
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
      if (seatsCanIncludeValue.length > 0) {
        selectPeopleCell.querySelector('.now').innerText = parseInt(selectPeopleCell.querySelector('.now').innerText) - 1;

        if (seatsIncludingValue.length >= parseInt(adultCell.querySelector('.now').innerText)) {
          adultCount.innerText = parseInt(adultCell.querySelector('.now').innerText);

          if (seatsIncludingValue.length >=
            parseInt(adultCell.querySelector('.now').innerText) +
            parseInt(teenagerCell.querySelector('.now').innerText)) {
            teenagerCount.innerText = parseInt(teenagerCell.querySelector('.now').innerText);

            if (seatsIncludingValue.length >=
              parseInt(adultCell.querySelector('.now').innerText) +
              parseInt(teenagerCell.querySelector('.now').innerText) +
              parseInt(oldCell.querySelector('.now').innerText)) {
              oldCount.innerText = parseInt(oldCell.querySelector('.now').innerText);

              if (seatsIncludingValue.length >=
                parseInt(adultCell.querySelector('.now').innerText) +
                parseInt(teenagerCell.querySelector('.now').innerText) +
                parseInt(oldCell.querySelector('.now').innerText) +
                parseInt(disabledCell.querySelector('.now').innerText)) {
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

        seatsIncludingValue = [];
        seatsCanIncludeValue = [];
        seatsNotIncludingValue = [];
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

        updateOrderPrice();
      } else {
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
              text: '확인', onclick: instance => {
                instance.hide();
                alertCover.hide();
                location.reload();
              }
            }
          ]
        }).show();
        document.querySelector('._obj-message').style.width = '400px';
      }
    }
  };
});

orderTwoContainer.querySelector('#seatLayout').addEventListener('click', function (event) {
  const selectSeatButton = event.target.closest('.seat-condition.standard');
  if (!selectSeatButton) return;

  if (selectSeatButton.classList.contains('reserved') ||
    selectSeatButton.classList.contains('selectImpossible')) {
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
  let seatsIncludingValue = [];
  let seatsCanIncludeValue = [];
  let seatsNotIncludingValue = [];
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
  if (selectSeatButton.classList.contains('normal') ||
    selectSeatButton.classList.contains('disabled')) {

    // 누른 버튼 보라색 > 회색, 회색이면 보라색으로
    selectSeatButton.classList.toggle('choice');

    // 바꾸고 난 후에 선택되었으면
    if (selectSeatButton.classList.contains('choice')) {
      seatsCanIncludeValue[0].classList.add('choice');
      seatsCanIncludeValue[0].classList.remove('possible');
      seatsIncludingValue = [];
      seatsCanIncludeValue = [];
      seatsNotIncludingValue = [];
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

      if (seatsIncludingValue.length <= parseInt(adultCell.querySelector('.now').innerText)) {
        seatTypeCounts.forEach(seatTypeCount => {
          if (seatTypeCount.classList.contains('adult')) {
            seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) + 1}`;
            seatTypeCount.style.display = 'block';
          }
        });
      } else if (seatsIncludingValue.length <= parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText)) {
        seatTypeCounts.forEach(seatTypeCount => {
          if (seatTypeCount.classList.contains('teenager')) {
            seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) + 1}`;
            seatTypeCount.style.display = 'block';
          }
        });
      } else if (seatsIncludingValue.length <= parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText) + parseInt(oldCell.querySelector('.now').innerText)) {
        seatTypeCounts.forEach(seatTypeCount => {
          if (seatTypeCount.classList.contains('old')) {
            seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) + 1}`;
            seatTypeCount.style.display = 'block';
          }
        });
      } else if (seatsIncludingValue.length <= parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText) + parseInt(oldCell.querySelector('.now').innerText) + parseInt(disabledCell.querySelector('.now').innerText)) {
        seatTypeCounts.forEach(seatTypeCount => {
          if (seatTypeCount.classList.contains('disabled')) {
            seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) + 1}`;
            seatTypeCount.style.display = 'block';
          }
        });
      }

      updateOrderPrice();

    } else {
      seatsIncludingValue[seatsIncludingValue.length - 1].classList.remove('choice');
      seatsIncludingValue = [];
      seatsCanIncludeValue = [];
      seatsNotIncludingValue = [];
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
      seatsIncludingValue = [];
      seatsCanIncludeValue = [];
      seatsNotIncludingValue = [];
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
      // 선택된 좌석의 수가 성인 + 청소년 + 경로의 숫자값보다 크거나 같으면
      if (seatsIncludingValue.length >= parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText) + parseInt(oldCell.querySelector('.now').innerText)) {
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
        seatTypeCounts.forEach(seatTypeCount => {
          if (seatTypeCount.classList.contains('adult')) {
            seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) - 1}`;
            if (seatsIncludingValue.length === 0) {
              seatTypeCount.style.display = 'none';
            }
          }
        });
      }

      updateOrderPrice();
    }
  }
});

orderTwoContainer.querySelector('#seatLayout').addEventListener('mouseover', function (event) {
  const selectSeatButton = event.target.closest('.seat-condition.standard');
  if (!selectSeatButton) return;

  if (selectSeatButton.classList.contains('reserved') ||
    selectSeatButton.classList.contains('selectImpossible')) {
    return;
  }

  let seatsIncludingValue = [];
  let seatsCanIncludeValue = [];
  let seatsNotIncludingValue = [];
  seats.forEach(seat => {
    if (seat.classList.contains('choice')) {
      seatsIncludingValue.push(seat);
    } else if (seat.classList.contains('possible')) {
      seatsCanIncludeValue.push(seat);
    } else {
      seatsNotIncludingValue.push(seat);
    }
  });

  if (seatsCanIncludeValue.length > 0) {
    selectSeatButton.classList.add('on');

    selectSeatButton.onmouseleave = () => {
      selectSeatButton.classList.remove('on');
    }
  }
});

function createSeatLayout(seats) {
  const seatLayout = orderTwoContainer.querySelector('#seatLayout');
  const existingRow = seatLayout.querySelector('.row');

  if (existingRow) {
    existingRow.remove();
  }

  const startX = 321;
  const startY = 50;
  const rowHeight = 20;
  const colWidth = 20;

  const currentRowElement = document.createElement('div');
  currentRowElement.className = 'row';
  currentRowElement.style.position = 'relative';
  seatLayout.appendChild(currentRowElement);

  const rows = new Set(seats.map(seat => seat.row));
  rows.forEach(row => {
    const rowButton = document.createElement('button');
    rowButton.type = 'button';
    rowButton.className = 'btn-seat-row';
    rowButton.title = `${String.fromCharCode(64 + row)} 행`;
    rowButton.style.position = 'absolute';
    rowButton.style.left = '176px';
    rowButton.style.top = `${startY + (rowHeight * (row - 1))}px`;
    rowButton.innerText = String.fromCharCode(64 + row);
    currentRowElement.appendChild(rowButton);
  });

  seats.forEach(seat => {
    const seatElement = document.createElement('button');
    seatElement.type = 'button';
    seatElement.className = `jq-tooltip seat-condition standard ${seat.seatStatus}`;
    seatElement.title = `${String.fromCharCode(64 + seat.row)}${seat.column}`;
    seatElement.style.position = 'absolute';
    seatElement.style.left = `${startX + (colWidth * (seat.column - 1))}px`;
    seatElement.style.top = `${startY + (rowHeight * (seat.row - 1))}px`;
    seatElement.style.width = '20px';
    seatElement.dataset.index = seat.index; // data-index 속성 추가
    seatElement.innerHTML = `
            <span class="num">${seat.column}</span>
            <span class="condition">판매가능</span>
        `;
    currentRowElement.appendChild(seatElement);
  });
}


function fetchSeats() {
  const screeningInfo = JSON.parse(sessionStorage.getItem('screeningInfo'));
  if (!screeningInfo || !screeningInfo.index) return;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      return;
    }
    if (xhr.status >= 200 && xhr.status < 300) {
      const seats = JSON.parse(xhr.responseText);
      if (seats.length) {
        createSeatLayout(seats);
      }
    } else {
      console.error('Error fetching seats:', xhr.statusText);
    }
  };

  xhr.open('GET', `/booking/seats?screeningInfoIndex=${screeningInfo.index}`);
  xhr.send();
}

function fetchSeatPrices() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      return;
    }
    if (xhr.status >= 200 && xhr.status < 300) {
      const prices = JSON.parse(xhr.responseText);
      prices.forEach(price => {
        switch (price.type) {
          case 'adult':
            seatPrices.adult = price.price;
            break;
          case 'teenager':
            seatPrices.teenager = price.price;
            break;
          case 'old':
            seatPrices.old = price.price;
            break;
          case 'disabled':
            seatPrices.disabled = price.price;
            break;
        }
      });
    } else {
      console.error('Error fetching seat prices:', xhr.statusText);
    }
  };

  xhr.open('GET', `/booking/seat-prices`);
  xhr.send();
}

fetchSeatPrices();
fetchSeats();

// sessionStorage 는 웹브로우저에서 세션 당 데이터 저장을 제공한다
// 그렇기 때문에 현재 브라우저 탭에서만 유효하며 탭이 닫히면 데이터가 삭제된다
const screeningInfo = JSON.parse(sessionStorage.getItem('screeningInfo'));

// 상영정보표시
if (screeningInfo) {
  const movieGradeElement = document.querySelector('.movie-grade');
  const titElement = document.querySelector('.tit-area .tit');
  const cateElement = document.querySelector('.cate');
  const theaterElement = document.querySelector('.theater');
  const specialElement = document.querySelector('.special');
  const dateElement = document.querySelector('.date');
  const otherTimeElement = document.querySelector('.other-time .now');
  const posterElementContainer = document.querySelector('.poster');

  if (movieGradeElement && titElement && cateElement && theaterElement && specialElement && dateElement && otherTimeElement && posterElementContainer) {
    // 상영 등급 이미지 분류
    const ageLimitImages = {
      '12': '/assets/images/booking/KMRB_12.jpeg',
      '15': '/assets/images/booking/KMRB_15.jpeg',
      '19': '/assets/images/booking/KMRB_19.jpeg',
      'all': '/assets/images/booking/KMRB_All.jpeg',
      'default': '/assets/images/booking/KMRB_All.jpeg'
    };
    const ageLimit = screeningInfo.ageLimit.toLowerCase();
    const ageLimitImage = ageLimitImages[ageLimit] || ageLimitImages['default'];

    movieGradeElement.innerHTML = `<img src="${ageLimitImage}" alt="${screeningInfo.ageLimit} 등급">`;

    titElement.innerText = screeningInfo.movieTitle;
    cateElement.innerText = screeningInfo.dimensionType;
    theaterElement.innerText = screeningInfo.theaterName;
    specialElement.innerText = `${screeningInfo.cinemaNumber}관`;

    // 상영시간
    const screeningDate = new Date(screeningInfo.screeningDate);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = days[screeningDate.getUTCDay()];
    dateElement.innerHTML = `${screeningInfo.screeningDate} <em>(${dayName})</em>`;

    const screeningTime = screeningInfo.screeningTime.slice(0, 5);
    const endTime = screeningInfo.endTime.slice(0, 5);
    otherTimeElement.innerHTML = `${screeningTime} ~ ${endTime} <img src="/assets/images/booking/bottomButton.png" class="arr">`;

    // 이미지 삽입
    const posterImg = document.createElement('img');
    posterImg.src = `data:image/jpeg;base64,${screeningInfo.thumbnail}`;
    posterImg.alt = screeningInfo.movieTitle;
    posterElementContainer.innerHTML = '';
    posterElementContainer.appendChild(posterImg);
  }

  // 다음 버튼 클릭 이벤트
  document.getElementById('pageNext').addEventListener('click', function () {
    if (this.classList.contains('disabled')) return;

    const movieOrderDto = {
      adultCount: parseInt(document.querySelector('.cell.adult .now').innerText),
      teenagerCount: parseInt(document.querySelector('.cell.teenager .now').innerText),
      oldCount: parseInt(document.querySelector('.cell.old .now').innerText),
      disabledCount: parseInt(document.querySelector('.cell.disabled .now').innerText),
      seatIndexes: Array.from(document.querySelectorAll('.seat.choice')).map(seat => parseInt(seat.dataset.index)),
      screeningInfoIndex: parseInt(sessionStorage.getItem('screeningInfo').index)
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/booking/orderTwo';

    for (const [key, value] of Object.entries(movieOrderDto)) {
      if (Array.isArray(value)) {
        value.forEach((val, index) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = `${key}[${index}]`;
          input.value = val;
          form.appendChild(input);
        });
      } else {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  });

  const pageNextButton = document.getElementById('pageNext');

  pageNextButton.addEventListener('click', function() {
    if (this.classList.contains('disabled')) {
      return;
    }

    const adultCount = parseInt(document.querySelector('.cell.adult .now').innerText);
    const teenagerCount = parseInt(document.querySelector('.cell.teenager .now').innerText);
    const oldCount = parseInt(document.querySelector('.cell.old .now').innerText);
    const disabledCount = parseInt(document.querySelector('.cell.disabled .now').innerText);

    const selectedSeats = document.querySelectorAll('.seat-condition.choice');
    const seatIndexes = Array.from(selectedSeats).map(seat => {
      const index = seat.getAttribute('data-index');
      return index ? parseInt(index) : -1;
    }).filter(index => index !== -1);

    const screeningInfoIndex = JSON.parse(sessionStorage.getItem('screeningInfo')).index;

    const movieOrderDto = {
      adultCount,
      teenagerCount,
      oldCount,
      disabledCount,
      seatIndexes,
      screeningInfoIndex
    };
    console.log("Sending DTO:", movieOrderDto); // 디버깅용 로그 추가

    postOrderThree(movieOrderDto);
  });

  function postOrderThree(movieOrderDto) {
    const form = document.createElement('form');
    form.method = 'GET';
    form.action = '/booking/orderThree';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'movieOrderDto';
    input.value = JSON.stringify(movieOrderDto);

    form.appendChild(input);
    document.body.appendChild(form);

    form.submit();
  }
}
