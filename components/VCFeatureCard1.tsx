// testing-websites\components\VCFeatureCard1.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Briefcase, Zap } from 'lucide-react';

// --- Mock Data for the Component ---
const portfolioHighlights = [
  { name: 'QuantumLeap', sector: 'Fintech', update: 'Closed $15M Series A', logoUrl: 'https://img.logo.dev/revolut.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40' },
  { name: 'Future AI', sector: 'Artificial Intelligence', update: 'Launched Generative Suite', logoUrl: 'https://img.logo.dev/openai.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40' },
  { name: 'GeneSys', sector: 'HealthTech', update: 'FDA Approval Granted', logoUrl: 'https://img.logo.dev/figma.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40' },
  { name: 'NexusWork', sector: 'Future of Work', update: 'Reached 1M Active Users', logoUrl: 'https://img.logo.dev/notion.so?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40' },
];

const VCFeatureCard1 = ({ className = '' }: { className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolioHighlights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeCompany = portfolioHighlights[currentIndex];

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  } as const;

  return (
    <motion.div
      className={`relative w-full bg-white rounded-3xl p-6 border border-gray-200/80 overflow-hidden ${className} flex flex-col`}
    >
      <div className="flex items-center gap-3 mb-6 flex-shrink-0">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-5 h-5 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Portfolio</h3>
      </div>

      <div className="relative flex-grow flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col items-center gap-3"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-2xl shadow-md flex items-center justify-center p-2">
              <img src={activeCompany.logoUrl} alt={`${activeCompany.name} Logo`} className="object-contain h-full w-full" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{activeCompany.name}</p>
              <p className="text-sm text-gray-500">{activeCompany.sector}</p>
              <p className="text-sm font-medium text-blue-600 mt-2 flex items-center justify-center gap-1.5">
                <Zap size={14} />
                {activeCompany.update}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full bg-gray-200/70 rounded-full h-1 my-6 flex-shrink-0">
        <motion.div
          key={currentIndex}
          className="bg-blue-600 h-1 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 4, ease: 'linear' }}
        />
      </div>

      {/* <div className="grid grid-cols-2 text-center mb-6 flex-shrink-0">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Capital Deployed</p>
          <p className="text-xl font-semibold text-gray-900">$250M+</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Companies Backed</p>
          <p className="text-xl font-semibold text-gray-900">42</p>
        </div>
      </div> */}

      {/* --- THIS IS THE CORRECTED BUTTON --- */}
      <a
        href="/portfolio"
        className="group w-full flex items-center justify-center gap-2.5 rounded-full bg-[#0335fc] px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
      >
        <span>Portfolio</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
};

export default VCFeatureCard1;