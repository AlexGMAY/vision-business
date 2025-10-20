import Link from 'next/link'

export default function Fonctionnement() {
  const faqs = [
    {
      question: "Quels documents sont nécessaires pour faire une demande ?",
      reponse: "Une pièce d'identité valide, un justificatif de domicile et de revenus. Pour les étudiants, une preuve d'inscription suffit."
    },
    {
      question: "Combien de temps prend l'approbation ?",
      reponse: "Notre équipe traite la majorité des demandes sous 24-48 heures. Les dossiers complets sont traités plus rapidement."
    },
    {
      question: "Y a-t-il des frais cachés ?",
      reponse: "Non, tous nos frais sont transparents et communiqués avant toute signature. Aucun frais de dossier pour les étudiants."
    },
    {
      question: "Puis-je rembourser par anticipation ?",
      reponse: "Oui, sans aucun frais de pénalité. Nous encourageons même le remboursement anticipé."
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* En-tête */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comment Ça Marche
            </h1>
            <p className="text-xl opacity-90">
              Un processus simple, transparent et rapide pour obtenir le financement 
              dont vous avez besoin.
            </p>
          </div>
        </div>
      </section>

      {/* Processus Détaillé */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {[
              {
                étape: "1. Demande en Ligne",
                description: "Remplissez notre formulaire de demande en quelques minutes. Aucun document n'est requis à cette étape.",
                details: ["Formulaire simple et sécurisé", "Simulation immédiate", "Aucun engagement à ce stade"]
              },
              {
                étape: "2. Soumission des Documents",
                description: "Téléchargez les documents nécessaires via votre espace client sécurisé.",
                details: ["Pièce d'identité", "Justificatifs de revenus", "Preuve de domicile"]
              },
              {
                étape: "3. Analyse et Approbation",
                description: "Notre équipe analyse votre dossier sous 24 heures avec notre système de scoring intelligent.",
                details: ["Vérification des documents", "Analyse de solvabilité", "Décision rapide"]
              },
              {
                étape: "4. Signature du Contrat",
                description: "Signez électroniquement votre contrat de prêt en toute sécurité.",
                details: ["Contrat digital sécurisé", "Signature électronique", "Archivage automatique"]
              },
              {
                étape: "5. Délivrance des Fonds",
                description: "Recevez l'argent sur votre compte dans les 48 heures suivant la signature.",
                details: ["Virement bancaire sécurisé", "Notification immédiate", "Suivi en temps réel"]
              }
            ].map((etape, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 mb-16 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {etape.étape}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                    {etape.description}
                  </p>
                  <ul className="space-y-2">
                    {etape.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Questions Fréquentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.reponse}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Des Questions Supplémentaires ?
          </h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Notre équipe est là pour vous accompagner à chaque étape de votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Nous Contacter
            </Link>
            <Link 
              href="/prets" 
              className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Voir nos Prêts
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}