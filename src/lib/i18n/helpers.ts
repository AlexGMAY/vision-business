'use client';

import { useTranslation } from './client';

// Helper function to get translations with fallbacks
export function useLegalTranslation() {
  const { t } = useTranslation();

  const getTranslation = (key: string, fallback: string, params?: any) => {
    return t('legal', key, params) || fallback;
  };

  return { getTranslation };
}