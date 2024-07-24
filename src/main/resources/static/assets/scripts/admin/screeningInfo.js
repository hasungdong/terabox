// 서치바 하나하나 입력할 때 나올 값들
const screeningInfoSearchBar = modifyScreeningInfoForm.querySelector('form.search-bar');
screeningInfoSearchBar.querySelector('[name="screeningDate"]').oninput = () => {
    const todayAfterOneMonth = new Date();
    todayAfterOneMonth.setMonth(todayAfterOneMonth.getMonth() + 1);
    if (new Date(screeningInfoSearchBar['screeningDate'].value) > todayAfterOneMonth){
        MessageObj.createSimpleOk('알림', '검색일로부터 1달 이후까지의 상영정보만 검색할 수 있습니다.').show();
        if (screeningInfoSearchBar.querySelector('[rel="regionCodeLabel"]') !== null){
            screeningInfoSearchBar.querySelector('[rel="regionCodeLabel"]').remove();
        }
        if (screeningInfoSearchBar.querySelector('[rel="theaterSearchNameLabel"]') !== null){
            screeningInfoSearchBar.querySelector('[rel="theaterSearchNameLabel"]').remove();
        }
        if (screeningInfoSearchBar.querySelector('[rel="cinemaNumberLabel"]') !== null){
            screeningInfoSearchBar.querySelector('[rel="cinemaNumberLabel"]').remove();
        }
        if (screeningInfoSearchBar.querySelector('button[type="submit"]') !== null){
            screeningInfoSearchBar.querySelector('button[type="submit"]').remove()
        }
        return;
    }
    // 검색일로부터 1달까지의 상영정보만 만들어놓을 거임
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300){
            MessageObj.createSimpleOk('알림', '요청을 전송하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
            return;
        }
        if (screeningInfoSearchBar.querySelector('[rel="regionCodeLabel"]') !== null){
            screeningInfoSearchBar.querySelector('[rel="regionCodeLabel"]').remove();
        }
        if (screeningInfoSearchBar.querySelector('[rel="theaterSearchNameLabel"]') !== null){
            screeningInfoSearchBar.querySelector('[rel="theaterSearchNameLabel"]').remove();
        }
        if (screeningInfoSearchBar.querySelector('[rel="cinemaNumberLabel"]') !== null){
            screeningInfoSearchBar.querySelector('[rel="cinemaNumberLabel"]').remove();
        }
        if (screeningInfoSearchBar.querySelector('button[type="submit"]') !== null){
            screeningInfoSearchBar.querySelector('button[type="submit"]').remove()
        }
        const responseObject = JSON.parse(xhr.responseText);
        const regions = responseObject['regions'];
        const regionCodeLabel = new DOMParser().parseFromString(`
    <label class="_obj-label" rel="regionCodeLabel">
            <span class="__text">지역</span>
            <select class="_obj-input __field" name="regionCode">
                <option disabled hidden selected value="-1">지역 선택</option>
            </select>
            <span class="__warning">올바른 지역명 입력해 주세요.</span>
        </label>
    `, 'text/html').querySelector('label');
        screeningInfoSearchBar.append(regionCodeLabel);
        for (const region of regions) {
            const option = new DOMParser().parseFromString(`
                <option value="${region['code']}">${region['text']}</option>
            `, 'text/html').querySelector('option');
            regionCodeLabel.querySelector('select[name="regionCode"]').append(option);
        }
        // 지역 라벨 변했을 때
        screeningInfoSearchBar.querySelector('[name="regionCode"]').onchange = () => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if (xhr.readyState !== XMLHttpRequest.DONE){
                    return;
                }
                if (xhr.status < 200 || xhr.status >= 300){
                    MessageObj.createSimpleOk('알림', '요청을 전송하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
                    return;
                }
                // 선택이 새로 되면 기존 값을 지워야 하니까 없애줌
                if (screeningInfoSearchBar.querySelector('[rel="theaterSearchNameLabel"]') !== null){
                    screeningInfoSearchBar.querySelector('[rel="theaterSearchNameLabel"]').remove();
                }
                if (screeningInfoSearchBar.querySelector('[rel="cinemaNumberLabel"]') !== null){
                    screeningInfoSearchBar.querySelector('[rel="cinemaNumberLabel"]').remove();
                }
                if (screeningInfoSearchBar.querySelector('button[type="submit"]') !== null){
                    screeningInfoSearchBar.querySelector('button[type="submit"]').remove()
                }
                const responseObject = JSON.parse(xhr.responseText);
                const theaters = responseObject['theaters'];
                const theaterNameLabel = new DOMParser().parseFromString(`
    <label class="_obj-label" rel="theaterSearchNameLabel">
            <span class="__text">상영 극장</span>
            <select class="_obj-input __field" name="theaterName">
                <option disabled hidden selected value="-1">극장 선택</option>
            </select>
            <span class="__warning">올바른 극장을 입력해 주세요.</span>
        </label>
    `, 'text/html').querySelector('label');
                screeningInfoSearchBar.append(theaterNameLabel);
                for (const theater of theaters) {
                    const option = new DOMParser().parseFromString(`
                    <option value="${theater['index']}">${theater['name']}</option>
                `, 'text/html').querySelector('option');
                    theaterNameLabel.querySelector('select[name="theaterName"]').append(option);
                }
                // 극장 라벨 변할 때
                screeningInfoSearchBar.querySelector('[name="theaterName"]').onchange = () => {
                    const xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function(){
                        if (xhr.readyState !== XMLHttpRequest.DONE){
                            return;
                        }
                        if (xhr.status < 200 || xhr.status >= 300){
                            MessageObj.createSimpleOk('알림', '요청을 전송하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
                            return;
                        }
                        if (screeningInfoSearchBar.querySelector('[rel="cinemaNumberLabel"]') !== null){
                            screeningInfoSearchBar.querySelector('[rel="cinemaNumberLabel"]').remove();
                        }
                        if (screeningInfoSearchBar.querySelector('button[type="submit"]') !== null){
                            screeningInfoSearchBar.querySelector('button[type="submit"]').remove()
                        }
                        const responseObject = JSON.parse(xhr.responseText);
                        const cinemas = responseObject['cinemas'];
                        const cinemaNumberLabel = new DOMParser().parseFromString(`
            <label class="_obj-label" rel="cinemaNumberLabel">
            <span class="__text">관</span>
            <select class="_obj-input __field" name="cinemaNumber">
                <option disabled hidden selected value="-1">관 선택</option>
            </select>
            <span class="__warning">올바른 극장을 입력해 주세요.</span>
        </label>
            `, 'text/html').querySelector('label');
                        screeningInfoSearchBar.append(cinemaNumberLabel);
                        for (const cinema of cinemas) {
                            const option = new DOMParser().parseFromString(`
                <option value="${cinema['index']}">${cinema['number']}</option>
                `, 'text/html').querySelector('option');
                            cinemaNumberLabel.querySelector('select[name="cinemaNumber"]').append(option);
                        }
                        // 버튼 추가
                        screeningInfoSearchBar.querySelector('[name="cinemaNumber"]').onchange = () => {
                            const submitButton = new DOMParser().parseFromString(`
        <button type="submit" class="search-button">
            <img src="/assets/images/common/search.png" alt="">
        </button>
                `, 'text/html').querySelector('[type="submit"]');
                            screeningInfoSearchBar.append(submitButton);
                        }
                    }
                    xhr.open('GET', `/cinema/?theaterIndex=${theaterNameLabel.querySelector('select[name="theaterName"]').options[theaterNameLabel.querySelector('select[name="theaterName"]').selectedIndex].value}`);
                    xhr.send();
                }
            }
            xhr.open('GET', `/theater/?regionCode=${regionCodeLabel.querySelector('select[name="regionCode"]').options[regionCodeLabel.querySelector('select[name="regionCode"]').selectedIndex].value}`);
            xhr.send();
        }
    }
    xhr.open('GET', '/region/');
    xhr.send();
}








// 서치바 다 입력하고 검색 눌렀을 때
modifyScreeningInfoForm.divContent = modifyScreeningInfoForm.querySelector('div.content');

screeningInfoSearchBar.onsubmit = e => {
    e.preventDefault();

    screeningInfoSearchBar.screeningDateLabel = new LabelObj(screeningInfoSearchBar.querySelector('[rel="screeningDateLabel"]'));
    screeningInfoSearchBar.regionCodeLabel = new LabelObj(screeningInfoSearchBar.querySelector('[rel="regionCodeLabel"]'));
    screeningInfoSearchBar.theaterSearchNameLabel = new LabelObj(screeningInfoSearchBar.querySelector('[rel="theaterSearchNameLabel"]'));
    screeningInfoSearchBar.cinemaNumberLabel = new LabelObj(screeningInfoSearchBar.querySelector('[rel="cinemaNumberLabel"]'));

    // 날짜 정규식이 맞으면서 오늘로부터 1달 뒤까지의 일정만 알 수 있다.
    const dateRegex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    screeningInfoSearchBar.screeningDateLabel.setValid(dateRegex.test(screeningInfoSearchBar['screeningDate'].value) && new Date(screeningInfoSearchBar['screeningDate'].value) < (new Date().setMonth(new Date().getMonth() + 1)));
    screeningInfoSearchBar.cinemaNumberLabel.setValid(screeningInfoSearchBar['cinemaNumber'].value > 0);
    const regionCodeRegex = RegExp(/^([\[\]\da-zA-Z가-힣().,…?!·<>"“”'’\s\n-]{1,100})$/);
    screeningInfoSearchBar.regionCodeLabel.setValid(regionCodeRegex.test(screeningInfoSearchBar['regionCode'].value))
    // const theaterNameRegex = RegExp(/^([a-zA-Z가-힣().\- !]{1,100})$/);
    // 숫자라 0 이상인지만 체크
    screeningInfoSearchBar.theaterSearchNameLabel.setValid(screeningInfoSearchBar['theaterName'].value > 0);

    if (!screeningInfoSearchBar.screeningDateLabel.isValid() ||
        !screeningInfoSearchBar.cinemaNumberLabel.isValid() ||
        !screeningInfoSearchBar.regionCodeLabel.isValid() ||
        !screeningInfoSearchBar.theaterSearchNameLabel.isValid()) {
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        loading.hide();
        if (xhr.status < 200 || xhr.status >= 300) {
            return;
        }
        modifyScreeningInfoForm.querySelector('div.content').querySelector('.result-box').innerHTML = '';
        const ul = new DOMParser().parseFromString(`
            <ul></ul>
        `, 'text/html').querySelector('ul');
        const responseObject = JSON.parse(xhr.responseText);
        const screeningInfoVos = responseObject['screeningInfoVos'];
        for (const screeningInfoVo of screeningInfoVos) {
            const li = new DOMParser().parseFromString(`
        <ul>
            <li>
<!--            아래 2개 input이 입력값-->
                <input type="hidden" name="index" value="${screeningInfoVo['index']}">
                <input type="hidden" name="movieIndex" value="${screeningInfoVo['movieIndex'] === undefined ? -1 : screeningInfoVo['movieIndex']}">
<!--                이 아래부턴 그냥 보여주기 용도라 실제 사용되지는 않는다.-->
<!-- 입력해줄거 아닌데 굳이 input태그 사용한건 css 새로 만들기 귀찮아서...-->
                <label class="_obj-label" rel="screeningDateLabel">
                    <input class="_obj-input __field" type="text" name="screeningDate" spellcheck="false" value="${screeningInfoVo['screeningDate']}" disabled>
                </label>
                <label class="_obj-label" rel="theaterNameLabel">
                    <input class="_obj-input __field" type="text" name="theaterName" spellcheck="false" disabled value="${screeningInfoVo['regionText']} ${screeningInfoVo['theaterName']}">
                </label>
                <label class="_obj-label" rel="cinemaLabel">
                    <input class="_obj-input __field" type="text" name="cinema" spellcheck="false" disabled value="${screeningInfoVo['cinemaNumber']}관">
                </label>
                <label class="_obj-label" rel="screeningTimeLabel">
                    <input class="_obj-input __field" type="text" name="screeningTime" spellcheck="false" disabled value="${screeningInfoVo['screeningTime']}">
                </label>
                <label class="_obj-label" rel="titleLabel">
                    <input class="_obj-input __field" type="text" name="title" spellcheck="false" disabled value="${screeningInfoVo['movieTitle'] === undefined ? "배정된 영화가 없습니다." : screeningInfoVo['movieTitle']}">
                    <button type="button" class="search-button" rel="showSearchMovie">
                        <img src="/assets/images/common/search.png" alt="">
                    </button>
                </label>
                <button class="modifyScreeningFormButton" type="button">수정하기</button>
            </li>
        </ul>`, 'text/html').querySelector('li');
            ul.append(li);
            // x 버튼 생성
            if (li.querySelector('[name="title"]').value !== "배정된 영화가 없습니다."){
                const vacateMovieButton = new DOMParser().parseFromString(`
                                <button type="button" class="vacateMovieButton">
                                    <img src="/assets/images/common/cancelBlack.png" height="20" width="20"/>
                                </button>
                                `, 'text/html').querySelector('button');
                li.querySelector('[rel="titleLabel"]').append(vacateMovieButton);
                vacateMovieButton.onclick = () => {
                    vacateMovieButton.remove();
                    li.querySelector('[name="title"]').value = "배정된 영화가 없습니다.";
                    li.querySelector('[type="hidden"][name="movieIndex"]').value = -1;
                }
            }

            // 상영정보 수정
            const modifyScreeningFormButtons = li.querySelectorAll('.modifyScreeningFormButton');
            modifyScreeningFormButtons.forEach(modifyScreeningFormButton => modifyScreeningFormButton.onclick = () => {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('index', li.querySelector('[type="hidden"][name="index"]').value);
                formData.append('movieIndex', li.querySelector('[type="hidden"][name="movieIndex"]').value);
                xhr.onreadystatechange = function(){
                    if (xhr.readyState !== XMLHttpRequest.DONE){
                        return;
                    }
                    if (xhr.status < 200 || xhr.status >= 300){
                        MessageObj.createSimpleOk('오류', '알 수 없는 이유로 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
                        return;
                    }
                    const responseObject = JSON.parse(xhr.responseText);
                    const [dTitle, dContent, dOnclick] = {
                        failure: ['경고', '알 수 없는 이유로 상영정보를 수정하지 못하였습니다. 잠시 후 다시 시도해주세요.'],
                        success: ['알림', '상영정보를 수정하였습니다.', () => {
                            // x버튼 생성
                            if (li.querySelector('[name="title"]').value !== "배정된 영화가 없습니다."){
                                const vacateMovieButton = new DOMParser().parseFromString(`
                                <button type="button" class="vacateMovieButton">
                                    <img src="/assets/images/common/cancelBlack.png" height="20" width="20"/>
                                </button>
                                `, 'text/html').querySelector('button');
                                li.querySelector('[rel="titleLabel"]').append(vacateMovieButton);
                                vacateMovieButton.onclick = () => {
                                    vacateMovieButton.remove();
                                    li.querySelector('[name="title"]').value = "배정된 영화가 없습니다.";
                                    li.querySelector('[type="hidden"][name="movieIndex"]').value = -1;
                                }
                            }
                        }]
                    }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해주세요.'];
                    MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
                }
                xhr.open('PATCH', '/screeningInfo/');
                xhr.send(formData);
            })
        }
        modifyScreeningInfoForm.querySelector('div.content').querySelector('.result-box').append(ul);

        // 영화 검색하기
        const contentLis = modifyScreeningInfoForm.divContent.querySelectorAll('li');
        contentLis.forEach(contentLi => contentLi.querySelector('[rel="showSearchMovie"]').onclick = () => {
            searchMovie.show();
            searchMovie.divResult = searchMovie.querySelector('.result-box');
            searchMovie.divResult.innerHTML = '';
            const alertCover2 = alertCover.cloneNode(false);
            alertCover2.id = alertCover.id + '2';
            alertCover2.style.zIndex = '10';
            document.body.append(alertCover2);
            searchMovie.style.zIndex = '11';
            alertCover2.show = (onclick) => {
                alertCover2.onclick = onclick;
                alertCover2.classList.add(HTMLElement.VISIBLE_CLASS_NAME);
            }
            alertCover2.show(() => {
                alertCover2.hide();
                searchMovie.hide();
            });

            //     영화 검색 제출
            searchMovie.onsubmit = e => {
                e.preventDefault();

                searchMovie.titleLabel = new LabelObj(searchMovie.querySelector('[rel="titleLabel"]'));
                searchMovie.titleLabel.setValid(searchMovie['title'].tests());
                if (!searchMovie.titleLabel.isValid()) {
                    return;
                }

                const showMoviesScreeningInfo = (page) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function(){
                        if (xhr.readyState !== XMLHttpRequest.DONE){
                            return;
                        }
                        loading.hide();
                        if(xhr.status < 200 || xhr.status >= 300){
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
                                searchMovie.divResult.innerHTML = '';
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
                                searchMovie.divResult.append(ul);
                                // 검색하고 밑에 페이지 나오게
                                // pageContainer 만들기
                                const pageContainer = new DOMParser().parseFromString(`
                 <div class="page-container"></div>
                `, 'text/html').querySelector('div');
                                searchMovie.divResult.append(pageContainer);
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
                                const lis = searchMovie.divResult.querySelectorAll('li');
                                lis.forEach(li => li.onclick = () => {
                                    new MessageObj({
                                        title: '알림',
                                        content: '이 영화로 교체하시겠습니까?',
                                        buttons: [
                                            {
                                                text: '취소', onclick: instance => {
                                                    instance.hide();
                                                }
                                            },
                                            {
                                                text: '확인', onclick: instance => {
                                                    instance.hide();
                                                    searchMovie.hide();
                                                    document.querySelector('[id=alertCover2]').remove();
                                                    const xhr = new XMLHttpRequest();
                                                    xhr.onreadystatechange = function(){
                                                        if (xhr.readyState !== XMLHttpRequest.DONE){
                                                            return;
                                                        }
                                                        loading.hide();
                                                        if(xhr.status < 200 || xhr.status >= 300){
                                                            MessageObj.createSimpleOk('오류', '알 수 없는 이유로 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
                                                            return;
                                                        }
                                                        const responseObject = JSON.parse(xhr.responseText);
                                                        contentLi.querySelector('[name="title"]').value = responseObject['title'];
                                                        contentLi.querySelector('[type="hidden"][name="movieIndex"]').value = li.querySelector('[name="index"]').value;

                                                    //     영화 제목 칸에 x버튼 만들기
                                                        if (contentLi.querySelector('[name="title"]').value !== "배정된 영화가 없습니다."){
                                                            const vacateMovieButton = new DOMParser().parseFromString(`
                                <button type="button" class="vacateMovieButton">
                                    <img src="/assets/images/common/cancelBlack.png" height="20" width="20"/>
                                </button>
                                `, 'text/html').querySelector('button');
                                                            contentLi.querySelector('[rel="titleLabel"]').append(vacateMovieButton);
                                                            vacateMovieButton.onclick = () => {
                                                                vacateMovieButton.remove();
                                                                contentLi.querySelector('[name="title"]').value = "배정된 영화가 없습니다.";
                                                                contentLi.querySelector('[type="hidden"][name="movieIndex"]').value = -1;
                                                            }
                                                        }
                                                    }
                                                    xhr.open('GET', `/movie/movie?index=${li.querySelector('[name="index"]').value}`);
                                                    xhr.send();
                                                    loading.show();
                                                }
                                            }
                                        ]
                                    }).show();
                                })
                        }
                        // 페이지가 불러져와있을 때 다른 페이지를 눌렀을 때 이동하는 로직
                        const pages = searchMovie.divResult.querySelectorAll('.page');
                        pages.forEach(page => page.onclick = () => {
                            showMoviesScreeningInfo(page.innerText);
                        });
                    }
                    xhr.open('GET', `/movie/search?keyword=${searchMovie['title'].value}&page=${page}`);
                    xhr.send();
                    loading.show();
                }
                showMoviesScreeningInfo(1);
            }
        });
    }
    xhr.open('GET', `/screeningInfo/vo?screeningDate=${screeningInfoSearchBar['screeningDate'].value}&cinemaIndex=${screeningInfoSearchBar['cinemaNumber'].value}`);
    xhr.send();
    loading.show();
}