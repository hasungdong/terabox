const txt = document.querySelector('.txt');
const close = document.querySelector('.close');
const more = document.querySelector('.more');


if (txt !== null){
    document.querySelectorAll('.btn').forEach(movieMoreButton => {
        let Visible = false;
        movieMoreButton.onclick = () => {
            if (Visible) {
                txt.hide();
                close.hide();
                more.hide();

            } else {
                txt.show();
                close.show();
                more.show();
            }
            Visible = !Visible;
        };
    });
}

// 영화 디테일 관람평 쓰기 로그인 안됐을때 알림창 뜨는거



/*관람평 작성하기 창 띄우는*/
const ReviewComments = document.querySelector('.comments');
document.querySelectorAll('.tooltip-click').forEach(ReviewButton => {
    let Visible = false;
    ReviewButton.onclick = () => {
        if (Visible) {
            ReviewComments.hide();

        } else {
            ReviewComments.show();

        }
        Visible = !Visible;
    }
});


const CommentClick = document.querySelector('.CommentClick');
if (CommentClick !== null){
    CommentClick.onclick = () =>{
        alertCover.show();
        new MessageObj({
            title: '알림',
            content: '로그인 후 이용가능한 서비스입니다 <br> 로그인하시겠습니까?',
            buttons: [
                {
                    text: '취소', onclick: instance => {
                        instance.hide();
                        alertCover.hide();
                    }
                },
                {
                    text: '확인', onclick: instance => {
                        instance.hide();
                        showLogin();
                        alertCover.hide();
                    }
                }
            ]
        }).show();

    }
}



/* 평점 옵션에서 선택 했을떄 값 들어가는 로직 (다른거 선택할떄 마다 바뀌게 해줄려고 change 사용함 )*/
// ratingSelect.addEventListener('change', (event) => {
//     const ratingValue = event.target.value;
//     console.log(ratingValue);
// });
//
// /* 영화 (배우,스토리 등등) 옵션에서 선택 했을떄 값 들어가는 로직 (다른거 선택할떄 마다 바뀌게 해줄려고 change 사용함 )*/
// movieKeyword.addEventListener('change', (event) => {
//     const KeywordValue = event.target.value;
//     console.log(KeywordValue);
// });


/*  리뷰 작성하게 눌렀을때 onsubmit 요청 가는곳  */

const submitButton = document.querySelector('.write');

/*영화 디테일 리뷰 내용 넘기기*/

const grade = document.getElementById('rating'); //평점

const favorite = document.getElementById('movieKeyword');

const content = document.querySelector('.review'); //리뷰 내용

const movieForm = document.getElementById('movieForm');

const index = document.querySelector('.index');

movieForm.reviewLabel = new LabelObj(movieForm.querySelector('[rel="reviewLabel"]'));

/* 리뷰 작성하기 눌렀을때 값이 DB에 들어가는 로직 */
movieForm.onsubmit = e => {
    e.preventDefault(); //서브밋 할때 꼭 해주기

    movieForm.reviewLabel.setValid(movieForm['review'].value.length > 0);
    /*movieForm['review'] input 태그에 이름이 review 인것을 가져와주는것 */
    //리뷰 글자수가 1보다 크도록

    if (!movieForm.reviewLabel.isValid()) {
        return;
    }

    // if (content.value.length < 1) {
    //     return;
    // }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('movieIndex', index.value);
    formData.append('grade', grade.value);
    formData.append('favorite', favorite.value);
    formData.append('content', content.value);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            alert('요청 실패');

            return;
        }

        const responseObject = JSON.parse(xhr.responseText);
        switch (responseObject.result) {
            case 'success' :
                location.reload();
                // alertCover.show()
                // new MessageObj({
                //     title: '알림',
                //     content: '리뷰작성이 성공하였습니다.',
                //     buttons: [
                //         {
                //             text: '확인', onclick: instance => {
                //                 instance.hide();
                //                 alertCover.hide();
                //                 location.reload();
                //             }
                //         }
                //     ]
                // }).show();
                break;

            case 'failure':
                alertCover.show()
                new MessageObj({
                    title: '알림',
                    content: '리뷰 작성이 실패하였습니다.',
                    buttons: [
                        {
                            text: '확인', onclick: instance => {
                                instance.hide();
                                alertCover.hide();
                            }
                        }
                    ]
                }).show();
                break;

            default:
                alertPopup.hide();
                cover.hide();
                alertCover.show()
                new MessageObj({
                    title: '알림',
                    content: '요청이 실패했습니다.',
                    buttons: [
                        {
                            text: '확인', onclick: instance => {
                                instance.hide();
                                alertCover.hide();
                            }
                        }
                    ]
                }).show();
                break;
        }

    }
    xhr.open(`POST`, `/movie/movieComment`);
    xhr.send(formData);

}

document.querySelectorAll('.btn-alert').forEach(alertButton => {
    let Visible = false;
    alertButton.onclick = () => {
        if (Visible) {
            alertButton.nextElementSibling.hide();
            /*신고하기 버튼이 안떴던 이유는 querySelector 을 해서임. nextElementSibling 해주면 밑에 형제가 다 선택되기 때문에 되는것임 */
        } else {
            alertButton.nextElementSibling.show();
        }
        Visible = !Visible;
    }
});


/* 좋아요 누르면 DB에 댓글 index 를 보내주고 그 댓글에 어떤 이메일이 좋아요 눌렀을지 들어감으로써 한사람당 댓글에 하나의 좋아요만 눌러질수 있도록 하는것 */



//영화 좋아요 눌렀을때 로그인 안됐을시 막기
const logAlert = document.querySelector('.logAlert');

if (logAlert != null){
    logAlert.onclick = () =>{
        alertCover.show();
        new MessageObj({
            title: '알림',
            content: '로그인 후 이용가능한 서비스입니다 <br> 로그인하시겠습니까?',
            buttons: [
                {
                    text: '취소', onclick: instance => {
                        instance.hide();
                        alertCover.hide();
                    }
                },
                {
                    text: '확인', onclick: instance => {
                        instance.hide();
                        showLogin();
                        alertCover.hide();
                    }
                }
            ]
        }).show();
    }
}




const MovieLIkeButton = document.querySelectorAll('.btn-like');
const blueHeart = document.querySelector('.blue-heart');
const whiteHeat = document.querySelector('.fa-regular');

MovieLIkeButton.forEach(MovieLIkeButtons => {
    MovieLIkeButtons.onclick = () => {

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('movieIndex', index.value);

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }
            if (xhr.status < 200 || xhr.status >= 300) {

                return;
            }

            const responseObject = JSON.parse(xhr.responseText);
            // comment.querySelectorAll('.commentLike'); ??

            switch (responseObject.movieLikeToggle) {
                case 'success' :
                    location.reload();
                    //
                    // /*로그인 성공 했을떄 영화 좋아요에 초록색 아이콘 뜬채로 저장될수 있게 */
                    //
                    // new MessageObj({
                    //     title: '알림',
                    //     content: '영화 좋아요 성공.',
                    //     buttons: [
                    //         {
                    //             text: '확인', onclick: instance => {
                    //                 instance.hide();
                    //                 alertCover.hide();
                    //                 location.reload(); //타임리프이기떄문에 새로고침을 해줘야 좋아요 숫자가 뜸
                    //             }
                    //         }
                    //     ]
                    // }).show();
                    break;

                case 'failure':
                    alertCover.show()
                    new MessageObj({
                        title: '알림',
                        content: '영화 좋아요 실패',
                        buttons: [
                            {
                                text: '확인', onclick: instance => {
                                    instance.hide();
                                    alertCover.hide();
                                }
                            }
                        ]
                    }).show();
                    break;

                default:
                    alertPopup.hide();
                    cover.hide();
                    alertCover.show()
                    new MessageObj({
                        title: '알림',
                        content: '요청이 실패했습니다.',
                        buttons: [
                            {
                                text: '확인', onclick: instance => {
                                    instance.hide();
                                    alertCover.hide();
                                }
                            }
                        ]
                    }).show();
                    break;
            }


        }
        xhr.open(`POST`, `/movie/movieLike`);
        xhr.send(formData);


    }

})



/*최신순 , 공감 , 평점 순*/

const reviewDetailButtons = document.querySelectorAll('.orderBtn');

const showComments = (page, by) => {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            return;
        }

        const responseObject = JSON.parse(xhr.responseText);
        const movieCommentDtos = responseObject['movieCommentDtos'];
        const searchDto = responseObject['searchDto'];
        const typeOnes = document.querySelectorAll('.type01');

        typeOnes.forEach(typeOne => typeOne.remove());

        for (const reviewObject of movieCommentDtos) {
            const reviewEl = new DOMParser().parseFromString(`
              <li class="type01 oneContentTag">
                <div class="story-area">
                    <div class="user-prof">
                        <div class="prof-img">
                            <img src="https://www.megabox.co.kr/static/pc/images/mypage/bg-photo.png" alt="프로필 사진" title="프로필 사진">
                        </div>
                        <p class="user-id">${reviewObject['userEmail']}</p>
                    </div>
                    <div class="story-box">
                        <div class="story-wrap review">
                            <div class="tit">관람평</div>
                            <div class="story-cont">
                                <div class="story-point">
                                    <span>${reviewObject['grade']}</span>
                                </div>
                                <div class="story-recommend">
                                    <em>${reviewObject['favorite']}</em>
                                </div>
                                <div class="story-txt">${reviewObject['content']}
                                </div>
                                <div class="spring" style="flex-grow: 1"></div>
                                <div class="story-like">
                                    <button type="button" class="oneLikeBtn good2" title="댓글 추천" data-no="2933061"
                                            data-is="N" data-signed="${responseObject['signed']}">
                                        <img src="/assets/images/commtent/ico-like-gray.png" class="iconset ico-like-gray">
                                      <span>${reviewObject['commentLikeCount']}</span>
                                    </button>
                                </div>
                                <div class="story-util">
                                    <label>
                                        <input hidden="hidden" class="commentIndex" value="${reviewObject['index']}"> 
                                    </label>
                                    <div class="post-funtion">
                                        <div class="wrap">
                                            <button type="button" class="btn-alert">
                                                <i class="fa-solid fa-ellipsis-vertical"
                                                   style="color: #9e9e9e;"></i>
                                            </button>
                                            <div class="balloon-space user">
                                                <div class="balloon-cont">
                                                    <div class="user">
                                                        <p class="reset a-c">스포일러 및 욕설/비방하는
                                                            <br>
                                                            내용이 있습니까?
                                                        </p>
                                                        <button type="button" class="maskOne" data-no="2933061">
                                                            댓글 신고
                                                            <i class="iconset ico-arr-right-green"></i>
                                                        </button>
                                                    </div>
                                                    <div class="btn-close">
                                                        <a title="닫기">
                                                            <i class="fa-solid fa-x fa-xs"
                                                               style="color: #919191;"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<!--                <div class="story-date">-->
<!--                    <div class="review on">-->
<!--                        <span>16 분전</span>-->
<!--                    </div>-->
<!--                </div>-->
                <input type="hidden" name="isSaved" value="${reviewObject['saved']}">
            </li>
        `, 'text/html').querySelector('li');


            /*댓글 좋아요 눌렀을때  파란색 아이콘 들어가게 하는 로직*/


            if (reviewEl.querySelector('input[type="hidden"]').value === 'true'){
                //true 가 좋아요 눌러져있을때
                reviewEl.querySelector('.iconset').setAttribute('src', '/assets/images/commtent/ico-like-blue.png')
            } else {
                //좋아요 안눌러져 있을때
                reviewEl.querySelector('.iconset').setAttribute('src', '/assets/images/commtent/ico-like-gray.png')
            }
            movieForm.querySelector(':scope > ul').append(reviewEl); // ul 에 reviewEl 을 붙여준다.
        }

        /* 댓글 순서 만큼 밑에 1,2,3,4  요렇게 나타내는 페이지 */
        const pagination = document.querySelector('.pagination');
        if (pagination !== null) {
            pagination.innerHTML = '';

            const searchDtoJSON = JSON.parse(searchDto);
            for (let i = 1; i <= searchDtoJSON['maxPage']; i++) {
                const page = new DOMParser().parseFromString(`
            <a class="page">${i}</a>
            `, 'text/html').querySelector('a');
                if (i.toString() === searchDtoJSON['requestPage']) {
                    page.classList.add('active');
                }
                pagination.append(page);
            }

            const pages = pagination.querySelectorAll(':scope > .page');

            pages.forEach(page => {
                page.onclick = () => {
                    showComments(page.innerText, by); //페이지 안에 있는 값 이걸로 컨트롤러에 보내주는것 !
                }
            })
        }

        setTimeout(() => {
            document.querySelectorAll('.btn-alert').forEach(alertButton => {
                let Visible = false;
                alertButton.onclick = () => {
                    if (Visible) {
                        alertButton.nextElementSibling.hide();
                        /*신고하기 버튼이 안떴던 이유는 querySelector 을 해서임. nextElementSibling 해주면 밑에 형제가 다 선택되기 때문에 되는것임 */
                    } else {
                        alertButton.nextElementSibling.show();
                    }
                    Visible = !Visible;
                }
            });
        }, 600);

        setTimeout(() => {
            const balloonSpaces = document.querySelectorAll('.balloon-space')
            balloonSpaces.forEach(balloonSpace => {
                balloonSpace.querySelector('.btn-close').onclick = () => {
                    balloonSpace.hide();
                }
            })
        }, 600)
    }
    xhr.open(`GET`, `/movie/movieReviews?index=${document.querySelector('.index').value}&by=${by}&page=${page}`);
    xhr.send();
}

/* 화면 처음 들어왔을때 실행되는 함수로직 */
window.onload = () => {
    showComments(1, null);
    reviewDetailButtons.forEach(reviewDetailButton => {
        reviewDetailButton.onclick = () => {
            let by;
            if (reviewDetailButton.classList.contains('newest')) {
                by = 'newest';

            } else if (reviewDetailButton.classList.contains('sympathy')) {
                by = 'sympathy';

            } else if (reviewDetailButton.classList.contains('grade')) {
                by = 'grade';

            } else {
                by = null;
            }

            showComments(1, by);
        }
    });

    setTimeout(() => {
        const comments = document.querySelectorAll('.type01');

        comments.forEach(comment => {
            const submits = comment.querySelectorAll('.oneLikeBtn');
            submits.forEach(LikeButton => {
                LikeButton.onclick = () => {
                    //댓글에 좋아요 눌렀을때 null 이면 막는거 자바스크립트 로직
                    // alert(sessionStorage.getItem('user'));
                    if (LikeButton.dataset.signed !== 'true'){
                        // alertCover.show();
                        new MessageObj({
                            title: '알림',
                            content: '로그인 후 이용가능한 서비스입니다 <br> 로그인하시겠습니까?',
                            buttons: [
                                {
                                    text: '취소', onclick: instance => {
                                        instance.hide();
                                        alertCover.hide();
                                    }
                                },
                                {
                                    text: '확인', onclick: instance => {
                                        instance.hide();
                                        showLogin();
                                        alertCover.hide();
                                    }
                                }
                            ]
                        }).show();
                        return; // 댓글에 좋아요가 눌리면 안되기 떄문
                    }




                    const commentIndex = comment.querySelector('.commentIndex');
                    const xhr = new XMLHttpRequest();
                    const formData = new FormData();

                    formData.append('movieCommentIndex', commentIndex.value);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState !== XMLHttpRequest.DONE) {
                            return;
                        }
                        if (xhr.status < 200 || xhr.status >= 300) {
                            alert('댓글 좋아요 실패');
                            return;
                        }

                        const responseObject = JSON.parse(xhr.responseText);
                        // comment.querySelectorAll('.commentLike'); ??

                        switch (responseObject.likeResult) {
                            case 'success' :
                                location.reload();
                                // alertCover.show()
                                // new MessageObj({
                                //     title: '알림',
                                //     content: '좋아요 성공.',
                                //     buttons: [
                                //         {
                                //             text: '확인', onclick: instance => {
                                //                 instance.hide();
                                //                 alertCover.hide();
                                //                 location.reload();
                                //             }
                                //         }
                                //     ]
                                // }).show();
                                break;

                            case 'failure':
                                alertCover.show()
                                new MessageObj({
                                    title: '알림',
                                    content: '좋아요 실패',
                                    buttons: [
                                        {
                                            text: '확인', onclick: instance => {
                                                instance.hide();
                                                alertCover.hide();
                                            }
                                        }
                                    ]
                                }).show();
                                break;

                            default:
                                alertPopup.hide();
                                cover.hide();
                                alertCover.show()
                                new MessageObj({
                                    title: '알림',
                                    content: '요청이 실패했습니다.',
                                    buttons: [
                                        {
                                            text: '확인', onclick: instance => {
                                                instance.hide();
                                                alertCover.hide();
                                            }
                                        }
                                    ]
                                }).show();
                                break;
                        }
                    }
                    xhr.open(`POST`, `/movie/movieCommentLike`);
                    xhr.send(formData);
                }
            })
        })
    }, 600);

    setTimeout(() => {
        document.querySelectorAll('.btn-alert').forEach(alertButton => {
            let Visible = false;
            alertButton.onclick = () => {
                if (Visible) {
                    alertButton.nextElementSibling.hide();
                    /*신고하기 버튼이 안떴던 이유는 querySelector 을 해서임. nextElementSibling 해주면 밑에 형제가 다 선택되기 때문에 되는것임 */
                } else {
                    alertButton.nextElementSibling.show();
                }
                Visible = !Visible;
            }
        });
    }, 600);

    setTimeout(() => {
        const balloonSpaces = document.querySelectorAll('.balloon-space')
        balloonSpaces.forEach(balloonSpace => {
            balloonSpace.querySelector('.btn-close').onclick = () => {
                balloonSpace.hide();
            }
        })
    }, 600)

    if (document.querySelector('.saved') !== null){
        document.querySelector('.blueHeart').classList.add('-visible');
        document.querySelector('.whiteHeart').classList.remove('-visible');

        }else {
        document.querySelector('.blueHeart').classList.remove('-visible');
        document.querySelector('.whiteHeart').classList.add('-visible')
    }
}



