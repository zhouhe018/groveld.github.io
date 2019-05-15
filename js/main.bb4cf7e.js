
// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // ServiceWorker registration successful
  }).catch(function(err) {
    // ServiceWorker registration failed
    console.log('ServiceWorker registration failed:', err);
  });
}



// NOTE: Scroll performance is poor in Safari
// - this appears to be due to the events firing much more slowly in Safari.
//   Dropping the scroll event and using only a raf loop results in smoother
//   scrolling but continuous processing even when not scrolling
$(document).ready(function () {
  var progressBar = document.querySelector('#reading-progress');
  var lastScrollY = window.scrollY;
  var lastWindowHeight = window.innerHeight;
  var lastDocumentHeight = $(document).height();
  var ticking = false;

  function onScroll() {
    lastScrollY = window.scrollY;
    requestTick();
  }

  function onResize() {
    lastWindowHeight = window.innerHeight;
    lastDocumentHeight = $(document).height();
    requestTick();
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  }

  function update() {
    var progressMax = lastDocumentHeight - lastWindowHeight;
    progressBar.setAttribute('max', progressMax);
    progressBar.setAttribute('value', lastScrollY);
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('resize', onResize, false);
  update();
});
