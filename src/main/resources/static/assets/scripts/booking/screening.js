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
      // Trigger screening info fetch based on selected date, movie, and theater
      const selectedDate = getSelectedDate();
      const selectedMovieIndex = event.target.closest('.btn').dataset.index;
      const selectedCinemaIndex = document.querySelector('.theater-choice .btn.selected')?.dataset.index;
      console.log('영화 선택:', selectedMovieIndex, '극장 선택:', selectedCinemaIndex, '날짜 선택:', selectedDate); // 디버그
      if (selectedDate && selectedMovieIndex && selectedCinemaIndex) {
        fetchScreeningInfo(selectedDate, selectedMovieIndex, selectedCinemaIndex);
      }
    }
  });

  // 이벤트 위임을 사용하여 극장 버튼 이벤트 리스너 추가
  document.querySelector('.theater-choice .detail-list').addEventListener('click', function (event) {
    if (event.target.closest('.btn')) {
      updateSelectionState();
      // Trigger screening info fetch based on selected date, movie, and theater
      const selectedDate = getSelectedDate();
      const selectedMovieIndex = document.querySelector('.movie-choice .btn.selected')?.dataset.index;
      const selectedCinemaIndex = event.target.closest('.btn').dataset.index;
      console.log('극장 선택:', selectedCinemaIndex, '영화 선택:', selectedMovieIndex, '날짜 선택:', selectedDate); // 디버그
      if (selectedDate && selectedMovieIndex && selectedCinemaIndex) {
        fetchScreeningInfo(selectedDate, selectedMovieIndex, selectedCinemaIndex);
      }
    }
  });

  // 이전/다음 버튼에 클릭 이벤트 추가
  btnPrev.addEventListener('click', () => slideTimes(1));
  btnNext.addEventListener('click', () => slideTimes(-1));

  // 초기화
  populateHours();
  updateSelectionState();

  function fetchScreeningInfo(date, movieIndex, cinemaIndex) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('date', date);
    formData.append('movieIndex', movieIndex);
    formData.append('cinemaIndex', cinemaIndex);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (xhr.status < 200 || xhr.status >= 300) {
        console.error('Failed to fetch screening info', xhr.status, xhr.statusText);
        return;
      }

      const data = JSON.parse(xhr.responseText);
      console.log('서버 응답:', data); // 디버그
      if (data.length === 0) {
        alert('상영정보가 없습니다.');
      } else {
        updateScreeningInfo(data);
      }
    };

    xhr.open('POST', '/booking/screening-info');
    xhr.send(formData);
  }

  function updateScreeningInfo(screeningInfoList) {
    const resultList = document.querySelector('.movie-schedule-area .result ul');
    resultList.innerHTML = '';

    screeningInfoList.forEach(screeningInfo => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.className = 'btn';
      button.type = 'button';

      const screeningTime = screeningInfo.screeningTime;
      const playingTime = screeningInfo.playingTime; // 영화 상영 시간

      // 상영 시작 시간을 Date 객체로 변환
      // JavaScript에서 시간 계산을 할 때 Date 객체를 사용할 수 있지만, playingTime이 시간 형식이 아닌 문자열로 전달되면 Date 객체를 직접 사용할 수 없다 따라서 playingTime을 시간 단위와 분 단위로 나누어 계산하는 방법이 필요합니다.
      const [screeningHours, screeningMinutes] = screeningTime.split(':').map(Number);
      const screeningDate = new Date();
      screeningDate.setHours(screeningHours, screeningMinutes, 0, 0);

      // 상영 시간을 분 단위로 변환
      const [playingHours, playingMinutes] = playingTime.split(':').map(Number);
      const totalPlayingMinutes = (playingHours * 60) + playingMinutes;

      // 종료 시간 계산
      const endDate = new Date(screeningDate.getTime() + totalPlayingMinutes * 60000);
      const endTime = endDate.toTimeString().split(' ')[0].substring(0, 5); // HH:mm 형식으로 포맷

      button.innerHTML = `
            <i class="time-icon">
              <img src="https://img.megabox.co.kr/static/pc/images/common/ico/ico-greeting-option-sun.png" alt="">
            </i>
            <span class="time">
              <strong title="상영 시작">${screeningTime.substring(0, 5)}</strong>
              <em title="상영 종료">~${endTime}</em>
            </span>
            <span class="title">
              <strong>${screeningInfo.movieTitle}</strong>
              <em>${screeningInfo.dimensionType}</em>
            </span>
            <span class="info">
              <i class="theater">
                ${screeningInfo.theaterName}<br>
                ${screeningInfo.cinemaNumber}관
              </i>
            </span>
        `;
      li.appendChild(button);
      resultList.appendChild(li);
    });

    noResult.style.display = 'none';
    result.style.removeProperty('display');
  }


  // 날짜 선택 시 이벤트 리스너
  function handleDateClick(event, button) {
    event.preventDefault(); // 기본 동작 방지

    if (previousSelectedButton) {
      previousSelectedButton.classList.remove('selected');
    }
    button.classList.add('selected');
    previousSelectedButton = button;

    const selectedDate = button.dataset.date;
    const selectedMovieIndex = document.querySelector('.movie-choice .btn.selected')?.dataset.index;
    const selectedCinemaIndex = document.querySelector('.theater-choice .btn.selected')?.dataset.index;
    console.log('날짜 선택:', selectedDate, '영화 선택:', selectedMovieIndex, '극장 선택:', selectedCinemaIndex); // 디버그
    if (selectedDate && selectedMovieIndex && selectedCinemaIndex) {
      fetchScreeningInfo(selectedDate, selectedMovieIndex, selectedCinemaIndex);
    }
  }

  function updateDateButtons(availableDates) {
    const dateButtons = document.querySelectorAll('.date-area .wrap .date');
    dateButtons.forEach(button => {
      const date = button.dataset.date;
      if (availableDates.includes(date)) {
        button.disabled = false;
        button.classList.remove('disabled');
      } else {
        button.disabled = true;
        button.classList.add('disabled');
      }
    });
  }

  function enableAllDateButtons() {
    const dateButtons = document.querySelectorAll('.date-area .wrap .date');
    dateButtons.forEach(button => {
      button.disabled = false;
      button.classList.remove('disabled');
    });
  }
});
