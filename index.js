document.addEventListener('DOMContentLoaded', function() {

    const menuBtn = document.querySelector('.hbgbtn');  // 메뉴 버튼
    const menu = document.querySelector('.menu');        // 메뉴 요소

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
});