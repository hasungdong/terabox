const loginForm = document.getElementById('loginForm');
const recoverDialog = document.getElementById('recoverDialog');
const linksitemap = document.getElementById('header-site-map');
const sitemap = document.getElementById('layer_sitemap');

const headerMovie = document.getElementById('header-movie');
const movieLink = document.getElementById('movieLink-mini-container');

const headerBuyTicket = document.getElementById('header-buy-ticket');
const reserveLink = document.getElementById('reserveLink-mini-container');

const headerCinema = document.getElementById('header-cinema');
const theaterLink = document.getElementById('theaterLink-mini-container');

const headerEvent = document.getElementById('header-event');
const eventLink = document.getElementById('eventLink-mini-container');

const headerBenefits = document.getElementById('header-benefits');
const membershipLink = document.getElementById('membershipLink-mini-container');

// 6/9 작성함 (김성민)



document.querySelectorAll('[rel="showLogin"]').forEach(loginButton => loginButton.onclick = () => {
    loading.show();
    showLogin();
    loading.hide();
})


const showLogin = () => {
    loginForm['email'].value = '';
    loginForm['email'].focus();
    loginForm['password'].value = '';
    loginForm.show();
    cover.show(() => {
        loginForm.hide();
        cover.hide();
    });
};

// 복구 보여주기? // 이거 왜 노란줄 뜨는지 물어보기 6/9 작성
const showRecover = () => {
    recoverDialog.querySelector('[name="type"][value="email"]').checked = true;
    recoverDialog.emailForm['nickname'].value = '';
    recoverDialog.passwordForm['emailSalt'].value = '';
    recoverDialog.passwordForm['email'].enable().value = '';
    recoverDialog.passwordForm['emailSend'].enable();
    recoverDialog.passwordForm['emailCode'].disable().value = '';
    recoverDialog.passwordForm['emailVerify'].disable();
    recoverDialog.show();
    cover.show(() => {
        recoverDialog.hide();
        showLogin();
    })
}

linksitemap.addEventListener('click', function () {
    sitemap.classList.toggle('on');
    document.querySelector('.fa-solid.fa-bars').classList.toggle('on');
    document.querySelector('.cancel-button').classList.toggle('on');
});


function hideAllSubmenus() {
    reserveLink.classList.remove('on');
    theaterLink.classList.remove('on');
    movieLink.classList.remove('on');
    eventLink.classList.remove('on');
    membershipLink.classList.remove('on');
}

// 영화에 마우스를 올렸을때 -> 영화밑에 링크들 발생
headerMovie.addEventListener('mouseover', function () {
    hideAllSubmenus()
    movieLink.classList.toggle('on');
    document.onmouseleave = () => {
        // movieLink.classList.remove('on');
        hideAllSubmenus()
    }
});

// 그 링크에 있던 마우스가 떠낫을때 on을 삭제
movieLink.addEventListener('mouseout', function () {
    // movieLink.classList.remove('on');
    hideAllSubmenus()
})


headerBuyTicket.addEventListener('mouseover', function () {
    hideAllSubmenus();
    reserveLink.classList.toggle('on');
    document.onmouseleave = () => {
        hideAllSubmenus()
    }
});
reserveLink.addEventListener('mouseleave', function () {
    hideAllSubmenus()
})



// 극장 아랫링크부분
headerCinema.addEventListener('mouseover', function () {
    hideAllSubmenus();
    theaterLink.classList.toggle('on');
    document.onmouseleave = () => {
        hideAllSubmenus()
    }
});
theaterLink.addEventListener('mouseleave', function () {
        hideAllSubmenus()
})

// 이벤트 링크부분
headerEvent.addEventListener('mouseover', function () {
    hideAllSubmenus()
    eventLink.classList.toggle('on');
    document.onmouseleave = () => {
        hideAllSubmenus()
    }
});
eventLink.addEventListener('mouseleave', function () {
    hideAllSubmenus()
})

// 혜택 링크부분
headerBenefits.addEventListener('mouseover', function () {
    hideAllSubmenus()
    membershipLink.classList.toggle('on');
    document.onmouseleave = () => {
        hideAllSubmenus()
    }
});
membershipLink.addEventListener('mouseleave', function () {
    hideAllSubmenus()
})


// showRecoverCaller이 rel인 버튼을 눌렀을떄 showRecover 실행
document.body.querySelectorAll('[rel="showRecoverCaller"]').forEach(el => el.addEventListener('click', showRecover));

loginForm.emailLabel = new LabelObj(loginForm.querySelector('[rel="emailLabel"]'));
loginForm.passwordLabel = new LabelObj(loginForm.querySelector('[rel="passwordLabel"]'));


// 로그인 화면에서 이메일이나 비밀번호 값에 변경이 있을 때, 둘 중 하나라도 비어있으면 제출 버튼이 비활성화된다.
loginForm.email.oninput = () => {
    if (loginForm.email.value === '' ||
        loginForm.password.value === '') {
        loginForm.querySelector('[type="submit"]').disable();
        return;
    }
    loginForm.querySelector('[type="submit"]').enable();
}

loginForm.password.oninput = () => {
    if (loginForm.email.value === '' ||
        loginForm.password.value === '') {
        loginForm.querySelector('[type="submit"]').disable();
        return;
    }
    loginForm.querySelector('[type="submit"]').enable();
}


// 로그인 6.18 추가
loginForm.onsubmit = e => {
    e.preventDefault();
    loginForm.emailLabel.setValid(loginForm['email'].tests());
    loginForm.passwordLabel.setValid(loginForm['password'].tests());
    if (!loginForm.emailLabel.isValid() || !loginForm.passwordLabel.isValid()) {
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', loginForm['email'].value);
    formData.append('password', loginForm['password'].value);
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
        if (responseObject.result === 'success') {
            location.reload();
            return;
        }
        const [dTitle, dContent, dOnclick] = {
            failure: ['경고', '아이디 또는 비밀번호가 맞지 않습니다. <br>로그인 정보를 다시 확인바랍니다.', () => {
                loginForm['email'].focus();
            }],
        }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요,'];
        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
    }
    xhr.open('POST', '/user/login');
    xhr.send(formData);
    loading.show();
}

// 여기서부터 계정 복구폼임

recoverDialog.emailForm = recoverDialog.querySelector('[rel="emailForm"]');
recoverDialog.emailForm.nickNameLabel = new LabelObj(recoverDialog.emailForm.querySelector('[rel="nicknameLabel"]'));
recoverDialog.passwordForm = recoverDialog.querySelector('[rel="passwordForm"]');
recoverDialog.passwordForm.emailLabel = new LabelObj(recoverDialog.passwordForm.querySelector('[rel="emailLabel"]'));
recoverDialog.passwordForm.passwordLabel = new LabelObj(recoverDialog.passwordForm.querySelector('[rel="passwordLabel"]'));

recoverDialog.querySelector('[name="cancelButton"]').onclick = () => {
    showLogin();
}

// 복구 이메일폼 관련 제출시?? (김성민)
recoverDialog.emailForm.onsubmit = e => {
    e.preventDefault();
    recoverDialog.emailForm.nickNameLabel.setValid(recoverDialog.emailForm['nickname'].tests());
    if (!recoverDialog.emailForm.nickNameLabel.isValid()) {
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        loading.hide();
        if (xhr.status < 200 || xhr.status >= 300) {
            MessageObj.createSimpleOk('오류', '요청을 전송하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.').show();
            return;
        }
        const responseObject = JSON.parse(xhr.responseText);
        const [dTitle, dContent, dOnclick] = {
            failure: ['경고', '입력하신 닉네임으로 회원 정보를 찾을 수 없습니다. 다시 확인해주세요.'],
            success: ['알림', `입력하신 닉네임으로 찾은 회원의 이메일은 <b>${responseObject['email']}</b>입니다. 확인 버튼을 누르면 로그인 페이지로 돌아갑니다.`, () => showLogin()]
        } [responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
    }
    xhr.open('GET', `/user/email?nickname=${recoverDialog.emailForm['nickname'].value}`); // 경로 물어보기
    xhr.send();
}

// 계정복구의, 패스워드폼의  인증요청을 눌렀을 때 (김성민) 6/9
recoverDialog.passwordForm['emailSend'].onclick = () => {
    recoverDialog.passwordForm.emailLabel.setValid(recoverDialog.passwordForm['email'].value);
    if (!recoverDialog.passwordForm.emailLabel.isValid()) {
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', recoverDialog.passwordForm['email'].value);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        loading.hide();
        if (xhr.status < 200 || xhr.status >= 300) {
            MessageObj.createSimpleOk('오류', '요청을 전송하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show()
            return;
        }
        const responseObject = JSON.parse(xhr.responseText);
        const [dTitle, dContent, dOnclick] = {
            failure: ['경고', '입력하신 이메일을 사용하는 회원이 없습니다. 다시 확인해 주세요.', () => recoverDialog.passwordForm['email'].focus()],
            success: ['알림', `입력하신 이메일로 인증번호를 전송하였습니다. 인증번호는 3분간만 유효하니 유의해주세요.`, () => {
                recoverDialog.passwordForm['emailSalt'].value = responseObject['salt'];
                recoverDialog.passwordForm['email'].disable();
                recoverDialog.passwordForm['emailSend'].disable();
                recoverDialog.passwordForm['emailCode'].enable();
                recoverDialog.passwordForm['emailCode'].focus();
                recoverDialog.passwordForm['emailVerify'].enable();
            }]
        } [responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
    }
    xhr.open('POST', '/user/resetPasswordEmail'); // 이것또한 경로에 관해서 물어보기
    xhr.send(formData);
    loading.show();
}

// 비밀번호 재설정폼에 인증번호 전송 부분, 6/10 (김성민)
recoverDialog.passwordForm['emailVerify'].onclick = () => {
    recoverDialog.passwordForm.emailLabel.setValid(recoverDialog.passwordForm['emailCode'].tests()); // 복구안에 비밀번호폼의 이메일라벨의 유효성을
    if (!recoverDialog.passwordForm.emailLabel.isValid()) {
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', recoverDialog.passwordForm['email'].value);
    formData.append('code', recoverDialog.passwordForm['emailCode'].value);
    formData.append('salt', recoverDialog.passwordForm['emailSalt'].value);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            MessageObj.createSimpleOk('오류', '요청을 전송하는 도중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.').show();
            return;
        }
        const responseObject = JSON.parse(xhr.responseText);
        const [dTitle, dContent, dOnclick] = {
            failure: ['경고', '인증정보가 만료되었습니다. 다시 시도해 주세요.', () => { // 실패시 함수실행
                recoverDialog.passwordForm['emailSalt'].value = '';  // salt의 value를 빈값
                recoverDialog.passwordForm['email'].enable();       // email 활성화
                recoverDialog.passwordForm['emailSend'].enable();   // 인증번호 보내기 활성화
                recoverDialog.passwordForm['emailCode'].disable();  // 인증번호 입력 비활성화
                recoverDialog.passwordForm['emailCode'].value = ''; // 인증번호 입력 value를 빈값
                recoverDialog.passwordForm['emailVerify'].disable();// 인증번호 확인 비활성화
            }],
            success: ['알림', '이메일 인증이 완료되었습니다. 변경할 비밀번호를 입력해 주세요.', () => { // 성공시 함수실행
                recoverDialog.passwordForm['emailCode'].disable();          // 패스워드 폼의 인증번호 입력 비활성화
                recoverDialog.passwordForm['emailVerify'].disable();        // 패스워드 폼의 인증번호 확인 비활성화
                recoverDialog.passwordForm['password'].enable().focus();    // 패스워드 폼의 비밀번호 활성화, 포커싱
                recoverDialog.passwordForm['passwordCheck'].enable();       // 패스워드 폼의 비밀번호 확인 활성화
            }]
        } [responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
    }
    xhr.open('PATCH', '/user/resetPasswordEmail'); // 경로 물어보기
    xhr.send(formData);
}

// 패스워드폼을 제출시, 6/10 (김성민)
recoverDialog.passwordForm.onsubmit = e => {
    e.preventDefault();
    if (recoverDialog.passwordForm['emailSend'].isEnabled() || recoverDialog.passwordForm['emailVerify'].isEnabled()) { // 유효성 검사
        MessageObj.createSimpleOk('경고', '이메일 인증을 완료해 주세요.').show();
        return;
    }
    recoverDialog.passwordForm.passwordLabel.setValid(recoverDialog.passwordForm['password'].value); // 유효성 검사
    if (!recoverDialog.passwordForm.passwordLabel.isValid()) {
        return;
    }
    if (recoverDialog.passwordForm['password'].value !== recoverDialog.passwordForm['passwordCheck'].value) { // 유효성 검사
        MessageObj.createSimpleOk('경고', '재입력한 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.', () => recoverDialog.passwordForm['passwordCheck'].focus()).show();
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', recoverDialog.passwordForm['email'].value); // 폼 데이터에 email이라는 이름으로 recoverDialog의 passwordForm의 emailForm을 값으로 추가.
    formData.append('code', recoverDialog.passwordForm['emailCode'].value);  // 폼 데이터에 code라는 이름으로 recoverDialog의 passwordForm의 emailCode를 값으로 추가.
    formData.append('salt', recoverDialog.passwordForm['emailSalt'].value);  // 폼 데이터에 salt라는 이름으로 recoverDialog의 passwordForm의 emailSalt를 값으로 추가.
    formData.append('password', recoverDialog.passwordForm['password'].value); // 폼 데이터에 password라는 이름으로 recoverDialog의 passwordForm의 password를 값으로 추가
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) { // 200~300은 요청 전송 오류임.
            MessageObj.createSimpleOk('오류', '요청을 전송하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요,').show();
            return;
        }
        const responseObject = JSON.parse(xhr.responseText);
        const [dTitle, dContent, dOnclick] = {
            failure: ['경고', '알 수 없는 이유로 비밀번호를 재설정하지 못하였습니다. 잠시 후 다시 시도해 주세요.'],
            success: ['알림', '비밀번호를 성공적으로 재설정하였습니다. 확인 버튼을 클릭하면 로그인 페이지로 이동합니다.', () => recoverDialog.hide()]
        }[responseObject.result] || ['경고', '서버가 알수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
    }
    xhr.open('PATCH', '/user/resetPassword');
    xhr.send(formData);
}

