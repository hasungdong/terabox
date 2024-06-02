addProductForm['thumbnail'].onchange = () => {
    const thumbnailLabel = addProductForm.querySelector('label.thumbnail');
    const imageWrapper = thumbnailLabel.querySelector(':scope > .image-wrapper');
    const empty = imageWrapper.querySelector(':scope > .empty');
    const image = imageWrapper.querySelector(':scope > .image');

    // 이미지 선택할 때 취소 누르면 아래 if문으로 빠짐
    if (addProductForm['thumbnail'].files.length === 0){
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
    fileReader.readAsDataURL(addProductForm['thumbnail'].files[0]);
}

addProductForm.nameLabel = new LabelObj(addProductForm.querySelector('[rel="nameLabel"]'));
addProductForm.thumbnailLabel = new LabelObj(addProductForm.querySelector('[rel="thumbnailLabel"]'));
addProductForm.priceLabel = new LabelObj(addProductForm.querySelector('[rel="priceLabel"]'));
addProductForm.quantityLabel = new LabelObj(addProductForm.querySelector('[rel="quantityLabel"]'));

// 제출할 때
addProductForm.onsubmit = e => {
    e.preventDefault();

    addProductForm.nameLabel.setValid(addProductForm['name'].tests());
    addProductForm.thumbnailLabel.setValid(addProductForm['thumbnail'].files.length > 0);
    // 가격이랑 수량은 딱히 기준잡을 게 없어서 대충 가격으로 잡음
    addProductForm.priceLabel.setValid(
        addProductForm['price'].value > 0 &&
        addProductForm['price'].value < 100000);
    addProductForm.quantityLabel.setValid(addProductForm['quantity'].value > 0 &&
        addProductForm['quantity'].value < 10000);

    if (addProductForm['thumbnail'].files.length === 0){
        MessageObj.createSimpleOk('경고', '대표 이미지를 선택해주세요.').show();
        return;
    }

    if (!addProductForm.nameLabel.isValid() ||
    !addProductForm.thumbnailLabel.isValid() ||
    !addProductForm.priceLabel.isValid() ||
    !addProductForm.quantityLabel.isValid()){
        return;
    }

    // // __warning 문구 중에 하나라도 보이고 있는게 있으면 제출을 막겠다.
    // const warnings = document.querySelectorAll('.__warning');
    // console.log(warnings);
    // if (warnings.some(warning => warning.style.maxHeight === '2rem')){
    //     // 여기서 알림같은거 안해줘도 화면에 warning 뜬 부분 빨간 표시 때문에 사용자가 알아먹을 수 있음
    //     return;
    // }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('name', addProductForm['name'].value);
    formData.append('price', addProductForm['price'].value);
    formData.append('quantity', addProductForm['quantity'].value);
    formData.append('_thumbnail', addProductForm['thumbnail'].files[0]);
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
        const [dTitle, dContent, dOnclick] = {
            failure: ['경고', '알 수 없는 이유로 상품을 등록하지 못하였습니다. 잠시 후 다시 시도해 주세요.'],
            failure_duplicate: ['경고', '이미 등록된 상품입니다.', () => addProductForm['name'].focus()],
            success: ['알림', '상품을 성공적으로 등록하였습니다.']
        }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해주세요.'];
        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
    }
    xhr.open('POST', '/admin/product');
    xhr.send(formData);
    loading.show();
}