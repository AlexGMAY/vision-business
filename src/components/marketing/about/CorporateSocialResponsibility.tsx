'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/client'
import { useDarkMode } from '@/components/shared/DarkModeProvider'

const csrInitiatives = [
  {
    id: 1,
    title: "Éducation Financière",
    description: "Programmes de formation gratuits pour les entrepreneurs sur la gestion financière et le développement d'entreprise.",
    icon: "📚",
    impact: "500+ entrepreneurs formés",
    image: "/images/csr/education.jpg"
  },
  {
    id: 2,
    title: "Support aux Femmes Entrepreneures",
    description: "Initiatives spécifiques pour autonomiser les femmes entrepreneures avec des conditions de prêt avantageuses.",
    icon: "👩‍💼",
    impact: "45% de nos clients sont des femmes",
    image: "/images/csr/women.jpg"
  },
  {
    id: 3,
    title: "Environnement & Développement Durable",
    description: "Promotion des entreprises vertes et soutien aux projets respectueux de l'environnement.",
    icon: "🌱",
    impact: "100+ projets verts financés",
    image: "/images/csr/environment.jpg"
  },
  {
    id: 4,
    title: "Partnerships Communautaires",
    description: "Collaboration avec les associations locales pour un impact social maximal dans nos communautés.",
    icon: "🤝",
    impact: "12 partenariats actifs",
    image: "/images/csr/community.jpg"
  }
]

export function CorporateSocialResponsibility() {
  const { isDark } = useDarkMode()
  const { t } = useTranslation()

  return (
    <section className={`py-20 lg:py-28 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
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
              {t('about', 'csr.badge') || "Impact Social"}
            </span>
          </motion.div>

          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('about', 'csr.title') || "Responsabilité Sociale"}
          </h2>
          
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t('about', 'csr.description') || "Nous croyons que le succès financier doit bénéficier à toute la communauté"}
          </p>
        </motion.div>

        {/* CSR Initiatives Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {csrInitiatives.map((initiative, index) => (
            <motion.div
              key={initiative.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group rounded-3xl overflow-hidden backdrop-blur-sm border transition-all duration-500 ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' 
                  : 'bg-white/80 border-gray-200 hover:bg-white'
              }`}
            >
              <div className="p-8">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                    isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {initiative.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {initiative.title}
                    </h3>
                    <p className={`leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {initiative.description}
                    </p>
                  </div>
                </div>

                <div className={`mt-4 p-4 rounded-xl ${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'
                }`}>
                  <span className={`text-sm font-semibold ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}>
                    {initiative.impact}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className={`p-8 rounded-3xl text-center ${
            isDark ? 'bg-gradient-to-r from-green-900/30 to-blue-900/30' : 'bg-gradient-to-r from-green-50 to-blue-50'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('about', 'csr.impactTitle') || "Notre Impact Communautaire"}
            </h3>
            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t('about', 'csr.impactText') || "Chaque prêt accordé représente une opportunité de créer des emplois, de stimuler l'économie locale et de construire un avenir meilleur pour nos communautés. Nous mesurons notre succès non seulement en chiffres, mais aussi en vies transformées."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}