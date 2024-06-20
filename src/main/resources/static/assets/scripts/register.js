const registerForm = document.getElementById('registerForm');
const loading = document.getElementById('loading');



// 김성민 2024.06.05 만듬

// 회원가입 보여주기 (김성민)
const showRegister = () => {
    registerForm['emailSalt'].value = '';
    registerForm['email'].enable();
    registerForm['email'].focus();
    registerForm['email'].value = '';
    registerForm['emailSend'].enable();
    registerForm['emailCode'].disable();
    registerForm['emailCode'].value = '';
    registerForm['emailVerify'].disable();
    registerForm['password'].value = '';
    registerForm['passwordCheck'].value = '';
    registerForm['agree'].checked = false;
    registerForm.show();
    cover.show(() => {
        registerForm.hide();
        showLogin();
    })
}


// Label 오브젝트에 rel값들 담아주기 (김성민)
registerForm.emailLabel = new LabelObj(registerForm.querySelector('[rel="emailLabel"]'));
registerForm.passwordLabel = new LabelObj(registerForm.querySelector('[rel="passwordLabel"]'));
registerForm.nickNameLabel = new LabelObj(registerForm.querySelector('[rel="nicknameLabel"]'));

// 인증번호 전송관련 xhr (김성민)
registerForm.emailLabel = new LabelObj(registerForm.querySelector('[rel="emailLabel"]'));
registerForm['emailSend'].onclick = () => {
    // console.log(registerForm['email']);
    registerForm.emailLabel.setValid(registerForm['email'].tests());
    if (!registerForm.emailLabel.isValid()) {
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', registerForm['email'].value);
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
            failure: ['경고', '알 수 없는 이유로 인증번호를 전송하지 못하였습니다. 잠시 후 다시 시도해 주세요.'],
            failure_duplicate_email: ['경고', '해당 이메일은 이미 사용중 입니다. 다른 이메일을 입력해 주세요.', () => {
                registerForm['email'].focus();
        }],
            success: ['알림', '입력하신 이메일로 인증번호를 전송하였습니다. 인증번호는 3분간만 유효하니 유의해 주세요.', () => {
                registerForm['emailSalt'].value = responseObject['salt'];
                registerForm['email'].disable();
                registerForm['emailSend'].disable();
                registerForm['emailCode'].enable();
                registerForm['emailCode'].focus();
                registerForm['emailVerify'].enable();
            }]
        }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
    }
    xhr.open('POST', '/user/registerEmail');
    xhr.send(formData);
    loading.show();
}

// 이메일 Label? (김성민)
registerForm.emailLabel = new LabelObj(registerForm.querySelector('[rel="emailLabel"]'));
registerForm['emailLabel'].onclick = () => {

};

// 인증번호 확인 6/9작성 (김성민)
registerForm['emailVerify'].onclick = () => {
    registerForm.emailLabel.setValid(registerForm['emailCode'].tests());
    if (!registerForm.emailLabel.isValid()) {
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', registerForm['email'].value);
    formData.append('code', registerForm['emailCode'].value);
    formData.append('salt', registerForm['emailSalt'].value);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            return;
        }
        loading.hide();
        const responseObject = JSON.parse(xhr.responseText);
        const [dTitle, dContent, dOnclick] = {
            failure: ['경고', '인증번호가 올바르지 않습니다. 다시 확인해 주세요.', () => loginForm['emailCode'].focus()],
            failure_expired: ['경고', '인증 정보가 만료되었습니다. 다시 시도해 주세요.', () => {
                registerForm['emailSalt'].value = ''; // 이메일솔트? 비어있음
                registerForm['email'].enable(); // 이메일입력칸 활성화
                registerForm['emailSend'].enable(); // 인증번호전송 활성화
                registerForm['emailCode'].disable(); // 이메일코드 비활성화
                registerForm['emailCode'].value = ''; // 이메일코드 비어있음
                registerForm['emailVerify'].disable(); // 이메일확인 비활성화
            }],
            success: ['알림', '이메일 인증이 완료되었습니다. 회원가입을 계속해주세요.', () => {
                registerForm['emailCode'].disable();
                registerForm['emailVerify'].disable();
                registerForm['password'].focus();
            }]
        } [responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();
    }
    xhr.open('PATCH', '/user/registerEmail');
    xhr.send(formData);
    loading.show();
};

// 회원가입 form을 제출시 6/9 작성 (김성민)
registerForm.onsubmit = e => {
    e.preventDefault();
    registerForm.passwordLabel.setValid(registerForm['password'].tests());
    registerForm.nickNameLabel.setValid(registerForm['nickname'].tests());
    if (registerForm['emailSend'].isEnabled() || registerForm['emailVerify'].isEnabled()) {
        MessageObj.createSimpleOk('경고', '이메일 인증을 완료해주세요.').show();
        return;
    }

    if (registerForm['password'].value !== registerForm['passwordCheck'].value) {
        MessageObj.createSimpleOk('경고', '비밀번호가 일치하지 않습니다. 다시 확인해주세요.').show();
        return;
    }

    if (!registerForm.passwordLabel.isValid() || !registerForm.nickNameLabel.isValid()) {
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', registerForm['email'].value);
    formData.append('code', registerForm['emailCode'].value);
    formData.append('salt', registerForm['emailSalt'].value);
    formData.append('password', registerForm['password'].value);
    formData.append('nickname', registerForm['nickname'].value);
    formData.append('birth', registerForm['birth'].value);
    formData.append('passwordCheck', registerForm['passwordCheck'].value);

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
        // const responseActions = {
        const [dTitle, dContent, dOnclick] = {
            failure: ['경고', '알 수 없는 이유로 회원가입에 실패하였습니다. 잠시 후 다시 시도해 주세요.'],
            failure_duplicate_email: ['경고', `입력하신 이메일 <b>${registerForm['email'].value}</b>는 이미 사용 중입니다. 다른 이메일을 사용해주세요.`, () => {
                registerForm['emailSalt'].value = '';
                registerForm['email'].enable().focus();
                registerForm['emailSend'].enable();
                registerForm['emailCode'].disable().value = '';
                registerForm['emailVerify'].disable();
            }],
            failure_duplicate_nickname: ['경고', `입력하신 닉네임 <b>${registerForm['nickname'].value}</b>는 이미 사용 중입니다. 다른 닉네임을 사용해주세요.`, () => {
                registerForm['nickname'].focus()
            }],
            success: ['알림', '회원가입해주셔서 감사드립니다. 확인 버튼을 클릭하면 다음 페이지로 이동합니다.', () => {
                location.href = '/register/registerFour';
            }]

        }[responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해주세요.'];
        MessageObj.createSimpleOk(dTitle, dContent, dOnclick).show();

        // const [dTitle, dContent, dOnclick] = responseActions
        //     [responseObject.result] || ['경고', '서버가 알 수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요.'];
        // const message = MessageObj.createSimpleOk(dTitle, dContent);
        // if (dOnclick) {
        //     message.setOnclick(dOnclick);
        // }
        // message.show();
    }
    xhr.open('POST', '/user/register');
    xhr.send(formData);
}
