import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Users,
  FileText,
  ShieldCheck,
} from "lucide-react";
const MotionLink = motion(Link);
const routes = [
  {
    title: "Grow your business",
    label: "Business enquiry",
    copy: "Explore customer experience, back-office and AI-assisted delivery.",
    href: "/contact",
    icon: BriefcaseBusiness,
    number: "01",
  },
  {
    title: "Find your next chapter",
    label: "Careers",
    copy: "Explore our roles, meet the team and register your interest.",
    href: "/careers",
    icon: Users,
    number: "02",
  },
  {
    title: "Get the documents you need",
    label: "Employee documents",
    copy: "Letters, clearance updates and support after your employment.",
    href: "/employee-documents",
    icon: FileText,
    number: "03",
  },
  {
    title: "Verify employment",
    label: "Employment verification",
    copy: "A clear route for organisations with employee authorisation.",
    href: "/employee-verification",
    icon: ShieldCheck,
    number: "04",
  },
];
export default function HelpRoutes({ compact = false }) {
  return (
    <div className={`help-routes ${compact ? "help-routes-compact" : ""}`}>
      {routes.map(({ icon: Icon, ...r }, index) => (
        <MotionLink
          href={r.href}
          className="help-route"
          key={r.href}
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <div className="flex justify-between items-start">
            <span className="help-icon">
              <Icon size={23} aria-hidden="true" />
            </span>
            <span className="text-xs text-slate-500 font-mono">{r.number}</span>
          </div>
          <span className="eyebrow mt-7 block">{r.label}</span>
          <h2>{r.title}</h2>
          <p>{r.copy}</p>
          <span className="help-route-link">
            Get started <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </MotionLink>
      ))}
    </div>
  );
}
