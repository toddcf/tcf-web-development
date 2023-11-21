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
    $( '.card-small__backboard_3' ).waypoint( function( direction ) {
      $( '.card-small__backboard_3' ).addClass( 'card-small__backboard_3_effects' );
    }, {
      offset: '85%'
    });
  } else {
    // The first card's offset triggers animation for all other cards.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_1' ).waypoint( function( direction ) {
      $( '.card-small__backboard_3' ).addClass( 'card-small__backboard_3_effects' );
    }, {
      offset: '85%'
    });
  }
  

  // My Portfolio Effects:
  // Not actually using "direction," because this animation will only happen once.
  $( '.card-small__backboard_1' ).waypoint( function( direction ) {
    $( '.card-small__backboard_1' ).addClass( 'card-small__backboard_1_effects' );
  }, {
    offset: '85%'
  });


  // Omnifood Effects:
  if ($(window).width() < 576) {
    // Omnifood's card triggers its own animation.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_2' ).waypoint( function( direction ) {
      $( '.card-small__backboard_2' ).addClass( 'card-small__backboard_2_effects' );
    }, {
      offset: '85%'
    });
  } else {
    // The first card's offset triggers animation for all other cards.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_1' ).waypoint( function( direction ) {
      $( '.card-small__backboard_2' ).addClass( 'card-small__backboard_2_effects' );
    }, {
      offset: '85%'
    });
  }

} );