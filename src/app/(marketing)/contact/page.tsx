// src/app/(marketing)/contact/page.tsx
'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici nous ajouterons la logique d'envoi plus tard
    console.log('Formulaire soumis:', formData)
    alert('Merci pour votre message! Nous vous contacterons rapidement.')
    setFormData({ nom: '', email: '', telephone: '', sujet: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen pt-20">
      {/* En-tête */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl opacity-90">
              Notre équipe est à votre écoute pour répondre à toutes vos questions 
              et vous accompagner dans vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* Contact et Formulaire */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Informations de contact */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Parlons de Votre Projet
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Téléphone
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      +225 07 07 07 07 07
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Lundi - Vendredi, 8h - 18h
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      contact@visionbusiness.ci
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Réponse sous 24 heures
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏢</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Adresse
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Plateau, Abidjan<br />
                      Côte d'Ivoire
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Sur rendez-vous
                    </p>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="mt-12">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Suivez-Nous
                </h3>
                <div className="flex space-x-4">
                  {['Facebook', 'LinkedIn', 'Twitter', 'Instagram'].map((reseau) => (
                    <button
                      key={reseau}
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                    >
                      <span className="text-gray-600 dark:text-gray-400">📱</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Envoyez-nous un Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      required
                      value={formData.telephone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="+225 00 00 00 00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    required
                    value={formData.sujet}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Choisir un sujet</option>
                    <option value="demande-pret">Demande de prêt</option>
                    <option value="information">Information</option>
                    <option value="reclamation">Réclamation</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Décrivez votre projet ou votre question..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}