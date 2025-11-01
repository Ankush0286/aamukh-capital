"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, TrendingUp } from 'lucide-react';

const themeClasses = {
  purple: {
    bg: 'bg-purple-50/60',
    border: 'border-purple-200/80',
    textTitle: 'text-purple-900',
    textLabel: 'text-purple-700',
    textValue: 'text-gray-800',
    iconColor: 'text-purple-500',
  },
  green: {
    bg: 'bg-green-50/60',
    border: 'border-green-200/80',
    textTitle: 'text-green-900',
    textLabel: 'text-green-700',
    textValue: 'text-gray-800',
    iconColor: 'text-green-500',
  },
};

// --- FIX 1: Create a type from the keys of themeClasses ---
type ThemeKey = keyof typeof themeClasses; // This will be 'purple' | 'green'

const trackData: {
  id: string;
  IconComponent: React.ElementType;
  title: string;
  color: ThemeKey; // --- FIX 2: Use the specific ThemeKey type ---
  details: { label: string; value: string }[];
}[] = [
  {
    id: 'discovery',
    IconComponent: Lightbulb,
    title: 'Track 1: Discovery Program',
    color: 'purple',
    details: [
      { label: 'Stage', value: 'Idea, student, pre-PMF' },
      { label: 'Cheque Size', value: '₹5–25 lakhs' },
      { label: 'Equity', value: 'No dilution' },
      { label: 'Why it matters', value: 'We get in before the crowd' },
    ],
  },
  {
    id: 'signal',
    IconComponent: TrendingUp,
    title: 'Track 2: Signal Series',
    color: 'green',
    details: [
      { label: 'Stage', value: 'Post-PMF, early scale' },
      { label: 'Cheque Size', value: '₹1–10 Cr' },
      { label: 'Equity', value: 'Standard Co-investment' },
      { label: 'Why it matters', value: 'We join at the inflection' },
    ],
  },
];


const DualModelSection = () => {
  const [activeTrackId, setActiveTrackId] = useState('discovery');
  
  const activeTrack = trackData.find(t => t.id === activeTrackId) || trackData[0];
  
  // Now TypeScript knows activeTrack.color is 'purple' | 'green', so this is safe
  const theme = themeClasses[activeTrack.color];
  const Icon = activeTrack.IconComponent;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  } as const;

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } }
  } as const;

  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } }
  } as const;

  return (
    <section className="bg-white py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-[5%]">
        <motion.div 
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight">
            The Dual Model
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-gray-600">
            Two tracks, one belief system. We operate on complementary tracks—one for the inception moment, and one for the inflection point.
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            variants={slideInFromLeft}
            className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm aspect-square relative flex items-center justify-center"
          >
            <motion.div 
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="46" fill="none" stroke="url(#ringGradient)" strokeWidth="0.8" strokeDasharray="2 4" />
              </svg>
            </motion.div>

            <motion.div 
              className="absolute inset-2"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke={activeTrackId === 'discovery' ? '#A78BFA' : '#34D399'} strokeWidth="0.3" />
              </svg>
            </motion.div>

            <div className="absolute inset-4">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="0.4" strokeDasharray="1 3" />
              </svg>
            </div>
            
            <motion.div 
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center relative"
              animate={{ 
                boxShadow: activeTrackId === 'discovery' 
                  ? ['0 0 20px rgba(139, 92, 246, 0.3)', '0 0 40px rgba(139, 92, 246, 0.5)', '0 0 20px rgba(139, 92, 246, 0.3)']
                  : ['0 0 20px rgba(16, 185, 129, 0.3)', '0 0 40px rgba(16, 185, 129, 0.5)', '0 0 20px rgba(16, 185, 129, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${activeTrackId === 'discovery' ? 'from-purple-50 to-purple-100' : 'from-green-50 to-green-100'} transition-all duration-500`}></div>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTrackId} 
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }} 
                  animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                  exit={{ opacity: 0, scale: 0.5, rotate: 180 }} 
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <Icon className={`w-10 h-10 ${theme.iconColor} drop-shadow-sm`} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div 
              onClick={() => setActiveTrackId('discovery')}
              className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-32 h-32 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className={`absolute w-20 h-20 rounded-full transition-all duration-500 ${activeTrackId === 'discovery' ? 'bg-gradient-to-br from-purple-100 to-purple-200 scale-100' : 'bg-transparent scale-0'}`}
                animate={activeTrackId === 'discovery' ? { boxShadow: ['0 0 0px rgba(139, 92, 246, 0.4)', '0 0 20px rgba(139, 92, 246, 0.6)', '0 0 0px rgba(139, 92, 246, 0.4)'] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <span className={`relative font-semibold text-sm transition-colors duration-300 ${activeTrackId === 'discovery' ? 'text-purple-900' : 'text-gray-400'}`}>
                Discovery
              </span>
            </motion.div>
            
            <motion.div 
              onClick={() => setActiveTrackId('signal')}
              className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-32 h-32 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
               <motion.div 
                 className={`absolute w-20 h-20 rounded-full transition-all duration-500 ${activeTrackId === 'signal' ? 'bg-gradient-to-br from-green-100 to-green-200 scale-100' : 'bg-transparent scale-0'}`}
                 animate={activeTrackId === 'signal' ? { boxShadow: ['0 0 0px rgba(16, 185, 129, 0.4)', '0 0 20px rgba(16, 185, 129, 0.6)', '0 0 0px rgba(16, 185, 129, 0.4)'] } : {}}
                 transition={{ duration: 2, repeat: Infinity }}
               ></motion.div>
               <span className={`relative font-semibold text-sm transition-colors duration-300 ${activeTrackId === 'signal' ? 'text-green-900' : 'text-gray-400'}`}>
                 Signal
               </span>
            </motion.div>
          </motion.div>

          <motion.div className="w-full max-w-md" variants={slideInFromRight}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrackId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <div className={`p-6 sm:p-8 rounded-3xl ${theme.bg} border ${theme.border}`}>
                  <h3 className={`text-xl sm:text-2xl font-semibold ${theme.textTitle} mb-6 sm:mb-8`}>{activeTrack?.title}</h3>
                  <div className="space-y-6">
                    {activeTrack?.details.map((detail) => (
                      <div key={detail.label}>
                        <p className={`text-base font-medium ${theme.textLabel}`}>{detail.label}</p>
                        <p className={`text-lg sm:text-xl ${theme.textValue} mt-1`}>{detail.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DualModelSection;