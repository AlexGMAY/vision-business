'use client';

import Link from 'next/link';
import { useLegalTranslation } from '@/lib/i18n/helpers';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

export function ConditionsContent() {
  const { getTranslation } = useLegalTranslation();
  const { isDark } = useDarkMode();

  const sections = [
    { id: 1, title: getTranslation('conditions.section1.title', 'Acceptation des conditions') },
    { id: 2, title: getTranslation('conditions.section2.title', 'Services proposés') },
    { id: 3, title: getTranslation('conditions.section3.title', 'Processus de demande de prêt') },
    { id: 4, title: getTranslation('conditions.section4.title', 'Obligations de l\'utilisateur') },
    { id: 5, title: getTranslation('conditions.section5.title', 'Confidentialité et protection des données') },
    { id: 6, title: getTranslation('conditions.section6.title', 'Propriété intellectuelle') },
    { id: 7, title: getTranslation('conditions.section7.title', 'Limitations de responsabilité') },
    { id: 8, title: getTranslation('conditions.section8.title', 'Modifications des conditions') },
    { id: 9, title: getTranslation('conditions.section9.title', 'Loi applicable et juridiction') },
  ];

  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className={`rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {getTranslation('conditions.title', 'Conditions Générales d\'Utilisation')}
            </h1>
            <p className={`text-xl transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {getTranslation('conditions.lastUpdated', 'Dernière mise à jour')}: {new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Table of Contents */}
          <div className={`rounded-xl p-6 mb-8 transition-colors duration-300 ${
            isDark ? 'bg-blue-900/20' : 'bg-blue-50'
          }`}>
            <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {getTranslation('conditions.tableOfContents', 'Table des Matières')}
            </h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <a 
                  key={section.id}
                  href={`#section-${section.id}`}
                  className={`block transition-colors duration-300 hover:text-blue-600 ${
                    isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  {section.id}. {section.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className={`prose prose-lg max-w-none transition-colors duration-300 ${
            isDark ? 'prose-invert' : ''
          }`}>
            
            {/* Section 1 */}
            <section id="section-1" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                1. {getTranslation('conditions.section1.title', 'Acceptation des conditions')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('conditions.section1.content1', 'En accédant et en utilisant les services de Vision Business, vous acceptez sans réserve les présentes conditions générales d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser nos services.')}
              </p>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('conditions.section1.content2', 'Vision Business se réserve le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des modifications importantes par email ou via une notification sur notre plateforme.')}
              </p>
            </section>

            {/* Section 2 */}
            <section id="section-2" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                2. {getTranslation('conditions.section2.title', 'Services proposés')}
              </h2>
              <div className="space-y-4">
                <p className={`transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {getTranslation('conditions.section2.content', 'Vision Business propose les services financiers suivants :')}
                </p>
                <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>{getTranslation('conditions.section2.personalLoans', 'Prêts personnels pour particuliers')}</li>
                  <li>{getTranslation('conditions.section2.businessLoans', 'Financement pour petites et moyennes entreprises')}</li>
                  <li>{getTranslation('conditions.section2.emergencyLoans', 'Prêts d\'urgence et de trésorerie')}</li>
                  <li>{getTranslation('conditions.section2.equipmentLoans', 'Financement d\'équipements et de projets')}</li>
                  <li>{getTranslation('conditions.section2.financialAdvice', 'Accompagnement et conseil financier')}</li>
                </ul>
                <p className={`transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {getTranslation('conditions.section2.footer', 'Tous les services sont soumis à l\'approbation de notre comité de crédit et au respect des réglementations en vigueur en République Démocratique du Congo.')}
                </p>
              </div>
            </section>

            {/* Section 3 - Complete Enterprise Content */}
            <section id="section-3" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                3. {getTranslation('conditions.section3.title', 'Processus de demande de prêt')}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    3.1 {getTranslation('conditions.section3.eligibility.title', 'Éligibilité')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-4`}>
                    {getTranslation('conditions.section3.eligibility.content', 'Pour être éligible à nos services de prêt, vous devez remplir les conditions suivantes :')}
                  </p>
                  <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>{getTranslation('conditions.section3.eligibility.age', 'Être âgé d\'au moins 18 ans')}</li>
                    <li>{getTranslation('conditions.section3.eligibility.residency', 'Résider en République Démocratique du Congo')}</li>
                    <li>{getTranslation('conditions.section3.eligibility.income', 'Disposer d\'une source de revenus régulière et vérifiable')}</li>
                    <li>{getTranslation('conditions.section3.eligibility.documents', 'Fournir les documents d\'identité et justificatifs requis')}</li>
                    <li>{getTranslation('conditions.section3.eligibility.creditHistory', 'Avoir un historique de crédit satisfaisant ou accepter une évaluation de solvabilité')}</li>
                  </ul>
                </div>

                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    3.2 {getTranslation('conditions.section3.documents.title', 'Documents requis')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-4`}>
                    {getTranslation('conditions.section3.documents.content', 'Selon le type de prêt, les documents suivants peuvent être requis :')}
                  </p>
                  <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>{getTranslation('conditions.section3.documents.identity', 'Pièce d\'identité nationale ou passeport en cours de validité')}</li>
                    <li>{getTranslation('conditions.section3.documents.address', 'Justificatif de domicile de moins de 3 mois')}</li>
                    <li>{getTranslation('conditions.section3.documents.income', 'Justificatifs de revenus (bulletins de salaire, relevés bancaires, déclarations fiscales)')}</li>
                    <li>{getTranslation('conditions.section3.documents.business', 'Pour les entreprises : statuts, registre de commerce, bilans comptables récents')}</li>
                    <li>{getTranslation('conditions.section3.documents.collateral', 'Documents relatifs aux garanties proposées le cas échéant')}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="section-4" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                4. {getTranslation('conditions.section4.title', 'Obligations de l\'utilisateur')}
              </h2>
              <div className="space-y-4">
                <p className={`transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {getTranslation('conditions.section4.content', 'En utilisant nos services, vous vous engagez à :')}
                </p>
                <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>{getTranslation('conditions.section4.accuracy', 'Fournir des informations exactes, complètes et à jour')}</li>
                  <li>{getTranslation('conditions.section4.confidentiality', 'Maintenir la confidentialité de vos identifiants de connexion')}</li>
                  <li>{getTranslation('conditions.section4.repayment', 'Respecter scrupuleusement les échéances de remboursement convenues')}</li>
                  <li>{getTranslation('conditions.section4.communication', 'Informer Vision Business de tout changement de situation pouvant affecter votre capacité de remboursement')}</li>
                  <li>{getTranslation('conditions.section4.fundsUsage', 'Utiliser les fonds prêtés conformément à l\'objet déclaré dans votre demande')}</li>
                  <li>{getTranslation('conditions.section4.cooperation', 'Coopérer avec Vision Business pour toute vérification nécessaire')}</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="section-5" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                5. {getTranslation('conditions.section5.title', 'Confidentialité et protection des données')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('conditions.section5.content1', 'Vision Business s\'engage à protéger la confidentialité de vos données personnelles conformément à notre politique de confidentialité et à la réglementation sur la protection des données.')}
              </p>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('conditions.section5.content2', 'Vos données sont utilisées exclusivement pour :')}
              </p>
              <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                <li>{getTranslation('conditions.section5.usage1', 'L\'étude et le traitement de votre demande de prêt')}</li>
                <li>{getTranslation('conditions.section5.usage2', 'La gestion de votre relation client et du contrat de prêt')}</li>
                <li>{getTranslation('conditions.section5.usage3', 'L\'amélioration de nos services et produits')}</li>
                <li>{getTranslation('conditions.section5.usage4', 'Le respect de nos obligations légales et réglementaires')}</li>
                <li>{getTranslation('conditions.section5.usage5', 'La prévention de la fraude et le blanchiment d\'argent')}</li>
              </ul>
            </section>

            {/* Continue with Sections 6-9... */}
            {/* Section 6 */}
            <section id="section-6" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                6. {getTranslation('conditions.section6.title', 'Propriété intellectuelle')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('conditions.section6.content', 'Tous les contenus, marques, logos et éléments graphiques de la plateforme Vision Business sont la propriété exclusive de Vision Business et sont protégés par les lois sur la propriété intellectuelle.')}
              </p>
            </section>

            {/* Section 7 */}
            <section id="section-7" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                7. {getTranslation('conditions.section7.title', 'Limitations de responsabilité')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('conditions.section7.content', 'Vision Business ne saurait être tenue responsable des dommages indirects résultant de l\'utilisation de ses services. La responsabilité de Vision Business est limitée au montant des frais perçus dans le cadre du service concerné.')}
              </p>
            </section>

            {/* Section 8 */}
            <section id="section-8" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                8. {getTranslation('conditions.section8.title', 'Modifications des conditions')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('conditions.section8.content', 'Vision Business se réserve le droit de modifier les présentes conditions à tout moment. Les modifications prendront effet dès leur publication sur la plateforme. L\'utilisateur est réputé avoir accepté les modifications en continuant à utiliser les services.')}
              </p>
            </section>

            {/* Section 9 */}
            <section id="section-9" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                9. {getTranslation('conditions.section9.title', 'Loi applicable et juridiction')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('conditions.section9.content1', 'Les présentes conditions générales sont régies par la loi de la République Démocratique du Congo.')}
              </p>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('conditions.section9.content2', 'Tout litige relatif à leur interprétation ou leur exécution relève de la compétence exclusive des tribunaux de Kinshasa, nonobstant la pluralité de défendeurs ou d\'appel en garantie.')}
              </p>
            </section>

            {/* Contact Information */}
            <div className={`rounded-xl p-6 mt-12 transition-colors duration-300 ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {getTranslation('conditions.questions.title', 'Questions sur nos conditions ?')}
              </h3>
              <p className={`mb-4 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('conditions.questions.content', 'Notre équipe est à votre disposition pour toute question concernant nos conditions générales.')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  {getTranslation('conditions.buttons.contact', 'Nous contacter')}
                </Link>
                <Link 
                  href="/legal/confidentialite"
                  className={`px-6 py-3 border rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getTranslation('conditions.buttons.privacy', 'Politique de confidentialité')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}