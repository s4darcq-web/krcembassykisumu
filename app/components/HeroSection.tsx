'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-red-950 via-blue-950 to-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-6 py-2 bg-red-600 rounded-full text-sm font-medium mb-6">Sacred Teachings</div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Watch <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400">Powerful Sermons</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Life-changing messages from Apostle Amos Ligawa and the KRC family
          </p>
        </motion.div>
      </div>
    </section>
  );
}