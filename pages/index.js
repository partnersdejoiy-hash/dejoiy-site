import { motion } from "framer-motion";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import IndustryGrid from "../components/IndustryGrid";
import EmployeeGrid from "../components/EmployeeGrid";
import AnimatedCounter from "../components/AnimatedCounter";
import LogoMarquee from "../components/LogoMarquee";
import {
  Headphones, Database, ShieldCheck, Eye, TrendingUp,
  Brain, Briefcase, Landmark, Cpu, Globe, Lock, Clock3, Zap, Rocket, ArrowRight, ArrowUpRight,
  Users, Target, Award, BarChart3
} from "lucide-react";

const services = [
  { title: "Customer Experience", description: "Premium omnichannel support systems built for enterprise-scale growth.", icon: <Headphones size={20} /> },
  { title: "AI Data Operations", description: "Annotation, validation, QA and structured data pipelines for AI teams.", icon: <Database size={20} /> },
  { title: "Trust & Safety", description: "Policy enforcement, fraud review and digital platform integrity workflows.", icon: <ShieldCheck size={20} /> },
  { title: "Content Moderation", description: "High-volume, quality-controlled moderation for modern platforms.", icon: <Eye size={20} /> },
  { title: "Sales Support", description: "Revenue-enabling operations and support for high-growth teams.", icon: <TrendingUp size={20} /> },
  { title: "AI Model Training", description: "Human-in-the-loop support for training, evaluation and optimization.", icon: <Brain size={20} /> },
  { title: "Back Office Operations", description: "Resilient, accurate workflows for admin-heavy business functions.", icon: <Briefcase size={20} /> },
  { title: "Financial Compliance", description: "Structured, secure support services for regulated operations.", icon: <Landmark size={20} /> }
];

const differentiators = [
  { title: "AI + Human Workforce", description: "Technology-accelerated delivery with human precision and judgment.", icon: <Cpu size={20} /> },
  { title: "Global Talent Network", description: "Flexible resourcing across modern operational environments worldwide.", icon: <Globe size={20} /> },
  { title: "Advanced Security", description: "Governance-led execution built for enterprise trust and compliance.", icon: <Lock size={20} /> },
  { title: "24/7 Operations", description: "Always-on support infrastructure for global business continuity.", icon: <Clock3 size={20} /> },
  { title: "Automation First", description: "Intelligent workflows designed for speed and operational efficiency.", icon: <Zap size={20} /> },
  { title: "Rapid Deployment", description: "Fast transition from strategy to scalable, measurable execution.", icon: <Rocket size={20} /> }
];

const industries = [
  { title: "Retail & eCommerce", description: "Customer support, returns, fraud review and scaled operations." },
  { title: "Technology", description: "Platform support, QA workflows and AI operations at scale." },
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

      <section className="py-4 border-y border-white/[0.04] relative overflow-hidden">
        <div className="section-wrap mb-4">
          <p className="text-[10.5px] uppercase tracking-[0.2em] text-white/20 text-center">Trusted by global enterprises</p>
        </div>
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
          <div className="mt-8 flex justify-start">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors duration-200"
            >
              View all services
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0c22]/30 to-transparent pointer-events-none" />
        <div className="section-wrap relative">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <SectionHeading
                eyebrow="Why DEJOIY"
                title="What sets us apart"
                subtitle="A future-ready delivery model combining human capability, AI augmentation and enterprise-grade execution."
              />
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#05071a] hover:bg-white/90 transition-all duration-200 shadow-sm"
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
                  transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card rounded-2xl p-5 group"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-white/60 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-200">
                    {item.icon}
                  </div>
                  <h3 className="text-[13.5px] font-semibold text-white leading-snug">{item.title}</h3>
                  <p className="mt-1.5 text-[12px] text-white/45 leading-relaxed">{item.description}</p>
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
            subtitle="Built for the complexity of modern sectors with highly specialized support environments."
          />
          <IndustryGrid industries={industries} />
        </div>
      </section>

      <section className="py-28">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="Global impact"
            title="Measured at enterprise scale"
            subtitle="Operational excellence delivered across geographies, teams and AI systems."
            center
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatedCounter value={250} suffix="+" label="Enterprise clients" icon={<Users size={18} />} />
            <AnimatedCounter value={38} suffix="+" label="Countries supported" icon={<Globe size={18} />} />
            <AnimatedCounter value={4200} suffix="+" label="Agents onboarded" icon={<Target size={18} />} />
            <AnimatedCounter value={120} suffix="M+" label="AI models trained" icon={<Brain size={18} />} />
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
          <div className="mt-8">
            <Link
              href="/our-people"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors duration-200"
            >
              Meet the full team
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
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
              {
                label: "Brand Website",
                domain: "dejoiy.co.in",
                href: "https://www.dejoiy.co.in",
                image: "/brand/brand-site.jpg",
                description: "Explore the DEJOIY brand profile and the company's broader identity and global presence."
              },
              {
                label: "Marketplace",
                domain: "dejoiy.com",
                href: "https://www.dejoiy.com",
                image: "/brand/marketplace-site.jpg",
                description: "Explore the DEJOIY marketplace and its connected digital commerce ecosystem."
              }
            ].map((site) => (
              <a
                key={site.domain}
                href={site.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-white/[0.07] min-h-[320px] block"
              >
                <img
                  src={site.image}
                  alt={site.domain}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05071a] via-[#05071a]/70 to-[#05071a]/20" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="badge badge-blue self-start mb-4">{site.label}</span>
                  <h3 className="text-2xl font-bold text-white">{site.domain}</h3>
                  <p className="mt-2 text-sm text-white/55 max-w-sm">{site.description}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium text-white/35 group-hover:text-white/70 transition-colors">
                    Visit site <ArrowUpRight size={12} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-wrap">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0d1040] to-[#080c25] p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2E7BFF]/10 via-transparent to-[#FF4FD8]/10 pointer-events-none" />
            <div className="relative max-w-2xl mx-auto">
              <span className="badge mb-6 inline-flex">Get in touch</span>
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white leading-tight tracking-tight">
                Ready to build your next operating advantage?
              </h2>
              <p className="mt-4 text-base text-white/50 leading-relaxed">
                Tell us about your goals and DEJOIY will design the right support, AI operations or back-office solution for your business.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#05071a] hover:bg-white/90 transition-all duration-200"
                >
                  Speak with an expert
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-7 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.09] transition-all duration-200"
                >
                  View services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
