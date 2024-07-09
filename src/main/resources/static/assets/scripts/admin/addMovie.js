addMovieForm['thumbnail'].onchange = () => {
    const thumbnailLabel = addMovieForm.querySelector('label.thumbnail');
    const imageWrapper = thumbnailLabel.querySelector(':scope > .image-wrapper');
    const empty = imageWrapper.querySelector(':scope > .empty');
    const image = imageWrapper.querySelector(':scope > .image');

    // 이미지 선택할 때 취소 누르면 아래 if문으로 빠짐
    if (addMovieForm['thumbnail'].files.length === 0){
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
    fileReader.readAsDataURL(addMovieForm['thumbnail'].files[0]);
}

addMovieForm.titleLabel = new LabelObj(addMovieForm.querySelector('[rel="titleLabel"]'));
addMovieForm.thumbnailLabel = new LabelObj(addMovieForm.querySelector('[rel="thumbnailLabel"]'));
addMovieForm.releaseDateLabel = new LabelObj(addMovieForm.querySelector('[rel="releaseDateLabel"]'));
addMovieForm.playingTimeLabel = new LabelObj(addMovieForm.querySelector('[rel="playingTimeLabel"]'));
addMovieForm.isSingleLabel = new LabelObj(addMovieForm.querySelector('[rel="isSingleLabel"]'));
addMovieForm.ageLimitLabel = new LabelObj(addMovieForm.querySelector('[rel="ageLimitLabel"]'));
addMovieForm.dimensionTypeLabel = new LabelObj(addMovieForm.querySelector('[rel="dimensionTypeLabel"]'));
addMovieForm.explanationLabel = new LabelObj(addMovieForm.querySelector('[rel="explanationLabel"]'));
addMovieForm.subExplanationLabel = new LabelObj(addMovieForm.querySelector('[rel="subExplanationLabel"]'));

// addMovieForm 제출
addMovieForm.onsubmit = e => {
    e.preventDefault();

    // 각 변수들 유효성 검사
    // 이거 tests() 노란줄은 title이라고 적어서 생기는 듯,
    // 다른거 적으면 정상으로 돌아옴
    addMovieForm.titleLabel.setValid(addMovieForm['title'].tests());
    addMovieForm.thumbnailLabel.setValid(addMovieForm['thumbnail'].files.length > 0);
    const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    addMovieForm.releaseDateLabel.setValid(regex.test(addMovieForm['releaseDate'].value))
    addMovieForm.playingTimeLabel.setValid((parseInt(addMovieForm['hour'].value) <= 3 &&
        parseInt(addMovieForm['hour'].value) >= 1) &&
        (parseInt(addMovieForm['minute'].value) < 60 &&
        parseInt(addMovieForm['minute'].value) >= 0) &&
        (parseInt(addMovieForm['second'].value) < 60 &&
        parseInt(addMovieForm['second'].value) >= 0));
    addMovieForm.isSingleLabel.setValid(addMovieForm['isSingle'].checked === true || addMovieForm['isSingle'].checked === false);
    addMovieForm.ageLimitLabel.setValid(addMovieForm['ageLimit'].value === 'all' ||
        addMovieForm['ageLimit'].value === '12' ||
        addMovieForm['ageLimit'].value === '15' ||
        addMovieForm['ageLimit'].value === '19');
    addMovieForm.dimensionTypeLabel.setValid(addMovieForm['dimensionType'].value === '2D' ||
        addMovieForm['dimensionType'].value === '3D' ||
        addMovieForm['dimensionType'].value === '4D');
    addMovieForm.explanationLabel.setValid(addMovieForm['explanation'].tests());
    addMovieForm.subExplanationLabel.setValid(addMovieForm['subExplanation'].tests());

    if (addMovieForm['thumbnail'].files.length === 0){
        MessageObj.createSimpleOk('경고', '대표 이미지를 선택해주세요.').show();
        return;
    }
    // 양식 안맞을시 제출 막는 로직
    if (!addMovieForm.titleLabel.isValid() ||
    !addMovieForm.thumbnailLabel.isValid() ||
    !addMovieForm.releaseDateLabel.isValid() ||
    !addMovieForm.playingTimeLabel.isValid() ||
    !addMovieForm.isSingleLabel.isValid() ||
    !addMovieForm.ageLimitLabel.isValid() ||
    !addMovieForm.dimensionTypeLabel.isValid() ||
    !addMovieForm.explanationLabel.isValid() ||
    !addMovieForm.subExplanationLabel.isValid()){
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('_thumbnail', addMovieForm['thumbnail'].files[0]);
    formData.append('title', addMovieForm['title'].value);
    formData.append('releaseDate', addMovieForm['releaseDate'].value);
    // 입력받은 값을 xx-xx-xx 꼴로 만든다.
    // html에 input태그의 type을 time으로 해서 받아오게 하면
    // 런던 시간으로 받아져서 이상한 값이 들어옴
    // 그래서 그냥 type을 number로 받아와서 직접 합쳤음
    formData.append('playingTime',
        addMovieForm['hour'].value.padStart(2, '0') + ':' +
        addMovieForm['minute'].value.padStart(2, '0') + ':' +
    addMovieForm['second'].value.padStart(2, '0'));
    formData.append('single', addMovieForm['isSingle'].checked);
    formData.append('ageLimit', addMovieForm['ageLimit'].value);
    formData.append('dimensionType', addMovieForm['dimensionType'].value);
    formData.append('explanation', addMovieForm['explanation'].value);
    formData.append('subExplanation', addMovieForm['subExplanation'].value);
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
            failure: ['경고', '알 수 없는 이유로 영화를 등록하지 못하였습니다. 잠시 후 다시 시도해주세요.'],
            failure_duplicate: ['경고', '이미 등록된 영화입니다.', () => addMovieForm['title'].focus()],
            success: ['알림', '영화를 성공적으로 등록하였습니다.']
        }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해주세요.'];
        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
    }
    xhr.open('POST', '/admin/movie');
    xhr.send(formData);
    loading.show();
}