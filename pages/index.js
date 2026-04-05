import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import IndustryGrid from "../components/IndustryGrid";
import EmployeeGrid from "../components/EmployeeGrid";
import AnimatedCounter from "../components/AnimatedCounter";
import ButtonGlow from "../components/ButtonGlow";
import {
  Headphones,
  Database,
  ShieldCheck,
  Eye,
  TrendingUp,
  Brain,
  Briefcase,
  Landmark,
  Cpu,
  Globe,
  Lock,
  Clock3,
  Zap,
  Rocket
} from "lucide-react";

const services = [
  {
    title: "Customer Experience",
    description: "Premium omnichannel support systems built for enterprise-scale growth.",
    icon: <Headphones size={24} />,
    gradient: "bg-card-gradient-1"
  },
  {
    title: "AI Data Operations",
    description: "Annotation, validation, QA and structured data pipelines for AI teams.",
    icon: <Database size={24} />,
    gradient: "bg-card-gradient-2"
  },
  {
    title: "Trust & Safety",
    description: "Policy enforcement, fraud review and digital platform integrity workflows.",
    icon: <ShieldCheck size={24} />,
    gradient: "bg-card-gradient-3"
  },
  {
    title: "Content Moderation",
    description: "High-volume, quality-controlled moderation for modern platforms.",
    icon: <Eye size={24} />,
    gradient: "bg-card-gradient-1"
  },
  {
    title: "Sales Support",
    description: "Revenue-enabling operations and support for high-growth teams.",
    icon: <TrendingUp size={24} />,
    gradient: "bg-card-gradient-2"
  },
  {
    title: "AI Model Training",
    description: "Human-in-the-loop support for training, evaluation and optimization.",
    icon: <Brain size={24} />,
    gradient: "bg-card-gradient-3"
  },
  {
    title: "Back Office Operations",
    description: "Resilient, accurate workflows for admin-heavy business functions.",
    icon: <Briefcase size={24} />,
    gradient: "bg-card-gradient-1"
  },
  {
    title: "Financial Compliance",
    description: "Structured, secure support services for regulated operations.",
    icon: <Landmark size={24} />,
    gradient: "bg-card-gradient-2"
  }
];

const differentiators = [
  {
    title: "AI + Human Workforce",
    description: "Technology-accelerated delivery with human precision.",
    icon: <Cpu size={22} />
  },
  {
    title: "Global Talent Network",
    description: "Flexible resourcing across modern operational environments.",
    icon: <Globe size={22} />
  },
  {
    title: "Advanced Security",
    description: "Governance-led execution built for enterprise trust.",
    icon: <Lock size={22} />
  },
  {
    title: "24/7 Operations",
    description: "Always-on support for global business continuity.",
    icon: <Clock3 size={22} />
  },
  {
    title: "Automation First Approach",
    description: "Intelligent workflows designed for speed and efficiency.",
    icon: <Zap size={22} />
  },
  {
    title: "Rapid Deployment and Web Designing",
    description: "Fast transition from strategy to scalable execution.",
    icon: <Rocket size={22} />
  }
];

const industries = [
  { title: "Retail & eCommerce", description: "Customer support, returns, fraud review and scaled operations." },
  { title: "Technology", description: "Platform support, QA workflows and AI operations." },
  { title: "Healthcare", description: "Sensitive process support with precision and compliance awareness." },
  { title: "Financial Services", description: "KYC, compliance-adjacent workflows and customer operations." },
  { title: "Travel & Logistics", description: "Reservation support, fulfillment tracking and issue resolution." },
  { title: "Social Media", description: "Content moderation, trust & safety and creator operations." },
  { title: "Gaming", description: "Player support, moderation and live-ops assistance." },
  { title: "Education", description: "Learner support, enrollment operations and digital assistance." }
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="py-24">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="What we do"
            title="Integrated AI services and business operations"
            subtitle="DEJOIY builds scalable support systems for global businesses with premium process design and delivery."
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="Differentiation"
            title="What Sets DEJOIY Apart"
            subtitle="A future-ready delivery model combining human capability, AI augmentation and enterprise-grade execution."
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {differentiators.map((item, index) => (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-[2rem] glass p-6 hover:-translate-y-2 transition-transform duration-300 ${
                  index % 3 === 0
                    ? "bg-card-gradient-1"
                    : index % 3 === 1
                    ? "bg-card-gradient-2"
                    : "bg-card-gradient-3"
                }`}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl group-hover:scale-125 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-white/65">{item.description}</p>
                  <div className="mt-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-accent via-secondary to-highlight opacity-80" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="Industries"
            title="Industries We Serve"
            subtitle="Built for the complexity of modern sectors with highly specialized support environments."
          />
          <IndustryGrid industries={industries} />
        </div>
      </section>

      <section id="our-people" className="py-24">
  <div className="section-wrap">
    <SectionHeading
      eyebrow="Our people"
      title="The experts behind every outcome"
      subtitle="A high-performance team blending operations rigor, empathy, data discipline and security-first thinking."
    />
    <EmployeeGrid />
  </div>
</section>

      <section className="py-24">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="Global impact"
            title="Measured at enterprise scale"
            subtitle="Operational excellence delivered across geographies, teams and AI systems."
            center
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatedCounter value={250} suffix="+" label="Clients served" />
            <AnimatedCounter value={38} suffix="+" label="Countries supported" />
            <AnimatedCounter value={4200} suffix="+" label="Agents onboarded" />
            <AnimatedCounter value={120} suffix="M+" label="AI models trained" />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="Marketplace & Brand"
            title="Explore the DEJOIY ecosystem"
            subtitle="Discover our brand presence and marketplace experience."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="https://www.dejoiy.co.in"
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 min-h-[360px]"
            >
              <img
                src="/brand/brand-site.jpg"
                alt="DEJOIY brand website"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-fit rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md text-highlight">
                  Brand Website
                </div>
                <h3 className="mt-4 text-3xl font-bold">dejoiy.co.in</h3>
                <p className="mt-3 max-w-lg text-white/70">
                  Visit the DEJOIY brand profile and explore the company’s broader identity and presence.
                </p>
              </div>
            </a>

            <a
              href="https://www.dejoiy.com"
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 min-h-[360px]"
            >
              <img
                src="/brand/marketplace-site.jpg"
                alt="DEJOIY marketplace"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-fit rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md text-highlight">
                  Marketplace
                </div>
                <h3 className="mt-4 text-3xl font-bold">dejoiy.com</h3>
                <p className="mt-3 max-w-lg text-white/70">
                  Explore the DEJOIY marketplace and its connected digital commerce ecosystem.
                </p>
              </div>
            </a>
          </div>

          <div className="mt-10">
            <ButtonGlow href="/contact">Speak with an expert</ButtonGlow>
          </div>
        </div>
      </section>
    </>
  );
}
