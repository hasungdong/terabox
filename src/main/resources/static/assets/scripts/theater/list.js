window.onload = () => {
    const lis = document.querySelector('.theater-place').querySelectorAll(':scope > ul > li');
    lis[0].classList.add('on');
    // 박스의 높이를 요소의 크기에 따라 다르게 설정하려고,
    // 박스 요소들 포지션이 absolute라서 이걸 안하면 높이가 안바뀜
    // 궁금하면 스크립트 전체 주석처리하고 봐보셈
    const liOn = document.querySelector('.theater-place').querySelector(':scope > ul > li.on');
    document.querySelector('.theater-box').style.height = `${liOn.querySelector('.theater-list').clientHeight + document.querySelector('.user-theater').clientHeight + liOn.clientHeight}px`;

    // 이건 클릭했을 때 다른 지역들 눌리는거
    lis.forEach(li => li.onclick = () => {
        lis.forEach(li => li.classList.remove('on'));
        li.classList.add('on');
        // 버튼눌러서 다른 지역 보여줄 때도 높이 값이 변해야되서 같은 로직
        document.querySelector('.theater-box').style.height = `${li.querySelector('.theater-list').clientHeight + document.querySelector('.user-theater').clientHeight + li.clientHeight}px`;
    });

    // 밑에서 사용될 극장지점명들
    let liList = document.querySelector('.theater-list').querySelectorAll(':scope > ul > li');
    liList.forEach(li => {
        console.log(li.className);
        if (li.classList[0] !== li.classList[1]){
            // li.remove();
        }
    })
}