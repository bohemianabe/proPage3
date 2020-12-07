let controller;
const burger = document.querySelector('.burger');
const projectNames = document.querySelectorAll('.project')

// functions
function introAnimation (){
    // init controller
    controller = new ScrollMagic.Controller();
    // select some things
    const titleBanner = document.querySelector('.title-banner')
    const nav = document.querySelector('.nav-header')
    // gsap
    gsap.fromTo(titleBanner, {opacity: 0}, { opacity: 1, duration: 3, ease: 'power2.inOut'})
    gsap.fromTo(nav, {y: '-150%'}, {y: '0%', duration: 4, ease: 'power4.out'}, '=-1.5')
}

function navToggle(e){
    const navHeader = document.querySelector('.nav-header')
    const burger = document.querySelector('.burger')
    const navList = document.querySelectorAll('.nav-index li a')
    if(e.target.classList.contains('active')){
     gsap.to('.line1', 0.5, {rotate: '0', y: 0})
     gsap.to('.line2', 0.5, {rotate: '0', y: 0})
     gsap.to('.nav-bar', 1, {clipPath: 'circle(30px at 100% -10%)'})
     e.target.classList.remove('active')
     gsap.to(navHeader, 1, { ease: "power1.out", background: "#b9bfc4"})
     gsap.to(navList, 2, {color: "#374054", pointerEvents: 'auto'})
     document.body.classList.remove('hide')
    } else {
     gsap.to('.line1', 0.5, {rotate: '45', y: 5})
     gsap.to('.line2', 0.5, {rotate: '-45', y: -5})
     gsap.to('.nav-bar', 1, {clipPath: 'circle(3000px at 100% -10%)'})
     e.target.classList.add('active')
     gsap.to(navHeader, 0.2, {background: "white"})
     gsap.to(navList, 0.2, {color: "white", pointerEvents: 'none'})
     document.body.classList.add('hide')
    //  navHeader.style.background = 'white'
    }
}

function projActive(e, index, div){
    projNum = e.target.getAttribute('dataset')
    indexNum = index.getAttribute('dataset')
    projectNames.forEach(proj => {
        proj.classList.remove('active')
    });
    if(Number(projNum) == indexNum){
        e.target.classList.add('active');
    }

    console.log(typeof(projNum), typeof indexNum)
}

projectNames.forEach((div, index) => {
    div.addEventListener('click', (e) => {
        projActive(e, div, index)
    })
})

// burger animation 
burger.addEventListener('click', navToggle);
introAnimation()
