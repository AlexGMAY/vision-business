'use client';

import Link from 'next/link';
import { useLegalTranslation } from '@/lib/i18n/helpers';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

export function ConformiteContent() {
  const { getTranslation } = useLegalTranslation();
  const { isDark } = useDarkMode();

  const sections = [
    { id: 1, title: getTranslation('compliance.section1.title', 'Engagement de conformité') },
    { id: 2, title: getTranslation('compliance.section2.title', 'Cadre réglementaire') },
    { id: 3, title: getTranslation('compliance.section3.title', 'Lutte contre le blanchiment (LCB-FT)') },
    { id: 4, title: getTranslation('compliance.section4.title', 'Conformité KYC') },
    { id: 5, title: getTranslation('compliance.section5.title', 'Protection des consommateurs') },
    { id: 6, title: getTranslation('compliance.section6.title', 'Éthique et intégrité') },
    { id: 7, title: getTranslation('compliance.section7.title', 'Surveillance et reporting') },
    { id: 8, title: getTranslation('compliance.section8.title', 'Formation et sensibilisation') },
    { id: 9, title: getTranslation('compliance.section9.title', 'Signalement des irrégularités') },
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
              {getTranslation('compliance.title', 'Conformité Réglementaire')}
            </h1>
            <p className={`text-xl transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {getTranslation('compliance.subtitle', 'Notre engagement pour des services financiers transparents et conformes')}
            </p>
          </div>

          {/* Table of Contents */}
          <div className={`rounded-xl p-6 mb-8 transition-colors duration-300 ${
            isDark ? 'bg-purple-900/20' : 'bg-purple-50'
          }`}>
            <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {getTranslation('compliance.tableOfContents', 'Table des Matières')}
            </h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <a 
                  key={section.id}
                  href={`#section-${section.id}`}
                  className={`block transition-colors duration-300 hover:text-purple-600 ${
                    isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'
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
                1. {getTranslation('compliance.section1.title', 'Engagement de conformité')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('compliance.section1.content1', 'Vision Business place la conformité réglementaire au cœur de ses activités. Nous nous engageons à respecter scrupuleusement toutes les lois et réglementations applicables au secteur financier en République Démocratique du Congo.')}
              </p>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('compliance.section1.content2', 'Notre programme de conformité est supervisé par un Responsable de la Conformité indépendant qui rend compte directement au Conseil d\'Administration.')}
              </p>
            </section>

            {/* Section 2 */}
            <section id="section-2" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                2. {getTranslation('compliance.section2.title', 'Cadre réglementaire')}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    2.1 {getTranslation('compliance.section2.regulations.title', 'Réglementations applicables')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-4`}>
                    {getTranslation('compliance.section2.regulations.content', 'Nos activités sont régies par les principales réglementations suivantes :')}
                  </p>
                  <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>{getTranslation('compliance.section2.regulations.law1', 'Loi sur les établissements de crédit et les établissements financiers')}</li>
                    <li>{getTranslation('compliance.section2.regulations.law2', 'Règlementation de la Banque Centrale du Congo (BCC)')}</li>
                    <li>{getTranslation('compliance.section2.regulations.law3', 'Loi relative à la lutte contre le blanchiment des capitaux et le financement du terrorisme')}</li>
                    <li>{getTranslation('compliance.section2.regulations.law4', 'Loi sur la protection des consommateurs')}</li>
                    <li>{getTranslation('compliance.section2.regulations.law5', 'Règlementation sur la protection des données personnelles')}</li>
                    <li>{getTranslation('compliance.section2.regulations.law6', 'Code des obligations commerciales')}</li>
                  </ul>
                </div>

                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    2.2 {getTranslation('compliance.section2.supervision.title', 'Supervision')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {getTranslation('compliance.section2.supervision.content', 'Vision Business est supervisé par la Banque Centrale du Congo (BCC) et fait l\'objet d\'inspections régulières pour assurer le respect de nos obligations réglementaires.')}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="section-3" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                3. {getTranslation('compliance.section3.title', 'Lutte contre le blanchiment (LCB-FT)')}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    3.1 {getTranslation('compliance.section3.amlPolicy.title', 'Politique LCB-FT')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-4`}>
                    {getTranslation('compliance.section3.amlPolicy.content', 'Notre politique de lutte contre le blanchiment des capitaux et le financement du terrorisme comprend :')}
                  </p>
                  <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>{getTranslation('compliance.section3.amlPolicy.measure1', 'Vérification approfondie de l\'identité des clients (KYC)')}</li>
                    <li>{getTranslation('compliance.section3.amlPolicy.measure2', 'Surveillance continue des transactions')}</li>
                    <li>{getTranslation('compliance.section3.amlPolicy.measure3', 'Détection des opérations suspectes')}</li>
                    <li>{getTranslation('compliance.section3.amlPolicy.measure4', 'Reporting aux autorités compétentes')}</li>
                    <li>{getTranslation('compliance.section3.amlPolicy.measure5', 'Classification des risques par client')}</li>
                    <li>{getTranslation('compliance.section3.amlPolicy.measure6', 'Embargo et listes de sanctions')}</li>
                  </ul>
                </div>

                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    3.2 {getTranslation('compliance.section3.obligations.title', 'Obligations de vigilance')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {getTranslation('compliance.section3.obligations.content', 'Nous sommes tenus de connaître nos clients, de surveiller leurs transactions, de conserver les documents pendant 5 ans, et de déclarer toute opération suspecte à la Cellule Nationale de Traitement des Informations Financières (CENTIF).')}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="section-4" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                4. {getTranslation('compliance.section4.title', 'Conformité KYC')}
              </h2>
              <div className="space-y-4">
                <p className={`transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {getTranslation('compliance.section4.content', 'Notre processus "Know Your Customer" (KYC) comprend trois niveaux de diligence :')}
                </p>
                <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>{getTranslation('compliance.section4.kyc1', 'Diligence simplifiée pour les produits à faible risque')}</li>
                  <li>{getTranslation('compliance.section4.kyc2', 'Diligence standard pour la majorité des clients')}</li>
                  <li>{getTranslation('compliance.section4.kyc3', 'Diligence renforcée pour les clients à haut risque (PEP, secteurs sensibles)')}</li>
                </ul>
                <p className={`transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } mt-4`}>
                  {getTranslation('compliance.section4.footer', 'Nous vérifions systématiquement l\'identité, l\'adresse, l\'activité professionnelle et la source des fonds de nos clients.')}
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="section-5" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                5. {getTranslation('compliance.section5.title', 'Protection des consommateurs')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('compliance.section5.content1', 'Nous nous engageons à fournir une information claire, complète et transparente à nos clients :')}
              </p>
              <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                <li>{getTranslation('compliance.section5.protection1', 'Communication transparente des taux et frais')}</li>
                <li>{getTranslation('compliance.section5.protection2', 'Explication claire des termes du contrat')}</li>
                <li>{getTranslation('compliance.section5.protection3', 'Respect du droit de rétractation quand applicable')}</li>
                <li>{getTranslation('compliance.section5.protection4', 'Traitement équitable des réclamations')}</li>
                <li>{getTranslation('compliance.section5.protection5', 'Protection contre le surendettement')}</li>
              </ul>
            </section>

            {/* Continue with Sections 6-9... */}
            {/* Section 6 */}
            <section id="section-6" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                6. {getTranslation('compliance.section6.title', 'Éthique et intégrité')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('compliance.section6.content1', 'Tous les employés de Vision Business sont tenus de respecter notre Code d\'éthique et de conduite qui inclut :')}
              </p>
              <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                <li>{getTranslation('compliance.section6.ethics1', 'Interdiction des conflits d\'intérêts')}</li>
                <li>{getTranslation('compliance.section6.ethics2', 'Respect de la confidentialité des informations')}</li>
                <li>{getTranslation('compliance.section6.ethics3', 'Interdiction de la corruption et des pots-de-vin')}</li>
                <li>{getTranslation('compliance.section6.ethics4', 'Équité et non-discrimination')}</li>
                <li>{getTranslation('compliance.section6.ethics5', 'Transparence dans les relations d\'affaires')}</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="section-7" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                7. {getTranslation('compliance.section7.title', 'Surveillance et reporting')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('compliance.section7.content', 'Notre système de surveillance comprend des audits internes réguliers, des contrôles automatisés des transactions, et des rapports trimestriels au Conseil d\'Administration sur les questions de conformité.')}
              </p>
            </section>

            {/* Section 8 */}
            <section id="section-8" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                8. {getTranslation('compliance.section8.title', 'Formation et sensibilisation')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('compliance.section8.content', 'Tous les employés reçoivent une formation annuelle obligatoire sur la conformité réglementaire, la lutte contre le blanchiment, et la protection des données. Les équipes commerciales bénéficient de formations supplémentaires sur la protection des consommateurs.')}
              </p>
            </section>

            {/* Section 9 */}
            <section id="section-9" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                9. {getTranslation('compliance.section9.title', 'Signalement des irrégularités')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('compliance.section9.content1', 'Nous encourageons le signalement de toute irrégularité ou comportement non éthique via notre canal dédié et confidentiel.')}
              </p>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('compliance.section9.content2', 'Les signalements peuvent être effectués anonymement et font l\'objet d\'une protection contre les représailles conformément à notre politique de protection des lanceurs d\'alerte.')}
              </p>
            </section>

            {/* Contact Information */}
            <div className={`rounded-xl p-6 mt-12 transition-colors duration-300 ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {getTranslation('compliance.questions.title', 'Questions sur la conformité ?')}
              </h3>
              <p className={`mb-4 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('compliance.questions.content', 'Notre équipe conformité est à votre disposition pour toute question concernant nos politiques et procédures réglementaires.')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  {getTranslation('compliance.buttons.contact', 'Contacter la conformité')}
                </Link>
                <Link 
                  href="/legal/conditions"
                  className={`px-6 py-3 border rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getTranslation('compliance.buttons.terms', 'Conditions générales')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}