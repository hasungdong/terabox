const cover = document.getElementById('cover');
const loginForm = document.getElementById('loginForm');
const loading = document.getElementById('loading');

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

