const aemComponentTracking = {
  setTrackingAttributes: (currentElement, mergedTrackingAttributesArr) => {
      mergedTrackingAttributesArr = (!!mergedTrackingAttributesArr && Array.isArray(mergedTrackingAttributesArr)) ? mergedTrackingAttributesArr : []; // This should have been passed in even if it was an empty array, but default it to an empty array just to be safe.

      // Overwrite all existing tracking attributes just to ensure standardization and cleanup is consistent:
      const numberOfValues = mergedTrackingAttributesArr.length;
      if (!!currentElement && numberOfValues > 0) {
          // First, if there is only one value in the array, that means it is going to get set to data-track-id.  In case that one value happened to be pulled from data-track, we will remove the data-track attribute to safeguard against data-track and data-track-id both having the same value:
          if (numberOfValues === 1) {
              currentElement.removeAttribute('data-track');
          }
          
          // Then, the new attribute values get set:
          mergedTrackingAttributesArr.forEach((trackingAttribute, i) => {
              switch (i) {
                  case numberOfValues - 1:
                      // The last value in the array gets set to data-track-id:
                      currentElement.setAttribute('data-track-id', trackingAttribute);
                      break;
                  case numberOfValues - 2:
                      // The second to last value in the array gets set to data-track:
                      currentElement.setAttribute('data-track', trackingAttribute);
                      break;
                  default:
                      // All other values get set to data-track-component-level-X in chronological order:
                      currentElement.setAttribute(`data-track-component-level-${i + 1}`, trackingAttribute);
              }
          });
          currentElement.setAttribute('data-track-component-attributes-set', 'true'); // This flag will let us know that this element's attributes were modified after page/route load.
      }
      // Now run the entire process on the currentElement's children. Since we have already gathered and merged its tracking attributes, we can simply pass that array into the method:
      aemComponentTracking.checkChildren(currentElement, mergedTrackingAttributesArr);
  },
  uniqueValue(arr, str) {
      let unique = true; // Default to the value being unique.
      if (!!arr && Array.isArray(arr) && arr.length > 0 && !!str && arr.includes(str)) {
          unique = false;
      }
      return unique;
  },
  mergeTrackingAttributes: (currentElement, existingTrackingAttributes, parentTrackingAttributes) => {
      existingTrackingAttributes = (!!existingTrackingAttributes && Array.isArray(existingTrackingAttributes)) ? existingTrackingAttributes : []; // This should have been passed in even if it was an empty array, but default it to an empty array just to be safe.
      parentTrackingAttributes = (!!parentTrackingAttributes && Array.isArray(parentTrackingAttributes)) ? parentTrackingAttributes : []; // This should have been passed in even if it was an empty array, but default it to an empty array just to be safe.

      mergedTrackingAttributesArr = [];

      // Workaround: Because Bounteous did not program the footer to contain data-track="footer", we will hardcode that here so that it becomes the first value in the final concatenation.
      // Also do the same for 'breadcrumb' so that we know it was a breadcrumb that got clicked.
      if (
          !!currentElement &&
          currentElement.hasAttribute('data-track-component-type') &&
          ['breadcrumb', 'footer', 'video-external'].includes(currentElement.getAttribute('data-track-component-type'))
      ) {
          mergedTrackingAttributesArr.push(currentElement.getAttribute('data-track-component-type'));
      }

      // Reusable function to deduplicate and push values into mergedTrackingAttributesArr:
      const mergedTrackingAttributesArrPusher = (arr) => {
          if (!!arr && Array.isArray(arr) && arr.length > 0) {
              arr.forEach( arrItem => {
                  if (aemComponentTracking.uniqueValue(mergedTrackingAttributesArr, arrItem)) {
                      mergedTrackingAttributesArr.push(arrItem);
                  }
              });
          }
      }

      // If there are parentTrackingAttributes, deduplicate them and push them into mergedTrackingAttributesArr:
      mergedTrackingAttributesArrPusher(parentTrackingAttributes);
      
      // Next, if there are existingTrackingAttributes, deduplicate them and push them into mergedTrackingAttributesArr:
      mergedTrackingAttributesArrPusher(existingTrackingAttributes);
      
      // mergedTrackingAttributesArr should now contain each value in the order we'll want them concatenated for click tracking, so set them into the appropriate attributes on the currentElement:
      aemComponentTracking.setTrackingAttributes(currentElement, mergedTrackingAttributesArr);
  },
  getTrackingAttributes: (currentElement, parentTrackingAttributes) => {
      parentTrackingAttributes = (!!parentTrackingAttributes && Array.isArray(parentTrackingAttributes)) ? parentTrackingAttributes : []; // This should have been passed in even if it was an empty array, but default it to an empty array just to be safe.
      const existingTrackingAttributes = [];

      // First get any 'data-track-component-level-X' values that may exist and push them into the existingTrackingAttributes array in numerical order:
      let level = 1;
      let parentComponentLevelX = '';
      do {
          parentComponentLevelX = currentElement.getAttribute(`data-track-component-level-${level}`);
          if (!!parentComponentLevelX) {
              existingTrackingAttributes.push(parentComponentLevelX);
          }
          level++;
      } while (!!currentElement.getAttribute(`data-track-component-level-${level}`));

      // Then get the 'data-track' value if it exists and push it into the existingTrackingAttributes array:
      const dataTrack = currentElement.getAttribute('data-track');
      if (!!dataTrack && dataTrack !== 'no-title') {
          existingTrackingAttributes.push(dataTrack);
      }

      // Then get the 'data-track-id' value if it exists and push it into the existingTrackingAttributes array:
      const dataTrackID = currentElement.getAttribute('data-track-id');
      if (!!dataTrackID && dataTrackID !== 'no-title') {
          existingTrackingAttributes.push(dataTrackID);
      }

      // Once existingTrackingAttributes have been gathered, check to see if the currentElement already had its attributes merged in a previous pass:
      const dataTrackComponentAttributesSet = currentElement.getAttribute('data-track-component-attributes-set');
      if (
          !!dataTrackComponentAttributesSet &&
          dataTrackComponentAttributesSet === 'true'
      ) {
          // If the currentElement's attributes were already merged in a previous pass, simply invoke checkChildren on it and pass the existingTrackingAttributes down the line:
          aemComponentTracking.checkChildren(currentElement, existingTrackingAttributes);
      } else {
          // If the currentElement's attributes have *not* yet been merged, do so now:
          aemComponentTracking.mergeTrackingAttributes(currentElement, existingTrackingAttributes, parentTrackingAttributes);
      }
  },
  checkChildren: (currentElement, parentTrackingAttributes) => {
      let currentElementChildren;
      parentTrackingAttributes = (!!parentTrackingAttributes && Array.isArray(parentTrackingAttributes)) ? parentTrackingAttributes : []; // This may or may not have been passed in, depending on the use case.
      
      if (!!currentElement) {
          // Generate a list of children one DOM level down -- but no deeper than that:
          currentElementChildren = currentElement.children;
          if (!!currentElementChildren && currentElementChildren.length > 0) {
              // If at least one child was found:
              currentElementChildren = [...currentElementChildren]; // Convert to an array.
              if (Array.isArray(currentElementChildren)) {
                  currentElementChildren.forEach(currentElementChild => {
                      if (
                          currentElementChild.hasAttribute('data-track-component-type') ||
                          !!['A', 'BUTTON'].includes(currentElementChild.tagName)
                      ) {
                          // Workaround: Side Tabs and their content both use [data-track-component-type="tab"]. We need to track clicks on the Side Tabs. But the tab content contains links nested beneath them, and we don't want to trigger double-fires on the click tracking rule when those links are clicked, so we need to ignore the tab content:
                          if (currentElementChild.getAttribute('data-track-component-type') === 'tab') {
                              const currentElementChildClasses = currentElementChild.getAttribute('class');
                              _satellite.logger.info('currentElementChildClasses:', currentElementChildClasses);
                              if (currentElementChildClasses.includes('cmp-tab__content')) {
                                  _satellite.logger.info('currentElementChildClasses includes cmp-tab__content');
                                  currentElementChild.setAttribute('data-track-ignore', 'true');
                              }
                          }
                          // END WORKAROUND
                          
                          // If child has 'data-track-component-type' attribute, or is a button or anchor tag, get its existing tracking attributes, plus pass in any parentTrackingAttributes that exist:
                          aemComponentTracking.getTrackingAttributes(currentElementChild, parentTrackingAttributes);
                      } else {
                          // If child does *not* contain 'data-track-component-type', or is *not* a button or anchor tag, simply run this same method on it recursively without getting or setting any attributes:
                          aemComponentTracking.checkChildren(currentElementChild, parentTrackingAttributes);
                      }
                  });
              }
              // NOTE: If there were no children, do nothing (stop).
          }
      }
  },
  init: () => {
      // Check all the children of the regular DOM. To reduce performance drag, only crawl the page if at least one AEM Component is detected:
      if (
          !!window && !!window.document && !!window.document.body &&
          !!window.document.body.querySelector('[data-track-component-type]')
      ) {
          aemComponentTracking.checkChildren(window.document.body);
      }
      
      // Now get all existing Shadow DOMs and check all of their children:
      const shadowDOMs = _satellite.getVar('shadow doms');
      if (!!shadowDOMs && Array.isArray(shadowDOMs) && shadowDOMs.length > 0) {
          shadowDOMs.forEach((shadowDOM) => {
              // To reduce performance drag, only crawl the shadow DOMs that contain at least one AEM Component:
              if (!!shadowDOM.querySelector('[data-track-component-type]')) {
                  aemComponentTracking.checkChildren(shadowDOM);
              }
          });
      }
  },
}

aemComponentTracking.init();