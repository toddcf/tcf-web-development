window.globalControl.postTags = () => {
  const pageLevels = window.digitalData?.page?.levels;
  const pageLevel2id = window.digitalData?.page?.levels[1]?.id;
  const pageLevel3id = window.digitalData?.page?.levels[2]?.id;
  const pageLevel4id = window.digitalData?.page?.levels[3]?.id;
  // 'titles/digitalData.js' must be loaded before 'nav.js' due to a dependency.
  if (
    pageLevel2id === 'titles' &&
    pageLevels[pageLevels.length - 1].category !== 'music'
  ) {
    // Add titles to the data layer:
    const dataLayerTitles = () => {
      new Promise(resolve => window.globalControl.tagBuilder({
        appendTo: 'body',
        attr: {
          src: 'titles/digitalData',
          type: 'text/javascript',
        },
        pathToRoot: true,
      }));
    };

    // Code that must wait to run *after* the titles have been successfully added to the data layer:
    async function dataLayerTitleDependencies() {
      await dataLayerTitles();
      // Then run the logic that is dependent on the data layer:
      if (!!pageLevel3id) {
        // If Page Level 3 exists AND there is no Page Level 4 . . .
        if (!pageLevel4id) {
          // This is a 'Title' Page:
          window.globalControl.tagBuilder({
            appendTo: 'body',
            attr: {
              src: 'titles/page',
              type: 'text/javascript',
            },
            pathToRoot: true,
          });
          // Need additional logic to drill a level deeper if this is a series. Would probably be cleaner to sort all this out in the data layer and leverage something like 'category'.
        }
      } else {
        // If there is no Page Level 3, this is the Titles Hub:
        window.globalControl.tagBuilder({
          appendTo: 'body',
          attr: {
            src: 'titles/hub',
            type: 'text/javascript',
          },
          pathToRoot: true,
        });
      }
    }
    dataLayerTitleDependencies();
  }

  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'global/nav',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });

  switch (pageLevels[pageLevels.length - 1].category) {
    case 'music':
      const dataLayerMusic = () => {
        new Promise(resolve => window.globalControl.tagBuilder({
          appendTo: 'body',
          attr: {
            src: 'music/digitalData',
            type: 'text/javascript',
          },
          pathToRoot: true,
        }));
      };
  
      // Code that must wait to run *after* the music data has been successfully added to the data layer:
      async function dataLayerMusicDependencies() {
        await dataLayerMusic();
        window.globalControl.tagBuilder({
          appendTo: 'body',
          attr: {
            src: 'music/logic',
            type: 'text/javascript',
          },
          pathToRoot: true,
        });
      }
      dataLayerMusicDependencies();
      // Make this process can be even more programmatic, in that every single directory level has an asset, and we just load whatever those files are (with validations that prevent them from attempting to load if they don't exist).
      break;
  }

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