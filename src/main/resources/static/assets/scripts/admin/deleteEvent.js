deleteEventForm.divResult = deleteEventForm.querySelector('.result-box');

deleteEventForm.onsubmit = e => {
    e.preventDefault();

    deleteEventForm.titleLabel = new LabelObj(deleteEventForm.querySelector('[rel="titleLabel"]'));
    deleteEventForm.titleLabel.setValid(deleteEventForm['title'].tests());
    if (!deleteEventForm.titleLabel.isValid()){
        return;
    }
    showEventsDelete(1);
}


const showEventsDelete = (page) => {
    // 제목에 맞는 이벤트 검색해오는 xhr 요청
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
                const responseArray = responseObject['events'];
                deleteEventForm.divResult.innerHTML = '';
                if (responseArray.length === 0){
                    MessageObj.createSimpleOk('알림', '삭제할 이벤트가 없습니다.').show();
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
                deleteEventForm.divResult.append(ul);

                // 검색하고 밑에 페이지 나오게
                // pageContainer 만들기
                const pageContainer = new DOMParser().parseFromString(`
                 <div class="page-container"></div>
                `, 'text/html').querySelector('div');
                deleteEventForm.divResult.append(pageContainer);
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

                const lis = deleteEventForm.divResult.querySelectorAll('li');
                lis.forEach(li => li.onclick = () => {
                    new MessageObj({
                        title: '경고',
                        content: '이 이벤트를 삭제하시겠습니까?',
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
                                            failure: ['경고', '알 수 없는 이유로 이벤트를 삭제하지 못하였습니다. 잠시 후 다시 시도해 주세요.'],
                                            success: ['알림', '이벤트를 성공적으로 삭제하였습니다.', () => {
                                                // 성공했으면 1page로 검색
                                                showEventsDelete(1);
                                            }]
                                        }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
                                        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
                                    }
                                    xhr.open('DELETE', '/admin/event');
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
        // 페이지가 불러져와있을 때 다른 페이지를 눌렀을 때 이동하는 로직
        const pages = deleteEventForm.divResult.querySelectorAll('.page');
        pages.forEach(page => page.onclick = () => {
            showMoviesDelete(page.innerText);
        });
    }
    xhr.open('GET', `/event/search?keyword=${deleteEventForm['title'].value}&page=${page}`);
    xhr.send();
    loading.show();
}

