const bottomBar1 = document.querySelector('.bottomBar1');
const bottomBar2 = document.querySelector('.bottomBar2');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const inputText = document.querySelector('.input-text');
const price = document.getElementById('price');
const radioChoice01 = document.getElementById('radio_choice01');
const radioChoice03 = document.getElementById('radio_choice03');
const selectCard = document.querySelector('.select-card');
const selectKakaoInfo = document.querySelector('.select-kakao-info');
const radioChoices = document.querySelectorAll('input[name="radio_choice"]');
const mores = document.querySelectorAll('.more');


//결제를 선택했을때 나올것
radioChoices.forEach(radioChoice => radioChoice.addEventListener('change', () => {
        if (radioChoice01.checked){
            selectCard.show();
            mores.forEach(more=> {
                more.hide();
            });
        }else{
            selectCard.hide();
        }
        if (radioChoice03.checked){
            selectKakaoInfo.show();
            mores.forEach(more=> {
                more.show(); //more 은 함수가 아니라서 forEach 써줘야함
            });
        }else{
            selectKakaoInfo.hide();
        }
    })
);

if (price !==null) {
    const number = price.innerText.replace(/,/g, "");
    minus.onclick = () => {
        if (inputText.value > 1) {
            inputText.value--;
            const sum = Number(number) * Number(inputText.value);
            price.innerText = (sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
    }


    plus.onclick = () => {
        if (inputText.value < 8) {
            inputText.value++;
            const sum = Number(number) * Number(inputText.value);
            price.innerText = (sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        }
    }
}

document.querySelectorAll('[rel="btn1"]').forEach(moreButton => {
    let Visible = false; // dotList03의 초기 상태는 숨김

    // 클릭 이벤트 리스너 추가
    moreButton.onclick = () => {
        if (Visible) {
            bottomBar1.hide(); // dotList03 숨김
        } else {
            bottomBar1.show(); // dotList03 표시
        }
        Visible = !Visible; // 상태 토글
    };
});


document.querySelectorAll('[rel="btn2"]').forEach(moreButton => {
    let Visible = false; // dotList03의 초기 상태는 숨김

    // 클릭 이벤트 리스너 추가
    moreButton.onclick = () => {
        if (Visible) {
            bottomBar2.hide(); // dotList03 숨김
        } else {
            bottomBar2.show(); // dotList03 표시
        }
        Visible = !Visible; // 상태 토글
    };
});
