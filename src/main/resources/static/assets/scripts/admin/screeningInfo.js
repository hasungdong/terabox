modifyScreeningInfoForm.divContent = modifyScreeningInfoForm.querySelector('div.content');

modifyScreeningInfoForm.screeningDateLabel = new LabelObj(modifyScreeningInfoForm.querySelector('[rel="screeningDateLabel"]'));
modifyScreeningInfoForm.regionCodeLabel = new LabelObj(modifyScreeningInfoForm.querySelector('[rel="regionCodeLabel"]'));
modifyScreeningInfoForm.theaterNameLabel = new LabelObj(modifyScreeningInfoForm.querySelector('[rel="theaterNameLabel"]'));
modifyScreeningInfoForm.screeningTimeLabel = new LabelObj(modifyScreeningInfoForm.querySelector('[rel="screeningTimeLabel"]'));

modifyScreeningInfoForm.onsubmit = e => {
    e.preventDefault();

    const dateRegex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    modifyScreeningInfoForm.screeningDateLabel.setValid(dateRegex.test(modifyScreeningInfoForm['screeningDate'].value))
    modifyScreeningInfoForm.screeningTimeLabel.setValid(dateRegex.test(modifyScreeningInfoForm['screeningTime'].value))
    const regionCodeRegex = RegExp(/^([a-zA-Z가-힣().\- !]{1,100})$/);
    modifyScreeningInfoForm.regionCodeLabel.setValid(regionCodeRegex.test(modifyScreeningInfoForm['regionCode'].value))
    const theaterNameRegex = RegExp(/^([a-zA-Z가-힣().\- !]{1,100})$/);
    modifyScreeningInfoForm.theaterNameLabel.setValid(theaterNameRegex.test(modifyScreeningInfoForm['theaterName'].value));

    if (!modifyScreeningInfoForm.screeningDateLabel.isValid() ||
        !modifyScreeningInfoForm.screeningTimeLabel.isValid() ||
        !modifyScreeningInfoForm.regionCodeLabel.isValid() ||
        !modifyScreeningInfoForm.theaterNameLabel.isValid()) {
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            return;
        }
        modifyScreeningInfoForm.querySelector('div.content').innerHTML = '';
        const ul = new DOMParser().parseFromString(`
            <ul></ul>
        `, 'text/html').querySelector('ul');
        const responseObject = JSON.parse(xhr.responseText);
        const screeningInfoArray = responseObject['screeningInfo'];
        if (screeningInfoArray.length === null) {
            MessageObj.createSimpleOk('알림', '해당 정보로 검색된 상영정보가 0건입니다.');
        }
        for (const screeningInfoArrayElement of screeningInfoArray) {
            const li = new DOMParser().parseFromString(`
        <ul>
            <li>
                <input type="hidden" name="index" value="${screeningInfoArrayElement['index']}">
                <input type="hidden" name="screeningDate" value="${screeningInfoArrayElement['screeningDate']}">
                <input type="hidden" name="screeningTime" value="${screeningInfoArrayElement['screeningTime']}">
                <input type="hidden" name="cinemaIndex" value="${screeningInfoArrayElement['cinemaIndex']}">
                <input type="hidden" name="movieIndex" value="${screeningInfoArrayElement['movieIndex']}">
                <label class="_obj-label" rel="releaseDateLabel">
                    <input class="_obj-input __field" type="text" name="releaseDate" spellcheck="false" value="2024-06-06" disabled>
                </label>
                <label class="_obj-label" rel="theaterNameLabel">
                    <input class="_obj-input __field" type="text" name="theaterName" spellcheck="false" disabled value="대구 동대구역">
                </label>
                <label class="_obj-label" rel="cinemaLabel">
                    <input class="_obj-input __field" type="text" name="cinema" spellcheck="false" disabled value="1">
                </label>
                <label class="_obj-label" rel="playingTimeLabel">
                    <input class="_obj-input __field" type="text" name="cinema" spellcheck="false" disabled value="00:00:00">
                </label>
                <label class="_obj-label" rel="titleLabel">
                    <input class="_obj-input __field" type="text" name="title" spellcheck="false" disabled value="범죄도시4">
                    <button type="button" class="search-button" rel="showSearchMovie">
                        <img th:src="@{/assets/images/common/search.png}" alt="">
                    </button>
                </label>
                <button type="button">수정하기</button>
            </li>
        </ul>`, 'text/html').querySelector('li');
            ul.append(li);
        }
        modifyScreeningInfoForm.divContent.append(ul);
        const lis = modifyScreeningInfoForm.divContent.querySelectorAll('li');
        lis.forEach(li => li.querySelector('[rel="showSearchMovie"]').onclick = () => {

        });


    }
    xhr.open('GET', `/screeningInfo/?screeningDate=${modifyScreeningInfoForm['screeningDate'].value}&screeningTime=${modifyScreeningInfoForm['screeningTime'].value}&regionCode=${modifyScreeningInfoForm['regionCode'].value}&theaterName=${modifyScreeningInfoForm['theaterName'].value}`);
    xhr.send();
}
//
// modifyMovieForm.divResult = modifyMovieForm.querySelector('.result-box');
//
// modifyMovieForm.onsubmit = e => {
//     e.preventDefault();
//
//     modifyMovieForm.titleLabel = new LabelObj(modifyMovieForm.querySelector('[rel="titleLabel"]'));
//     modifyMovieForm.titleLabel.setValid(modifyMovieForm['title'].tests());
//     if (!modifyMovieForm.titleLabel.isValid()) {
//         return;
//     }
//     // 제목에 맞는 영화 검색하는 xhr 요청
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState !== XMLHttpRequest.DONE) {
//             return;
//         }
//         loading.hide();
//         if (xhr.status < 200 || xhr.status >= 300) {
//             MessageObj.createSimpleOk('오류', '알 수 없는 이유로 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
//             return;
//         }
//         const responseObject = JSON.parse(xhr.responseText);
//         switch (responseObject['result']) {
//             case 'failure':
//                 MessageObj.createSimpleOk('경고', '알 수 없는 이유로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.').show();
//                 break;
//             case 'success':
//                 const responseArray = responseObject['movies'];
//                 modifyMovieForm.divResult.innerHTML = '';
//                 if (responseArray.length === 0) {
//                     return;
//                 }
//                 const ul = new DOMParser().parseFromString(`
//             <ul></ul>
//         `, 'text/html').querySelector('ul');
//                 for (const responseArrayElement of responseArray) {
//                     const li = new DOMParser().parseFromString(`
//         <ul>
//             <li>
//                 <input type="hidden" name="index" value="${responseArrayElement['index']}">
//                 <img class="img" src="" alt="">
//                 <span class="text-box">
//                     <span class="text">${responseArrayElement['title']}</span>
//                     <span class="spring"></span>
//                     <span class="info">
//                         <span class="playing-time">플레이타임<br> ${responseArrayElement['playingTime']}</span>
//                         <span class="reservation-rate">평점<br> ${responseArrayElement['grade']}</span>
//                         <span class="release-date">개봉일<br> ${responseArrayElement['releaseDate']}</span>
//                     </span>
//                 </span>
//             </li>
//         </ul>
//             `, 'text/html').querySelector('li');
//                     li.querySelector('.img').setAttribute('src', `/movie/image?index=${responseArrayElement['index']}`);
//                     ul.append(li);
//                 }
//
//                 modifyMovieForm.divResult.append(ul);
//                 const lis = modifyMovieForm.divResult.querySelectorAll('li');
//                 lis.forEach(li => li.onclick = () => {
//                     new MessageObj({
//                         title: '경고',
//                         content: '이 영화로 수정하시겠습니까?',
//                         buttons: [
//                             {
//                                 text: '취소', onclick: instance => {
//                                     instance.hide();
//                                 }
//                             },
//                             {
//                                 text: '확인', onclick: instance => {
//                                     instance.hide();
//                                     modifyMovieFormTwo.show();
//                                 }
//                             }
//                         ]
//                     }).show();
//                 })
//                 break;
//             default:
//                 MessageObj.createSimpleOk('경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해주세요.').show();
//                 return;
//         }
//     }
//     xhr.open('GET', `/movie/search?keyword=${modifyMovieForm['title'].value}`);
//     xhr.send();
//     loading.show();
// }