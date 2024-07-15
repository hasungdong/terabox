const orderTwoContainer = document.querySelector('.order-two-container');
const selectPeopleCells = orderTwoContainer.querySelectorAll('.cell');
const adultCell = orderTwoContainer.querySelector('.cell.adult');
const teenagerCell = orderTwoContainer.querySelector('.cell.teenager');
const oldCell = orderTwoContainer.querySelector('.cell.old');
const disabledCell = orderTwoContainer.querySelector('.cell.disabled');
const seats = orderTwoContainer.querySelectorAll('.my-seat > .seat');
const selectSeatButtons = orderTwoContainer.querySelectorAll('.seat-condition.standard');
const pageNextButton = document.getElementById('pageNext');
const seatTypeCounts = orderTwoContainer.querySelectorAll('.pay-area > .count > span');
const pagePreviousButton = document.getElementById('pagePrevious');
let adultCount;
let teenagerCount;
let oldCount;
let disabledCount;

// 좌석 가격 정보
let seatPrices = {
  adult: 0,
  teenager: 0,
  old: 0,
  disabled: 0
};

// 다른 시간 선택 기능 - 현재 사용하지 않음
/*const otherTime = orderTwoContainer.querySelector('.other-time');
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
};*/

// 페이지 이전 버튼 클릭 이벤트
pagePreviousButton.addEventListener('click', function () {
  window.history.back();
});

// 좌석 타입별 카운트 요소 설정
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

// 결제 금액 업데이트 함수
function updateOrderPrice() {
  const orderPriceComma = orderTwoContainer.querySelector('.pay-area > .pay > .money > em');
  let orderPrice;
  orderPrice = parseInt(adultCount.innerText) * seatPrices.adult +
    parseInt(teenagerCount.innerText) * seatPrices.teenager +
    parseInt(oldCount.innerText) * seatPrices.old +
    parseInt(disabledCount.innerText) * seatPrices.disabled;
  orderPriceComma.innerText = orderPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 인원수 증가 감소 버튼 기능 구현
selectPeopleCells.forEach(selectPeopleCell => {
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

  // 인원수 증가 버튼 클릭 이벤트
  selectPeopleCell.querySelector('.up').onclick = () => {
    let SumCellsCount = 0;
    selectPeopleCells.forEach(selectPeopleCell => {
      SumCellsCount += parseInt(selectPeopleCell.querySelector('.now').innerText);
    });

    // 최대 인원수 제한
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
    // 좌석 상태 재설정
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

    // 경로석 알림
    if (selectPeopleCell.classList.contains('old')) {
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

    // 우대석 알림
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

    // 버튼 활성화/비활성화 설정
    if (seatsCanIncludeValue.length !== 0) {
      document.getElementById('pageNext').classList.remove('active');
      document.getElementById('pageNext').classList.add('disabled');
    }

    // 좌석 카운트 및 상태 업데이트
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

    updateOrderPrice();
  };

  // 초기화 버튼 클릭 이벤트
  document.getElementById('btn_booking_init').onclick = () => {
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

            // 초기화 작업 수행
            selectPeopleCells.forEach(selectPeopleCell => {
              const nowElement = selectPeopleCell.querySelector('.now');
              nowElement.innerText = '0';
            });

            seats.forEach(seat => {
              seat.classList.remove('choice');
              seat.classList.remove('possible');
              seat.classList.add('all');
              seat.innerText = '-';
            });

            seatTypeCounts.forEach(seatTypeCount => {
              seatTypeCount.querySelector('em').innerText = '0';
              seatTypeCount.style.display = 'none';
            });

            adultCount.innerText = '0';
            teenagerCount.innerText = '0';
            oldCount.innerText = '0';
            disabledCount.innerText = '0';

            document.getElementById('pageNext').classList.remove('active');
            document.getElementById('pageNext').classList.add('disabled');

            // 모든 jq-tooltip 클래스를 가진 버튼에서 choice 클래스 제거
            const jqTooltipButtons = document.querySelectorAll('.jq-tooltip');
            jqTooltipButtons.forEach(button => {
              button.classList.remove('choice');
            });

            updateOrderPrice();
          }
        }
      ]
    }).show();
  };

  // 인원수 감소 버튼 클릭 이벤트
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

    if (seatsNotIncludingValue.length < 8) {
      if (seatsCanIncludeValue.length > 0) {
        selectPeopleCell.querySelector('.now').innerText = parseInt(selectPeopleCell.querySelector('.now').innerText) - 1;

        // 좌석 상태 및 카운트 업데이트
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

// 좌석 선택 로직
orderTwoContainer.querySelector('#seatLayout').addEventListener('click', function (event) {
  const selectSeatButton = event.target.closest('.seat-condition.standard');
  if (!selectSeatButton) return;

  if (selectSeatButton.classList.contains('reserved') ||
    selectSeatButton.classList.contains('selectImpossible')) {
    return;
  }
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

  if (selectSeatButton.classList.contains('normal') ||
    selectSeatButton.classList.contains('disabled')) {

    selectSeatButton.classList.toggle('choice');

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

      // 행의 알파벳과 열의 숫자를 좌석에 표시
      const row = selectSeatButton.title.charAt(0);
      // 행의 알파벳
      const col = selectSeatButton.title.match(/\d+/)[0];
      // 열의 숫자
      seatsIncludingValue[seatsIncludingValue.length - 1].innerText = `${row}${col}`;

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
      seatsCanIncludeValue[0].innerText = '-';
      if (seatsCanIncludeValue.length !== 0) {
        document.getElementById('pageNext').classList.remove('active');
        document.getElementById('pageNext').classList.add('disabled');
      }
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
      } else if (seatsIncludingValue.length >= parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText)) {
        seatTypeCounts.forEach(seatTypeCount => {
          if (seatTypeCount.classList.contains('old')) {
            seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) - 1}`;
            if (seatsIncludingValue.length === parseInt(adultCell.querySelector('.now').innerText) + parseInt(teenagerCell.querySelector('.now').innerText)) {
              seatTypeCount.style.display = 'none';
            }
          }
        });
      } else if (seatsIncludingValue.length >= parseInt(adultCell.querySelector('.now').innerText)) {
        seatTypeCounts.forEach(seatTypeCount => {
          if (seatTypeCount.classList.contains('teenager')) {
            seatTypeCount.querySelector('em').innerText = `${parseInt(seatTypeCount.querySelector('em').innerText) - 1}`;
            if (seatsIncludingValue.length === parseInt(adultCell.querySelector('.now').innerText)) {
              seatTypeCount.style.display = 'none';
            }
          }
        });
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

// 좌석 마우스 오버 이벤트
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

// 좌석 레이아웃 생성 함수
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

// 상영 정보 가져오기 및 설정
const screeningInfo = JSON.parse(sessionStorage.getItem('screeningInfo'));

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

    const screeningDate = new Date(screeningInfo.screeningDate);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = days[screeningDate.getUTCDay()];
    dateElement.innerHTML = `${screeningInfo.screeningDate} <em>(${dayName})</em>`;

    const screeningTime = screeningInfo.screeningTime.slice(0, 5);
    const endTime = screeningInfo.endTime.slice(0, 5);
    otherTimeElement.innerHTML = `${screeningTime} ~ ${endTime} <img src="/assets/images/booking/bottomButton.png" class="arr">`;

    const posterImg = document.createElement('img');
    posterImg.src = `data:image/jpeg;base64,${screeningInfo.thumbnail}`;
    posterImg.alt = screeningInfo.movieTitle;
    posterElementContainer.innerHTML = '';
    posterElementContainer.appendChild(posterImg);
  }

  // 페이지 다음 버튼 클릭 이벤트
  pageNextButton.addEventListener('click', function () {
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

    const screeningInfo = JSON.parse(sessionStorage.getItem('screeningInfo'));
    const screeningInfoIndex = screeningInfo ? screeningInfo.index : null;

    const movieOrderDto = {
      adultCount,
      teenagerCount,
      oldCount,
      disabledCount,
      seatIndexes,
      screeningInfoIndex
    };

    postOrderThree(movieOrderDto);
  });

  // 페이지를 벗어날 시 상영정보세션 삭제
  window.addEventListener('beforeunload', function () {
    fetch('/booking/clearScreeningInfo', {
      method: 'POST',
      credentials: 'same-origin'
    });
  });

// 좌석 가격을 가져오는 함수
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
        MessageObj.createSimpleOk('오류', '알 수 없는 이유로 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
      }
    };

    xhr.open('GET', `/booking/seat-prices`);
    xhr.send();
  }

  fetchSeatPrices();

// 좌석을 가져오는 함수
  function fetchSeats() {
    const screeningInfo = JSON.parse(sessionStorage.getItem('screeningInfo'));
    if (!screeningInfo || !screeningInfo.index) return;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      loading.hide();
      if (xhr.status >= 200 && xhr.status < 300) {
        const seats = JSON.parse(xhr.responseText);
        if (seats.length) {
          createSeatLayout(seats);
        }
      } else {
        MessageObj.createSimpleOk('오류', '알 수 없는 이유로 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
      }
    };

    xhr.open('GET', `/booking/seats?screeningInfoIndex=${screeningInfo.index}`);
    xhr.send();
    loading.show();
  }
  fetchSeats();

  // 주문 정보 전송 함수
  function postOrderThree(movieOrderDto) {
    const form = document.createElement('form');
    form.method = 'POST';
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