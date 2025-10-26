'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/client'
import { useDarkMode } from '@/components/shared/DarkModeProvider'

interface FormData {
  nom: string
  telephone: string
  email: string
  sujet: string
  message: string
}

interface FormErrors {
  nom?: string
  telephone?: string
  email?: string
  sujet?: string
  message?: string
}

export function ContactSection() {
  const { isDark } = useDarkMode()
  const { t } = useTranslation()
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    telephone: '',
    email: '',
    sujet: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  const contactInfo = [
    {
      icon: "📞",
      title: "phone",
      value: "+243 81 234 5678",
      description: "hours",
      color: "blue"
    },
    {
      icon: "📧",
      title: "email", 
      value: "contact@visionbusiness.cd",
      description: "responseTime",
      color: "green"
    },
    {
      icon: "🏢",
      title: "address",
      value: "Gombe, Kinshasa\nRépublique Démocratique du Congo",
      description: "appointment",
      color: "purple"
    }
  ]

  const socialNetworks = [
    { 
      name: "Facebook", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ), 
      url: "https://facebook.com/visionbusinesscd" 
    },
    { 
      name: "LinkedIn", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ), 
      url: "https://linkedin.com/company/visionbusiness-cd" 
    },
    { 
      name: "Twitter", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ), 
      url: "https://twitter.com/visionbusinesscd" 
    },
    { 
      name: "Instagram", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.815 3.73 13.664 3.73 12.367s.49-2.448 1.396-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
        </svg>
      ), 
      url: "https://instagram.com/visionbusinesscd" 
    }
  ]

  const subjects = [
    { value: "demande-pret", label: "loanRequest" },
    { value: "information", label: "information" },
    { value: "reclamation", label: "complaint" },
    { value: "partenariat", label: "partnership" },
    { value: "carriere", label: "career" },
    { value: "autre", label: "other" }
  ]

  const colorClasses = {
    blue: {
      light: 'bg-blue-100 text-blue-600',
      dark: 'bg-blue-900 text-blue-400'
    },
    green: {
      light: 'bg-green-100 text-green-600', 
      dark: 'bg-green-900 text-green-400'
    },
    purple: {
      light: 'bg-purple-100 text-purple-600',
      dark: 'bg-purple-900 text-purple-400'
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.nom.trim()) {
      newErrors.nom = t('contact', 'errors.nameRequired') || "Le nom est requis"
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = t('contact', 'errors.phoneRequired') || "Le téléphone est requis"
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.telephone)) {
      newErrors.telephone = t('contact', 'errors.phoneInvalid') || "Numéro de téléphone invalide"
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact', 'errors.emailRequired') || "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact', 'errors.emailInvalid') || "Email invalide"
    }

    if (!formData.sujet) {
      newErrors.sujet = t('contact', 'errors.subjectRequired') || "Veuillez choisir un sujet"
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact', 'errors.messageRequired') || "Le message est requis"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact', 'errors.messageTooShort') || "Le message doit contenir au moins 10 caractères"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi du message')
      }

      // Success
      setIsSubmitted(true)
      setFormData({
        nom: '',
        telephone: '', 
        email: '',
        sujet: '',
        message: ''
      })
      
      // Reset success message after 8 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 8000)

    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Une erreur est survenue. Veuillez réessayer.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-form" className={`py-20 lg:py-28 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('contact', 'title') || "Parlons de Votre Projet"}
              </h2>
              <p className={`text-xl mb-8 leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t('contact', 'subtitle') || "Notre équipe d'experts est prête à vous accompagner dans la réalisation de vos ambitions entrepreneuriales en RDC."}
              </p>
            </motion.div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${
                    isDark ? colorClasses[item.color as keyof typeof colorClasses].dark : colorClasses[item.color as keyof typeof colorClasses].light
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg mb-1 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t('contact', `info.${item.title}`) || item.title}
                    </h3>
                    <p className={`mb-1 whitespace-pre-line ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {item.value}
                    </p>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {t('contact', `info.${item.description}`) || item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Networks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h3 className={`font-semibold text-xl mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('contact', 'social.title') || "Suivez-Nous"}
              </h3>
              <div className="flex space-x-3">
                {socialNetworks.map((network, index) => (
                  <motion.a
                    key={network.name}
                    href={network.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isDark 
                        ? 'bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white' 
                        : 'bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white'
                    }`}
                    aria-label={network.name}
                  >
                    {network.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={`rounded-3xl backdrop-blur-sm border-2 p-8 lg:p-10 ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className={`text-2xl lg:text-3xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t('contact', 'form.title') || "Envoyez-nous un Message"}
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className={`mb-8 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {t('contact', 'form.subtitle') || "Nous vous répondons dans les plus brefs délais"}
              </motion.p>

              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mb-6 p-4 rounded-xl ${
                    isDark ? 'bg-green-900/20 border border-green-800' : 'bg-green-100 border border-green-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-green-500' : 'bg-green-400'
                    }`}>
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div>
                      <span className={`font-semibold block ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {t('contact', 'form.success') || "Message envoyé avec succès !"}
                      </span>
                      <span className={`text-sm block ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {t('contact', 'form.successDetails') || "Nous vous avons envoyé un email de confirmation. Nous vous contacterons rapidement."}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mb-6 p-4 rounded-xl ${
                    isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-100 border border-red-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-red-500' : 'bg-red-400'
                    }`}>
                      <span className="text-white font-bold">!</span>
                    </div>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {submitError}
                    </span>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className={`block text-sm font-semibold mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t('contact', 'form.fullName') || "Nom Complet"} *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.nom ? 'border-red-500' : 'border'}`}
                      placeholder={t('contact', 'form.namePlaceholder') || "Votre nom complet"}
                    />
                    {errors.nom && (
                      <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="telephone" className={`block text-sm font-semibold mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t('contact', 'form.phone') || "Téléphone"} *
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      required
                      value={formData.telephone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.telephone ? 'border-red-500' : 'border'}`}
                      placeholder={t('contact', 'form.phonePlaceholder') || "+243 00 000 0000"}
                    />
                    {errors.telephone && (
                      <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t('contact', 'form.email') || "Email"} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } ${errors.email ? 'border-red-500' : 'border'}`}
                    placeholder={t('contact', 'form.emailPlaceholder') || "votre@email.com"}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="sujet" className={`block text-sm font-semibold mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t('contact', 'form.subject') || "Sujet"} *
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    required
                    value={formData.sujet}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } ${errors.sujet ? 'border-red-500' : 'border'}`}
                  >
                    <option value="">{t('contact', 'form.subjectPlaceholder') || "Choisir un sujet"}</option>
                    {subjects.map(subject => (
                      <option key={subject.value} value={subject.value}>
                        {t('contact', `subjects.${subject.label}`) || subject.label}
                      </option>
                    ))}
                  </select>
                  {errors.sujet && (
                    <p className="text-red-500 text-sm mt-1">{errors.sujet}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-semibold mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t('contact', 'form.message') || "Message"} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } ${errors.message ? 'border-red-500' : 'border'}`}
                    placeholder={t('contact', 'form.messagePlaceholder') || "Décrivez votre projet ou votre question..."}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : isDark
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-600/25'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      {t('contact', 'form.sending') || "Envoi en cours..."}
                    </span>
                  ) : (
                    t('contact', 'form.submit') || "Envoyer le Message"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
