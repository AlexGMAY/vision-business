import { Metadata } from 'next';
import { ConfidentialiteContent } from './component/ConfidentialiteContent';
import { getServerTranslation } from '@/lib/i18n/server-helpers';
import { InternalHero } from '@/components/shared/InternalHero/InternalHero';


export async function generateMetadata(): Promise<Metadata> {
  const { getTranslation } = await getServerTranslation('legal');
  
  return {
    title: getTranslation('privacy.seo.title', 'Politique de Confidentialité - Vision Business | Protection des Données'),
    description: getTranslation('privacy.seo.description', 'Politique de confidentialité de Vision Business. Découvrez comment nous protégeons vos données personnelles dans le cadre de nos services financiers en RDC.'),
    keywords: getTranslation('privacy.seo.keywords', 'confidentialité données, protection vie privée, RGPD RDC, données personnelles, Vision Business sécurité'),
    openGraph: {
      title: getTranslation('privacy.seo.ogTitle', 'Politique de Confidentialité - Vision Business'),
      description: getTranslation('privacy.seo.ogDescription', 'Comment nous protégeons vos données personnelles dans nos services de prêt et financement'),
      type: 'website',
      locale: 'fr_FR',
    },
    alternates: {
      canonical: 'https://visionbusiness.com/legal/confidentialite',
      languages: {
        'fr-FR': 'https://visionbusiness.com/legal/confidentialite',
        'en-US': 'https://visionbusiness.com/legal/en/privacy',
      },
    },
  };
}

export default function ConfidentialitePage() {
  return (
    <>
     <InternalHero
        title="Politique de Confidentialité"
        subtitle="Comment nous protégeons vos données" 
     />
      <ConfidentialiteContent />
    </>
  );
}
