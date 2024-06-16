/*
document.addEventListener('DOMContentLoaded', function () {
  const theaterChoice = document.querySelector('.theater-choice');
  const theaterChoiceAll = theaterChoice.querySelector('.choice-all');
  const theaterChoiceList = theaterChoice.querySelector('.choice-list');
  const regionButtons = document.querySelectorAll('.region-list .btn');
  const detailList = document.querySelector('.detail-list');

  regionButtons.forEach(button => {
    button.addEventListener('click', function () {
      const region = this.getAttribute('data-region');
      fetchTheatersByRegion(region);
    });
  });

  function updateRegionCounts() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      loading.hide();
      if (xhr.status < 200 || xhr.status >= 300) {
        console.error('Failed to fetch data', xhr.status, xhr.statusText);
        return;
      }

      const data = JSON.parse(xhr.responseText);
      console.log('Data fetched successfully:', data);
      data.forEach(regionCount => {
        const button = document.getElementById(`${regionCount.region}-count`);
        if (button) {
          button.textContent = `${button.textContent.split('(')[0]}(${regionCount.count})`;
        }
      });

    };

    xhr.open('POST', '/booking/theaters/count-by-region');
    xhr.send();
    loading.show();
  }

  function fetchTheatersByRegion(region) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('region', region);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      loading.hide();
      if (xhr.status < 200 || xhr.status >= 300) {
        console.error('Failed to fetch data', xhr.status, xhr.statusText);
        return;
      }

      const data = JSON.parse(xhr.responseText);
      console.log('Data fetched successfully:', data);
      updateDetailList(region, data);

    };

    xhr.open('POST', '/booking/theaters/by-region');
    xhr.send(formData);
    loading.show();
  }

  function updateDetailList(region, theaters) {
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
  }

  function handleTheaterButtonClick(button) {
    const selectedButtons = detailList.querySelectorAll('.btn.selected');

    if (selectedButtons.length >= 3 && !button.classList.contains('selected')) {
      alert('최대 3개까지만 선택할 수 있습니다.');
      return;
    }

    button.classList.toggle('selected');

    updateChoiceList();
  }

  function updateChoiceList() {
    const selectedButtons = detailList.querySelectorAll('.btn.selected');

    theaterChoiceList.innerHTML = '';
    selectedButtons.forEach(button => {
      const wrap = document.createElement('div');
      wrap.className = 'wrap';

      const txt = document.createElement('div');
      txt.className = 'txt';
      txt.textContent = button.textContent;

      const del = document.createElement('button');
      del.className = 'del';
      del.innerHTML = '<i class="fa-solid fa-x"></i>';
      del.addEventListener('click', function () {
        button.classList.remove('selected');
        updateChoiceList();
      });

      wrap.appendChild(txt);
      wrap.appendChild(del);

      // Find the first available .bg element and append the wrap to it
      const availableBg = theaterChoiceList.querySelector('.bg:not(:has(.wrap))');
      if (availableBg) {
        availableBg.appendChild(wrap);
      } else {
        // Create a new .bg element if none are available
        const newBg = document.createElement('div');
        newBg.className = 'bg';
        newBg.appendChild(wrap);
        theaterChoiceList.appendChild(newBg);
      }
    });

    if (selectedButtons.length > 0) {
      theaterChoiceAll.style.display = 'none';
      theaterChoiceList.style.removeProperty('display');
    } else {
      theaterChoiceAll.style.removeProperty('display');
      theaterChoiceList.style.display = 'none';
    }
  }

  updateRegionCounts();
});*/

document.addEventListener('DOMContentLoaded', function () {
  const theaterChoice = document.querySelector('.theater-choice');
  const theaterChoiceAll = theaterChoice.querySelector('.choice-all');
  const theaterChoiceList = theaterChoice.querySelector('.choice-list');
  const regionButtons = document.querySelectorAll('.region-list .btn');
  const detailList = document.querySelector('.detail-list');

  // 배열로 선택된 값을 저장
  let selectedChoices = [];

  regionButtons.forEach(button => {
    button.addEventListener('click', function () {
      const region = this.getAttribute('data-region');
      fetchTheatersByRegion(region);
    });
  });

  function updateRegionCounts() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      loading.hide();
      if (xhr.status < 200 || xhr.status >= 300) {
        console.error('Failed to fetch data', xhr.status, xhr.statusText);
        return;
      }

      const data = JSON.parse(xhr.responseText);
      console.log('Data fetched successfully:', data);
      data.forEach(regionCount => {
        const button = document.getElementById(`${regionCount.region}-count`);
        if (button) {
          button.textContent = `${button.textContent.split('(')[0]}(${regionCount.count})`;
        }
      });

    };

    xhr.open('POST', '/booking/theaters/count-by-region');
    xhr.send();
    loading.show();
  }

  function fetchTheatersByRegion(region) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('region', region);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      loading.hide();
      if (xhr.status < 200 || xhr.status >= 300) {
        console.error('Failed to fetch data', xhr.status, xhr.statusText);
        return;
      }

      const data = JSON.parse(xhr.responseText);
      console.log('Data fetched successfully:', data);
      updateDetailList(region, data);

    };

    xhr.open('POST', '/booking/theaters/by-region');
    xhr.send(formData);
    loading.show();
  }

  function updateDetailList(region, theaters) {
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

  updateRegionCounts();
});