import Link from "next/link";
export default function Brand() {
  return (
    <Link href="/" aria-label="DEJOIY home" className="brand-plaque">
      <img src="/logo.png" width="62" height="48" alt="" />
      <span className="brand-type">
        DEJOIY<small>People. Possibility.</small>
      </span>
    </Link>
  );
}
