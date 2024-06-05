// 영화선택버튼 이벤트
document.addEventListener('DOMContentLoaded', (event) => {
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
    });
  });

  let btns = document.querySelectorAll('.btn-area .btn-tap');
  let allList = document.querySelector('.all-list');
  let curation = document.querySelector('.curation');

  btns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      if (event.target.textContent === "전체") {
        allList.style.display = "block";
        curation.style.display = "none";
      } else if (event.target.textContent === "큐레이션") {
        allList.style.display = "none";
        curation.style.display = "block";
      }
    });
  });
  document.querySelector('.movie-btn .btn-tap').selected();
});