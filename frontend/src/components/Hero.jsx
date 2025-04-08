import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = ({ title, subtitle, ctaText, ctaLink, backgroundImage = null }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with dark mode support */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 transition-colors duration-300">
        {backgroundImage && (
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <img
              src={backgroundImage}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400 dark:bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
          {ctaText && ctaLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to={ctaLink}
                className="inline-block bg-white text-blue-600 dark:bg-blue-50 dark:text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 dark:hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {ctaText}
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero; 