let destinationName; // Do not default to empty string, or AEP will include it as an empty string. And in the Launch UI, make sure this data element's "enable default value" checkbox is *unchecked*.
let destinationNameArr;
let destinationNameMap;

const clickAttributes = (!!event && !!event.detail) ? event.detail : '';

if (
  !!clickAttributes &&
  !!clickAttributes['data-track-noun'] &&
  clickAttributes['data-track-noun'] === 'filter-destination' &&
  !!clickAttributes['data-track-name']
) {
  // Booking Flow Destination Filter Clicks (future-proofed version):
  destinationName = clickAttributes['data-track-name'];
} else if (
  !!clickAttributes &&
  !!clickAttributes['data-track-noun'] &&
  clickAttributes['data-track-noun'] === 'search-filter'
) {
  // Do nothing -- this is a stopgap to prevent legacy attributes from allowing the Page/Route Load condition from being met on clicks.  We can delete this once the data attributes on the Filters elements are fixed.
} else if (!!window.dataLayer) {
  if (
    !!window.dataLayer.booking &&
    typeof window.dataLayer.booking.destination === 'object' &&
    typeof window.dataLayer.booking.destination.name === 'string'
  ) {
    destinationName = window.dataLayer.booking.destination.name;
  } else if (
    !!window.dataLayer.booking &&
    typeof window.dataLayer.booking.destination === 'string'
  ) {
    destinationName = window.dataLayer.booking.destination;
  } else if (
    !!window.dataLayer.search &&
    !!window.dataLayer.search.destination &&
    Array.isArray(window.dataLayer.search.destination)
  ) {
    destinationNameArr = window.dataLayer.search.destination; // Get the array of id/name objects.
    destinationNameMap = destinationNameArr.map(destination => destination.name); // Map each name property to a new array.
    if (!!destinationNameMap && Array.isArray(destinationNameMap)) {
      destinationName = destinationNameMap.toString(); // Only set the destinationName variable at this point to prevent prior states of the array/mapping from being passed to Analytics or AEP.
    }
  } else if (
    !!window.dataLayer.search &&
    typeof window.dataLayer.search.destination === 'string'
  ) {
    destinationName = window.dataLayer.search.destination;
  } else if (
    !!window.dataLayer.content &&
    typeof window.dataLayer.content.destination === 'object' &&
    typeof window.dataLayer.content.destination.name === 'string'
  ) {
    destinationName = window.dataLayer.content.destination.name;
  } else if (
    !!window.dataLayer.content &&
    typeof window.dataLayer.content.destination === 'string'
  ) {
    destinationName = window.dataLayer.content.destination;
  }
}

if (
  !!destinationName &&
  typeof destinationName === 'string' &&
  destinationName !== 'NA'
) {
  return destinationName;
}