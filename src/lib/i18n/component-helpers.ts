'use client';

import { useTranslation } from './client';

// Enhanced helper function with better fallback handling
export function useComponentTranslation() {
  const { t } = useTranslation();

  const getComponentTranslation = (key: string, fallback: string, params?: any) => {
    const translation = t('components', key, params);
    
    // If translation exists and is not empty, use it
    if (translation && translation !== key) {
      return translation;
    }
    
    // If no translation found, use the fallback
    return fallback;
  };

  // Enhanced function for InternalHero with title, subtitle, and CTA support
  const getHeroTranslation = (options: {
    titleKey?: string;
    title?: string;
    subtitleKey?: string;
    subtitle?: string;
    ctaKey?: string;
    ctaText?: string;
  }) => {
    const { titleKey, title, subtitleKey, subtitle, ctaKey, ctaText } = options;

    const displayTitle = titleKey 
      ? getComponentTranslation(`internalHero.titles.${titleKey}`, title || '')
      : title;

    const displaySubtitle = subtitleKey 
      ? getComponentTranslation(`internalHero.subtitles.${subtitleKey}`, subtitle || '')
      : subtitle;

    const displayCtaText = ctaKey
      ? getComponentTranslation(`internalHero.cta.${ctaKey}`, ctaText || '')
      : ctaText;

    return {
      displayTitle,
      displaySubtitle,
      displayCtaText
    };
  };

  return { 
    getComponentTranslation,
    getHeroTranslation 
  };
}