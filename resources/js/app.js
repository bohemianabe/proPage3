let controller;
const burger = document.querySelector('.burger');

// functions
function introAnimation (){
    // init controller
    controller = new ScrollMagic.Controller();
    // select some things
    const titleBanner = document.querySelector('.title-banner')
    const nav = document.querySelector('.nav-header')
    // gsap
    gsap.fromTo(titleBanner, {opacity: 0}, { opacity: 1, duration: 3, ease: 'power2.inOut'})
    gsap.fromTo(nav, {y: '-100%'}, {y: '0%', duration: 4, ease: 'power4.out'}, '=-1.5')
}

function navToggle(e){
    gsap.to('.line1', 0.5, {rotate: '45', y: 5})
    gsap.to('.line2', 0.5, {rotate: '-45', y: -5})
    gsap.to('.nav-bar', 1, {clipPath: 'circle(3000px at 100% -10%)'})
}

// burger animation 
burger.addEventListener('click', navToggle);
introAnimation()
