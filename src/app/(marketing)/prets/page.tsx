'use client';

import { FAQ } from '@/components/marketing/home/Faqs';
import { EligibilityChecker } from '@/components/marketing/prets/EligibilityChecker';
import { LoanFAQ } from '@/components/marketing/prets/LoanFAQ';
import { LoanModal } from '@/components/marketing/prets/LoanModal';
import { LoanProcess } from '@/components/marketing/prets/LoanProcess';
import LoansGrid from '@/components/marketing/prets/LoansGrid';
import { SuccessStories } from '@/components/marketing/prets/SuccessStories';
import { LoanProduct } from '@/components/marketing/prets/types';
import { LoansCta } from '@/components/shared/Cta'
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import { InternalHero } from '@/components/shared/InternalHero/InternalHero'
import { Calculator } from '@/components/shared/LoanCalculator/Calculator';
import { LoanCalculator } from '@/components/shared/LoanCalculator/LoanCalculator';
import { useState } from 'react';


export default function PretsPage() {  

   const { isDark } = useDarkMode();
  const [selectedLoan, setSelectedLoan] = useState<LoanProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoanSelect = (loan: LoanProduct) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLoan(null), 300);
  };

  return (
    <div className="min-h-screen">
      <InternalHero 
        title="Nos Solutions de Financement"
        subtitle="Des prêts adaptés à chaque projet, avec des conditions transparentes 
          et un accompagnement personnalisé."
        // backgroundImage="/images/about-hero-bg.jpg"
        ctaText="Voir tous nos prêts"
        ctaLink="#prets"
      />
      
      {/* Produits de Prêts */}
      <LoansGrid />
      {/* Section Comment ça marche */}      
      <LoanProcess />      
      {/* FAQs */}
      <LoanFAQ />
      {/* Eligibility Checker */}
      <EligibilityChecker onLoanRecommend={handleLoanSelect} />

      {/* Calculator */}
      {/* <LoanCalculator /> */}
      <Calculator />

      {/* Testimonials */}
      <SuccessStories />

      {/* CTA Final */}
      <LoansCta />

      <LoanModal 
        loan={selectedLoan} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        isDark={isDark}
      />
    </div>
  )
}
