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

// addProductForm 보여주기
addProductFormShowButtons.forEach(addProductFormShowButton => addProductFormShowButton.onclick = () => {
    addProductForm.show();
    alertCover.show(() => {
        alertCover.hide();
        addProductForm.hide();
    });
});

// addProductForm 숨기기
addProductFormHideButtons.forEach(addProductFormHideButton => addProductFormHideButton.onclick = () => {
    addProductForm.hide();
    alertCover.hide();
});



