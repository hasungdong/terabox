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
  let selectedTheaterIndex = null;

  function createHourButton(hour) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hour-btn';
    button.innerHTML = `<span class="hour">${hour}</span>`;
    button.dataset.hour = hour;
    return button;
  }

  function populateHours() {
    timeScheduleWrap.innerHTML = '';
    hours.forEach(hour => {
      const button = createHourButton(hour);
      timeScheduleWrap.appendChild(button);
    });
    updateButtonState();
  }

  function slideTimes(direction) {
    if (isAnimating) return;
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

  function updateButtonState() {
    btnPrev.disabled = currentLocation >= 0;
    btnNext.disabled = currentLocation <= -(btnWidth * (hours.length - 10));
  }

  function updateSelectionState() {
    const theaterButtons = document.querySelectorAll('.theater-choice .choice-list .wrap');
    const movieButtons = document.querySelectorAll('.all-list .btn');
    const theaterSelected = theaterButtons.length > 0;
    const movieSelected = movieButtons.length > 0;
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
      document.querySelectorAll('.hour-area .hour-btn').forEach(button => {
        button.classList.remove('selected');
      });
    }
  }

  btnPrev.addEventListener('click', () => slideTimes(1));
  btnNext.addEventListener('click', () => slideTimes(-1));

  populateHours();

  // 영화와 극장을 선택했을 때 호출
  document.querySelector('.movie-choice').addEventListener('click', function (event) {
    if (event.target.closest('.btn[data-group="btn1"]')) {
      movieSelected = !movieSelected;
      updateSelectionState();
      // 선택한 날짜, 영화, 극장 정보를 기반으로 상영 정보를 가져옴
      const selectedDate = getSelectedDate();
      const selectedMovieIndexes = Array.from(document.querySelectorAll('.movie-choice .btn.selected'))
          .map(btn => Number(btn.dataset.index))
          .filter(index => !isNaN(index));
      const selectedTheaterIndexes = Array.from(document.querySelectorAll('.theater-choice .btn.selected'))
          .map(btn => Number(btn.dataset.index))
          .filter(index => !isNaN(index));
      console.log('영화 선택:', selectedMovieIndexes, '극장 선택:', selectedTheaterIndexes, '날짜 선택:', selectedDate); // 디버그
      if (selectedDate && selectedMovieIndexes.length > 0 && selectedTheaterIndexes.length > 0) {
        fetchScreeningInfo(selectedDate, selectedMovieIndexes, selectedTheaterIndexes);
      }
    }
  });

  document.querySelector('.theater-choice .detail-list').addEventListener('click', function (event) {
    if (event.target.closest('.btn')) {
      updateSelectionState();
      const selectedDate = getSelectedDate();
      const selectedMovieIndexes = Array.from(document.querySelectorAll('.movie-choice .btn.selected'))
          .map(btn => Number(btn.dataset.index))
          .filter(index => !isNaN(index));
      const selectedTheaterIndexes = Array.from(document.querySelectorAll('.theater-choice .btn.selected'))
          .map(btn => Number(btn.dataset.index))
          .filter(index => !isNaN(index));
      if (selectedDate && selectedMovieIndexes.length > 0 && selectedTheaterIndexes.length > 0) {
        fetchScreeningInfo(selectedDate, selectedMovieIndexes, selectedTheaterIndexes);
      }
    }
  });

  function getSelectedDate() {
    return '2024-05-01';
  }

  function fetchScreeningInfo(date, movieIndexes, theaterIndexes) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('screeningDate', date);
    movieIndexes.forEach(index => formData.append('movieIndexes', index));
    theaterIndexes.forEach(index => formData.append('theaterIndexes', index));

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status < 200 || xhr.status >= 300) {
        console.error('Failed to fetch screening info', xhr.status, xhr.statusText);
        return;
      }

      const data = JSON.parse(xhr.responseText);
      if (data.length === 0) {
        alert('상영정보가 없습니다.');
      } else {
        updateScreeningInfo(data);
      }
    };

    xhr.open('POST', '/booking/screening-info-by-theater-and-movie');
    xhr.send(formData);
  }

  function updateScreeningInfo(screeningInfoList) {
    const resultList = document.querySelector('.movie-schedule-area .result ul');
    resultList.innerHTML = '';

    if (screeningInfoList.length > 0) {
      const firstScreeningTime = screeningInfoList[0].screeningTime.split(':')[0];

      const hourButtons = document.querySelectorAll('.hour-area .hour-btn');
      const targetIndex = hours.findIndex(hour => hour === firstScreeningTime);
      const offset = 4;

      if (targetIndex !== -1) {
        const newLocation = -(targetIndex - offset) * btnWidth;
        currentLocation = Math.min(0, Math.max(newLocation, -(hours.length - 10) * btnWidth));
        timeScheduleWrap.style.transition = 'none';
        timeScheduleWrap.style.transform = `translateX(${currentLocation}px)`;

        setTimeout(() => {
          hourButtons.forEach((button, index) => {
            button.classList.remove('selected');
            if (index === targetIndex) {
              button.classList.add('selected');
            }
          });
        }, 0);
      }
    }

    screeningInfoList.forEach(screeningInfo => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.className = 'btn';
      button.type = 'button';

      const screeningTime = screeningInfo.screeningTime;

      button.innerHTML = `
                <i class="time-icon">
                    <img src="https://img.megabox.co.kr/static/pc/images/common/ico/ico-greeting-option-sun.png" alt="">
                </i>
                <span class="time">
                    <strong title="상영 시작">${screeningTime.substring(0, 5)}</strong>
                    <em title="상영 종료">~${screeningInfo.endTime}</em>
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

      button.addEventListener('click', function() {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('index', screeningInfo.index);
        formData.append('screeningTime', screeningInfo.screeningTime);
        formData.append('endTime', screeningInfo.endTime);
        formData.append('movieTitle', screeningInfo.movieTitle);
        formData.append('dimensionType', screeningInfo.dimensionType);
        formData.append('theaterName', screeningInfo.theaterName);
        formData.append('cinemaNumber', screeningInfo.cinemaNumber);
        formData.append('ageLimit', screeningInfo.ageLimit);
        formData.append('screeningDate', screeningInfo.screeningDate);
        formData.append('thumbnail', screeningInfo.thumbnail);

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;
          if (xhr.status < 200 || xhr.status >= 300) {
            console.error('Failed to post screening info', xhr.status, xhr.statusText);
            return;
          }

          // Save the screening info in session storage
          sessionStorage.setItem('screeningInfo', JSON.stringify(screeningInfo));

          window.location.href = '/booking/orderTwo';
        };

        xhr.open('POST', '/booking/orderTwo');
        xhr.send(formData);
      });

      li.appendChild(button);
      resultList.appendChild(li);
    });
  }
});

