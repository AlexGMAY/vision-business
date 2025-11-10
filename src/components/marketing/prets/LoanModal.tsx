'use client';

import { motion, Variants } from 'framer-motion';
import { LoanModalProps } from './types';
import { colorClasses } from './loanData';
import { useTranslation } from '@/lib/i18n/client';

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const LoanModal: React.FC<LoanModalProps> = ({ loan, isOpen, onClose, isDark }) => {
  const { t } = useTranslation();
  if (!loan || !isOpen) return null;

  const colors = colorClasses[loan.color];

  // Helper to normalize various translation return types to a string
  const safeToString = (value: unknown): string => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) return value.join(', ');
    if (value && typeof value === 'object') {
      const v = value as Record<string, any>;
      // Example: { min: number; max: number; } -> "min – max"
      if (typeof v.min === 'number' && typeof v.max === 'number') {
        return `${v.min} – ${v.max}`;
      }
      try {
        return JSON.stringify(value);
      } catch {
        return '';
      }
    }
    return '';
  };

  // Helper function to get nested translations
  const getLoanTranslation = (field: string) => {
    const loanType = loan.id.split('-')[0]; // 'student-loan' -> 'student'
    const translationKey = `products.${loanType}.${field}`;
    const translated = t('loans', translationKey) || loan[field as keyof typeof loan];
    return safeToString(translated);
  };

  // Helper function to get feature translation
  const getFeatureTranslation = (featureKey: string, index: number) => {
    const loanType = loan.id.split('-')[0];
    const translationKey = `products.${loanType}.features.${index}`;
    const translated = t('loans', translationKey) || featureKey;
    return safeToString(translated);
  };

  // Helper function to get eligibility translation
  const getEligibilityTranslation = (eligibilityKey: string, index: number) => {
    const loanType = loan.id.split('-')[0];
    const translationKey = `products.${loanType}.eligibility.${index}`;
    const translated = t('loans', translationKey) || eligibilityKey;
    return safeToString(translated);
  };

  // Helper function to get document translation
  const getDocumentTranslation = (documentKey: string, index: number) => {
    const loanType = loan.id.split('-')[0];
    const translationKey = `products.${loanType}.documents.${index}`;
    const translated = t('loans', translationKey) || documentKey;
    return safeToString(translated);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative h-48 bg-gradient-to-r ${isDark ? colors.dark : colors.light} rounded-t-3xl`}>
          <div className="absolute inset-0 bg-black/10 rounded-t-3xl" />
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center ${
              isDark ? 'bg-black/20 hover:bg-black/30 text-white' : 'bg-white/20 hover:bg-white/30 text-gray-800'
            } transition-all duration-200`}
          >
            ✕
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-4xl mb-2">{loan.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-1">
              {getLoanTranslation('title')}
            </h2>
            <p className="text-white/80 text-lg">
              {getLoanTranslation('subtitle')}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('common', 'loan.description') || 'Description'}
            </h3>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {getLoanTranslation('description')}
            </p>
          </div>

          {/* Key Information Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('common', 'loan.amount') || 'Montant'}
              </h4>
              <p className={`font-bold ${isDark ? colors.textDark : colors.textLight}`}>
                {getLoanTranslation('amount')}
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('common', 'loan.interestRate') || "Taux d'intérêt"}
              </h4>
              <p className={`font-bold ${isDark ? colors.textDark : colors.textLight}`}>
                {getLoanTranslation('interestRate')}
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('common', 'loan.term') || 'Durée'}
              </h4>
              <p className={`font-bold ${isDark ? colors.textDark : colors.textLight}`}>
                {getLoanTranslation('term')}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('common', 'loan.features') || 'Avantages'}
              </h3>
              <ul className="space-y-2">
                {loan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="w-2 h-2 bg-current rounded-full mr-3" />
                    {getFeatureTranslation(feature, idx)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('common', 'loan.eligibility') || 'Éligibilité'}
              </h3>
              <ul className="space-y-2">
                {loan.eligibility.map((item, idx) => (
                  <li key={idx} className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="w-2 h-2 bg-current rounded-full mr-3" />
                    {getEligibilityTranslation(item, idx)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Required Documents */}
          <div className="mb-8">
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('common', 'loan.requiredDocuments') || 'Documents Requis'}
            </h3>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <ul className="space-y-2">
                {loan.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="w-2 h-2 bg-current rounded-full mr-3" />
                    {getDocumentTranslation(doc, idx)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {t('common', 'actions.applyLoan') || 'Demander ce prêt'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-4 rounded-xl font-semibold text-lg border transition-all duration-200 ${
                isDark
                  ? 'border-gray-600 hover:bg-gray-700 text-white'
                  : 'border-gray-300 hover:bg-gray-100 text-gray-800'
              }`}
              onClick={onClose}
            >
              {t('common', 'actions.close') || 'Fermer'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
