// Padding Under Nav:
const contentTop = document.querySelector('.content-top');
const navBar = document.querySelector('.nav');

function navSpacing() {
  const navBarHeight = navBar.offsetHeight;
  if (!!navBarHeight) {
    contentTop.style.paddingTop = `${navBarHeight + 32}px`;
  }
}

if (!!navBar && !!contentTop) {
  navSpacing();
  window.addEventListener('resize', navSpacing);
}