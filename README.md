# DEJOIY business website

Public BPO and customer experience website for `https://business.dejoiy.com`.
Built with Next.js 14 Pages Router, React, Tailwind and Framer Motion.

## Develop and verify

```sh
npm ci
npm run dev
npm test
npm run build
npm start
```

Development and production servers use port 5000. `npm test` exercises form
validation, delivery rejection, HTML escaping, origin checks and PDF attachments
with a mocked mail provider. It does not send real email.

## Content and brand

- `data/services.js`: service pages, descriptions and planning measures.
- `data/insights.js`: complete articles and explicitly illustrative delivery examples.
- `data/jobs.js`: role descriptions; applications register interest, not guaranteed vacancies.
- `components/SEO.js`: page titles, descriptions, canonical URLs and social metadata.
- `public/sitemap.xml`: update when adding or removing public routes.
- `public/logo.png` and `public/favicon.png`: original owner-supplied assets. Do not
  recolour, crop, redraw or replace the artwork. The logo uses a light background
  for contrast and retains its original 3:2 ratio.

Unverified client counts, country counts, model counts and placeholder social
links have been removed from the published experience. Add client results,
testimonials, certifications or social profiles only when verified and approved.
The coverage map is a planning guide, not an assertion of office locations.

## Forms and environment

Server-only environment variables (never prefix these with `NEXT_PUBLIC_`):

| Variable                | Purpose                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`        | Resend sending credential, required for form delivery                                   |
| `FROM_EMAIL`            | Sender address on a Resend-verified domain; existing fallback is the Resend test sender |
| `CONTACT_EMAIL`         | Business enquiry recipient; fallback `hello@corp.dejoiy.com`                            |
| `VERIFICATION_TO_EMAIL` | Employment verification recipient; required for this route                              |
| `BGV_TO_EMAIL`          | Background verification recipient; required for BGV                                     |
| `CAREERS_EMAIL`         | Application recipient; falls back to `CONTACT_EMAIL`                                    |

Forms call `/api/contact`, `/api/careers` and `/api/employee-verification`.
The server checks method, content type, same-host browser origin, field lengths,
email syntax, consent, allowed service/role values, a honeypot and minimum form
completion time. User text is escaped before inclusion in HTML email. Delivery
is successful only when Resend returns a message ID without an error. The UI
reports acceptance for delivery, not confirmed inbox delivery. Raw provider
errors, credentials and submitted personal details are not returned or logged.
Client request IDs provide stable Resend idempotency keys for unchanged retries.

PDF attachments are limited to 2 MB, validated for base64 format and PDF header /
end marker, and sent as private email attachments. No public storage URLs are
created. PDF validation is a file-type check, not a malware scanner. The request
body limit is 3 MB for attachment endpoints and 32 KB for contact enquiries.
Recipients, Resend and mail systems handle retention according to their settings.

The in-memory request limiter is a **best-effort per-instance** guard (5 attempts
per network address per 15 minutes), not a distributed abuse-prevention service.
For distributed enforcement, configure platform rate limits or a shared store.
Review production sender verification and recipient configuration before relying
on email delivery. `RESEND_BASE_URL` must not be set to a test server in production.

## Motion and images

- MotionConfig respects reduced motion; looping visualisations use static
  alternatives and stop when outside the viewport.
- Lenis and the custom cursor are limited to fine-pointer devices without a
  reduced-motion preference. There is no mandatory intro-loader delay.
- Photos use `next/image`, responsive sizes and Sharp optimisation.
- Inter is served locally. The logo and favicon are served unchanged.

## Deployment

The repository is connected to the existing Vercel project `dejoiy-site`.
A push to its configured production branch builds the site. Generated `.next`
output and credentials are ignored and must not be committed. Verify the new
commit is Ready and the custom domain points to it before considering deployment
complete. Test actual inbox delivery only with an approved destination and test
submission; local tests use a fake provider.

## Help & Documents and open resources

- `/help`: audience routing and searchable FAQs.
- `/employee-documents`: request-specific checklists and a working email fallback.
- `/employee-verification`: authorisation requirements and existing email fallback.
- `/resources`: searchable, ungated field notes; preview pages, TXT downloads and print-to-PDF.
- `/help/track`: private request history when enabled; explicit email-follow-up guidance otherwise.
- `/staff/documents`: allowlisted staff review, ownership, status changes and authorisation-confirmed document release.

No public visitor account or main-navigation sign-in has been added. Original
logo and favicon bytes are unchanged. Delivery examples remain explicitly
illustrative; no invented testimonials, certifications or outcomes have been added.

### Activate the private portal

The portal ships **disabled until configured**. Email request flows remain
available; their references do not imply online tracking or durable portal records.
No production database or staff permissions are implicitly provisioned by this code.

1. Provision a dedicated PostgreSQL database (Neon through Vercel Marketplace is
   supported). Accept provider terms and choose a plan with the owner. Connect the
   database to this project; do not reuse an unrelated app's database or credentials.
2. Configure server-only `DATABASE_URL` using the provider's TLS-enabled connection
   string, `RESEND_API_KEY`, verified `FROM_EMAIL`, and `DOCUMENTS_STAFF_EMAILS`
   (comma-separated, individually approved work email addresses; no domain wildcard).
   Optionally set `DOCUMENTS_NOTIFY_EMAIL`; otherwise the first approved reviewer
   receives portal notifications. Email fallback uses this variable, then
   `CONTACT_EMAIL`, then the existing `hello@corp.dejoiy.com` mailbox.
3. Set `DOCUMENTS_SITE_URL=https://business.dejoiy.com`. For local testing use the
   actual localhost origin. A preview must use its own origin and isolated database.
4. Pull environment configuration securely to ignored `.env.local`, then run
   `npm run documents:migrate` with Node 20+. The additive schema creates only
   `document_*` tables. Review `lib/documents/schema.sql` before applying it.
5. Configure a random server-only `CRON_SECRET` (at least 32 characters). The
   daily Vercel cron in `vercel.json` calls the protected `/api/document-retention`
   route. Verify its execution after deployment. For manual maintenance use
   `npm run documents:cleanup` with the same private environment.
   It permanently removes expired portal data (including attached files and audit
   events) after 90 days, and expired tokens, sessions and limiter buckets. Coordinate
   backup retention with the provider. Configure retention maintenance **before**
   enabling the portal; the cleanup endpoint requires the cron bearer secret.
6. Set `DOCUMENTS_ENABLED=true` and redeploy. Verify delivery to an approved test
   inbox, request submission, staff review, missing-information reply and private
   download before inviting real document submissions. Never use real personnel
   data for a test.

### Portal security and operational behaviour

`/api/documents/[action]` verifies exact configured origin on every POST, validates
all input, and stores only SHA-256 hashes of random 256-bit email-link/session
secrets. Email links carry the token in the URL fragment, are explicitly confirmed
by the user, expire after 15 minutes and are consumed atomically once. The browser
removes the fragment immediately; private pages use a no-referrer policy. Requester
sessions expire in eight hours and staff sessions in one hour. Production cookies
use the `__Host-` prefix, HttpOnly, Secure and SameSite=Strict. Removing an address
from the staff allowlist invalidates its access on the next API call.

The verified session determines request ownership; a submitted email or request ID
cannot override it. Every detail/file query checks ownership or approved staff
access. Files (PDF, max 2 MB) are stored in private database rows and delivered as
attachments after authentication, with no-store headers. File-type validation is
not malware scanning. The schema is intended for modest document volumes; add a
private object store and malware scanning if operational scale requires them.

Request creation is transactionally idempotent per verified email and client UUID.
Concurrent staff updates use a version check, and the request, file and history
changes commit together. Completion requires an explicit human authorisation
review confirmation. Staff reads/downloads and updates are audited. Requesters see
only public history; reviewer identities and internal review records stay private.
Notification failure does not discard a saved request/update and is shown in the
UI. Email acceptance is not proof of inbox delivery. There is no delivery webhook.

Shared database limits apply to link requests (3 per address and 10 per network
address per 15 minutes, 100 globally per day), verification attempts and writes.
These are initial operational limits; review capacity before launch. General
contact/career/email-fallback forms retain the existing per-instance limiter.
The staff queue loads 50 records at a time; status filters apply to loaded records,
with Load more to retrieve older requests. Private data expires at 90 days and is
not accessible after expiry even if retention cleanup has not yet run.

`tests/documents.test.mjs` runs the real schema and SQL transactions in an isolated
PGlite PostgreSQL database with a fake email sender. It covers ownership isolation,
one-use/expired links, session expiry/revocation, file permissions, validation,
CSRF, rate limits, concurrent reviews, idempotency and document release. No real
email or production records are used by automated tests.

Browser verification: after `npm run build`, run `npx playwright install chromium`
and `npm run test:browser`. The harness starts isolated PostgreSQL, two local
Next servers (portal enabled and email fallback) and a fake Resend endpoint.
`BROWSER_EXECUTABLE_PATH` can select an existing Chromium binary;
`PORTAL_ONLY=1` limits a rerun to the private journey. Local ports 5000, 5002,
5051 and 5434 must be available. Test evidence is written to ignored
`test-results/documents/`. The test contains only synthetic example.com data.

## Visual and motion system

The homepage uses ThreeUI Community's MIT-licensed `LiquidFormBackground`
(`@designcodeio/threeui` 1.2.0; see `THREEUI-LICENSE.txt`) inside the DEJOIY
capability explorer. The original renderer is dynamically loaded, without
copying Pro components or changing the DEJOIY logo. Only capable fine-pointer
desktops mount WebGL; mobile, data-saving, reduced-motion and unsupported
browsers receive the CSS sculpture. Offscreen, hidden-tab and paused scenes
unmount the renderer. The hero includes a pause control. No site content or
forms depend on the shader loading successfully.
The renderer starts after the headline entrance and falls back if the initial
frame sample is below 22 fps or the WebGL context is lost.

Scroll text, section reveals, reading progress and tactile controls share the
navy/blue/lilac design system. The capability controls are real buttons and
link to the relevant services; decorative visuals do not represent live data.


## Verification tickets in OrbitDesk

BGV and employment forms can create private tickets in `partnersdejoiy-hash/Enterprise-Ticketing`. Set `ORBITDESK_URL` to its HTTPS origin and `ORBITDESK_INTAKE_SECRET` to the same server-only key as its `BUSINESS_SITE_INTAKE_SECRET`. Then set `ORBITDESK_ENABLED=true`. Never use a `NEXT_PUBLIC_` prefix. Complete the receiver's migration and approved department routing before enabling it.

The API validates and signs submissions, waits for committed ticket/file storage, then displays the ticket number. Retries reuse the request UUID. If storage fails the form reports an error; email-only success is never substituted while ticketing is enabled. Notification failure after storage is reported separately. The two existing inboxes receive reference-only notifications. With the flag off, the existing email workflow continues. The separate private document portal is not used for these two form types when ticketing is enabled.

The intake creates requests, not verification decisions. Staff must independently verify the requester and authorisation before releasing employee information.
