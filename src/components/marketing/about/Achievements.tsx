'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/client'
import { useDarkMode } from '@/components/shared/DarkModeProvider'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

const achievements = [
  {
    id: 1,
    value: 5000,
    suffix: "+",
    label: "Clients Servis",
    description: "Entrepreneurs et petites entreprises financées"
  },
  {
    id: 2,
    value: 2,
    suffix: "M+",
    label: "FCFA Débloqués",
    description: "Montant total des prêts accordés"
  },
  {
    id: 3,
    value: 98,
    suffix: "%",
    label: "Taux de Satisfaction",
    description: "Clients satisfaits de nos services"
  },
  {
    id: 4,
    value: 24,
    suffix: "-48h",
    label: "Délai de Traitement",
    description: "Décision rapide sur les demandes"
  }
]

const awards = [
  {
    id: 1,
    title: "Prix de l'Innovation Financière",
    organization: "Africa Fintech Awards",
    year: "2023",
    description: "Reconnu pour notre plateforme digitale innovante"
  },
  {
    id: 2,
    title: "Meilleure Microfinance",
    organization: "Finance Congo Awards",
    year: "2022",
    description: "Excellence dans le service client et l'impact social"
  },
  {
    id: 3,
    title: "Certification de Sécurité",
    organization: "AFRC Standards",
    year: "2023",
    description: "Normes de sécurité et conformité respectées"
  }
]

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  })

  useEffect(() => {
    if (inView) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [inView, value])

  return (
    <span ref={ref} className="font-bold">
      {count}{suffix}
    </span>
  )
}

export function Achievements() {
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
              {t('about', 'achievements.badge') || "Nos Réalisations"}
            </span>
          </motion.div>

          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('about', 'achievements.title') || "Chiffres & Reconnaissances"}
          </h2>
          
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t('about', 'achievements.description') || "Des résultats concrets qui témoignent de notre engagement envers votre réussite"}
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`text-center p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50' 
                  : 'bg-white/80 border-gray-200 hover:bg-white'
              }`}
            >
              <div className={`text-4xl md:text-5xl font-bold mb-4 ${
                index === 0 ? (isDark ? 'text-blue-400' : 'text-blue-600') :
                index === 1 ? (isDark ? 'text-purple-400' : 'text-purple-600') :
                index === 2 ? (isDark ? 'text-green-400' : 'text-green-600') :
                (isDark ? 'text-yellow-400' : 'text-yellow-600')
              }`}>
                <Counter value={achievement.value} suffix={achievement.suffix} />
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {achievement.label}
              </h3>
              
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('about', 'achievements.awardsTitle') || "Prix & Reconnaissances"}
            </h3>
            <p className={`text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t('about', 'achievements.awardsDescription') || "Notre excellence reconnue par l'industrie"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50' 
                    : 'bg-white/80 border-gray-200 hover:bg-white'
                }`}
              >
                <div className={`text-4xl mb-4 ${
                  isDark ? 'text-yellow-400' : 'text-yellow-500'
                }`}>
                  🏆
                </div>
                
                <h4 className={`text-lg font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {award.title}
                </h4>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-semibold ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {award.organization}
                  </span>
                  <span className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {award.year}
                  </span>
                </div>
                
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {award.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}