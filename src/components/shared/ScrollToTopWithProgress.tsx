'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

export const ScrollToTopWithProgress: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark } = useDarkMode();

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const updateScrollProgress = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    setScrollProgress(progress);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ 
            opacity: 0, 
            scale: 0.8,
            y: 20
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8,
            y: 20
          }}
          whileHover={{ 
            scale: 1.1,
            y: -2
          }}
          whileTap={{ 
            scale: 0.95 
          }}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-4 rounded-2xl backdrop-blur-md border-2 shadow-2xl transition-all duration-300 group ${
            isDark
              ? 'bg-gray-800/80 border-gray-700 hover:bg-gray-700/90 text-white hover:border-blue-500/50 hover:shadow-blue-500/20'
              : 'bg-white/80 border-gray-300 hover:bg-white text-gray-800 hover:border-blue-400/50 hover:shadow-blue-400/20'
          }`}
          aria-label="Retour en haut de la page"
        >
          {/* Progress circle */}
          <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
            {/* Background circle */}
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              stroke={isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.5)'}
              strokeWidth="2"
            />
            {/* Progress circle */}
            <motion.circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              stroke={isDark ? '#3b82f6' : '#2563eb'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={100 - scrollProgress}
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 100 - scrollProgress }}
              transition={{ duration: 0.1 }}
            />
          </svg>

          {/* Arrow icon */}
          <motion.div
            animate={{ 
              y: [0, -2, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </motion.div>

          {/* Hover tooltip with progress */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className={`absolute right-full mr-3 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              isDark 
                ? 'bg-gray-700 text-white' 
                : 'bg-gray-800 text-white'
            } hidden sm:block`}
          >
            <div>Retour en haut</div>
            <div className="text-xs opacity-75 mt-1">
              {Math.round(scrollProgress)}% scrollé
            </div>
            <div className={`absolute top-1/2 left-full -mt-1 w-2 h-2 transform rotate-45 ${
              isDark ? 'bg-gray-700' : 'bg-gray-800'
            }`} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};