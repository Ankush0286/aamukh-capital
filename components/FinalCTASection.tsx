import React from 'react';
import { MoveRight, Contact } from 'lucide-react';
import { motion } from 'framer-motion';

const FinalCTASection = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.2, duration: 0.6, ease: 'easeOut' },
    },
  } as const;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  } as const;

  return (
    <section className="py-24 px-4 bg-white">
      <motion.div
        className="relative overflow-hidden rounded-3xl py-16 px-6 sm:py-20 sm:px-10 lg:px-16 flex flex-col items-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg')`,
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="absolute inset-0 bg-gray-900/60"></div>

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
          <motion.div variants={fadeInUp} className="inline-block px-3 py-1 text-sm font-medium text-white/95 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
            Ready to Invest?
          </motion.div>

          <motion.h3 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight bg-linear-to-b from-white to-white/80 bg-clip-text text-transparent">
            Partner with the Future of Innovation
          </motion.h3>

          <motion.p variants={fadeInUp} className="text-base sm:text-lg leading-relaxed text-white/95">
            We are actively seeking visionary founders and disruptive ideas. If you&apos;re building a company that will redefine industries, we want to hear from you. Let&poas;s build the future, together.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-cyan-400 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <a href="/pitch" className="relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-[#0335fc] text-white font-semibold rounded-full shadow-[inset_0_1px_2px_-0.5px_rgba(255,255,255,0.12),inset_0_0.5px_0.5px_rgba(255,255,255,0.16),inset_0_8px_24px_-4px_rgba(255,255,255,0.16),0_8px_8px_-3px_rgba(7,1,19,0.03),0_2px_2px_-1px_rgba(7,1,19,0.03)] transition-transform duration-300 group-hover:scale-105">
                <span>Pitch Your Deck</span>
                <MoveRight className="w-5 h-5" />
              </a>
            </div>

            <a href="/contact" className="relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 text-white font-medium bg-white/10 rounded-full backdrop-blur-md border border-white/20 shadow-[inset_0_2px_8px_rgba(255,255,255,0.05),inset_0_1px_3px_rgba(255,255,255,0.12)] transition-transform duration-300 hover:scale-105 hover:bg-white/20">
              <span>Contact Us</span>
              <Contact className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
