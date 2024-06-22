const orderThreeContainer = document.querySelector('.order-three-container');
const liBars = orderThreeContainer.querySelectorAll('.discout-list > ul > li');
const rollbanner = orderThreeContainer.querySelector('.rollbanner');
const swiperSlides = rollbanner.querySelectorAll('.swiper-slide');
const selectPaymentLabels = orderThreeContainer.querySelectorAll('.select-payment > div > span > label');
const dropdownToggleButton = orderThreeContainer.querySelector('.dropdown-toggle');
const dropdownMenu = orderThreeContainer.querySelector('.dropdown-menu');
const dropdownMenuLis = dropdownMenu.querySelectorAll(':scope > .inner > .dropdown-menu.inner > li');
const selectPaymentCardMethods = orderThreeContainer.querySelectorAll('.select-payment-card > input, .select-payment-card > label:not(:first-child)');

if (document.querySelector('.order-container') !== null) {
    // 관람권 및 할인적용에서 li 누르면 안에 내용 보이는거
    liBars.forEach(li => li.onclick = () => {
        // li에 있는 on을 전부 지우고
        liBars.forEach(li => li.classList.remove('on'));
        // 선택한 li에 on을 추가
        li.classList.add('on');
    });

    // 스와이퍼 위로 움직이는거
    {
        let i = 0;
        for (let swiperSlide of swiperSlides) {
            orderThreeContainer.querySelector('.swiper-pagination-current').innerText = 1;
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
            if (orderThreeContainer.querySelector('.swiper-pagination-current').innerText === '2') {
                orderThreeContainer.querySelector('.swiper-pagination-current').innerText = 1;
            } else {
                orderThreeContainer.querySelector('.swiper-pagination-current').innerText++;
            }
        }, 2400);
    }


//     결제 수단 선택에서 선택하면 내용물 보이는거
    selectPaymentLabels.forEach(selectPaymentLabel => selectPaymentLabel.onclick = () => {
        // 신용/체크카드
        if (selectPaymentLabel.classList.contains('credit')) {
            orderThreeContainer.querySelectorAll('.select-payment > *:not(:first-child)').forEach(selectPaymentChild => selectPaymentChild.style.display = 'none');
            orderThreeContainer.querySelector('.select-payment-card').style.display = 'flex';
            orderThreeContainer.querySelector('.payment-thing > .thing').innerText = orderThreeContainer.querySelector('label.credit').innerText;
            orderThreeContainer.querySelector('.term-list').style.display = 'none';

            // 결제 눌르면
            orderThreeContainer.querySelector('[rel="checkAgreeTerms"]').onclick = () => {
                if (orderThreeContainer.querySelector('.filter-option-inner-inner').innerText === '카드선택') {
                    showAlertCheckTerms('결제하실 카드를 선택하세요.');
                }
            }
        }
        // 휴대폰결제
        if (selectPaymentLabel.classList.contains('mobile')) {
            orderThreeContainer.querySelectorAll('.select-payment > *:not(:first-child)').forEach(selectPaymentChild => selectPaymentChild.style.display = 'none');
            orderThreeContainer.querySelector('.select-mobile-info').style.display = 'block';
            orderThreeContainer.querySelector('.payment-thing > .thing').innerText = orderThreeContainer.querySelector('label.mobile').innerText;
            orderThreeContainer.querySelector('.term-list').style.display = 'none';
        }
        // 간편결제
        if (selectPaymentLabel.classList.contains('easypay')) {
            orderThreeContainer.querySelectorAll('.select-payment > *:not(:first-child)').forEach(selectPaymentChild => selectPaymentChild.style.display = 'none');
            orderThreeContainer.querySelector('.select-payment-easypay').style.display = 'flex';
            orderThreeContainer.querySelector('.term-list').style.display = 'block';
            const payMethods = orderThreeContainer.querySelectorAll('.select-payment-easypay > input');
            // 체크된게 아무것도 없으면 결제수단란 비우기
            // 배열에 true, false 넣고 전부 false면 결제수단란 비울거임
            const payMethodChecked = [];
            payMethods.forEach(payMethod => {
                payMethodChecked.push(payMethod.checked);
                if (payMethod.checked) {
                    if (payMethod.classList.contains('toss')) {
                        orderThreeContainer.querySelector('.select-toss-info').style.display = 'block';
                        orderThreeContainer.querySelector('.select-naverpay-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-kakao-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-payco-info').style.display = 'none';
                        orderThreeContainer.querySelector('.payment-thing > .thing').innerText = '토스페이';
                    }
                    if (payMethod.classList.contains('naver')) {
                        orderThreeContainer.querySelector('.select-toss-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-naverpay-info').style.display = 'block';
                        orderThreeContainer.querySelector('.select-kakao-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-payco-info').style.display = 'none';
                        orderThreeContainer.querySelector('.payment-thing > .thing').innerText = '네이버페이';
                    }
                    if (payMethod.classList.contains('kakao')) {
                        orderThreeContainer.querySelector('.select-toss-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-naverpay-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-kakao-info').style.display = 'block';
                        orderThreeContainer.querySelector('.select-payco-info').style.display = 'none';
                        orderThreeContainer.querySelector('.payment-thing > .thing').innerText = '카카오페이';
                    }
                    if (payMethod.classList.contains('payco')) {
                        orderThreeContainer.querySelector('.select-toss-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-naverpay-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-kakao-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-payco-info').style.display = 'block';
                        orderThreeContainer.querySelector('.payment-thing > .thing').innerText = '페이코'
                    }
                    if (payMethod.classList.contains('KB')) {
                        orderThreeContainer.querySelector('.select-toss-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-naverpay-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-kakao-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-payco-info').style.display = 'none';
                        orderThreeContainer.querySelector('.payment-thing > .thing').innerText = 'KB PAY';
                    }
                }
            });
            if (payMethodChecked.every(payMethod => payMethod === false)) {
                orderThreeContainer.querySelector('.payment-thing > .thing').innerText = '';
            }
            payMethods.forEach(payMethod => payMethod.onchange = () => {
                if (payMethod.checked) {
                    if (payMethod.classList.contains('toss')) {
                        orderThreeContainer.querySelector('.select-toss-info').style.display = 'block';
                        orderThreeContainer.querySelector('.select-naverpay-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-kakao-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-payco-info').style.display = 'none';
                        orderThreeContainer.querySelector('.payment-thing > .thing').innerText = '토스페이';
                    }
                    if (payMethod.classList.contains('naver')) {
                        orderThreeContainer.querySelector('.select-toss-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-naverpay-info').style.display = 'block';
                        orderThreeContainer.querySelector('.select-kakao-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-payco-info').style.display = 'none';
                        orderThreeContainer.querySelector('.payment-thing > .thing').innerText = '네이버페이';
                    }
                    if (payMethod.classList.contains('kakao')) {
                        orderThreeContainer.querySelector('.select-toss-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-naverpay-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-kakao-info').style.display = 'block';
                        orderThreeContainer.querySelector('.select-payco-info').style.display = 'none';
                        orderThreeContainer.querySelector('.payment-thing > .thing').innerText = '카카오페이';
                    }
                    if (payMethod.classList.contains('payco')) {
                        orderThreeContainer.querySelector('.select-toss-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-naverpay-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-kakao-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-payco-info').style.display = 'block';
                        orderThreeContainer.querySelector('.payment-thing > .thing').innerText = '페이코'
                    }
                    if (payMethod.classList.contains('KB')) {
                        orderThreeContainer.querySelector('.select-toss-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-naverpay-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-kakao-info').style.display = 'none';
                        orderThreeContainer.querySelector('.select-payco-info').style.display = 'none';
                        orderThreeContainer.querySelector('.payment-thing > .thing').innerText = 'KB PAY';
                    }
                }
            })
            // 결제 눌르면
            orderThreeContainer.querySelector('[rel="checkAgreeTerms"]').onclick = () => {
                const payMethodsIsChecked = [];
                payMethods.forEach(payMethod => {
                    payMethodsIsChecked.push(payMethod.checked);
                })
                if (!orderThreeContainer.querySelector('.term-list > dt > .bg-chk > input').checked) {
                    if (payMethodsIsChecked.every(payMethod => payMethod === false)) {
                        showAlertCheckTerms(`결제 하지 않은 금액이 있습니다. <br>
                        결제 수단을 선택해주세요.`);
                    } else {
                        showAlertCheckTerms(`결제대행 서비스 약관에 동의하시겠습니까?`, () => {
                            orderThreeContainer.querySelector('.term-list > dt > .bg-chk > input').checked = true;
                        });
                    }
                }
            }
        }
        // 내 통장 결제
        if (selectPaymentLabel.classList.contains('settlebank')) {
            orderThreeContainer.querySelectorAll('.select-payment > *:not(:first-child)').forEach(selectPaymentChild => selectPaymentChild.style.display = 'none');
            orderThreeContainer.querySelector('.select-settlebank-info').style.display = 'block';
            orderThreeContainer.querySelector('.term-list').style.display = 'none';
            orderThreeContainer.querySelector('.payment-thing > .thing').innerText = orderThreeContainer.querySelector('label.settlebank').innerText;
        }
    })

//     카드 결제에서 카드 선택 누르면 select 보이는거
    dropdownToggleButton.onclick = () => {
        dropdownToggleButton.classList.toggle('open');
    }

//     카드 선택 눌러서 보인 select를 눌렀을 때
    dropdownMenuLis.forEach(dropdownMenuLi => dropdownMenuLi.onclick = () => {
        // 버튼의 내용을 내가 선택한 select의 내용으로 바꾸고
        dropdownToggleButton.querySelector('.filter-option-inner-inner').innerText = dropdownMenuLi.querySelector('span.text').innerText;
        // 버튼에 open 삭제
        dropdownToggleButton.classList.remove('open');

        if (dropdownToggleButton.querySelector('.filter-option-inner-inner').innerText !== '카드선택') {
            selectPaymentCardMethods.forEach(selectPaymentCardMethod => selectPaymentCardMethod.style.display = 'block');
        } else {
            selectPaymentCardMethods.forEach(selectPaymentCardMethod => selectPaymentCardMethod.style.display = 'none');
        }
    });

//     결제 눌렀을 때 약관동의 체크 안돼있으면
    const showAlertCheckTerms = (content, onclick) => {
        alertCover.show();
        if (typeof onclick === 'function') {
            new MessageObj({
                title: '알림',
                content: content,
                buttons: [
                    {
                        text: '취소', onclick: instance => {
                            instance.hide();
                            alertCover.hide();
                        }
                    },
                    {
                        text: '확인', onclick: instance => {
                            instance.hide();
                            onclick();
                            alertCover.hide();
                        }
                    }
                ]
            }).show();
        } else {
            new MessageObj({
                title: '알림',
                content: content,
                buttons: [
                    {
                        text: '확인', onclick: instance => {
                            instance.hide();
                            alertCover.hide();
                        }
                    }
                ]
            }).show();
        }
    }

//     검은 박스 아래 abbox 슬라이드
    {
        const abbox = orderThreeContainer.querySelector('.adbox');
        const swiperSlides = abbox.querySelectorAll('.swiper-slide');
        const swiperBullets = abbox.querySelectorAll('.swiper-pagination-bullet');
        const swiperBulletsArray = [];
        swiperBullets.forEach(swiperBullet => swiperBulletsArray.push(swiperBullet));
        let i = 0;
        for (let swiperSlide of swiperSlides) {
            swiperSlide.style.left = `calc(310px * ${i})`;
            if (swiperSlide.style.left === 'calc(0px)' ||
                swiperSlide.style.left === 'calc(-310px)' ||
                swiperSlide.style.left === 'calc(310px)') {
                swiperSlide.style.display = 'block';
            } else {
                swiperSlide.style.display = 'none';
            }
            i++;
        }
        let j = 0;
        const leftSlide = setInterval(() => {
            swiperBullets.forEach(swiperBullet => swiperBullet.classList.remove('on'));
            // 슬라이드가 개라서 이렇게 함, 갯수 바뀌면 수정해야댐
            if (j === 0 ||
            j === 1){
                j++;
                swiperBulletsArray[j].classList.add('on');
            } else {
                j = 0;
                swiperBulletsArray[j].classList.add('on');
            }
            swiperSlides.forEach(swiperSlide => {
                swiperSlide.style.left = `calc(${swiperSlide.style.left} - (310px)`;
                if (swiperSlide.style.left === 'calc(-620px)') {
                    swiperSlide.style.left = 'calc(1240px)';
                }
                if (swiperSlide.style.left === 'calc(0px)' ||
                    swiperSlide.style.left === 'calc(-310px)' ||
                    swiperSlide.style.left === 'calc(310px)') {
                    swiperSlide.style.display = 'block';
                } else {
                    swiperSlide.style.display = 'none';
                }
            })
        }, 3300);
    }
}


