'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import { ProgressTracker } from './ProgressTracker';
import { BusinessInfoForm } from './steps/BusinessInfoForm';
import { DocumentUpload } from './steps/DocumentUpload';
import { LoanDetailsForm } from './steps/LoanDetailsForm';
import { PersonalInfoForm } from './steps/PersonalInfoForm';
import { ReviewSubmit } from './steps/ReviewSubmit';


export type ApplicationStep = 
  | 'personal'
  | 'business' 
  | 'loan'
  | 'documents'
  | 'review';


export function ApplicationLayout() {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('personal');
  const [formData, setFormData] = useState<any>({});

  const steps: { id: ApplicationStep; title: string }[] = [
    { id: 'personal', title: t('application.steps.personal', 'Informations Personnelles') },
    { id: 'business', title: t('application.steps.business', 'Informations Entreprise') },
    { id: 'loan', title: t('application.steps.loan', 'Détails du Prêt') },
    { id: 'documents', title: t('application.steps.documents', 'Documents') },
    { id: 'review', title: t('application.steps.review', 'Récapitulatif') },
  ];

  const handleNextStep = (data: any) => {
    setFormData((prev: any) => {
      let updatedData = { ...prev };
      
      // Handle each step specifically
      switch (currentStep) {
        case 'personal':
          updatedData.personalInfo = data;
          break;
        case 'business':
          updatedData.businessInfo = data;
          break;
        case 'loan':
          updatedData.loanDetails = data;
          break;
        case 'documents':
          updatedData.documents = data;
          break;
        case 'review':
          // For review, we might get updated terms acceptance
          updatedData = { ...prev, ...data };
          break;
      }
      
      console.log('Updated form data:', updatedData);
      return updatedData;
    });
    
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const renderStep = () => {
    const stepProps = {
      data: formData,
      onNext: handleNextStep,
      onPrevious: handlePreviousStep,
      isFirstStep: currentStep === 'personal',
      isLastStep: currentStep === 'review',
    };

    switch (currentStep) {
      case 'personal':
        return <PersonalInfoForm {...stepProps} />;
      case 'business':
        return <BusinessInfoForm {...stepProps} />;
      case 'loan':
        return <LoanDetailsForm {...stepProps} />;
      case 'documents':
        return <DocumentUpload {...stepProps} />;
      case 'review':
        return <ReviewSubmit {...stepProps} />;
      default:
        return <PersonalInfoForm {...stepProps} />;
    }
  };

  return (
    <div className={`min-h-screen py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('application.title', 'Demande de Prêt')}
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('application.subtitle', 'Remplissez votre demande en 5 étapes simples et sécurisées')}
          </p>
        </motion.div>

        {/* Progress Tracker */}
        <ProgressTracker 
          steps={steps} 
          currentStep={currentStep} 
          className="mb-8" 
        />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-8 p-4 rounded-lg border ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-gray-300' 
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="text-lg">🔒</div>
            <div>
              <p className="font-semibold">
                {t('application.security.title', 'Vos données sont sécurisées')}
              </p>
              <p className="text-sm mt-1">
                {t('application.security.description', 
                  'Toutes vos informations sont chiffrées et protégées. Nous respectons votre vie privée.')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}