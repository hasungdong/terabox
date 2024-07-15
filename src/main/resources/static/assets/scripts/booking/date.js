const datesWrap = document.querySelector('.date-area .wrap');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const btnWidth = 70; // 버튼의 너비를 설정
let currentLocation = -70; // 현재 위치를 추적
let currentDate = new Date(); // 현재 날짜를 설정
let isAnimating = false; // 애니메이션 진행 중인지를 추적
let selectedDate = new Date(); // 선택된 날짜 저장
let previousSelectedButton = null; // 이전에 선택된 버튼을 저장

// 날짜를 포맷하는 함수
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const week = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  return { year, month, day, week };
}

// 연도 및 월 업데이트하는 함수
function updateYearAndMonth() {
  const yearElements = document.querySelectorAll('.year');
  const { year, month } = formatDate(currentDate);
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
  const { year: nextYear, month: nextMonth } = formatDate(nextMonthDate);

  if (yearElements.length > 0) {
    yearElements[0].textContent = `${year}.${month}`;
    if (yearElements.length > 1) {
      yearElements[1].textContent = `${nextYear}.${nextMonth}`;
    }
  }
}

// 날짜 버튼을 생성하는 함수
function createDateButton(date) {
  const { year, month, day, week } = formatDate(date);
  const btn = document.createElement('button');
  btn.className = 'date';
  btn.innerHTML = `
    <em class="week ${week === '토' ? 'sat' : week === '일' ? 'holi' : ''}">${day}</em>
    <span class="week ${week === '토' ? 'sat' : week === '일' ? 'holi' : ''}">${week}</span>`;
  btn.dataset.date = `${year}-${month}-${day}`;
  btn.addEventListener('click', (event) => handleDateClick(event, btn));

  // 처음 로딩 시 두 번째 버튼을 선택 상태로 설정
  if (date.getTime() === selectedDate.getTime()) {
    btn.classList.add('selected');
    previousSelectedButton = btn;
  }

  return btn;
}

// 날짜를 채우는 함수
function populateDates() {
  datesWrap.innerHTML = '';
  let date = new Date(currentDate);
  date.setDate(date.getDate() - 2);
  let nextMonthFirstDayShown = false;
  let firstDayButton;
  let currentMonthVisible = false;

  for (let i = 0; i < 16; i++) {
    date.setDate(date.getDate() + 1);
    const btn = createDateButton(date);
    datesWrap.appendChild(btn);

    // 다음 달 1일이 있는지 확인
    if (date.getDate() === 1 && date.getMonth() !== currentDate.getMonth()) {
      nextMonthFirstDayShown = true;
      firstDayButton = btn;
    }

    // date 배열의 15번째 버튼이 현재 날짜가 1일인지 확인
    if (i === 15 && date.getDate() === 1) {
      nextMonthFirstDayShown = false;
    }
  }

  // year 다음 달 1일이 보이면 위치 및 상태 업데이트
  const yearElements = document.querySelectorAll('.year');
  if (nextMonthFirstDayShown && firstDayButton) {
    if (yearElements.length > 1) {
      const rect = firstDayButton.getBoundingClientRect();
      const wrapRect = datesWrap.getBoundingClientRect();
      yearElements[1].style.position = 'absolute';
      yearElements[1].style.left = `${rect.left - wrapRect.left - 40}px`;

      // 애니메이션 효과 없이 바로 나타내기
      yearElements[1].style.transition = 'none';
      yearElements[1].style.opacity = '1';
    }
  } else {
    if (yearElements.length > 1) {
      yearElements[1].style.opacity = '0';
    }
  }

  // 초기 위치 설정, 애니메이션 없이 설정
  datesWrap.style.transition = 'none';
  datesWrap.style.transform = `translateX(-${btnWidth}px)`;

  // 이벤트 리스너 추가
  addDateButtonListeners();
}

// 날짜를 슬라이드하는 함수
function slideDates(direction) {
  if (isAnimating) return; // 애니메이션 중이면 실행 중지
  isAnimating = true;

  let currentTranslateX = currentLocation + (direction * btnWidth);
  datesWrap.style.transition = 'transform 0.5s';
  datesWrap.style.transform = `translateX(${currentTranslateX}px)`;

  const yearElements = document.querySelectorAll('.year');
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1); // 항상 다음 달을 가리키도록 변경
  const { year: nextYear, month: nextMonth } = formatDate(nextMonthDate);
  if (yearElements.length > 1) {
    yearElements[1].textContent = `${nextYear}.${nextMonth}`; // 애니메이션 전에 다음 달로 설정
    yearElements[1].style.transition = 'left 0.5s';
    const rect = yearElements[1].getBoundingClientRect();
    const wrapRect = datesWrap.getBoundingClientRect();
    yearElements[1].style.left = `${rect.left - wrapRect.left - 40 + (direction * btnWidth)}px`;
  }

  setTimeout(() => {
    datesWrap.style.transition = 'none';
    if (direction === -1) {
      currentDate.setDate(currentDate.getDate() + 1);
    } else {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    updateYearAndMonth();
    populateDates();
    isAnimating = false;

    // 선택된 날짜 버튼 유지
    if (previousSelectedButton) {
      const selectedButton = [...datesWrap.querySelectorAll('.date')].find(
        (btn) => btn.dataset.date === previousSelectedButton.dataset.date
      );
      if (selectedButton) {
        selectedButton.classList.add('selected');
        previousSelectedButton = selectedButton;
      }
    }
  }, 500);
}

function addDateButtonListeners() {
  const dateButtons = document.querySelectorAll('.date-area .wrap .date');
  dateButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      selectedDate = new Date(button.dataset.date);
      handleDateClick(event, button); // 날짜 클릭 이벤트 처리
    });
  });
}

function handleDateClick(event, button) {
  event.preventDefault(); // 기본 동작 방지

  if (previousSelectedButton) {
    previousSelectedButton.classList.remove('selected');
  }
  button.classList.add('selected');
  previousSelectedButton = button;

  selectedDate = new Date(button.dataset.date); // 선택된 날짜를 전역적으로 저장

  // 날짜 선택 시 handleSelectionChange 호출
  if (window.handleSelectionChange) {
    window.handleSelectionChange();
  }
}

// 이전/다음 버튼에 클릭 이벤트를 추가
btnNext.addEventListener('click', () => slideDates(-1));
btnPrev.addEventListener('click', () => slideDates(1));

updateYearAndMonth();
populateDates();

// 전역적으로 getSelectedDate 노출
window.getSelectedDate = function () {
  // 선택된 날짜를 문자열로 포맷
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
