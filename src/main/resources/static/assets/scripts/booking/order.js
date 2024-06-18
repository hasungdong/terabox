const orderContainer = document.querySelector('.order-container');
const liBars = orderContainer.querySelectorAll('.discout-list > ul > li');
const rollbanner = orderContainer.querySelector('.rollbanner');
const swiperSlides = rollbanner.querySelectorAll('.swiper-slide');
const dropdownToggleButton = orderContainer.querySelector('.dropdown-toggle');
const selectPaymentLabels = orderContainer.querySelectorAll('.select-payment > div > span > label');

if (document.querySelector('.order-container') !== null) {
    // 관람권 및 할인적용에서 li 누르면 안에 내용 보이는거
    liBars.forEach(li => li.onclick = () => {
        // li에 있는 on을 전부 지우고
        liBars.forEach(li => li.classList.remove('on'));
        // 선택한 li에 on을 추가
        li.classList.add('on');
    });
    // 스와이퍼 위로 움직이는거
    let i = 0;
    for (let swiperSlide of swiperSlides) {
        orderContainer.querySelector('.swiper-pagination-current').innerText = 1;
        swiperSlide.style.top = `calc(40px * ${i})`;
        i++;
        if (swiperSlide.style.top === 'calc(0px)' ||
            swiperSlide.style.top === 'calc(-40px)' ||
            swiperSlide.style.top === 'calc(40px)') {
            swiperSlide.style.display = 'block';
        } else {
            swiperSlide.style.display = 'none';
        }
    }
    const upSlide = setInterval(() => {
        swiperSlides.forEach(swiperSlide => {
            swiperSlide.style.top = `calc(${swiperSlide.style.top} - (40px)`;
            if (swiperSlide.style.top === 'calc(-80px)') {
                swiperSlide.style.top = 'calc(80px)';
            }
            if (swiperSlide.style.top === 'calc(0px)' ||
                swiperSlide.style.top === 'calc(-40px)' ||
                swiperSlide.style.top === 'calc(40px)') {
                swiperSlide.style.display = 'block';
            } else {
                swiperSlide.style.display = 'none';
            }
        })
        if (orderContainer.querySelector('.swiper-pagination-current').innerText === '2') {
            orderContainer.querySelector('.swiper-pagination-current').innerText = 1;
        } else {
            orderContainer.querySelector('.swiper-pagination-current').innerText++;
        }
    }, 2400);

//     결제 수단 선택에서 선택하면 내용물 보이는거
    selectPaymentLabels.forEach(selectPaymentLabel => selectPaymentLabel.onclick = () => {
        if (selectPaymentLabel.classList.contains('credit')){
            orderContainer.querySelectorAll('.select-payment > *:not(:first-child)').forEach(selectPaymentChild => selectPaymentChild.style.display = 'none');
            orderContainer.querySelector('.select-payment-card').style.display = 'flex';
        }
        if (selectPaymentLabel.classList.contains('mobile')){
            orderContainer.querySelectorAll('.select-payment > *:not(:first-child)').forEach(selectPaymentChild => selectPaymentChild.style.display = 'none');
            orderContainer.querySelector('.select-mobile-info').style.display = 'block';
        }
        if (selectPaymentLabel.classList.contains('easypay')){
            orderContainer.querySelectorAll('.select-payment > *:not(:first-child)').forEach(selectPaymentChild => selectPaymentChild.style.display = 'none');
            orderContainer.querySelector('.select-payment-easypay').style.display = 'flex';
        }
        if (selectPaymentLabel.classList.contains('settlebank')){
            orderContainer.querySelectorAll('.select-payment > *:not(:first-child)').forEach(selectPaymentChild => selectPaymentChild.style.display = 'none');
            orderContainer.querySelector('.select-settlebank-info').style.display = 'block';
        }
    })

//     카드 결제에서 카드 선택 누르면 select 보이는거
    dropdownToggleButton.onclick = () => {
        dropdownToggleButton.classList.toggle('open');
    }

}


