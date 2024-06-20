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
    const movieList = document.querySelector('.all-list ul');
    movieList.innerHTML = '';
    movies.forEach(movie => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn';
      button.dataset.group = 'btn1';
      button.dataset.selected = 'false'; // 초기 선택 상태 설정

      let imgSrc = '';
      switch (movie.grade) {
        case 12:
          imgSrc = '/assets/images/booking/KMRB_12.jpeg';
          break;
        case 15:
          imgSrc = '/assets/images/booking/KMRB_15.jpeg';
          break;
        case 19:
          imgSrc = '/assets/images/booking/KMRB_19.jpeg';
          break;
        case 'ALL':
          imgSrc = '/assets/images/booking/KMRB_ALL.jpeg';
          break;
        default:
          imgSrc = '/assets/images/booking/default.jpeg'; // 기본 이미지 설정
          break;
      }

      button.innerHTML = `
                    <img src="${imgSrc}" alt="${movie.title}" height="20" width="20"/>
                    <span class="txt">${movie.title}</span>
                    <i class="fa-regular fa-heart"></i>
                `;
      button.addEventListener('click', () => handleMovieButtonClick(button, movie));
      li.appendChild(button);
      movieList.appendChild(li);
    });
  };
  xhr.open('POST', '/booking/all-movies');
  xhr.send(formData);
}

function handleMovieButtonClick(button, movie) {
  const isSelected = button.dataset.selected === 'true';
  const choiceAll = document.querySelector('.choice-all');
  const choiceList = document.querySelector('.choice-list');

  if (isSelected) {
    button.dataset.selected = 'false';
    button.classList.remove('selected');
    removeMovieFromChoiceList(movie.index);
    if (choiceList.querySelectorAll('.wrap').length === 0) {
      choiceAll.style.removeProperty('display');
      choiceList.style.display = 'none';
    }
  } else {
    if (choiceList.querySelectorAll('.wrap').length >= 3) {
      alert('최대 3개의 영화를 선택할 수 있습니다.');
      return;
    }

    button.dataset.selected = 'true';
    button.classList.add('selected');
    choiceAll.style.display = 'none';
    choiceList.style.removeProperty('display');

    // 선택된 영화의 정보를 choice-list에 추가
    const choiceListBg = choiceList.querySelectorAll('.bg');
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.dataset.index = movie.index;

    const img = document.createElement('img');
    img.src = `data:image/jpeg;base64,${movie.thumbnail}`;
    img.alt = movie.title;

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

    // 순서대로 bg 요소에 추가
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

loadAllMovies();


