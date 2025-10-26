'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/client'
import { useDarkMode } from '@/components/shared/DarkModeProvider'

const values = [
  {
    icon: "🔍",
    title: "Transparence Totale",
    description: "Des conditions claires, sans frais cachés"
  },
  {
    icon: "💡",
    title: "Innovation Continue",
    description: "Solutions technologiques avant-gardistes"
  },
  {
    icon: "🌍",
    title: "Impact Social",
    description: "Contribuer au développement économique local"
  },
  {
    icon: "🛡️",
    title: "Sécurité Maximale",
    description: "Protection des données et transactions"
  },
  {
    icon: "🤝",
    title: "Accessibilité",
    description: "Services accessibles à tous les entrepreneurs"
  },
  {
    icon: "⭐",
    title: "Excellence",
    description: "Qualité de service exceptionnelle"
  }
]

export function MissionValues() {
  const { isDark } = useDarkMode()
  const { t } = useTranslation()

  return (
    <section className={`py-20 lg:py-28 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              {t('about', 'about.mission.badge') || "Nos Principes"}
            </span>
          </motion.div>

          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('about', 'about.mission.title') || "Mission & Valeurs"}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t('about', 'about.mission.description') || "Les principes qui guident chaque décision et action chez Vision Business"}
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className={`p-8 rounded-3xl backdrop-blur-sm border-2 ${
            isDark ? 'bg-gray-700/50 border-blue-500/20' : 'bg-white/80 border-blue-500/20'
          }`}>
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('about', 'about.mission.missionTitle') || "Notre Mission"}
              </h3>
              <p className={`text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('about', 'about.mission.missionText') || "Donner aux entrepreneurs et petites entreprises les moyens financiers et les outils nécessaires pour réaliser leur plein potentiel, en offrant des solutions de financement accessibles, transparentes et innovantes."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                isDark 
                  ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50' 
                  : 'bg-white/80 border-gray-200 hover:bg-white'
              }`}
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className={`text-xl font-bold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {value.title}
              </h3>
              <p className={`leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <div className={`p-8 rounded-3xl ${
            isDark ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30' : 'bg-gradient-to-r from-blue-50 to-purple-50'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('about', 'about.mission.philosophyTitle') || "Notre Philosophie"}
            </h3>
            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t('about', 'about.mission.philosophyText') || "Nous croyons que la réussite des entrepreneurs est la clé du développement économique. En combinant expertise financière et innovation technologique, nous créons un écosystème où chaque vision d'entreprise peut devenir réalité."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}