const navBuilder = {
  nav: document.querySelector('nav'),
  pageLevel1: window?.digitalData?.page?.levels[0]?.id,
  pageLevel2: window?.digitalData?.page?.levels[1]?.id,
  pageLevel3: window?.digitalData?.page?.levels[2]?.id,
  addFunctionality: () => {
    // Add Nav Functionality
    const navIcon = document.querySelector('.nav__button_dropdown');
    if (!!navIcon) {
      const navDropdown = document.querySelector('.nav__list');
      const navIcon = document.querySelector('ion-icon');
      const toggleCollapse = () => {
        if (navDropdown.classList.contains('nav__list_collapsed')) {
          navDropdown.classList.remove('nav__list_collapsed');
          navIcon.setAttribute('name', 'close-outline');
        } else {
          navDropdown.classList.add('nav__list_collapsed');
          navIcon.setAttribute('name', 'menu-outline');
        }
      }
      navIcon.addEventListener('click', toggleCollapse);
      // Add collapse if user clicks outside of dropdown.
      // Add collapse if user hits "escape".
    }
  },
  createNavHTML: (dropdown, breadcrumbs) => {
    breadcrumbs = breadcrumbs || '';
    navBuilder.nav.innerHTML = `
    <div class="content__center content__center_1440">
      <div class="nav__bar">
        <div class="nav__bar-flex-item-breadcrumbs">${breadcrumbs}</div>
        <div class="nav__bar-flex-item-dropdown">
          <button class="nav__button_dropdown">
            <ion-icon name="menu-outline" class="nav__icon_dropdown"></ion-icon>
          </button>
        </div>
      </div>
      <ul class="nav__list nav__list_collapsed">${dropdown}</ul>
    </div>`;

    window.globalControl.internalLinkLogic();
    
    navBuilder.addFunctionality();
  },
  createBreadcrumbs: (dropdown) => {
    const pageLevelsArr = window.digitalData.page.levels;
    let breadcrumbHTML; // This is what will get returned from the map.
    const breadcrumbHTMLarr = pageLevelsArr.map((pageLevelData, pageLevelIndex) => {
      const category = pageLevelData.category;
      let pathEnd = '';
      if (
        category.includes('-hub') ||
        category.includes('-series') ||
        category === 'specific-title'
      ) {
        pathEnd += '/index'; // Certain page categories need '/index' appended.
      } else if (category === 'home') {
        pathEnd += 'index'; // Homepage *cannot* have the slash in the appendage.
      }
      
      if (pageLevelIndex === pageLevelsArr.length - 1) {
        // The *last* item in the array will *not* be an anchor tag, so the HTML is different:
        breadcrumbHTML = `<span class="breadbrumbs__item_text">${pageLevelData.name}</span>`;
      } else {
        // All other layers:
        breadcrumbHTML = `<a class="breadbrumbs__item_anchor" data-link="internal" href="${pageLevelData.cumulativePath}${pathEnd}">${pageLevelData.name}</a>`;
      }
      return breadcrumbHTML;
    });
    breadcrumbs = `<p class="breadcrumbs">${breadcrumbHTMLarr.join(' / ')}</p>`;
    window.globalControl.internalLinkLogic();
    navBuilder.createNavHTML(dropdown, breadcrumbs);
  },
  addDropdownItem: (pageLevel, thisPage, corePath, linkText) => {
    let dropdownItem = '';
    if (pageLevel !== thisPage) {
      dropdownItem = `<li class="nav__list-item"><a class="nav__list-item-anchor" data-link="internal" href="${window.globalControl.prependRoot(corePath)}"><p class="nav__list-item-paragraph html__font-size-2">${linkText}</p></a></li>`;
    }
    return dropdownItem;
  },
  createDropdownList: () => {
    let dropdown = ``;
    if (!!navBuilder.pageLevel2) {
      dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel2, 'home', 'index', 'Home'); // Page Level 1 will now always be Homepage, so for now we are going to be a little hacky and only add the Home link if we know there is a Page Level 2. In other words, if there was no page level 2, we know we are on the Homepage and will not want to add a "Home" link to the dropdown.
    }
    if (
      navBuilder.pageLevel2 === 'titles' &&
      !!navBuilder.pageLevel3
    ) {
      // Only add to the dropdown if Page Level 2 also exists (so we know this isn't the Titles Hub already). NOW WE CAN POSSIBLY REFACTOR TO CHECK WHETHER THE CATEGORY IS THE HUB.
      dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel3, 'titles', 'titles/index', 'Titles');
    } else if (navBuilder.pageLevel2 !== 'titles') {
      dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel2, 'titles', 'titles/index', 'Titles');
    }
    dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel2, 'about-me', 'about-me', 'About Me');
    dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel2, 'bonus-content', 'bonus-content/registration', 'Bonus Content');
    dropdown += navBuilder.addDropdownItem(navBuilder.pageLevel2, 'contact', 'contact/form', 'Contact');

    // Skip breadcrumbs if it's the homepage:
    (!!window.digitalData?.page?.levels[1]) ? navBuilder.createBreadcrumbs(dropdown) : navBuilder.createNavHTML(dropdown);
  },
  init: () => {
    navBuilder.createDropdownList();
  },
}

if (!!navBuilder.nav) {
  navBuilder.init();
}

/*const calculateSpacing = () => {
  const mainHeader = document.querySelector('.header');
  const mainHeaderHeight = mainHeader.clientHeight;
  const secondEl = document.body.children[1];
  secondEl.style.margin = `${mainHeaderHeight - 1}px 0 0 0`; // Subtracting a pixel prevents a white line gap on some screen sizes.
}

// Add space on both pageLoad and window resize:
calculateSpacing();
window.addEventListener('resize', calculateSpacing);*/

// Sticky Nav Logic:
const stickyNav = {
  // When the nav loads, grab the position of the top of the navbar:
  navTop: navBuilder.nav.offsetTop,
  fixNav: () => {
    if (window.scrollY >= stickyNav.navTop) {
      // When scrollY reaches the position of the top of the nav, fix the nav's position:
      navBuilder.nav.classList.add('nav_fixed');
      // Also compensate for the reflow that will occur when the nav is changed to a fixed position:
      document.body.style.paddingTop = navBuilder.nav.offsetHeight + 'px';
    } else {
      // Otherwise, un-fix the nav's position:
      navBuilder.nav.classList.remove('nav_fixed');
      // And un-pad the top of the body:
      document.body.style.paddingTop = 0;
    }
  },
  init: () => {
    // Execute the fixNav method every time the user scrolls:
    window.addEventListener('scroll', stickyNav.fixNav);
  },
}

if (!!navBuilder.nav) {
  stickyNav.init();
}