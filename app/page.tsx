import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MarqueeTrustBar from "./components/MarqueeTrustBar";
import AboutSection from "./components/AboutSection";
import CurriculumSection from "./components/CurriculumSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeTrustBar />
      <AboutSection />
      <CurriculumSection />
    </div>
  );
}
