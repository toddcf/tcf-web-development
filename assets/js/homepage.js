// Hide/Reveal Nav:
function navReveal() {
  var navBar = document.querySelector('.nav');
  var navBarHeight = navBar.offsetHeight;
  navBar.style.top = (window.scrollY < navBarHeight) ? '-' + (navBarHeight + 10) + 'px' : '0';
}
navReveal();
window.addEventListener('scroll', navReveal);

$( document ).ready( function() {

  // Author Site Effects:
  if ($(window).width() < 576) {

    // Author Site card's offset triggers animation.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_author-site' ).waypoint( function( direction ) {
      $( '.card-small__backboard_author-site' ).addClass( 'card-small__backboard_3_effects' );
    }, {
      offset: '85%'
    });
  } else {
    // My Portfolio card's offset triggers animation for all other cards.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_my-portfolio' ).waypoint( function( direction ) {
      $( '.card-small__backboard_author-site' ).addClass( 'card-small__backboard_3_effects' );
    }, {
      offset: '85%'
    });
  }
  

  // My Portfolio Effects:
  // Not actually using "direction," because this animation will only happen once.
  $( '.card-small__backboard_my-portfolio' ).waypoint( function( direction ) {
    $( '.card-small__backboard_my-portfolio' ).addClass( 'card-small__backboard_my-portfolio_effects' );
  }, {
    offset: '85%'
  });


  // Omnifood Effects:
  if ($(window).width() < 576) {
    // Omnifood's card triggers its own animation.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_omnifood' ).waypoint( function( direction ) {
      $( '.card-small__backboard_omnifood' ).addClass( 'card-small__backboard_omnifood_effects' );
    }, {
      offset: '85%'
    });
  } else {
    // My Portfolio card triggers Omnifood's animation.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_my-portfolio' ).waypoint( function( direction ) {
      $( '.card-small__backboard_omnifood' ).addClass( 'card-small__backboard_omnifood_effects' );
    }, {
      offset: '85%'
    });
  }

} );