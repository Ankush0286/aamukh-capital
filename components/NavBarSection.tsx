"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NavBarSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ['Home', 'About', 'Contact', 'Teams', 'Portfolio', 'Our Thesis'];

  // Effect to prevent scrolling when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const menuVariants = {
    hidden: { 
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3, 
        ease: 'easeInOut',
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.25, 
        ease: 'easeInOut',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
  } as const;

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  } as const;

  return (
    <>
      <motion.nav 
        className="fixed w-full z-[1000] top-0 left-0 flex justify-center px-4 sm:px-[3%] py-3 sm:py-[0.75rem]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        style={{ willChange: 'auto' }}
      >
        <div className="flex justify-between items-center w-full max-w-screen-lg px-4 sm:px-6 py-2 sm:py-4 rounded-full bg-white backdrop-blur-md shadow-lg shadow-gray-900/5">
          {/* Logo */}
          <div className="w-36 sm:w-48">
            <a href="/" aria-label="Home">
              <img
                src="/aamukh-logo.png"
                alt="Aamukh Capital Logo"
                className="w-full h-auto"
              />
            </a>
          </div>

          {/* Wrapper for all right-side items */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase().replace(' ', '-')}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Desktop Action Button */}
            <a href="/apply" className="hidden lg:inline-block px-5 py-2 rounded-full text-sm font-medium bg-[#0335fc] text-white shadow-md transition-transform hover:scale-105 active:scale-95">
              Apply
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isMenuOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[990] bg-white lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full pt-20 pb-10">
              <div className="flex flex-col items-center gap-6 text-center">
                {navLinks.map((link) => (
                  <motion.a
                    key={link}
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setIsMenuOpen(false)}
                    variants={linkVariants}
                    className="text-2xl font-medium text-gray-800 hover:text-[#0335fc] transition-colors"
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
              <motion.a 
                href="/apply"
                onClick={() => setIsMenuOpen(false)}
                variants={linkVariants}
                className="mt-12 px-8 py-3 rounded-full text-lg font-medium bg-[#0335fc] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Apply
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBarSection;