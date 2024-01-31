// Pass a date object into this data element and it will reformat it to 'YYYY-MM-DD' (with hyphens).
// Arrays of date objects will be convered to a 'YYYY-MM-DD,YYYY-MM-DD,YYYY-MM-DD' string.
// 'any' strings will pass through unmodified.
// Unwanted input formats are wiped to empty strings so that they will be flagged by ObservePoint.
const inputDate = event; // The argument that is passed into this data element.
let outputYYYYMMDD = (!!inputDate) ? inputDate : ''; // Defaults for output (in case the value is 'any', or nonexistent).
const formattedDateArr = [];

// Converts a single date object to YYYY-MM-DD:
const formatYYYYMMDD = (singleDateObj) => {
  // Defaults assist with debugging:
  let yyyy = 'YYYY';
  let mm = 'MM';
  let dd = 'DD';
  // Reformats date object. 'any' strings skip this part.
  if (typeof singleDateObj.getMonth === 'function') {
    yyyy = singleDateObj.getFullYear();
    mm = singleDateObj.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    dd = singleDateObj.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
  }
  return yyyy + '-' + mm + '-' + dd;
}

// Determine how and when to fire the formatYYYYMMDD function:
if (!!inputDate) {
  if (Array.isArray(inputDate)) {
    // If inputDate is an array:
    if (inputDate.length > 0 && typeof inputDate[0].getMonth === 'function') {
      // Converts an array of date objects to a string of YYYY-MM-DD,YYYY-MM-DD,YYYY-MM-DD:
      inputDate.forEach((dateObj) => {
        // If it is a date object:
        if (typeof dateObj.getMonth === 'function') {
          formattedDateArr.push(formatYYYYMMDD(dateObj)); // Format each date and push it to the new array.
        }
      });
      // Convert the array to a string:
      outputYYYYMMDD = (formattedDateArr.length > 0) ? formattedDateArr.join() : ''; // Comma-delimited. DO NOT encode commas. Convert an empty array to an empty string so ObservePoint will flag it.
    } else {
      // If inputDate was an array of something other than date objects, wipe it so ObservePoint will flag it:
      outputYYYYMMDD = '';
    }
  } else if (typeof inputDate.getMonth === 'function') {
    // If inputDate is an individual date object:
    outputYYYYMMDD = formatYYYYMMDD(inputDate);
  } else if (typeof inputDate === 'string' && inputDate !== 'any') {
    // 'any' strings pass through.  All other strings get wiped (such as date objects that were erroneously converted to strings by the app) so that ObservePoint flags them as missing and we know to debug them.
    outputYYYYMMDD = '';
  }
}

return outputYYYYMMDD;