"use client";

import React, { useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Image from 'next/image';

// --- Mock Data for the Component ---
const investments = [
  { name: 'QuantumLeap', sector: 'Fintech', logoUrl: 'https://img.logo.dev/revolut.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=50', imageUrl: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg', metric: { label: 'YoY Growth', value: '320%' }, glowColor: 'from-sky-500/50' },
  { name: 'NexusWork', sector: 'Future of Work', logoUrl: 'https://img.logo.dev/notion.so?token=pk_OhWf3zjnTHujYhgl0faDQA&size=50', imageUrl: 'https://images.pexels.com/photos/34496190/pexels-photo-34496190.jpeg', metric: { label: 'Active Users', value: '1.2M' }, glowColor: 'from-purple-500/50' },
  { name: 'GeneSys', sector: 'HealthTech', logoUrl: 'https://img.logo.dev/figma.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=50', imageUrl: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg', metric: { label: 'Patents Filed', value: '27' }, glowColor: 'from-emerald-500/50' },
  { name: 'Future AI', sector: 'Artificial Intelligence', logoUrl: 'https://img.logo.dev/openai.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=50', imageUrl: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg', metric: { label: 'Model Accuracy', value: '98.7%' }, glowColor: 'from-blue-500/50' },
];

const DRAG_BUFFER = 50;

const Card = ({
  investment,
  onSwipe,
}: {
  investment: typeof investments[0];
  onSwipe: () => void;
}) => {
  const x = useMotionValue(0);
  const rotateX = useTransform(x, [-300, 300], [-20, 20]);
  const rotateY = useTransform(x, [-300, 300], [20, -20]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightOpacity = useTransform(mouseX, [0, 384], [0, 1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      className="absolute w-full h-full"
      style={{ x }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > DRAG_BUFFER) {
          onSwipe();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(192);
        mouseY.set(256);
      }}
    >
      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <Image src={investment.imageUrl} alt={investment.name} fill priority className="object-cover" />
        <motion.div
          className={`absolute inset-0 z-10 pointer-events-none bg-radial-gradient ${investment.glowColor} to-transparent`}
          style={{
            background: `radial-gradient(400px at ${mouseX.get()}px ${mouseY.get()}px, var(--tw-gradient-stops))`,
            opacity: spotlightOpacity,
          }}
        />
        <div className="absolute inset-0 z-20 p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-black/20">
          <div className="p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10" style={{ transform: 'translateZ(50px)' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center p-2">
                <Image src={investment.logoUrl} alt={`${investment.name} Logo`} width={40} height={40} />
              </div>
              <div>
                <p className="text-white/80 text-sm">{investment.sector}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{investment.name}</h3>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{investment.metric.label}</p>
                <p className="text-2xl sm:text-3xl font-semibold text-white">{investment.metric.value}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VCFeatureCard5 = ({ className = '' }: { className?: string }) => {
  const [index, setIndex] = useState(0);

  const handleSwipe = () => {
    setIndex(prevIndex => prevIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleSwipe();
    }, 7000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    // --- THIS IS THE CORRECTED LINE ---
    <div className={`relative w-full aspect-square overflow-hidden ${className}`}>
      <AnimatePresence>
        {investments.map((investment, i) => {
          if (i === index % investments.length) {
            return (
              <motion.div
                key={investment.name}
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{
                  x: 300,
                  opacity: 0,
                  transition: { duration: 0.3, ease: 'easeIn' },
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                  delay: 0.1,
                }}
                className="absolute w-full h-full"
              >
                <Card investment={investment} onSwipe={handleSwipe} />
              </motion.div>
            );
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
};

export default VCFeatureCard5;