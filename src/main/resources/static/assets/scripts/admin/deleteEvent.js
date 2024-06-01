deleteEventForm.divResult = deleteEventForm.querySelector('.result-box');

deleteEventForm.onsubmit = e => {
    e.preventDefault();

    deleteEventForm.titleLabel = new LabelObj(deleteEventForm.querySelector('[rel="titleLabel"]'));
    deleteEventForm.titleLabel.setValid(deleteEventForm['title'].tests());
    if (!deleteEventForm.titleLabel.isValid()){
        return;
    }
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
                const lis = deleteEventForm.divResult.querySelectorAll('li');
                lis.forEach(li => li.onclick = () => {
                    if (!confirm('이 이벤트를 삭제하시겠습니까?')){
                        return;
                    }
                    alert('얍');
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
                            success: ['알림', '이벤트를 성공적으로 삭제하였습니다.']
                        }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
                        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
                    }
                    xhr.open('DELETE', '/admin/deleteEvent');
                    xhr.send(formData);
                    loading.show();
                })
                break;
            default:
                MessageObj.createSimpleOk('경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해주세요.').show();
                return;
        }
    }
    xhr.open('GET', `/event/search?keyword=${deleteEventForm['title'].value}`);
    xhr.send();
    loading.show();
}


