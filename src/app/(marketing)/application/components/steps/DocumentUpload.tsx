'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import { Documents, documentSchema } from '@/lib/security/schema';


interface DocumentUploadProps {
  data: any;
  onNext: (data: Documents) => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface UploadedFile {
  file: File;
  progress: number;
  error?: string;
}

export function DocumentUpload({ data, onNext, onPrevious, isFirstStep, isLastStep }: DocumentUploadProps) {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});
  
  const fileInputRefs: Record<'identityDocument' | 'proofOfIncome' | 'proofOfAddress', React.RefObject<HTMLInputElement | null>> = {
    identityDocument: useRef<HTMLInputElement>(null),
    proofOfIncome: useRef<HTMLInputElement>(null),
    proofOfAddress: useRef<HTMLInputElement>(null),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<Documents>({
    resolver: zodResolver(documentSchema),
    defaultValues: data.documents || {}
  });

  const handleFileSelect = (field: keyof Documents, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setUploadedFiles(prev => ({
        ...prev,
        [field]: { file, progress: 0, error: 'File size must be less than 5MB' }
      }));
      return;
    }

    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      setUploadedFiles(prev => ({
        ...prev,
        [field]: { file, progress: 0, error: 'Only JPG, PNG, and PDF files are allowed' }
      }));
      return;
    }

    // Simulate upload progress
    const newFile: UploadedFile = { file, progress: 0 };
    setUploadedFiles(prev => ({ ...prev, [field]: newFile }));

    const interval = setInterval(() => {
      setUploadedFiles(prev => {
        const current = prev[field];
        if (!current || current.progress >= 100) {
          clearInterval(interval);
          return prev;
        }
        
        const newProgress = Math.min(current.progress + 10, 100);
        if (newProgress === 100) {
          setValue(field, file as any);
        }
        
        return {
          ...prev,
          [field]: { ...current, progress: newProgress }
        };
      });
    }, 100);
  };

  const handleDrop = (field: keyof Documents, e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(field, file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (field: keyof typeof fileInputRefs) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[field];
      return newFiles;
    });
    setValue(field, undefined as any);
    if (fileInputRefs[field].current) {
      fileInputRefs[field].current!.value = '';
    }
  };

  const onSubmit = async (formData: Documents) => {
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

  type DocumentField = 'identityDocument' | 'proofOfIncome' | 'proofOfAddress';

  const DocumentUploadArea = ({ 
    field, 
    title, 
    description,
    required = true 
  }: {
    field: DocumentField;
    title: string;
    description: string;
    required?: boolean;
  }) => {
    const uploadedFile = uploadedFiles[field];
    const hasFile = uploadedFile && uploadedFile.progress === 100;

    return (
      <div className="space-y-3">
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {title} {required && '*'}
          </label>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
            {description}
          </p>
        </div>

        {!hasFile ? (
          <div
            onDrop={(e) => handleDrop(field, e)}
            onDragOver={handleDragOver}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
              errors[field] 
                ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' 
                : isDark 
                ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500' 
                : 'border-gray-300 bg-gray-50 hover:border-gray-400'
            }`}
            onClick={() => fileInputRefs[field].current?.click()}
          >
            <div className="text-3xl mb-2">📄</div>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {t('application.documents.dragDrop', 'Glissez-déposez votre fichier ici ou')}{' '}
              <span className="text-blue-500 underline">
                {t('application.documents.browse', 'parcourir')}
              </span>
            </p>
            <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('application.documents.supportedFormats', 'JPG, PNG, PDF - Max 5MB')}
            </p>
            <input
              type="file"
              ref={fileInputRefs[field]}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(field, file);
              }}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>
        ) : (
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-gray-700 border-gray-600' : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-green-500 text-xl">✅</div>
                <div>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    {uploadedFile.file.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(field)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600' 
                    : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
                }`}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {uploadedFile && uploadedFile.progress < 100 && (
          <div className="space-y-2">
            <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${uploadedFile.progress}%` }}
              />
            </div>
            <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('application.documents.uploading', 'Téléchargement...')} {uploadedFile.progress}%
            </p>
          </div>
        )}

        {uploadedFile?.error && (
          <p className="text-sm text-red-500">{uploadedFile.error}</p>
        )}

        {errors[field] && !hasFile && (
          <p className="text-sm text-red-500">{errors[field]?.message as string}</p>
        )}
      </div>
    );
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
            {t('application.documents.title', 'Documents Requis')}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('application.documents.subtitle', 'Téléchargez les documents nécessaires pour votre demande')}
          </p>
        </div>

        {/* Required Documents */}
        <div className="space-y-6">
          <DocumentUploadArea
            field="identityDocument"
            title={t('application.documents.identity', 'Pièce d\'identité')}
            description={t('application.documents.identityDesc', 'Passeport, carte nationale ou permis de conduire')}
          />

          <DocumentUploadArea
            field="proofOfIncome"
            title={t('application.documents.income', 'Justificatif de revenus')}
            description={t('application.documents.incomeDesc', 'Bulletins de salaire, relevés bancaires ou déclarations de revenus')}
          />

          <DocumentUploadArea
            field="proofOfAddress"
            title={t('application.documents.address', 'Justificatif de domicile')}
            description={t('application.documents.addressDesc', 'Facture récente (électricité, eau, téléphone) ou quittance de loyer')}
          />
        </div>

        {/* Additional Documents (Optional) */}
        <div>
          <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('application.documents.additional', 'Documents Additionnels (Optionnels)')}
          </h4>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('application.documents.additionalDesc', 'Ajoutez tout document qui pourrait soutenir votre demande')}
          </p>
          
          {/* Additional documents upload area would go here */}
          <div className={`border-2 border-dashed rounded-xl p-6 text-center ${
            isDark ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50'
          }`}>
            <div className="text-2xl mb-2">➕</div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {t('application.documents.addMore', 'Ajouter d\'autres documents si nécessaire')}
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-start space-x-3">
            <div className="text-blue-500 text-lg">🔒</div>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-blue-800'}`}>
                {t('application.documents.securityTitle', 'Sécurité des documents')}
              </p>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-blue-700'}`}>
                {t('application.documents.securityDesc', 'Tous vos documents sont chiffrés et stockés de manière sécurisée. Seul notre équipe autorisée y a accès.')}
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