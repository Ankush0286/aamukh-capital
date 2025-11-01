"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PreloaderSection = () => {
  
  // Animation variants for the main container to orchestrate children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for each letter of the title
  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 15,
      },
    },
  } as const;

  const title = "Aamukh Capital";

  return (
    // This component is designed to be wrapped by <AnimatePresence> in its parent.
    // The `exit` animation will be triggered when it's removed from the React tree.
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {/* Using the logo from the NavBar for brand consistency */}
          <Image src="/aamukh-logo.png" alt="Aamukh Capital Logo" width={400} height={400} priority />
        </motion.div>

        {/* Animated Title with Staggered Letters */}
        {/* <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={title}
          className="text-4xl md:text-5xl font-semibold text-[#0335fc] tracking-tight flex overflow-hidden"
          // Using the 'Britti Sans' font identified from other components
          style={{ fontFamily: "'Britti Sans', sans-serif" }}
        >
          {title.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              // Handle spaces correctly for layout
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1> */}

        {/* Animated Progress Bar to give a sense of loading */}
        <div className="w-48 h-1 bg-blue-100 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-[#0335fc]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PreloaderSection;