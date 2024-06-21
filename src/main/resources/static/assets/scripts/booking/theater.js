document.addEventListener('DOMContentLoaded', function () {
  const theaterChoice = document.querySelector('.theater-choice');
  const theaterChoiceAll = theaterChoice.querySelector('.choice-all');
  const theaterChoiceList = theaterChoice.querySelector('.choice-list');
  const regionButtons = document.querySelectorAll('.region-list .btn');
  const detailList = document.querySelector('.detail-list');

  // 배열로 선택된 값을 저장
  let selectedChoices = [];
  let lastSelectedRegion = localStorage.getItem('lastSelectedRegion');

  regionButtons.forEach(button => {
    button.addEventListener('click', function () {
      const region = this.getAttribute('data-region');
      fetchTheatersByRegion(region);
      setSelectedRegionButton(this);
      localStorage.setItem('lastSelectedRegion', region);
    });

    // 페이지 로드 시 마지막으로 클릭한 버튼을 선택된 상태로 설정
    if (lastSelectedRegion && button.getAttribute('data-region') === lastSelectedRegion) {
      setSelectedRegionButton(button);
      fetchTheatersByRegion(lastSelectedRegion);
    }
  });

  function setSelectedRegionButton(button) {
    regionButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  }

  function updateRegionCounts() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (xhr.status < 200 || xhr.status >= 300) {
        console.error('Failed to fetch data', xhr.status, xhr.statusText);
        return;
      }

      const data = JSON.parse(xhr.responseText);
      data.forEach(regionCount => {
        const button = document.getElementById(`${regionCount.region}-count`);
        if (button) {
          button.textContent = `${button.textContent.split('(')[0]}(${regionCount.count})`;
        }
      });
    };

    xhr.open('POST', '/booking/theaters/count-by-region');
    xhr.send();
  }

  function fetchTheatersByRegion(region) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('region', region);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (xhr.status < 200 || xhr.status >= 300) {
        console.error('Failed to fetch data', xhr.status, xhr.statusText);
        return;
      }

      const data = JSON.parse(xhr.responseText);
      updateDetailList(region, data);
    };

    xhr.open('POST', '/booking/theaters/by-region');
    xhr.send(formData);
  }

  function updateDetailList(region, theaters) {
    const detailList = document.querySelector('.detail-list');
    detailList.innerHTML = '';
    const regionDiv = document.createElement('div');
    regionDiv.className = 'region ' + region.toLowerCase();

    const ul = document.createElement('ul');
    theaters.forEach(theater => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn';
      button.textContent = theater.name;
      button.dataset.index = theater.index; // 극장 index를 데이터 속성으로 추가
      li.appendChild(button);
      ul.appendChild(li);
    });

    regionDiv.appendChild(ul);
    detailList.appendChild(regionDiv);

    // Attach event listeners to the new buttons
    const theaterButtons = regionDiv.querySelectorAll('.btn');
    theaterButtons.forEach(button => {
      button.addEventListener('click', function () {
        handleTheaterButtonClick(this);
      });
    });

    // 선택된 값을 업데이트
    selectedChoices.forEach(choice => {
      const button = Array.from(detailList.querySelectorAll('.btn')).find(btn => btn.textContent === choice);
      if (button) {
        button.classList.add('selected');
      }
    });
  }

  function handleTheaterButtonClick(button) {
    const selectedButtons = detailList.querySelectorAll('.btn.selected');
    const totalSelected = selectedChoices.length;

    if (totalSelected >= 3 && !button.classList.contains('selected')) {
      alert('최대 3개까지만 선택할 수 있습니다.');
      return;
    }

    button.classList.toggle('selected');

    // 선택된 값 배열을 업데이트
    if (button.classList.contains('selected')) {
      selectedChoices.push(button.textContent);
    } else {
      selectedChoices = selectedChoices.filter(choice => choice !== button.textContent);
    }

    updateChoiceList();
  }

  function updateChoiceList() {
    const bgElements = theaterChoiceList.querySelectorAll('.bg');
    bgElements.forEach(bg => {
      bg.innerHTML = ''; // 기존 wrap 태그 제거
    });

    selectedChoices.forEach((choice, index) => {
      const wrap = document.createElement('div');
      wrap.className = 'wrap';

      const txt = document.createElement('div');
      txt.className = 'txt';
      txt.textContent = choice;

      const del = document.createElement('button');
      del.className = 'del';
      del.innerHTML = '<i class="fa-solid fa-x"></i>';
      del.addEventListener('click', function () {
        const button = Array.from(detailList.querySelectorAll('.btn')).find(btn => btn.textContent === choice);
        if (button) {
          button.classList.remove('selected');
        }
        selectedChoices = selectedChoices.filter(c => c !== choice);
        wrap.remove();
        updateChoiceList();
      });

      wrap.appendChild(txt);
      wrap.appendChild(del);

      // .bg 요소 중 하나에 wrap 요소 추가
      if (bgElements[index]) {
        bgElements[index].appendChild(wrap);
      } else {
        const newBg = document.createElement('div');
        newBg.className = 'bg';
        newBg.appendChild(wrap);
        theaterChoiceList.appendChild(newBg);
      }
    });

    if (selectedChoices.length > 0) {
      theaterChoiceAll.style.display = 'none';
      theaterChoiceList.style.removeProperty('display');
    } else {
      theaterChoiceAll.style.removeProperty('display');
      theaterChoiceList.style.display = 'none';
    }
  }

  // 날짜 선택 시 극장 버튼을 업데이트하는 함수
  function handleDateClick(event, button) {
    event.preventDefault(); // 기본 동작 방지

    if (previousSelectedButton) {
      previousSelectedButton.classList.remove('selected');
    }
    button.classList.add('selected');
    previousSelectedButton = button;

    const selectedDate = button.dataset.date;
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('date', selectedDate);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (xhr.status < 200 || xhr.status >= 300) {
        console.error('Error fetching theaters for date:', xhr.status, xhr.statusText);
        return;
      }
      const theaters = JSON.parse(xhr.responseText);
      updateTheaterButtons(theaters);
    };
    xhr.open('POST', '/booking/theaters-by-date');
    xhr.send(formData);
  }

  function updateTheaterButtons(theaters) {
    const theaterButtons = document.querySelectorAll('.region-list .btn');
    let regionCounts = {};

    theaterButtons.forEach(button => {
      const region = button.dataset.region;
      const theaterCount = theaters.filter(theater => theater.regionCode === region).length;

      if (theaterCount > 0) {
        button.disabled = false;
        button.classList.remove('disabled');
      } else {
        button.disabled = true;
        button.classList.add('disabled');
      }

      regionCounts[region] = theaterCount;
    });

    // Update region counts
    Object.keys(regionCounts).forEach(region => {
      const button = document.getElementById(`${region}-count`);
      if (button) {
        button.textContent = `${button.textContent.split('(')[0]}(${regionCounts[region]})`;
      }
    });
  }

  updateRegionCounts();
});
