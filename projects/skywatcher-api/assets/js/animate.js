$( document ).ready( function() {

	var longDelay = 2150;
	var speed2 = 0; 

	// Temperature
	setTimeout( function () {
		$( ".banner-text" ).typed( {
			strings: [ "Pulling Weather Data From All Over The Globe." ],
			typeSpeed: speed2
		})
	}, 0 );

	setTimeout( function () {
		$( ".categories" ).typed( {
			strings: [ "Temperature &nbsp; | &nbsp; Pressure &nbsp; | &nbsp; Wind Speed &nbsp; | &nbsp; Humidity" ],
			typeSpeed: speed2
		})
	}, longDelay );

	// Temperature
	// setTimeout( function () {
	// 	$( "#temp" ).typed( {
	// 		strings: [ "Temperature" ],
	// 		typeSpeed: speed2
	// 	})
	// }, categories );

	// Pressure
	// setTimeout( function () {
	// 	$( "#pres" ).typed( {
	// 		strings: [ "Pressure" ],
	// 		typeSpeed: speed2
	// 	})
	// }, categories );

	// Wind Speed
	// setTimeout( function () {
	// 	$( "#wind" ).typed( {
	// 		strings: [ "Wind Speed" ],
	// 		typeSpeed: speed2
	// 	})
	// }, categories );

	// Humidity
	// setTimeout( function () {
	// 	$( "#humi" ).typed( {
	// 		strings: [ "Humidity" ],
	// 		typeSpeed: speed2
	// 	})
	// }, categories );


// 	document.addEventListener('DOMContentLoaded', function(){
// 		Typed.new('.element', {
// 			strings: ["First sentence.", "Second sentence."],
// 			typeSpeed: 0
// 		});
// 	});

} );