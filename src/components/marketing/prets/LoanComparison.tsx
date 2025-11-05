'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import { LoanProduct } from './types';
import { allLoanProducts } from './loanData';
import { colorClasses } from './loanData';

interface LoanComparisonProps {
  onLoanSelect: (loan: LoanProduct) => void;
}

export const LoanComparison: React.FC<LoanComparisonProps> = ({ onLoanSelect }) => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();

  const comparisonFeatures = [
    { key: 'amount', label: 'Montant du prêt' },
    { key: 'interestRate', label: 'Taux d\'intérêt' },
    { key: 'term', label: 'Durée' },
    { key: 'speed', label: 'Délai d\'approbation' },
    { key: 'bestFor', label: 'Idéal pour' }
  ];
  

  return (
    <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('prets', 'comparison.title') || 'Comparez nos solutions de prêt'}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('prets', 'comparison.subtitle') || 'Trouvez le prêt qui correspond parfaitement à vos besoins d\'entreprise'}
          </p>
        </motion.div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-4 mb-6">
              <div className="col-span-1"></div>
              {allLoanProducts.map((loan) => {
                const colors = colorClasses[loan.color];
                return (
                  <motion.div
                    key={loan.id}
                    whileHover={{ scale: 1.02 }}
                    className={`text-center p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${
                      isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl ${
                      isDark ? colors.bgDark : colors.bgLight
                    }`}>
                      {loan.icon}
                    </div>
                    <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('loans', loan.title) || loan.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('loans', loan.subtitle) || loan.subtitle}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Feature Rows */}
            {comparisonFeatures.map((feature, featureIndex) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: featureIndex * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-6 gap-4 py-6 border-b ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="col-span-1 flex items-center">
                  <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {feature.label}
                  </span>
                </div>
                
                {allLoanProducts.map((loan) => {
                  const colors = colorClasses[loan.color];
                  let value = '';
                  
                  switch (feature.key) {
                    case 'amount':
                      value = t('loans', loan.amount) || loan.amount;
                      break;
                    case 'interestRate':
                      value = t('loans', loan.interestRate) || loan.interestRate;
                      break;
                    case 'term':
                      value = t('loans', loan.term) || loan.term;
                      break;
                    case 'speed':
                      value = loan.speed;
                      break;
                    case 'bestFor':
                      value = loan.bestFor.slice(0, 2).join(', ');
                      break;
                  }

                  return (
                    <div key={`${loan.id}-${feature.key}`} className="text-center">
                      <span className={`font-medium ${isDark ? colors.textDark : colors.textLight}`}>
                        {value}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            ))}

            {/* CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-6 gap-4 pt-6"
            >
              <div className="col-span-1"></div>
              {allLoanProducts.map((loan) => {
                const colors = colorClasses[loan.color];
                return (
                  <motion.button
                    key={loan.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onLoanSelect(loan)}
                    className={`py-4 px-6 rounded-xl font-bold transition-all duration-200 ${
                      isDark
                        ? `${colors.dark} hover:opacity-90 text-white`
                        : `${colors.light} hover:opacity-90 text-white`
                    } shadow-lg`}
                  >
                    {t('common', 'chooseLoan') || 'Choisir'}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Mobile Comparison - Stacked */}
        <div className="mt-12 lg:hidden space-y-6">
          {allLoanProducts.map((loan, index) => {
            const colors = colorClasses[loan.color];
            return (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    isDark ? colors.bgDark : colors.bgLight
                  }`}>
                    {loan.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('loans', loan.title) || loan.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('loans', loan.subtitle) || loan.subtitle}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Montant</span>
                    <span className={`font-semibold ${isDark ? colors.textDark : colors.textLight}`}>
                      {t('loans', loan.amount) || loan.amount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Taux</span>
                    <span className={`font-semibold ${isDark ? colors.textDark : colors.textLight}`}>
                      {t('loans', loan.interestRate) || loan.interestRate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Durée</span>
                    <span className={`font-semibold ${isDark ? colors.textDark : colors.textLight}`}>
                      {t('loans', loan.term) || loan.term}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Délai</span>
                    <span className={`font-semibold ${isDark ? colors.textDark : colors.textLight}`}>
                      {loan.speed}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onLoanSelect(loan)}
                  className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${
                    isDark
                      ? `${colors.dark} hover:opacity-90 text-white`
                      : `${colors.light} hover:opacity-90 text-white`
                  }`}
                >
                  {t('common', 'chooseLoan') || 'Choisir ce prêt'}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};