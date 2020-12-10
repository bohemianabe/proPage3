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

// funciton for the active project ul list in portfolio section 
function projActive(e, index, div){
    const project = e.target
    projNum = e.target.getAttribute('dataset')
    indexNum = index.getAttribute('dataset')
    projectNames.forEach(proj => {
        const nodes = proj.childNodes
        proj.classList.remove('active')
        if(nodes[1]){
        nodes[1].remove()
        }
    });
    if(Number(projNum) == indexNum){
        e.target.classList.add('active');
        const newDiv = document.createElement("div")
        newDiv.classList.add("project-line")
        project.appendChild(newDiv)

    }

}

// animation for the green line in portfolio seciton
function lineFadeAnim(e){
    const project = e.target.childNodes[1];
    if(project){
        gsap.fromTo(project, {opacity: 0, width: "0%" }, {opacity: 1, width: "100%", duration: 1.2, ease: 'power2.inOut'})
    }

}

// animation for the example-project slides
function projectSlides(e, index){
    const clickIndex = index
    const exampleProjects = document.querySelectorAll('.example-project')
    const projectImg = document.querySelectorAll('.example-project img')
    exampleProjects.forEach((div, index) => {
        if(index != clickIndex){
            div.classList.remove('active')
        } else {
            div.classList.add('active')
        }
        gsap.fromTo(projectImg, {boxShadow: 'rgb(255, 255, 255) 0px 0px 30px' }, 
        { boxShadow: 'rgb(4, 4, 4) 0px 0px 30px', duration: 1.2, ease: 'power3.in'})
        gsap.fromTo(div, {opacity: 0, scale: .8, x: "-50%"}, {opacity: 1, scale: 1, x: "0%", duration: 1.2, ease: "slow (0.3, 0.4, false)"})
    })
}

projectNames.forEach((div, index) => {
    div.addEventListener('click', (e) => {
        projActive(e, div, index)
        lineFadeAnim(e)
        projectSlides(e, index)
    })
})

// burger animation 
burger.addEventListener('click', navToggle);
introAnimation()
