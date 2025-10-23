"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';


export const LoanCalculator: React.FC = () => {
  // Use hooks internally instead of props
  const { isDark } = useDarkMode();
  const { t } = useTranslation();

  // Loan parameters
  const [loanAmount, setLoanAmount] = useState<number>(5000);
  const [loanTerm, setLoanTerm] = useState<number>(12);
  const [isQualified, setIsQualified] = useState<boolean | null>(null);

  // Interest rates based on term (example rates)
  const interestRates = {
    3: 0.079,  // 7.9%
    6: 0.089,  // 8.9%
    12: 0.099, // 9.9%
    18: 0.109, // 10.9%
    24: 0.119  // 11.9%
  };

  // Calculate loan details
  const loanDetails = useMemo(() => {
    const annualRate = interestRates[loanTerm as keyof typeof interestRates] || 0.099;
    const monthlyRate = annualRate / 12;
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;

    // Generate repayment schedule
    const schedule = [];
    let remainingBalance = loanAmount;
    
    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      annualRate: annualRate * 100,
      schedule
    };
  }, [loanAmount, loanTerm]);

  const handleQualificationCheck = () => {
    // Simulate qualification check
    const qualified = loanAmount <= 8000 && loanTerm <= 18;
    setIsQualified(qualified);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const loanTerms = [3, 6, 12, 18, 24];

  return (
    <section className={`relative py-20 lg:py-28 overflow-hidden ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 opacity-[0.03] ${
          isDark 
            ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500'
            : 'bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400'
        }`} />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`inline-flex items-center px-6 py-3 rounded-full backdrop-blur-sm border mb-6 ${
              isDark ? 'border-gray-700' : 'border-gray-300'
            }`}
          >
            <span className={`text-sm font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t('homepage', 'calculator.badge') || "Calculateur de prêt"}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span className="block">{t('homepage', 'calculator.title') || "Simulez votre"}</span>
            <span className={`block bg-gradient-to-r bg-clip-text text-transparent ${
              isDark 
                ? 'from-blue-400 via-purple-400 to-cyan-400'
                : 'from-blue-600 via-purple-600 to-cyan-600'
            }`}>
              {t('homepage', 'calculator.subtitle') || "prêt personnel"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className={`text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t('homepage', 'calculator.description') || "Obtenez une estimation instantanée de vos mensualités et découvrez nos solutions de financement adaptées."}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`p-8 rounded-3xl backdrop-blur-sm border-2 ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}
          >
            {/* Loan Amount Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className={`text-lg font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t('homepage', 'calculator.loanAmount') || "Montant du prêt"}
                </label>
                <span className={`text-2xl font-bold ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className={`w-full h-3 rounded-lg appearance-none cursor-pointer ${
                  isDark 
                    ? 'bg-gray-700 [&::-webkit-slider-thumb]:bg-blue-400 [&::-moz-range-thumb]:bg-blue-400'
                    : 'bg-gray-200 [&::-webkit-slider-thumb]:bg-blue-500 [&::-moz-range-thumb]:bg-blue-500'
                }`}
              />
              
              <div className="flex justify-between text-sm mt-2">
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>$100</span>
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>$10,000</span>
              </div>
            </div>

            {/* Loan Term Selector */}
            <div className="mb-8">
              <label className={`text-lg font-semibold block mb-4 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('homepage', 'calculator.loanTerm') || "Durée du prêt"}
              </label>
              
              <div className="grid grid-cols-5 gap-2">
                {loanTerms.map((term) => (
                  <button
                    key={term}
                    onClick={() => setLoanTerm(term)}
                    className={`py-3 px-4 rounded-xl text-center transition-all duration-200 ${
                      loanTerm === term
                        ? isDark 
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-semibold">{term}</div>
                    <div className="text-xs opacity-75">
                      {t('homepage', 'calculator.months') || "mois"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Display */}
            <div className={`p-4 rounded-2xl mb-6 ${
              isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'
            }`}>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {t('homepage', 'calculator.interestRate') || "Taux d'intérêt annuel"}
                </span>
                <span className={`text-lg font-bold ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`}>
                  {loanDetails.annualRate.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Qualification Check */}
            <div className="space-y-4">
              <button
                onClick={handleQualificationCheck}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-600/25'
                }`}
              >
                {t('homepage', 'calculator.checkQualification') || "Vérifier mon éligibilité"}
              </button>

              <AnimatePresence>
                {isQualified !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 rounded-2xl ${
                      isQualified
                        ? isDark ? 'bg-green-900/20 border border-green-800' : 'bg-green-100 border border-green-200'
                        : isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-100 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isQualified
                          ? isDark ? 'bg-green-500' : 'bg-green-400'
                          : isDark ? 'bg-red-500' : 'bg-red-400'
                      }`}>
                        {isQualified ? '✓' : '✗'}
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {isQualified 
                          ? t('homepage', 'calculator.qualified') || "Félicitations ! Vous êtes éligible pour ce prêt."
                          : t('homepage', 'calculator.notQualified') || "Nous avons d'autres solutions pour vous. Contactez-nous."
                        }
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Results & Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
              }`}>
                <div className={`text-sm mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {t('homepage', 'calculator.monthlyPayment') || "Mensualité"}
                </div>
                <div className={`text-2xl font-bold ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {formatCurrency(loanDetails.monthlyPayment)}
                </div>
              </div>

              <div className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
              }`}>
                <div className={`text-sm mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {t('homepage', 'calculator.totalInterest') || "Intérêts totaux"}
                </div>
                <div className={`text-2xl font-bold ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  {formatCurrency(loanDetails.totalInterest)}
                </div>
              </div>
            </div>

            {/* Repayment Schedule */}
            <div className={`rounded-2xl backdrop-blur-sm border ${
              isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
            }`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className={`text-xl font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('homepage', 'calculator.repaymentSchedule') || "Calendrier de remboursement"}
                </h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${
                      isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <th className={`text-left p-4 text-sm font-semibold ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {t('homepage', 'calculator.month') || "Mois"}
                      </th>
                      <th className={`text-right p-4 text-sm font-semibold ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {t('homepage', 'calculator.payment') || "Paiement"}
                      </th>
                      <th className={`text-right p-4 text-sm font-semibold ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {t('homepage', 'calculator.principal') || "Capital"}
                      </th>
                      <th className={`text-right p-4 text-sm font-semibold ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {t('homepage', 'calculator.interest') || "Intérêts"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanDetails.schedule.slice(0, 12).map((payment) => (
                      <tr 
                        key={payment.month}
                        className={`border-b ${
                          isDark ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <td className={`p-4 text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {payment.month}
                        </td>
                        <td className={`p-4 text-sm text-right font-semibold ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {formatCurrency(payment.payment)}
                        </td>
                        <td className={`p-4 text-sm text-right ${
                          isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {formatCurrency(payment.principal)}
                        </td>
                        <td className={`p-4 text-sm text-right ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`}>
                          {formatCurrency(payment.interest)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                isDark
                  ? 'bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white shadow-lg shadow-green-500/25'
                  : 'bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white shadow-lg shadow-green-600/25'
              }`}
            >
              {t('homepage', 'calculator.applyNow') || "Demander mon prêt maintenant"}
            </motion.button>

            {/* Disclaimer */}
            <p className={`text-center text-sm ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {t('homepage', 'calculator.disclaimer') || "* Simulation indicative. Offre soumise à conditions."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};