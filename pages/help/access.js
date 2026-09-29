import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import SEO from "../../components/SEO";
import { portalFetch, PortalNotice } from "../../components/DocumentPortal";
export default function Access() {
  const router = useRouter();
  const [token, setToken] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    setToken(window.location.hash.slice(1));
    window.history.replaceState(null, "", "/help/access");
  }, []);
  async function verify() {
    setBusy(true);
    setError("");
    try {
      const r = await portalFetch("verify", { token });
      setToken("");
      router.replace(r.role === "staff" ? "/staff/documents" : "/help/track");
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  }
  return (
    <>
      <SEO title="Confirm private access" noindex />
      <Head>
        <meta name="referrer" content="no-referrer" />
      </Head>
      <section className="section-wrap py-20">
        <div className="portal-panel max-w-xl mx-auto">
          <span className="badge">Private access</span>
          <h1 className="text-3xl font-semibold mt-5">
            Open your request centre.
          </h1>
          <p className="text-slate-400 mt-4 leading-relaxed">
            Continue only if you requested this access link. It can be used once
            and expires after 15 minutes.
          </p>
          <button
            className="button-primary w-full mt-6"
            disabled={busy || !token}
            onClick={verify}
          >
            {busy ? "Confirming access…" : "Confirm and continue"}
          </button>
          <PortalNotice message={error} error />
          <Link href="/help/track" className="text-blue-200 text-sm block mt-5">
            Request a new access link ↗
          </Link>
        </div>
      </section>
    </>
  );
}
