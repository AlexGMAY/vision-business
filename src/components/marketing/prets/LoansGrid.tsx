'use client';

import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import { useTranslation } from '@/lib/i18n/client'; 
import { LoanProduct } from './types';
import { allLoanProducts } from './loanData';
import { LoanCard } from './LoanCard';
import { LoanModal } from './LoanModal';
import { LoanComparison } from './LoanComparison';

// Grid animation variants
const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const gridItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function LoansGrid() {
  const { t } = useTranslation();   
  const { isDark } = useDarkMode();
  const [selectedLoan, setSelectedLoan] = useState<LoanProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [filterKey, setFilterKey] = useState(0); // Add this key to force re-animation

  const handleLearnMore = (loan: LoanProduct) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLoan(null), 300);
  };

  const handleLoanSelect = (loan: LoanProduct) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  // Filter loans by category
  const filteredLoans = filter === 'all' 
    ? allLoanProducts 
    : allLoanProducts.filter(loan => loan.category === filter);

  // Get unique categories for filter
  const categories = ['all', ...new Set(allLoanProducts.map(loan => loan.category))];

  // Reset animation when filter changes
  useEffect(() => {
    setFilterKey(prev => prev + 1);
  }, [filter]);

  return (
    <section className={`min-h-screen py-20 lg:py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 rounded-full backdrop-blur-sm border mb-6"
          >
            <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('prets', 'badge') || "Tous Nos Prêts"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            <span className="block">{t('prets', 'title.main') || "Découvrez nos"}</span>
            <span className={`block bg-gradient-to-r bg-clip-text text-transparent ${
              isDark 
                ? 'from-blue-400 via-purple-400 to-green-400'
                : 'from-blue-600 via-purple-600 to-green-600'
            }`}>
              {t('prets', 'title.highlight') || "solutions de prêt"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            {t('prets', 'description', { count: allLoanProducts.length }) || `Explorez notre gamme complète de ${allLoanProducts.length} solutions de financement conçues pour accompagner tous vos projets, qu'ils soient personnels, professionnels ou entrepreneuriaux.`}
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 capitalize ${
                filter === category
                  ? isDark
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-600 text-white shadow-lg'
                  : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category === 'all' 
                ? t('prets', 'filters.all') || 'Tous les prêts'
                : t('prets', `filters.${category}`) || category
              }
            </motion.button>
          ))}
        </motion.div>

        {/* Loans Grid - Added key to force re-animation */}
        <motion.div
          key={filterKey} // This forces re-animation when filter changes
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredLoans.map((loan, index) => (
            <motion.div
              key={`${loan.id}-${filterKey}`} // Unique key for each card
              variants={gridItemVariants}
              className="flex justify-center"
            >
              <LoanCard 
                loan={loan} 
                index={index} 
                isDark={isDark} 
                onLearnMore={handleLearnMore}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* <LoanComparison onLoanSelect={handleLearnMore} /> */}

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`text-center mt-12 p-6 rounded-2xl backdrop-blur-sm border ${
            isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'
          }`}
        >
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {filter === 'all' 
              ? t('prets', 'results.all', { count: filteredLoans.length }) || 
                `Affichage de ${filteredLoans.length} prêt${filteredLoans.length > 1 ? 's' : ''}`
              : t('prets', 'results.filtered', { count: filteredLoans.length, filter }) || 
                `Affichage de ${filteredLoans.length} prêt${filteredLoans.length > 1 ? 's' : ''} dans la catégorie "${filter}"`
            }
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <LoanModal 
        loan={selectedLoan} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        isDark={isDark}
      />
    </section>
  );
}