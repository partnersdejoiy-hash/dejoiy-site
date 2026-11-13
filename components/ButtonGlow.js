import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ButtonGlow({ href = "#", children, secondary = false, arrow = false }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${
        secondary
          ? "border border-black/20 bg-black/[0.05] text-black/80 hover:text-[#141414] hover:bg-black/[0.09]"
          : "bg-[#141414] !text-white hover:bg-black shadow-[0_5px_0_#d4ff3a]"
      }`}
    >
      {children}
      {arrow && (
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
