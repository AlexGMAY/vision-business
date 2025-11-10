import { OurStory } from '@/components/marketing/about/OurStory'
import { MissionValues } from '@/components/marketing/about/MissionValues'
import { AboutCta } from '@/components/shared/Cta'
import { InternalHero } from '@/components/shared/InternalHero/InternalHero'
import { Achievements } from '@/components/marketing/about/Achievements'
import { LeadershipTeam } from '@/components/marketing/about/LeadershipTeam'
import { CertificationsCompliance } from '@/components/marketing/about/CertificationsCompliance'
import { CompanyCulture } from '@/components/marketing/about/CompanyCulture'
import { CorporateSocialResponsibility } from '@/components/marketing/about/CorporateSocialResponsibility'

export default function page() {
  return (
    <div className="min-h-screen">      
      <InternalHero 
        titleKey="about"
        subtitleKey="about"
        ctaKey="seeOurTeam"
        ctaLink="#leadership"
      />
      <OurStory />
      <MissionValues />
      <LeadershipTeam />
      <Achievements />
      <CorporateSocialResponsibility />
      <CompanyCulture />
      <CertificationsCompliance />
      <AboutCta />
    </div>
  )
}