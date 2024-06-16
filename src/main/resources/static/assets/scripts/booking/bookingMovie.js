const dateForm = document.getElementById('dateForm');
const movieChoice = document.querySelector('.movie-choice');
const movieListContainer = movieChoice.querySelector('.all-list ul');
const movieChoiceAll = movieChoice.querySelector('.choice-all');
const movieChoiceList = movieChoice.querySelector('.choice-list');
const allList = document.querySelector('.all-list');
const curation = document.querySelector('.curation');
const loading = document.getElementById('loading');

dateForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const selectedDate = getSelectedDate();
  fetchMoviesByDate(selectedDate);
});

function fetchMoviesByDate(date) {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append('date', date);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      return;
    }
    loading.style.display = 'none';
    if (xhr.status < 200 || xhr.status >= 300) {
      // Handle error
      console.error('Failed to fetch movies:', xhr.statusText);
      return;
    }

    const movies = JSON.parse(xhr.responseText);
    displayMovies(movies);
  };

  xhr.open('POST', '/booking/movie');
  xhr.send(formData);
  loading.style.display = 'block';
}

function getMovieThumbnail(grade) {
  switch (grade) {
    case 12:
      return '/assets/images/booking/KMRB_12.jpeg';
    case 15:
      return '/assets/images/booking/KMRB_15.jpeg';
    case 19:
      return '/assets/images/booking/KMRB_19.jpeg';
    default:
      return '/assets/images/booking/KMRB_All.jpeg';
  }
}

function displayMovies(movies) {
  movieListContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieItem = document.createElement('li');
    movieItem.innerHTML = `
      <button type="button" class="btn" data-group="btn1">
        <img src="${getMovieThumbnail(movie.grade)}" alt="" height="20" width="20"/>
        <span class="txt">${movie.title}</span>
        <i class="fa-regular fa-heart"></i>
      </button>
    `;
    movieListContainer.appendChild(movieItem);
  });
  addMovieSelectionEventListeners();
}

function addMovieSelectionEventListeners() {
  let clickedButtonsCount = 0;

  document.querySelectorAll('.btn[data-group="btn1"]').forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('selected')) {
        clickedButtonsCount--;
        button.classList.remove('selected');
      } else {
        if (clickedButtonsCount < 3) {
          clickedButtonsCount++;
          button.classList.add('selected');
        } else {
          alert('최대 3개까지만 선택할 수 있습니다.');
        }
      }
      button.focus();

      if (clickedButtonsCount > 0) {
        movieChoiceAll.style.display = 'none';
        movieChoiceList.style.removeProperty('display');
      } else {
        movieChoiceAll.style.removeProperty('display');
        movieChoiceList.style.display = 'none';
      }
    });
  });
}

// btns.forEach(btn => {
//   btn.addEventListener('click', (event) => {
//     if (event.target.textContent === "전체") {
//       allList.style.removeProperty('display');
//       curation.style.display = 'none';
//     } else if (event.target.textContent === "큐레이션") {
//       allList.style.display = 'none';
//       curation.style.removeProperty('display');
//     }
//   });
// });

// document.querySelector('.movie-btn .btn-tap').selected();

