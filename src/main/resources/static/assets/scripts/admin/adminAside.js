// 영화 추가
const addMovieForm = document.getElementById('addMovieForm');
const addMovieFormShowButtons = document.querySelectorAll('[rel="showAddMovieForm"]');
const addMovieFormHideButtons = document.querySelectorAll('[rel="hideAddMovieForm"]');
// 영화 수정
const modifyMovieForm = document.getElementById('modifyMovieForm');
const modifyMovieFormShowButtons = document.querySelectorAll('[rel="showModifyMovieForm"]');
const modifyMovieFormHideButtons = document.querySelectorAll('[rel="hideModifyMovieForm"]');
const modifyMovieFormTwo = document.getElementById('modifyMovieFormTwo');
const modifyMovieFormTwoShowButtons = document.querySelectorAll('[rel="showModifyMovieFormTwo"]');
const modifyMovieFormTwoHideButtons = document.querySelectorAll('[rel="hideModifyMovieFormTwo"]');
// 영화 삭제
const deleteMovieForm = document.getElementById('deleteMovieForm');
const deleteMovieFormShowButtons = document.querySelectorAll('[rel="showdeleteMovieForm"]');
const deleteMovieFormHideButtons = document.querySelectorAll('[rel="hideDeleteMovieForm"]');
// 상품 추가
const addProductForm = document.getElementById('addProductForm')
const addProductFormShowButtons = document.querySelectorAll('[rel="showAddProductForm"]');
const addProductFormHideButtons = document.querySelectorAll('[rel="hideAddProductForm"]');
// 상품 수정
const modifyProductForm = document.getElementById('modifyProductForm');
const modifyProductFormShowButtons = document.querySelectorAll('[rel="showModifyProductForm"]');
const modifyProductFormHideButtons = document.querySelectorAll('[rel="hideModifyProductForm"]');
const modifyProductFormTwo = document.getElementById('modifyProductFormTwo');
const modifyProductFormTwoShowButtons = document.querySelectorAll('[rel="showModifyProductFormTwo"]');
const modifyProductFormTwoHideButtons = document.querySelectorAll('[rel="hideModifyProductFormTwo"]');
// 상품 삭제
const deleteProductForm = document.getElementById('deleteProductForm');
const deleteProductFormShowButtons = document.querySelectorAll('[rel="showDeleteProductForm"]');
const deleteProductFormHideButtons = document.querySelectorAll('[rel="hideDeleteProductForm"]');
// 이벤트 추가
const addEventForm = document.getElementById('addEventForm');
const addEventFormShowButtons = document.querySelectorAll('[rel="showAddEventForm"]');
const addEventFormHideButtons = document.querySelectorAll('[rel="hideAddEventForm"]');
// 이벤트 수정
const modifyEventForm = document.getElementById('modifyEventForm');
const modifyEventFormShowButtons = document.querySelectorAll('[rel="showModifyEventForm"]');
const modifyEventFormHideButtons = document.querySelectorAll('[rel="hideModifyEventForm"]');
const modifyEventFormTwo = document.getElementById('modifyEventFormTwo');
const modifyEventFormTwoShowButtons = document.querySelectorAll('[rel="showModifyEventFormTwo"]');
const modifyEventFormTwoHideButtons = document.querySelectorAll('[rel="hideModifyEventFormTwo"]');
// 이벤트 삭제
const deleteEventForm = document.getElementById('deleteEventForm');
const deleteEventFormShowButtons = document.querySelectorAll('[rel="showDeleteEventForm"]');
const deleteEventFormHideButtons = document.querySelectorAll('[rel="hideDeleteEventForm"]');
// adminAside
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


// 여기부터 Movie
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

// modifyMovieForm 보여주기
modifyMovieFormShowButtons.forEach(modifyMovieFormShowButton => modifyMovieFormShowButton.onclick = () => {
    modifyMovieForm.show();
    alertCover.show(() => {
        alertCover.hide();
        modifyMovieForm.hide();
    });
})

// modifyMovieForm 숨기기
modifyMovieFormHideButtons.forEach(modifyMovieFormHideButton => modifyMovieFormHideButton.onclick = () => {
    modifyMovieForm.hide();
    alertCover.hide();
});

// modifyMovieFormTwo 보여주기
modifyMovieFormTwoShowButtons.forEach(modifyMovieFormTwoShowButton => modifyMovieFormTwoShowButton.onclick = () => {
    modifyMovieFormTwo.show();
    alertCover.show(() => {
        alertCover.hide();
        modifyMovieFormTwo.hide();
    });
})

// modifyMovieFormTwo 숨기기
modifyMovieFormTwoHideButtons.forEach(modifyMovieFormTwoHideButton => modifyMovieFormTwoHideButton.onclick = () => {
    modifyMovieFormTwo.hide();
    alertCover.hide();
});

// deleteMovieForm 보여주기
deleteMovieFormShowButtons.forEach(deleteMovieFormShowButton => deleteMovieFormShowButton.onclick = () => {
    deleteMovieForm.show();
    alertCover.show(() => {
        alertCover.hide();
        deleteMovieForm.hide();
    });
})

// deleteMovieForm 숨기기
deleteMovieFormHideButtons.forEach(deleteMovieFormHideButton => deleteMovieFormHideButton.onclick = () => {
    deleteMovieForm.hide();
    alertCover.hide();
});


// 여기부터 Product
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

// modifyProductForm 보여주기
modifyProductFormShowButtons.forEach(modifyProductFormShowButton => modifyProductFormShowButton.onclick = () => {
    modifyProductForm.show();
    alertCover.show(() => {
        alertCover.hide();
        modifyProductForm.hide();
    });
});

// modifyProductForm 숨기기
modifyProductFormHideButtons.forEach(modifyProductFormHideButton => modifyProductFormHideButton.onclick = () => {
    modifyProductForm.hide();
    alertCover.hide();
});

// modifyProductFormTwo 보여주기
modifyProductFormTwoShowButtons.forEach(modifyProductFormTwoShowButton => modifyProductFormTwoShowButton.onclick = () => {
    modifyProductFormTwo.show();
    alertCover.show(() => {
        alertCover.hide();
        modifyProductFormTwo.hide();
    });
});

// modifyProductFormTwo 숨기기
modifyProductFormTwoHideButtons.forEach(modifyProductFormTwoHideButton => modifyProductFormTwoHideButton.onclick = () => {
    modifyProductFormTwo.hide();
    alertCover.hide();
});

// deleteProductForm 보여주기
deleteProductFormShowButtons.forEach(deleteProductFormShowButton => deleteProductFormShowButton.onclick = () => {
    deleteProductForm.show();
    alertCover.show(() => {
        alertCover.hide();
        deleteProductForm.hide();
    });
})

// deleteProductForm 숨기기
deleteProductFormHideButtons.forEach(deleteProductFormHideButton => deleteProductFormHideButton.onclick = () => {
    deleteProductForm.hide();
    alertCover.hide();
});


// 여기부터 Event
// addProductForm 보여주기
addEventFormShowButtons.forEach(addEventFormShowButton => addEventFormShowButton.onclick = () => {
    addEventForm.show();
    alertCover.show(() => {
        alertCover.hide();
        addEventForm.hide();
    });
});

// addEventForm 숨기기
addEventFormHideButtons.forEach(addEventFormHideButton => addEventFormHideButton.onclick = () => {
    addEventForm.hide();
    alertCover.hide();
});

// modifyEventForm 보여주기
modifyEventFormShowButtons.forEach(modifyEventFormShowButton => modifyEventFormShowButton.onclick = () => {
    modifyEventForm.show();
    alertCover.show(() => {
        alertCover.hide();
        modifyEventForm.hide();
    });
});

// modifyEventForm 숨기기
modifyEventFormHideButtons.forEach(modifyEventFormHideButton => modifyEventFormHideButton.onclick = () => {
    modifyEventForm.hide();
    alertCover.hide();
});

// modifyEventFormTwo 보여주기
modifyEventFormTwoShowButtons.forEach(modifyEventFormTwoShowButton => modifyEventFormTwoShowButton.onclick = () => {
    modifyEventFormTwo.show();
    alertCover.show(() => {
        alertCover.hide();
        modifyEventFormTwo.hide();
    });
});

// modifyEventFormTwo 숨기기
modifyEventFormTwoHideButtons.forEach(modifyEventFormTwoHideButton => modifyEventFormTwoHideButton.onclick = () => {
    modifyEventFormTwo.hide();
    alertCover.hide();
});

// deleteEventForm 보여주기
deleteEventFormShowButtons.forEach(deleteEventFormShowButton => deleteEventFormShowButton.onclick = () => {
    deleteEventForm.show();
    alertCover.show(() => {
        alertCover.hide();
        deleteEventForm.hide();
    });
})

// deleteEventForm 숨기기
deleteEventFormHideButtons.forEach(deleteEventFormHideButton => deleteEventFormHideButton.onclick = () => {
    deleteEventForm.hide();
    alertCover.hide();
});




