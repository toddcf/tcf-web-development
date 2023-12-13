let consentLevel4 = false; // Default.
if (
  _satellite.getVar('consent level 2 | analytics') === true &&
  window.dataLayer?.user?.consent?.C0004 === true &&
  _satellite.getVar('consent | sharing allowed') === true &&
  !_satellite.getVar('consent | global privacy control')
) {
  consentLevel4 = true;
}
return consentLevel4;






// Both Consent Levels 2 and 4 must also be true for Consent Level 4 to fire.  Do not flatten this logic -- it is possible for the individual consent levels to be "false" in the data layer.
// let consentLevel2 = _satellite.getVar('consent: performance | dynamic');
// let consentLevel4 = false;
// if (!!consentLevel2 && !!window.digitalData && !!window.digitalData.user && !!window.digitalData.user.consent && window.digitalData.user.consent.C0004 === true) {
//     consentLevel4 = true;
// }
// // Return false if sharing permissions are set 1-DoNotShare OR global-privacy-control is present, regardless of what users agree to
// if (_satellite.getVar('user: sharing permissions') === '1-DoNotShare' || _satellite.getVar('global-privacy-control')) {
//     consentLevel4 = false;
// }
// return consentLevel4;