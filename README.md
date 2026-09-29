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

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend sending credential, required for form delivery |
| `FROM_EMAIL` | Sender address on a Resend-verified domain; existing fallback is the Resend test sender |
| `CONTACT_EMAIL` | Business enquiry recipient; fallback `hello@corp.dejoiy.com` |
| `VERIFICATION_TO_EMAIL` | Verification recipient; falls back to `CONTACT_EMAIL` |
| `CAREERS_EMAIL` | Application recipient; falls back to `CONTACT_EMAIL` |

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
