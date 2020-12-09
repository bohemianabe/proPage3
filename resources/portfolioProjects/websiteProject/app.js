let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlides() {
  // init Controller
  controller = new ScrollMagic.Controller();
  // select items
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    // GSAP
    const slideTl = gsap.timeline({
      default: { duration: 1, ease: "power2.inOut" },
    });
    //   set the rules
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 });
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "1");
    // create the scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide",
      // })
      .addTo(controller);
    //   new animation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    // create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      // .addIndicators({
      //   colorStart: "blue",
      //   colorTrigger: "blue",
      //   name: "page",
      //   indent: 200,
      // })
      //   this pins the 'slide' section to the center of the screen instead of moving it
      //   pushFollowers stops the pin-spacer that runs inbetween
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}
let mouse = document.querySelector(".cursor");
let mouseText = mouse.querySelector("span");
const burger = document.querySelector(".burger");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseText.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    gsap.to(".title-swipe", 1, { y: "100%" });
    mouseText.innerText = "";
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: 45, y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: -45, y: -5, background: "black" });
    gsap.to("#logo", { color: "black" });
    gsap.to(".nav-bar", { clipPath: "circle(3500px at 100% -10%" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: 0, y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: 0, y: 0, background: "white" });
    gsap.to("#logo", { color: "white" });
    gsap.to(".nav-bar", { clipPath: "circle(20px at 100% -10%" });
    document.body.classList.remove("hide");
  }
}

// barba page transition
const logo = document.querySelector("#logo");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "../index.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destory();
        destailScene.destroy();
      },
    },
    {
      namespace: "forest",
      beforeEnter() {
        forestAnimation();
      },
      beforeLeave() {
        forestScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "hike",
      beforeEnter() {
        hikeAnimation();
      },
      beforeLeave() {
        hikeScene.destory();
        controller.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //   animation
        const tl = gsap.timeline({ default: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        // scroll to the top
        window.scrollTo(0, 0);
        const tl = gsap.timeline({ default: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },
          { x: "100%", stagger: 0.25, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
      },
    },
  ],
});

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });
    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "red",
      //   colorTrigger: "red",
      //   name: "detailScene",
      //   indent: 200,
      // })
      .addTo(controller);
  });
}

function forestAnimation() {
  controller = new ScrollMagic.Controller();
  // select items
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    // set rules
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0, ease: "power2.inOut" });
    slideTl.fromTo(nextImg, { x: "25%" }, { x: "0%" });
    // scene
    forestScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      duration: "100%",
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "green",
      //   colorTrigger: "green",
      //   name: "forestScene",
      //   indent: 150,
      // })
      .addTo(controller);
  });
}

function hikeAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({
      defaults: { duration: 2.5, ease: "expo.inOut" },
    });
    let nextSlides = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlides.querySelector("img");
    const nextTitle = slide.querySelector("h1");
    const paragraphs = slide.querySelector("p");
    // set rules
    slideTl.fromTo(paragraphs, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlides, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "100%" }, { x: "0%" });
    slideTl.fromTo(
      nextTitle,
      { x: "0%" },
      { x: "100%" },
      { opacity: 1 },
      { opacity: 0 }
    );
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    hikeScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      duration: "90%",
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "red",
      //   colorTrigger: "red",
      //   name: "hikeScene",
      //   indent: 100,
      // })
      .addTo(controller);
  });
}

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
burger.addEventListener("click", navToggle);
