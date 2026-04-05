import { useState } from "react";
import Link from "next/link";
import MegaMenu from "./MegaMenu";
import {
  Users,
  Bot,
  Briefcase,
  Building2,
  Newspaper,
  Sparkles,
  Phone,
  Menu,
  X
} from "lucide-react";

const navConfig = [
  {
    key: "who",
    label: "Who we are",
    items: [
      {
        title: "About DEJOIY",
        description: "Our vision, leadership, culture and global delivery model.",
        href: "/",
        icon: <Users size={20} />
      },
      {
        title: "Our People",
        description: "Talent, innovation and service excellence at scale.",
        href: "/careers",
        icon: <Sparkles size={20} />
      },
      {
        title: "Brand Profile",
        description: "Explore the DEJOIY brand website.",
        href: "https://www.dejoiy.co.in",
        icon: <Building2 size={20} />
      }
    ]
  },
  {
    key: "ai",
    label: "AI, AV & Robotics",
    items: [
      {
        title: "AI Data Operations",
        description: "Human-in-the-loop operations for next-gen AI systems.",
        href: "/services",
        icon: <Bot size={20} />
      },
      {
        title: "Model Training",
        description: "Training data, validation and evaluation pipelines.",
        href: "/services",
        icon: <Sparkles size={20} />
      },
      {
        title: "Automation Systems",
        description: "Modern digital operations with AI-powered workflows.",
        href: "/services",
        icon: <Bot size={20} />
      }
    ]
  },
  {
    key: "services",
    label: "Services",
    items: [
      {
        title: "Customer Experience",
        description: "Premium customer support for enterprise brands.",
        href: "/services",
        icon: <Briefcase size={20} />
      },
      {
        title: "Trust & Safety",
        description: "Fraud review, content operations and risk support.",
        href: "/services",
        icon: <Building2 size={20} />
      },
      {
        title: "Financial Compliance",
        description: "High-trust support workflows with governance controls.",
        href: "/services",
        icon: <Briefcase size={20} />
      }
    ]
  },
  {
    key: "industries",
    label: "Industries",
    items: [
      {
        title: "Industry Expertise",
        description: "Retail, healthcare, gaming, fintech and more.",
        href: "/industries",
        icon: <Building2 size={20} />
      },
      {
        title: "Marketplace",
        description: "Visit the DEJOIY marketplace.",
        href: "https://www.dejoiy.com",
        icon: <Sparkles size={20} />
      },
      {
        title: "Sector Delivery",
        description: "Tailored operational models for each industry.",
        href: "/industries",
        icon: <Building2 size={20} />
      }
    ]
  },
  {
    key: "insights",
    label: "Insights",
    items: [
      {
        title: "Articles",
        description: "Perspectives on AI and business operations.",
        href: "/insights",
        icon: <Newspaper size={20} />
      },
      {
        title: "Case Studies",
        description: "How DEJOIY helps enterprises scale globally.",
        href: "/insights",
        icon: <Newspaper size={20} />
      },
      {
        title: "Reports & News",
        description: "Research and company updates.",
        href: "/insights",
        icon: <Newspaper size={20} />
      }
    ]
  },
  {
    key: "careers",
    label: "Careers",
    items: [
      {
        title: "Join DEJOIY",
        description: "Build your future with a world-class operations company.",
        href: "/careers",
        icon: <Sparkles size={20} />
      },
      {
        title: "Benefits",
        description: "Healthcare, learning and long-term growth.",
        href: "/careers",
        icon: <Users size={20} />
      },
      {
        title: "Open Roles",
        description: "Explore current opportunities.",
        href: "/careers",
        icon: <Briefcase size={20} />
      }
    ]
  },
  {
    key: "contact",
    label: "Contact Us",
    items: [
      {
        title: "Speak with an Expert",
        description: "Tell us your goals and we’ll design the right solution.",
        href: "/contact",
        icon: <Phone size={20} />
      },
      {
        title: "Employee Verification",
        description: "Submit verification requests for past employees.",
        href: "/employee-verification",
        icon: <Users size={20} />
      },
      {
        title: "Business Enquiries",
        description: "Reach DEJOIY for partnerships and services.",
        href: "/contact",
        icon: <Phone size={20} />
      }
    ]
  }
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeMenuData = navConfig.find((item) => item.key === activeMenu);

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 bg-primary/70 backdrop-blur-xl"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="section-wrap">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-accent via-secondary to-highlight shadow-glow" />
            <div>
              <div className="text-xl font-bold tracking-wide">DEJOIY</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                AI Services + BPO
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navConfig.map((item) => (
              <button
                key={item.key}
                onMouseEnter={() => setActiveMenu(item.key)}
                className={`text-sm transition-colors ${
                  activeMenu === item.key ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-accent via-secondary to-highlight px-5 py-3 text-sm font-semibold shadow-glow hover:scale-[1.03] transition-all"
            >
              Speak with an expert
            </Link>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-6">
            <div className="glass rounded-3xl p-4 space-y-3">
              {navConfig.map((item) => (
                <Link
                  key={item.key}
                  href={item.items[0]?.href || "/"}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl px-4 py-3 bg-white/5 hover:bg-white/10 transition"
                >
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-white/60">
                    {item.items[0]?.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative hidden lg:block">
        <div className="absolute left-1/2 top-0 w-full -translate-x-1/2 px-6">
          <div className="mx-auto max-w-6xl">
            <MegaMenu open={!!activeMenuData} items={activeMenuData?.items || []} centered />
          </div>
        </div>
      </div>
    </header>
  );
}
