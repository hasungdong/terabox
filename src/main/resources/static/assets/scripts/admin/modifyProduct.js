modifyProductForm.divResult = modifyProductForm.querySelector('.result-box');

modifyProductForm.onsubmit = e => {
    e.preventDefault();

    modifyProductForm.nameLabel = new LabelObj(modifyProductForm.querySelector('[rel="nameLabel"]'));
    modifyProductForm.nameLabel.setValid(modifyProductForm['name'].tests());
    if (!modifyProductForm.nameLabel.isValid()) {
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        loading.hide();
        if (xhr.status < 200 || xhr.status >= 300) {
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
                modifyProductForm.divResult.innerHTML = '';
                if (responseArray.length === 0) {
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
                modifyProductForm.divResult.append(ul);
                const lis = modifyProductForm.divResult.querySelectorAll('li');
                lis.forEach(li => li.onclick = () => {
                    new MessageObj({
                        title: '경고',
                        content: '이 상품을 수정하시겠습니까?',
                        buttons: [
                            {
                                text: '취소', onclick: instance => {
                                    instance.hide();
                                }
                            },
                            {
                                text: '확인', onclick: instance => {
                                    instance.hide();
                                    modifyProductFormTwo.show();
                                    const xhr = new XMLHttpRequest();
                                    xhr.onreadystatechange = function(){
                                        if (xhr.readyState !== XMLHttpRequest.DONE){
                                            return;
                                        }
                                        if(xhr.status < 200 || xhr.status >= 300){
                                            MessageObj.createSimpleOk('오류', '요청을 전송하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
                                            return;
                                        }
                                        const responseObject = JSON.parse(xhr.responseText);
                                        // nameLabel에 있던 속성 th:attrappend="data-regex=${productRegex.proName.expression}"
                                        const modifyProductFormInner = new DOMParser().parseFromString(`
                                        <div class="content">
        <label class="_obj-label" rel="nameLabel">
            <span class="__text">상품 이름</span>
            <input autofocus required class="_obj-input __field" type="text" name="name" maxlength="100" minlength="1" value="${responseObject['name']}">
            <span class="__warning">올바른 이름을 입력해 주세요.</span>
        </label>
        <label class="_obj-label thumbnail" rel="thumbnailLabel">
            <input hidden accept="image/*" name="thumbnail" type="file">
            <span class="__text">상품 이미지</span>
            <span class="image-wrapper">
                <span class="empty" style="display:none;">상품 이미지를 선택해 주세요.</span>
                <img alt="" class="image" src="/store/image?index=${responseObject['index']}" style="display:block;">
            </span>
        </label>
        <label class="_obj-label" rel="priceLabel">
            <span class="__text">상품 가격</span>
            <input class="_obj-input __field" type="text" name="price" value="${responseObject['price']}">
            <span class="__warning">올바른 가격을 입력해 주세요.</span>
        </label>
        <label class="_obj-label" rel="quantityLabel">
            <span class="__text">상품 수량</span>
            <input class="_obj-input __field" type="text" name="quantity" value="${responseObject['quantity']}">
            <span class="__warning">올바른 수량을 입력해 주세요.</span>
        </label>
        <div class="spring"></div>
        <button type="submit">수정하기</button>
        <button type="button" rel="hideModifyProductFormTwo">취소</button>
    </div>
    
    `, 'text/html').querySelector('div.content');
                                        modifyProductFormTwo.append(modifyProductFormInner);
                                        modifyProductFormTwo['thumbnail'].onchange = () => {
                                            const thumbnailLabel = modifyProductFormTwo.querySelector('label.thumbnail');
                                            const imageWrapper = thumbnailLabel.querySelector(':scope > .image-wrapper');
                                            const empty = imageWrapper.querySelector(':scope > .empty');
                                            const image = imageWrapper.querySelector(':scope > .image');

                                            // 이미지 선택할 때 취소 누르면 아래 if문으로 빠짐
                                            if (modifyProductFormTwo['thumbnail'].files.length === 0){
                                                empty.style.display = 'block';
                                                image.style.display = 'none';
                                                return;
                                            }
                                            const fileReader = new FileReader(); // 이미지 파일을 Nase64 인코딩하기 위한 객체
                                            fileReader.onload = () => {
                                                empty.style.display = 'none';
                                                image.style.display = 'block';
                                                image.setAttribute('src', fileReader.result);
                                            };
                                            fileReader.readAsDataURL(modifyProductFormTwo['thumbnail'].files[0]);
                                        }
                                        modifyProductFormInner.querySelector('[rel="hideModifyProductFormTwo"]').onclick = () => {
                                            modifyProductFormInner.remove();
                                            modifyProductFormTwo.hide();
                                        }
                                        modifyProductFormTwo.onsubmit = e => {
                                            e.preventDefault();
                                            const xhr = new XMLHttpRequest();
                                            const formData = new FormData();
                                            formData.append('index', li.querySelector('[name="index"]').value);
                                            formData.append('name', modifyProductFormTwo['name'].value);
                                            formData.append('price', modifyProductFormTwo['price'].value);
                                            formData.append('quantity', modifyProductFormTwo['quantity'].value);
                                            formData.append('_thumbnail', modifyProductFormTwo['thumbnail'].files[0]);
                                            xhr.onreadystatechange = function () {
                                                if (xhr.readyState !== XMLHttpRequest.DONE) {
                                                    return;
                                                }
                                                loading.hide();
                                                if (xhr.status < 200 || xhr.status >= 300) {
                                                    MessageObj.createSimpleOk('오류', '요청을 전송하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
                                                    return;
                                                }
                                                const responseObject = JSON.parse(xhr.responseText);
                                                const [dTitle, dContent, dOnclick] = {
                                                    failure: ['경고', '알 수 없는 이유로 상품을 수정하지 못하였습니다. 잠시 후 다시 시도해 주세요.'],
                                                    success: ['알림', '상품을 성공적으로 수정하였습니다.']
                                                }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
                                                MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
                                            }
                                            xhr.open('PATCH', '/admin/product');
                                            xhr.send(formData);
                                            loading.show();
                                        }
                                    }
                                    xhr.open('GET', `/store/product?index=${li.querySelector('[name="index"]').value}`);
                                    xhr.send();
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
    xhr.open('GET', `/store/search?keyword=${modifyProductForm['name'].value}`);
    xhr.send();
    loading.show();
}