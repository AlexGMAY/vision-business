'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import Link from 'next/link';

export const LoanFAQ: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'faq.1.question',
      answer: 'faq.1.answer'
    },
    {
      question: 'faq.2.question',
      answer: 'faq.2.answer'
    },
    {
      question: 'faq.3.question',
      answer: 'faq.3.answer'
    },
    {
      question: 'faq.4.question',
      answer: 'faq.4.answer'
    },
    {
      question: 'faq.5.question',
      answer: 'faq.5.answer'
    },
    {
      question: 'faq.6.question',
      answer: 'faq.6.answer'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('prets', 'faq.title') || 'Questions fréquentes'}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('prets', 'faq.subtitle') || 'Trouvez rapidement des réponses à vos questions sur nos prêts'}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl border transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              } ${openIndex === index ? 'shadow-lg' : 'shadow-sm'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-6 py-6 text-left flex items-center justify-between transition-all duration-300 ${
                  isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                }`}
              >
                <span className={`text-lg font-semibold pr-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('prets',faq.question) || faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full ${
                    isDark ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`px-6 pb-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {t('prets',faq.answer) || faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className={`inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="text-2xl">💬</div>
            <div className="text-left">
              <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('prets', 'faq.help.title') || 'Besoin d\'aide supplémentaire ?'}
              </h4>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {t('prets', 'faq.help.description') || 'Notre équipe est là pour vous répondre'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Link href={'/contact'}>{t('prets', 'faq.help.button') || 'Nous contacter'}</Link>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};