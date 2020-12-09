// const hikeExplore = document.querySelector(".hike");

// adds an event to the window
// window.addEventListener("scroll", scrollReveal);

// function scrollReveal() {
//   // shows in px the distances of the hikeExplore from the top of the screen
//   const hikePos = hikeExplore.getBoundingClientRect().top;
//   const windowHeight = window.innerHeight / 1.8;
//   console.log(windowHeight);
//   //   when the position is at the top the style will change to 'red'
//   if (hikePos < windowHeight) {
//     hikeExplore.style.color = "red";
//   }
// }

// alternative option

// const slide = document.querySelector(".slide");

// let options = {
//   threshold: 0.9,
// };

// let observer = new IntersectionObserver(fn, options);

// function fn(entries) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       hikeExplore.style.backgroundColor = "white";
//     }
//   });
// }

// observer.observe(hikeExplore);

const controller = new ScrollMagic.Controller();

const exploreScene = new ScrollMagic.Scene({
  triggerElement: ".hike-exp",
  triggerHook: 0.9,
})
  .addIndicators({
    colorStart: "white",
    colorTrigger: "white",
  })
  .setClassToggle(".hike-exp", "active")
  .addTo(controller);
