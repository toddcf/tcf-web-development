const aemComponentTracking = {
  setTrackingAttributes: (currentElement, mergedTrackingAttributesArr) => {
    mergedTrackingAttributesArr = (!!mergedTrackingAttributesArr && Array.isArray(mergedTrackingAttributesArr)) ? mergedTrackingAttributesArr : [];

    const numberOfValues = mergedTrackingAttributesArr.length;
    if (!!currentElement && numberOfValues > 0) {
      if (numberOfValues === 1) {
        currentElement.removeAttribute('data-track-noun');
      }

      mergedTrackingAttributesArr.forEach((trackingAttribute, i) => {
        switch (i) {
          case numberOfValues - 1:
            currentElement.setAttribute('data-track-verb', trackingAttribute);
            break;
          case numberOfValues - 2:
            currentElement.setAttribute('data-track-noun', trackingAttribute);
            break;
          default:
            currentElement.setAttribute(`data-track-component-level-${i + 1}`, trackingAttribute);
        }
      });
      currentElement.setAttribute('data-track-component-attributes-set', 'true');
    }
    aemComponentTracking.checkChildren(currentElement, mergedTrackingAttributesArr);
  },
  uniqueValue(arr, str) {
    let unique = true;
    if (!!arr && Array.isArray(arr) && arr.length > 0 && !!str && arr.includes(str)) {
      unique = false;
    }
    return unique;
  },
  mergeTrackingAttributes: (currentElement, existingTrackingAttributes, parentTrackingAttributes) => {
    existingTrackingAttributes = (!!existingTrackingAttributes && Array.isArray(existingTrackingAttributes)) ? existingTrackingAttributes : [];
    parentTrackingAttributes = (!!parentTrackingAttributes && Array.isArray(parentTrackingAttributes)) ? parentTrackingAttributes : [];
    mergedTrackingAttributesArr = [];

    const mergedTrackingAttributesArrPusher = (arr) => {
      if (!!arr && Array.isArray(arr) && arr.length > 0) {
        arr.forEach(arrItem => {
          if (aemComponentTracking.uniqueValue(mergedTrackingAttributesArr, arrItem)) {
            mergedTrackingAttributesArr.push(arrItem);
          }
        });
      }
    }

    mergedTrackingAttributesArrPusher(parentTrackingAttributes);
    mergedTrackingAttributesArrPusher(existingTrackingAttributes);

    aemComponentTracking.setTrackingAttributes(currentElement, mergedTrackingAttributesArr);
  },
  getTrackingAttributes: (currentElement, parentTrackingAttributes) => {
    parentTrackingAttributes = (!!parentTrackingAttributes && Array.isArray(parentTrackingAttributes)) ? parentTrackingAttributes : [];
    const existingTrackingAttributes = [];

    let level = 1;
    let parentComponentLevelX = '';
    do {
      parentComponentLevelX = currentElement.getAttribute(`data-track-component-level-${level}`);
      if (!!parentComponentLevelX) {
        existingTrackingAttributes.push(parentComponentLevelX);
      }
      level++;
    } while (!!currentElement.getAttribute(`data-track-component-level-${level}`));

    const dataTrackNoun = currentElement.getAttribute('data-track-noun');
    if (!!dataTrackNoun && dataTrackNoun !== 'no-title') {
      existingTrackingAttributes.push(dataTrackNoun);
    }

    const dataTrackVerb = currentElement.getAttribute('data-track-verb');
    if (!!dataTrackVerb && dataTrackVerb !== 'no-title') {
      existingTrackingAttributes.push(dataTrackVerb);
    }

    const dataTrackComponentAttributesSet = currentElement.getAttribute('data-track-component-attributes-set');
    if (
      !!dataTrackComponentAttributesSet &&
      dataTrackComponentAttributesSet === 'true'
    ) {
      aemComponentTracking.checkChildren(currentElement, existingTrackingAttributes);
    } else {
      aemComponentTracking.mergeTrackingAttributes(currentElement, existingTrackingAttributes, parentTrackingAttributes);
    }
  },
  checkChildren: (currentElement, parentTrackingAttributes) => {
    let currentElementChildren;
    parentTrackingAttributes = (!!parentTrackingAttributes && Array.isArray(parentTrackingAttributes)) ? parentTrackingAttributes : [];

    if (!!currentElement) {
      currentElementChildren = currentElement.children;
      if (!!currentElementChildren && currentElementChildren.length > 0) {
        currentElementChildren = [...currentElementChildren];
        if (Array.isArray(currentElementChildren)) {
          currentElementChildren.forEach(currentElementChild => {
            if (
              currentElementChild.hasAttribute('data-track-component-type') ||
              !!['A', 'BUTTON'].includes(currentElementChild.tagName)
            ) {
              aemComponentTracking.getTrackingAttributes(currentElementChild, parentTrackingAttributes);
            } else {
              aemComponentTracking.checkChildren(currentElementChild, parentTrackingAttributes);
            }
          });
        }
        // NOTE: If there were no children, do nothing (stop).
      }
    }
  },
  init: () => {
    if (
      !!window && !!window.document && !!window.document.body &&
      !!window.document.body.querySelector('[data-track-component-type]')
    ) {
      aemComponentTracking.checkChildren(window.document.body);
    }

    const shadowDOMs = _satellite.getVar('shadow doms');
    if (!!shadowDOMs && Array.isArray(shadowDOMs) && shadowDOMs.length > 0) {
      shadowDOMs.forEach((shadowDOM) => {
        if (!!shadowDOM.querySelector('[data-track-component-type]')) {
          aemComponentTracking.checkChildren(shadowDOM);
        }
      });
    }
  },
}

aemComponentTracking.init();