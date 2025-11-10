'use client';

import Link from 'next/link';
import { useLegalTranslation } from '@/lib/i18n/helpers';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

export function ConfidentialiteContent() {
  const { getTranslation } = useLegalTranslation();
  const { isDark } = useDarkMode();

  const sections = [
    { id: 1, title: getTranslation('privacy.section1.title', 'Introduction et champ d&apos;application') },
    { id: 2, title: getTranslation('privacy.section2.title', 'Données collectées') },
    { id: 3, title: getTranslation('privacy.section3.title', 'Finalités du traitement') },
    { id: 4, title: getTranslation('privacy.section4.title', 'Base légale du traitement') },
    { id: 5, title: getTranslation('privacy.section5.title', 'Partage des données') },
    { id: 6, title: getTranslation('privacy.section6.title', 'Transferts internationaux') },
    { id: 7, title: getTranslation('privacy.section7.title', 'Conservation des données') },
    { id: 8, title: getTranslation('privacy.section8.title', 'Droits des personnes') },
    { id: 9, title: getTranslation('privacy.section9.title', 'Sécurité des données') },
    { id: 10, title: getTranslation('privacy.section10.title', 'Cookies et technologies similaires') },
    { id: 11, title: getTranslation('privacy.section11.title', 'Modifications de la politique') },
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
              {getTranslation('privacy.title', 'Politique de Confidentialité')}
            </h1>
            <p className={`text-xl transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {getTranslation('privacy.lastUpdated', 'Dernière mise à jour')}: {new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Table of Contents */}
          <div className={`rounded-xl p-6 mb-8 transition-colors duration-300 ${
            isDark ? 'bg-green-900/20' : 'bg-green-50'
          }`}>
            <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {getTranslation('privacy.tableOfContents', 'Table des Matières')}
            </h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <a 
                  key={section.id}
                  href={`#section-${section.id}`}
                  className={`block transition-colors duration-300 hover:text-green-600 ${
                    isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'
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
                1. {getTranslation('privacy.section1.title', 'Introduction et champ d\'application')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('privacy.section1.content1', 'Chez Vision Business, la protection de vos données personnelles est une priorité absolue. Cette politique de confidentialité décrit comment nous collectons, utilisons, partageons et protégeons vos informations dans le cadre de nos services financiers.')}
              </p>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('privacy.section1.content2', 'Cette politique s\'applique à tous les services proposés par Vision Business, y compris les demandes de prêt en ligne, la gestion de compte, et toute interaction avec notre plateforme.')}
              </p>
            </section>

            {/* Section 2 */}
            <section id="section-2" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                2. {getTranslation('privacy.section2.title', 'Données collectées')}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    2.1 {getTranslation('privacy.section2.personalData.title', 'Données personnelles')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-4`}>
                    {getTranslation('privacy.section2.personalData.content', 'Nous collectons les données suivantes :')}
                  </p>
                  <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>{getTranslation('privacy.section2.personalData.identity', 'Informations d\'identité : nom, prénom, date de naissance, pièce d\'identité')}</li>
                    <li>{getTranslation('privacy.section2.personalData.contact', 'Coordonnées : adresse, email, téléphone')}</li>
                    <li>{getTranslation('privacy.section2.personalData.financial', 'Informations financières : revenus, emploi, historique de crédit')}</li>
                    <li>{getTranslation('privacy.section2.personalData.banking', 'Données bancaires : relevés, IBAN, informations de compte')}</li>
                    <li>{getTranslation('privacy.section2.personalData.technical', 'Données techniques : adresse IP, logs, cookies')}</li>
                  </ul>
                </div>

                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    2.2 {getTranslation('privacy.section2.sensitiveData.title', 'Données sensibles')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {getTranslation('privacy.section2.sensitiveData.content', 'Conformément à la réglementation, nous ne collectons pas de données sensibles (origine raciale, opinions politiques, croyances religieuses, etc.) sauf obligation légale explicite.')}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="section-3" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                3. {getTranslation('privacy.section3.title', 'Finalités du traitement')}
              </h2>
              <div className="space-y-4">
                <p className={`transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {getTranslation('privacy.section3.content', 'Vos données sont utilisées pour les finalités suivantes :')}
                </p>
                <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>{getTranslation('privacy.section3.purpose1', 'Étude et octroi de prêts')}</li>
                  <li>{getTranslation('privacy.section3.purpose2', 'Gestion de la relation client')}</li>
                  <li>{getTranslation('privacy.section3.purpose3', 'Prévention de la fraude et blanchiment')}</li>
                  <li>{getTranslation('privacy.section3.purpose4', 'Conformité réglementaire')}</li>
                  <li>{getTranslation('privacy.section3.purpose5', 'Amélioration de nos services')}</li>
                  <li>{getTranslation('privacy.section3.purpose6', 'Communication marketing (avec consentement)')}</li>
                  <li>{getTranslation('privacy.section3.purpose7', 'Sécurité des transactions')}</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section id="section-4" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                4. {getTranslation('privacy.section4.title', 'Base légale du traitement')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('privacy.section4.content1', 'Le traitement de vos données repose sur les bases légales suivantes :')}
              </p>
              <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                <li>{getTranslation('privacy.section4.legal1', 'Exécution du contrat pour la fourniture de nos services financiers')}</li>
                <li>{getTranslation('privacy.section4.legal2', 'Obligation légale en matière de lutte contre la fraude et blanchiment')}</li>
                <li>{getTranslation('privacy.section4.legal3', 'Intérêt légitime pour l\'amélioration de nos services')}</li>
                <li>{getTranslation('privacy.section4.legal4', 'Consentement explicite pour les communications marketing')}</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="section-5" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                5. {getTranslation('privacy.section5.title', 'Partage des données')}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    5.1 {getTranslation('privacy.section5.recipients.title', 'Destinataires des données')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-4`}>
                    {getTranslation('privacy.section5.recipients.content', 'Vos données peuvent être partagées avec :')}
                  </p>
                  <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>{getTranslation('privacy.section5.recipients.regulators', 'Autorités réglementaires et fiscales')}</li>
                    <li>{getTranslation('privacy.section5.recipients.partners', 'Partenaires financiers et assureurs')}</li>
                    <li>{getTranslation('privacy.section5.recipients.auditors', 'Auditeurs et contrôleurs légaux')}</li>
                    <li>{getTranslation('privacy.section5.recipients.serviceProviders', 'Prestataires de services techniques')}</li>
                    <li>{getTranslation('privacy.section5.recipients.legal', 'Autorités judiciaires sur réquisition légale')}</li>
                  </ul>
                </div>

                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    5.2 {getTranslation('privacy.section5.safeguards.title', 'Garanties')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {getTranslation('privacy.section5.safeguards.content', 'Tous nos partenaires sont contractuellement tenus de respecter des standards de sécurité équivalents aux nôtres et ne peuvent utiliser vos données que pour les finalités spécifiées.')}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="section-6" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                6. {getTranslation('privacy.section6.title', 'Transferts internationaux')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('privacy.section6.content1', 'Vos données sont principalement traitées et stockées en République Démocratique du Congo. Dans le cas exceptionnel d\'un transfert international, nous nous assurons que :')}
              </p>
              <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                <li>{getTranslation('privacy.section6.condition1', 'Le pays bénéficie d\'une décision d\'adéquation')}</li>
                <li>{getTranslation('privacy.section6.condition2', 'Des clauses contractuelles types sont mises en place')}</li>
                <li>{getTranslation('privacy.section6.condition3', 'Des mesures de sécurité techniques et organisationnelles appropriées sont appliquées')}</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="section-7" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                7. {getTranslation('privacy.section7.title', 'Conservation des données')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('privacy.section7.content1', 'Nous conservons vos données pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, conformément aux obligations légales :')}
              </p>
              <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                <li>{getTranslation('privacy.section7.duration1', 'Données de prospect : 3 ans après le dernier contact')}</li>
                <li>{getTranslation('privacy.section7.duration2', 'Données client : durée du contrat + 5 ans')}</li>
                <li>{getTranslation('privacy.section7.duration3', 'Données comptables : 10 ans')}</li>
                <li>{getTranslation('privacy.section7.duration4', 'Données de lutte contre la fraude : 5 ans')}</li>
              </ul>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('privacy.section7.content2', 'Passé ces délais, les données sont soit archivées conformément à la loi, soit anonymisées pour des études statistiques, soit détruites de manière sécurisée.')}
              </p>
            </section>

            {/* Section 8 */}
            <section id="section-8" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                8. {getTranslation('privacy.section8.title', 'Droits des personnes')}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    8.1 {getTranslation('privacy.section8.rights.title', 'Vos droits')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-4`}>
                    {getTranslation('privacy.section8.rights.content', 'Conformément à la réglementation sur la protection des données, vous disposez des droits suivants :')}
                  </p>
                  <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>{getTranslation('privacy.section8.rights.access', 'Droit d\'accès à vos données')}</li>
                    <li>{getTranslation('privacy.section8.rights.rectification', 'Droit de rectification')}</li>
                    <li>{getTranslation('privacy.section8.rights.erasure', 'Droit à l\'effacement ("droit à l\'oubli")')}</li>
                    <li>{getTranslation('privacy.section8.rights.limitation', 'Droit à la limitation du traitement')}</li>
                    <li>{getTranslation('privacy.section8.rights.portability', 'Droit à la portabilité des données')}</li>
                    <li>{getTranslation('privacy.section8.rights.opposition', 'Droit d\'opposition')}</li>
                    <li>{getTranslation('privacy.section8.rights.withdraw', 'Droit de retirer votre consentement')}</li>
                  </ul>
                </div>

                <div>
                  <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    8.2 {getTranslation('privacy.section8.exercise.title', 'Exercice de vos droits')}
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-4`}>
                    {getTranslation('privacy.section8.exercise.content', 'Pour exercer vos droits, vous pouvez :')}
                  </p>
                  <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>{getTranslation('privacy.section8.exercise.email', 'Nous contacter à privacy@visionbusiness.com')}</li>
                    <li>{getTranslation('privacy.section8.exercise.portal', 'Utiliser votre espace client en ligne')}</li>
                    <li>{getTranslation('privacy.section8.exercise.postal', 'Nous écrire à l\'adresse postale de notre siège')}</li>
                  </ul>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mt-4`}>
                    {getTranslation('privacy.section8.exercise.response', 'Nous nous engageons à répondre dans un délai maximum d\'un mois. En cas de complexité, ce délai peut être prolongé de deux mois supplémentaires.')}
                  </p>
                </div>
              </div>
            </section>

            {/* Continue with Sections 9-11... */}
            {/* Section 9 */}
            <section id="section-9" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                9. {getTranslation('privacy.section9.title', 'Sécurité des données')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('privacy.section9.content1', 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.')}
              </p>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-4`}>
                {getTranslation('privacy.section9.content2', 'Ces mesures incluent :')}
              </p>
              <ul className={`list-disc list-inside space-y-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li>{getTranslation('privacy.section9.measure1', 'Chiffrement des données sensibles')}</li>
                <li>{getTranslation('privacy.section9.measure2', 'Contrôle d\'accès basé sur les rôles')}</li>
                <li>{getTranslation('privacy.section9.measure3', 'Audits de sécurité réguliers')}</li>
                <li>{getTranslation('privacy.section9.measure4', 'Formation du personnel à la protection des données')}</li>
                <li>{getTranslation('privacy.section9.measure5', 'Sauvegardes sécurisées et plan de continuité')}</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section id="section-10" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                10. {getTranslation('privacy.section10.title', 'Cookies et technologies similaires')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('privacy.section10.content', 'Nous utilisons des cookies pour améliorer votre expérience utilisateur, analyser le trafic et personnaliser le contenu. Vous pouvez contrôler les cookies via les paramètres de votre navigateur. Notre politique détaillée sur les cookies est disponible dans les préférences de votre compte.')}
              </p>
            </section>

            {/* Section 11 */}
            <section id="section-11" className="mb-12 scroll-mt-20">
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                11. {getTranslation('privacy.section11.title', 'Modifications de la politique')}
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('privacy.section11.content', 'Nous nous réservons le droit de modifier cette politique de confidentialité pour refléter les évolutions légales, réglementaires ou techniques. Les modifications importantes vous seront notifiées par email ou via un avis prominent sur notre plateforme.')}
              </p>
            </section>

            {/* Contact Information */}
            <div className={`rounded-xl p-6 mt-12 transition-colors duration-300 ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {getTranslation('privacy.questions.title', 'Questions sur la confidentialité ?')}
              </h3>
              <p className={`mb-4 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getTranslation('privacy.questions.content', 'Notre Délégué à la Protection des Données (DPD) est à votre disposition pour toute question concernant la protection de vos données personnelles.')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  {getTranslation('privacy.buttons.contact', 'Contacter notre DPD')}
                </Link>
                <Link 
                  href="/legal/conditions"
                  className={`px-6 py-3 border rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getTranslation('privacy.buttons.terms', 'Conditions générales')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
