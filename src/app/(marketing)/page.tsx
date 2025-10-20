import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Donnez Vie à Vos Projets
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Prêts rapides et transparents pour étudiants, petites entreprises et besoins personnels. 
              Votre vision est notre métier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/application" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Demander un Prêt
              </Link>
              <Link 
                href="/prets" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
              >
                Découvrir nos Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Pourquoi Choisir Vision Business ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Approbation Rapide
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Décision sous 24-48 heures avec notre processus simplifié.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Sécurisé & Privé
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Vos données sont protégées avec des mesures de sécurité de niveau bancaire.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Conditions Flexibles
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Plans de remboursement personnalisés adaptés à votre situation.
              </p>
            </div>
          </div>
        </div>
      </section>      

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Prêt à Concréter Vos Projets ?
          </h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits qui ont transformé leurs rêves en réalité avec Vision Business.
          </p>
          <Link 
            href="/application" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Commencer Maintenant
          </Link>
        </div>
      </section>
    </div>
  )
}