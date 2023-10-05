$( document ).ready( function() {

  if ($(window).width() < 576) {

    // Omnifood's card triggers its own animation.
    // Not actually using "direction," because this animation will only happen once.
    $( '.additional-sample__backboard_omnifood' ).waypoint( function( direction ) {
      $( '.additional-sample__backboard_omnifood' ).addClass( 'additional-sample__backboard_omnifood_effects' );
    }, {
      offset: '85%'
    });

  }

  else {

    // My Portfolio card triggers Omnifood's animation.
    // Not actually using "direction," because this animation will only happen once.
    $( '.additional-sample__backboard_my-portfolio' ).waypoint( function( direction ) {
      $( '.additional-sample__backboard_omnifood' ).addClass( 'additional-sample__backboard_omnifood_effects' );
    }, {
      offset: '85%'
    });

  }

} );