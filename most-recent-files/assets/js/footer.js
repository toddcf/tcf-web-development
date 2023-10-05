$( document ).ready( function() {

  // ICON EFFECTS
  // Not actually using "direction," because this animation will only happen once.
  $( '.footer__icon' ).waypoint( function( direction ) {
    $( '.footer__icon' ).addClass( 'footer__icon_effects' );
  }, {
    offset: '85%'
  });

  // COPYRIGHT DATE
  var thisYear = new Date().getFullYear();
  // Pass thisYear into footer copyright's .currentYear span:
  $( '.currentYear' ).html( '&ndash;&nbsp;' + thisYear + '&nbsp;' );

} );