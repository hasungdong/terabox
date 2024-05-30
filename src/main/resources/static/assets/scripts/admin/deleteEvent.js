deleteEventForm.onsubmit = e => {
    e.preventDefault();

    addEventForm.titleLabel.setValid(addEventForm['title'].tests());

    if (!addEventForm.titleLabel.isValid()){
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.onreadystatechange = function(){
        if (xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300){
            MessageObj.createSimpleOk('오류', '알 수 없는 이유로 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
            return;
        }
        const responseObject = JSON.parse(xhr.responseText);
        const responseArray = responseObject['events'];
        for (const responseArrayElement of responseArray) {

        }
        switch (responseObject['result']) {
            case 'failure':
                break;
            case 'success':
                break;
            default:
                return;
        }

    }
    xhr.open('DELETE', '/admin/deleteEvent');
    xhr.send(formData);

}