deleteProductForm.divResult = deleteProductForm.querySelector('.result-box');

deleteProductForm.onsubmit = e => {
    e.preventDefault();

    deleteProductForm.nameLabel = new LabelObj(deleteProductForm.querySelector('[rel="nameLabel"]'));
    deleteProductForm.nameLabel.setValid(deleteProductForm['name'].tests());
    if (!deleteProductForm.nameLabel.isValid()){
        return;
    }
    // 이름에 맞는 상품들 검색해오는 xhr 요청
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }
        loading.hide();
        if (xhr.status < 200 || xhr.status >= 300){
            MessageObj.createSimpleOk('오류', '알 수 없는 이유로 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
            return;
        }
        const responseObject = JSON.parse(xhr.responseText);
        switch (responseObject['result']) {
            case 'failure':
                MessageObj.createSimpleOk('경고', '알 수 없는 이유로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.').show();
                break;
            case 'success':
                const responseArray = responseObject['products'];
                deleteProductForm.divResult.innerHTML = '';
                if (responseArray.length === 0){
                    alert('3');
                    return;
                }
                const ul = new DOMParser().parseFromString(`
            <ul></ul>
        `, 'text/html').querySelector('ul');
                for (const responseArrayElement of responseArray) {
                    const li = new DOMParser().parseFromString(`
        <ul>
            <li>
                <input type="hidden" name="index" value="${responseArrayElement['index']}">
                <img class="img" src="" alt="">
                <span class="text-box">
                    <span class="text">${responseArrayElement['name']}</span>
                    <span class="spring"></span>
                    <span class="info">
                        <span class="playing-time">가격<br> ${responseArrayElement['price']}</span>
                        <span class="reservation-rate">수량<br> ${responseArrayElement['quantity']}</span>
                    </span>
                </span>
            </li>
        </ul>
            `, 'text/html').querySelector('li');
                    li.querySelector('.img').setAttribute('src', `/store/image?index=${responseArrayElement['index']}`);
                    ul.append(li);
                }
                deleteProductForm.divResult.append(ul);
                const lis = deleteProductForm.divResult.querySelectorAll('li');
                lis.forEach(li => li.onclick = () => {
                    new MessageObj({
                        title: '경고',
                        content: '이 상품을 삭제하시겠습니까?',
                        buttons: [
                            {
                                text: '취소', onclick: instance => {
                                    instance.hide();
                                }
                            },
                            {
                                text: '확인', onclick: instance => {
                                    instance.hide();
                                    // 선택한거 삭제하는 xhr 요청
                                    const xhr = new XMLHttpRequest();
                                    const formData = new FormData();
                                    formData.append('index', li.querySelector('[name="index"]').value);
                                    xhr.onreadystatechange = function(){
                                        if (xhr.readyState !== XMLHttpRequest.DONE){
                                            return;
                                        }
                                        loading.hide();
                                        if (xhr.status < 200 || xhr.status >= 300){
                                            MessageObj.createSimpleOk('오류', '요청을 전송하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
                                            return;
                                        }
                                        const responseObject = JSON.parse(xhr.responseText);
                                        const [dTitle, dContent, dOnclick] = {
                                            failure: ['경고', '알 수 없는 이유로 상품을 삭제하지 못하였습니다. 잠시 후 다시 시도해 주세요.'],
                                            success: ['알림', '상품을 성공적으로 삭제하였습니다.']
                                        }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
                                        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
                                    }
                                    xhr.open('DELETE', '/admin/product');
                                    xhr.send(formData);
                                    loading.show();
                                }
                            }
                        ]
                    }).show();
                })
                break;
            default:
                MessageObj.createSimpleOk('경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해주세요.').show();
                return;
        }
    }
    xhr.open('GET', `/store/search?keyword=${deleteProductForm['name'].value}`);
    xhr.send();
    loading.show();
}


