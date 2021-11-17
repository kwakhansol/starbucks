const searchEl = document.querySelector('.search');
const searchInputEl = searchEl .querySelector('input');

searchEl.addEventListener('click', function() {
    searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function() {
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder','통합검색');
});


searchInputEl.addEventListener('blur', function() {
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder','');
});


const badgeEl = document.querySelector('.badges');
const toTopEl = document.querySelector('#to-top');
window.addEventListener('scroll', _.throttle(function(){
    console.log(window.scrollY);
    if(window.scrollY > 500){
        // 배지 숨기기(라이브러리사용전)
        // badgeEl.style.display = 'none';

        // gsap.to(애니메이션 처리할 요소,애니메이션 지속시간, 옵션)
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display: 'none'
            // ㄴ> display none을 하지않으면, opacity값만 조정해주기 때문에 
            //     유저들은 클릭할수있는 이슈가있다. display값을 조정해주어야한다.
        });
        // 버튼 보이기 (to-top)
        gsap.to(toTopEl, .2,{
            x:0
        })
    } else{
        // 배지 보이기
        // badgeEl.style.display = 'block';

        gsap.to(badgeEl, .6, {
            opacity:1,
            display : 'block'
        });
        // 버튼 숨기기
        gsap.to(toTopEl, .2,{
            x:100
        });
    }
}, 300));

// 윈도우 객체라는것은 출력되는 화면 그 자체인데, 거기에 scroll 이벤트를 추가하여 스크롤 할때마다 함수가 실행되도록 하겠다.
//함수가 너무 많이 실행되기 떄문에 우리는 lodash 라이브러리를 사용한다.

// lodash 라이브러리 사용
// _.throttle() 메소드를 실행.
// _.throttle(함수, 시간)

toTopEl.addEventListener('click', function(){
    gsap.to(window, .7, {
        scrollTo:0
    })
});




const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
    // gsap.to(애니메이션 처리할 요소,애니메이션 지속시간, 옵션)
    gsap.to(fadeEl, 1, {
        // index는 0베이스기때문에 0부터 시작해서 1을 더해주어야 한다.
        // 0.7초에 1번째 요소, 1.4초에 2번째 요소, 2.1초, 2.7초
        // 순차적으로 opacity값을 1로 바꾸도록 delay 라이브러리를 통해 자동화시켜주자
        delay: (index + 1) * .5,
        opacity: 1
    });
});

//공지사항  swiper
// new Swiper(선택자,옵션)
// new Swiper라는 함수를 실행해서 1번째 인수는 선택자, 2번째 인수는 옵션을 추가해서 swipe의 기능을 만들어낸다
new Swiper('.notice-line .swiper-container', {
    direction:'vertical',
    autoplay: true,
    loop: true
    //loop 반복재생여부
});


new Swiper('.promotion .swiper-container',{
    slidesPerView :3, //한번에 보여줄 슬라이드의 개수
    spaceBetween:10, // 슬라이드 사이의 여백
    centeredSlides :true, //1번 슬라이드가 가운데 보이기
    loop : true, //반복재생여부
    autoplay : {
        delay : 3000
    },
    pagination:{
        //swiper.js 내부에서 promotion이라는 클래스의 후손인 swiper-pagination요소의 페이지 번호를 사용할수 있도록 해줌
        // 페이지 번호 요소 선택자 ▽
        el: '.promotion .swiper-pagination' , 
        clickable: true , //사용자의 페이지 번호 요소 제어, 사용자가 클릭하여 페이지를 지정할수있는지
    },
    navigation:{ // 이옵션을 통해 prev, next의 기능을 사용할 수 있다.
        prevEl:'.promotion .swiper-prev',
        nextEl:'.promotion .swiper-next'
    }
});


new Swiper('.awards .swiper-container', {
    autoplay:true,
    loop:true,
    spaceBetween: 30,
    slidesPerView:5,
    navigation:{
        prevEl:'.awards .swiper-prev',
        nextEl:'.awards .swiper-next'
    }
});


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; // 숨겨져있니? false
promotionToggleBtn.addEventListener('click', function(){
    isHidePromotion = !isHidePromotion
    if(isHidePromotion){
        //숨김처리
        promotionEl.classList.add('hide');
    }else{
        //보임처리
        promotionEl.classList.remove('hide' );
    }
});


function floatingObject(selector){
    // gsap.to(요소,시간,옵션)
    gsap.to(selector, 1, {
        y:20,
        repeat:-1,
        yoyo:true
    });
}
floatingObject('.floating');


// scrollMagic lib..

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
    new ScrollMagic
        .Scene({
            triggerElement : spyEl, // 보여짐 여부를 감시할 요소를 지정
            triggerHook : .8
            // 보여짐 여부를 감시하는 hook이 걸려있기 때문에 0.8위치에 걸리면 trigger가 실행이되더라.
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});


// 올해가 몇년도인지 계산하는 script

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //2021이 나온다.
// textContent 요소가 가지고있는 값을 알아내거나 지정하는 요소