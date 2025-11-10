'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import Link from 'next/link';

interface SuccessStory {
  id: string;
  name: string;
  business: string;
  loanType: string;
  amount: string;
  duration: string;
  result: string;
  metrics: {
    label: string;
    value: string;
  }[];
  testimonial: string;
}

export const SuccessStories: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();

  // Helper function for success stories translations
  const getSuccessTranslation = (key: string, fallback: string) => {
    const translation = t('prets', key);
    return translation && translation !== key ? translation : fallback;
  };

  // Helper function for loan type translations
  const getLoanTypeTranslation = (loanType: string) => {
    const translationKey = `filters.${loanType.split('-')[0]}`;
    const translation = t('prets', translationKey);
    return translation && translation !== translationKey ? translation : loanType;
  };

  const successStories: SuccessStory[] = [
    {
      id: 'tech-startup',
      name: "Marie K.",
      business: "Tech Startup SARL",
      loanType: "startup",
      amount: "50,000 USD",
      duration: "24 mois",
      result: "Croissance de 300% en 18 mois",
      metrics: [
        { label: "ROI", value: "250%" },
        { label: "Emplois créés", value: "8" },
        { label: "Chiffre d'affaires", value: "+300%" }
      ],
      testimonial: "Le prêt startup nous a permis de lancer notre plateforme et d'embaucher notre première équipe. Sans ce financement, nous n'aurions jamais pu croître aussi rapidement."
    },
    {
      id: 'agriculture',
      name: "Jean M.",
      business: "Ferme Agricole",
      loanType: "agriculture",
      amount: "25,000 USD",
      duration: "36 mois",
      result: "Modernisation complète de l'exploitation",
      metrics: [
        { label: "Productivité", value: "+150%" },
        { label: "Surface cultivée", value: "+80%" },
        { label: "Exportations", value: "+200%" }
      ],
      testimonial: "Avec le prêt agriculture, j'ai pu acheter de nouvelles machines et étendre mes cultures. Maintenant, j'exporte vers 3 pays voisins."
    },
    {
      id: 'women-entrepreneur',
      name: "Sophie T.",
      business: "Salon de Beauté",
      loanType: "women",
      amount: "15,000 USD",
      duration: "18 mois",
      result: "Ouverture d'une seconde succursale",
      metrics: [
        { label: "Clients/mois", value: "+120%" },
        { label: "Chiffre d'affaires", value: "+180%" },
        { label: "Employées femmes", value: "6" }
      ],
      testimonial: "Le prêt spécial femmes m'a offert des conditions adaptées et un accompagnement personnalisé. Aujourd'hui, j'ai créé 6 emplois pour des femmes de ma communauté."
    }
  ];

  return (
    <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {getSuccessTranslation('successStories.title', 'Histoires de Réussite')}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {getSuccessTranslation('successStories.subtitle', 'Découvrez comment nos clients ont transformé leurs projets en succès')}
          </p>
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-2xl overflow-hidden ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
              {/* Story Header */}
              <div className={`p-6 ${isDark ? 'bg-blue-600' : 'bg-blue-500'} text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{story.name}</h3>
                    <p className="text-blue-100">{story.business}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm">
                      {getLoanTypeTranslation(story.loanType)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-200">
                      {getSuccessTranslation('successStories.amount', 'Montant')}
                    </p>
                    <p className="font-semibold">{story.amount}</p>
                  </div>
                  <div>
                    <p className="text-blue-200">
                      {getSuccessTranslation('successStories.duration', 'Durée')}
                    </p>
                    <p className="font-semibold">{story.duration}</p>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {getSuccessTranslation('successStories.results', 'Résultats Obtenus')}
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {story.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <p className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        {metric.value}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {getSuccessTranslation(`successStories.metrics.${metric.label.toLowerCase()}`, metric.label)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">❝</div>
                  <p className={`flex-1 italic ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    "{story.testimonial}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {getSuccessTranslation('successStories.cta.title', 'Prêt à écrire votre histoire de réussite ?')}
          </h3>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {getSuccessTranslation('successStories.cta.subtitle', 'Rejoignez nos milliers de clients satisfaits')}
          </p>
          <Link href={"/application"}>
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-xl font-bold text-lg ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } transition-all duration-200`}
            >
                {getSuccessTranslation('successStories.cta.button', 'Commencer ma demande')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};