// testing-websites\components\VCFeatureCard3.tsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { Lightbulb, Rocket, TrendingUp, Crown, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// --- Data for the different stages of the journey ---
const journeyData = [
  {
    stage: 'Seed',
    Icon: Lightbulb,
    title: 'The Spark of an Idea',
    description: "We partner at the earliest stage, helping founders refine their vision, build their core team, and find the initial product-market fit. Our 'Discovery' capital provides the first fuel.",
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    metrics: { teamSize: 5, valuation: 3 }, // in Millions
  },
  {
    stage: 'Series A',
    Icon: Rocket,
    title: 'Building the Engine',
    description: "With a validated product, we help scale the go-to-market engine. We provide our 'Signal Series' funding and connect founders to key hires and their first major customers.",
    image: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg',
    metrics: { teamSize: 30, valuation: 25 },
  },
  {
    stage: 'Growth',
    Icon: TrendingUp,
    title: 'Achieving Escape Velocity',
    description: 'This is about rapid expansion. We leverage our global network to help with international growth, strategic partnerships, and preparing for subsequent funding rounds.',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg',
    metrics: { teamSize: 150, valuation: 100 },
  },
  {
    stage: 'Unicorn',
    Icon: Crown,
    title: 'Defining the Category',
    description: 'As a category leader, we provide strategic counsel on M&A, market positioning, and navigating the path to an IPO or major exit, solidifying the company\'s legacy.',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg',
    metrics: { teamSize: 500, valuation: 1000 },
  },
];

// --- A custom component to animate the numbers counting up ---
const AnimatedMetric = ({ value, suffix = '' }: { value: number, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 1,
      ease: 'easeOut',
      onUpdate(latest) {
        node.textContent = Math.round(latest).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [value]);

  return <span ref={ref} />;
};


const VCFeatureCard3 = ({ className = '' }: { className?: string }) => {
  const [activeStage, setActiveStage] = useState(0);
  const activeData = journeyData[activeStage];

  return (
    <div className={`relative w-full bg-white rounded-3xl p-6 md:p-12 border border-gray-200/80 shadow-card-medium ${className}`}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/50 via-white to-white" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* --- Left Column: Interactive Timeline --- */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">The Founder's Journey</h3>
            <p className="text-gray-600 mt-2">From Seed to Scale, we're your dedicated partner at every milestone.</p>
          </div>
          <ul className="relative mt-8 md:mt-0 space-y-2">
            {journeyData.map((item, index) => (
              <li key={item.stage} className="relative">
                {/* The animated blue indicator */}
                {activeStage === index && (
                  <motion.div
                    layoutId="active-stage-indicator"
                    className="absolute -left-4 top-1 h-8 w-1 bg-[#0335fc] rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <button
                  onClick={() => setActiveStage(index)}
                  className={`w-full text-left flex items-center gap-4 p-2 rounded-lg transition-colors ${
                    activeStage === index ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <item.Icon className="w-6 h-6 flex-shrink-0" />
                  <span className="font-medium">{item.stage}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Right Column: Dynamic Content --- */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 shadow-lg">
                <Image
                  src={activeData.image}
                  alt={activeData.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <h4 className="text-xl sm:text-2xl font-semibold text-gray-800">{activeData.title}</h4>
              <p className="text-gray-600 mt-2 mb-6 leading-relaxed">{activeData.description}</p>

              <div className="grid grid-cols-2 gap-6 border-t border-gray-200 pt-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Team Size</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ~<AnimatedMetric value={activeData.metrics.teamSize} />
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Valuation</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    $<AnimatedMetric value={activeData.metrics.valuation} />M
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VCFeatureCard3;