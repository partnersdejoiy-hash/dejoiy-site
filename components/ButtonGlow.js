import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ButtonGlow({ href = "#", children, secondary = false, arrow = false }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${
        secondary
          ? "border border-white/[0.12] bg-white/[0.05] text-white/80 hover:text-white hover:bg-white/[0.09]"
          : "bg-white text-[#05071a] hover:bg-white/90 shadow-sm"
      }`}
    >
      {children}
      {arrow && (
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
