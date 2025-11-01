// testing-websites\components\VCFeatureCard8.tsx (No changes needed, but shown for context)

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const ANIMATION_INTERVAL = 7000; // 8 seconds for a full loop cycle

// --- Custom animated number component ---
const AnimatedCounter = ({ from, to, prefix = '', suffix = '' }: { from: number, to: number, prefix?: string, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasAnimated) return;

    // Reset text content on re-animation
    node.textContent = `${prefix}${from.toLocaleString()}${suffix}`;

    const controls = animate(from, to, {
      duration: 2,
      ease: 'easeOut',
      delay: 1.5, // Start counting after the line has drawn
      onUpdate(value) {
        node.textContent = `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
      },
      onComplete() {
        setHasAnimated(true);
      }
    });
    return () => controls.stop();
  }, [from, to, prefix, suffix, hasAnimated]);

  // Effect to reset animation state when the parent key changes
  useEffect(() => {
    setHasAnimated(false);
  }, [to]); // Using `to` as a proxy for the key change

  return <span ref={ref}>{`${prefix}${from.toLocaleString()}${suffix}`}</span>;
};

const VCFeatureCard8 = ({ className = '' }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [animationKey, setAnimationKey] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Mark as animated once it comes into view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      // Start the first animation immediately
      setAnimationKey(prevKey => prevKey + 1);
    }
  }, [isInView, hasAnimated]);

  // Set up interval for subsequent animations
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasAnimated) {
      interval = setInterval(() => {
        setAnimationKey(prevKey => prevKey + 1);
      }, ANIMATION_INTERVAL);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const pathData = "M 0 200 Q 50 150, 100 100 T 200 80 T 300 40";
  const fillData = `${pathData} L 300 220 L 0 220 Z`;

  return (
    // The `className` prop (containing "h-full") is applied here
    <div ref={ref} className={`relative w-full bg-white rounded-3xl border border-gray-200/80 shadow-card-medium overflow-hidden p-6 sm:p-8 ${className}`}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/50 via-white to-white" />

      {hasAnimated && (
        <motion.div
          key={animationKey}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col h-full" // This h-full is crucial for stretching
        >
          <div className="flex items-center gap-3 mb-6 flex-shrink-0">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#0335fc]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Portfolio Growth</h3>
          </div>

          {/* This flex-grow will take up all the new vertical space */}
          <div className="relative flex-grow flex items-center justify-center">
            <svg className="w-full h-full" fill="none" viewBox="0 0 300 220" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0335fc" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0335fc" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={fillData}
                fill="url(#growthGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
              <motion.path
                d={pathData}
                stroke="#0335fc"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-6 border-t border-gray-200 pt-6 mt-6 flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div>
              <p className="text-sm font-medium text-gray-500">Current Value</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                <AnimatedCounter from={100} to={500} prefix="$" suffix="M+" />
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Growth</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                <AnimatedCounter from={50} to={400} suffix="%" />
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default VCFeatureCard8;