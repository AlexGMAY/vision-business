import { Metadata } from 'next';
import { ConformiteContent } from './component/ConformiteContent';
import { getServerTranslation } from '@/lib/i18n/server-helpers';
import { InternalHero } from '@/components/shared/InternalHero/InternalHero';


export async function generateMetadata(): Promise<Metadata> {
  const { getTranslation } = await getServerTranslation('legal');
  
  return {
    title: getTranslation('compliance.seo.title', 'Conformité Réglementaire - Vision Business | Règlementation Financière RDC'),
    description: getTranslation('compliance.seo.description', 'Politique de conformité réglementaire de Vision Business. Découvrez notre engagement pour des services financiers transparents et conformes en République Démocratique du Congo.'),
    keywords: getTranslation('compliance.seo.keywords', 'conformité réglementaire, régulation financière, BCC RDC, lutte anti-fraude, KYC, AML, Vision Business conformité'),
    openGraph: {
      title: getTranslation('compliance.seo.ogTitle', 'Conformité Réglementaire - Vision Business'),
      description: getTranslation('compliance.seo.ogDescription', 'Notre engagement pour des services financiers transparents et conformes aux réglementations en RDC'),
      type: 'website',
      locale: 'fr_FR',
    },
    alternates: {
      canonical: 'https://visionbusiness.com/conformite',
      languages: {
        'fr-FR': 'https://visionbusiness.com/conformite',
        'en-US': 'https://visionbusiness.com/en/compliance',
      },
    },
  };
}

export default function ConformitePage() {
  return (
    <>
      <InternalHero 
        title="Conformité Réglementaire"
        subtitle="Notre engagement à respecter les régulations"
      />
      <ConformiteContent />
    </>
  );
}