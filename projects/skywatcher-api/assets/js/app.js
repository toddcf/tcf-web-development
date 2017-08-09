$( document ).ready( function() {

	// FOOTER

	// Pass current year into footer copyright:
	var thisYear = new Date().getFullYear();

	if ( thisYear > 2017 ) {
		// Footer (IIFE):
		var footerInfo = ( function() {
			$( ".currentYear" ).html( " &ndash; " + thisYear + " " );
		}) ();
	}

	// MOBILE NAV

	$( ".js--nav-icon" ).click( function() {
	
		var nav = $( ".js--nav-right" );
		var icon = $( ".js--nav-icon i" );

		// Open and close the box:
		nav.slideToggle( 200 );

		if ( icon.hasClass( "ion-navicon-round" ) ) {
			icon.addClass( "ion-close-round" );
			icon.removeClass( "ion-navicon-round" );
		} else {
			icon.addClass( "ion-navicon-round" );
			icon.removeClass( "ion-close-round" );
		}
		
	} );

	// Ensure that .nav-right reappears after mobile nav has been closed and screen size increased again:
	// This works basically like a media query for jQuery, where we can take different actions depending on the screen width
	$( window ).resize( function() {

		var nav = $( ".js--nav-right" );
		var icon = $( ".js--nav-icon i" ); /* Do I need to remove that i? */

		if ( $( window ).width() > 767 ) {
			nav.css( "display", "block" );
			icon.addClass( "ion-close-round" );
			icon.removeClass( "ion-navicon-round" );
		} else {
			nav.css( "display", "none" );
			icon.addClass( "ion-navicon-round" );
			icon.removeClass( "ion-close-round" );
		}

	} );

} );