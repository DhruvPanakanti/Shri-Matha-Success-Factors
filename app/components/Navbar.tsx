"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Admissions", href: "#admissions" },
  { label: "Faculty", href: "#faculty" },
  { label: "Gallery", href: "#gallery" }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#111C4E]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-0' : 'bg-transparent border-transparent py-2'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 h-[58px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-green to-green-d flex items-center justify-center shadow-[0_0_16px_rgba(61,214,140,0.4)]">
            <Image
              src="/logo.png"
              alt="Shree Matha Logo"
              priority
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          <div className="font-tenor text-white text-[13px] font-normal leading-tight tracking-widest">
            Shri Matha Success Factors
            <small className="block text-[10px] text-light font-normal font-body">
              Aspire · Aim · Achieve
            </small>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-[22px]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-[13px] text-[#B8C0E0] hover:text-[#3DD68C] hover:text-glow-green transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
          <button className="font-body relative px-[24px] py-2.5 text-[13px] font-medium bg-[#3DD68C] text-[#111C4E] border-none rounded-[10px] cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(61,214,140,0.35)] button-shine">
            <span className="absolute inset-[-2px] rounded-[12px] bg-gradient-to-r from-[#3DD68C] via-[#2EC47A] to-[#3DD68C] bg-[length:200%] -z-10 animate-shimmer" />
            Enroll Today
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[2px] bg-white transition-transform duration-200 ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-transform duration-200 ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-d/98 backdrop-blur-xl border-t border-white/[0.07] px-5 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-[14px] text-[#B8C0E0] hover:text-[#3DD68C] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button className="font-body relative px-[22px] py-3 text-[14px] font-medium bg-[#3DD68C] text-[#111C4E] border-none rounded-[10px] cursor-pointer w-full button-shine">
            Enroll Today
          </button>
        </div>
      )}
    </nav>
  );
}
