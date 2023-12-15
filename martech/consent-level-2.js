let consentLevel2 = false; // Default.
if (window.dataLayer?.user?.consent?.C0002 === true) {
  consentLevel2 = true;
}
return consentLevel2;

// let consentLevel2 = false;
// if (!!window.digitalData && !!window.digitalData.user && !!window.digitalData.user.consent && window.digitalData.user.consent.C0002 === true) {
//     consentLevel2 = true;
// }
// return consentLevel2;