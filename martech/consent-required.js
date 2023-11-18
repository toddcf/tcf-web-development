let consentRequired; // Do not default to empty string, or AEP will include it as an empty string. And in the Launch UI, make sure this data element's "enable default value" checkbox is *unchecked*.

// Force to Boolean in case this value was a string in the data layer -- otherwise, AEP ingestion will fail:
if (!!window.digitalData && !!window.digitalData.user && !!window.digitalData.user.consent) {
    if (
        window.digitalData.user.consent.required === true ||
        window.digitalData.user.consent.required === 'true'
    ) {
        consentRequired = true;
    } else if (
        window.digitalData.user.consent.required === false ||
        window.digitalData.user.consent.required === 'false'
    ) {
        consentRequired = false;
    }
}

return consentRequired;