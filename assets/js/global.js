// Padding Under Nav:
function navSpacing() {
  var navBar = document.querySelector('.nav');
  var navBarHeight = navBar.offsetHeight;
  var contentTop = document.querySelector('.content-top');
  contentTop.style.paddingTop = navBarHeight + 'px';
}
navSpacing();
window.addEventListener('resize', navSpacing);