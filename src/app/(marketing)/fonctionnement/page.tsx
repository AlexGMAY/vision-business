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
        titleKey="howitworks"
        subtitleKey="howitworks"
        ctaKey="learnMore"
        ctaLink="#process"
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