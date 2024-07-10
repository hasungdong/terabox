const swiperBars = document.querySelectorAll('span.swiper-bar');
const page = document.querySelector('.current-page');
const playButton = document.querySelector('img.play');
const pauseButton = document.querySelector('img.pause');
// const events = document.querySelectorAll('.event-box > .event');
const sliderCells = document.querySelectorAll('.slider-view > .cell');

const lessButton = document.querySelector('img.less');
const moreButton = document.querySelector('img.more');

// 여기부터 홈에 있는 스와이퍼
let i = 0;
let currentPage = 1;
swiperBars[0].classList.add('point');
// events가 .event임
// const imgs = events[0].querySelectorAll(':scope > img.img');
const imgs = [];
sliderCells.forEach(sliderCell => imgs.push(sliderCell.querySelector('.img-one')));
const imgTwos = [];
sliderCells.forEach(sliderCell => imgTwos.push(sliderCell.querySelector('.img-two')));

page.innerText = `${currentPage} / ${imgs.length}`;
for (const img of imgs) {
    img.style.top = `calc((25%) * ${i})`;
    if (i === imgs.length - 1) {
        img.style.top = 'calc(-25%)';
    }
    if (img.style.top === 'calc(0%)') {
        img.style.opacity = '1';
    } else if (img.style.top === 'calc(25%)') {
        img.style.display = 'none';
        img.style.opacity = '0';
        setTimeout(function () {
            img.style.display = 'block';
        }, 300);
    } else if (img.style.top === 'calc(-25%)') {
        img.style.display = 'none';
        img.style.opacity = '0';
        setTimeout(function () {
            img.style.display = 'block';
        }, 300);
    } else {
        img.style.display = 'none';
        img.style.opacity = '0';
    }
    i++;
}
i = 0;

for (const imgTwo of imgTwos) {
    // 300px은 왼쪽 사진 크기다.
    imgTwo.style.left = `calc(300px + (25% * ${i}))`
    if (i === imgTwos.length - 1) {
        imgTwo.style.left = 'calc(300px - 25%)';
    }
    if (imgTwo.style.left === 'calc(0% + 300px)') {
        imgTwo.style.opacity = '1';
    } else if (imgTwo.style.left === 'calc(25% + 300px)') {
        imgTwo.style.display = 'none';
        imgTwo.style.opacity = '0';
        setTimeout(function () {
            imgTwo.style.display = 'block';
        }, 300);
    } else if (imgTwo.style.left === 'calc(-25% + 300px)') {
        imgTwo.style.display = 'none';
        imgTwo.style.opacity = '0';
        setTimeout(function () {
            imgTwo.style.display = 'block';
        }, 300);
    } else {
        imgTwo.style.display = 'none';
        imgTwo.style.opacity = '0';
    }
    i++;
}

lessButton.onclick = () => {
    swiperBars[currentPage - 1].classList.remove('point');
    imgs.forEach(img => {
        img.style.top = `calc(${img.style.top} + 25%)`;
        let topEventValue = 25 * (imgs.length - 1) + '%'
        if (img.style.top === `calc(${topEventValue})`) {
            img.style.top = 'calc(-25%)';
        }
        if (img.style.top === 'calc(0%)') {
            img.style.opacity = '1';
        } else if (img.style.top === 'calc(25%)') {
            img.style.display = 'block';
            img.style.opacity = '0';
        } else if (img.style.top === 'calc(-25%)') {
            img.style.display = 'block';
            img.style.opacity = '0';
        } else {
            img.style.display = 'none';
            img.style.opacity = '0';
        }
    });
    imgTwos.forEach(imgTwo => {
        imgTwo.style.left = `calc(${imgTwo.style.left} + 25%)`
        let leftEventValue = 25 * (imgTwos.length - 1) + '%';
        if (imgTwo.style.left === `calc(${leftEventValue} + 300px)`) {
            imgTwo.style.left = 'calc(300px - 25%)';
        }
        if (imgTwo.style.left === 'calc(0% + 300px)') {
            imgTwo.style.opacity = '1';
        } else if (imgTwo.style.left === 'calc(25% + 300px)') {
            imgTwo.style.opacity = '0';
            imgTwo.style.display = 'block';
        } else if (imgTwo.style.left === 'calc(-25% + 300px)') {
            imgTwo.style.opacity = '0';
            imgTwo.style.display = 'block';
        } else {
            imgTwo.style.display = 'none';
            imgTwo.style.opacity = '0';
        }
    });
    currentPage--;
    if (currentPage < 1) {
        currentPage = imgs.length;
    }
    page.innerText = `${currentPage} / ${imgs.length}`;
    if (currentPage - 1 < 0) {
        swiperBars[sliderCells.length - 1].classList.add('point');
    } else {
        swiperBars[currentPage - 1].classList.add('point');
    }
    i = 0;
}

const rightMovie = () => {
    swiperBars[currentPage - 1].classList.remove('point');
    imgs.forEach(img => {
        img.style.top = `calc(${img.style.top} - (25%)`;
        if (img.style.top === 'calc(-50%)') {
            img.style.top = `calc(25% * ${imgs.length - 2})`;
        }
        if (img.style.top === 'calc(0%)') {
            img.style.opacity = '1';
        } else if (img.style.top === 'calc(25%)') {
            img.style.display = 'block';
            img.style.opacity = '0';
        } else if (img.style.top === 'calc(-25%)') {
            img.style.display = 'block';
            img.style.opacity = '0';
        } else {
            img.style.display = 'none';
            img.style.opacity = '0';
        }
    });
    imgTwos.forEach(imgTwo => {
        imgTwo.style.left = `calc(${imgTwo.style.left} - 25%)`;
        // if (imgTwo.style.left === `calc((-25% * ${imgTwos.length - 1}) + 300px)`) {
        // 여기 -100% 적으면 먹는데 이렇게 적으면 안먹음 ㅠㅠ...
        if (imgTwo.style.left === `calc(-50% + 300px)`) {
            imgTwo.style.left = `calc(300px + 25% * ${imgTwos.length - 2})`;
        }
        if (imgTwo.style.left === 'calc(0% + 300px)') {
            imgTwo.style.opacity = '1';
        } else if (imgTwo.style.left === 'calc(25% + 300px)') {
            imgTwo.style.opacity = '0';
            imgTwo.style.display = 'block';
        } else if (imgTwo.style.left === 'calc(-25% + 300px)') {
            imgTwo.style.opacity = '0';
            imgTwo.style.display = 'block';
        } else {
            imgTwo.style.display = 'none';
            imgTwo.style.opacity = '0';
        }
        i++;
    })
    currentPage++;
    if (currentPage > 5) {
        currentPage = 1;
    }
    page.innerText = `${currentPage} / ${imgs.length}`;
    if (currentPage + 1 > 6) {
        swiperBars[0].classList.add('point');
    } else {
        swiperBars[currentPage - 1].classList.add('point');
    }
    i = 0;
}

moreButton.onclick = () => {
    rightMovie();
}

playButton.onclick = () => {
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    const play = setInterval(rightMovie, 5400);
    pauseButton.onclick = () => {
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        clearInterval(play);
    }
}