import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb orb-1" style={{ top: "10%", left: "5%", opacity: 0.2 }} />
        <div className="orb orb-2" style={{ bottom: "10%", right: "5%", opacity: 0.15 }} />
        <div className="absolute inset-0 grid-lines" />
      </div>

      <div className="section-wrap relative text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mx-auto"
        >
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/30 mb-5">Error 404</div>
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold text-white leading-tight tracking-tight">
            Page not<br />found
          </h1>
          <p className="mt-5 text-base text-white/45 leading-relaxed">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#05071a] hover:bg-white/90 transition-all duration-200"
            >
              <Home size={15} />
              Back to home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.09] transition-all duration-200"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
              Go back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
