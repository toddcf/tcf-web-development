const inputDate = event;
let outputYYYYMMDD = (!!inputDate) ? inputDate : '';
const formattedDateArr = [];

const formatYYYYMMDD = (singleDateObj) => {
  let yyyy = 'YYYY';
  let mm = 'MM';
  let dd = 'DD';
  if (typeof singleDateObj.getMonth === 'function') {
    yyyy = singleDateObj.getFullYear();
    mm = singleDateObj.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    dd = singleDateObj.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
  }
  return yyyy + '-' + mm + '-' + dd;
}

if (!!inputDate) {
  if (Array.isArray(inputDate)) {
    // If inputDate is an array:
    if (inputDate.length > 0 && typeof inputDate[0].getMonth === 'function') {
      inputDate.forEach((dateObj) => {
        if (typeof dateObj.getMonth === 'function') {
          formattedDateArr.push(formatYYYYMMDD(dateObj));
        }
      });
      outputYYYYMMDD = (formattedDateArr.length > 0) ? formattedDateArr.join() : '';
    } else {
      outputYYYYMMDD = '';
    }
  } else if (typeof inputDate.getMonth === 'function') {
    // If inputDate is an individual date object:
    outputYYYYMMDD = formatYYYYMMDD(inputDate);
  } else if (typeof inputDate === 'string' && inputDate !== 'any') {
    outputYYYYMMDD = '';
  }
}

return outputYYYYMMDD;