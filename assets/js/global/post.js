window.globalControl.postTags = () => {
  // const pageLevels = window.digitalData?.page?.levels;
  // const pageLevel2id = window.digitalData?.page?.levels[1]?.id;
  // const pageLevel3id = window.digitalData?.page?.levels[2]?.id;
  // const pageLevel4id = window.digitalData?.page?.levels[3]?.id;
  // 'titles/digitalData.js' must be loaded before 'nav.js' due to a dependency.
  

  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'global/nav',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });

  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'global/footer',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });

  return new Promise((resolve) => {
    resolve('resolve');
  });
}

// Use async await to fire this only after all the previous methods have finished updating the DOM:
// OR TRY DOING THIS WITHIN EACH APPLICABLE INDIVIDUAL SCRIPT FILE YOU ARE LOADING, SUCH AS NAV.
async function asyncCall() {
  await window.globalControl.postTags();
  window.globalControl.internalLinkLogic();
}

asyncCall(); // This current setup fires, but it doesn't resolve my timing issue. The promise probably needs to use 'resolve all' or something to that effect.