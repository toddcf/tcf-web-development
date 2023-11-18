// Pass a date object into this data element and it will reformat it to 'YYYY-MM' (with hyphen).
// Arrays of date objects will be convered to a 'YYYY-MM,YYYY-MM,YYYY-MM' string.
// 'any' strings will pass through unmodified.
// Unwanted input formats are wiped to empty strings so that they will be flagged by ObservePoint.
var inputDate = event; // The argument that is passed into this data element.
var outputYYYYMM = (!!inputDate) ? inputDate : ''; // Defaults for output (in case the value is 'any', or nonexistent).
var formattedDateArr = [];

// Converts a single date object to YYYY-MM:
function formatYYYYMM(singleDateObj) {
  // Defaults assist with debugging:
  var yyyy = 'YYYY';
  var mm = 'MM';
  if (typeof singleDateObj.getMonth === 'function') {
    yyyy = singleDateObj.getFullYear();
    mm = singleDateObj.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
  }
  return yyyy + '-' + mm;
}

// Determine how and when to fire the formatYYYYMM function:
if (!!inputDate) {
  if (Array.isArray(inputDate)) {
    // If inputDate is an array:
    if (inputDate.length > 0 && typeof inputDate[0].getMonth === 'function') {
      // Converts an array of date objects to a string of YYYY-MM,YYYY-MM,YYYY-MM:
      inputDate.forEach(function(dateObj) {
        // If it is a date object:
        if (typeof dateObj.getMonth === 'function') {
          formattedDateArr.push(formatYYYYMM(dateObj)); // Format each date and push it to the new array.
        }
      });
      // Convert the array to a string:
      outputYYYYMM = (formattedDateArr.length > 0) ? formattedDateArr.join() : ''; // Comma-delimited. DO NOT encode commas. Convert an empty array to an empty string so ObservePoint will flag it.
    } else {
      // If inputDate was an array of something other than date objects, wipe it so ObservePoint will flag it:
      outputYYYYMM = '';
    }
  } else if (typeof inputDate.getMonth === 'function') {
    // If inputDate is an individual date object:
    outputYYYYMM = formatYYYYMM(inputDate);
  } else if (typeof inputDate === 'string' && inputDate !== 'any') {
    // 'any' strings pass through.  All other strings get wiped (such as date objects that were erroneously converted to strings by the app) so that ObservePoint flags them as missing and we know to debug them.
    outputYYYYMM = '';
  }
}

return outputYYYYMM;