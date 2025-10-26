'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/client'
import { useDarkMode } from '@/components/shared/DarkModeProvider'

const cultureValues = [
  {
    id: 1,
    title: "Collaboration & Équipe",
    description: "Nous croyons en la force du travail d'équipe et de la collaboration inter-départements.",
    icon: "👥",
    practices: ["Réunions hebdomadaires", "Projets transversaux", "Feedback continu"]
  },
  {
    id: 2,
    title: "Innovation Continue",
    description: "Encourager la créativité et l'expérimentation pour toujours améliorer nos services.",
    icon: "💡",
    practices: ["Hackathons internes", "Formations régulières", "Budget innovation"]
  },
  {
    id: 3,
    title: "Bien-être au Travail",
    description: "Prendre soin de nos employés pour qu'ils puissent donner le meilleur d'eux-mêmes.",
    icon: "❤️",
    practices: ["Horaires flexibles", "Télétravail", "Programme de bien-être"]
  },
  {
    id: 4,
    title: "Apprentissage Permanent",
    description: "Investir dans le développement professionnel et personnel de chaque membre de l'équipe.",
    icon: "🎓",
    practices: ["Formations certifiantes", "Mentorat", "Conférences"]
  }
]

const employeeTestimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Responsable Clientèle",
    testimonial: "Chez Vision Business, on nous donne les outils et l'autonomie pour vraiment faire la différence dans la vie de nos clients.",
    avatar: "SM"
  },
  {
    id: 2,
    name: "Patrick L.",
    role: "Développeur",
    testimonial: "L'environnement de travail est incroyablement stimulant. On nous encourage à innover et à proposer de nouvelles idées.",
    avatar: "PL"
  },
  {
    id: 3,
    name: "Julie T.",
    role: "Marketing",
    testimonial: "Ce qui me motive chaque jour, c'est de voir l'impact concret de notre travail sur la communauté entrepreneuriale.",
    avatar: "JT"
  }
]

export function CompanyCulture() {
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
              {t('about', 'about.culture.badge') || "Notre Culture"}
            </span>
          </motion.div>

          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('about', 'about.culture.title') || "Culture d'Entreprise"}
          </h2>
          
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t('about', 'about.culture.description') || "Un environnement où la passion, l'innovation et le bien-être se rencontrent"}
          </p>
        </motion.div>

        {/* Culture Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {cultureValues.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50' 
                  : 'bg-white/80 border-gray-200 hover:bg-white'
              }`}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                  isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}>
                  {value.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {value.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {value.description}
                  </p>
                </div>
              </div>

              {/* Practices */}
              <div className="flex flex-wrap gap-2 mt-4">
                {value.practices.map((practice, practiceIndex) => (
                  <span
                    key={practiceIndex}
                    className={`text-xs px-3 py-1 rounded-full ${
                      isDark 
                        ? 'bg-gray-600 text-gray-300' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {practice}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Employee Testimonials */}
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
              {t('about', 'about.culture.testimonialsTitle') || "Témoignages de Notre Équipe"}
            </h3>
            <p className={`text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t('about', 'about.culture.testimonialsDescription') || "Ce que nos collaborateurs disent de leur expérience"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {employeeTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl backdrop-blur-sm border ${
                  isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-white/80 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                    isDark ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className={`font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                <p className={`text-sm italic leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  "{testimonial.testimonial}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
