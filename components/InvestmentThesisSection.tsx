"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Zap, GitFork, ShieldCheck, ArrowRight } from 'lucide-react';

const InvestmentThesisSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabsData = [
    {
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      title: "Founder-First Philosophy",
      description: "We believe founders are the enduring asset. We prioritize exceptional learning agility, deep domain expertise, resilience, and an infectious vision.",
      logo: "https://img.logo.dev/a.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=48",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
    },
    {
      icon: <Zap className="w-6 h-6 text-green-600" />,
      title: "India's Innovation Supercycle",
      description: "Capitalizing on India's demographic dividend, deep tech emergence, and world-class digital infrastructure to back founders building for global markets.",
      logo: "https://img.logo.dev/india.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=48",
      image: "https://images.pexels.com/photos/16039379/pexels-photo-16039379/free-photo-of-gateway-of-india-in-mumbai.jpeg",
    },
    {
      icon: <GitFork className="w-6 h-6 text-purple-600" />,
      title: "Dual-Engine Investment Model",
      description: "From non-dilutive 'Discovery' capital for nascent ideas to 'Signal Series' funding for companies at their product-market fit inflection point.",
      logo: "https://img.logo.dev/git.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=48",
      image: "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
      title: "Conviction-Driven Capital",
      description: "As 'threshold' investors, we invest our own capital first. We're not just financial backers; we are partners building systems for belief.",
      logo: "https://img.logo.dev/shield.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=48",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    },
  ];

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    // --- THIS IS THE CORRECTED LINE ---
    <motion.section 
      className="bg-gray-50 py-24 sm:py-32 px-4 sm:px-[5%] font-sans overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="feeds-header flex flex-col lg:flex-row lg:justify-between lg:items-end mb-12 md:mb-16"
          variants={slideInFromLeft}
        >
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 tracking-tight">
              Our Investment Thesis
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We are a conviction-first venture community for India's next generation of breakout founders. Ideas evolve, but founders endure.
            </p>
          </div>
          <a
            href="/thesis"
            className="hidden lg:inline-flex items-center gap-2 text-blue-600 font-medium group"
          >
            <span>Explore Our Approach</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <motion.div 
            className="feeds-tabs-menu flex flex-col w-full lg:w-1/3 gap-2"
            variants={listVariants}
          >
            {tabsData.map((tab, index) => (
              <motion.button
                key={index}
                variants={slideInFromLeft}
                onClick={() => setActiveTab(index)}
                className={`feeds-tab-link w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 ease-in-out flex items-start gap-4 ${
                  activeTab === index
                    ? 'bg-white shadow-lg scale-105'
                    : 'bg-transparent hover:bg-white/60'
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {tab.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{tab.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{tab.description}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="feeds-tabs-content w-full lg:w-2/3 min-h-[450px] md:min-h-[500px] relative"
            variants={slideInFromRight}
          >
            {tabsData.map((tab, index) => (
              <div
                key={index}
                className={`feed-tab-pane w-full h-full transition-opacity duration-500 ease-in-out absolute inset-0 ${
                  activeTab === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div
                  className="w-full h-full rounded-3xl bg-slate-50 bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${tab.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={tab.logo} alt={`${tab.title} logo`} className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full p-2" />
                      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{tab.title}</h3>
                    </div>
                    <p className="text-base md:text-lg text-white/90 max-w-md">{tab.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="mt-12 text-center lg:hidden">
            <a
                href="/thesis"
                className="inline-flex items-center gap-2 text-blue-600 font-medium group"
            >
                <span>Explore Our Approach</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
        </div>
      </div>
    </motion.section>
  );
};

export default InvestmentThesisSection;