'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/client'
import { useDarkMode } from '@/components/shared/DarkModeProvider'
import Image from 'next/image'

const teamMembers = [
  {
    id: 1,
    name: "David Kabasele",
    role: "Fondateur & CEO",
    bio: "Visionnaire avec 10+ ans d'expérience en finance et technologie. Passionné par l'innovation financière en Afrique.",
    image: "/images/team/ceo.jpg",
    social: {
      linkedin: "#",
      twitter: "#"
    },
    expertise: ["Finance", "Stratégie", "Innovation"]
  },
  {
    id: 2,
    name: "Sarah Mukendi",
    role: "Directrice Financière",
    bio: "Expert-comptable avec 8 ans d'expérience dans la microfinance. Spécialiste en gestion des risques.",
    image: "/images/team/cfo.jpg",
    social: {
      linkedin: "#",
      twitter: "#"
    },
    expertise: ["Comptabilité", "Risques", "Analyse"]
  },
  {
    id: 3,
    name: "Patrick Lumumba",
    role: "Responsable des Opérations",
    bio: "Gestionnaire d'opérations avec 7 ans d'expérience. Expert en optimisation des processus.",
    image: "/images/team/operations.jpg",
    social: {
      linkedin: "#",
      twitter: "#"
    },
    expertise: ["Opérations", "Processus", "Logistique"]
  },
  {
    id: 4,
    name: "Marie Ngalula",
    role: "Directrice Clientèle",
    bio: "Spécialiste en relations clients avec 6 ans d'expérience. Passionnée par la satisfaction client.",
    image: "/images/team/customer.jpg",
    social: {
      linkedin: "#",
      twitter: "#"
    },
    expertise: ["Service Client", "Support", "Expérience"]
  },
  {
    id: 5,
    name: "Eric Mbuyi",
    role: "Responsable Technologie",
    bio: "Ingénieur en informatique avec 8 ans d'expérience. Expert en développement de plateformes digitales.",
    image: "/images/team/tech.jpg",
    social: {
      linkedin: "#",
      twitter: "#"
    },
    expertise: ["Technologie", "Développement", "Sécurité"]
  },
  {
    id: 6,
    name: "Julie Tshibangu",
    role: "Responsable Marketing",
    bio: "Marketeuse digitale avec 5 ans d'expérience. Spécialiste en croissance et acquisition clients.",
    image: "/images/team/marketing.jpg",
    social: {
      linkedin: "#",
      twitter: "#"
    },
    expertise: ["Marketing", "Croissance", "Digital"]
  }
]

export function LeadershipTeam() {
  const { isDark } = useDarkMode()
  const { t } = useTranslation()

  return (
    <section id="leadership" className={`py-20 lg:py-28 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
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
              {t('about', 'about.leadership.badge') || "Notre Équipe"}
            </span>
          </motion.div>

          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('about', 'about.leadership.title') || "Rencontrez Notre Équipe"}
          </h2>
          
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t('about', 'about.leadership.description') || "Des experts passionnés dédiés à votre réussite financière"}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group relative rounded-3xl overflow-hidden backdrop-blur-sm border transition-all duration-500 ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' 
                  : 'bg-white/80 border-gray-200 hover:bg-white'
              }`}
            >
              {/* Member Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Social Links */}
                <div className="absolute bottom-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href={member.social.linkedin}
                    className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                      isDark ? 'bg-gray-800/80 hover:bg-blue-600' : 'bg-white/80 hover:bg-blue-600'
                    }`}
                  >
                    <span className={`text-sm font-semibold ${
                      isDark ? 'text-white group-hover:text-white' : 'text-gray-700 group-hover:text-white'
                    }`}>
                      in
                    </span>
                  </a>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {member.name}
                </h3>
                
                <p className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {member.role}
                </p>
                
                <p className={`text-sm mb-4 leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {member.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`text-xs px-3 py-1 rounded-full ${
                        isDark 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDark ? 'border-blue-500' : 'border-blue-400'
              }`} />
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className={`p-8 rounded-3xl backdrop-blur-sm border ${
            isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
          }`}>
            <div className="text-center">
              <h3 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('about', 'about.leadership.statsTitle') || "Notre Force Collective"}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    15+
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {t('about', 'about.leadership.experience') || "Ans d'expérience"}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    6
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {t('about', 'about.leadership.departments') || "Départements"}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}>
                    98%
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {t('about', 'about.leadership.satisfaction') || "Satisfaction client"}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    isDark ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>
                    24/7
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {t('about', 'about.leadership.support') || "Support disponible"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}