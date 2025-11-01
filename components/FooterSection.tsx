import type { NextPage } from 'next';
import Link from 'next/link';
import { Mail, ArrowUpRight, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

const FooterSection: NextPage = () => {
  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Facebook', href: '#', icon: Facebook },
  ];

  // --- ADDED ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  } as const;

  return (
    <motion.footer 
      className="bg-gray-50 pt-24 pb-12 px-[5%]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <motion.div className="lg:col-span-2 pr-8" variants={fadeInUp}>
            <Link href="/" className="text-2xl font-bold text-[#0335fc] mb-4 inline-block">
              Aamukh Capital
            </Link>
            <p className="text-base text-gray-600 leading-relaxed max-w-sm mb-8">
              Fueling the next generation of innovators and category-defining companies.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#0335fc] transition-colors duration-300">
                  <social.icon className="w-6 h-6" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div className="flex flex-col" variants={fadeInUp}>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-700 hover:text-[#0335fc] transition-colors duration-300">About Us</Link></li>
              <li><Link href="/team" className="text-gray-700 hover:text-[#0335fc] transition-colors duration-300">Our Team</Link></li>
              <li><Link href="/thesis" className="text-gray-700 hover:text-[#0335fc] transition-colors duration-300">Thesis</Link></li>
              <li><Link href="/careers" className="text-gray-700 hover:text-[#0335fc] transition-colors duration-300">Careers</Link></li>
            </ul>
          </motion.div>

          <motion.div className="flex flex-col" variants={fadeInUp}>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Portfolio</h3>
            <ul className="space-y-3">
              <li><Link href="/companies" className="text-gray-700 hover:text-[#0335fc] transition-colors duration-300">Companies</Link></li>
              <li><Link href="/exits" className="text-gray-700 hover:text-[#0335fc] transition-colors duration-300">Exits</Link></li>
              <li><Link href="/news" className="text-gray-700 hover:text-[#0335fc] transition-colors duration-300">In the News</Link></li>
            </ul>
          </motion.div>

          <motion.div className="bg-gray-100 rounded-2xl p-8 flex flex-col justify-between border border-gray-200/80" variants={fadeInUp}>
            <div>
              <div className="w-12 h-12 bg-[#0335fc] rounded-full flex items-center justify-center mb-4">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Pitch to Us</h3>
              <p className="text-sm text-gray-600 leading-normal mb-4">
                Have a groundbreaking idea? We&apos;d love to hear it.
              </p>
            </div>
            <Link href="/pitch" className="font-medium text-sm text-[#0335fc] flex items-center group">
              Send your deck
              <ArrowUpRight className="ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 sm:mb-0">
            © {new Date().getFullYear()} Aamukh Capital. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default FooterSection;