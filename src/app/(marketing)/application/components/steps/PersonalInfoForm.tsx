'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import { PersonalInfo, personalInfoSchema } from '@/lib/security/schema';
// import { personalInfoSchema, type PersonalInfo } from '@/lib/security/schemas';

interface PersonalInfoFormProps {
  data: any;
  onNext: (data: PersonalInfo) => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function PersonalInfoForm({ data, onNext, onPrevious, isFirstStep, isLastStep }: PersonalInfoFormProps) {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data.personalInfo || {}
  });

  // const employmentStatus = watch('employmentStatus');

  const onSubmit = async (formData: PersonalInfo) => {
    setIsLoading(true);
    try {
      // Simulate API call/validation
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
        {/* Personal Details */}
        <div>
          <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('application.personal.details', 'Informations Personnelles')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('application.personal.firstName', 'Prénom')} *
              </label>
              <input
                type="text"
                {...register('firstName')}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  errors.firstName 
                    ? 'border-red-500 focus:border-red-500' 
                    : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white'
                }`}
                placeholder={t('application.personal.firstNamePlaceholder', 'Votre prénom')}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('application.personal.lastName', 'Nom')} *
              </label>
              <input
                type="text"
                {...register('lastName')}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  errors.lastName 
                    ? 'border-red-500 focus:border-red-500' 
                    : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white'
                }`}
                placeholder={t('application.personal.lastNamePlaceholder', 'Votre nom')}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('application.personal.email', 'Email')} *
              </label>
              <input
                type="email"
                {...register('email')}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500' 
                    : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white'
                }`}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('application.personal.phone', 'Téléphone')} *
              </label>
              <input
                type="tel"
                {...register('phone')}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  errors.phone 
                    ? 'border-red-500 focus:border-red-500' 
                    : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white'
                }`}
                placeholder="+243 XX XXX XXXX"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('application.personal.address', 'Adresse')}
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('application.personal.street', 'Rue et numéro')} *
              </label>
              <input
                type="text"
                {...register('address.street')}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  errors.address?.street 
                    ? 'border-red-500 focus:border-red-500' 
                    : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white'
                }`}
                placeholder={t('application.personal.streetPlaceholder', 'Nom de la rue et numéro')}
              />
              {errors.address?.street && (
                <p className="mt-1 text-sm text-red-500">{errors.address.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('application.personal.city', 'Ville')} *
                </label>
                <input
                  type="text"
                  {...register('address.city')}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    errors.address?.city 
                      ? 'border-red-500 focus:border-red-500' 
                      : isDark 
                      ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                      : 'border-gray-300 focus:border-blue-500 bg-white'
                  }`}
                  placeholder={t('application.personal.cityPlaceholder', 'Ville')}
                />
                {errors.address?.city && (
                  <p className="mt-1 text-sm text-red-500">{errors.address.city.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('application.personal.postalCode', 'Code postal')} *
                </label>
                <input
                  type="text"
                  {...register('address.postalCode')}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    errors.address?.postalCode 
                      ? 'border-red-500 focus:border-red-500' 
                      : isDark 
                      ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                      : 'border-gray-300 focus:border-blue-500 bg-white'
                  }`}
                  placeholder="00000"
                />
                {errors.address?.postalCode && (
                  <p className="mt-1 text-sm text-red-500">{errors.address.postalCode.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('application.personal.country', 'Pays')} *
                </label>
                <select
                  {...register('address.country')}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    errors.address?.country 
                      ? 'border-red-500 focus:border-red-500' 
                      : isDark 
                      ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                      : 'border-gray-300 focus:border-blue-500 bg-white'
                  }`}
                >
                  <option value="">{t('application.personal.selectCountry', 'Sélectionnez un pays')}</option>
                  <option value="CD">République Démocratique du Congo</option>
                  <option value="CG">Congo</option>
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                </select>
                {errors.address?.country && (
                  <p className="mt-1 text-sm text-red-500">{errors.address.country.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Employment & Income */}
        <div>
          <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('application.personal.employment', 'Situation Professionnelle')}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('application.personal.employmentStatus', 'Situation professionnelle')} *
              </label>
              <select
                {...register('employmentStatus')}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  errors.employmentStatus 
                    ? 'border-red-500 focus:border-red-500' 
                    : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white'
                }`}
              >
                <option value="">{t('application.personal.selectStatus', 'Sélectionnez')}</option>
                <option value="employed">{t('application.personal.employed', 'Salarié')}</option>
                <option value="self_employed">{t('application.personal.selfEmployed', 'Indépendant')}</option>
                <option value="business_owner">{t('application.personal.businessOwner', 'Chef d\'entreprise')}</option>
                <option value="student">{t('application.personal.student', 'Étudiant')}</option>
                <option value="unemployed">{t('application.personal.unemployed', 'Sans emploi')}</option>
              </select>
              {errors.employmentStatus && (
                <p className="mt-1 text-sm text-red-500">{errors.employmentStatus.message}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('application.personal.monthlyIncome', 'Revenu mensuel (USD)')} *
              </label>
              <input
                type="number"
                {...register('monthlyIncome', { valueAsNumber: true })}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  errors.monthlyIncome 
                    ? 'border-red-500 focus:border-red-500' 
                    : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white'
                }`}
                placeholder="0"
                min="0"
              />
              {errors.monthlyIncome && (
                <p className="mt-1 text-sm text-red-500">{errors.monthlyIncome.message}</p>
              )}
            </div>
          </div>

          {/* Occupation */}
          <div className="mt-4">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('application.personal.occupation', 'Profession')} *
            </label>
            <input
              type="text"
              {...register('occupation')}
              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                errors.occupation 
                  ? 'border-red-500 focus:border-red-500' 
                  : isDark 
                  ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                  : 'border-gray-300 focus:border-blue-500 bg-white'
              }`}
              placeholder={t('application.personal.occupationPlaceholder', 'Votre profession')}
            />
            {errors.occupation && (
              <p className="mt-1 text-sm text-red-500">{errors.occupation.message}</p>
            )}
          </div>
        </div>

        {/* Identification */}
        <div>
          <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('application.personal.identification', 'Pièce d\'Identité')}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('application.personal.idType', 'Type de pièce')} *
              </label>
              <select
                {...register('idType')}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  errors.idType 
                    ? 'border-red-500 focus:border-red-500' 
                    : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white'
                }`}
              >
                <option value="">{t('application.personal.selectIdType', 'Sélectionnez')}</option>
                <option value="passport">{t('application.personal.passport', 'Passeport')}</option>
                <option value="national_id">{t('application.personal.nationalId', 'Carte nationale')}</option>
                <option value="drivers_license">{t('application.personal.driversLicense', 'Permis de conduire')}</option>
              </select>
              {errors.idType && (
                <p className="mt-1 text-sm text-red-500">{errors.idType.message}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('application.personal.idNumber', 'Numéro de pièce')} *
              </label>
              <input
                type="text"
                {...register('idNumber')}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  errors.idNumber 
                    ? 'border-red-500 focus:border-red-500' 
                    : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white'
                }`}
                placeholder={t('application.personal.idNumberPlaceholder', 'Numéro de la pièce')}
              />
              {errors.idNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.idNumber.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            {!isFirstStep && (
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
            )}
          </div>

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