const checkAll = document.getElementById('checkAll'); // 필수항목 전체선택
const checkboxes = document.getElementsByName(`item`); // 필수항목 아이템들

const checkbox1 = document.getElementById('checkbox1');
const checkbox2 = document.getElementById('checkbox2');
const button = document.getElementById('submit-button');

button.disabled = true;

checkbox1.onchange = function() {
    updateButtonState();
};

checkbox2.onchange = function() {
    updateButtonState();
};

checkAll.onchange = function() {
    checkbox1.checked = this.checked;
    checkbox2.checked = this.checked;
    updateButtonState();
};

function updateButtonState() {
    const bothChecked = checkbox1.checked && checkbox2.checked;
    button.disabled = !bothChecked;
}

button.onclick = function() {
    window.location.href = 'register/registerThree';
};


// 필수항목 전체선택을 클릭시 함수실행
checkAll.onclick = function() {
    Array.from(checkboxes).forEach(checkbox => {
        checkbox.checked = this.checked;
    });
}

// 개별 체크박스 선택 시 전체 선택 체크박스 상태 변경
Array.from(checkboxes).forEach(checkbox => {
    checkbox.onclick = function() {
        checkAll.checked = Array.from(checkboxes).every(c => c.checked);
    }
});

