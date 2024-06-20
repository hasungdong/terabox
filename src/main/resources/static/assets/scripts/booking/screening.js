document.addEventListener('DOMContentLoaded', function () {
  const timeScheduleWrap = document.querySelector('.hour-schedule .wrap');
  const btnPrev = document.querySelector('.hour-schedule .btn-pre');
  const btnNext = document.querySelector('.hour-schedule .btn-next');
  const noResult = document.querySelector('.movie-schedule-area .no-result');
  const result = document.querySelector('.movie-schedule-area .result');
  const choiceAll = document.querySelector('.theater-choice .choice-all');
  const choiceList = document.querySelector('.theater-choice .choice-list');

  const hours = Array.from({ length: 29 }, (_, i) => String(i).padStart(2, '0'));
  const btnWidth = 35; // 버튼의 너비
  let currentLocation = 0; // 현재 위치를 추적
  let isAnimating = false; // 애니메이션 진행 중 여부
  let movieSelected = false;

  // 시간 버튼 생성 함수
  function createHourButton(hour) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hour-btn';
    button.innerHTML = `<span class="hour">${hour}</span>`;
    button.dataset.hour = hour;
    return button;
  }

  // 시간 버튼을 wrap에 추가
  function populateHours() {
    timeScheduleWrap.innerHTML = '';
    hours.forEach(hour => {
      const button = createHourButton(hour);
      timeScheduleWrap.appendChild(button);
    });
    updateButtonState();
  }

  // 슬라이드 애니메이션 함수
  function slideTimes(direction) {
    if (isAnimating) return; // 애니메이션 중이면 실행 중지
    isAnimating = true;

    const maxLocation = -(btnWidth * (hours.length - 10));
    currentLocation += direction * btnWidth;

    if (currentLocation > 0) {
      currentLocation = 0;
    } else if (currentLocation < maxLocation) {
      currentLocation = maxLocation;
    }

    timeScheduleWrap.style.transition = 'transform 0.3s';
    timeScheduleWrap.style.transform = `translateX(${currentLocation}px)`;

    setTimeout(() => {
      timeScheduleWrap.style.transition = 'none';
      isAnimating = false;
      updateButtonState();
    }, 300);
  }

  // 버튼 상태 업데이트 함수
  function updateButtonState() {
    btnPrev.disabled = currentLocation >= 0;
    btnNext.disabled = currentLocation <= -(btnWidth * (hours.length - 10));
  }

  // 선택 상태 업데이트 함수
  function updateSelectionState() {
    const theaterButtons = document.querySelectorAll('.theater-choice .choice-list .wrap');
    const theaterSelected = theaterButtons.length > 0;
    if (theaterSelected) {
      choiceAll.style.display = 'none';
      choiceList.style.removeProperty('display');
    } else {
      choiceAll.style.removeProperty('display');
      choiceList.style.display = 'none';
    }
    if (movieSelected && theaterSelected) {
      noResult.style.display = 'none';
      result.style.removeProperty('display');
    } else {
      noResult.style.removeProperty('display');
      result.style.display = 'none';
    }
  }

  // 이벤트 위임을 사용하여 영화 버튼 이벤트 리스너 추가
  document.querySelector('.movie-choice').addEventListener('click', function (event) {
    if (event.target.closest('.btn[data-group="btn1"]')) {
      movieSelected = !movieSelected;
      updateSelectionState();
    }
  });

  // 이벤트 위임을 사용하여 극장 버튼 이벤트 리스너 추가
  document.querySelector('.theater-choice .detail-list').addEventListener('click', function (event) {
    if (event.target.closest('.btn')) {
      updateSelectionState();
    }
  });

  // 이전/다음 버튼에 클릭 이벤트 추가
  btnPrev.addEventListener('click', () => slideTimes(1));
  btnNext.addEventListener('click', () => slideTimes(-1));

  // 초기화
  populateHours();
  updateSelectionState();
});

