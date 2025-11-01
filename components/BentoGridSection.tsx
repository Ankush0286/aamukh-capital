// BentoGridSection.tsx (Mobile Responsive)

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import VCFeatureCard1 from './VCFeatureCard1';
import VCFeatureCard2 from './VCFeatureCard2';
import VCFeatureCard5 from './VCFeatureCard5';
import VCFeatureCard7 from './VCFeatureCard7';
import KeyStatsCard from './KeyStatsCard';
import PitchCTACard from './PitchCTACard';

const BentoGridSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  } as const;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  } as const;

  return (
    <section className="w-full px-4 sm:px-[5%] py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2 variants={fadeInUp} className="font-medium text-4xl sm:text-5xl md:text-6xl font-display tracking-tight text-gray-900">
            An Unfair Advantage
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform is more than just capital. We provide a comprehensive ecosystem of resources designed to help our founders win at every stage.
          </motion.p>
        </motion.div>

        {/* Mobile: Stack vertically with proper heights | Desktop: Fixed grid layout */}
        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-6 lg:grid-rows-4 lg:h-[950px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Feature Card 2 - Large card */}
          <motion.div className="h-[450px] lg:h-auto lg:col-span-3 lg:row-span-2" variants={itemVariants}>
            <VCFeatureCard2 className="h-full" />
          </motion.div>

          {/* Feature Card 1 - Tall narrow card */}
          <motion.div className="h-[350px] lg:h-auto lg:col-span-1 lg:row-span-2" variants={itemVariants}>
            <VCFeatureCard1 className="h-full" />
          </motion.div>

          {/* Feature Card 7 - Tallest card (appears later on mobile) */}
          <motion.div className="h-[700px] lg:h-auto lg:col-span-2 lg:row-span-4 order-last lg:order-none" variants={itemVariants}>
            <VCFeatureCard7 className="h-full" />
          </motion.div>

          {/* Feature Card 5 - Medium card */}
          <motion.div className="h-[400px] lg:h-auto lg:col-span-2 lg:row-span-2" variants={itemVariants}>
            <VCFeatureCard5 className="h-full" />
          </motion.div>

          {/* Stats and CTA Cards - Side by side on tablet, stacked on mobile */}
          <motion.div 
            className="lg:col-span-2 lg:row-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-6" 
            variants={itemVariants}
          >
            <div className="h-[250px] sm:h-auto">
              <KeyStatsCard />
            </div>
            <div className="h-[250px] sm:h-auto">
              <PitchCTACard />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoGridSection;