"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Search, Microscope, Handshake, Target } from 'lucide-react';

const stagesData = [
  { Icon: Search, title: 'Sourcing & Screening', count: 5000 },
  { Icon: Microscope, title: 'Deep Diligence', count: 100 },
  { Icon: Handshake, title: 'Partner Meeting', count: 20 },
  { Icon: Target, title: 'New Partnership', count: 1 },
];

const ANIMATION_INTERVAL = 7000;

const AnimatedCounter = ({ to }: { to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, to, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString() + (to > 100 ? '+' : '');
      },
    });
    return () => controls.stop();
  }, [to]);

  return <span ref={ref}>0</span>;
};

const VCFeatureCard7 = ({ className = '' }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const [animationKey, setAnimationKey] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Dynamic height and width tracking for accurate path following
  const [containerHeight, setContainerHeight] = useState(740);
  const [containerWidth, setContainerWidth] = useState(320);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current) {
        setContainerHeight(contentRef.current.offsetHeight);
        setContainerWidth(contentRef.current.offsetWidth);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setAnimationKey(prevKey => prevKey + 1);
      // Update dimensions when animation starts
      if (contentRef.current) {
        setContainerHeight(contentRef.current.offsetHeight);
        setContainerWidth(contentRef.current.offsetWidth);
      }
    }
  }, [isInView, hasAnimated]);

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
      transition: { staggerChildren: 0.4 },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 2, ease: 'easeInOut' } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  } as const;

  // SVG Path calculation with dynamic width and height
  const controlPoint1Y = containerHeight * 0.316;
  const controlPoint2Y = containerHeight * 0.579;
  const pathData = `M ${containerWidth / 2} 0 C ${-containerWidth / 4} ${controlPoint1Y}, ${containerWidth * 1.25} ${controlPoint2Y}, ${containerWidth / 2} ${containerHeight}`;

  return (
    <div ref={ref} className={`relative w-full bg-white rounded-3xl border border-gray-200/80 shadow-lg overflow-hidden p-6 sm:p-8 flex flex-col ${className}`}>
      <div className="absolute -top-px -left-px w-24 h-24 bg-white rounded-br-full" />

      <div className="relative z-10 text-center mb-8 flex-shrink-0">
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Our Investment Funnel</h3>
        <p className="text-gray-600 mt-2">Finding the signal in the noise.</p>
      </div>

      <div ref={contentRef} className="relative flex-grow">
        {hasAnimated && (
          <motion.div
            key={animationKey}
            className="absolute inset-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0">
              <svg className="w-full h-full" fill="none" viewBox={`0 0 ${containerWidth} ${containerHeight}`} preserveAspectRatio="none">
                <motion.path
                  d={pathData}
                  stroke="#D1D5DB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={pathVariants}
                />
              </svg>
            </div>

            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`noise-${i}`}
                  className="absolute w-1.5 h-1.5 bg-gray-300 rounded-full"
                  style={{ offsetPath: `path("${pathData}")` }}
                  initial={{ offsetDistance: "0%", opacity: 0.7 }}
                  animate={{ offsetDistance: `${Math.random() * 80 + 10}%`, opacity: 0 }}
                  transition={{ duration: 2 + Math.random() * 2, delay: 0.5 + Math.random(), ease: 'linear' }}
                />
              ))}
              <motion.div
                className="absolute w-3 h-3 bg-[#0335fc] rounded-full shadow-[0_0_10px_rgba(3,53,252,0.5)]"
                style={{ offsetPath: `path("${pathData}")` }}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 4, delay: 1, ease: 'easeInOut' }}
              />
            </div>

            <motion.div
              className="absolute inset-0 grid grid-cols-2 gap-2 sm:gap-4"
              variants={containerVariants}
            >
              <div className="flex flex-col justify-around">
                {stagesData.map((stage) => (
                  <motion.div key={stage.title} variants={itemVariants} className="flex items-center gap-2 sm:gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <stage.Icon className="w-5 h-5 text-[#0335fc]" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800">{stage.title}</h4>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col justify-around items-end">
                {stagesData.map((stage) => (
                  <motion.p key={`${stage.title}-count`} variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-[#0335fc]">
                    <AnimatedCounter to={stage.count} />
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VCFeatureCard7;