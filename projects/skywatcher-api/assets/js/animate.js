$( document ).ready( function() {

	var categories = 2150;
	var speed2 = 0; 

	// Temperature
	setTimeout( function () {
		$( "#colHeadText1" ).typed( {
			strings: [ "Pulling Weather Data From All Over The Globe." ],
			typeSpeed: 0
		})
	}, 0 );

	// Temperature
	setTimeout( function () {
		$( "#temp" ).typed( {
			strings: [ "Temperature" ],
			typeSpeed: speed2
		})
	}, categories );

	// Pressure
	setTimeout( function () {
		$( "#pres" ).typed( {
			strings: [ "Pressure" ],
			typeSpeed: speed2
		})
	}, categories );

	// Wind Speed
	setTimeout( function () {
		$( "#wind" ).typed( {
			strings: [ "Wind Speed" ],
			typeSpeed: speed2
		})
	}, categories );

	// Humidity
	setTimeout( function () {
		$( "#humi" ).typed( {
			strings: [ "Humidity" ],
			typeSpeed: speed2
		})
	}, categories );


// 	document.addEventListener('DOMContentLoaded', function(){
// 		Typed.new('.element', {
// 			strings: ["First sentence.", "Second sentence."],
// 			typeSpeed: 0
// 		});
// 	});

} );