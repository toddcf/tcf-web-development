# To Do:

## Refactor Git Usage

- Instead of this being inside a "portfolio3" repo, move it into the "tcf-webdesign" repo.
- Utilize GitHub's "Projects" kanban for the rest of this list.
  - Set up automations.
- As for the "toddcf" GitHub account overall, there is a "secret" where you can create a repository with the same name as the account (toddcf/toddcf), and this will allow you to create a README for the overall account.  NOTE: This may be an issue because I already have a repository by that name.  I probably want to rename that one "tcf-author" or something in order to take advantage of this.


## Non-Walkthrough Version

- Remove jQuery
  - Homepage:
    - Swap out Waypoints for vanilla JS scroll triggers.
      - Revisit Wes Bos tutorial.
      - Another example: https://terwanerik.github.io/ScrollTrigger/
    - Merge Footer JS file into a single JS file for this page.
    - Delete jQuery link.
  - About Me (harder):
    - Swap out Waypoints for vanilla JS scroll triggers. (Same process as homepage.)
    - Recode parallax background with vanilla JS.
    - Merge Footer JS file into a single JS file for this page.
    - Delete jQuery link.
- Add Brenda Canela Acting
  - (See if the new BEM structure makes adding this project block easy.)
  - Photoshop: All image sizes.
- Replace the horizontal line between Front End Developer | MarTech Programmer with a slowly-spinning compass.
  - SVG with shadow.
- Fallback image (tropical beach):
  - Can I delete the unused background tropical beach image size from the img directory?
  - Smaller sizes for mobile, etc.
- Do everything Google Page Insights recommends to optimize the site.
- Add Adobe DTM and Launch logos to "About Me" page.
- Acura:
  - Figure out better UX for a hub that links out to all six pages. (Maybe in each car's footer? I didn't notice the menu at the top of the NSX page.)
- Update the new `https` URL across all my online job board accounts.
- Convert icons to SVG and remove links to fontawesome library.
- Add Google Analytics throughout entire site.


## Walkthrough Version

### Flowchart

- Create a flowchart for the portfolio user experience.


### Walkthrough Pages

- Header:
  - Fix icons and their placements.
- Redo all mobile responsive font sizes.
- Change all "Mobile, Tablet, Desktop" references to "Small, Medium, Large" to be compliant with Atomic Design.
- Convert to BEM.
  - Remove Bootstrap grid and create your own flexbox.
  - Delete all unused CSS links.
- Once this is done, delete the actual Bootstrap files (except for jQuery).
- Also delete all non-BEM files.


#### My Portfolio Walkthrough:

- Convert all icons (header, panels) to BEM *blocks*.
- Redo the code snippets to reflect the new BEM structure.
- Remove the "Live Site" header icon from the Portfolio Walkthrough.


#### Acura of Tempe Walkthrough:

- Fix margins between each Acura button now that they are in two columns.
- Restyle secondary buttons so they don't blend into the gray card bg.
  - Use BEM to recode all buttons completely.
  - Then use this new BEM style on all the other pages, too.
- The value of the white-background rising image.
- How one of the images disappears on small screens.
- The slider button hover effect.
- NSX gradients that make section breaks blend together.
- Remove all unused CSS that was left over from the template.


#### BMW of El Cajon Walkthrough:

- Show the button hover effect WITH and WITHOUT my solution so the user can see the flash. (Unless just using `background-image` for both would have allowed the transition to work?)
- H1: Show the difference WITH and WITHOUT my linear gradient behind it.


#### Brenda Canela Acting Walkthrough



#### Honda of New Rochelle:

- Original: http://rsp-hondaofnewrochelle.fzautomotive.com/2018-honda-accord
- Mockups (JPGs for mobile and desktop).
- Video background with fallback image.
- Animations and Waypoints.


#### Finally Deploy Walkthrough Version!

- Deployment checklist.
- After walkthrough version is pushed live, update all the Acura of Tempe landing pages accordingly:
  - Remove headers.
  - Remove any CSS affiliated with the headers.
  - Push these updates live on GH Pages.


## Future Refinements

- Refactor Omnifood project. (Create separate project list.)
  - Use BEM.
  - Minimize images.
  - Mobile-first.
  - Remove jQuery and Waypoints -- convert to vanilla JS.
  - Deploy via GH Pages instead of Heroku.
  - Update all portfolio links (here and on any job boards) to point to the new GH Pages site.