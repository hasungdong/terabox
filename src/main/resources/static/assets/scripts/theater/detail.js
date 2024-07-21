console.log(document.querySelector('.btn.btn-like'))

document.querySelector('.btn.btn-like').onclick = () => {
    const preferButton = document.querySelector('.btn.btn-like');

    if (!preferButton.classList.contains('log')){
        alertCover.show();
        new MessageObj({
            title: '알림',
            content: '로그인 후 이용가능한 서비스입니다 <br> 로그인하시겠습니까?',
            buttons: [
                {
                    text: '취소', onclick: instance => {
                        instance.hide();
                        alertCover.hide();
                    }
                },
                {
                    text: '확인', onclick: instance => {
                        instance.hide();
                        showLogin();
                        alertCover.hide();
                    }
                }
            ]
        }).show();
    } else {
        if (preferButton.classList.contains('on')){
            alertCover.show();
            new MessageObj({
                title: '알림',
                content: '등록된 선호극장을 삭제하시겠습니까?',
                buttons: [
                    {
                        text: '취소', onclick: instance => {
                            instance.hide();
                            alertCover.hide();
                        }
                    },
                    {
                        text: '확인', onclick: instance => {
                            instance.hide();
                            preferButton.classList.remove('on');
                            alertCover.hide();
                        }
                    }
                ]
            }).show();
        } else {
            preferButton.classList.add('on');
        }
    }
}