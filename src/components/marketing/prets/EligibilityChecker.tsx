'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import { LoanProduct } from './types';
import { allLoanProducts } from './loanData';
import { colorClasses } from './loanData';
import Link from 'next/link';

interface EligibilityCheckerProps {
  onLoanRecommend: (loan: LoanProduct) => void;
}

type Answer = 'yes' | 'no' | '';

interface Question {
  id: string;
  text: string;
  key: string;
  options: {
    yes: { text: string; points: number };
    no: { text: string; points: number };
  };
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({ onLoanRecommend }) => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendedLoans, setRecommendedLoans] = useState<LoanProduct[]>([]);

  // Helper function to get eligibility translations
  const getEligibilityTranslation = (key: string, fallback: string) => {
    const translation = t('prets', key);
    return translation && translation !== key ? translation : fallback;
  };

  // Add this helper function near your other helper function
const getLoanTranslation = (loan: LoanProduct, field: string) => {
  const loanType = loan.id.split('-')[0]; // 'personal-loan' -> 'personal'
  const translationKey = `products.${loanType}.${field}`;
  const translation = t('loans', translationKey);
  return translation && translation !== translationKey ? translation : loan[field as keyof typeof loan];
};

  const questions: Question[] = [
    {
      id: 'business-type',
      text: 'eligibility.questions.0.text',
      key: 'businessType',
      options: {
        yes: { text: 'eligibility.answers.entrepreneur', points: 10 },
        no: { text: 'eligibility.answers.particulier', points: 5 }
      }
    },
    {
      id: 'business-age', 
      text: 'eligibility.questions.1.text',
      key: 'businessAge',
      options: {
        yes: { text: 'eligibility.answers.plus2ans', points: 8 },
        no: { text: 'eligibility.answers.moins2ans', points: 6 }
      }
    },
    {
      id: 'revenue',
      text: 'eligibility.questions.2.text', 
      key: 'revenue',
      options: {
        yes: { text: 'eligibility.answers.stable', points: 9 },
        no: { text: 'eligibility.answers.irregular', points: 4 }
      }
    },
    {
      id: 'loan-purpose',
      text: 'eligibility.questions.3.text',
      key: 'loanPurpose', 
      options: {
        yes: { text: 'eligibility.answers.equipment', points: 7 },
        no: { text: 'eligibility.answers.cashflow', points: 6 }
      }
    },
    {
      id: 'urgency',
      text: 'eligibility.questions.4.text',
      key: 'urgency',
      options: {
        yes: { text: 'eligibility.answers.urgent', points: 8 },
        no: { text: 'eligibility.answers.planning', points: 5 }
      }
    }
  ];

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (userAnswers: Answer[]) => {
    let totalScore = 0;
    
    userAnswers.forEach((answer, index) => {
      if (answer === 'yes') {
        totalScore += questions[index].options.yes.points;
      } else if (answer === 'no') {
        totalScore += questions[index].options.no.points;
      }
    });

    let recommended: LoanProduct[] = [];
    
    if (totalScore >= 40) {
      recommended = allLoanProducts.filter(loan => 
        ['growth-loan', 'equipment-loan', 'cashflow-loan'].includes(loan.id)
      );
    } else if (totalScore >= 30) {
      recommended = allLoanProducts.filter(loan =>
        ['startup-loan', 'equipment-loan', 'women-loan'].includes(loan.id)
      );
    } else if (totalScore >= 20) {
      recommended = allLoanProducts.filter(loan =>
        ['personal-loan', 'emergency-loan', 'education-loan'].includes(loan.id)
      );
    } else {
      recommended = allLoanProducts.filter(loan =>
        ['student-loan', 'personal-loan'].includes(loan.id)
      );
    }

    setRecommendedLoans(recommended);
    setShowResults(true);
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
    setRecommendedLoans([]);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

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
            {getEligibilityTranslation('eligibility.title', 'Vérifiez votre éligibilité')}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {getEligibilityTranslation('eligibility.subtitle', 'Répondez à 5 questions pour découvrir les prêts adaptés à votre profil')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {getEligibilityTranslation('eligibility.progress', 'Question {{current}} sur {{total}}')
                    .replace('{{current}}', (currentStep + 1).toString())
                    .replace('{{total}}', questions.length.toString())
                  }
                </span>
                <span className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {Math.round(progress)}%
                </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={`question-${currentStep}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {getEligibilityTranslation(questions[currentStep].text, "Quel est votre profil principal ?")}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer('yes')}
                    className={`p-6 rounded-xl text-left transition-all duration-200 border-2 ${
                      isDark
                        ? 'bg-gray-700 border-blue-500 hover:bg-blue-500/20 text-white'
                        : 'bg-blue-50 border-blue-500 hover:bg-blue-100 text-gray-900'
                    }`}
                  >
                    <div className="text-lg font-semibold mb-2">✅</div>
                    <div className="font-semibold mb-1">
                      {getEligibilityTranslation(questions[currentStep].options.yes.text, "Entrepreneur/Chef d'entreprise")}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {getEligibilityTranslation('eligibility.answers.explanation.yes', "Choisissez cette option si elle correspond à votre situation")}
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer('no')}
                    className={`p-6 rounded-xl text-left transition-all duration-200 border-2 ${
                      isDark
                        ? 'bg-gray-700 border-purple-500 hover:bg-purple-500/20 text-white'
                        : 'bg-purple-50 border-purple-500 hover:bg-purple-100 text-gray-900'
                    }`}
                  >
                    <div className="text-lg font-semibold mb-2">❌</div>
                    <div className="font-semibold mb-1">
                      {getEligibilityTranslation(questions[currentStep].options.no.text, "Particulier/Freelance")}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {getEligibilityTranslation('eligibility.answers.explanation.no', "Choisissez cette option si elle ne correspond pas à votre situation")}
                    </div>
                  </motion.button>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 0}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      currentStep === 0
                        ? 'opacity-50 cursor-not-allowed'
                        : isDark
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    ← {getEligibilityTranslation('eligibility.previous', 'Précédent')}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restartQuiz}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      isDark
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {getEligibilityTranslation('eligibility.restart', 'Recommencer')}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {getEligibilityTranslation('eligibility.results.title', 'Prêts recommandés pour vous')}
                  </h3>
                  <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {getEligibilityTranslation('eligibility.results.subtitle', `Basé sur vos réponses, nous avons sélectionné ${recommendedLoans.length} prêts adaptés à votre profil`)
                      .replace('{{count}}', recommendedLoans.length.toString())
                    }
                  </p>
                </div>

                {/* Recommended Loans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {recommendedLoans.map((loan, index) => {
                    const colors = colorClasses[loan.color];
                    return (
                      <motion.div
                        key={loan.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`p-6 rounded-xl border-2 ${
                          isDark 
                            ? `${colors.borderDark} bg-gray-700/50` 
                            : `${colors.borderLight} bg-gray-50`
                        }`}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                            isDark ? colors.bgDark : colors.bgLight
                          }`}>
                            {loan.icon}
                          </div>
                          <div>
                            <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                               {String(getLoanTranslation(loan, 'title'))}
                            </h4>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {String(getLoanTranslation(loan, 'subtitle'))}
                            </p>
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onLoanRecommend(loan)}
                          className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${
                            isDark
                              ? `${colors.dark} hover:opacity-90 text-white`
                              : `${colors.light} hover:opacity-90 text-white`
                          }`}
                        >
                          {getEligibilityTranslation('eligibility.results.apply', 'Découvrir ce prêt')}
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restartQuiz}
                    className={`px-8 py-4 rounded-xl font-bold transition-all duration-200 ${
                      isDark
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {getEligibilityTranslation('eligibility.results.restart', 'Refaire le test')}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};