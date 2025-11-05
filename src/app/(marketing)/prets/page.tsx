import { Process } from '@/components/marketing/home/Process'
import { LoanComparison } from '@/components/marketing/prets/LoanComparison';
import { LoanFAQ } from '@/components/marketing/prets/LoanFAQ';
import { LoanProcess } from '@/components/marketing/prets/LoanProcess';
import LoansGrid from '@/components/marketing/prets/LoansGrid';
import { LoanProduct } from '@/components/marketing/prets/types';
import { LoansCta } from '@/components/shared/Cta'
import { InternalHero } from '@/components/shared/InternalHero/InternalHero'
import { LoanCalculator } from '@/components/shared/LoanCalculator/LoanCalculator';
import Link from 'next/link'

export default function PretsPage() {  

  return (
    <div className="min-h-screen">
      <InternalHero 
              title="Nos Solutions de Financement"
              subtitle="Des prêts adaptés à chaque projet, avec des conditions transparentes 
              et un accompagnement personnalisé."
              // backgroundImage="/images/about-hero-bg.jpg"
              ctaText="Obtenir un prêt"
              ctaLink="#prets"
            />
      
      {/* Produits de Prêts */}
      <LoansGrid />
      {/* Section Comment ça marche */}
      {/* <LoanComparison onLoanSelect={handleLoanSelect} />       */}
      <LoanProcess />
      <LoanCalculator />
      <LoanFAQ />

      {/* CTA Final */}
      <LoansCta />
    </div>
  )
}

// function setSelectedLoan(loan: LoanProduct) {
//   throw new Error('Function not implemented.');
// }


// function setIsModalOpen(arg0: boolean) {
//   throw new Error('Function not implemented.');
// }
