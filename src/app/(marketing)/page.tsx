import { About } from '@/components/marketing/home/About';
import { FAQ } from '@/components/marketing/home/Faqs';
import { Hero } from '@/components/marketing/home/Hero';
import { Loans } from '@/components/marketing/home/Loans';
import { Process } from '@/components/marketing/home/Process';
import { Testimonial } from '@/components/marketing/home/Testimonial';
import { TrustBar } from '@/components/marketing/home/TrustBar';
import { WhyChooseUs } from '@/components/marketing/home/WhyChooseUs';
import { HomepageCta } from '@/components/shared/Cta';
import { LoanCalculator } from '@/components/shared/LoanCalculator/LoanCalculator'; // Add this import

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrustBar />
      <About />      
      <Loans />      
      <WhyChooseUs />
      <Process />
      <Testimonial />  
      <LoanCalculator /> {/* Add it here - perfect placement! */}
      <FAQ /> 
      <HomepageCta />   
    </div>
  );
}