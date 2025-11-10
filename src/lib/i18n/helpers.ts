'use client';

import { useTranslation } from './client';

// Helper function to get translations with fallbacks
export function useLegalTranslation() {
  const { t, locale } = useTranslation();

  const getTranslation = (key: string, fallback: string, params?: any) => {
    const translation = t('legal', key, params);
    return translation || fallback;
  };

  return { getTranslation, locale };
}