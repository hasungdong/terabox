// select 버튼 선택하는거,
// 우리 눈에 보이는 select 옵션들은 진짜 select가 아니고 div로 select처럼 생기게 만든거임
// 그래서 div로 만든 가짜 select가 선택됐을 때 효과를 주는 코드를 작성해야 함
if (document.querySelector('button.select') !== null){
    // 닫혀있을 때 누르면 열리는 코드
    const showNewsAgencyButton = document.querySelector('button[rel="showNewsAgency"]');
    const newsAgencyButton = document.querySelector('.option-box.news-agency');
    showNewsAgencyButton.onclick = () => {
        showNewsAgencyButton.classList.toggle('open')
        newsAgencyButton.classList.toggle('open');
    }
    const showCardButton = document.querySelector('button[rel="showCard"]');
    const cardButton = document.querySelector('.option-box.card');
    showCardButton.onclick = () => {
        showCardButton.classList.toggle('open');
        cardButton.classList.toggle('open');
    }
    const showPointButton = document.querySelector('button[rel="showPoint"]');
    const pointButton = document.querySelector('.option-box.point');
    showPointButton.onclick = () => {
        showPointButton.classList.toggle('open');
        pointButton.classList.toggle('open');
    }
//     셀렉트 옵션들 보일 때 누르면 실행되는 코드
    newsAgencyButton.querySelectorAll(':scope > ul > li').forEach(newsAgency => newsAgency.onclick = () => {
        location.href = './telecomcard';
    })
    cardButton.querySelectorAll(':scope > ul > li').forEach(card => card.onclick = () => {
        location.href = './creditcard';
    })
    pointButton.querySelectorAll(':scope > ul > li').forEach(point => point.onclick = () => {
        location.href = './pointcard';
    })
}

