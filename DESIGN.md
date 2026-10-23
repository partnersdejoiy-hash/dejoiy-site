---
name: The DEJOIY Connection
description: Editorial white and navy with a motion-led branded D narrative.
colors:
  ink: "#10152d"
  blue: "#2354ed"
  pink: "#e91b8d"
  cyan: "#00b8cc"
  paper: "#fafbff"
  soft: "#eff3fd"
  muted: "#566078"
  night: "#060c23"
  white: "#ffffff"
  blue-hover: "#143fcb"
  tab-surface: "#e2e9fa"
  delivery-surface: "#101b3a"
  delivery-open: "#182c5d"
  interior-surface: "#101e41"
  interior-hover: "#16274f"
  field-surface: "#08132c"
  field-border: "#60769e"
  field-focus: "#b3ceff"
  field-placeholder: "#becde8"
  manifesto-inactive: "#7b8499"
  interior-rule: "#cbd2e1"
  interior-field-border: "#b6c1d7"
  interior-placeholder: "#647088"
  principle-blue: "#eaf0ff"
  principle-pink: "#fcecf5"
  principle-cyan: "#e3f5f7"
typography:
  display:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    fontSize: "clamp(64px, 6.15vw, 96px)"
    fontWeight: 600
    lineHeight: 1.01
    letterSpacing: "-0.055em"
  headline:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    fontSize: "clamp(46px, 6vw, 88px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.045em"
  title:
    fontSize: "clamp(28px, 3vw, 42px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.045em"
  body:
    fontFamily: '"Bricolage Grotesque", sans-serif'
    fontSize: "18px"
    lineHeight: 1.55
  label:
    fontSize: "14px"
rounded:
  field: "12px"
  interior-field: "9px"
  tab: "14px"
  accordion: "16px"
  story-image: "18px"
  service-card: "20px"
  industry-image: "22px"
  service-stage: "24px"
  action: "40px"
  circle: "50%"
spacing:
  gutter: "5vw"
  chapter: "140px"
  chapter-phone: "85px"
components:
  action-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.action}"
    padding: "10px 10px 10px 24px"
  service-tab:
    backgroundColor: "{colors.tab-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tab}"
    padding: "23px 24px"
  service-tab-selected:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
  service-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.service-card}"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.interior-field}"
    padding: "14px 18px"
---

# Design System: DEJOIY

## Overview

**Creative North Star: "The DEJOIY Connection"**

The DEJOIY Connection uses a white editorial foreground, deep navy operational chapters and cobalt, pink and cyan accents drawn from the brand direction. Bricolage Grotesque keeps the business voice warm and direct. A layered, reflective D connects the opening narrative to the identity, replacing the earlier mint/coral rings.

Motion explains a customer request moving through Connect, Understand and Resolve. The homepage receives this authored composition; all non-home routes now receive a light interior wrapper, while services, industries, about, careers, people, contact and articles add page-specific exploration or reading layouts. Existing routes and functional flows remain the product constraints. This code-led implementation has no approved image composition and makes no verified novelty claim. Workplace photography remains illustrative.

**Key Characteristics:**
- White/navy editorial contrast with brand colour accents
- A reflective layered D and topology-changing particles
- Scroll-linked narrative, photographic aperture and word emphasis
- Rounded service surfaces and pill actions

## Colors

### Primary
Cobalt blue drives primary calls to action, selected expertise tabs, chapter progress and navigation emphasis. Deep ink carries text on white; night anchors homepage delivery and the footer, while interiors use paper grounds.

### Secondary
Pink supplies small signal accents and text selection; cyan completes the brand triad in the sculptural scene. The reflective D and particle shaders use authored colour variants for lighting and material response rather than exact flat CSS colours.

### Neutral
Paper is the homepage ground, soft supports expertise and thinking surfaces, and muted carries supporting text on light sections. White cards and pale blue tab surfaces separate interactive content without heavy borders. Navy interior surfaces, blue-grey borders and light blue field focus preserve dark-page legibility.

**The Brand Connection Rule.** Keep the cobalt, pink and cyan relationship visible through the authored scene and purposeful accents; use white/navy fields for readable business content.

## Typography

Self-hosted Bricolage Grotesque weights (400/500/600) provide the active family. Inter remains loaded by the app for compatibility but is not in the current business-theme stack.

The frontmatter records final desktop roles, including late cascade overrides. Hero display becomes (6.5vw) below (1100px) and (12.2vw) at (760px) and below. Scroll chapter titles use (clamp(40px, 4.1vw, 62px)), leading (1.05); chapter descriptions generally use (18px/1.6) with a (37ch) limit. Homepage body becomes (17px) on phones. The manifesto starts in its inactive blue-grey token before scroll emphasis darkens words to ink; its inactive colour is intended for the large text role. The manifesto is (clamp(32px, 4vw, 58px)), weight (500), leading (1.22), tracking (-0.035em), with a (26ch) limit. Interior titles use (clamp(44px, 6vw, 88px)), leading (1.03), and an (18ch) maximum. The footer wordmark is (21vw), weight (600), tracking (-0.065em).

The light interior introduction is a separate type role: weight (500), size (clamp(48px, 6.6vw, 100px)), leading (1.01), tracking (-0.065em), maximum (950px). At (1000px) it becomes (clamp(44px, 7vw, 70px)); at (700px) it becomes (clamp(44px, 12.3vw, 74px)). Its body uses (18px/1.65), maximum (590px), reducing to (16px) on phones. Uppercase interior labels use (12px), weight (500), tracking (0.07em).

## Layout

The homepage uses (5vw) gutters and the chapter spacing in the frontmatter. Its opening story spans (360svh), with a sticky stage below the (84px) header and a (46%/54%) editorial copy/visual split. Stage height is (100svh - 84px), minimum (620px); at compact desktop widths the split becomes (48%/52%) with a (610px) minimum. Beyond (1700px), stage gutters center a (1550px) content region. Header/footer containers cap at (1600px).

On phones at (760px) and below, the header becomes (74px), the story spans (300svh), and the sticky stage becomes a block with a (700px) minimum. Copy occupies the top; the scene is positioned beneath it; chapter and channel controls stack at the bottom. These remain sticky narrative sections rather than a separate mobile composition. Height-aware rules compact the stage when phone width is at most (760px) and viewport height is at most (780px): stage minimum height is removed, copy minimum becomes (255px), hero type becomes (10.5vw), chapter titles become (8.5vw), and scene annotations condense. At desktop widths from (761px) with height at most (740px), stage/visual minimum heights are removed, hero type becomes (5vw), chapter titles become (3.8vw), and copy spacing tightens. The human photo section spans (220svh) with a sticky viewport. Expertise uses an equal image/copy split, delivery a (1fr/1.3fr) workspace, thinking an asymmetric (1.15fr/1fr) grid. Narrow screens stack these surfaces. Industry cards scroll and snap natively, with (33%) desktop widths, then (40%) at compact widths; alternating cards are vertically staggered.

All non-home routes use the `interior-site` wrapper: paper background, ink text and soft light cards. Interior containers cap at (1440px), using (5vw) gutters; above (1600px) gutters become (60px). Introduction grids pair copy and image sheets in (1.5fr/1fr) columns with (6vw) gaps and a (480px) minimum. Services use (1fr/1.3fr) menu/preview columns; industries use (1fr/1.8fr). Services previews stick at (110px); reading navigation sticks at (120px). Contact uses a (1fr/1.3fr) information/form split. People use a spotlight and three-column roster; careers use filterable list rows.

Interior compact rules begin at (1000px), narrowing grid gaps and changing the roster to two columns. At (700px), introductions, explorers, principles, contact, people and reading layouts stack. Service/industry menus become horizontal snapping button strips; reading navigation becomes static. Mobile service previews have a (500px) minimum and industry panels (520px). These interior breakpoints coexist with the homepage’s separate (760px) behavior.

## Elevation & Depth

The identity scene supplies real material depth: three bevelled extruded D layers use physical materials with metalness (0.78), roughness (0.18), clearcoat (1) and clearcoat roughness (0.14). PMREM-filtered RoomEnvironment reflections, directional lights and ACES filmic tone mapping shape the finish. GPU particles morph from a halo into a review network and output lanes as the scroll narrative advances. These are authored metaphors, not representations of verified operational data.

Most content surfaces stay flat and tonal. The header uses a translucent paper ground with (14px) backdrop blur. The floating signal pill uses shadow (0 10px 40px #17336b14); delivery uses a localized luminous pulse (0 0 30px #ec3aa1). Shared interior glass classes remove blur and shadows.

Interior introductions layer cyan and pink rotated image sheets behind an arched photograph. The front sheet has shadow (0 24px 60px #10152d17); its lower gradient supports white overlaid text. Photo-led service/industry previews use dark image gradients for readable white copy. Principle backgrounds switch among the three light brand-tinted surfaces; the decorative symbol uses rotating blue, pink and cyan outlined shapes.

## Shapes

Pill actions and circular arrow discs replace square homepage controls. Expertise tabs, service stages, image windows, service cards and accordion rows use the distinct corner values in the frontmatter. Shared form fields use the smaller field radius. The D motif repeats as a dimensional identity in the hero and as a large quiet typographic backdrop in the closing navy chapter.

Interior fields use a tighter (9px) radius, preview panels (18px), and contact form shells (16px). Introduction image sheets use asymmetric arch corners (50% 50% 20px 20px). People spotlight photographs use (160px 160px 15px 15px); roster thumbnails are softly rounded (5px). Interior primary/secondary actions remain pills.

## Components

- **Brand/navigation:** original logo image plus a Bricolage DEJOIY lockup and “People. Possibility.” subtitle. Desktop links turn cobalt on hover/current route; phone navigation exposes expanded state, supports Escape and closes on route changes. The contact action remains visible.
- **Arrow action:** primary blue pill with an inset white circular arrow; hover darkens blue and lifts (-2px), while active scales to (0.98). Text links carry a pale blue circular arrow that moves diagonally on hover. The closing chapter reverses the primary action to white with a blue arrow disc.
- **Narrative controls:** Voice/Chat/Email buttons use aria-pressed and emphasize the corresponding scene layer and particle accent. Connect/Understand/Resolve buttons jump to scroll chapters and use aria-current="step". Inactive chapter copy is hidden; active copy appears without an opacity transition gating readability. A pause control exposes its pressed state.
- **Expertise tabs:** tablist/tabpanel semantics, selected state, roving tab index, ArrowLeft/ArrowRight and Home/End. Selection replaces the illustrative image, headline, copy and service routes together.
- **Delivery:** native accordion buttons expose aria-expanded/aria-controls and reveal one content panel. An adjacent decorative spine moves a luminous dot to the selected stage.
- **Industry filmstrip:** focusable named region, native overflow/touch scroll and snap positions, plus labelled previous/next controls. Image hover zooms to (1.055), with the circular arrow rotating (45deg).
- **Service card:** shared interior image-led white tile, (230px) photograph, (28px) copy padding, ink heading and blue service label. Hover photo scale is (1.04) over (0.8s).
- **Interior fields:** white backgrounds, ink text, soft blue-grey borders and muted placeholders. Focus turns the border cobalt and adds a translucent cobalt (3px) ring; keyboard focus uses a cobalt (2px) outline at (3px) offset. Search shells use the same light family. Select options are white with ink text.

The scene is dynamically loaded and decorative (aria-hidden). Device pixel ratio caps at (1.25) below (700px), otherwise (1.6). Offscreen and hidden-document rendering pauses; unmount disposes geometry, materials, environment resources, observers, listeners and renderer. Paused/reduced mode renders static frames on invalidation and stops its continuous animation loop. It uses an SVG D fallback if WebGL fails or loses context. Progress enters through a shared ref; phase changes explicitly invalidate the static scene, so paused/reduced rendering redraws when Connect, Understand or Resolve changes. Channel, pause, resize and media changes also request a static frame; the paused scene does not redraw on every scroll tick.

GSAP ScrollTrigger drives the photographic aperture from a rounded inset to a full viewport, photo scale (1.16→1), photo-copy reveal and manifesto word colour emphasis. These visual effects are installed only when reduced motion is not requested at initialization. Reduced-motion CSS restores an unclipped static photograph, visible photo copy and ink manifesto text; the app also uses MotionConfig reducedMotion="user". Viewport Reveal wrappers use (0.9s) with a (32px) vertical range and initial=false. Interactive motion generally uses cubic-bezier(0.22, 1, 0.36, 1). Global focus is a cobalt (3px) outline at (5px) offset; fields have their own focus style.

The expanded interior patterns are implemented in `styles/interiors.css`, loaded after the business theme:

- **Page introduction:** route-specific illustrative artwork, layered cyan/pink sheets, eyebrow, title, supporting copy and People/Process/Possibility rule. The decorative art is aria-hidden. Scroll moves it vertically (0→65px) and rotates (-7→5deg); reduced motion removes that mapping. Copy translates from (18px) over (0.8s).
- **Services/industries:** numbered aria-pressed selector groups replace the linked image preview and supporting text. Service previews use aria-live="polite", capabilities as outlined pill tags and an explicit service link. Selected menu rows turn cobalt/white and shift their left padding. These are button groups, distinct from the homepage’s semantic tabs.
- **About principles:** People/Process/Technology buttons update title, description, path and tinted background. The outlined symbol rotates and scales with a spring (stiffness 90, damping 22); reduced motion sets its duration to zero. Detail updates are politely announced.
- **Careers:** labelled search filters title/location and department chips filter team. A polite result count, role links and a clear-filters empty state support exploration. Rows translate (12px) over (0.35s) with a (0.03s) index stagger; reduced motion suppresses the initial offset.
- **People:** image-led spotlight with role and quotation presentation, plus selectable roster buttons with aria-pressed. The documentation describes the UI pattern without verifying biographical or testimonial claims.
- **Reading mode:** a sticky “In this article” navigation links to numbered article sections, marks the active section with aria-current="location", and uses passive scroll plus resize listeners with a single pending animation-frame update. It selects the last section whose top is at or above (165px); clicks update the active state immediately. Cleanup removes listeners and cancels the pending frame. Body text caps at (740px), leading (1.8), with explicit muted paragraph/list colours; target sections use zero scroll margin so root scroll padding controls anchor positioning. The navigation becomes static on phones.
- **Contact/help/documents/resources:** light soft panels, readable ink labels, blue actions and themed result/resource cards preserve existing operational flows. The contact form is housed in a rounded soft panel beside contact information; this is a page-specific layout rather than a promise of changed submission behavior.

Interior route wrappers translate (10px) over (0.55s) with no initial offset under reduced motion. Interior reduced-motion CSS disables transitions and smooth scrolling; component hooks suppress intro parallax, service-preview entrance scale and job-row offsets, and set principle animation to zero duration. Interior changes preserve homepage V2 motion and composition.

Service detail pages additionally use **DeliveryPlan** across all eight service routes. Discover, Prepare and Improve are native aria-pressed stage buttons tied to each service’s task headings. Selection updates a politely announced planning explanation and a decorative three-segment progress meter; service-specific measures remain visible and are explicitly planning measures, not performance guarantees. The meter uses a spring (stiffness 120, damping 25), changing scale and opacity; reduced motion sets duration to zero. The equal-column plan grid uses a (6vw) gap and stacks at (700px), with panel padding reducing from (32px) to (25px).

Final light-surface overrides explicitly cover portal panels, help routes, document selectors, checklists, request details and downloads. Titles/field values use ink, supporting copy uses muted, interactive icons use blue, and selected document types use a pale blue surface with a cobalt inset rail. Error text uses a dark red; request status badges distinguish standard blue, completed green and needs-information amber using dark text on light tinted grounds. Keyboard field focus uses the cobalt outline described above. The custom 404 presents a large cobalt number, pink arrow and explicit home/support routes within the light interior shell.

Native CSS smooth anchors use root scroll padding (110px). Lenis imports its bundled CSS, disables its own anchor handling (anchors: false), and enables stopInertiaOnNavigate to avoid competing scroll systems. Article sections use zero scroll margin; the people spotlight retains a (110px) scroll margin. Reduced-motion CSS restores native auto scrolling. Interiors explicitly declare color-scheme: light. This is navigation behavior, not additional page composition.

Insight thumbnails reuse existing customer-experience, back-office and careers photographs after older dated/watermarked references were removed. No new imagery assets were created for this substitution; these photographs retain their illustrative status.

## Do's and Don'ts

- Do use the current DEJOIY palette and Bricolage Grotesque stack.
- Do make motion support the Connect, Understand and Resolve narrative.
- Do preserve keyboard controls, static fallbacks and reduced-motion behavior.
- Do preserve existing routes, forms and interior content.
- Do describe workplace photography as illustrative when context requires it.
- Don’t restore the rejected mint/coral ring direction.
- Don’t claim the shared theme is a sitewide composition overhaul.
- Don’t invent clients, metrics, testimonials, certifications or verified novelty.
- Don’t gate narrative readability behind an opacity entrance.
