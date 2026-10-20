import HeroSection from "../components/HeroSection";
import Intro from "../components/home/Intro";
import Disciplines from "../components/home/Disciplines";
import Staircase from "../components/home/Staircase";
import SignalLab from "../components/home/SignalLab";
import Pictures from "../components/home/Pictures";
import About from "../components/home/About";
import CallToAction from "../components/CallToAction";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Intro />
      <Disciplines />
      <Staircase />
      <SignalLab />
      <Pictures />
      <About />
      <CallToAction />
    </>
  );
}
