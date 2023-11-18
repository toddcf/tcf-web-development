// Pass a date object into this data element and it will reformat it to 'MMYY'.
// Arrays of date objects will be convered to a 'MMYY,MMYY,MMYY' string.
// 'any' strings will pass through unmodified.
// Unwanted input formats are wiped to empty strings so that they will be flagged by ObservePoint.
var inputDate = event; // The argument that is passed into this data element.
var outputMMYY = (!!inputDate) ? inputDate : ''; // Defaults for output (in case the value is 'any', or nonexistent).
var formattedDateArr = [];

// Converts a single date object to MMYY:
function formatMMYY(singleDateObj) {
  // Defaults assist with debugging:
  var yy = 'YY';
  var mm = 'MM';
  // If date is an object, reformats to MMYY:
  if (typeof singleDateObj.getMonth === 'function') {
    yy = singleDateObj.getFullYear();
    yy = yy.toString().substr(-2); // Convert to two-digit year.
    mm = singleDateObj.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
  }
  return mm + yy;
}

// Determine how and when to fire the formatMMYY function:
if (!!inputDate) {
  if (Array.isArray(inputDate)) {
    // If inputDate is an array:
    if (inputDate.length > 0 && typeof inputDate[0].getMonth === 'function') {
      // If the array contains date objects:
      inputDate.forEach(function(dateObj) {
        if (typeof dateObj.getMonth === 'function') {
          formattedDateArr.push(formatMMYY(dateObj)); // Format each date and push it to the new array.
        }
      });
      // Convert the array to a string:
      outputMMYY = (formattedDateArr.length > 0) ? formattedDateArr.join() : ''; // Comma-delimited. DO NOT encode commas. Convert an empty array to an empty string so ObservePoint will flag it.
    } else {
      // If inputDate was an array of something other than date objects, wipe it so ObservePoint will flag it:
      outputMMYY = '';
    }
  } else if (typeof inputDate.getMonth === 'function') {
    // If inputDate is an individual date object:
    outputMMYY = formatMMYY(inputDate);
  } else if (typeof inputDate === 'string' && inputDate !== 'any') {
    // 'any' strings pass through.  All other strings get wiped (such as date objects that were erroneously converted to strings by the app) so that ObservePoint flags them as missing and we know to debug them.
    outputMMYY = '';
  }
}

return outputMMYY;