let tradeName; // Do not default to empty string, or AEP will include it as an empty string. And in the Launch UI, make sure this data element's "enable default value" checkbox is *unchecked*.
let tradeNameArr;
let tradeNameMap;

const clickAttributes = (!!event && !!event.detail) ? event.detail : '';

if (
    !!clickAttributes &&
    !!clickAttributes['data-track'] &&
    clickAttributes['data-track'] === 'filter-trade' &&
    !!clickAttributes['data-track-name']
) {
    // Booking Flow Trade Filter Clicks (future-proofed version):
    tradeName = clickAttributes['data-track-name'];
} else if (
    !!clickAttributes &&
    !!clickAttributes['data-track'] &&
    clickAttributes['data-track'] === 'search-filter'
) {
    // Do nothing -- this is a stopgap to prevent legacy attributes from allowing the Page/Route Load condition from being met on clicks.  We can delete this once the data attributes on the Filters elements are fixed.
} else if (!!window.digitalData) {
    if (
        !!window.digitalData.itinerary &&
        typeof window.digitalData.itinerary.trade === 'object' &&
        typeof window.digitalData.itinerary.trade.name === 'string'
    ) {
        tradeName = window.digitalData.itinerary.trade.name;
    } else if (!!window.digitalData.itinerary &&
        typeof window.digitalData.itinerary.trade === 'string'
    ) {
        tradeName = window.digitalData.itinerary.trade;
    } else if (
        !!window.digitalData.product &&
        typeof window.digitalData.product.trade === 'object' &&
        typeof window.digitalData.product.trade.name === 'string'
    ) {
        tradeName = window.digitalData.product.trade.name;
    } else if (
        !!window.digitalData.product &&
        !!window.digitalData.product.trade &&
        typeof window.digitalData.product.trade === 'string'
    ) {
        // For EZair, which still uses legacy data layer architecture:
        tradeName = window.digitalData.product.trade;
    } else if (
        !!window.digitalData.search &&
        !!window.digitalData.search.trade &&
        Array.isArray(window.digitalData.search.trade)
    ) {
        tradeNameArr = window.digitalData.search.trade; // Get the array of id/name objects.
        tradeNameMap = tradeNameArr.map(trade => trade.name); // Map each name property to a new array.
        if (!!tradeNameMap && Array.isArray(tradeNameMap)) {
            tradeName = tradeNameMap.toString(); // Only set the tradeName variable at this point to prevent prior states of the array/mapping from being passed to Analytics or AEP.
        }
    } else if (
        !!window.digitalData.search &&
        typeof window.digitalData.search.trade === 'string'
    ) {
        tradeName = window.digitalData.search.trade; // Shorex still uses this format.
    } else if (
        !!window.digitalData.content &&
        typeof window.digitalData.content.trade === 'object' &&
        typeof window.digitalData.content.trade.name === 'string'
    ) {
        tradeName = window.digitalData.content.trade.name;
    } else if (
        !!window.digitalData.content &&
        typeof window.digitalData.content.trade === 'string'
    ) {
        tradeName = window.digitalData.content.trade;
    }
}

// Prevent empty strings, null, or EZair's 'NA' defaults from being sent to AEP:
if (
    !!tradeName &&
    typeof tradeName === 'string' &&
    tradeName !== 'NA'
) {
    return tradeName;
}