console.log("I am loaded 👀");

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
    retrieveSpeed = Number(target.getAttribute('data-speed'));
    targetOffset = target.offsetTop;

    backgrounds.push(target);
  })

  // loop through targets
  parallaxTargets.forEach((item) => {
    const target = item;
    retrieveSpeed = Number(target.getAttribute('data-speed'));
    targetOffset = target.offsetTop;
    elements.push(target);
  })

  // attach event listener to scroll on window
  window.addEventListener('scroll', () => {

    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // loop through targets array
    elements.map((target) => {
      console.log(target.getAttribute('data-speed'));
      console.log(targetOffset);
      let yPos = targetOffset - (scrollTop / retrieveSpeed);
      console.log(scrollTop / retrieveSpeed)
      //console.log(yPos);
      target.style.top =  `${yPos}px`;
    })

    // loop through backgrounds array
    backgrounds.forEach((target) => {
      let yPos = -((scrollTop - targetOffset) / retrieveSpeed);
      target.style.backgroundPosition = `50% ${yPos}px`
    });
  })
})();