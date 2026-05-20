"use client";

import { motion } from "framer-motion";
import AboutImageCard from "./AboutImageCard";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function AboutSection() {
  return (
    <section className="bg-white py-[100px] px-[28px] relative overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-14 relative z-10"
      >
        {/* Left column — text */}
        <div className="flex-1 flex flex-col">
          {/* Label row */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3DD68C] shadow-[0_0_12px_rgba(61,214,140,0.6)]" />
            <span className="font-body text-[12px] font-bold tracking-[0.15em] uppercase" style={{ color: "#000000" }}>
              ABOUT THE INSTITUTION
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp}>
            <h2 className="font-tenor text-4xl md:text-5xl font-normal leading-[1.2] mb-6 drop-shadow-sm" style={{ color: "#000000" }}>
              Aspire. Aim. Achieve.
            </h2>
          </motion.div>

          {/* Paragraph 1 */}
          <motion.div variants={fadeUp}>
            <p className="font-body text-[16px] leading-[1.8] mb-5" style={{ color: "#000000" }}>
              Founded in 2014, Shri Matha Success Factors has grown over the past decade
              into Kompally&apos;s most trusted coaching institution, guiding students from
              Grade 2 all the way through Intermediate and competitive entrance
              examinations like EAMCET and NEET.
            </p>
          </motion.div>

          {/* Paragraph 2 */}
          <motion.div variants={fadeUp}>
            <p className="font-body text-[16px] leading-[1.8]" style={{ color: "#000000" }}>
              What began as a small but determined effort to bring quality education
              closer to home has evolved into a thriving academic community — built on
              the belief that every student carries the potential to excel, and that the
              right guidance can unlock it.
            </p>
          </motion.div>
        </div>

        {/* Right column — image */}
        <motion.div 
          variants={fadeUp}
          className="w-full lg:w-[55%] xl:w-[60%] shrink-0"
        >
          <AboutImageCard />
        </motion.div>
      </motion.div>
    </section>
  );
}
