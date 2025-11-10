import { FAQ } from '@/components/marketing/home/Faqs'
import { Process } from '@/components/marketing/home/Process'
import { SuccessStories } from '@/components/marketing/prets/SuccessStories'
import { ContactCta } from '@/components/shared/Cta'
import { InternalHero } from '@/components/shared/InternalHero/InternalHero'
import { Calculator } from '@/components/shared/LoanCalculator/Calculator'
import React from 'react'

const page = () => {
  return (
    <div>
      <InternalHero 
        title="Comment ca marche chez Vision Business"
        subtitle="Notre processus en 4 étapes simples a été conçu pour vous offrir une expérience de financement rapide, transparente et sans stress."
        // backgroundImage="/images/about-hero-bg.jpg"
        // ctaText="Découvrir Notre Équipe"
        // ctaLink="#leadership"
      />
      <Process />
      <FAQ />
      {/* Calculator */}            
      <Calculator />
      {/* Testimonials */}
      <SuccessStories />
      <ContactCta />
    </div>
  )
}

export default page