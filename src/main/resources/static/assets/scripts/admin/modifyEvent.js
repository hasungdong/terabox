modifyEventForm.divResult = modifyEventForm.querySelector('.result-box');

modifyEventForm.onsubmit = e => {
    e.preventDefault();

    modifyEventForm.titleLabel = new LabelObj(modifyEventForm.querySelector('[rel="titleLabel"]'))
    modifyEventForm.titleLabel.setValid(modifyEventForm['title'].tests());
    if (!modifyEventForm.titleLabel.isValid()) {
        return;
    }

    showEvents(1);
}


const showEvents = (page) => {
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
                const responseArray = responseObject['events'];
                modifyEventForm.divResult.innerHTML = '';
                if (responseArray.length === 0) {
                    MessageObj.createSimpleOk('알림', '수정할 이벤트가 없습니다.').show();
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
                        <span class="discount-rate">할인율<br>${responseArrayElement['discountRate']}</span>
                        <span class="start-date">시작일<br>${responseArrayElement['startDate']}</span>
                        <span class="end-date">종료일<br>${responseArrayElement['endDate']}</span>
                    </span>
                </span>
            </li>
        </ul>
            `, 'text/html').querySelector('li');
                    li.querySelector('.img').setAttribute('src', `/event/image?index=${responseArrayElement['index']}`);
                    ul.append(li);
                }

                modifyEventForm.divResult.append(ul);

                // 검색하고 밑에 페이지 나오게
                // pageContainer 만들기
                const pageContainer = new DOMParser().parseFromString(`
                 <div class="page-container"></div>
                `, 'text/html').querySelector('div');
                modifyEventForm.divResult.append(pageContainer);
                // pageContainer 내용물 만들기
                const maxPage = responseObject['search']['maxPage'];
                if (maxPage > 10) {
                    const preButton = new DOMParser().parseFromString(`
                <button type="button">
                    <img src="/assets/images/common/left.png" height="16" width="16" alt=""/>
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
                const lis = modifyEventForm.divResult.querySelectorAll('li');
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
                                    modifyEventFormTwo.show();
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
                                        // titleLabel에 있던 속성 th:attrappend="data-regex=${eventRegex.title.expression}"
                                        const modifyEventFormInner = new DOMParser().parseFromString(`
    <div class="content">
        <label class="_obj-label title" rel="titleLabel">
            <span class="__text">이벤트 제목</span>
            <input autofocus required class="_obj-input __field" type="text" name="title" maxlength="100" minlength="1" placeholder="이벤트 제목(숫자, 영어 대소문자, 완성 한글, 공백 1자 이상 100자 이하)" spellcheck="false" value="${responseObject['title']}">
            <span class="__warning">올바른 제목을 입력해 주세요.</span>
        </label>
        <label class="_obj-label thumbnail" rel="thumbnailLabel">
            <input hidden accept="image/*" name="thumbnail" type="file">
            <span class="__text">대표 이미지</span>
            <span class="image-wrapper">
                <span class="empty" style="display:none;">대표 이미지를 선택해 주세요.</span>
                <img alt="" class="image" src="/event/image?index=${responseObject['index']}" style="display:block;">
            </span>
        </label>
        <label class="_obj-label" rel="startDateLabel">
            <span class="__text">이벤트 시작일</span>
            <input class="_obj-input __field" type="date" name="startDate" value="${responseObject['startDate']}">
            <span class="__warning">올바른 날짜를 입력해 주세요.</span>
        </label>
        <label class="_obj-label" rel="endDateLabel">
            <span class="__text">이벤트 종료일</span>
            <input class="_obj-input __field" type="date" name="endDate" value="${responseObject['endDate']}">
            <span class="__warning">올바른 날짜를 입력해 주세요.</span>
        </label>
        <label class="_obj-label" rel="discountRateLabel">
            <span class="__text">가격 할인율</span>
            <input class="_obj-input __field" type="number" name="discountRate" placeholder="(%)" value="${responseObject['discountRate']}">
            <span class="__warning">올바른 값을 입력해 주세요.</span>
        </label>
        <div class="spring"></div>
        <button type="submit">수정하기</button>
        <button type="button" rel="hideModifyEventFormTwo">취소</button>
    </div>
    `, 'text/html').querySelector('div.content');
                                        modifyEventFormTwo.append(modifyEventFormInner);
                                        modifyEventFormTwo['thumbnail'].onchange = () => {
                                            const thumbnailLabel = modifyEventFormTwo.querySelector('label.thumbnail');
                                            const imageWrapper = thumbnailLabel.querySelector(':scope > .image-wrapper');
                                            const empty = imageWrapper.querySelector(':scope > .empty');
                                            const image = imageWrapper.querySelector(':scope > .image');

                                            // 이미지 선택할 때 취소 누르면 아래 if문으로 빠짐
                                            if (modifyEventFormTwo['thumbnail'].files.length === 0){
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
                                            fileReader.readAsDataURL(modifyEventFormTwo['thumbnail'].files[0]);
                                        }
                                        modifyEventFormInner.querySelector('[rel="hideModifyEventFormTwo"]').onclick = () => {
                                            modifyEventFormInner.remove();
                                            modifyEventFormTwo.hide();
                                        }

                                        // 각 라벨들 선언, add에 있던거 이름만 바꿈
                                        modifyEventFormTwo.titleLabel = new LabelObj(modifyEventFormTwo.querySelector('[rel="titleLabel"]'));
                                        modifyEventFormTwo.thumbnailLabel = new LabelObj(modifyEventFormTwo.querySelector('[rel="thumbnailLabel"]'));
                                        modifyEventFormTwo.startDateLabel = new LabelObj(modifyEventFormTwo.querySelector('[rel="startDateLabel"]'));
                                        modifyEventFormTwo.endDateLabel = new LabelObj(modifyEventFormTwo.querySelector('[rel="endDateLabel"]'));
                                        modifyEventFormTwo.discountRateLabel = new LabelObj(modifyEventFormTwo.querySelector('[rel="discountRateLabel"]'));

                                        modifyEventFormTwo.onsubmit = e => {
                                            e.preventDefault();
                                            // EventRegex에 있는거 chatgpt로 자바스크립트에서 쓸 수 잇게 바꿈
                                            const titleRegex = RegExp(/^([\da-zA-Z가-힣().\- !]{1,100})$/);

                                            // add에서 해줬던 유효성 검사 다시
                                            // 사진은 검사 안한다. 불러올 때 사진은 불러와서 넣어주는게 힘듦
                                            // 대신 아무 사진도 없으면 서비스에서 원래 있던 사진으로 냅두기로 함
                                            modifyEventFormTwo.titleLabel.setValid(titleRegex.test(modifyEventFormTwo['title'].value));
                                            const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
                                            modifyEventFormTwo.startDateLabel.setValid(regex.test(modifyEventFormTwo['startDate'].value))
                                            modifyEventFormTwo.endDateLabel.setValid(regex.test(modifyEventFormTwo['endDate'].value));
                                            modifyEventFormTwo.discountRateLabel.setValid(modifyEventFormTwo['discountRate'].value > 0 &&
                                                modifyEventFormTwo['discountRate'].value < 100);
                                            // 양식 안맞을시 제출 막는 로직, 아래 주석보다 이게 나은듯
                                            if (!modifyEventFormTwo.titleLabel.isValid() ||
                                                !modifyEventFormTwo.thumbnailLabel.isValid() ||
                                                !modifyEventFormTwo.startDateLabel.isValid() ||
                                                !modifyEventFormTwo.endDateLabel.isValid() ||
                                                !modifyEventFormTwo.discountRateLabel.isValid()){
                                                return;
                                            }

                                            const xhr = new XMLHttpRequest();
                                            const formData = new FormData();
                                            formData.append('index', li.querySelector('[name="index"]').value);
                                            formData.append('_thumbnail', modifyEventFormTwo['thumbnail'].files[0]);
                                            formData.append('title', modifyEventFormTwo['title'].value);
                                            formData.append('startDate', modifyEventFormTwo['startDate'].value);
                                            formData.append('endDate', modifyEventFormTwo['endDate'].value);
                                            formData.append('discountRate', modifyEventFormTwo['discountRate'].value);
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
                                                    failure_duplicate: ['경고', '이미 존재하는 이벤트 입니다. 제목이나 시작일을 변경 후 시도해 주세요.'],
                                                    success: ['알림', '이벤트를 성공적으로 수정하였습니다.', () => {
                                                        modifyEventFormTwo.hide();
                                                        // modifyMovieFormTwo가 생길때 div.content가 생성되서 지워져야될 때 지워져야 된다.
                                                        // 안그러면 div.content가 계속해서 생겨남
                                                        // 지금은 modifyMovieFormTwo가 생기고, 수정하기를 눌러서 성공한 상황
                                                        modifyEventFormTwo.querySelector('div.content').remove();
                                                        // modifyEventForm.divResult.innerHTML = '';
                                                        // 성공했으면 1page로 검색
                                                        showEvents(1);
                                                    }]
                                                }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
                                                MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
                                            }
                                            xhr.open('PATCH', '/admin/event');
                                            xhr.send(formData);
                                            loading.show();
                                        }
                                    }
                                    xhr.open('GET', `/event/event?index=${li.querySelector('[name="index"]').value}`);
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
        const pages = modifyEventForm.divResult.querySelectorAll('.page');
        pages.forEach(page => page.onclick = () => {
            showEvents(page.innerText);
        });
    }
    xhr.open('GET', `/event/search?keyword=${modifyEventForm['title'].value}&page=${page}`);
    xhr.send();
    loading.show();
}