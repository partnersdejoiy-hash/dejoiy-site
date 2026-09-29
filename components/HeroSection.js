import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Headphones,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import BackgroundFX from "./BackgroundFX";
import NeuralNetworkViz from "./NeuralNetworkViz";
export default function HeroSection() {
  return (
    <section className="bpo-hero">
      <BackgroundFX />
      <div className="section-wrap relative z-10">
        <div className="hero-layout">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="badge mb-7">
              Human connection. Operational intelligence.
            </span>
            <h1>
              Exceptional customer
              <br className="hidden xl:block" /> experiences.
              <br />
              <span className="gradient-text">
                Smarter business
                <br className="hidden xl:block" /> operations.
              </span>
            </h1>
            <p className="hero-description">
              Your customers deserve care. Your teams deserve clarity. Bring
              both together with DEJOIY’s customer support, back-office
              operations and AI-assisted workflows.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/contact" className="button-primary">
                Build your support team <ArrowUpRight size={18} />
              </Link>
              <Link href="/services" className="button-secondary">
                Explore services <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-pillars">
              <span>
                <Headphones size={16} />
                Customer experience
              </span>
              <span>
                <Workflow size={16} />
                Business operations
              </span>
              <span>
                <ShieldCheck size={16} />
                Quality by design
              </span>
            </div>
          </motion.div>
          <div className="hero-network">
            <div className="network-label">
              <span className="status-dot" />
              CONNECTED BY PEOPLE
            </div>
            <NeuralNetworkViz />
            <div className="network-caption">
              <span>Human judgment</span>
              <span className="text-purple-300">×</span>
              <span>Intelligent workflows</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
