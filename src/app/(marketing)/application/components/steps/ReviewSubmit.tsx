'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import { ApplicationService } from '@/lib/api/application-service';
import { validateClientApplication, prepareDocumentsForApi, safeValidateClientApplication } from '@/lib/security/schema';
import { uploadAllFiles } from '@/lib/utils/file-upload';
import z from 'zod';

interface ReviewSubmitProps {
  data: any;
  onNext: (data: any) => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function ReviewSubmit({ data, onPrevious, isFirstStep, isLastStep }: ReviewSubmitProps) {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<string | undefined>(undefined);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const { personalInfo, businessInfo, loanDetails, documents } = data;

  // const handleSubmit = async () => {
  //   if (!termsAccepted || !privacyAccepted) {
  //     alert(t('application.review.acceptTerms', 'Veuillez accepter les conditions générales et la politique de confidentialité'));
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const completeData = {
  //       ...data,
  //       termsAccepted: true,
  //       privacyAccepted: true
  //     };

  //     const result = await ApplicationService.submitApplication(completeData);
      
  //     if (result.success) {
  //       setApplicationId(result.applicationId);
  //       setIsSubmitted(true);
  //     } else {
  //       alert(result.error || t('application.review.submissionError', 'Erreur lors de la soumission'));
  //     }
  //   } catch (error) {
  //     console.error('Submission error:', error);
  //     alert(t('application.review.submissionError', 'Erreur lors de la soumission'));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // In your ReviewSubmit.tsx or form component
  const handleSubmit = async () => {
  if (!termsAccepted || !privacyAccepted) {
    alert(t('application.review.acceptTerms', 'Veuillez accepter les conditions générales et la politique de confidentialité'));
    return;
  }

  setIsLoading(true);
  try {
    // 1. Safe validation with defaults
    const validationResult = safeValidateClientApplication({
      ...data,
      termsAccepted: true,
      privacyAccepted: true
    });

    // When using Zod, errors are accessed through the format() method
    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error.format());
      alert('Please check your form data and try again.');
      return;
    }

    // 2. Upload files and get URLs
    const fileUploads = await uploadAllFiles(data.documents);
    
    // 3. Prepare data for API submission
    const completeData = {
      ...data,
      documents: prepareDocumentsForApi(data.documents),
      fileUploads,
      termsAccepted: true,
      privacyAccepted: true
    };

    // 4. Submit application data
    const result = await ApplicationService.submitApplication(completeData);
    
    if (result.success) {
      setApplicationId(result.applicationId);
      setIsSubmitted(true);
    } else {
      alert(result.error || t('application.review.submissionError', 'Erreur lors de la soumission'));
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert(t('application.review.submissionError', 'Erreur lors de la soumission'));
  } finally {
    setIsLoading(false);
  }
};
 
  
 


  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        } text-center`}
      >
        <div className="text-6xl mb-6">🎉</div>
        <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('application.review.successTitle', 'Demande Soumise avec Succès!')}
        </h2>
        <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('application.review.successMessage', 'Votre demande de prêt a été reçue et est en cours de traitement.')}
        </p>

        <div className={`p-6 rounded-xl mb-6 text-left ${
          isDark ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('application.review.nextSteps', 'Prochaines Étapes')}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">1</div>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {t('application.review.step1', 'Révision initiale (24-48 heures)')}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">2</div>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {t('application.review.step2', 'Vérification des documents')}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">3</div>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {t('application.review.step3', 'Analyse de crédit')}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">4</div>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {t('application.review.step4', 'Décision finale et accès au portail')}
              </span>
            </div>
          </div>
        </div>

        {applicationId && (
          <div className={`p-4 rounded-xl mb-6 ${
            isDark ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`font-semibold ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
              {t('application.review.reference', 'Numéro de référence')}
            </p>
            <p className={`text-2xl font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {applicationId}
            </p>
          </div>
        )}

        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {t('application.review.confirmationEmail', 'Un email de confirmation vous a été envoyé avec tous les détails.')}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      <div className="text-center mb-6">
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('application.review.title', 'Récapitulatif de Votre Demande')}
        </h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('application.review.subtitle', 'Vérifiez les informations avant de soumettre votre demande')}
        </p>
      </div>

      {/* Personal Information Review */}
      <div className="mb-6">
        <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('application.review.personalInfo', 'Informations Personnelles')}
        </h4>
        <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('application.personal.firstName', 'Prénom')}
              </p>
              <p className={isDark ? 'text-white' : 'text-gray-900'}>{personalInfo?.firstName}</p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('application.personal.lastName', 'Nom')}
              </p>
              <p className={isDark ? 'text-white' : 'text-gray-900'}>{personalInfo?.lastName}</p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
              <p className={isDark ? 'text-white' : 'text-gray-900'}>{personalInfo?.email}</p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('application.personal.phone', 'Téléphone')}
              </p>
              <p className={isDark ? 'text-white' : 'text-gray-900'}>{personalInfo?.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Business Information Review (if exists) */}
      {businessInfo && (
        <div className="mb-6">
          <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('application.review.businessInfo', 'Informations Entreprise')}
          </h4>
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('application.business.name', 'Nom de l\'entreprise')}
                </p>
                <p className={isDark ? 'text-white' : 'text-gray-900'}>{businessInfo.businessName}</p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('application.business.type', 'Type d\'entreprise')}
                </p>
                <p className={isDark ? 'text-white' : 'text-gray-900'}>{businessInfo.businessType}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loan Details Review */}
      <div className="mb-6">
        <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('application.review.loanDetails', 'Détails du Prêt')}
        </h4>
        <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('application.loan.type', 'Type de prêt')}
              </p>
              <p className={isDark ? 'text-white' : 'text-gray-900'}>{loanDetails?.loanType}</p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('application.loan.amount', 'Montant')}
              </p>
              <p className={isDark ? 'text-white' : 'text-gray-900'}>
                {loanDetails?.loanAmount?.toLocaleString()} $
              </p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('application.loan.term', 'Durée')}
              </p>
              <p className={isDark ? 'text-white' : 'text-gray-900'}>
                {loanDetails?.loanTerm} {t('application.loan.months', 'mois')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-6">
        <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('application.review.terms', 'Conditions Générales')}
        </h4>
        
        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
            />
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              {t('application.review.termsAccept', 'J\'accepte les conditions générales d\'utilisation et les termes du prêt')}
            </span>
          </label>

          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
            />
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              {t('application.review.privacyAccept', 'J\'accepte la politique de confidentialité et le traitement de mes données personnelles')}
            </span>
          </label>
        </div>
      </div>

      {/* Final Security Notice */}
      <div className={`p-4 rounded-lg border mb-6 ${
        isDark ? 'bg-yellow-600/20 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-start space-x-3">
          <div className="text-yellow-500 text-lg">⚠️</div>
          <div>
            <p className={`font-semibold ${isDark ? 'text-yellow-300' : 'text-yellow-800'}`}>
              {t('application.review.finalNotice', 'Dernière vérification')}
            </p>
            <p className={`text-sm mt-1 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
              {t('application.review.finalNoticeDesc', 'En soumettant cette demande, vous confirmez que toutes les informations fournies sont exactes et complètes. Toute fausse déclaration peut entraîner le rejet de votre demande.')}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <motion.button
          type="button"
          onClick={onPrevious}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            isDark
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ← {t('application.previous', 'Précédent')}
        </motion.button>

        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !termsAccepted || !privacyAccepted}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
            isLoading || !termsAccepted || !privacyAccepted
              ? 'bg-gray-400 cursor-not-allowed'
              : isDark
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{t('application.loading', 'Chargement...')}</span>
            </span>
          ) : (
            t('application.review.submit', 'Soumettre ma Demande')
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

function onSuccess() {
    throw new Error('Function not implemented.');
}


function setError(arg0: string) {
    throw new Error('Function not implemented.');
}


function setSubmitting(arg0: boolean) {
    throw new Error('Function not implemented.');
}
