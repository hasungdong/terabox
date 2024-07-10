document.addEventListener('DOMContentLoaded', function () {
  loadAllMovies();

  document.querySelector('.movie-choice').addEventListener('click', function(event) {
    const button = event.target.closest('.btn[data-group="btn1"]');
    if (button) {
      handleMovieButtonClick(button);
    }
  });
});

function loadAllMovies() {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      return;
    }
    if (xhr.status < 200 || xhr.status >= 300) {
      console.error('Error fetching all movies:', xhr.status, xhr.statusText);
      return;
    }
    const movies = JSON.parse(xhr.responseText);
    console.log('Fetched movies:', movies); // 콘솔 로그 추가
    const movieList = document.querySelector('.all-list ul');
    movieList.innerHTML = '';
    movies.forEach(movie => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn';
      button.dataset.group = 'btn1';
      button.dataset.selected = 'false';
      button.dataset.index = movie.index;
      button.dataset.thumbnail = movie.thumbnail;
      // 사용자의 나이가 정의되어 있고 영화의 연령 제한이 사용자 나이보다 높은 경우 버튼 비활성화
      if (typeof userAge !== 'undefined' && movie.ageLimit > userAge) {
        button.disabled = true;
      }

      let imgSrc = getMovieAgeLimitImageSrc(movie.ageLimit);
      console.log(`Movie: ${movie.title}, Age Limit: ${movie.ageLimit}, Disabled: ${button.disabled}`); // 콘솔 로그 추가

      button.innerHTML = `
                <img src="${imgSrc}" alt="${movie.title}" height="20" width="20"/>
                <span class="txt">${movie.title}</span>
                <i class="fa-regular fa-heart"></i>
            `;
      li.appendChild(button);
      movieList.appendChild(li);
    });
  };
  xhr.open('POST', '/booking/all-movies');
  xhr.send(formData);
}


function getMovieAgeLimitImageSrc(ageLimit) {
  switch (ageLimit) {
    case '12':
      return '/assets/images/booking/KMRB_12.jpeg';
    case '15':
      return '/assets/images/booking/KMRB_15.jpeg';
    case '19':
      return '/assets/images/booking/KMRB_19.jpeg';
    case 'all':
      return '/assets/images/booking/KMRB_ALL.jpeg';
  }
}

function handleMovieButtonClick(button) {
  const isSelected = button.dataset.selected === 'true';
  const choiceAll = document.querySelector('.choice-all');
  const choiceList = document.querySelector('.choice-list');

  if (isSelected) {
    button.dataset.selected = 'false';
    button.classList.remove('selected');
    removeMovieFromChoiceList(button.dataset.index);
    if (choiceList.querySelectorAll('.wrap').length === 0) {
      choiceAll.style.removeProperty('display');
      choiceList.style.display = 'none';
    }
  } else {
    if (choiceList.querySelectorAll('.wrap').length >= 3) {
      alertCover.show();
      new MessageObj({
        title: '알림',
        content: `영화는 최대 3개까지 선택이 가능합니다`,
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

    button.dataset.selected = 'true';
    button.classList.add('selected');
    choiceAll.style.display = 'none';
    choiceList.style.removeProperty('display');

    const choiceListBg = choiceList.querySelectorAll('.bg');
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.dataset.index = button.dataset.index;

    const img = document.createElement('img');
    img.src = `data:image/jpeg;base64,${button.dataset.thumbnail}`;
    img.alt = button.querySelector('.txt').textContent;

    const del = document.createElement('button');
    del.className = 'del';
    del.innerHTML = '<i class="fa-solid fa-x"></i>';
    del.addEventListener('click', function () {
      button.dataset.selected = 'false';
      button.classList.remove('selected');
      wrap.remove();
      if (choiceList.querySelectorAll('.wrap').length === 0) {
        choiceAll.style.removeProperty('display');
        choiceList.style.display = 'none';
      }
    });

    wrap.appendChild(img);
    wrap.appendChild(del);

    for (const bg of choiceListBg) {
      if (!bg.querySelector('.wrap')) {
        bg.appendChild(wrap);
        break;
      }
    }
  }
}

function removeMovieFromChoiceList(movieIndex) {
  const choiceList = document.querySelector('.choice-list');
  const wrap = choiceList.querySelector(`.wrap[data-index='${movieIndex}']`);
  if (wrap) {
    wrap.remove();
  }
}
