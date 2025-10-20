import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
              <div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Vision Business
                </span>
                <span>Microfinance</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Votre partenaire de confiance pour des solutions de financement accessibles 
              et transparentes. Nous croyons en votre potentiel et nous engageons à 
              rendre vos projets réalisables.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Liens Rapides
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/prets" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Nos Prêts
                </Link>
              </li>
              <li>
                <Link href="/application" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Obtenir un pret
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Légal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/conditions" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/legal/confidentialite" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal/conformite" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Conformité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} <Link href={'/'}>Vision Business</Link>. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              Sécurisé et réglementé
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}