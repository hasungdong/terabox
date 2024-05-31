deleteEventForm.onsubmit = e => {
    e.preventDefault();

    addEventForm.titleLabel.setValid(addEventForm['title'].tests());

    if (!addEventForm.titleLabel.isValid()){
        return;
    }
    alert('1');
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
                const divResult = deleteEventForm.querySelector('.result-box');
                const ul = new DOMParser().parseFromString(`
            <ul></ul>
        `, 'text/html').querySelector('ul');
                for (const responseArrayElement of responseArray) {
                    const li = new DOMParser().parseFromString(`
        <ul>
            <li>
                <img class="img" src="" alt="">
                <span class="text-box">
                    <span class="text">${responseArrayElement['title']}</span>
                    <span class="spring"></span>
                    <span class="movie-info">
                        <span class="playing-time">플레이타임 <br> ${responseArrayElement['playingTime']}</span>
                        <span class="reservation-rate">평점 <br> ${responseArrayElement['grade']}</span>
                        <span class="release-date">개봉일 <br> ${responseArrayElement['releaseDate']}</span>
                    </span>
                </span>
            </li>
        </ul>
            `, 'text/html').querySelector('li');
                    ul.append(li);
                }
                divResult.append(ul);
                deleteEventForm.querySelector('.content').append(ul);
                break;
            default:
                MessageObj.createSimpleOk('경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해주세요.').show();
                return;
        }
    }
    xhr.open('GET', `/event/search?title=${deleteEventForm['title'].value}`);
    xhr.send();
    alert('2');
    loading.show();
}