$( document ).ready( function() {

	// Pass current year into footer copyright:
	var thisYear = new Date().getFullYear();

	if ( thisYear > 2017 ) {
		// Footer (IIFE):
		var footerInfo = ( function() {
			$( ".currentYear" ).html( " &ndash; " + thisYear + " " );
		}) ();
	}



} );