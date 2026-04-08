import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import IndustryGrid from "../components/IndustryGrid";
import EmployeeGrid from "../components/EmployeeGrid";
import AnimatedCounter from "../components/AnimatedCounter";
import LogoMarquee from "../components/LogoMarquee";
import dynamic from "next/dynamic";
const AIServicesViz = dynamic(() => import("../components/AIServicesViz"), { ssr: false });
const WorldPresence = dynamic(() => import("../components/WorldPresence"), { ssr: false });
import {
  Headphones, Database, ShieldCheck, Eye, TrendingUp,
  Brain, Briefcase, Landmark, Cpu, Globe, Lock, Clock3,
  Zap, Rocket, ArrowRight, ArrowUpRight, Users, Target
} from "lucide-react";

const services = [
  { title: "Customer Experience",   description: "Premium omnichannel support systems built for enterprise-scale growth.",         icon: <Headphones size={20} /> },
  { title: "AI Data Operations",    description: "Annotation, validation, QA and structured data pipelines for AI teams.",         icon: <Database size={20} /> },
  { title: "Trust & Safety",        description: "Policy enforcement, fraud review and digital platform integrity workflows.",      icon: <ShieldCheck size={20} /> },
  { title: "Content Moderation",    description: "High-volume, quality-controlled moderation for modern platforms.",               icon: <Eye size={20} /> },
  { title: "Sales Support",         description: "Revenue-enabling operations and support for high-growth teams.",                 icon: <TrendingUp size={20} /> },
  { title: "AI Model Training",     description: "Human-in-the-loop support for training, evaluation and optimization.",          icon: <Brain size={20} /> },
  { title: "Back Office Operations",description: "Resilient, accurate workflows for admin-heavy business functions.",             icon: <Briefcase size={20} /> },
  { title: "Financial Compliance",  description: "Structured, secure support services for regulated operations.",                 icon: <Landmark size={20} /> }
];

const differentiators = [
  { title: "AI + Human Workforce",  description: "Technology-accelerated delivery with human precision and judgment.", icon: <Cpu size={20} /> },
  { title: "Global Talent Network", description: "Flexible resourcing across modern operational environments worldwide.", icon: <Globe size={20} /> },
  { title: "Advanced Security",     description: "Governance-led execution built for enterprise trust and compliance.", icon: <Lock size={20} /> },
  { title: "24/7 Operations",       description: "Always-on support infrastructure for global business continuity.",   icon: <Clock3 size={20} /> },
  { title: "Automation First",      description: "Intelligent workflows designed for speed and operational efficiency.", icon: <Zap size={20} /> },
  { title: "Rapid Deployment",      description: "Fast transition from strategy to scalable, measurable execution.",   icon: <Rocket size={20} /> }
];

const industries = [
  { title: "Retail & eCommerce",   description: "Customer support, returns, fraud review and scaled operations." },
  { title: "Technology",           description: "Platform support, QA workflows and AI operations at scale." },
  { title: "Healthcare",           description: "Sensitive process support with precision and compliance awareness." },
  { title: "Financial Services",   description: "KYC, compliance-adjacent workflows and customer operations." },
  { title: "Travel & Logistics",   description: "Reservation support, fulfillment tracking and issue resolution." },
  { title: "Social Media",         description: "Content moderation, trust & safety and creator operations." },
  { title: "Gaming",               description: "Player support, moderation and live-ops assistance." },
  { title: "Education",            description: "Learner support, enrollment operations and digital assistance." }
];

function RevealSection({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="py-5 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <RevealSection delay={0}>
          <p className="text-[10px] uppercase tracking-[0.22em] text-center mb-4" style={{ color: "#64748b" }}>Trusted by global enterprises</p>
        </RevealSection>
        <LogoMarquee />
      </section>

      <section className="py-28">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="What we do"
            title="Integrated AI services and business operations"
            subtitle="DEJOIY builds scalable support systems for global businesses with premium process design and delivery."
          />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} />
            ))}
          </div>
          <RevealSection delay={0.3}>
            <div className="mt-8 flex justify-start">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: "#64748b" }}
                onMouseEnter={e => e.currentTarget.style.color = "#F8FAFC"}
                onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
              >
                View all services
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(11,18,38,0.35) 50%, transparent)" }} />
        <div className="section-wrap relative">
          <SectionHeading
            eyebrow="How we work"
            title="See our AI capabilities in action"
            subtitle="Each service powered by a unique technology approach — visualised in real time."
          />
          <AIServicesViz />
        </div>
      </section>

      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(11,18,38,0.3) 50%, transparent)" }} />
        <div className="section-wrap relative">
          <div className="grid gap-14 lg:grid-cols-2 items-start">
            <div>
              <SectionHeading
                eyebrow="Why DEJOIY"
                title="What sets us apart"
                subtitle="A future-ready delivery model combining human capability, AI augmentation and enterprise-grade execution."
              />
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#020617] hover:bg-white/90 transition-all duration-200 shadow-sm"
              >
                Speak with an expert
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {differentiators.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card rounded-2xl p-5 group"
                >
                  <div
                    className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200"
                    style={{
                      background: "rgba(37,99,235,0.14)",
                      border: "1px solid rgba(37,99,235,0.28)",
                      color: "#93c5fd"
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-[13.5px] font-semibold leading-snug" style={{ color: "#F8FAFC" }}>{item.title}</h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed" style={{ color: "#94a3b8" }}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="Industries"
            title="Industries we serve"
            subtitle="Built for the complexity of modern sectors with highly specialised support environments."
          />
          <IndustryGrid industries={industries} />
        </div>
      </section>

      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(11,18,38,0.3) 50%, transparent)" }} />
        <div className="section-wrap relative">
          <div className="grid gap-14 lg:grid-cols-2 items-start">
            <div>
              <SectionHeading
                eyebrow="Global presence"
                title="Operations across every major region"
                subtitle="250+ enterprise clients served across 38 countries — with always-on operational coverage."
              />
              <div className="grid grid-cols-2 gap-3 mt-0">
                <AnimatedCounter value={250} suffix="+" label="Enterprise clients" icon={<Users size={18} />} />
                <AnimatedCounter value={38}  suffix="+" label="Countries"          icon={<Globe size={18} />} />
                <AnimatedCounter value={4200} suffix="+" label="Agents onboarded"  icon={<Target size={18} />} />
                <AnimatedCounter value={120} suffix="M+" label="Models trained"    icon={<Brain size={18} />} />
              </div>
            </div>
            <RevealSection delay={0.2}>
              <WorldPresence />
            </RevealSection>
          </div>
        </div>
      </section>

      <section id="our-people" className="py-28">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="Our people"
            title="The experts behind every outcome"
            subtitle="A high-performance team blending operations rigor, empathy, data discipline and security-first thinking."
          />
          <EmployeeGrid />
          <RevealSection delay={0.2}>
            <div className="mt-8">
              <Link
                href="/our-people"
                className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: "#64748b" }}
                onMouseEnter={e => e.currentTarget.style.color = "#F8FAFC"}
                onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
              >
                Meet the full team
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-28">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="Ecosystem"
            title="Explore the DEJOIY network"
            subtitle="Discover our brand presence and marketplace experience."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Brand Website", domain: "dejoiy.co.in", href: "https://www.dejoiy.co.in", image: "/brand/brand-site.jpg", description: "Explore the DEJOIY brand profile and the company's broader identity and global presence." },
              { label: "Marketplace",   domain: "dejoiy.com",   href: "https://www.dejoiy.com",   image: "/brand/marketplace-site.jpg", description: "Explore the DEJOIY marketplace and its connected digital commerce ecosystem." }
            ].map((site, i) => (
              <motion.a
                key={site.domain}
                href={site.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16,1,0.3,1] }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-3xl min-h-[320px] block transition-shadow duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.09)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4)"
                }}
              >
                <img src={site.image} alt={site.domain} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/75 to-[#020617]/25" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="badge badge-blue self-start mb-4">{site.label}</span>
                  <h3 className="text-2xl font-bold" style={{ color: "#F8FAFC" }}>{site.domain}</h3>
                  <p className="mt-2 text-sm max-w-sm" style={{ color: "#94a3b8" }}>{site.description}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium transition-colors" style={{ color: "#64748b" }}>
                    <span className="group-hover:text-white/70 transition-colors">Visit site</span>
                    <ArrowUpRight size={12} className="group-hover:text-white/70 transition-colors" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-wrap">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center cta-block"
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, transparent 50%, rgba(6,182,212,0.12) 100%)" }} />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.25) 0%, transparent 60%)" }}
            />
            <motion.div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)", filter: "blur(40px)" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative max-w-2xl mx-auto">
              <span className="badge mb-6 inline-flex">Get in touch</span>
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight" style={{ color: "#F8FAFC" }}>
                Ready to build your next operating advantage?
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#94a3b8" }}>
                Tell us about your goals and DEJOIY will design the right support, AI operations or back-office solution.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#020617] hover:bg-white/90 shadow-[0_0_28px_rgba(255,255,255,0.18)] hover:shadow-[0_0_45px_rgba(255,255,255,0.32)] transition-all duration-300"
                >
                  Speak with an expert
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.07)", color: "#CBD5E1" }}
                >
                  View services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
