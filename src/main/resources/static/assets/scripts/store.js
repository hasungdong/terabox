const bottomBar1 = document.querySelector('.bottomBar1');
const bottomBar2 = document.querySelector('.bottomBar2');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const inputText = document.querySelector('.input-text');
const price = document.getElementById('price');
const selectCard = document.querySelector('.select-card');
const selectKakaoInfo = document.querySelector('.select-kakao-info');
const radioChoice = document.querySelectorAll('input[name="radio_choice"]');
const mores = document.querySelectorAll('.more');
const orderTotalPrice = document.getElementById('orderTotalPrice'); //총 상품 금액
const totalPrice = document.getElementById
('totalPrice'); // 최종 결제금액
const totalSale = document.getElementById('totalSale');//할인금액
const DetailBuyButton = document.querySelector('.DetailBuyButton');
const orderCardSelect = document.getElementById('card_select');
const storePrices = document.querySelectorAll('.storePrice');
const orderBuyButton = document.querySelector('.orderBuyButton'); //store order 에 구매버튼
const alertPopup = document.querySelector('.alert-popup');
const paymentCloseButton = document.querySelector('.btn-layer-close');
const paymentCloseButton2 = document.querySelector('.lyclose');
const orderButton=document.getElementById('agree');
const orderOk = document.querySelector('.confirm');
const orderCardSelect0 = document.getElementById('general_card');
const orderPrice = document.getElementById('orderPrice');
const soldOut = document.querySelectorAll('.soldout');


 /* store.js 부분*/
if (storePrices !== null) {
    storePrices.forEach(storePrice =>{
        storePrice.innerText = storePrice.innerText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
}

/*---------------------- storeDetail.js ------------------*/

// 스토어 디테일 수량 올릴때

if (price !== null){
    const DetailBuyButton = document.querySelector('.DetailBuyButton');
    const DetailQuantity = document.querySelector('.DetailQuantity');
    const orderPrice = price.innerText.replace(/,/g, "");
    const soldOutButton = document.querySelector('.gray');


    if(DetailQuantity.value === '0'){
        soldOutButton.show();
        DetailBuyButton.show();
    }

    minus.onclick = () => {
        if (inputText.value > 1) {
            inputText.value--;
            const sum = Number(orderPrice) * Number(inputText.value);
            price.innerText = (sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); //세자리수 마다 콤마 붙히는거
            // 할인금액 = 합계 - 할인금액
        }
    };


    plus.onclick = () => {
        if (inputText.value < 8) {
            //db에 있는 수량보다 더 플러스 못하게
            if (inputText.value === DetailQuantity.value ){
                new MessageObj({
                    title: '알림',
                    content: '수량이 부족합니다.',
                    buttons: [
                        {text: '확인', onclick: instance => {
                                instance.hide();
                                alertCover.hide();
                            }
                        }
                    ]
                }).show();
                return;
            }
            if (inputText.value > DetailQuantity.value ){
                new MessageObj({
                    title: '알림',
                    content: '상품이 품절되어서 구매가 불가능합니다.',
                    buttons: [
                        {text: '확인', onclick: instance => {
                                instance.hide();
                                alertCover.hide();
                            }
                        }
                    ]
                }).show();
                return;
            }

            inputText.value++;
            const sum = Number(orderPrice) * Number(inputText.value);
            price.innerText = (sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
    };
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

/* 선택한 수량 order 값에 넣어주기 */
if (DetailBuyButton !== null){
    DetailBuyButton.onclick = () => {
        location.href = `/store/order?index=${document.querySelector('[name="index"][type="hidden"]').value}&inputText=${inputText.value}&price=${price.innerText}`;    /*인풋텍스트 넣어서 보내주기*/
    }
}

/* --------------------- orderThree.js ------------------ */

if (totalSale !== null) { // storeDetail 에서 order 로 넘어왔을때 order 에만 있는 함수를 적어준다.
    // 최종 결제금액(totalSale) = 총 상품금액(orderTotalPrice) - 할인금액(totalSale)
    const rOrderTotalPrice =  orderTotalPrice.innerText.replace(/,/g, "");
    totalPrice.innerText = orderTotalPrice.innerText;//최종금액 넣어주기

    // const rTotalSale = totalSale.innerText.replace(/,/g, "");
    // totalPrice.innerText = `${Number(rOrderTotalPrice) - Number(rTotalSale)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","); //벤틱으로 감싸면 문자열로 바뀐다.

    /* 카드선택에서 어떤거 선택했지만 콘솔에 나오는거 */
    orderCardSelect.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if (xhr.readyState !== XMLHttpRequest.DONE){
                return;
            }
            if(xhr.status < 200 || xhr.status >= 300){
                return;
            }
            const responseObject = JSON.parse(xhr.responseText);
            totalSale.innerText = responseObject['salePrice'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            totalPrice.innerText = responseObject['saleTotalPrice'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            // console.log(responseObject['result']);
            // console.log(responseObject);``


        }
         xhr.open(`GET`,`/store/card?selectedValue=${selectedValue}&rOrderTotalPrice=${rOrderTotalPrice}`);
        /*store/order 라고 썼어서 안됐음 -> card 로 바꿔줬음*/
        // /슬래시가 꼭 있어야함. 슬래쉬가 있으면 절대경로 없으면 상대경로인데 절대경로로 주는것이 좋다.
         xhr.send();
      // 선택된 옵션의 값 출력
      //   console.log(selectedValue);
    });

    /* 스토어 오더 걸제 창에서 취소 눌렀을떄 */
    paymentCloseButton.onclick = () =>{
        alertPopup.hide();
        cover.hide();
    }

    /*스토어 오더 걸제 창에서 X 버튼 눌렀을떄 */
    paymentCloseButton2.onclick = () =>{
        alertPopup.hide();
        cover.hide();
    }

    /*스토어 오더에서 결제확인창에  확인 눌렀을때 */

    const orderQuantity = document.getElementById('orderQuantity');
    const orderIndex = document.querySelector('.index');

        orderOk.onclick=()=>{
            const cardSelect  = document.getElementById('card_select');

// 선택된 옵션을 가져옵니다.
            let selectedOption = cardSelect.options[cardSelect.selectedIndex].value;

            if (kakaoPay.checked){
                selectedOption = kakaoPay.value;
            }

// 선택된 옵션의 값을 formData에 추가합니다.
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            // console.log(orderQuantity.innerText);
            // console.log(orderPrice.innerText.replace(/,/g, ""));
            // console.log(orderIndex.value);

            formData.append('totalSale',totalSale.innerText.replace(/,/g, ""));
            formData.append('quantity',orderQuantity.innerText);
            formData.append('price',orderPrice.innerText.replace(/,/g, ""));
            formData.append('selectedValue', selectedOption);
            console.log(selectedOption.value);
            console.log(selectedOption);
            formData.append('totalPrice',totalPrice.innerText.replace(/,/g, ""));
            console.log(totalPrice.innerText);
            formData.append('productIndex',orderIndex.value);

            xhr.onreadystatechange = function(){
                if (xhr.readyState !== XMLHttpRequest.DONE){
                    return;
                }
                if(xhr.status < 200 || xhr.status >= 300){
                    alert('요청 자체가 실패 ');
                    return;
                }
                const responseObject = JSON.parse(xhr.responseText); //이거를 한칸 밑 괄호에 넣어줌
                switch (responseObject.result){
                    case 'success' :
                        alertPopup.hide();
                        cover.hide();
                        alertCover.show()
                        new MessageObj({
                            title: '알림',
                            content: '결제가 완료되었습니다. 구매내역은 나의 메가박스에서 확인해주세요.',
                            buttons: [
                                {text: '확인', onclick: instance => {
                                        instance.hide();
                                        alertCover.hide();
                                        location.replace('/store/store');
                                    }
                                }
                            ]
                        }).show();
                        break;

                    case 'failure':
                        alertPopup.hide();
                        cover.hide();
                        alertCover.show()
                        new MessageObj({
                            title: '알림',
                            content: '결제가 실패하였습니다.',
                            buttons: [
                                {text: '확인', onclick: instance => {
                                        instance.hide();
                                        alertCover.hide();
                                    }
                                }
                            ]
                        }).show();
                        break;
                    case 'failure_not_point':
                        alertPopup.hide();
                        cover.hide();
                        alertCover.show()
                        new MessageObj({
                            title: '알림',
                            content: '금액이 부족하여 결제가 실패하였습니다. 잔여 포인트를 확인해주세요.',
                            buttons: [
                                {text: '확인', onclick: instance => {
                                        instance.hide();
                                        alertCover.hide();
                                    }
                                }
                            ]
                        }).show();
                        break;

                    case 'failure_quantity':
                        alertPopup.hide();
                        cover.hide();
                        alertCover.show()
                        new MessageObj({
                            title: '알림',
                            content: '상품이 수량이 소진되어 품절되었습니다.',
                            buttons: [
                                {text: '확인', onclick: instance => {
                                        instance.hide();
                                        alertCover.hide();
                                    }
                                }
                            ]
                        }).show();
                        break;

                    default:
                        alertPopup.hide();
                        cover.hide();
                        alertCover.show()
                        new MessageObj({
                            title: '알림',
                            content: '요청이 실패했습니다.',
                            buttons: [
                                {text: '확인', onclick: instance => {
                                        instance.hide();
                                        alertCover.hide();
                                    }
                                }
                            ]
                        }).show();
                        break;

                }


            }

            xhr.open(`POST`,`./order`);
            xhr.send(formData);


        }

        /* 스토어 오더에서 결제버튼 눌렀을때 */

        const checkCard = document.getElementById('radio_choice01');
        const kakaoPay = document.getElementById('radio_choice03');



        orderBuyButton.onclick=() =>{
            if (checkCard.checked ){
                if ( orderCardSelect.value !== '00'){
                    const email = document.querySelector('.email');
                    email.innerText =

                    alertPopup.show();
                    cover.show(()=>{
                        cover.hide();
                        alertPopup.hide();
                    });
                }else{
                    alertCover.show()
                    new MessageObj({
                        title: '알림',
                        content: '카드를 선택해주세요.',
                        buttons: [
                            {text: '확인', onclick: instance => {
                                    // 개인정보 약관 동의 체크 되도록
                                    instance.hide();
                                    alertCover.hide();
                                }
                            }
                        ]
                    }).show();
                    return;
                }
            }

            if (kakaoPay.checked){
                if (orderButton.checked){//개인정보 동의가 체크 되있으면
                    alertPopup.show();
                    cover.show(()=>{
                        cover.hide();
                        alertPopup.hide();
                    });
                }else{
                    alertCover.show()
                    new MessageObj({
                        title: '알림',
                        content: '결제대행 서비스 약관에 동의하시겠습니까?',
                        buttons: [
                            {text: '취소', onclick: instance => {
                                    instance.hide();
                                    alertCover.hide();
                                }},
                            {text: '확인', onclick: instance => {
                                    orderButton.checked = true;
                                    // 개인정보 약관 동의 체크 되도록
                                    instance.hide();
                                    alertCover.hide();
                                }}
                        ]
                    }).show();
                }
            }
        }

//결제방식 신용/체크카드 선택했을때 나오는거
        radioChoice.forEach(radioChoice => radioChoice.addEventListener('change', () => {
                if (checkCard.checked){
                    selectCard.show();
                    orderCardSelect0.checked = true;
                    mores.forEach(more=> {
                        more.hide();
                    });

                }else{
                    selectCard.hide();
                }
                if (kakaoPay.checked){
                    selectKakaoInfo.show();
                    mores.forEach(more=> {
                        more.show(); //more 은 함수가 아니라서 forEach 써줘야함
                    });
                }else{
                    selectKakaoInfo.hide();
                }
            })
        );
}


const myContent = document.querySelector('.cont');
    document.querySelectorAll('[rel = myMegaMore]').forEach(myMegaMores => {
        let Visible = false; // dotList03의 초기 상태는 숨김
        // 클릭 이벤트 리스너 추가
        myMegaMores.onclick = () => {
            if (Visible) {
                myContent.hide();
            } else {
                myContent.show();
            }
            Visible = !Visible; // 상태 토글
        };
    });

