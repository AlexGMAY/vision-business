'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import { loanDetailsSchema, type LoanDetails } from '@/lib/security/schema';

interface LoanDetailsFormProps {
  data: any;
  onNext: (data: LoanDetails) => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function LoanDetailsForm({ data, onNext, onPrevious, isFirstStep, isLastStep }: LoanDetailsFormProps) {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [hasCollateral, setHasCollateral] = useState(data.loanDetails?.collateral?.hasCollateral || false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<LoanDetails>({
    resolver: zodResolver(loanDetailsSchema),
    defaultValues: data.loanDetails || {
      loanAmount: 5000,
      loanTerm: 24,
      collateral: { hasCollateral: false }
    }
  });

  const loanAmount = watch('loanAmount');
  const loanTerm = watch('loanTerm');
  const loanType = watch('loanType');

  // Calculate estimated monthly payment
  const estimatedPayment = useMemo(() => {
    if (!loanAmount || !loanTerm) return 0;
    
    // Simple calculation - in real app, use proper formula with interest rates
    const monthlyRate = 0.0083; // ~10% annual
    const payment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm) / 
                   (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    return Math.round(payment);
  }, [loanAmount, loanTerm]);

  const loanTypes = [
    { id: 'personal', name: t('application.loan.personal', 'Prêt Personnel'), maxAmount: 25000 },
    { id: 'business', name: t('application.loan.business', 'Prêt Entreprise'), maxAmount: 100000 },
    { id: 'emergency', name: t('application.loan.emergency', 'Prêt Urgence'), maxAmount: 10000 },
    { id: 'equipment', name: t('application.loan.equipment', 'Prêt Équipement'), maxAmount: 50000 },
    { id: 'startup', name: t('application.loan.startup', 'Prêt Démarrage'), maxAmount: 30000 },
    { id: 'growth', name: t('application.loan.growth', 'Prêt Croissance'), maxAmount: 100000 },
  ];

  const onSubmit = async (formData: LoanDetails) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onNext(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedLoanType = loanTypes.find(type => type.id === loanType);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-6">
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('application.loan.title', 'Détails du Prêt')}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('application.loan.subtitle', 'Choisissez le type de prêt et les conditions qui vous conviennent')}
          </p>
        </div>

        {/* Loan Type Selection */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('application.loan.type', 'Type de prêt')} *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {loanTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setValue('loanType', type.id as any)}
                className={`p-4 rounded-xl text-center transition-all duration-200 border-2 ${
                  loanType === type.id
                    ? isDark
                      ? 'border-blue-500 bg-blue-500/20 text-white'
                      : 'border-blue-500 bg-blue-50 text-blue-700'
                    : isDark
                    ? 'border-gray-700 bg-gray-700/50 text-gray-300 hover:border-gray-600'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{type.name}</div>
                <div className="text-xs opacity-75">
                  Jusqu'à {type.maxAmount.toLocaleString()} $
                </div>
              </button>
            ))}
          </div>
          <input type="hidden" {...register('loanType')} />
          {errors.loanType && (
            <p className="mt-1 text-sm text-red-500">{errors.loanType.message}</p>
          )}
        </div>

        {/* Loan Amount & Term */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loan Amount */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('application.loan.amount', 'Montant du prêt')} *
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="1000"
                max={selectedLoanType?.maxAmount || 100000}
                step="1000"
                {...register('loanAmount', { valueAsNumber: true })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  1,000 $
                </span>
                <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loanAmount?.toLocaleString()} $
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {(selectedLoanType?.maxAmount || 100000).toLocaleString()} $
                </span>
              </div>
            </div>
            {errors.loanAmount && (
              <p className="mt-1 text-sm text-red-500">{errors.loanAmount.message}</p>
            )}
          </div>

          {/* Loan Term */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('application.loan.term', 'Durée du prêt')} *
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="6"
                max="84"
                step="6"
                {...register('loanTerm', { valueAsNumber: true })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  6 {t('application.loan.months', 'mois')}
                </span>
                <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loanTerm} {t('application.loan.months', 'mois')}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  7 {t('application.loan.years', 'ans')}
                </span>
              </div>
            </div>
            {errors.loanTerm && (
              <p className="mt-1 text-sm text-red-500">{errors.loanTerm.message}</p>
            )}
          </div>
        </div>

        {/* Estimated Payment */}
        {estimatedPayment > 0 && (
          <div className={`p-4 rounded-xl text-center ${
            isDark ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
              {t('application.loan.estimatedPayment', 'Mensualité estimée')}
            </p>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {estimatedPayment.toLocaleString()} $ / {t('application.loan.month', 'mois')}
            </p>
          </div>
        )}

        {/* Loan Purpose */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('application.loan.purpose', 'Objet du prêt')} *
          </label>
          <textarea
            rows={4}
            {...register('loanPurpose')}
            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
              errors.loanPurpose 
                ? 'border-red-500 focus:border-red-500' 
                : isDark 
                ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                : 'border-gray-300 focus:border-blue-500 bg-white'
            }`}
            placeholder={t('application.loan.purposePlaceholder', 'Décrivez en détail l\'utilisation prévue des fonds...')}
          />
          {errors.loanPurpose && (
            <p className="mt-1 text-sm text-red-500">{errors.loanPurpose.message}</p>
          )}
        </div>

        {/* Collateral */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('application.loan.collateral', 'Garanties')}
          </label>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={hasCollateral}
                onChange={(e) => {
                  setHasCollateral(e.target.checked);
                  setValue('collateral.hasCollateral', e.target.checked);
                }}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {t('application.loan.hasCollateral', 'Je dispose de garanties à offrir')}
              </span>
            </label>

            {hasCollateral && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-7">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('application.loan.collateralType', 'Type de garantie')}
                  </label>
                  <input
                    type="text"
                    {...register('collateral.collateralType')}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                      isDark 
                        ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                        : 'border-gray-300 focus:border-blue-500 bg-white'
                    }`}
                    placeholder={t('application.loan.collateralTypePlaceholder', 'Ex: Immobilier, Véhicule...')}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('application.loan.collateralValue', 'Valeur estimée (USD)')}
                  </label>
                  <input
                    type="number"
                    {...register('collateral.collateralValue', { valueAsNumber: true })}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                      isDark 
                        ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                        : 'border-gray-300 focus:border-blue-500 bg-white'
                    }`}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Disbursement Method */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('application.loan.disbursement', 'Mode de déblocage préféré')} *
          </label>
          <select
            {...register('preferredDisbursement')}
            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
              errors.preferredDisbursement 
                ? 'border-red-500 focus:border-red-500' 
                : isDark 
                ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                : 'border-gray-300 focus:border-blue-500 bg-white'
            }`}
          >
            <option value="">{t('application.loan.selectDisbursement', 'Sélectionnez')}</option>
            <option value="bank_transfer">{t('application.loan.bankTransfer', 'Virement bancaire')}</option>
            <option value="mobile_money">{t('application.loan.mobileMoney', 'Mobile Money')}</option>
            <option value="check">{t('application.loan.check', 'Chèque')}</option>
          </select>
          {errors.preferredDisbursement && (
            <p className="mt-1 text-sm text-red-500">{errors.preferredDisbursement.message}</p>
          )}
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
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t('application.loading', 'Chargement...')}</span>
              </span>
            ) : (
              t('application.next', 'Suivant')
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}