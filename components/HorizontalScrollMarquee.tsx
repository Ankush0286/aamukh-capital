// testing-websites/components/HorizontalScrollMarquee.tsx
"use client";

import React, { useRef, useState, useEffect, useLayoutEffect, memo } from 'react';
import { useScroll, useVelocity } from 'framer-motion';

interface MarqueeProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollSensitivity?: number;
  className?: string;
}

// This custom hook contains the core animation logic, inspired by the reference component.
const useMarqueeAnimation = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  seqWidth: number,
  baseVelocity: number,
  scrollSensitivity: number
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  // We still use Framer's hooks to efficiently get scroll velocity.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || seqWidth === 0) return;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      // Calculate the target velocity based on scroll
      const currentScrollVelocity = scrollVelocity.get();
      let scrollInducedVelocity = 0;
      if (currentScrollVelocity < 0) { // Scrolling up
        scrollInducedVelocity = -baseVelocity * 3 * scrollSensitivity;
      } else if (currentScrollVelocity > 0) { // Scrolling down
        scrollInducedVelocity = -baseVelocity * 0.5 * scrollSensitivity;
      }
      
      const targetVelocity = baseVelocity + scrollInducedVelocity;

      // Smoothly ease the current velocity towards the target velocity
      const easingFactor = 1 - Math.exp(-deltaTime / 0.25); // SMOOTH_TAU from reference
      velocityRef.current += (targetVelocity - velocityRef.current) * easingFactor;

      // Update the offset
      let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
      
      // Wrap the offset to create the infinite loop
      const wrapAround = (val: number, max: number) => ((val % max) + max) % max;
      offsetRef.current = wrapAround(nextOffset, seqWidth);

      // Directly manipulate the DOM. This is the key to ignoring React's render cycle.
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      lastTimestampRef.current = null;
    };
  }, [trackRef, seqWidth, baseVelocity, scrollSensitivity, scrollVelocity]);
};


const MarqueeComponent = ({
  children,
  baseVelocity = -50,
  scrollSensitivity = 0.5,
  className = '',
}: MarqueeProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const seqRef = useRef<HTMLSpanElement | null>(null);
  const [seqWidth, setSeqWidth] = useState(0);

  // Measure the width of one sequence of children to know when to loop
  useLayoutEffect(() => {
    if (seqRef.current) {
      // We add the margin-right to the width for a correct calculation
      const style = window.getComputedStyle(seqRef.current);
      const marginRight = parseFloat(style.marginRight);
      setSeqWidth(seqRef.current.offsetWidth + marginRight);
    }
  }, [children]);

  // Use the custom animation hook
  useMarqueeAnimation(trackRef, seqWidth, baseVelocity, scrollSensitivity);

  return (
    <section className={`w-full overflow-hidden py-8 bg-gray-50 border-y border-gray-200/80 ${className}`}>
      <div
        ref={trackRef}
        className="flex whitespace-nowrap text-4xl md:text-5xl font-medium tracking-tight text-gray-400 will-change-transform"
      >
        {/* We render enough copies to fill the screen and provide a buffer */}
        <span ref={seqRef} className="block mr-16">{children}</span>
        <span className="block mr-16">{children}</span>
        <span className="block mr-16">{children}</span>
        <span className="block mr-16">{children}</span>
        <span className="block mr-16">{children}</span>
      </div>
    </section>
  );
};

const HorizontalScrollMarquee = memo(MarqueeComponent);
HorizontalScrollMarquee.displayName = 'HorizontalScrollMarquee';

export default HorizontalScrollMarquee;