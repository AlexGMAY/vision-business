import { FAQ } from '@/components/marketing/home/Faqs'
import { Process } from '@/components/marketing/home/Process'
import { ContactCta } from '@/components/shared/Cta'
import { InternalHero } from '@/components/shared/InternalHero/InternalHero'
import React from 'react'

const page = () => {
  return (
    <div>
      <InternalHero 
        title="Comment ca marche chez Vision Business"
        subtitle="Notre Histoire, Notre Mission, Votre Réussite"
        // backgroundImage="/images/about-hero-bg.jpg"
        ctaText="Découvrir Notre Équipe"
        ctaLink="#leadership"
      />
        <Process />
        <FAQ />
        <ContactCta />
    </div>
  )
}

export default page