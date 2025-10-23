'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from '@/lib/i18n/client'

// Social media icons (using react-icons for professional look)
import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaTwitter, 
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { t } = useTranslation()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      alert(t('footer.newsletter.invalidEmail') || 'Veuillez entrer une adresse email valide')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Newsletter subscription:', email)
    setIsSubscribed(true)
    setEmail('')
    setIsSubmitting(false)
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubscribed(false), 5000)
  }

  const socialLinks = [
    {
      icon: <FaFacebookF className="w-5 h-5" />,
      href: "https://facebook.com/visionbusiness",
      label: "Facebook",
      color: "hover:bg-blue-600"
    },
    {
      icon: <FaLinkedinIn className="w-5 h-5" />,
      href: "https://linkedin.com/company/visionbusiness",
      label: "LinkedIn",
      color: "hover:bg-blue-700"
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      href: "https://twitter.com/visionbusiness",
      label: "Twitter",
      color: "hover:bg-blue-400"
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      href: "https://instagram.com/visionbusiness",
      label: "Instagram",
      color: "hover:bg-pink-600"
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: "https://wa.me/243970000000",
      label: "WhatsApp",
      color: "hover:bg-green-500"
    }
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info with Logo */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-4 mb-6 group">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white font-bold text-xl">VB</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 border-2 border-gray-900 shadow-lg"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white leading-tight">
                  {t('footer.company.name') || "Vision Business"}
                </span>
                <div className='flex justify-end'>
                  <span className="text-sm text-gray-400 font-medium bg-gray-800 px-2 py-1 rounded-lg">
                    {t('footer.company.subtitle') || "Microfinance"}
                  </span>
                </div>
              </div>
            </Link>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-6">
              {t('footer.company.description') || "Votre partenaire de confiance pour des solutions de financement accessibles et transparentes. Nous transformons vos ambitions en réalité grâce à notre expertise et notre engagement."}
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">
                  {t('footer.badges.regulated') || "Réglementé BCC"}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-300">
                  {t('footer.badges.secure') || "Données Sécurisées"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center">
              <span className="w-1 h-4 bg-blue-500 rounded-full mr-3"></span>
              {t('footer.navigation.title') || "Navigation"}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  {t('footer.navigation.home') || "Accueil"}
                </Link>
              </li>
              <li>
                <Link href="/prets" className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  {t('footer.navigation.loans') || "Nos Prêts"}
                </Link>
              </li>
              <li>
                <Link href="/application" className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  {t('footer.navigation.apply') || "Obtenir un Prêt"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  {t('footer.navigation.contact') || "Contact"}
                </Link>
              </li>
              <li>
                <Link href="/fonctionnement" className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                  {t('footer.navigation.howItWorks') || "Comment ça marche"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center">
              <span className="w-1 h-4 bg-purple-500 rounded-full mr-3"></span>
              {t('footer.information.title') || "Informations"}
            </h3>
            
            {/* Legal Links */}
            <div className="mb-6">
              <h4 className="text-gray-300 text-sm font-semibold mb-4">
                {t('footer.legal.title') || "Légal"}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/legal/conditions" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('footer.legal.terms') || "Conditions d'utilisation"}
                  </Link>
                </li>
                <li>
                  <Link href="/legal/confidentialite" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('footer.legal.privacy') || "Politique de confidentialité"}
                  </Link>
                </li>
                <li>
                  <Link href="/legal/conformite" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('footer.legal.compliance') || "Conformité réglementaire"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-gray-300 text-sm font-semibold mb-4">
                {t('footer.contact.title') || "Contact"}
              </h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>contact@visionbusiness.cd</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+243 970 000 000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🏢</span>
                  <span>{t('footer.contact.address') || "Gombe, Kinshasa, RDC"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Newsletter */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-800">
          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              {t('footer.newsletter.title') || "Restez informé"}
            </h4>
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm"
              >
                {t('footer.newsletter.success') || "✅ Merci ! Vous êtes maintenant abonné à notre newsletter."}
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder') || "Votre email"}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl sm:rounded-r-none text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                  required
                />
                <motion.button 
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl sm:rounded-l-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('footer.newsletter.sending') || "Envoi..."}</span>
                    </span>
                  ) : (
                    t('footer.newsletter.button') || "S'abonner"
                  )}
                </motion.button>
              </form>
            )}
            <p className="text-gray-500 text-xs mt-2 max-w-md">
              {t('footer.newsletter.description') || "Recevez les dernières actualités et offres exclusives de Vision Business."}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="text-white font-semibold text-sm sm:mr-4">
              {t('footer.social.follow') || "Suivez-nous"}
            </div>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 border border-gray-700 ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500 text-center sm:text-left">
              <p>
                © {currentYear}{' '}
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.copyright.company') || "Vision Business Microfinance"}
                </Link>
                . {t('footer.copyright.rights') || "Tous droits réservés."}
              </p>
              <div className="hidden sm:block w-1 h-1 bg-gray-700 rounded-full"></div>
              <span>{t('footer.copyright.country') || "République Démocratique du Congo"}</span>
            </div>

            {/* Security Badges */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{t('footer.security.ssl') || "Sécurisé SSL"}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-700 rounded-full"></div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{t('footer.security.encrypted') || "Données cryptées"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Accent */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>
    </footer>
  )
}