modifyProductForm.divResult = modifyProductForm.querySelector('.result-box');

modifyProductForm.onsubmit = e => {
    e.preventDefault();

    modifyProductForm.nameLabel = new LabelObj(modifyProductForm.querySelector('[rel="nameLabel"]'));
    modifyProductForm.nameLabel.setValid(modifyProductForm['name'].tests());
    if (!modifyProductForm.nameLabel.isValid()) {
        return;
    }
    showProducts(1);
}

const showProducts = (page) => {
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
                    MessageObj.createSimpleOk('알림', '수정할 상품이 없습니다.').show();
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
                        <span class="price">가격<br> ${responseArrayElement['price']}</span>
                        <span class="quantity">수량<br> ${responseArrayElement['quantity']}</span>
                    </span>
                </span>
            </li>
        </ul>
            `, 'text/html').querySelector('li');
                    li.querySelector('.img').setAttribute('src', `/product/image?index=${responseArrayElement['index']}`);
                    ul.append(li);
                }
                modifyProductForm.divResult.append(ul);

                // 검색하고 밑에 페이지 나오게
                // pageContainer 만들기
                const pageContainer = new DOMParser().parseFromString(`
                 <div class="page-container"></div>
                `, 'text/html').querySelector('div');
                modifyProductForm.divResult.append(pageContainer);
                // pageContainer 내용물 만들기
                const maxPage = responseObject['search']['maxPage'];
                if (maxPage > 10) {
                    const preButton = new DOMParser().parseFromString(`
                <button type="button">
                    <img src="/assets/images/common/left.png" height="16" width="16"/>
                    <span>이전</span>
                </button>
                    `, 'text/html').querySelector('button');
                    pageContainer.append(preButton);
                }
                // 페이지 숫자들 들어갈 박스
                const pageBox = new DOMParser().parseFromString(`
                <div class="page-box"></div>
                `, 'text/html').querySelector('div');
                pageContainer.append(pageBox);
                // 페이지 숫자
                for (let i = 1; i <= maxPage; i++) {
                    const page = new DOMParser().parseFromString(`
                    <span class="page">${i}</span>
                    `, 'text/html').querySelector('.page');
                    pageBox.append(page);
                }
                // 다음 버튼
                if (maxPage > 10) {
                    const nextButton = new DOMParser().parseFromString(`
                    <button type="button">
                    <span>다음</span>
                    <img src="/assets/images/common/right.png" height="16" width="16"/>
                </button>
                    `, 'text/html').querySelector('button');
                    pageContainer.append(nextButton);
                }

                const lis = modifyProductForm.divResult.querySelectorAll('li');
                // 불러온 상품들 선택했을 때
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
                <img alt="" class="image" src="/product/image?index=${responseObject['index']}" style="display:block;">
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
        <label class="_obj-label" rel="typeLabel">
            <span class="__text">상품 종류</span>
            <select class="_obj-input __field" name="type">
                <option disabled hidden selected value="-1">종류 선택</option>
                <option value="ticket">티켓(기본)</option>
                <option value="food">음식</option>
                <option value="coupon">쿠폰</option>
            </select>
            <span class="__warning">종류를 선택해 주세요.</span>
        </label>
        <div class="spring"></div>
        <button type="submit">수정하기</button>
        <button type="button" rel="hideModifyProductFormTwo">취소</button>
    </div>
    `, 'text/html').querySelector('div.content');
                                        modifyProductFormInner.querySelector(`option[value="${responseObject['type']}"]`).selected = true;
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
                                            // modifyProductFormTwo가 생길때 div.content가 생성되서 지워져야될 때 지워져야 된다.
                                            // 안그러면 div.content가 계속해서 생겨남
                                            // 지금은 modifyProductFormTwo가 생기고, 수정하기 누르지 않고 취소 눌러서 빠져나올 때의 상황
                                            modifyProductFormInner.remove();
                                            modifyProductFormTwo.hide();
                                        }

                                        // 각 라벨들 선언, add에 있던거 이름만 바꿈
                                        modifyProductFormTwo.nameLabel = new LabelObj(modifyProductFormTwo.querySelector('[rel="nameLabel"]'));
                                        modifyProductFormTwo.thumbnailLabel = new LabelObj(modifyProductFormTwo.querySelector('[rel="thumbnailLabel"]'));
                                        modifyProductFormTwo.priceLabel = new LabelObj(modifyProductFormTwo.querySelector('[rel="priceLabel"]'));
                                        modifyProductFormTwo.quantityLabel = new LabelObj(modifyProductFormTwo.querySelector('[rel="quantityLabel"]'));
                                        modifyProductFormTwo.typeLabel = new LabelObj(modifyProductFormTwo.querySelector('[rel="typeLabel"]'));

                                        modifyProductFormTwo.onsubmit = e => {
                                            e.preventDefault();
                                            // ProductRegex에 있는거 chatgpt로 자바스크립트에서 쓸 수 잇게 바꿈
                                            const nameRegex = RegExp(/^([\da-zA-Z가-힣().\- !]{1,100})$/);
                                            // add에서 해줬던 유효성 검사 다시
                                            // 사진은 검사 안한다. 불러올 때 사진은 불러와서 넣어주는게 힘듦
                                            // 대신 아무 사진도 없으면 서비스에서 원래 있던 사진으로 냅두기로 함
                                            modifyProductFormTwo.nameLabel.setValid(nameRegex.test(modifyProductFormTwo['name'].value));
                                            // 가격이랑 수량은 딱히 기준잡을 게 없어서 대충 가격으로 잡음
                                            modifyProductFormTwo.priceLabel.setValid(
                                                modifyProductFormTwo['price'].value > 0 &&
                                                modifyProductFormTwo['price'].value < 100000);
                                            modifyProductFormTwo.quantityLabel.setValid(modifyProductFormTwo['quantity'].value > 0 &&
                                                modifyProductFormTwo['quantity'].value < 10000);
                                            modifyProductFormTwo.typeLabel.setValid(modifyProductFormTwo['type'].value === 'ticket' ||
                                                modifyProductFormTwo['type'].value === 'food' ||
                                                modifyProductFormTwo['type'].value === 'coupon');

                                            // 양식 안맞을시 제출 막는 로직, 이것도 add에서 해줬었음
                                            if (!modifyProductFormTwo.nameLabel.isValid() ||
                                                !modifyProductFormTwo.thumbnailLabel.isValid() ||
                                                !modifyProductFormTwo.priceLabel.isValid() ||
                                                !modifyProductFormTwo.quantityLabel.isValid() ||
                                                !modifyProductFormTwo.typeLabel.isValid()){
                                                return;
                                            }

                                            const xhr = new XMLHttpRequest();
                                            const formData = new FormData();
                                            formData.append('index', li.querySelector('[name="index"]').value);
                                            formData.append('name', modifyProductFormTwo['name'].value);
                                            formData.append('price', modifyProductFormTwo['price'].value);
                                            formData.append('quantity', modifyProductFormTwo['quantity'].value);
                                            formData.append('_thumbnail', modifyProductFormTwo['thumbnail'].files[0]);
                                            formData.append('type', modifyProductFormTwo['type'].value);
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
                                                    failure_duplicate: ['경고', '이미 존재하는 상품 입니다. 이름이나 가격을 변경 후 시도해 주세요.'],
                                                    success: ['알림', '상품을 성공적으로 수정하였습니다.', () => {
                                                        modifyProductFormTwo.hide();
                                                        // modifyProductFormTwo가 생길때 div.content가 생성되서 지워져야될 때 지워져야 된다.
                                                        // 안그러면 div.content가 계속해서 생겨남
                                                        // 지금은 modifyProductFormTwo가 생기고, 수정하기를 눌러서 성공한 상황
                                                        modifyProductFormTwo.querySelector('div.content').remove();
                                                        // modifyProductForm.divResult.innerHTML = '';
                                                        // 성공했으면 1page로 검색
                                                        showProducts(1);
                                                    }]
                                                }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
                                                MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
                                            }
                                            xhr.open('PATCH', '/admin/product');
                                            xhr.send(formData);
                                            loading.show();
                                        }
                                    }
                                    xhr.open('GET', `/product/product?index=${li.querySelector('[name="index"]').value}`);
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
        // 페이지가 불러져와있을 때 다른 페이지를 눌렀을 때 이동하는 로직
        const pages = modifyProductForm.divResult.querySelectorAll('.page');
        pages.forEach(page => page.onclick = () => {
            showProducts(page.innerText);
        });
    }
    xhr.open('GET', `/product/search?keyword=${modifyProductForm['name'].value}&page=${page}`);
    xhr.send();
    loading.show();
}