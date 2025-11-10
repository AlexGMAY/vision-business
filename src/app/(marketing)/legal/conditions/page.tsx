import { Metadata } from 'next';
import { ConditionsContent } from './component/ConditionsContent';
import { getServerTranslation } from '@/lib/i18n/server-helpers';
import { InternalHero } from '@/components/shared/InternalHero/InternalHero';

export async function generateMetadata(): Promise<Metadata> {
  const { getTranslation } = await getServerTranslation('legal');
  
  return {
    title: getTranslation('conditions.seo.title', 'Conditions Générales - Vision Business | Prêts et Financement'),
    description: getTranslation('conditions.seo.description', 'Conditions générales d\'utilisation de Vision Business. Découvrez nos termes pour les prêts personnels, professionnels et services financiers en RDC.'),
    keywords: getTranslation('conditions.seo.keywords', 'conditions générales, termes prêt, contrat financement, Vision Business RDC, microfinance Congo'),
    openGraph: {
      title: getTranslation('conditions.seo.ogTitle', 'Conditions Générales - Vision Business'),
      description: getTranslation('conditions.seo.ogDescription', 'Conditions d\'utilisation pour nos services de prêt et financement en République Démocratique du Congo'),
      type: 'website',
      locale: 'fr_FR',
    },
    alternates: {
      canonical: 'https://visionbusiness.com/conditions',
      languages: {
        'fr-FR': 'https://visionbusiness.com/conditions',
        'en-US': 'https://visionbusiness.com/en/conditions',
      },
    },
  };
}

export default function ConditionsPage() {
  return (
    <>
      <InternalHero 
        titleKey="conditions"
        subtitleKey="conditions"
        // backgroundImage="/images/legal-hero.jpg"
        // ctaKey="readConditions"
        // ctaLink="#content"
      />
      <ConditionsContent />
    </>
 );
}
