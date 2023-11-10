let ruleTriggerType = event.$type.replace('core.', '');
let clickedElement = '';
let clickedElementAttributes = '';
let clickAttributes = {};
let accordionStatus = '';
const customLinkValues = [];
let directCallString = '';

// The following are used if data-track-verb is missing:
let childNodes = '';
let className = '';
let imgTag = '';
let name = '';
let parentNode = '';

// Helper Functions
function cleanText(_txt) {
  if (!_txt) return;

  let clean = _txt.trim();
  if (!clean) return;

  let removeStr;
  const startPos = (clean.indexOf('<sup>') || clean.indexOf('<sub>'));
  const endPos = (clean.indexOf('</sup>') || clean.indexOf('</sub>')) - startPos + 6;

  if (startPos > -1) {
    removeStr = clean.substr(startPos, endPos);
    clean = clean.split(removeStr).join('');
  }

  clean = clean.replace(/[^a-z\d\s]+/gi, ' ');
  clean = clean.trim();
  clean = clean.replace(/\s{2,}/g, ' ');
  clean = clean.split(' ').join('-').toLowerCase();
  var whSpace = /\s/;
  clean = clean.replace(whSpace, '-');
  return clean;
}

const getLinkName = (_element) => {
  const navName = _element.getAttribute('data-nav-name') || '';
  const navText = _element.getAttribute('data-us-text') || '';
  const navTitle = _element.getAttribute('title') || '';
  const navTitle2 = _element.getAttribute('data-us-title') || '';
  const altTag = _element.getAttribute('alt') || '';
  let elementText = '';

  if (_element.hasAttribute('aria-label')) {
    elementText = _element.getAttribute('aria-label');
  } else {
    elementText = _element.textContent;
  }

  if (altTag === '' || !elementText) {
    if (!elementText) {
      elementText = $(_element).clone().children().remove().end().text() || '';
      if (_element.nextElementSibling) {
        if (_element.nextElementSibling.firstElementChild) {
          elementText = _element.nextElementSibling.firstElementChild.textContent || '';
        }
      }
    }
  }

  let linkName = elementText || navName || navText || altTag || navTitle || navTitle2 || '';
  return linkName;
}

// Initial Standardization for Clicks, Direct Calls, and Shadow DOM Clicks:
switch (ruleTriggerType) {
  case 'click':
  case 'change':
    clickedElement = this;
    s.events = s.apl(s.events, 'event1', ',');
    break;
  case 'direct-call':
    directCallString = event.identifier;
    if (!!event && !!event.detail) {
      if (!!event.detail.clickedElement) {
        clickedElement = event.detail.clickedElement;
      }
      if (!!event.detail.shadowClick) {
        ruleTriggerType = 'shadowClick';
        s.events = s.apl(s.events, 'event1', ',');
      }
    }
    break;
}

if (!!clickedElement && !!clickedElement.attributes) {
  clickedElementAttributes = [...clickedElement.attributes];
}

if (!!clickedElementAttributes) {
  clickedElementAttributes.forEach(clickedElementAttribute => {
    const key = clickedElementAttribute.name;
    const value = clickedElementAttribute.value;
    clickAttributes[key] = value;
  });
}

// Post-Standardization Logic:
switch (ruleTriggerType) {
  case 'click':
  case 'shadowClick':
    if (!clickAttributes['data-track-verb']) {
      // If data-track-verb is missing:
      name = 'na';
      className = (clickAttributes.class) ? clickAttributes.class : '';
      childNodes = clickedElement.childNodes;
      parentNode = clickedElement.parentNode;
      imgTag = clickedElement.querySelector('img');

      if (imgTag) name = getLinkName(imgTag) || name;
      if (name === 'na') name = getLinkName(clickedElement) || name;

      if (
        (
          !!className &&
          typeof className === 'string'
        ) &&
        parentNode.parentNode.dataset.track === 'accordion-section'
      ) {
        name = parentNode.parentNode.getAttribute('data-track-verb');
        accordionStatus = clickedElement.getAttribute('aria-expanded') === 'true' ? 'close' : 'open';
      }
      clickAttributes['data-track-verb'] = name;
    }
    break;
  case 'direct-call':
    if (!!event && !!event.detail && !event.detail.clickedElement) {
      // If there is an event.detail but it does NOT contain a 'clickedElement', check for the data that was passed in event.detail and assign it to the appropriate clickAttributes:
      if (!!event.detail.trackNoun) {
        clickAttributes['data-track-noun'] = event.detail.trackNoun;
      }
      if (!!event.detail.id) {
        clickAttributes['data-track-verb'] = event.detail.trackVerb;
      }
    }
    break;
}

// Final cleanup before concatenation occurs:
for (const property in clickAttributes) {
  // Run cleanText on all of the clickAttributes that include attributes containing 'data-track':
  if (property.includes('data-track')) {
    clickAttributes[property] = cleanText(clickAttributes[property]);
  }
}

// Then do the concatenation here. Must do this separately from the above to control the order of the concatenations.
// First dynamically push each existing data-track-component-level-X attribute into an array in numerical order:
let level = 1;
let dataTrackComponentLevelX = '';
do {
  dataTrackComponentLevelX = clickAttributes[`data-track-component-level-${level}`];
  if (!!dataTrackComponentLevelX) {
    customLinkValues.push(dataTrackComponentLevelX);
  }
  level++;
} while (!!clickAttributes[`data-track-component-level-${level}`]);

// Then manually push in all other attributes we want in the order we want them concatenated:
if (!!clickAttributes['data-track-noun']) {
  customLinkValues.push(clickAttributes['data-track-noun']);
}

if (!!clickAttributes['data-track-verb']) {
  customLinkValues.push(clickAttributes['data-track-verb']);
}

if (!!accordionStatus) {
  customLinkValues.push(accordionStatus); // 'open' vs. 'close'
}

// Then cap each one at 60 characters so we don't go over Adobe's 255-character limit when concatenated:
const cappedLinkValues = customLinkValues.map(customLinkValue => {
  if (customLinkValue.length > 60) {
    customLinkValue = customLinkValue.slice(0, 60);
  }
  return customLinkValue;
});

// Then join the capped link values with colons:
const customLinkValuesConcat = cappedLinkValues.join(':');

s.eVar1 = s.prop1 = customLinkValuesConcat;
s.linkTrackVars = s.apl(s.linkTrackVars, 'eVar1,prop1,events', ',');
s.linkTrackEvents = s.events;