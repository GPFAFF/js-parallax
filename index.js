console.log("I am loaded 👀");

// TO DO:
// 1. Speeds not working right
// 2. Improve functionality
// 3. Instead of getting window, should I be getting elements getBoundingRect();

const isInView = (target) => {
  const distance = target.getBoundingClientRect();
  return (
    distance.top >= 0 && distance.left >= 0 && distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const offset = (target)  => {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  const itemTop = target.getBoundingClientRect().top;

  // get speed or set default
  const retrieveSpeed = Number(target.getAttribute('data-speed')) || Number(target.setAttribute('data-speed', '4'));

  // create percentage for scrolling
  const percentage = Math.round(scrollPosition / (itemTop + retrieveSpeed));

  return percentage;

}

// Create requestAnimationFrame

const rAF = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(callback) {
    setTimeout(callback, 1000 / 60);
  };

const parallaxIt = () => {
  // create variables
  const window = document.defaultView;
  // this is a var so its declaration can get hoisted to top in window scroll event.
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // create empty arrays
  const elements = [];
  const backgrounds = [];

  // retrieve all elements with class
  const backgroundTargets = document.querySelectorAll('.background');
  const parallaxTargets = document.querySelectorAll('.parallax');

  // loop through backgrounds
  backgroundTargets.forEach((background) => {
    const target = background;
    backgrounds.push(target);
  })

  // loop through targets
  parallaxTargets.forEach((item) => {
    const target = item;
    elements.push(target);
  })

  // attach event listener to scroll on window
  window.addEventListener('scroll', () => {

    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // loop through targets array
    elements.forEach((target) => {

      if (isInView(target)) {
          let yPos = offset(target);
          target.style.transform =  `translate3d(0, ${yPos}px, 0)`;
          target.style.transition = '200ms ease-in';
        }
      })

    // loop through backgrounds array
    backgrounds.forEach((target) => {
      if (isInView(target)) {
        let yPos = -(offset(target));
        target.style.backgroundPosition = `50% ${yPos}px`
      }
    });
  })
};

rAF(parallaxIt);