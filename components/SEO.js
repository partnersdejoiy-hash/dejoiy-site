import Head from "next/head";
import { useRouter } from "next/router";
const meta = {
  "/": [
    "BPO & Customer Experience",
    "DEJOIY brings people-led customer support, back-office operations and AI-assisted workflows together.",
  ],
  "/services": [
    "Our BPO Services",
    "Explore customer experience, back-office, AI data operations, trust and safety, and business support services.",
  ],
  "/industries": [
    "Industry Solutions",
    "Explore how DEJOIY approaches customer support and operations across retail, technology, healthcare and other sectors.",
  ],
  "/about": [
    "About DEJOIY",
    "Meet the thinking behind DEJOIY: people-led service and technology-enabled business operations.",
  ],
  "/our-people": [
    "Our People",
    "Meet the DEJOIY team behind customer experience, business operations and digital delivery.",
  ],
  "/insights": [
    "Operations Insights",
    "Practical guides to customer experience, AI-assisted operations and quality review.",
  ],
  "/case-studies": [
    "Delivery Examples",
    "Explore illustrative delivery scenarios and the measures used to evaluate operational quality.",
  ],
  "/careers": [
    "Careers",
    "Explore roles at DEJOIY and register your interest in customer experience and operations opportunities.",
  ],
  "/contact": [
    "Contact Our Team",
    "Discuss your customer support, back-office or AI operations requirements with DEJOIY.",
  ],
  "/employee-verification": [
    "Employee Verification",
    "Submit an authorised employment verification request to DEJOIY.",
  ],
  "/privacy": [
    "Privacy Notice",
    "How enquiries, applications and verification requests are handled on the DEJOIY business website.",
  ],
  "/terms": [
    "Website Terms",
    "Information about using DEJOIY’s business website.",
  ],
};
export default function SEO({ title, description, noindex = false }) {
  const router = useRouter();
  const fallback = meta[router.pathname] || [
    "Business Operations",
    "People-led service and technology-enabled business operations from DEJOIY.",
  ];
  const t = `${title || fallback[0]} | DEJOIY`;
  const d = description || fallback[1];
  const canonical =
    "https://business.dejoiy.com" + router.asPath.split("?")[0].split("#")[0];
  return (
    <Head>
      <title>{t}</title>
      <meta name="description" content={d} key="description" />
      <link rel="canonical" href={canonical} key="canonical" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <meta name="theme-color" content="#020617" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={t} key="og:title" />
      <meta property="og:description" content={d} key="og:description" />
      <meta property="og:url" content={canonical} key="og:url" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://business.dejoiy.com/favicon.png"
      />
      <meta name="twitter:card" content="summary" />
      {noindex && <meta name="robots" content="noindex,follow" key="robots" />}
    </Head>
  );
}
