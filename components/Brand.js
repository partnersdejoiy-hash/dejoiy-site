import Link from "next/link";
export default function Brand() {
  return (
    <Link href="/" aria-label="DEJOIY home" className="brand-plaque">
      <img src="/brand/dejoiy-wordmark.svg" width="476" height="150" alt="DEJOIY — Your Joy" />
    </Link>
  );
}
