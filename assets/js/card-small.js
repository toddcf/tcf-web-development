$( document ).ready( function() {

  // Card #1 Effects:
  // Not actually using "direction," because this animation will only happen once.
  $( '.card-small__backboard_1' ).waypoint( function( direction ) {
    $( '.card-small__backboard_1' ).addClass( 'card-small__backboard_1_effects' );
  }, {
    offset: '85%'
  });


  // Card #2 Effects:
  if ($(window).width() < 576) {
    // At this screen size, this card's offset triggers its own animation.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_2' ).waypoint( function( direction ) {
      $( '.card-small__backboard_2' ).addClass( 'card-small__backboard_2_effects' );
    }, {
      offset: '85%'
    });
  } else {
    // At this screen size, Card #1's offset triggers animation for all other cards.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_1' ).waypoint( function( direction ) {
      $( '.card-small__backboard_2' ).addClass( 'card-small__backboard_2_effects' );
    }, {
      offset: '85%'
    });
  }
  
  // Card #3 Effects:
  if ($(window).width() < 576) {
    // At this screen size, this card's offset triggers its own animation.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_3' ).waypoint( function( direction ) {
      $( '.card-small__backboard_3' ).addClass( 'card-small__backboard_3_effects' );
    }, {
      offset: '85%'
    });
  } else {
    // At this screen size, Card #1's offset triggers animation for all other cards.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_1' ).waypoint( function( direction ) {
      $( '.card-small__backboard_3' ).addClass( 'card-small__backboard_3_effects' );
    }, {
      offset: '85%'
    });
  }

  // Card #4 Effects:
  if ($(window).width() < 576) {
    // At this screen size, this card's offset triggers its own animation.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_4' ).waypoint( function( direction ) {
      $( '.card-small__backboard_4' ).addClass( 'card-small__backboard_4_effects' );
    }, {
      offset: '85%'
    });
  } else {
    // At this screen size, Card #1's offset triggers animation for all other cards.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_1' ).waypoint( function( direction ) {
      $( '.card-small__backboard_4' ).addClass( 'card-small__backboard_4_effects' );
    }, {
      offset: '85%'
    });
  }

  // Card #5 Effects:
  if ($(window).width() < 576) {
    // At this screen size, this card's offset triggers its own animation.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_5' ).waypoint( function( direction ) {
      $( '.card-small__backboard_5' ).addClass( 'card-small__backboard_5_effects' );
    }, {
      offset: '85%'
    });
  } else {
    // At this screen size, Card #1's offset triggers animation for all other cards.
    // Not actually using "direction," because this animation will only happen once.
    $( '.card-small__backboard_1' ).waypoint( function( direction ) {
      $( '.card-small__backboard_5' ).addClass( 'card-small__backboard_5_effects' );
    }, {
      offset: '85%'
    });
  }

} );