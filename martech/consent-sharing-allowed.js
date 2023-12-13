let sharingAllowed = false; // Default.
if (window.dataLayer?.user?.consent?.sharingAllowed === true) {
  sharingAllowed = true;
}
return sharingAllowed;



// Make sure no 'null' values or empty strings get passed, or AEP will have an ingestion failure:
// if (
//   !!window.digitalData &&
//   !!window.digitalData.user &&
//   !!window.digitalData.user.profile &&
//   !!window.digitalData.user.profile.contactPreferences &&
//   !!window.digitalData.user.profile.contactPreferences.doNotShare &&
//   typeof window.digitalData.user.profile.contactPreferences.doNotShare === 'string'
// ) {
//   return window.digitalData.user.profile.contactPreferences.doNotShare;
// }