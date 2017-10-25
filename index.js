console.log("I am loaded 👀");

// TO DO:
// 1. Speeds not working right
// 2. Improve functionality
// 3. Instead of getting window, should I be getting elements getBoundingRect();

function offset(el) {
  const rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

(function parallaxIt() {
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
    retrieveSpeed = target.getAttribute('data-speed');
    targetOffset = target.offsetTop;
    backgrounds.push(target);
  })

  // loop through targets
  parallaxTargets.forEach((item) => {
    const target = item;
    retrieveSpeed = Number(target.getAttribute('data-speed'));
    targetOffset = offset(target);
    elements.push(target);
  })

  // attach event listener to scroll on window
  window.addEventListener('scroll', () => {

    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // loop through targets array
    elements.forEach((target) => {
      // console.log(scrollTop);
      // console.log(retrieveSpeed);
      // console.log(targetOffset);

      let yPos = (targetOffset - scrollTop) / retrieveSpeed;
      //console.log('y', yPos)
      target.style.transform =  `translate3d(0, ${yPos}px, 0)`;
    })

    // loop through backgrounds array
    backgrounds.forEach((target) => {
      let yPos = -((scrollTop - targetOffset) / Number(retrieveSpeed));
      target.style.backgroundPosition = `50% ${yPos}px`
    });
  })
})();