// testing-websites\components\PitchCTACard.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const PitchCTACard = () => {
  return (
    <div className="relative w-full h-full bg-[#0335fc] rounded-3xl p-6 flex flex-col justify-between overflow-hidden">
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full" />
      <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Have a big idea?</h3>
        <p className="text-white/80 mt-1">We'd love to hear from you.</p>
      </div>
      
      <a
        href="/pitch"
        className="group relative z-10 mt-4 w-full flex items-center justify-between bg-white/90 backdrop-blur-sm px-4 py-3 font-semibold text-gray-800 rounded-full transition-transform hover:scale-105 active:scale-95"
      >
        <span>Pitch to Us</span>
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  );
};

export default PitchCTACard;