import Link from "next/link";
export default function Brand() {
  return (
    <Link href="/" aria-label="DEJOIY home" className="brand-plaque">
      <img src="/logo.png" width="300" height="200" alt="DEJOIY — Your Joy" />
    </Link>
  );
}
