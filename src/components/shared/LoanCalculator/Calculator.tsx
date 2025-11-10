'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

interface CalculatorResult {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  amortization: {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}

interface LoanType {
  id: string;
  rate: number;
}

export const Calculator: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();

  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(24);
  const [loanType, setLoanType] = useState<string>('personal');

  // Helper function for calculator translations
  const getCalculatorTranslation = (key: string, fallback: string) => {
    const translation = t('prets', key);
    return translation && translation !== key ? translation : fallback;
  };

  // Helper function for loan type translations
  const getLoanTypeTranslation = (loanType: string) => {
    const translationKey = `filters.${loanType}`;
    const translation = t('prets', translationKey);
    return translation && translation !== translationKey ? translation : loanType;
  };

  const loanTypes: LoanType[] = [
    { id: 'student', rate: 6.5 },
    { id: 'business', rate: 7.0 },
    { id: 'personal', rate: 8.5 },
    { id: 'emergency', rate: 12.0 },
    { id: 'equipment', rate: 7.5 },
    { id: 'housing', rate: 5.5 },
    { id: 'agriculture', rate: 5.0 },
    { id: 'auto', rate: 8.0 },
    { id: 'education', rate: 6.0 },
    { id: 'health', rate: 7.0 },
    { id: 'women', rate: 6.5 },
    { id: 'cashflow', rate: 9.0 },
    { id: 'startup', rate: 8.0 },
    { id: 'growth', rate: 7.5 }
  ];

  const calculateLoan = (): CalculatorResult => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    
    const monthlyPayment = 
      loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - loanAmount;

    // Calculate amortization schedule
    const amortization = [];
    let balance = loanAmount;
    
    for (let month = 1; month <= numberOfPayments; month++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      balance -= principal;

      amortization.push({
        month,
        payment: monthlyPayment,
        principal,
        interest,
        balance: Math.max(0, balance)
      });
    }

    return {
      monthlyPayment,
      totalInterest,
      totalAmount,
      amortization
    };
  };

  const results = useMemo(() => calculateLoan(), [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleLoanTypeChange = (type: string) => {
    setLoanType(type);
    const selectedType = loanTypes.find(lt => lt.id === type);
    if (selectedType) {
      setInterestRate(selectedType.rate);
    }
  };

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
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {getCalculatorTranslation('calculator.title', 'Simulateur de Prêt')}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {getCalculatorTranslation('calculator.subtitle', 'Calculez vos mensualités et visualisez votre plan de remboursement')}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getCalculatorTranslation('calculator.parameters', 'Paramètres du prêt')}
              </h3>

              {/* Loan Type Selection */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getCalculatorTranslation('calculator.loanType', 'Type de prêt')}
                </label>
                <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {loanTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleLoanTypeChange(type.id)}
                      className={`p-3 rounded-xl text-center transition-all duration-200 border-2 ${
                        loanType === type.id
                          ? isDark
                            ? 'border-blue-500 bg-blue-500/20 text-white'
                            : 'border-blue-500 bg-blue-50 text-blue-700'
                          : isDark
                          ? 'border-gray-700 bg-gray-700/50 text-gray-300 hover:border-gray-600'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-sm">{getLoanTypeTranslation(type.id)}</div>
                      <div className="text-xs opacity-75">{type.rate}%</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Amount */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getCalculatorTranslation('calculator.amount', 'Montant du prêt')}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      $500,00
                    </span>
                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {formatCurrency(loanAmount)}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      $100,000
                    </span>
                  </div>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getCalculatorTranslation('calculator.interestRate', 'Taux d\'intérêt')}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      1%
                    </span>
                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {interestRate}%
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      20%
                    </span>
                  </div>
                </div>
              </div>

              {/* Loan Term */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getCalculatorTranslation('calculator.term', 'Durée du prêt')}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="6"
                    max="84"
                    step="6"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getCalculatorTranslation('calculator.months', '6 mois')}
                    </span>
                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {loanTerm} {getCalculatorTranslation('calculator.monthsShort', 'mois')}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getCalculatorTranslation('calculator.years', '7 ans')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getCalculatorTranslation('calculator.results', 'Résultats de la simulation')}
              </h3>

              {/* Key Results */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className={`p-6 rounded-xl text-center ${
                  isDark ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <p className={`text-sm mb-2 ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                    {getCalculatorTranslation('calculator.monthlyPayment', 'Mensualité')}
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(results.monthlyPayment)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl text-center ${
                    isDark ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getCalculatorTranslation('calculator.totalInterest', 'Intérêts totaux')}
                    </p>
                    <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {formatCurrency(results.totalInterest)}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl text-center ${
                    isDark ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getCalculatorTranslation('calculator.totalAmount', 'Total à rembourser')}
                    </p>
                    <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {formatCurrency(results.totalAmount)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amortization Preview */}
              <div>
                <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {getCalculatorTranslation('calculator.amortization', 'Aperçu du tableau d\'amortissement')}
                </h4>
                <div className={`rounded-xl border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                } overflow-hidden`}>
                  <div className={`grid grid-cols-4 text-sm font-medium ${
                    isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    <div className="p-3">{getCalculatorTranslation('calculator.month', 'Mois')}</div>
                    <div className="p-3">{getCalculatorTranslation('calculator.principal', 'Principal')}</div>
                    <div className="p-3">{getCalculatorTranslation('calculator.interest', 'Intérêts')}</div>
                    <div className="p-3">{getCalculatorTranslation('calculator.balance', 'Solde')}</div>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {results.amortization.slice(0, 12).map((month) => (
                      <div
                        key={month.month}
                        className={`grid grid-cols-4 text-sm border-b ${
                          isDark ? 'border-gray-700' : 'border-gray-200'
                        } ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        <div className="p-3">{month.month}</div>
                        <div className="p-3">{formatCurrency(month.principal)}</div>
                        <div className="p-3">{formatCurrency(month.interest)}</div>
                        <div className="p-3">{formatCurrency(month.balance)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg ${
                    isDark
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  } transition-all duration-200`}
                >
                  {getCalculatorTranslation('calculator.applyNow', 'Demander ce prêt')}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};