const headerImg = document.querySelector('.header-main-page');
const cover = document.getElementById('cover');
const loginForm = document.getElementById('loginForm');
const loading = document.getElementById('loading');
const linksitemap = document.getElementById('header-site-map');
const sitemap = document.getElementById('layer_sitemap');

const headerMovie = document.getElementById('header-movie');
const movieLink = document.getElementById('movieLink-mini');

const headerBuyTicket = document.getElementById('header-buy-ticket');
const reserveLink = document.getElementById('reserveLink-mini');

const headerCinema = document.getElementById('header-cinema');
const theaterLink = document.getElementById('theaterLink-mini');

const headerEvent = document.getElementById('header-event');
const eventLink = document.getElementById('eventLink-mini');

const headerBenefits = document.getElementById('header-benefits');
const membershipLink = document.getElementById('membershipLink-mini');


// 헤더 이미지 색깔 조정하는거
if (!(location.href.slice(-5) === '/home' ||
    location.href.slice(-6) === '/home#')) {
    headerImg.style.filter = 'none';
}


document.querySelectorAll('[rel="showLogin"]').forEach(loginButton => loginButton.onclick = () => {
    loading.show();
    showLogin();
    loading.hide();
})


const showLogin = () => {
    loginForm['email'].value = '';
    loginForm['email'].focus();
    loginForm['password'].value = '';
    loginForm.show();
    cover.show(() => {
        loginForm.hide();
        cover.hide();
    });
};

linksitemap.addEventListener('click', function () {
    sitemap.classList.toggle('on');
    document.querySelector('.fa-solid.fa-bars').classList.toggle('on');
    document.querySelector('.cancel-button').classList.toggle('on');
});

headerMovie.addEventListener('mouseover', function () {
    movieLink.classList.toggle('on');
});
movieLink.addEventListener('mouseleave', function () {
    movieLink.classList.remove('on');
})

headerBuyTicket.addEventListener('mouseover', function () {
    reserveLink.classList.toggle('on');
});
reserveLink.addEventListener('mouseleave', function () {
    reserveLink.classList.remove('on');
})

headerCinema.addEventListener('mouseover', function () {
    theaterLink.classList.toggle('on');
});
theaterLink.addEventListener('mouseleave', function () {
    theaterLink.classList.remove('on');
})

headerEvent.addEventListener('mouseover', function () {
    eventLink.classList.toggle('on');
});
eventLink.addEventListener('mouseleave', function () {
    eventLink.classList.remove('on');
})

headerBenefits.addEventListener('mouseover', function () {
    membershipLink.classList.toggle('on');
});
membershipLink.addEventListener('mouseleave', function () {
    membershipLink.classList.remove('on');
})



