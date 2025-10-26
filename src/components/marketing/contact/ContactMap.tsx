'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/client'
import { useDarkMode } from '@/components/shared/DarkModeProvider'

export function ContactMap() {
  const { isDark } = useDarkMode()
  const { t } = useTranslation()

  return (
    <section className={`py-16 lg:py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('contact', 'map.title') || "Notre Localisation"}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t('contact', 'map.subtitle') || "Venez nous rencontrer dans nos bureaux au cœur de Gombe, Kinshasa"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Google Maps Embed */}
          <div className={`rounded-3xl overflow-hidden shadow-2xl border-2 ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="relative h-96 lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.065258823808!2d15.300469315734955!3d-4.321879796700289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a33934e3b4f3f%3A0x5c5b5c5b5c5b5c5b!2sGombe%2C%20Kinshasa%2C%20R%C3%A9publique%20D%C3%A9mocratique%20du%20Congo!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vision Business Microfinance Location - Kinshasa, RDC"
                className="absolute inset-0"
              />
              
              {/* Map Overlay Info */}
              <div className={`absolute top-4 left-4 p-6 rounded-2xl backdrop-blur-sm border max-w-xs ${
                isDark ? 'bg-gray-900/80 border-gray-700' : 'bg-white/90 border-gray-200'
              }`}>
                <h3 className={`font-bold text-lg mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Vision Business Microfinance
                </h3>
                <p className={`text-sm mb-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Gombe, Kinshasa<br />
                  République Démocratique du Congo
                </p>
                <div className={`text-xs ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  📍 {t('contact', 'map.directions') || "Au cœur du quartier d'affaires de Gombe"}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Location Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            {[
              {
                icon: "🕒",
                title: "hours",
                content: "Lundi - Vendredi\n8h00 - 18h00\nSamedi: 9h00 - 13h00"
              },
              {
                icon: "🚗", 
                title: "parking",
                content: "Parking sécurisé\nDisponible dans l'immeuble"
              },
              {
                icon: "♿",
                title: "accessibility", 
                content: "Accès handicapé\nAscenseur disponible"
              }
            ].map((item, index) => (
              <div
                key={item.title}
                className={`p-4 rounded-2xl text-center backdrop-blur-sm border ${
                  isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-white/80 border-gray-200'
                }`}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className={`font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('contact', `map.${item.title}`) || item.title}
                </h4>
                <p className={`text-sm whitespace-pre-line ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {item.content}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}