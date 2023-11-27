// Hide/Reveal Nav:
function navReveal() {
  var navBar = document.querySelector('.nav');
  var navBarHeight = navBar.offsetHeight;
  navBar.style.top = (window.scrollY < navBarHeight) ? '-' + (navBarHeight + 10) + 'px' : '0';
}
navReveal();
window.addEventListener('scroll', navReveal);