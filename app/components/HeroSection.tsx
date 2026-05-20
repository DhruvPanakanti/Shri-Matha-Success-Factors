"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StarsBackground } from "./StarsBackground";
import { GlowingBorder } from "./GlowingBorder";
import HeroOrbitIcons from "./HeroOrbitIcons";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLogoVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);

      const sp = Math.min(sy / 400, 1);
      if (sp >= 1) {
        setShowContent(true);
      } else if (sp < 0.75) {
        setShowContent(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollProgress = Math.min(scrollY / 400, 1);
  const isScrolling = scrollY > 0;
  const logoOpacity = logoVisible ? 1 - scrollProgress : 0;

  const mediaWidth = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobile ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobile ? 180 : 150);


  return (
    <div className="transition-colors duration-700 ease-in-out overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh] overflow-hidden">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {/* Stars background — stays consistent throughout scroll */}
          <div className="absolute inset-0 z-0 h-full">
            <StarsBackground
              className="bg-[radial-gradient(ellipse_at_bottom,_#1B2A6B_0%,_#0a0a1a_100%)]"
              speed={80}
            />
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              {/* Expanding logo image — glowing border before scroll, blends with bg on expand */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  overflow: 'visible',
                  zIndex: 5,
                }}
              >
                {/* Radial green glow behind logo */}
                <div
                  className="absolute inset-0 -z-10 transition-none"
                  style={{
                    background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(61, 214, 140, 0.08) 0%, transparent 70%)",
                  }}
                />

                {/* Glowing border — only visible before scroll, fades out as user scrolls */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 - scrollProgress * 2 }}
                  transition={{ duration: 0.2 }}
                  style={{ pointerEvents: scrollProgress > 0.5 ? "none" : "auto" }}
                >
                  <GlowingBorder>
                    <div />
                  </GlowingBorder>
                </motion.div>

                {/* Floating orbit icons around logo */}
                <HeroOrbitIcons />

                {/* Logo image — transparent before scroll, blends once scrolling */}
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    backgroundColor: scrollProgress > 0 ? "#111C4E" : "transparent",
                    transition: "background-color 0.3s ease",
                    zIndex: 15,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      opacity: logoOpacity,
                      transform: `scale(${isScrolling ? 1 : (logoVisible ? 1 : 0.92)})`,
                      transition: isScrolling ? 'none' : 'opacity 1000ms cubic-bezier(0.16,1,0.3,1), transform 1000ms cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <Image
                      src="/logo.png"
                      alt="Shri Matha Success Factors Logo"
                      width={1280}
                      height={720}
                      className="w-full h-full object-contain"
                      style={{
                        borderRadius: scrollProgress < 0.5 ? "16px" : "0px",
                        filter: "drop-shadow(0 0 60px rgba(61, 214, 140, 0.3))",
                      }}
                      priority
                    />
                  </div>
                </div>

                {/* "Scroll to expand" hint with bounce animation */}
                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
                  <p
                    className="text-blue-200/70 font-medium"
                    style={{
                      transform: `translateX(${textTranslateX}vw)`,
                      fontSize: "15px",
                      letterSpacing: "0.05em",
                      animation: "bounce 1.8s ease-in-out infinite",
                    }}
                  >
                    <span className="font-body">Scroll to explore ↓</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Expanded content section — two-column layout */}
            <motion.section
              className="w-full px-6 py-10 md:px-12 lg:px-20 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                {/* Left column — heading, text, CTAs */}
                <div className="flex flex-col items-start text-left">
                  <h3 className="font-tenor text-4xl md:text-5xl font-normal text-green mb-5 text-glow-green">
                    Aspire · Aim · Achieve
                  </h3>
                  <p
                    className="font-body text-[#B8C0E0]"
                    style={{
                      maxWidth: "580px",
                      lineHeight: "1.85",
                      fontSize: "15px",
                    }}
                  >
                    Hyderabad&apos;s most trusted coaching institution. 12+ years of
                    expert faculty, live classes, EAMCET & JEE coaching, and a proven
                    record of transforming students.
                  </p>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-4 mt-8">
                    <a
                      href="#courses"
                      className="inline-flex items-center justify-center font-semibold text-sm transition-all duration-300 hover:-translate-y-1 hover-glow button-shine"
                      style={{
                        background: "#3DD68C",
                        color: "#111C4E",
                        borderRadius: "10px",
                        padding: "14px 28px",
                      }}
                    >
                      <span className="font-body tracking-wide">Browse Courses &rarr;</span>
                    </a>
                    <a
                      href="#demo"
                      className="inline-flex items-center justify-center font-medium text-sm transition-all duration-300 hover:bg-white/[0.1] button-shine hover:-translate-y-1"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        color: "#ffffff",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: "10px",
                        padding: "14px 26px",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span className="font-body tracking-wide">Watch Demo</span>
                    </a>
                  </div>
                </div>

                {/* Right column — stats card */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "14+", label: "Years Teaching" },
                    { value: "5K+", label: "Students Shaped" },
                    { value: "98%", label: "Success Rate" },
                    { value: "5.0★", label: "Google Rating" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center text-center glass-panel transition-all duration-300 hover:-translate-y-1 hover-glow rounded-xl p-4"
                    >
                      <span
                        className="block font-tenor"
                        style={{
                          fontSize: "22px",
                          fontWeight: 400,
                          color: "#3DD68C",
                        }}
                      >
                        {stat.value}
                      </span>
                      <span
                        className="block mt-1 font-body"
                        style={{
                          fontSize: "10px",
                          color: "#B8C0E0",
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
