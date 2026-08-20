Hands & Canvas Website Package

FILES
- index.html — homepage
- about.html — cause, story, founder
- impact.html — animated impact numbers + partnerships + photo placements
- beyond.html — Beyond the Studio
- colouring-book.html — colouring book teaser page
- volunteer.html — workshop + remote volunteer paths
- partner.html — community partnership page
- donate.html — interactive paint-tube donation/sponsorship page
- styles.css — shared design system
- script.js — counters, paint-splotch facts, donation tube, mobile navigation
- assets/canvas-background.png — supplied canvas texture

PLACEHOLDERS TO REPLACE
1. Workshop photos:
   Search each HTML file for "photo-slot" text and replace the placeholder div with an <img>.
   Example:
   <div class="photo-slot">Workshop photo</div>
   becomes:
   <img src="assets/workshop-1.jpg" alt="Children creating art at a Hands & Canvas workshop">

2. Founder portrait:
   In about.html, replace the .founder-photo placeholder with your image.

3. Jotforms:
   Buttons currently use data-placeholder-action so they show a reminder instead of leaving the site.
   Replace href="#" with your Jotform link and remove data-placeholder-action.

4. Donation processor:
   The donation interface is visual/interactive only. Connect the final donation button to a secure payment/donation service.

5. Logo:
   The current navigation mark is a CSS placeholder. Replace it with your real logo once ready.

NOTES
- The site is intentionally multi-page.
- The homepage previews Impact, Beyond the Studio, Colouring Book, Volunteer, Partner, and Donate.
- The $2,000 sponsorship language is framed as a year of CORE art materials rather than all program costs.
- The paint tube is inline SVG, so it can animate without an external animation website.


V3 UPDATE
- Uses the supplied Hands & Canvas rendered paint-tube PNG.
- The transparent centre fills with CSS/JavaScript as the donation slider moves.
- Paint colour changes at donation milestones.
- Art-material cards pop in as donation amounts rise.
- The same branded tube appears on the homepage sponsorship teaser.
- Section spacing, card proportions, content widths, and photo placeholder heights were standardized for a more balanced layout.


V4 UPDATE
- The donation pop-ups now use the supplied illustrated assets:
  paper → markers → paint → brushes → clay → art kits.
- The objects appear in that exact order according to the slider thresholds.
- The paint surface inside the branded donation tube now has a smoother wave shape.
- New popup assets were added to /assets so the Donate page feels more polished and visual.


V5 UPDATE
- Donation icons are now arranged in a fixed, balanced 3×2 formation around the tube.
- No icon can overlap another or the tube.
- Icon backgrounds are compact rounded squares rather than long coloured blocks.
- Supplied PNGs were enlarged inside their cards without becoming oversized.
- Clay now uses a dedicated clay-chunk graphic instead of a duplicate paint tube.
- The paint is clipped to the exact transparent window bounds of the supplied tube PNG, preventing spill.
- The paint surface uses a smooth wave.
- Mobile layout changes to a clean two-column icon grid below the tube.


V6 UPDATE
- The homepage "Why access matters" section was redesigned into one large image area instead of a split left/right layout.
- The numbered circles were replaced with the supplied paint-splotch PNGs (purple, yellow, teal, pink).
- The splotches no longer show numbers and the fact popup no longer says "Paint splotch 1/2/3/4."
- Facts now open as floating popup cards on the image when a splotch is clicked, instead of living in a permanent side card.
- Homepage action cards were respaced and tightened so the Volunteer / Donate / Partner row feels more even and polished.


V7 VOLUNTEER FORM PROTOTYPE
- Added volunteer-form.html with a fully custom multi-step Hands & Canvas volunteer form.
- Personal/contact information is required on page 1.
- Page 2 asks how the volunteer wants to help.
- Page 3 changes dynamically for Beyond the Studio, Workshops, H&C Team, More Than One, or Not Sure Yet.
- Beyond the Studio is divided into Shareable Art, Create-With-Me Art, and Studio Kits.
- Written responses are intentionally short (300–500 characters).
- The form repeatedly states that prior art or volunteer experience is not required.
- This prototype validates and collects data locally in the browser but does not send or store submissions yet.


V8 STRUCTURAL REDESIGN
- New hover/dropdown navigation: About; Impact (Impact Overview, Timeline); Programs (Workshops, Beyond the Studio, Colouring Book); Get Involved (Volunteer, Partner); Donate remains separate.
- Removed Home from the top navigation; the Hands & Canvas brand returns to the homepage.
- Navigation hides on downward scroll and returns on upward scroll.
- Added Workshops page with real-photo placeholders.
- Added Timeline page with an open paint-tube top, organic SVG paint line, scroll-controlled colour fill, and placeholder events ready for real dates.
- Added two compressed stock videos: one on the homepage and one on Beyond the Studio.
- Homepage access-facts section now uses the uploaded stock image and glossy paint splotches. Multiple fact cards can remain open without overlapping on desktop; mobile stacks them below the image.
- Impact page is distinct from the homepage and includes a moving partnership-name conveyor belt. Replace names with actual logo files later.
- Added stronger colour bands, photographic hero structures, and deeper purple/teal sections to break up the canvas background.
- Added DM Serif Display as a limited secondary editorial font while Poppins remains the functional/main font.
- Forced Poppins on volunteer form inputs, textareas, select menus, buttons, and placeholders.
- Added handsandcanvascontact@gmail.com to the footer/contact links. The volunteer form is still a front-end prototype and does not permanently store/send responses until a backend is connected.


V9 PHOTO-LED REDESIGN
- Added a curated set of real Hands & Canvas workshop / early community-art photographs.
- Built responsive horizontal composites for the Workshops, Impact, Partner, and Timeline heroes.
- Homepage polaroids now use real photos and the supplied glossy pink/teal/purple blob PNGs.
- Added a real-photo editorial story section to the homepage.
- Impact page now uses asymmetrical animated stat blocks and a real-photo mosaic.
- Workshops page now contains photo-led project stories for sculpture, drawing/comics, and clay.
- About, Volunteer, Partner, Beyond the Studio, and Colouring Book pages now use selected real images where appropriate.
- Timeline now uses the supplied open paint-tube PNG, a more dimensional multi-layer paint streak, smaller clustered paint folds as milestone points, a tinted timeline background, and drop-down event animations.
- Volunteer form final step now clearly says it is the last step, points users to Submit, prevents Step 5 of 4, and ensures hidden buttons are truly hidden.
- All yellow buttons now use dark text for contrast.
- The footer is now a deep purple section across the site.
- No new decorative art icons were added in this version.


V10 REFINED UPDATE
- H&C logo is now used in navigation and favicon assets.
- Founder photo replaced with the supplied portrait.
- Extra About-page photo strip removed.
- Impact page rebuilt with a cleaner 2x2 statistic layout and full-photo editorial section.
- Supplied organization logos added to the animated community/partner belt; missing-logo organizations remain text cards.
- SVG logos converted to PNG for web use.
- Workshops and Volunteer pages use full-photo containers to avoid unnecessary cropping and have revised spacing.
- About, Impact, Timeline, and Volunteer page headers use gradients rather than photo backgrounds; Workshops and Partner keep photographic heroes.
- Timeline populated with the dates and milestones supplied by the user. Dates without a supplied year are intentionally shown without a year.
- Timeline uses single glossy paint dots instead of ring clusters, refined cards, and drop-in scroll reveals.
- Subtle ribbon/streak background accents added through CSS, without adding decorative art icons.


V11 CONNECTED / CLEANUP UPDATE
- Volunteer form now posts to the deployed Google Apps Script endpoint:
  https://script.google.com/macros/s/AKfycbzTq0wpEhLNtcgg_f4Tf8Iw9BxTFA3n7Lts7sgUrlPHqkn8BFn5jzdc09WkoMc12D8Q/exec
- Form submissions are sent as URL-encoded form fields for the Apps Script to save in Google Sheets and email to handsandcanvascontact@gmail.com.
- Removed prototype / developer-facing instructional text from public pages.
- Colouring Book preview now intentionally says Coming Soon and no longer uses a real workshop photo.
- Timeline instruction band removed; open-tube graphic now begins directly at the top of the timeline and the spacing was tightened.
- Homepage hero spacing / paint-blob containment refined.
- Volunteer opportunity cards now use a balanced 3-column desktop layout.
- Founder page now includes brian.lu@ucc.on.ca as direct founder contact.
- Donate page now includes the supplied art-supplies stock image.
- Unconfigured donation checkout is labeled Coming Soon; sponsorship button now opens an email inquiry instead of a developer placeholder message.
