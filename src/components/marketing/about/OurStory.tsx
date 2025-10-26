'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/client'
import { useDarkMode } from '@/components/shared/DarkModeProvider'

const timelineData = [
  { 
    year: "2020", 
    title: "Fondation", 
    description: "Création de Vision Business avec une vision claire", 
    milestone: "Premiers clients",
    icon: "🚀"
  },
  { 
    year: "2021", 
    title: "Croissance", 
    description: "Atteinte des 1,000 premiers clients", 
    milestone: "Équipe de 10 personnes",
    icon: "📈"
  },
  { 
    year: "2022", 
    title: "Innovation", 
    description: "Lancement de notre plateforme digitale", 
    milestone: "Approbation réglementaire",
    icon: "💡"
  },
  { 
    year: "2023", 
    title: "Expansion", 
    description: "Dépassement de 5,000 clients servis", 
    milestone: "2M+ FCFA débloqués",
    icon: "🌍"
  },
  { 
    year: "2024", 
    title: "Vision", 
    description: "Plan d'expansion régionale", 
    milestone: "Nouveaux produits",
    icon: "🎯"
  }
]

export function OurStory() {
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
              {t('about', 'story.badge') || "Notre Parcours"}
            </span>
          </motion.div>

          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('about', 'story.title') || "Notre Histoire"}
          </h2>
          
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t('about', 'story.description') || "Découvrez comment Vision Business est devenu un leader de la microfinance en Afrique"}
          </p>
        </motion.div>

        {/* Timeline - Mobile Vertical */}
        <div className="lg:hidden space-y-8 max-w-2xl mx-auto">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                  isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`text-2xl font-bold ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {item.year}
                    </span>
                    <div className={`h-1 w-8 ${
                      isDark ? 'bg-gray-600' : 'bg-gray-300'
                    }`} />
                    <h3 className={`text-lg font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className={`mb-3 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                  <div className={`text-sm px-3 py-1 rounded-full inline-block ${
                    isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {item.milestone}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline - Desktop Horizontal */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className={`absolute left-0 right-0 top-1/2 h-1 ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            }`} />

            {/* Timeline items */}
            <div className="relative flex justify-between">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center w-48"
                >
                  {/* Year marker */}
                  <div className={`w-4 h-4 rounded-full mb-4 ${
                    isDark ? 'bg-blue-500' : 'bg-blue-600'
                  }`} />

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4 ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className={`p-4 rounded-xl backdrop-blur-sm border ${
                    isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
                  }`}>
                    <span className={`text-lg font-bold block mb-1 ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {item.year}
                    </span>
                    <h3 className={`font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm mb-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {item.milestone}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Founding Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-20"
        >
          <div className={`p-8 rounded-3xl backdrop-blur-sm border ${
            isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
          }`}>
            <div className="text-center">
              <h3 className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('about', 'story.foundingTitle') || "Notre Mission Fondatrice"}
              </h3>
              <p className={`text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('about', 'story.foundingText') || "Vision Business est né de la conviction que chaque entrepreneur mérite une chance de réussir. Notre fondateur, après avoir constaté les difficultés d'accès au financement pour les petites entreprises, a créé une institution qui combine innovation technologique et expertise financière pour démocratiser l'accès au capital."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}