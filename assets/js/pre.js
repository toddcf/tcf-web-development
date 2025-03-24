window.globalControl = {
  minify: (fileType, bool) => {
    if (
      typeof bool === 'boolean' &&
      (fileType === 'css' || fileType === 'js')
    ) {
      if (bool) {
        sessionStorage.setItem(`min.${fileType}`, 'true');
      } else {
        sessionStorage.removeItem(`min.${fileType}`);
      }
      location.reload();
    }
  },
  kebabCase: (str) => {
    // For the following, test if the HTML codes such as &ldquo; will get stripped out correctly or not.  If not, the string probably needs to be converted to something else first.
    let conversion;
    
    if (typeof str === 'string') {
      // Convert everything to lowercase:
      conversion = str.toLowerCase();
      // Remove specific character codes completely (listed alphabetically):
      conversion = conversion.replace('&ldquo;', '');
      conversion = conversion.replace('&lsquo;', '');
      conversion = conversion.replace('&rdquo;', '');
      conversion = conversion.replace('&rsquo;', '');
      // Convert specific character codes to alternative values:
      conversion = conversion.replace('&amp;', '-and-'); // Hyphens are in case there are no spaces around the ampersand. Multiple hyphens will be removed at the end.
      conversion = conversion.replace('ö', 'o'); // Specifically used for Björk
      // Convert specific character codes to hyphens (listed alphabetically):
      conversion = conversion.replace('&copy;', '-');
      conversion = conversion.replace('&gt;', '-');
      conversion = conversion.replace('&lt;', '-');
      conversion = conversion.replace('&mdash;', '-');
      conversion = conversion.replace('&nbsp;', '-');
      conversion = conversion.replace('&ndash;', '-');
      // Convert all remaining special characters (and spaces) to hyphens:
      conversion = conversion.replace(/[^a-z0-9]/g, '-');
      // Only one hyphen in a row:
      conversion = conversion.replace(/-+/g, '-');
      // No hyphens at beginning of string:
      if (conversion[0] === '-') {
        conversion = conversion.substr(1);
      }
      // No hyphens at end of string:
      if (conversion.slice(conversion.length - 1) === '-') {
        conversion = conversion.substring(0, conversion.length - 1);
      }
      return conversion;
    }
  },
  // digitalDataBuilder: (digitalDataPath, val) => {
  //   console.log('window.globalControl.digitalDataBuilder function invoked.');
  //   // digitalDataPath is a string of the final data layer dot notation path where you want the value to be stored.  Never include 'window.digitalData'.  Example: 'page.level1'.
  //   // val can be any data type, and is the content that is to be populated in this property.
  //   const digitalDataPathArr = digitalDataPath.split('.'); // Note that this may also need to be split via [] because some values will contain hyphens.
  //   console.log('digitalDataPathArr:', digitalDataPathArr);
  //   let pathNotation = window.digitalData;
    
  //   digitalDataPathArr.forEach(pathItem => {
  //     if (!!pathNotation[pathItem]) {
  //       console.log(`${pathNotation[pathItem]} exists.`);
  //       pathNotation = pathNotation[pathItem];
  //       console.log('pathNotation:', pathNotation);
  //     } else {
  //       console.log(`${pathNotation[pathItem]} does not exist.`);
  //       pathNotation[pathItem] = {};
  //       //pathNotation = pathNotation
  //       console.log('pathNotation:', pathNotation);
  //     }
  //   });

  //   digitalDataPath = val;

/*
window.digitalDataHelper = {
    addData: function(t, e, i) {
        "object" === _typeof(e) && (i = e,
        e = void 0);
        var a, o = ["countryName", "countryPhone", "lastUpdated"];
        function n(t) {
            var e = ["true", "Y", "1", "false", "N", "0"]
              , i = e.indexOf(t);
            return i > -1 ? "true" === e[i] || "Y" === e[i] || "1" === e[i] : t
        }
        switch (_typeof(i)) {
        case "object":
            for (var d in a = {},
            i)
                i.hasOwnProperty(d) && -1 === o.indexOf(d) && (a[d] = n(i[d]));
            break;
        case "array":
            a = [],
            i.forEach((function(t, e, i) {
                a[e] = n(t)
            }
            ));
            break;
        default:
            a = n(i)
        }
        if (e)
            if ("object" === _typeof(a))
                for (var d in window.digitalData[t][e] = window.digitalData[t][e] || {},
                a)
                    window.digitalData[t][e][d] = a[d];
            else
                window.digitalData[t][e] = a;
        else
            for (var d in window.digitalData[t] = window.digitalData[t] || {},
            a)
                window.digitalData[t][d] = a[d]
    },
*/

    
    // RESUME HERE
    // digitalData.titles = digitalData.titles || [];
    // digitalData.titles: [{title: 'The Druggist',}];
  //},
  internalLinkLogic: () => {
    let internalLinks;
    if (window.digitalData?.site?.env === 'local') {
      internalLinks = document.querySelectorAll('[data-link="internal"]');
      internalLinks.forEach(internalLink => {
        if (!internalLink.getAttribute('data-link-appended')) {
          internalLink.href += '.html';
          internalLink.setAttribute('data-link-appended', 'true'); // Prevent the extension from being appended repeatedly.
        }
      });
    }
  },
  prependRoot: (corePath) => {
    // Pass in the full destination path, starting from the root, and *without* the initial slash.
    // Determine relative dest path:
    let relativePath;
    if (!!corePath) {
      relativePath = (!!window.digitalData.page.pathToRoot) ? window.digitalData.page.pathToRoot + '/' + corePath : corePath;
    }
    return relativePath;
  },
  buildTextTags: (arr, noteType) => {
    // For the moment, this is specifically for Music Cards. But later, refactor it to programmatically take in what type of classes should be applied to the tag.
    let tags = '';
    if (arr.length > 0) {
      arr.forEach(arrItem => {
        // Each item in the array only has one key, so just get [0]:
        const itemKey = Object.keys(arrItem)[0];
        const itemValue = arrItem[itemKey];
        switch(itemKey) {
          case 'p':
          case 'q':
            tags += `<${itemKey} class="html__${itemKey} html__${itemKey}_white html_font-size-body music-card__${noteType}-notes_${itemKey}">${itemValue}</${itemKey}>`;
            break;
          case 'ol':
          case 'ul':
          case 'li':
            // This case is incredibly recursive. It passes the <ol> or <ul> back through the same method, which will pass the li back through the same method, which will finally hit a <p> tag:
            tags += `<${itemKey} class="html_font-size-body music-card__${itemKey}">${window.globalControl.buildTextTags(itemValue, noteType)}</${itemKey}>`;
            break;
        }
      });
    }
    return tags;
  },
  tagBuilder: (tag) => {
    const pageLevels = window.digitalData?.page?.levels;
    const pageLevel2id = pageLevels[1]?.id;
    const pageLevel3id = pageLevels[2]?.id;
    let el;

    if (typeof tag === 'object') {
      // Set any attributes that exist:
      if (typeof tag.attr === 'object') {

        // Do all necessary customizations to these values *before* adding them to the actual element:
        if (tag.favicon === true) {
          tag.appendTo = 'head';
          tag.pathToRoot = true;
        }

        if (
          tag.favicon === true &&
          !!tag.attr.href
        ) {
          if (
            pageLevel2id === 'titles' &&
            !!pageLevel3id
          ) {
            tag.attr.href = `assets/img/favicon/${pageLevel3id}/${tag.attr.href}`;
          } else {
            tag.attr.href = `assets/img/favicon/default/${tag.attr.href}`;
          }
        }
        
        if (typeof tag.attr.type === 'string') {
          switch (tag.attr.type) {
            case 'text/css':
              tag.appendTo = 'head';
              tag.attr.href = `assets/css/${tag.attr.href}`;
              tag.attr.rel = 'stylesheet';
              tag.elType = 'link';
              tag.fileType = 'css';
              if (
                sessionStorage.getItem('min.css') &&
                ![tag.attr.href].includes('ionicons')
              ) {
                tag.attr.href += '-min';
              }
              break;
            case 'text/javascript':
              tag.attr.src = `assets/js/${tag.attr.src}`;
              tag.elType = 'script';
              tag.fileType = 'js';
              if (
                sessionStorage.getItem('min.js') &&
                ![tag.attr.src].includes('coverr') &&
                ![tag.attr.src].includes('waypoints') &&
                ![tag.attr.src].includes('mailchimp')
              ) {
                tag.attr.src += '-min';
              }
              break;
          }
        }
        
        if (tag.pathToRoot === true) {
          if (typeof tag.attr.href === 'string') {
            tag.attr.href = window.globalControl.prependRoot(tag.attr.href);
          }
          if (typeof tag.attr.src === 'string') {
            tag.attr.src = window.globalControl.prependRoot(tag.attr.src);
          }
        }
        
        if (typeof tag.fileType === 'string') {
          if (typeof tag.attr.href === 'string') {
            tag.attr.href += `.${tag.fileType}`;
          }
          if (typeof tag.attr.src === 'string') {
            tag.attr.src += `.${tag.fileType}`;
          }
        }
      }
      // End Customizations

      // Then build the tag:
      if (typeof tag.elType === 'string') {
        el = document.createElement(tag.elType);
        for (const property in tag.attr) {
          el[property] = tag.attr[property];
        }
      }

      // Attach element to DOM:
      if (!!el && typeof tag.appendTo === 'string') {
        document[tag.appendTo].appendChild(el);
      }
    }
  },
  loadCustomCSS: () => {
    // Attach specific CSS links based on page levels:
    // An even better way to do this will be to give each CSS file the same name as a page level, and then programmatically add any file for page levels that exist.
    const pageLevels = window.digitalData.page.levels;
    const pageLevel2id = pageLevels[1]?.id;
    const pageLevel3id = pageLevels[2]?.id;
    const pageLevel4id = pageLevels[3]?.id;
    
    switch (pageLevel2id) {
      case 'about-me':
        window.globalControl.tagBuilder({
          attr: {
            href: pageLevel2id,
            type: 'text/css',
          },
          pathToRoot: true,
        });
        break;
      case 'bonus-content':
        switch (pageLevel3id) {
          case 'registration':
            // createCSSlink('bonus-content-deprecated');
            break;
          case 'confirmation':
            // The new page is not created yet.
            break;
        }
        break;
      case 'contact':
        window.globalControl.tagBuilder({
          attr: {
            href: pageLevel2id,
            type: 'text/css',
          },
          pathToRoot: true,
        });
        switch (pageLevel3id) {
          case 'form':
          case 'confirmation':
            window.globalControl.tagBuilder({
              attr: {
                href: pageLevel3id,
                type: 'text/css',
              },
              pathToRoot: true,
            });
            break;
        }
        break;
      case 'titles':
        // First check if Music page:
        if (pageLevels[pageLevels.length - 1].id === 'music') {
          window.globalControl.tagBuilder({
            attr: {
              href: pageLevels[pageLevels.length - 1].id,
              type: 'text/css',
            },
            pathToRoot: true,
          });
        } else if (!pageLevel3id) {
          // Then check if it's the Titles Hub (aka, there is no Page Level 3):
          window.globalControl.tagBuilder({
            attr: {
              href: `${pageLevel2id}/hub`,
              type: 'text/css',
            },
            pathToRoot: true,
          });
        } else {
          // Then, by default, this must be an individual title page:
          window.globalControl.tagBuilder({
            attr: {
              href: `${pageLevel2id}/page`,
              type: 'text/css',
            },
            pathToRoot: true,
          });
        }
        break;
      default:
        if (!pageLevel2id) {
          // If there is no Page Level 2, we are on the Homepage:
          window.globalControl.tagBuilder({
            attr: {
              href: 'index',
              type: 'text/css',
            },
            pathToRoot: true,
          });
        }
        break;  
    }
  },
  loadGlobalCSS: () => {
    // Load CSS after data layer is set, but before JS files are loaded:
    const pageLevels = window.digitalData?.page?.levels;
    // Attach global CSS links:
    window.globalControl.tagBuilder({
      attr: {
        href: 'global/global',
        type: 'text/css',
      },
      pathToRoot: true,
    });
    window.globalControl.tagBuilder({
      attr: {
        href: 'global/grid',
        type: 'text/css',
      },
      pathToRoot: true,
    });
    window.globalControl.tagBuilder({
      attr: {
        href: 'global/fonts',
        type: 'text/css',
      },
      pathToRoot: true,
    });
    window.globalControl.tagBuilder({
      attr: {
        href: 'global/nav',
        type: 'text/css',
      },
      pathToRoot: true,
    });
    window.globalControl.tagBuilder({
      attr: {
        href: 'ionicons.min', /* THIS ONE ALREADY HAS .MIN, SO DON'T DYNAMICALLY RE-APPEND THAT */
        type: 'text/css',
      },
      pathToRoot: true,
    });
    if (pageLevels[0].id !== 'home') {
      window.globalControl.tagBuilder({
        attr: {
          href: 'global/footer',
          type: 'text/css',
        },
        pathToRoot: true,
      });
    }
    window.globalControl.loadCustomCSS();
  },
  setCumulativePath: () => {
    const pageLevels = window.digitalData?.page?.levels;
    let cumulativePath = [window.digitalData.page.pathToRoot];
    pageLevels.forEach((pageLevel) => {
      if (!!pageLevel.id) {
        cumulativePath.push(pageLevel.id);
        pageLevel.cumulativePath = cumulativePath.join('/');
      } else {
        // Homepage workaround (to prevent three slashes in a row upon 'join'):
        pageLevel.cumulativePath = cumulativePath.join('/') + '/';
      }
    });

    window.globalControl.loadGlobalCSS();
  },
  setPageLevelName: (levelValue, category) => {
    // Dependendant on Page Level Category being set first.
    let pageLevelName = '';
    let individualWords;
    let individualWordsCaps;
    if (category === 'specific-title') {
      // There could be a hyphen in a title (such as 'The Image-Conscious War Zone'), so in that case we don't want to automatically replace all hyphens with spaces. Instead, we'll have to use logic to detect if the page is a title page, and then pull the stylized title from the data layer.
      // Problem is, the titles won't be in the data layer yet, so we'll have to come back and punch those in when the time comes. Perhaps it doesn't matter, because when the breadcrumbs are built, we're pulling ALL this stuff from the data layer, anyway, and we'll just pull that from a different portion of the data layer.
    } else {
      // Split the value into an array:
      individualWords = levelValue.split('-');
      // Capitalize the first letter of each item in the array:
      individualWordsCaps = individualWords.map(word => {
        return `${word[0].toUpperCase()}${word.substring(1)}`;
      });
      // Rejoin the array into a string using spaces instead of hyphens:
      pageLevelName = individualWordsCaps.join(' ');
    }
    return pageLevelName;
  },
  setPageLevelCategory: (levelValue) => {
    let category = '';
    switch (levelValue) {
      case 'titles':
        category = 'title-hub';
        break;
      case 'catch-up-to-myself':
      case 'rushing-falls':
      case 'the-druggist':
        // Would be nice to do this dynamically, but for now I am just listing all titles.
        category = 'specific-title';
        break;
      case 'music':
        category = 'music';
        break;
      default:
        if (levelValue.includes('-series')) {
          category = 'series-hub';
        }
    }
    return category;
  },
  setPageLevels: () => {
    // Set page levels. NEEDS TO KNOW PATHNAME FIRST.
    const pathname = window.digitalData.page.pathname;
    // Homepage will always be Page Level 1, so hardcode its page level data:
    const pageLevels = window.digitalData.page.levels = [{
      category: 'home',
      id: '',
      name: 'Home',
    }];
    let pathnameArr;
    if (pathname !== '/') {
      // For all other pages, build the page level data object dynamically:
      // First, convert the pathname into an array:
      pathnameArr = pathname;
      if (pathname[0] === '/') {
        pathnameArr = pathnameArr.slice(1); // If there is an initial slash, remove it.
      }
      if (pathname[pathname.length -1] === '/') {
        pathnameArr = pathnameArr.slice(0, -1); // If there is an ending slash, remove it.
      }
      pathnameArr = pathnameArr.split('/');
      
      // Next, assign each array value to a page level:
      pathnameArr.forEach( (levelValue, i) => {
        const pageLevelObj = {
          category: window.globalControl.setPageLevelCategory(levelValue),
          id: levelValue,
          name: window.globalControl.setPageLevelName(levelValue, this.category), // This one gets dynamically created from the levelValue.
        };

        // Once the pageLevelObj is created, push it to the pageLevels array:
        pageLevels.push(pageLevelObj);
      });
    }
    window.globalControl.setCumulativePath();
  },
  setPathToRoot: (pathname) => {
    // Count number of slashes in pathnames. Will be used to set relative paths. Must be done after pathname variable is standardized.
    const levelCount = pathname.match(/\//g).length;
    
    // Determine relative path from current page to the root:
    const pathToRootArr = [];
    for (var i = levelCount; i > 1; i--) {
      pathToRootArr.push('..');
    }
    window.digitalData.page.pathToRoot = pathToRootArr.join('/');
    window.globalControl.setPageLevels();
  },
  setPathname: () => {
    // Standardize pathname using both the environment and root:
    const root = window.digitalData.site.root;
    let pathname = window.location.pathname;
    switch (window.digitalData.site.env) {
      case 'prod':
        // No pathname standardization necessary.
        break;
      case 'gh-pages':
        pathname = pathname.slice(root.length - 1); // Remove the root from the pathname (except for the slash).  (NOTE: This line could be identical to its 'local' counterpart, it's just that getting the index of the root was always going to be '0' in 'gh-pages', so I took that out.)
        if (pathname.slice(-6) === '/index') {
          pathname = pathname.slice(0, pathname.length - 5); // Remove 'index' from the end of any pathname.
        }
        break;
      case 'local':
        pathname = pathname.slice(pathname.indexOf(root) + root.length - 1); // Remove the root from the pathname (except for the slash).
        pathname = pathname.slice(0, pathname.length - 5); // Remove .html.
        if (pathname.slice(-6) === '/index') {
          pathname = pathname.slice(0, pathname.length - 5); // Remove 'index' from the end of any pathname.
        }
        break;
    }
    window.digitalData.page.pathname = pathname;
    window.globalControl.setPathToRoot(pathname);
  },
  standardizeRoot: () => {
    // Standardize root based on environment, and store in data layer:
    switch (window.digitalData.site.env) {
      case 'prod':
        window.digitalData.site.root = window.location.host; // No standardization necessary.
        break;
      case 'gh-pages':
        window.digitalData.site.root = '/toddcf-author/';
        break;
      case 'local':
        window.digitalData.site.root = '/toddcf-author/github/toddcf-author/';
        break;
    }
    // Standardize pathname using both the environment and root:
    window.globalControl.setPathname();
  },
  setEnvironment: () => {
    switch (window.location.origin) {
      case 'https://toddcf.com':
        window.digitalData.site.env = 'prod';
        break;
      case 'https://toddcf.github.io':
        window.digitalData.site.env = 'gh-pages';
        break;
      case 'file://':
        window.digitalData.site.env = 'local';
        break;
    }

    // Then standardize the root based on the environment:
    window.globalControl.standardizeRoot(window.digitalData.site.env);
  },
  basicDataLayerInit: () => {
    // Create Data Layer (later, this will be refactored to use window.globalControl.digitalDataBuilder):
    window.digitalData = window.digitalData || {};
    window.digitalData.page = window.digitalData.page || {};
    window.digitalData.site = window.digitalData.site || {};
    // Pass root into setEnvironment:
    window.globalControl.setEnvironment();
  },
  init: () => {
    window.globalControl.basicDataLayerInit();
  },
};

window.globalControl.init();

// Then set a listener to run all the DOM-modification logic once the page finishes loading:
window.onload = (event) => {
  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'global/post',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });

  window.globalControl.tagBuilder({
    appendTo: 'body',
    attr: {
      src: 'global/favicon',
      type: 'text/javascript',
    },
    pathToRoot: true,
  });
}

// USE CASES:
// Test everything in local, gh-pages, and prod.
// anchor tag "buttons"
// anchor tag text links
// buttons