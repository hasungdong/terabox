const regionButtons = document.querySelectorAll('.region-list .btn');
const lastSelectedRegion = localStorage.getItem('lastSelectedRegion');
let selectedTheaters = [];

// 선택된 지역 버튼 설정 함수
function setSelectedRegionButton(button) {
  regionButtons.forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');
}

// 지역 버튼 클릭 이벤트 설정
regionButtons.forEach(button => {
  button.addEventListener('click', function () {
    handleRegionButtonClick(this);
  });

  // 마지막으로 선택한 지역이 로컬 스토리지에 저장되어 있으면 해당 버튼을 클릭한 것처럼 처리
  if (lastSelectedRegion && button.getAttribute('data-region') === lastSelectedRegion) {
    handleRegionButtonClick(button);
  }
});

// 지역 버튼 클릭 시 극장 정보 호출
function handleRegionButtonClick(button) {
  const region = button.getAttribute('data-region');
  fetchTheatersByRegion(region);
  setSelectedRegionButton(button);
  localStorage.setItem('lastSelectedRegion', region);
}

// 지역별 극장 수 업데이트 함수
function updateRegionCounts(regionCounts) {
  regionCounts.forEach(regionCount => {
    const button = document.querySelector(`.region-list .btn[data-region='${regionCount.region}']`);
    if (button) {
      button.textContent = `${button.textContent.split('(')[0]}(${regionCount.count})`;
    }
  });
}

// 지역별 극장 수 가져오는 함수
function fetchRegionCounts() {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status < 200 || xhr.status >= 300) {
      MessageObj.createSimpleOk('오류', '알 수 없는 이유로 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
      return;
    }

    const data = JSON.parse(xhr.responseText);
    updateRegionCounts(data);
  };

  xhr.open('POST', '/booking/theaters/count-by-region');
  xhr.send();
}

fetchRegionCounts();

// 극장 버튼 클릭 시 처리 함수
function handleTheaterButtonClick(button) {
  const theaterIndex = parseInt(button.dataset.index, 10);
  const theaterName = button.textContent;

  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    selectedTheaters = selectedTheaters.filter(theater => theater.index !== theaterIndex);
  } else {
    if (selectedTheaters.length >= 3) {
      alertCover.show();
      new MessageObj({
        title: '알림',
        content: `극장은 최대 3개까지 선택이 가능합니다`,
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
    button.classList.add('selected');
    selectedTheaters.push({index: theaterIndex, name: theaterName});
  }

  updateChoiceList();
}

// 선택된 극장 목록 업데이트 함수
function updateChoiceList() {
  const theaterChoiceList = document.querySelector('.theater-choice .choice-list');
  const bgs = theaterChoiceList.querySelectorAll('.bg');

  // 모든 bg의 내용을 비웁니다.
  bgs.forEach(bg => {
    bg.innerHTML = '';
  });

  selectedTheaters.forEach((theater, index) => {
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.dataset.index = theater.index;

    const txt = document.createElement('div');
    txt.className = 'txt';
    txt.textContent = theater.name;

    // 삭제 버튼 생성
    const del = document.createElement('button');
    del.className = 'del';
    del.innerHTML = '<i class="fa-solid fa-x"></i>';
    del.addEventListener('click', function () {
      const button = Array.from(document.querySelectorAll('.detail-list .btn')).find(btn => btn.textContent === theater.name);
      if (button) {
        button.classList.remove('selected');
      }
      selectedTheaters = selectedTheaters.filter(t => t.index !== theater.index);
      updateChoiceList();
    });

    wrap.appendChild(txt);
    wrap.appendChild(del);

    if (bgs[index]) {
      bgs[index].appendChild(wrap);
    }
  });

  // 선택된 극장이 없는 경우 처리
  const choiceAll = document.querySelector('.theater-choice .choice-all');
  if (selectedTheaters.length > 0) {
    choiceAll.style.display = 'none';
    theaterChoiceList.style.removeProperty('display');
  } else {
    choiceAll.style.removeProperty('display');
    theaterChoiceList.style.display = 'none';
  }
}

// 상세 목록 업데이트 함수
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
    button.dataset.index = theater.index;

    // 이미 선택된 극장이면 selected 클래스 추가
    if (selectedTheaters.some(selected => selected.index === theater.index)) {
      button.classList.add('selected');
    }

    li.appendChild(button);
    ul.appendChild(li);
  });

  regionDiv.appendChild(ul);
  detailList.appendChild(regionDiv);

  const theaterButtons = regionDiv.querySelectorAll('.btn');
  theaterButtons.forEach(button => {
    button.addEventListener('click', function () {
      handleTheaterButtonClick(this);
    });
  });
}

// 지역별 극장 정보 가져오는 함수
function fetchTheatersByRegion(region) {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append('region', region);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status < 200 || xhr.status >= 300) {
      MessageObj.createSimpleOk('오류', '알 수 없는 이유로 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
    }

    const data = JSON.parse(xhr.responseText);
    updateDetailList(region, data);
  };

  xhr.open('POST', '/booking/theaters/by-region');
  xhr.send(formData);
}