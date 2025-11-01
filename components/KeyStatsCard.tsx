// testing-websites\components\KeyStatsCard.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { DollarSign, Gem, Users } from 'lucide-react';

const ANIMATION_INTERVAL = 7000; // 7 seconds for a full loop cycle

const AnimatedStat = ({ to, suffix, prefix, animationKey }: { to: number, suffix?: string, prefix?: string, animationKey: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      const controls = animate(0, to, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(value) {
          ref.current!.textContent = `${prefix || ''}${Math.round(value).toLocaleString()}${suffix || ''}`;
        },
      });
      return () => controls.stop();
    }
  }, [to, prefix, suffix, animationKey]);

  return <span ref={ref}>0</span>;
};

const KeyStatsCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
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

  return (
    <div ref={ref} className="relative w-full h-full bg-white rounded-3xl border border-gray-200/80 px-6 py-8 flex flex-col justify-center">
      {hasAnimated && (
        <div className="space-y-4 pl-2">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-[#0335fc]" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Capital Raised</p>
              <p className="text-2xl font-bold text-gray-900">
                <AnimatedStat to={500} prefix="$" suffix="M+" animationKey={animationKey} />
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Gem className="w-5 h-5 text-[#0335fc]" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Unicorns Backed</p>
              <p className="text-2xl font-bold text-gray-900">
                <AnimatedStat to={8} animationKey={animationKey} />
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-[#0335fc]" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Founder Community</p>
              <p className="text-2xl font-bold text-gray-900">
                <AnimatedStat to={150} suffix="+" animationKey={animationKey} />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyStatsCard;