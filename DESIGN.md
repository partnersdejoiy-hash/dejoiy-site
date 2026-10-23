---
name: DEJOIY — Better, together
description: Bold colour chapters for connected, human-led business operations.
colors:
  ink: "#123d35"
  mint: "#dcebcf"
  paper: "#f7f8f2"
  coral: "#fa7759"
  green: "#154c40"
  muted: "#476355"
  delivery-ground: "#c8dabd"
  delivery-dark: "#174c40"
  delivery-mid: "#89b69c"
  delivery-light: "#b3d1b4"
  delivery-paper: "#e9edda"
  industry-ground: "#f2ded4"
  link-surface: "#e9ede3"
  interior-surface: "#1c5045"
  interior-hover: "#255f50"
  primary-hover: "#edf5e5"
  secondary-surface: "#245647"
  secondary-hover: "#326a59"
  interior-copy: "#e1e9dc"
  field-border: "#698e7d"
  field-placeholder: "#c5d8ca"
typography:
  display:
    fontFamily: '"Bricolage Grotesque", "Inter", sans-serif'
    fontSize: "clamp(100px, 12vw, 176px)"
    fontWeight: 600
    lineHeight: 0.87
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Bricolage Grotesque", "Inter", sans-serif'
    fontSize: "clamp(46px, 6.5vw, 94px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontSize: "clamp(28px, 3vw, 44px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  body:
    fontFamily: '"Bricolage Grotesque", "Inter", sans-serif'
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontSize: "15px"
rounded:
  square: "0"
  round-control: "50%"
spacing:
  chapter: "130px"
  chapter-mobile: "80px"
  gutter: "4vw"
  gutter-mobile: "5vw"
components:
  button-world:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "18px 24px"
    height: "60px"
    rounded: "{rounded.square}"
  button-primary:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    padding: "14px 22px"
    rounded: "{rounded.square}"
  button-secondary:
    backgroundColor: "{colors.secondary-surface}"
    textColor: "{colors.paper}"
    padding: "14px 22px"
    rounded: "{rounded.square}"
  service-tab:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    padding: "24px"
  service-tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  service-card:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
---

# Design System: DEJOIY

## Overview

**Creative North Star: "Colour chapters"**

Colour chapters give DEJOIY a bold, human-led business presence: uninterrupted mint, paper, deep green and coral fields carry oversized warm grotesk headlines and direct routes into services. Three linked sculptural rings express the shared metaphor “People. Process. Possibility.”

This is a code-led implementation, with no approved image composition. The homepage establishes the full visual language; shared interiors preserve their content and functions within green surfaces, mint controls and image-led services. Repository photography is illustrative, not verified team photography.

**Key Characteristics:**
- Large colour fields and tightly tracked type
- Square controls and image-led service surfaces
- Linked sculptural rings with restrained responsive motion

## Colors

### Primary
Deep green ink anchors text on light fields, dark calls to action and the footer. Mint is the welcoming hero and navigation ground, service-card surface and interior primary action. Green provides the people chapter and interior introductions.

### Secondary
Coral marks the closing conversation chapter, text selection and global focus outlines. Delivery uses four distinct green tones on a soft green ground. Industry imagery sits on a warm blush ground. These are implemented chapter assignments, not a synthesized tonal scale.

### Neutral
Paper supports light chapters and text on dark fields. The quieter link surface distinguishes service links. Interior surfaces and hover tones remain green; interior supporting copy uses its lighter neutral token. Muted is declared in the source but currently has no selector consumer.

**The Chapter Field Rule.** Use large uninterrupted colour fields to establish section boundaries.

## Typography

Bricolage Grotesque is self-hosted in weights (400/500/600), with Inter and sans-serif fallbacks. One warm grotesk carries display and body text; no separate serif or mono voice is implemented.

The frontmatter records desktop homepage roles. Hero display overrides to (13vw) below (1100px), (11.8vw) at (761–1000px), and (22vw) on phones. General phone chapter headings use (12vw); the people and closing chapters use (14vw). Homepage body falls to (17px), with paragraphs typically limited to (48ch). Hero introduction uses (30px), then (25px) at narrower widths. Service-card titles use (27px), leading (1.1), tracking (-0.03em); their body uses (17px/1.5). Interior introductions use (clamp(44px, 6vw, 88px)) with leading (1.02), inherited tracking (-0.058em), and an (18ch) maximum. Footer wordmark uses (clamp(90px, 20vw, 310px)), leading (0.9), tracking (-0.065em).

## Layout

Homepage chapters use desktop gutters and chapter spacing from the frontmatter. The hero pairs headline and introduction in a (1.2fr/1fr) grid with an (8vw) gap. Its ring object is (460px) tall with a (-35px) top margin, overridden to (290px) and zero margin on phones. These final cascade values supersede earlier declarations in the same stylesheet.

Service pathways and human story use two columns; ideas use an asymmetric (1.2fr/1fr) grid with a lead image spanning two rows. Industry cards form a native scrolling, snapping filmstrip with explicit previous/next controls (48px square): (35%) width normally, (42%) below (1100px), (82%) on phones. Delivery panels occupy a fixed (480px) height on desktop; one expands to four shares while closed labels rotate vertically.

At (760px) and below, navigation becomes a menu, chapters stack, tabs become vertical, the accordion becomes an auto-height vertical stack, and chapter gutters/spacing use their mobile values. Header minimum height changes from (94px) to (78px); its contact action stays visible. Header and footer containers cap at (1600px). Beyond (1700px), chapter side padding centers a (1500px) content region. Interior introductions use (100px 0 70px), then (65px 0 50px) on phones.

## Elevation & Depth

Flat colour and photographic crop create structural separation. Shared glass surfaces explicitly remove blur and box shadow. The linked torus scene supplies the signature material depth through directional lighting, roughness (0.24) and metalness (0.28); ring materials use their own green, coral and cream values, distinct from the chapter tokens. Imagery crops with cover and gently scales on hover. The scene is decorative and hidden from assistive technology.

## Shapes

Chapters, service imagery and primary/secondary buttons use square edges. A circular (40px) pause control is the intentional round exception. Shared form fields are square, with ink backgrounds, paper text, soft green borders and pale green placeholders. Focus uses a mint (2px) outline with (2px) offset and removes the legacy violet shadow.

## Components

- **Navigation:** original brand artwork on a paper plaque, mint header, plain text links with underlined hover/current state. The mobile menu exposes expanded state, closes on route changes, and supports Escape with focus restoration.
- **Actions:** homepage dark buttons lift (-3px) on hover and turn green; shared interior primary buttons are mint and secondary buttons dark green. The header action is ink on paper text, with (14px 23px) padding. Global keyboard focus is a coral (3px) outline with (5px) offset.
- **Service selector:** semantic tabs expose selected state and support arrows, Home and End. The chosen image, service links and description update together. The selected pathway also changes the emphasized ring when the scene is animating.
- **Service card:** a linked image-led tile with a (230px) photo, (26px) text padding, heading/arrow, description and bottom-aligned service label. Hover scales the photograph to (1.045).
- **Delivery accordion:** native buttons with aria-expanded and controlled hidden content. Expansion animates flex over (0.45s) with cubic-bezier(0.22, 1, 0.36, 1).
- **Page introduction:** green field with a large paper title, explanatory copy and optional children. Entrance is (0.7s); reduced-motion preference suppresses its initial offset.
- **Connection scene:** dynamically loaded Three.js; capped device pixel ratio (1.5), SVG fallback, pause control, pointer tilt, offscreen/document-hidden suspension and resource disposal. Reduced motion and pause stop the animation frame loop after a static render. Selection, resize and media-preference changes invalidate the static scene and request a fresh frame.
- **Footer:** deep ink ground, paper text, grouped routes and an oversized decorative DEJOIY wordmark. Typography remains mixed-scale for utility navigation and the closing brand gesture.

Homepage link/button transitions use (0.25s ease); image zooms range from (0.6s) to (1s). Reduced-motion CSS suppresses homepage transforms/transitions while preserving caption centering; the application also uses MotionConfig reducedMotion="user". Shared form fields use their own mint focus outline. Contact utility labels use mint for contrast on dark green surfaces. The people photograph enters through the same restrained Reveal wrapper as chapter headings.

## Do's and Don'ts

- Do use the shared Bricolage Grotesque stack and green/mint palette.
- Do retain existing routes and functional content when extending interiors.
- Do identify workplace imagery as illustrative where context requires it.
- Do preserve keyboard controls, visible focus and reduced-motion behavior.
- Don’t add fabricated commercial proof, client marks or testimonials.
- Don’t replace chapter fields with decorative gradients or glass effects.
- Don’t describe a rendering fallback as an approved image composition.
- Don’t introduce navy/violet field styling into the green interior surfaces.
