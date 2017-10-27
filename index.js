console.log("I am loaded 👀");

// TO DO:
// 1. Speeds not working right
// 2. Improve functionality
// 3. Instead of getting window, should I be getting elements getBoundingRect();

function offset(el) {
  const posY = window.pageYOffset || document.documentElement.scrollTop;
  const itemTop = posY + (el.getBoundingClientRect().top);
  const itemHeight = el.clientHeight || el.offsetHeight || el.scrollHeight;
  const retrieveSpeed = Number(el.getAttribute('data-speed'));

  const percentage = retrieveSpeed / (posY - itemTop + screenY) / (innerHeight + posY);

  return percentage;

  console.log(percentage);
}

(function parallaxIt() {
  // create variables
  const window = document.defaultView;
  // this is a var so its declaration can get hoisted to top in window scroll event.
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  console.log(scrollTop);

  // create empty arrays
  const elements = [];
  const backgrounds = [];

  // retrieve all elements with class
  const backgroundTargets = document.querySelectorAll('.background');
  const parallaxTargets = document.querySelectorAll('.parallax');

  // loop through backgrounds
  backgroundTargets.forEach((background) => {
    const target = background;
    targetOffset = target;
    backgrounds.push(target);
  })

  // loop through targets
  parallaxTargets.forEach((item) => {
    const target = item;
    targetOffset = offset(target);
    elements.push(target);
  })

  // attach event listener to scroll on window
  window.addEventListener('scroll', () => {

    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // loop through targets array
    elements.forEach((target) => {
      console.log(target, scrollTop)
      let yPos = offset(target) * 10000;
      target.style.transform =  `translate3d(0, ${yPos}px, 0)`;
    })

    // loop through backgrounds array
    backgrounds.forEach((target) => {
      let yPos = -(offset(target) * 10000);
      console.log(yPos);
      target.style.backgroundPosition = `50% ${yPos}px`
    });
  })
})();