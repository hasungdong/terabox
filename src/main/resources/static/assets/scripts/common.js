const loginCancelButton = document.querySelector('[rel="loginCancel"]');
const alertCover = document.getElementById('alertCover');
const cover = document.getElementById('cover');
const loading = document.getElementById('loading');

// 로그인 취소 버튼 작동
if (loginCancelButton !== null){
    loginCancelButton.onclick = () => {
        loginForm.hide();
        cover.hide();
    }
}

// 스와이퍼 기능, 홈일 때랑 아닐 때 구분돼있음
if (document.querySelector('span.swiper-bar') !== null) {
    const leftSwiperButton = document.querySelector('button.left.swiper');
    const rightSwiperButton = document.querySelector('button.right.swiper');
    const swiperBars = document.querySelectorAll('span.swiper-bar');
    const page = document.querySelector('.current-page');
    const playButton = document.querySelector('img.play');
    const pauseButton = document.querySelector('img.pause');
    const events = document.querySelectorAll('.event-box > .event');
    const lessButton = document.querySelector('img.less');
    const moreButton = document.querySelector('img.more');

    const leftMoveEvent = () => {
        swiperBars[currentPage - 1].classList.remove('point');
        events.forEach(event => {
            event.style.left = `calc(${event.style.left} + (51.5%)`;
            let leftEventValue = 51.5 * (events.length - 1) + '%';
            if (event.style.left === `calc(${leftEventValue})`) {
                event.style.left = 'calc(-51.5%)';
            }
            if (event.style.left !== 'calc(0%)' &&
                event.style.left !== 'calc(51.5%)' &&
                event.style.left !== 'calc(-51.5%)' &&
                event.style.left !== 'calc(103%)') {
                event.style.display = 'none';
            } else {
                event.style.display = 'flex';
            }
        });

        currentPage--;
        if (currentPage < 1) {
            currentPage = events.length;
        }
        page.innerText = `${currentPage} / ${events.length}`;
        if (currentPage - 1 < 0) {
            swiperBars[events.length - 1].classList.add('point');
        } else {
            swiperBars[currentPage - 1].classList.add('point');
        }
    }

    const rightMoveEvent = () => {
        swiperBars[currentPage - 1].classList.remove('point');
        events.forEach(event => {
            event.style.left = `calc((-51.5%) + ${event.style.left}`;
            if (event.style.left === 'calc(-103%)') {
                // -51.5% * 2 = -103%
                event.style.left = `calc(51.5% * ${events.length - 2})`;
            }
            if (event.style.left !== 'calc(0%)' &&
                event.style.left !== 'calc(51.5%)' &&
                event.style.left !== 'calc(-51.5%)' &&
                event.style.left !== 'calc(103%)') {
                event.style.display = 'none';
            } else {
                event.style.display = 'flex';
            }
        });
        currentPage++;
        if (currentPage > events.length) {
            currentPage = 1;
        }
        page.innerText = `${currentPage} / ${events.length}`;
        if (currentPage + 1 > events.length + 1) {
            swiperBars[0].classList.add('point');
        } else {
            swiperBars[currentPage - 1].classList.add('point');
        }
    }

    let currentPage = 1;

    if (!(location.href.slice(-1) === '/' ||
        location.href.slice(-2) === '/#')) {
        let i = 0;
        page.innerText = `${currentPage} / ${events.length}`;

        swiperBars[0].classList.add('point');
        for (const event of events) {
            event.style.left = `calc((51.5%) * ${i})`;
            let leftEventValue = 51.5 * (events.length - 1) + '%';
            if (event.style.left === `calc(${leftEventValue})`) {
                // 이벤트가 3개가 안되면 2개가 그냥 제자리에 있어야 하니까
                if (events.length > 2){
                    event.style.left = 'calc(-51.5%)';
                }
            }
            i++;
            if (event.style.left !== `calc(0%)` &&
                event.style.left !== `calc(51.5%)` &&
                event.style.left !== 'calc(-51.5%)' &&
                event.style.left !== 'calc(103%)') {
                event.style.display = 'none';
            } else {
                event.style.display = 'flex';
            }

            lessButton.onclick = () => {
                // 화면이 넘어가는 중에 버튼 또 누르는거 방지
                lessButton.disable();
                leftSwiperButton.disable();
                moreButton.disable();
                rightSwiperButton.disable();
                leftMoveEvent();
                const showAgain = setTimeout(() => {
                    lessButton.enable();
                    leftSwiperButton.enable();
                    moreButton.enable();
                    rightSwiperButton.enable();
                }, 600);
            }
            leftSwiperButton.onclick = () => {
                lessButton.disable();
                leftSwiperButton.disable();
                moreButton.disable();
                rightSwiperButton.disable();
                leftMoveEvent();
                const showAgain = setTimeout(() => {
                    lessButton.enable();
                    leftSwiperButton.enable();
                    moreButton.enable();
                    rightSwiperButton.enable();
                }, 600);
            }
            moreButton.onclick = () => {
                lessButton.disable();
                leftSwiperButton.disable();
                moreButton.disable();
                rightSwiperButton.disable();
                rightMoveEvent();
                const showAgain = setTimeout(() => {
                    lessButton.enable();
                    leftSwiperButton.enable();
                    moreButton.enable();
                    rightSwiperButton.enable();
                }, 600);
            }
            rightSwiperButton.onclick = () => {
                lessButton.disable();
                leftSwiperButton.disable();
                moreButton.disable();
                rightSwiperButton.disable();
                rightMoveEvent();
                const showAgain = setTimeout(() => {
                    lessButton.enable();
                    leftSwiperButton.enable();
                    moreButton.enable();
                    rightSwiperButton.enable();
                }, 600);
            }
        }
        events.forEach(event => {
            if (event.style.left === `calc(51.5% * ${events.length - 1})`) {
                event.style.left = 'calc(-51.5%)';
            }
            if (event.style.left !== 'calc(0%)' &&
                event.style.left !== 'calc(51.5%)' &&
                event.style.left !== 'calc(-51.5%)' &&
                event.style.left !== 'calc(103%)') {
                event.style.display = 'none';
            } else {
                event.style.display = 'flex';
            }
        });
        playButton.onclick = () => {
            playButton.style.display = 'none';
            pauseButton.style.display = 'flex';
            const play = setInterval(rightMoveEvent, 3000);
            pauseButton.onclick = () => {
                playButton.style.display = 'flex';
                pauseButton.style.display = 'none';
                clearInterval(play);
            }
        }
    }
}




class MessageObj {
    static cover = null;
    static stack = [];

    static createSimpleOk = (title, content, onclick) => {
        return new MessageObj({
            title: title,
            content: content,
            buttons: [
                {
                    text: '확인',
                    onclick: (obj) => {
                        obj.hide();
                        if (typeof onclick === 'function') {
                            onclick(obj);
                        }
                    }
                }
            ]
        })
    }

    element;

    constructor(params) {
        if (MessageObj.cover === null) {
            const cover = document.createElement('div');
            cover.classList.add('_obj-dialog-cover');
            MessageObj.cover = cover;
            document.body.prepend(cover);
        }
        params.buttons ??= [];
        const element = new DOMParser().parseFromString(`
            <div class="_obj-message">
            <div class="title-bar">
                <div class="__title">${params.title}</div>
                <div class="spring"></div>
                <button type="button" rel="alertCancel"></button>
</div>
                <div class="__content">
                ${params.content}
                
</div>
            </div>`, 'text/html').querySelector('._obj-message');
        if (params.buttons.length > 0) {
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('__button-container');
            for (const buttonObject of params.buttons) {
                const button = document.createElement('button');
                button.classList.add('__button');
                button.setAttribute('type', 'button');
                button.innerText = buttonObject.text;
                if (typeof buttonObject.onclick === 'function') {
                    button.onclick = () => {
                        buttonObject.onclick(this);
                    };
                }
                buttonContainer.append(button);
            }
            element.querySelector(':scope > .__content').append(buttonContainer);
        }
        document.body.prepend(element);
        this.element = element;
        // 닫기버튼 누르면 없어지는 거 구현
        element.querySelector('[rel=alertCancel]').onclick = () => {
            this.element.hide();
            setTimeout(() => this.element.remove(), 1000);
            if (alertCover !== null){
                alertCover.hide();
            }
            if (cover !== null){
                cover.hide();
            }
        }
    }

    hide() {
        MessageObj.stack.splice(MessageObj.stack.indexOf(this.element), 1);
        setTimeout(() => {
            if (MessageObj.stack.length === 0) {
                MessageObj.cover.hide();
            }
            this.element.hide();
            // 여길 해줘서 이제 메세지는 hide를 하면 숨겨지고 잠시 뒤에 삭제가 된다.
            setTimeout(() => this.element.remove(), 1000);
        }, 100);
    }

    show() {    // 여기 적혀있는 show는 클래스에 선언하는 메서드라서 prototype.show가 아니다.
        // 그래서 위의 show를 호출하고 싶으면 this.show()를 해야함
        MessageObj.stack.push(this.element);
        setTimeout(() => {
            MessageObj.cover.show();
            this.element.show();    //지금 element는 div이기 때문에 prototype.show를 호출한다.
        }, 100);
    }
}

class LabelObj {
    element;

    constructor(element) {
        this.element = element;
    }

    isValid() {
        return !this.element.classList.contains(HTMLElement.INVALID_CLASS_NAME);
    }

    setValid(b) {
        if (b === true) {
            this.element.classList.remove(HTMLElement.INVALID_CLASS_NAME);
        }
        if (b === false) {
            this.element.classList.add(HTMLElement.INVALID_CLASS_NAME);
        }
        return this;
    }
}

HTMLElement.INVALID_CLASS_NAME = '-invalid';
HTMLElement.VISIBLE_CLASS_NAME = '-visible';

HTMLElement.prototype.disable = function () {
    this.setAttribute('disabled', '');
    return this;
}

HTMLElement.prototype.enable = function () {
    this.removeAttribute('disabled');
    return this;
}

HTMLElement.prototype.hide = function () {
    this.classList.remove(HTMLElement.VISIBLE_CLASS_NAME);
    return this;
}

HTMLElement.prototype.show = function () {
    this.classList.add(HTMLElement.VISIBLE_CLASS_NAME);
    return this;
}

HTMLInputElement.prototype.tests = function () {
    if (typeof this.dataset.regex !== 'string') {
        // 정규식이 없는 상태라는 뜻
        // 정규식이 없으면 검사할게 없으니 무조건 안전한 값이므로 true를 반환
        return true;
    }
    if (typeof this._regExp === 'undefined') {
        this._regExp = new RegExp(this.dataset.regex);
    }
    return this._regExp.test(this.value);
}

HTMLTextAreaElement.prototype.tests = function () {
    if (typeof this.dataset.regex !== 'string') {
        return true;
    }
    if (typeof this._regExp === 'undefined') {
        this._regExp = new RegExp(this.dataset.regex);
    }
    return this._regExp.test(this.value);
}

HTMLElement.prototype.isEnabled = function () {
    return !this.hasAttribute('disabled');
}




cover.show = (onclick) => {
    cover.onclick = onclick;
    cover.classList.add(HTMLElement.VISIBLE_CLASS_NAME);
}

alertCover.show = (onclick) => {
    alertCover.onclick = onclick;
    alertCover.classList.add(HTMLElement.VISIBLE_CLASS_NAME);
}