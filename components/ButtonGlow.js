import Link from "next/link";

export default function ButtonGlow({ href = "#", children, secondary = false }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
        secondary
          ? "glass text-white hover:bg-white/10"
          : "bg-gradient-to-r from-accent via-secondary to-highlight text-white shadow-glow hover:scale-[1.03] hover:shadow-pink"
      }`}
    >
      {children}
    </Link>
  );
}