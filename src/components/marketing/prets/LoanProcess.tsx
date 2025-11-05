'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import Link from 'next/link'

export const LoanProcess: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();

  const steps = [
    {
      step: 1,
      titleKey: 'process.step1.title',
      descriptionKey: 'process.step1.description',
      duration: '24h',
      icon: '📝'
    },
    {
      step: 2,
      titleKey: 'process.step2.title',
      descriptionKey: 'process.step2.description',
      duration: '48h',
      icon: '🔍'
    },
    {
      step: 3,
      titleKey: 'process.step3.title',
      descriptionKey: 'process.step3.description',
      duration: '24h',
      icon: '✅'
    },
    {
      step: 4,
      titleKey: 'process.step4.title',
      descriptionKey: 'process.step4.description',
      duration: 'Immédiat',
      icon: '💰'
    }
  ];

  return (
    <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
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
            {t('prets', 'process.title') || 'Comment obtenir votre prêt'}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('prets', 'process.subtitle') || 'Un processus simple et rapide en 4 étapes seulement'}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden lg:block ${
            isDark ? 'bg-gray-700' : 'bg-gray-200'
          }`} />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex flex-col lg:flex-row items-center lg:items-start ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8`}
              >
                {/* Step Content */}
                <div className={`flex-1 lg:w-1/2 ${
                  index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
                }`}>
                  <div className={`p-8 rounded-2xl ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                  } backdrop-blur-sm border ${
                    isDark ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                        isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                      }`}>
                        {step.icon}
                      </div>
                      <div>
                        <div className={`text-sm font-semibold uppercase tracking-wide ${
                          isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {t('prets', 'process.step', { number: step.step }) || `Étape ${step.step}`}
                        </div>
                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {t('prets', step.titleKey) || 'Demande en ligne'}
                        </h3>
                      </div>
                    </div>
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                       {t('prets',step.descriptionKey) || 'Remplissez notre formulaire simplifié en 5 minutes seulement.'}
                    </p>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      ⏱️ {step.duration}
                    </div>
                  </div>
                </div>

                {/* Step Number */}
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-4 ${
                    isDark 
                      ? 'bg-gray-800 border-blue-500 text-white' 
                      : 'bg-white border-blue-500 text-gray-900'
                  }`}>
                    {step.step}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 lg:w-1/2 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className={`inline-flex flex-col gap-4 p-8 rounded-2xl ${
            isDark ? 'bg-gray-700/50' : 'bg-gray-50'
          } backdrop-blur-sm border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('prets', 'process.cta.title') || 'Prêt à démarrer ?'}
            </h3>
            <p className={`mb-4 sm:mb-0 sm:ml-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('prets', 'process.cta.description') || 'Notre équipe vous accompagne à chaque étape'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-200 ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Link href={'/application'}>{t('prets', 'process.cta.button') || 'Commencer ma demande'}</Link>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
