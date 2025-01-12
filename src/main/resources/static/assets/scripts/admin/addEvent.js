addEventForm['thumbnail'].onchange = () => {
    const thumbnailLabel = addEventForm.querySelector('label.thumbnail');
    const imageWrapper = thumbnailLabel.querySelector(':scope > .image-wrapper');
    const empty = imageWrapper.querySelector(':scope > .empty');
    const image = imageWrapper.querySelector(':scope > .image');

    // 이미지 선택할 때 취소 누르면 아래 if문으로 빠짐
    if (addEventForm['thumbnail'].files.length === 0){
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
    fileReader.readAsDataURL(addEventForm['thumbnail'].files[0]);
}

addEventForm.titleLabel = new LabelObj(addEventForm.querySelector('[rel="titleLabel"]'));
addEventForm.thumbnailLabel = new LabelObj(addEventForm.querySelector('[rel="thumbnailLabel"]'));
addEventForm.startDateLabel = new LabelObj(addEventForm.querySelector('[rel="startDateLabel"]'));
addEventForm.endDateLabel = new LabelObj(addEventForm.querySelector('[rel="endDateLabel"]'));
addEventForm.discountRateLabel = new LabelObj(addEventForm.querySelector('[rel="discountRateLabel"]'));


// addEventForm 제출
addEventForm.onsubmit = e => {
    e.preventDefault();

    // 각 변수들 유효성 검사
    // 이거 tests() 노란줄은 title이라고 적어서 생기는 듯,
    // 다른거 적으면 정상으로 돌아옴
    addEventForm.titleLabel.setValid(addEventForm['title'].tests());
    addEventForm.thumbnailLabel.setValid(addEventForm['thumbnail'].files.length > 0);
    const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    addEventForm.startDateLabel.setValid(regex.test(addEventForm['startDate'].value))
    addEventForm.endDateLabel.setValid(regex.test(addEventForm['endDate'].value));
    addEventForm.discountRateLabel.setValid(addEventForm['discountRate'].value > 0 &&
    addEventForm['discountRate'].value < 100);

    if (addEventForm['thumbnail'].files.length === 0){
        MessageObj.createSimpleOk('경고', '대표 이미지를 선택해주세요.').show();
        return;
    }
    // 양식 안맞을시 제출 막는 로직, 아래 주석보다 이게 나은듯
    if (!addEventForm.titleLabel.isValid() ||
        !addEventForm.thumbnailLabel.isValid() ||
        !addEventForm.startDateLabel.isValid() ||
        !addEventForm.endDateLabel.isValid() ||
        !addEventForm.discountRateLabel.isValid()){
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('_thumbnail', addEventForm['thumbnail'].files[0]);
    formData.append('title', addEventForm['title'].value);
    formData.append('startDate', addEventForm['startDate'].value);
    formData.append('endDate', addEventForm['endDate'].value);
    formData.append('discountRate', addEventForm['discountRate'].value);
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
            failure: ['경고', '알 수 없는 이유로 이벤트를 등록하지 못하였습니다. 잠시 후 다시 시도해주세요.'],
            failure_duplicate: ['경고', '이미 등록된 이벤트입니다.', () => addEventForm['title'].focus()],
            success: ['알림', '이벤트를 성공적으로 등록하였습니다.']
        }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해주세요.'];
        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
    }
    xhr.open('POST', '/admin/event');
    xhr.send(formData);
    loading.show();
}