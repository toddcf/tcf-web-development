$( document ).ready( function() {

	// Units:
	var degrees = "&deg;";
	var metric = "&units=metric"; // aka Celcius
	var metricDeg = degrees + " C";
	var imperial = "&units=imperial"; // aka Fahrenheit
	var imperialDeg = degrees + " F";
	// If units are not specified, default is "standard," aka Kelvin.

	// AJAX call -- current weather:
	function getWeather() {
		var city = $( "#city" ).val();

		// API Key:
		var sample = "&appid=170e406aaa5d1d76d71ee5c974d5ed32";
		var key = "&appid=OBFUSCATE";

		// Only if "city" is NOT empty, run the API query:
		if ( city != "" ) {
			$.ajax( {
				url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + imperial + sample,
				type: "GET",
				dataType: "jsonp",
				success: function( data ) {
					// Pass the data into the showResults function and store the result in a variable:
					var widget = showResults( data );
					// Display the results in HTML:
					$( "#showWeather" ).html( widget );
					// Clear the "city" field:
					$( "#city" ).val( "" );
				}

			});
		}
		// If "city" is empty:
		else {
			errorRed();
		}
	};

	// If city field is empty when submitted, make the "Enter City" text flash red:
	function errorRed() {
		$( "#error" ).html( "<div id='red'>Enter City:</div>" );
	};

	// Display the results to HTML:
	function showResults( data ) {
		return	"<p><h2 class='weather-text' id='weather-text-top'>Current Weather for " + data.name + ", " + data.sys.country + "</h2></p>" +
				"<div><img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'></div>" +
				"<p class='weather-text cap'>" + data.weather[0].main + " (" + data.weather[0].description + ")</p>" +
				"<p class='weather-text'>Temperature: " + data.main.temp + imperialDeg + "</p>" +
				"<p class='weather-text'>Pressure: " + data.main.pressure + " hPa</p>" +
				"<p class='weather-text'>Humidity: " + data.main.humidity + "%</p>" +
				"<p class='weather-text'>Wind Speed: " + data.wind.speed + " mph</p>" +
				"<p class='weather-text' id='weather-text-bottom'>Wind Direction: " + data.wind.deg + degrees + "</p>";
	};

	// Event listener for CURRENT WEATHER button click:
	$( "#submitCity" ).click( function() {
		return getWeather();
	});

	// Event listener for ENTER key:
	document.addEventListener( "keypress", function( event ) {
		if ( event.keyCode === 13 || event.which === 13 ) {
			return getWeather();
		}
	});

} );