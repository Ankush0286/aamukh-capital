"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is your investment thesis?",
    answer:
      "We invest in visionary founders who are building category-defining companies in enterprise software, fintech, and digital health. We focus on businesses with strong network effects, scalable business models, and a clear path to profitability.",
  },
  {
    question: "What stage do you typically invest in?",
    answer:
      "We are stage-agnostic but primarily focus on Seed and Series A rounds. We believe in partnering with exceptional founders early in their journey and providing them with the capital and resources needed to scale.",
  },
  {
    question: "What is your average check size?",
    answer:
      "Our initial check size ranges from $500,000 to $5 million, depending on the stage and capital requirements of the business. We also reserve significant follow-on capital to support our portfolio companies in subsequent funding rounds.",
  },
  {
    question: "Beyond capital, what support do you provide?",
    answer:
      "We provide hands-on support in areas such as product strategy, go-to-market, hiring, and future fundraising. Our partners have deep operational experience, and we leverage our extensive network of industry experts and advisors to help our founders succeed.",
  },
  {
    question: "What do you look for in a founding team?",
    answer:
      "We look for resilient, passionate, and intellectually honest founders with deep domain expertise and a unique insight into the problem they are solving. A strong sense of vision, coupled with a bias for execution, is critical.",
  },
  {
    question: "How can I submit my pitch deck?",
    answer:
      "The best way to get in touch is through a warm introduction from someone in our network. However, we review all submissions sent through the contact form on our website. Please be concise and clearly articulate the problem you're solving and why your team is uniquely positioned to win.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  } as const;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 z-[-1]">
        <img
          src="https://images.pexels.com/photos/34485116/pexels-photo-34485116.jpeg"
          alt="Abstract background"
          className="object-cover w-full h-full opacity-10 blur-lg"
        />
        <div className="absolute inset-0 bg-white"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={fadeInUp} className="inline-block mb-4">
            <span className="rounded-full bg-white/50 px-4 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/10">
              Questions?
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 md:text-6xl"
            style={{ fontFamily: "'Britti Sans', sans-serif" }}
          >
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card-medium border border-slate-900/5"
              style={{
                boxShadow:
                  "0 2px 4px -1px rgba(7, 1, 19, 0.06), 0 1px 2px 0.6px rgba(7, 1, 19, 0.06), 0 0.5px 1px rgba(7, 1, 19, 0.06)",
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left p-5 sm:p-6 cursor-pointer transition-colors duration-200 hover:bg-white/90"
              >
                <span className="text-base sm:text-lg font-medium text-slate-800 group-hover:text-slate-900">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;