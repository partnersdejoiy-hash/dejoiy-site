import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { findService } from "../data/services";
export default function ServiceCard({ slug, title, description }) {
  const service = findService(slug || title);
  return (
    <Link
      href={`/services/${service?.slug || "customer-experience"}`}
      className="expertise-tile"
    >
      <div className="expertise-photo">
        <Image
          src={service?.image || "/services/customer-experience.jpg"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt=""
        />
      </div>
      <div className="expertise-text">
        <h3>
          {title}
          <ArrowUpRight size={23} />
        </h3>
        <p>{description}</p>
        <span>Explore service</span>
      </div>
    </Link>
  );
}
