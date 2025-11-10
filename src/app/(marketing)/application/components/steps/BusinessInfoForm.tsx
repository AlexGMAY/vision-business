'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import { businessInfoSchema, type BusinessInfo } from '@/lib/security/schema';

interface BusinessInfoFormProps {
  data: any;
  onNext: (data: BusinessInfo) => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function BusinessInfoForm({ data, onNext, onPrevious, isFirstStep, isLastStep }: BusinessInfoFormProps) {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BusinessInfo>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: data.businessInfo || {}
  });

  const onSubmit = async (formData: BusinessInfo) => {
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
            {t('application.business.title', 'Informations de l\'Entreprise')}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('application.business.subtitle', 'Renseignez les détails de votre entreprise (optionnel pour les prêts personnels)')}
          </p>
        </div>

        {/* Business Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('application.business.name', 'Nom de l\'entreprise')} *
            </label>
            <input
              type="text"
              {...register('businessName')}
              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                errors.businessName 
                  ? 'border-red-500 focus:border-red-500' 
                  : isDark 
                  ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                  : 'border-gray-300 focus:border-blue-500 bg-white'
              }`}
              placeholder={t('application.business.namePlaceholder', 'Nom officiel de l\'entreprise')}
            />
            {errors.businessName && (
              <p className="mt-1 text-sm text-red-500">{errors.businessName.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('application.business.type', 'Type d\'entreprise')} *
            </label>
            <select
              {...register('businessType')}
              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                errors.businessType 
                  ? 'border-red-500 focus:border-red-500' 
                  : isDark 
                  ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                  : 'border-gray-300 focus:border-blue-500 bg-white'
              }`}
            >
              <option value="">{t('application.business.selectType', 'Sélectionnez')}</option>
              <option value="sole_proprietorship">{t('application.business.soleProprietorship', 'Entreprise individuelle')}</option>
              <option value="llc">{t('application.business.llc', 'SARL')}</option>
              <option value="corporation">{t('application.business.corporation', 'SA')}</option>
              <option value="partnership">{t('application.business.partnership', 'Société en nom collectif')}</option>
              <option value="non_profit">{t('application.business.nonProfit', 'Association sans but lucratif')}</option>
            </select>
            {errors.businessType && (
              <p className="mt-1 text-sm text-red-500">{errors.businessType.message}</p>
            )}
          </div>
        </div>

        {/* Registration & Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('application.business.registrationNumber', 'Numéro d\'immatriculation')} *
            </label>
            <input
              type="text"
              {...register('registrationNumber')}
              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                errors.registrationNumber 
                  ? 'border-red-500 focus:border-red-500' 
                  : isDark 
                  ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                  : 'border-gray-300 focus:border-blue-500 bg-white'
              }`}
              placeholder={t('application.business.registrationPlaceholder', 'Numéro RC')}
            />
            {errors.registrationNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.registrationNumber.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('application.business.industry', 'Secteur d\'activité')} *
            </label>
            <input
              type="text"
              {...register('industry')}
              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                errors.industry 
                  ? 'border-red-500 focus:border-red-500' 
                  : isDark 
                  ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                  : 'border-gray-300 focus:border-blue-500 bg-white'
              }`}
              placeholder={t('application.business.industryPlaceholder', 'Ex: Commerce, Services, Industrie')}
            />
            {errors.industry && (
              <p className="mt-1 text-sm text-red-500">{errors.industry.message}</p>
            )}
          </div>
        </div>

        {/* Business Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('application.business.age', 'Âge de l\'entreprise (années)')} *
            </label>
            <input
              type="number"
              {...register('businessAge', { valueAsNumber: true })}
              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                errors.businessAge 
                  ? 'border-red-500 focus:border-red-500' 
                  : isDark 
                  ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                  : 'border-gray-300 focus:border-blue-500 bg-white'
              }`}
              placeholder="0"
              min="0"
            />
            {errors.businessAge && (
              <p className="mt-1 text-sm text-red-500">{errors.businessAge.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('application.business.revenue', 'Chiffre d\'affaires annuel (USD)')} *
            </label>
            <input
              type="number"
              {...register('annualRevenue', { valueAsNumber: true })}
              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                errors.annualRevenue 
                  ? 'border-red-500 focus:border-red-500' 
                  : isDark 
                  ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                  : 'border-gray-300 focus:border-blue-500 bg-white'
              }`}
              placeholder="0"
              min="0"
            />
            {errors.annualRevenue && (
              <p className="mt-1 text-sm text-red-500">{errors.annualRevenue.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('application.business.employees', 'Nombre d\'employés')} *
            </label>
            <input
              type="number"
              {...register('employeeCount', { valueAsNumber: true })}
              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                errors.employeeCount 
                  ? 'border-red-500 focus:border-red-500' 
                  : isDark 
                  ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                  : 'border-gray-300 focus:border-blue-500 bg-white'
              }`}
              placeholder="0"
              min="0"
            />
            {errors.employeeCount && (
              <p className="mt-1 text-sm text-red-500">{errors.employeeCount.message}</p>
            )}
          </div>
        </div>

        {/* Website (Optional) */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('application.business.website', 'Site web (optionnel)')}
          </label>
          <input
            type="url"
            {...register('website')}
            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
              errors.website 
                ? 'border-red-500 focus:border-red-500' 
                : isDark 
                ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                : 'border-gray-300 focus:border-blue-500 bg-white'
            }`}
            placeholder="https://www.example.com"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-500">{errors.website.message}</p>
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