import { ContactMap } from '@/components/marketing/contact/ContactMap'
import { ContactSection } from '@/components/marketing/contact/ContactSection'
import { ContactUsCta } from '@/components/shared/Cta'
import { InternalHero } from '@/components/shared/InternalHero/InternalHero'


export default function ContactPage() {
 

  return (
    <div className="min-h-screen">
      {/* En-tête */}
     <InternalHero 
        title="Contactez-Nous"
        subtitle="Notre équipe est à votre écoute pour concrétiser vos projets"
        backgroundImage="/images/entreprise-color.jpg"
        ctaText="Demander un Rappel"
        ctaLink="#contact-form"
      />
      <ContactSection />
      <ContactMap />
      <ContactUsCta />
    </div>
  )
}