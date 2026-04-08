# DEJOIY Corporate Website

A premium Next.js corporate website for DEJOIY — a Global BPO + AI Services company.

## Tech Stack
- **Framework**: Next.js 14 (Pages Router)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion, GSAP
- **Email**: Resend (via API routes)
- **Package Manager**: npm

## Running the App
```bash
npm run dev   # http://localhost:5000
```

## Project Structure
```
pages/
  index.js              # Homepage
  services.js           # Services page
  industries.js         # Industries page
  insights.js           # Articles & reports
  careers.js            # Careers & job listings
  our-people.js         # Team page
  contact.js            # Contact form
  employee-verification.js  # Background verification form
  404.js                # Custom 404
  _app.js               # App wrapper (Header, Footer, PageTransition)
  api/
    contact.js          # Contact form API → Resend email
    verification.js     # Verification form API → Resend email

components/
  Header.js             # Sticky navigation with mega-menu dropdowns
  Footer.js             # Editorial footer with links
  MegaMenu.js           # Dropdown mega-menu for nav
  HeroSection.js        # Split-layout hero: text left, NeuralNetworkViz right
  BackgroundFX.js       # CSS-only animated background (replaces Three.js)
  NeuralNetworkViz.js   # Animated SVG neural network (11 nodes, 16 edges, flowing paths)
  AIServicesViz.js      # 5-tab animated service visualization (neural/pipeline/flow/shield/workflow)
  WorldPresence.js      # SVG world map with pulsing region dots and connection lines
  SectionHeading.js     # Reusable section heading with badge + animation
  ServiceCard.js        # Service card with glass effect + mouse-tracking glow
  IndustryGrid.js       # Industry cards grid
  EmployeeGrid.js       # Team photo cards (grayscale → color on hover)
  InsightCard.js        # Article/insight cards
  JobListings.js        # Job listings with apply button
  AnimatedCounter.js    # GSAP-powered number counter
  LogoMarquee.js        # Infinite horizontal logo scroll
  ContactForm.js        # Contact form (POST to /api/contact)
  VerificationForm.js   # Verification form (POST to /api/verification)
  PageLoader.js         # 1.8s branded intro animation
  PageTransition.js     # Framer Motion page transitions
  SmoothCursor.js       # RAF-based lag cursor with inertia ring

styles/
  globals.css           # Global styles, glass utilities, orb animations

animations/
  fadeInUp.js, floating.js, pageTransition.js, stagger.js
```

## Environment Variables
All managed via Replit Secrets / Environment Variables:
- `RESEND_API_KEY` — Resend API key (secret)
- `CONTACT_EMAIL` — Business contact email
- `VERIFICATION_TO_EMAIL` — Verification department email
- `FROM_EMAIL` — Sender email address (onboarding@resend.dev)

## Design System
- **Background**: Deep dark `#05071a` with CSS animated orbs
- **Primary accent**: `#6B5CFF` (purple)
- **Accent blue**: `#2E7BFF`
- **Accent pink**: `#FF4FD8`
- **Typography**: Inter (Google Fonts)
- **Glass effect**: `.glass`, `.glass-strong`, `.glass-card` CSS classes
- **Layout**: `.section-wrap` (max-w-7xl, responsive padding)

## Notes
- Three.js WebGL was removed (crashes in sandboxed environments). BackgroundFX.js now uses pure CSS animated orb gradients.
- The `env.local` file was deleted; all secrets are in Replit's secure store.
- Dev server runs on port 5000, bound to 0.0.0.0 for Replit preview compatibility.
