const checkAll = document.getElementById('checkAll'); // 필수항목 전체선택
const checkboxes = document.getElementsByName(`item`); // 필수항목 아이템들


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