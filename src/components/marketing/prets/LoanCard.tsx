'use client';

import { motion, Variants } from 'framer-motion';
import { LoanCardProps } from './types';
import { colorClasses } from './loanData';
import { useTranslation } from '@/lib/i18n/client'; 

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.92
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  hover: {
    y: -12,
    scale: 1.03,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const LoanCard: React.FC<LoanCardProps> = ({ loan, index, isDark, onLearnMore }) => {
  const { t } = useTranslation();
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

  // Helper function to get nested translations (always returns string)
  const getLoanTranslation = (field: string): string => {
    const loanType = loan.id.split('-')[0]; // 'student-loan' -> 'student'
    const translationKey = `products.${loanType}.${field}`;
    const translated = t('loans', translationKey) ?? loan[field as keyof typeof loan];
    return safeToString(translated);
  };

  // Helper function to get feature translation (always returns string)
  const getFeatureTranslation = (featureKey: string, index: number): string => {
    const loanType = loan.id.split('-')[0];
    const translationKey = `products.${loanType}.features.${index}`;
    const translated = t('loans', translationKey) ?? featureKey;
    return safeToString(translated);
  };

  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover="hover"
      className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/90 hover:from-gray-800 hover:to-gray-900'
          : 'bg-gradient-to-br from-white/95 to-gray-50/95 hover:from-white hover:to-gray-100'
      } backdrop-blur-xl border ${
        isDark 
          ? 'border-gray-700/60 hover:border-gray-600/80 shadow-2xl shadow-black/40' 
          : 'border-gray-200/80 hover:border-gray-300 shadow-2xl shadow-gray-200/50'
      }`}
      onClick={() => onLearnMore(loan)}
    >
      {/* Header with Enhanced Gradient */}
      <div className={`relative h-40 bg-gradient-to-br ${isDark ? colors.dark : colors.light} overflow-hidden`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        </div>
        
        {/* Icon Container with Glow */}
        <div className="absolute top-6 left-6">
          <div className={`relative p-3 rounded-2xl backdrop-blur-sm ${
            isDark ? 'bg-black/20' : 'bg-white/20'
          } border ${
            isDark ? 'border-white/10' : 'border-white/30'
          }`}>
            <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
              {loan.icon}
            </div>
            {/* Icon Glow */}
            <div className={`absolute inset-0 rounded-2xl bg-current opacity-20 blur-md -z-10`} />
          </div>
        </div>

        {/* Title Section */}
        <div className="absolute bottom-6 left-6 right-6">
          <motion.h3 
            className="text-white font-bold text-xl mb-2 leading-tight"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {getLoanTranslation('title')}
          </motion.h3>
          <p className="text-white/90 text-sm font-medium leading-relaxed">
            {getLoanTranslation('subtitle')}
          </p>
        </div>

        {/* Floating Corner Accent */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-3xl`} />
      </div>

      {/* Enhanced Content Area */}
      <div className="p-8">
        {/* Key Info Grid - More Spacious */}
        <div className="grid gap-4 mb-8">
          <div className="flex flex-col items-start justify-between p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 group-hover:scale-[1.02]">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${isDark ? colors.bgDark : colors.bgLight}`} />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('common', 'loan.amount') || 'Montant'}
              </span>
            </div>
            <span className={`font-bold text-lg ${isDark ? colors.textDark : colors.textLight}`}>
              {getLoanTranslation('amount')}
            </span>
          </div>

          <div className="flex flex-col items-start justify-between p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 group-hover:scale-[1.02]">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${isDark ? colors.bgDark : colors.bgLight}`} />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('common', 'loan.interestRate') || 'Taux'}
              </span>
            </div>
            <span className={`font-bold text-lg ${isDark ? colors.textDark : colors.textLight}`}>
              {getLoanTranslation('interestRate')}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 group-hover:scale-[1.02]">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${isDark ? colors.bgDark : colors.bgLight}`} />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('common', 'loan.term') || 'Durée'}
              </span>
            </div>
            <span className={`font-bold text-lg ${isDark ? colors.textDark : colors.textLight}`}>
              {getLoanTranslation('term')}
            </span>
          </div>
        </div>

        {/* Features Preview - Enhanced */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-1.5 h-1.5 rounded-full ${isDark ? colors.bgDark : colors.bgLight}`} />
            <h4 className={`text-sm font-semibold uppercase tracking-wide ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t('common', 'loan.features') || 'Avantages principaux'}
            </h4>
          </div>
          <ul className="space-y-3">
            {loan.features.slice(0, 2).map((featureKey, idx) => (
              <motion.li 
                key={idx}
                className={`flex items-start space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'hover:bg-gray-800/50 text-gray-300' 
                    : 'hover:bg-gray-100/80 text-gray-600'
                }`}
                whileHover={{ x: 4 }}
              >
                <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                  isDark ? colors.bgDark : colors.bgLight
                }`} />
                <span className="text-sm leading-relaxed font-medium">
                  {getFeatureTranslation(featureKey, idx)}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Enhanced CTA Button */}
        <motion.button
          whileHover={{ 
            scale: 1.02,
            y: -1
          }}
          whileTap={{ 
            scale: 0.98,
            y: 0
          }}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 relative overflow-hidden group ${
            isDark
              ? 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg'
              : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 shadow-lg'
          } border ${
            isDark ? 'border-gray-600' : 'border-gray-300'
          }`}
        >
          {/* Button Shine Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />
          
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <span>{t('common', 'learnMore') || 'En savoir plus'}</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </span>
        </motion.button>
      </div>

      {/* Enhanced Border Glow on Hover */}
      <div className={`absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ${
        isDark 
          ? `border-white/20 shadow-2xl ${colors.borderDark.replace('20', '40')}` 
          : `border-gray-300/50 shadow-xl ${colors.borderLight.replace('20', '40')}`
      } pointer-events-none`} />

      {/* Subtle Corner Accents */}
      <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        isDark ? colors.borderDark : colors.borderLight
      }`} />
      <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        isDark ? colors.borderDark : colors.borderLight
      }`} />
    </motion.div>
  );
};