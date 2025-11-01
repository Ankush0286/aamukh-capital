"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PreloaderSection from "@/components/PreloaderSection";
import NavBarSection from "@/components/NavBarSection";
import HeroSection from "@/components/HeroSection";
import FinalCTASection from "@/components/FinalCTASection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";
import InvestmentThesisSection from "@/components/InvestmentThesisSection";
import DualModelSection from "@/components/DualModelSection";
import VCFeatureCard3 from "@/components/VCFeatureCard3";
import BentoGridSection from "@/components/BentoGridSection";
import VCFeatureCard8 from "@/components/VCFeatureCard8";
import HorizontalScrollMarquee from "@/components/HorizontalScrollMarquee";
import { Gem } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time for assets, data fetching, etc.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Preloader will be visible for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const marqueeContent = useMemo(
    () => (
      <div className="flex items-center gap-6">
        <span>Founder-First Philosophy</span>
        <Gem className="w-8 h-8 text-blue-200" />
        <span>India&apos;s Innovation Supercycle</span>
        <Gem className="w-8 h-8 text-blue-200" />
        <span>Conviction-Driven Capital</span>
        <Gem className="w-8 h-8 text-blue-200" />
        <span>Dual-Engine Model</span>
        <Gem className="w-8 h-8 text-blue-200" />
      </div>
    ),
    []
  );

  // --- ANIMATION VARIANTS ---
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  return (
    <main>
      {/* --- PRELOADER LOGIC --- */}
      {/* AnimatePresence allows the component to animate out when it's removed from the DOM */}
      <AnimatePresence>{isLoading && <PreloaderSection />}</AnimatePresence>

      {/* --- MAIN PAGE CONTENT --- */}
      {/* The rest of the page will only be rendered after loading is complete */}
      {!isLoading && (
        <>
          <NavBarSection />
          <HeroSection />
          <InvestmentThesisSection />
          <BentoGridSection/>

          <HorizontalScrollMarquee baseVelocity={-50}>
            {marqueeContent}
          </HorizontalScrollMarquee>

          <DualModelSection/>

          <div className="w-full bg-white px-[5%] py-24 overflow-hidden">
            <motion.div
              className="mx-auto max-w-7xl flex flex-col lg:flex-row justify-center gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ staggerChildren: 0.2 }}
            >
              <motion.div
                variants={slideInFromLeft}
                className="w-full lg:w-3/5"
              >
                <VCFeatureCard3 className="h-full" />
              </motion.div>

              <motion.div
                variants={slideInFromRight}
                className="w-full lg:w-2/5"
              >
                <VCFeatureCard8 className="h-full" />
              </motion.div>
            </motion.div>
          </div>

          <FAQSection />
          <FinalCTASection  />
          <FooterSection />
        </>
      )}
    </main>
  );
}
