const addMovieForm = document.getElementById('addMovieForm');
const addMovieFormShowButtons = document.querySelectorAll('[rel="showAddMovieForm"]');
const addMovieFormHideButtons = document.querySelectorAll('[rel="addMovieFormCancel"]');
const addProductForm = document.getElementById('addProductForm')
const addProductFormShowButtons = document.querySelectorAll('[rel="showAddProductForm"]');
const addProductFormHideButtons = document.querySelectorAll('[rel="hideAddProductForm"]');
const adminAside = document.getElementById('adminAside');
const asideOpenButton = adminAside.querySelector('.more');
const asideCloseButton = adminAside.querySelector('.less');


// adminAside 보여주기
asideOpenButton.onclick = () => {
    adminAside.show();
    asideOpenButton.classList.toggle('on');
    asideCloseButton.classList.toggle('on');
    cover.show(() => {
        adminAside.hide()
        cover.hide();
        asideOpenButton.classList.toggle('on');
        asideCloseButton.classList.toggle('on');
    });
}

// adminAside 숨기기
asideCloseButton.onclick = () => {
    adminAside.hide();
    cover.hide();
    asideOpenButton.classList.toggle('on');
    asideCloseButton.classList.toggle('on');
}


// addMovieForm 보여주기
addMovieFormShowButtons.forEach(addMovieFormShowButton => addMovieFormShowButton.onclick = () => {
    addMovieForm.show();
    alertCover.show(() => {
        alertCover.hide();
        addMovieForm.hide();
    });
})

// addMovieForm 숨기기
addMovieFormHideButtons.forEach(addMovieFormHideButton => addMovieFormHideButton.onclick = () => {
    addMovieForm.hide();
    alertCover.hide();
});

// addMovieForm 제출
addMovieForm.onsubmit = e => {
    e.preventDefault();
//     나중에 채워야댐
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('name', addMovieForm['name'].value);
    formData.append('releaseDate', addMovieForm['releaseDate'].value);
    formData.append('playingTime', addMovieForm['playingTime'].value);
    formData.append('thumbnail', addMovieForm['thumbnail'].value);
    formData.append('isSingle', addMovieForm['isSingle'].value);
    xhr.onreadystatechange = function(){
        if (xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300){
            MessageObj.createSimpleOk('오류', '알 수 없는 이유로 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.').show();
            return;
        }
    }
    xhr.open('POST', '/admin/addMovie');
    xhr.send(formData);
}

addProductFormShowButtons.forEach(addProductFormShowButton => addProductFormShowButton.onclick = () => {
    addProductForm.show();
    alertCover.show(() => {
        alertCover.hide();
        addProductForm.hide();
    });
});

addProductFormHideButtons.forEach(addProductFormHideButton => addProductFormHideButton.onclick = () => {
    addProductForm.hide();
    alertCover.hide();
});

addProductForm.onsubmit = e => {
    e.preventDefault();
}

