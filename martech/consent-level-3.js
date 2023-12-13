const consentLevel2 = _satellite.getVar('consent level 2 | performance');
let consentLevel3 = false; // Default.
if (consentLevel2 === true && window.dataLayer?.user?.consent?.C0003 === true) {
    consentLevel3 = true;
}
return consentLevel3;





// Return "true" only if Performance and Personalization consents are BOTH true.  Do not flatten this logic -- it is possible for the individual consent levels to be "false" in the data layer
// let consentLevel2 = _satellite.getVar('consent: performance | dynamic');
// let consentLevel3 = false;
// if (!!consentLevel2 && !!window.digitalData && !!window.digitalData.user && !!window.digitalData.user.consent && window.digitalData.user.consent.C0003 === true) {
//     consentLevel3 = true;
// }
// return consentLevel3;