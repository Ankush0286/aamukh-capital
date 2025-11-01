"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Share2 } from 'lucide-react';
import Image from 'next/image';

// --- Mock Data for the Component ---
const synergyData = [
  { name: 'CloudScale', logo: 'https://img.logo.dev/aws.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40', type: 'Infrastructure Partner' },
  { name: 'AuthRight', logo: 'https://img.logo.dev/okta.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40', type: 'API Integration' },
  { name: 'Insightly', logo: 'https://img.logo.dev/amplitude.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40', type: 'Go-to-Market' },
  { name: 'Connecta', logo: 'https://img.logo.dev/segment.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40', type: 'Customer Intro' },
  { name: 'SecureFlow', logo: 'https://img.logo.dev/snyk.io?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40', type: 'Talent Network' },
  { name: 'DataWeave', logo: 'https://img.logo.dev/snowflake.com?token=pk_OhWf3zjnTHujYhgl0faDQA&size=40', type: 'Strategic Advisor' },
];

// --- CORRECTED VARIANTS WITH PROPER TYPING ---
const satelliteVariants = {
  hidden: (custom: { center: number }) => ({ 
    x: custom.center, 
    y: custom.center, 
    scale: 0, 
    opacity: 0 
  }),
  visible: (custom: { x: number; y: number; controlX: number; controlY: number; center: number }) => ({
    x: [custom.center, custom.controlX, custom.x],
    y: [custom.center, custom.controlY, custom.y],
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1] as const,
      delay: 0.3,
    },
  }),
};

const VCFeatureCard2 = ({ className = '' }: { className?: string }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [dimensions, setDimensions] = useState({ cardSize: 400, center: 200, radius: 150 });
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.7, margin: "0px 0px -50px 0px" });

  // Responsive dimensions calculation
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        const size = Math.min(width, height, 500); // Increased max from 450 to 500
        const cardSize = Math.max(size * 0.95, 320); // Increased minimum to 320px and scale to 95%
        const center = cardSize / 2;
        const radius = cardSize / 2 - 40; // Reduced margin from 45 to 40 for even larger radius
        
        setDimensions({ cardSize, center, radius });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Mark as animated once it comes into view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasAnimated) {
      interval = setInterval(() => {
        setAnimationKey(prevKey => prevKey + 1);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [hasAnimated]);

  useEffect(() => {
    setHoveredIndex(null);
  }, [animationKey]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const centralNodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }
    },
  } as const;

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: 1, 
        ease: [0.25, 1, 0.5, 1] as const,
        delay: 0.3 
      },
    },
  } as const;

  const { cardSize, center, radius } = dimensions;

  return (
    <div ref={ref} className={`relative w-full bg-white rounded-3xl p-4 sm:p-6 border border-gray-200/80 shadow-card-medium overflow-hidden ${className} flex flex-col`}>
      <div className="mb-3 sm:mb-4 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 mb-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Our Ecosystem</h3>
        </div>
        <p className="text-gray-500 text-xs sm:text-sm ml-10 sm:ml-[52px]">
          We connect founders to a curated network of partners, talent, and customers.
        </p>
      </div>

      <div ref={containerRef} className="relative flex-grow flex items-center justify-center min-h-[300px] sm:min-h-[350px]">
        <AnimatePresence mode="wait">
          {hasAnimated && (
            <motion.div
              key={animationKey}
              className="absolute"
              style={{ width: cardSize, height: cardSize }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <svg className="absolute inset-0" viewBox={`0 0 ${cardSize} ${cardSize}`}>
                {synergyData.map((_, index) => {
                  const angle = (index / synergyData.length) * 2 * Math.PI - Math.PI / 2;
                  const x = center + radius * Math.cos(angle);
                  const y = center + radius * Math.sin(angle);
                  const controlPointAngle = angle + 0.5;
                  const controlX = center + (radius / 2) * Math.cos(controlPointAngle);
                  const controlY = center + (radius / 2) * Math.sin(controlPointAngle);
                  const pathData = `M ${center},${center} Q ${controlX},${controlY} ${x},${y}`;

                  return (
                    <motion.path
                      key={`path-${index}`}
                      d={pathData}
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="transition-all duration-300"
                      style={{
                        stroke: hoveredIndex === null || hoveredIndex === index ? '#0335fc' : '#d1d5db',
                        opacity: hoveredIndex === null || hoveredIndex === index ? 0.8 : 0.3,
                      }}
                      variants={pathVariants}
                    />
                  );
                })}
              </svg>

              {synergyData.map((company, index) => {
                const angle = (index / synergyData.length) * 2 * Math.PI - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                const controlPointAngle = angle + 0.5;
                const controlX = center + (radius / 2) * Math.cos(controlPointAngle);
                const controlY = center + (radius / 2) * Math.sin(controlPointAngle);
                
                return (
                  <motion.div
                    key={`node-${index}`}
                    className="absolute w-12 h-12 sm:w-16 sm:h-16 -translate-x-1/2 -translate-y-1/2"
                    variants={satelliteVariants}
                    custom={{ x, y, controlX, controlY, center }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <motion.div
                      className="relative flex flex-col items-center justify-center cursor-pointer"
                      whileHover={{ scale: 1.15 }}
                      animate={{ opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-md flex items-center justify-center p-1 border-2 border-transparent group-hover:border-blue-500">
                        <Image 
                          src={company.logo} 
                          alt={company.name} 
                          width={32} 
                          height={32} 
                          className="rounded-full w-6 h-6 sm:w-8 sm:h-8" 
                        />
                      </div>
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.span 
                            className="absolute -bottom-5 sm:-bottom-5 text-center text-[10px] sm:text-[11px] font-medium text-gray-700 bg-white/80 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap z-10"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {company.type}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}

              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center p-2"
                variants={centralNodeVariants}
              >
                <Image 
                  src="/aamukh-logo.png" 
                  alt="Aamukh Ventures Logo" 
                  width={60} 
                  height={60}
                  className="w-12 h-12 sm:w-14 sm:h-14"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VCFeatureCard2;