$( document ).ready( function() {

	// Pass current year into footer copyright:
	var thisYear = new Date().getFullYear();

	
	// Footer (IIFE):
	var footerInfo = ( function() {
		$( ".currentYear" ).html( "&ndash;&nbsp;" + thisYear + "&nbsp;" );
	}) ();

} );