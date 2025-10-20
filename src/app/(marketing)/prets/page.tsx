import Link from 'next/link'

export default function PretsPage() {
  const produitsPrets = [
    {
      id: 1,
      titre: "Prêts Étudiants",
      description: "Financez vos études, frais de scolarité, matériel pédagogique et logement étudiant.",
      montant: "Jusqu'à 5 000 000 FCFA",
      duree: "12 à 60 mois",
      taux: "Taux préférentiel pour étudiants",
      avantages: ["Aucune garantie requise", "Délai de grâce possible", "Report de remboursement pendant les études"],
      couleur: "bg-green-500"
    },
    {
      id: 2,
      titre: "Prêts PME",
      description: "Développez votre entreprise avec des fonds pour équipement, stock ou expansion.",
      montant: "500 000 à 50 000 000 FCFA",
      duree: "6 à 84 mois",
      taux: "Taux compétitifs selon profil",
      avantages: ["Étude de projet gratuite", "Accompagnement business", "Flexibilité de remboursement"],
      couleur: "bg-blue-500"
    },
    {
      id: 3,
      titre: "Prêts Personnels",
      description: "Pour vos projets personnels : santé, mariage, voyage, éducation ou urgences.",
      montant: "50 000 à 10 000 000 FCFA",
      duree: "3 à 36 mois",
      taux: "Taux fixes avantageux",
      avantages: ["Décision rapide sous 24h", "Documentation simplifiée", "Aucun frais caché"],
      couleur: "bg-purple-500"
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* En-tête */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Solutions de Financement
            </h1>
            <p className="text-xl opacity-90">
              Des prêts adaptés à chaque projet, avec des conditions transparentes 
              et un accompagnement personnalisé.
            </p>
          </div>
        </div>
      </section>

      {/* Produits de Prêts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {produitsPrets.map((produit) => (
              <div 
                key={produit.id}
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* En-tête de la carte */}
                <div className={`${produit.couleur} h-2`}></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {produit.titre}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {produit.description}
                  </p>

                  {/* Détails du prêt */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">Montant</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{produit.montant}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">Durée</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{produit.duree}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 dark:text-gray-400">Taux d'intérêt</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{produit.taux}</span>
                    </div>
                  </div>

                  {/* Avantages */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Avantages :</h4>
                    <ul className="space-y-2">
                      {produit.avantages.map((avantage, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          {avantage}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bouton d'action */}
                  <Link 
                    href="/demander" 
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Demander ce prêt
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Comment ça marche */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Comment Obtenir Votre Prêt en 4 Étapes
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { étape: "1", titre: "Demande en Ligne", description: "Remplissez notre formulaire simple en 5 minutes" },
              { étape: "2", titre: "Évaluation", description: "Analyse rapide de votre dossier sous 24h" },
              { étape: "3", titre: "Approba-tion", description: "Décision finale et signature électronique" },
              { étape: "4", titre: "Déblocage", description: "Fonds transférés sur votre compte sous 48h" }
            ].map((etape) => (
              <div key={etape.étape} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {etape.étape}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {etape.titre}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {etape.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à Lancer Votre Projet ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Rejoignez nos milliers de clients satisfaits et donnez vie à vos ambitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/demander" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Faire une Demande
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}