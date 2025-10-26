'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/client'
import { useDarkMode } from '@/components/shared/DarkModeProvider'

const certifications = [
  {
    id: 1,
    name: "Licence d'Établissement de Crédit",
    issuer: "Banque Centrale du Congo",
    year: "2022",
    validity: "Valide",
    description: "Agrément officiel pour exercer les activités de microfinance",
    badge: "🏛️"
  },
  {
    id: 2,
    name: "Certification de Sécurité des Données",
    issuer: "AFRC Standards",
    year: "2023",
    validity: "Valide",
    description: "Conformité aux normes de protection des données clients",
    badge: "🔒"
  },
  {
    id: 3,
    name: "Membre de l'Association des Microfinances",
    issuer: "AMC",
    year: "2022",
    validity: "Actif",
    description: "Membre actif de l'Association des Microfinances du Congo",
    badge: "🤝"
  },
  {
    id: 4,
    name: "Certification des Pratiques Éthiques",
    issuer: "Ethics in Finance",
    year: "2023",
    validity: "Valide",
    description: "Engagement envers des pratiques commerciales éthiques et transparentes",
    badge: "⭐"
  },
  {
    id: 5,
    name: "Norme de Qualité de Service",
    issuer: "Service Excellence Africa",
    year: "2023",
    validity: "Valide",
    description: "Reconnaissance de l'excellence dans le service client",
    badge: "🎯"
  },
  {
    id: 6,
    name: "Certificat de Conformité Fiscale",
    issuer: "DGI",
    year: "2024",
    validity: "Valide",
    description: "Conformité totale aux obligations fiscales et réglementaires",
    badge: "📊"
  }
]

const complianceAreas = [
  {
    area: "Protection des Données",
    status: "Conforme",
    description: "Respect du RGPD et des lois locales sur la protection des données"
  },
  {
    area: "Lutte contre le Blanchiment",
    status: "Conforme", 
    description: "Procédures KYC et AML rigoureusement appliquées"
  },
  {
    area: "Transparence des Frais",
    status: "Conforme",
    description: "Information claire et complète sur tous les frais et charges"
  },
  {
    area: "Éthique Commerciale",
    status: "Conforme",
    description: "Pratiques commerciales équitables et responsables"
  }
]

export function CertificationsCompliance() {
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
              {t('about', 'certifications.badge') || "Conformité & Certifications"}
            </span>
          </motion.div>

          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('about', 'certifications.title') || "Certifications & Conformité"}
          </h2>
          
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t('about', 'certifications.description') || "Notre engagement envers l'excellence, la sécurité et la conformité réglementaire"}
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' 
                  : 'bg-white/80 border-gray-200 hover:bg-white'
              }`}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-3xl">{cert.badge}</div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {cert.name}
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {cert.issuer}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      cert.validity === 'Valide' || cert.validity === 'Actif'
                        ? isDark ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-600'
                        : isDark ? 'bg-yellow-900 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {cert.validity}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {cert.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compliance Areas */}
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
              {t('about', 'certifications.complianceTitle') || "Domaines de Conformité"}
            </h3>
            <p className={`text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t('about', 'certifications.complianceDescription') || "Notre engagement envers les normes les plus strictes"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceAreas.map((area, index) => (
              <motion.div
                key={area.area}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl backdrop-blur-sm border ${
                  isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {area.area}
                  </h4>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    isDark ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-600'
                  }`}>
                    {area.status}
                  </span>
                </div>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <div className={`p-8 rounded-3xl ${
            isDark ? 'bg-gradient-to-r from-blue-900/30 to-green-900/30' : 'bg-gradient-to-r from-blue-50 to-green-50'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('about', 'certifications.trustTitle') || "Votre Confiance, Notre Priorité"}
            </h3>
            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t('about', 'certifications.trustText') || "Toutes nos certifications et notre engagement envers la conformité visent un seul objectif : mériter et préserver votre confiance. Nous maintenons les normes les plus élevées pour garantir la sécurité de vos données et la transparence de nos services."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}