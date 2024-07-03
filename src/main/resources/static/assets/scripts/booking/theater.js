document.addEventListener('DOMContentLoaded', function () {
  const regionButtons = document.querySelectorAll('.region-list .btn');
  const lastSelectedRegion = localStorage.getItem('lastSelectedRegion');
  let selectedTheaters = [];

  regionButtons.forEach(button => {
    button.addEventListener('click', function () {
      handleRegionButtonClick(this);
    });

    if (lastSelectedRegion && button.getAttribute('data-region') === lastSelectedRegion) {
      handleRegionButtonClick(button);
    }
  });

  function handleRegionButtonClick(button) {
    const region = button.getAttribute('data-region');
    fetchTheatersByRegion(region);
    setSelectedRegionButton(button);
    localStorage.setItem('lastSelectedRegion', region);
  }

  function setSelectedRegionButton(button) {
    regionButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  }

  function fetchTheatersByRegion(region) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('region', region);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
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
      selectedTheaters.push({ index: theaterIndex, name: theaterName });
    }

    updateChoiceList();
  }

  function updateChoiceList() {
    const theaterChoiceList = document.querySelector('.theater-choice .choice-list');
    theaterChoiceList.innerHTML = '';

    selectedTheaters.forEach(theater => {
      const bg = document.createElement('div');
      bg.className = 'bg';

      const wrap = document.createElement('div');
      wrap.className = 'wrap';

      const txt = document.createElement('div');
      txt.className = 'txt';
      txt.textContent = theater.name;

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
      bg.appendChild(wrap);
      theaterChoiceList.appendChild(bg);
    });

    const choiceAll = document.querySelector('.theater-choice .choice-all');
    if (selectedTheaters.length > 0) {
      choiceAll.style.display = 'none';
      theaterChoiceList.style.removeProperty('display');
    } else {
      choiceAll.style.removeProperty('display');
      theaterChoiceList.style.display = 'none';
    }
  }
});
