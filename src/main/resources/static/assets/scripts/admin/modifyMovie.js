modifyMovieForm.divResult = modifyMovieForm.querySelector('.result-box');

modifyMovieForm.onsubmit = e => {
    e.preventDefault();

    modifyMovieForm.titleLabel = new LabelObj(modifyMovieForm.querySelector('[rel="titleLabel"]'));
    modifyMovieForm.titleLabel.setValid(modifyMovieForm['title'].tests());
    if (!modifyMovieForm.titleLabel.isValid()) {
        return;
    }
    // 제목에 맞는 영화 검색하는 xhr 요청
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
                const responseArray = responseObject['movies'];
                modifyMovieForm.divResult.innerHTML = '';
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
                    <span class="text">${responseArrayElement['title']}</span>
                    <span class="spring"></span>
                    <span class="info">
                        <span class="playing-time">플레이타임<br> ${responseArrayElement['playingTime']}</span>
                        <span class="reservation-rate">평점<br> ${responseArrayElement['grade']}</span>
                        <span class="release-date">개봉일<br> ${responseArrayElement['releaseDate']}</span>
                    </span>
                </span>
            </li>
        </ul>
            `, 'text/html').querySelector('li');
                    li.querySelector('.img').setAttribute('src', `/movie/image?index=${responseArrayElement['index']}`);
                    ul.append(li);
                }

                modifyMovieForm.divResult.append(ul);
                const lis = modifyMovieForm.divResult.querySelectorAll('li');
                lis.forEach(li => li.onclick = () => {
                    new MessageObj({
                        title: '경고',
                        content: '이 영화를 수정하시겠습니까?',
                        buttons: [
                            {
                                text: '취소', onclick: instance => {
                                    instance.hide();
                                }
                            },
                            {
                                text: '확인', onclick: instance => {
                                    instance.hide();
                                    modifyMovieFormTwo.show();
                                    // 선택한 영화에 대한 수정 화면으로 이동하고,
                                    // 이미 들어가있는 값들 불러오는 xhr 요청
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
                                        const modifyMovieFormInner = new DOMParser().parseFromString(`
    <div class="content">
        <label class="_obj-label title" rel="titleLabel">
            <span class="__text">영화 제목</span>
            <input autofocus required class="_obj-input __field" type="text" name="title" maxlength="100" minlength="1" placeholder="영화 제목(숫자, 영어 대소문자, 완성 한글, 공백 1자 이상 100자 이하)" spellcheck="false" value="${responseObject['title']}">
            <span class="__warning">올바른 제목을 입력해 주세요.</span>
        </label>
        <label class="_obj-label thumbnail" rel="thumbnailLabel">
            <input hidden accept="image/*" name="thumbnail" type="file">
            <span class="__text">대표 이미지</span>
            <span class="image-wrapper">
                <span class="empty" style="display:none;">대표 이미지를 선택해 주세요.</span>
                <img alt="" class="image" src="/movie/image?index=${responseObject['index']}" style="display:block;">
            </span>
        </label>
        <label class="_obj-label" rel="releaseDateLabel">
            <span class="__text">영화 개봉일</span>
            <input class="_obj-input __field" type="date" name="releaseDate" spellcheck="false" value="${responseObject['releaseDate']}">
            <span class="__warning">올바른 날짜를 입력해 주세요.</span>
        </label>
        <label class="_obj-label" rel="playingTimeLabel">
            <span class="__text">영화 러닝타임</span>
            <span>
                <input class="_obj-input __field" type="number" name="hour" placeholder="시간" spellcheck="false" value="${responseObject['playingTime'].toString().substring(0, 2)}">
                <input class="_obj-input __field" type="number" name="minute" placeholder="분" spellcheck="false" value="${responseObject['playingTime'].toString().substring(3, 5)}">
                <input class="_obj-input __field" type="number" name="second" placeholder="초" spellcheck="false" value="${responseObject['playingTime'].toString().substring(6, 8)}">
                <span class="text">영화 길이는 1 ~ 2시간 사이입니다.</span>
            </span>
            <span class="__warning">올바른 시간을 입력해 주세요.</span>
        </label>
        <label class="_obj-label" rel="isSingleLabel">
            <span class="__text">영화 단독 개봉 여부</span>
            <input class="_obj-input __field" type="checkbox" name="isSingle">
            <span class="__warning">올바른 값을 입력해 주세요.</span>
        </label>
        <label class="_obj-label" rel="ageLimitLabel">
            <span class="__text">영화 연령제한</span>
            <select class="_obj-input __field" name="ageLimit">
                <option disabled hidden selected value="-1">분류 선택</option>
                <option value="all">전체 이용가(기본)</option>
                <option value="12">12세 이용가</option>
                <option value="15">15세 이용가</option>
                <option value="18">18세 이용가</option>
            </select>
            <span class="__warning">연령제한을 선택해 주세요.</span>
        </label>
        <label class="_obj-label" rel="dimensionTypeLabel">
            <span class="__text">영화 특수효과</span>
            <select class="_obj-input __field" name="dimensionType">
                <option disabled hidden selected value="-1">효과 선택</option>
                <option value="2D" selected>2D(기본)</option>
                <option value="3D">3D</option>
                <option value="4D">4D</option>
            </select>
            <span class="__warning">효과를 선택해 주세요.</span>
        </label>
        <label class="_obj-label" rel="priceLabel">
            <span class="__text">영화 가격</span>
            <input class="_obj-input __field" type="number" name="price" value="${responseObject['price']}">
            <span class="__warning">올바른 값을 입력해 주세요.</span>
        </label>
        <div class="spring"></div>
        <button type="submit">수정하기</button>
        <button type="button" rel="hideModifyMovieFormTwo">취소</button>
    </div>`, 'text/html').querySelector('div.content');
                                        // 이거 boolean들 is 떼야됨
                                        if (responseObject['single'] === true){
                                            modifyMovieFormInner.querySelector('[name="isSingle"]').checked = true;
                                        }
                                        modifyMovieFormInner.querySelector(`option[value="${responseObject['ageLimit']}"]`).selected = true;
                                        modifyMovieFormInner.querySelector(`option[value="${responseObject['dimensionType']}"]`).selected = true;
                                        modifyMovieFormTwo.append(modifyMovieFormInner);
                                        modifyMovieFormTwo['thumbnail'].onchange = () => {
                                            const thumbnailLabel = modifyMovieFormTwo.querySelector('label.thumbnail');
                                            const imageWrapper = thumbnailLabel.querySelector(':scope > .image-wrapper');
                                            const empty = imageWrapper.querySelector(':scope > .empty');
                                            const image = imageWrapper.querySelector(':scope > .image');

                                            // 이미지 선택할 때 취소 누르면 아래 if문으로 빠짐
                                            if (modifyMovieFormTwo['thumbnail'].files.length === 0){
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
                                            fileReader.readAsDataURL(modifyMovieFormTwo['thumbnail'].files[0]);
                                        }
                                        //
                                        modifyMovieFormInner.querySelector('[rel="hideModifyMovieFormTwo"]').onclick = () => {
                                            // modifyMovieFormTwo가 생길때 div.content가 생성되서 지워져야될 때 지워져야 된다.
                                            // 안그러면 div.content가 계속해서 생겨남
                                            // 지금은 modifyMovieFormTwo가 생기고, 수정하기 누르지 않고 취소 눌러서 빠져나올 때의 상황
                                            modifyMovieFormInner.remove();
                                            modifyMovieFormTwo.hide();
                                        }

                                        // 각 라벨들 선언, 이것도 add에 있음
                                        modifyMovieFormTwo.titleLabel = new LabelObj(modifyMovieFormTwo.querySelector('[rel="titleLabel"]'));
                                        modifyMovieFormTwo.thumbnailLabel = new LabelObj(modifyMovieFormTwo.querySelector('[rel="thumbnailLabel"]'));
                                        modifyMovieFormTwo.releaseDateLabel = new LabelObj(modifyMovieFormTwo.querySelector('[rel="releaseDateLabel"]'));
                                        modifyMovieFormTwo.playingTimeLabel = new LabelObj(modifyMovieFormTwo.querySelector('[rel="playingTimeLabel"]'));
                                        modifyMovieFormTwo.isSingleLabel = new LabelObj(modifyMovieFormTwo.querySelector('[rel="isSingleLabel"]'));
                                        modifyMovieFormTwo.ageLimitLabel = new LabelObj(modifyMovieFormTwo.querySelector('[rel="ageLimitLabel"]'));
                                        modifyMovieFormTwo.dimensionTypeLabel = new LabelObj(modifyMovieFormTwo.querySelector('[rel="dimensionTypeLabel"]'));
                                        modifyMovieFormTwo.priceLabel = new LabelObj(modifyMovieFormTwo.querySelector('[rel="priceLabel"]'));


                                        modifyMovieFormTwo.onsubmit = e => {
                                            e.preventDefault();
                                            // MovieRegex에 있는거 chatgpt로 자바스크립트에서 쓸 수 잇게 바꿈
                                            const movieRegex = RegExp(/^([\da-zA-Z가-힣().\- !]{1,100})$/);
                                            // add에서 해줬던 유효성 검사 다시
                                            // 사진은 검사 안한다. 불러올 때 사진은 불러와서 넣어주는게 힘듦
                                            // 대신 아무 사진도 없으면 서비스에서 원래 있던 사진으로 냅두기로 함
                                            modifyMovieFormTwo.titleLabel.setValid(movieRegex.test(modifyMovieFormTwo['title'].value));
                                            const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
                                            modifyMovieFormTwo.releaseDateLabel.setValid(regex.test(modifyMovieFormTwo['releaseDate'].value))
                                            modifyMovieFormTwo.playingTimeLabel.setValid((parseInt(modifyMovieFormTwo['hour'].value) <= 2 &&
                                                    parseInt(modifyMovieFormTwo['hour'].value) >= 1) &&
                                                (parseInt(modifyMovieFormTwo['minute'].value) < 60 &&
                                                    parseInt(modifyMovieFormTwo['minute'].value) >= 0) &&
                                                (parseInt(modifyMovieFormTwo['second'].value) < 60 &&
                                                    parseInt(modifyMovieFormTwo['second'].value) >= 0));
                                            modifyMovieFormTwo.isSingleLabel.setValid(modifyMovieFormTwo.querySelector('[name="isSingle"]').checked === true
                                                || modifyMovieFormTwo.querySelector('[name="isSingle"]').checked === false);
                                            modifyMovieFormTwo.ageLimitLabel.setValid(modifyMovieFormTwo['ageLimit'].value === 'all' ||
                                                modifyMovieFormTwo['ageLimit'].value === '12' ||
                                                modifyMovieFormTwo['ageLimit'].value === '15' ||
                                                modifyMovieFormTwo['ageLimit'].value === '18');
                                            modifyMovieFormTwo.dimensionTypeLabel.setValid(modifyMovieFormTwo['dimensionType'].value === '2D' ||
                                                modifyMovieFormTwo['dimensionType'].value === '3D' ||
                                                modifyMovieFormTwo['dimensionType'].value === '4D');
                                            modifyMovieFormTwo.priceLabel.setValid(modifyMovieFormTwo['price'].value > 0);
                                            // 양식 안맞을시 제출 막는 로직, 이것도 add에서 해줬었음
                                            if (!modifyMovieFormTwo.titleLabel.isValid() ||
                                                !modifyMovieFormTwo.releaseDateLabel.isValid() ||
                                                !modifyMovieFormTwo.playingTimeLabel.isValid() ||
                                                !modifyMovieFormTwo.isSingleLabel.isValid() ||
                                                !modifyMovieFormTwo.ageLimitLabel.isValid() ||
                                                !modifyMovieFormTwo.dimensionTypeLabel.isValid() ||
                                                !modifyMovieFormTwo.priceLabel.isValid()){
                                                return;
                                            }
                                            // 수정할 값들을 받아서 실제로 수정하는 xhr 요청
                                            const xhr = new XMLHttpRequest();
                                            const formData = new FormData();
                                            formData.append('index', li.querySelector('[name="index"]').value);
                                            formData.append('_thumbnail', modifyMovieFormTwo['thumbnail'].files[0]);
                                            formData.append('title', modifyMovieFormTwo['title'].value);
                                            formData.append('releaseDate', modifyMovieFormTwo['releaseDate'].value);
                                            formData.append('playingTime',
                                                modifyMovieFormTwo['hour'].value.padStart(2, '0') + ':' +
                                                modifyMovieFormTwo['minute'].value.padStart(2, '0') + ':' +
                                                modifyMovieFormTwo['second'].value.padStart(2, '0'));
                                            formData.append('isSingle', modifyMovieFormTwo['isSingle'].value);
                                            formData.append('ageLimit', modifyMovieFormTwo['ageLimit'].value);
                                            formData.append('dimensionType', modifyMovieFormTwo['dimensionType'].value);
                                            formData.append('price', modifyMovieFormTwo['price'].value);
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
                                                    failure: ['경고', '알 수 없는 이유로 영화를 수정하지 못하였습니다. 잠시 후 다시 시도해 주세요.'],
                                                    success: ['알림', '영화를 성공적으로 수정하였습니다.', () => {
                                                        modifyMovieFormTwo.hide();
                                                        // modifyMovieFormTwo가 생길때 div.content가 생성되서 지워져야될 때 지워져야 된다.
                                                        // 안그러면 div.content가 계속해서 생겨남
                                                        // 지금은 modifyMovieFormTwo가 생기고, 수정하기를 눌러서 성공한 상황
                                                        modifyMovieFormTwo.querySelector('div.content').remove();
                                                        modifyMovieForm.divResult.innerHTML = '';
                                                    }]
                                                }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
                                                MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
                                            }
                                            xhr.open('PATCH', '/admin/movie');
                                            xhr.send(formData);
                                            loading.show();
                                        }
                                    }
                                    xhr.open('GET', `/movie/movie?index=${li.querySelector('[name="index"]').value}`);
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
    xhr.open('GET', `/movie/search?keyword=${modifyMovieForm['title'].value}`);
    xhr.send();
    loading.show();
}