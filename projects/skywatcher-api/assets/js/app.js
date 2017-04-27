$( document ).ready( function() {

	// Date:
	var thisYear = new Date().getFullYear();

	// Footer (IIFE):
	var footerInfo = ( function() {
		$( ".footer" ).html( "<div class='container'><div class='row text-center'><p>Copyright &copy; 2017 - " + thisYear + " <a class='footer-text' href='http://www.tcf-webdesign.com' target='blank'><u>Todd Croak-Falen</u></a></p><p>View Code: <a class='footer-text' href='https://github.com/toddcf/skywatcher-api' target='blank'><u>GitHub</u></a></p></div></div>" );
	}) ();

} );