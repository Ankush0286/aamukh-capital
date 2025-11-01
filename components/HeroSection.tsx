"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight, MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const portfolioCompanies = [
    {
      name: 'Future AI',
      description: 'Pioneering the next wave of artificial intelligence and machine learning solutions.',
      logoUrl: 'https://img.logo.dev/notion.so?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40',
      imageUrl: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg',
      category: 'Artificial Intelligence',
    },
    {
      name: 'QuantumLeap',
      description: 'Building the future of decentralized finance and secure, transparent transactions.',
      logoUrl: 'https://img.logo.dev/revolut.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40',
      imageUrl: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg',
      category: 'Fintech',
    },
    {
      name: 'GeneSys',
      description: 'Advancing personalized medicine through cutting-edge biotech and health data analysis.',
      logoUrl: 'https://img.logo.dev/figma.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40',
      imageUrl: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg',
      category: 'HealthTech',
    },
  ];

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  } as const;

  return (
    <motion.section 
      className="relative w-full px-4 sm:px-[5%] pt-28 pb-16 md:pt-36 md:pb-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-[#104fc8] via-[#6baee6] via-20% to-[#f1f6f8] to-68%"></div>
      
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-16 lg:gap-20">
        <motion.div 
          className="flex max-w-3xl flex-col items-center gap-6 text-center"
          variants={containerVariants}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/95 backdrop-blur-sm"
          >
            <span className="mr-2 animate-pulse">●</span> We Invest in Tomorrow
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-white to-white/80 bg-clip-text"
            style={{ fontFamily: "'Britti Sans', sans-serif" }}
          >
            Fueling the Next Generation of Innovators
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
          >
            We partner with visionary founders at the seed stage, providing capital, strategic guidance, and a network of experts to build legendary companies.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="mt-4 flex flex-col items-center gap-4 sm:flex-row"
          >
            {/* --- CORRECTED BUTTON 1 --- */}
            <a href="/portfolio" className="flex w-full sm:w-auto justify-center items-center gap-2.5 rounded-full bg-[#0335fc] px-6 py-3 font-medium text-white shadow-[inset_0_1px_2px_-0.5px_rgba(255,255,255,0.12),inset_0_0.5px_0.5px_rgba(255,255,255,0.16),inset_0_8px_24px_-4px_rgba(255,255,255,0.16),0_8px_8px_-3px_rgba(7,1,19,0.03),0_2px_2px_-1px_rgba(7,1,19,0.03)] transition-transform duration-200 hover:scale-105 active:scale-95">
              Our Portfolio
              <ArrowRight className="h-4 w-4" />
            </a>
            {/* --- CORRECTED BUTTON 2 --- */}
            <a href="/pitch" className="group flex w-full sm:w-auto justify-center items-center gap-2.5 rounded-full bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-md shadow-[inset_0_2px_8px_rgba(255,255,255,0.05),inset_0_1px_3px_rgba(255,255,255,0.12),inset_0_0.5px_0.5px_rgba(255,255,255,0.16)] transition-transform duration-200 hover:scale-105 active:scale-95">
              <span>Pitch to Us</span>
              <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>


        <motion.div 
          className="relative w-full"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {portfolioCompanies.map((company) => (
              <motion.div
                key={company.name}
                variants={fadeInUp}
                className="group flex transform flex-col rounded-2xl bg-white/80 p-4 sm:p-6 shadow-xl shadow-blue-900/10 backdrop-blur-lg transition-all duration-500 hover:!opacity-100 md:hover:scale-105 lg:group-hover:opacity-50"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={company.imageUrl}
                    alt={company.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 right-3 rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
                    {company.category}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm p-1">
                    <Image src={company.logoUrl} alt={`${company.name} Logo`} width={28} height={28} />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-[#050414]">{company.name}</h3>
                </div>
                <p className="mt-2 text-sm text-[#3c3c47]">{company.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        
      </div>
    </motion.section>
  );
};

export default HeroSection;