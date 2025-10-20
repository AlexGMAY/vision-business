import 'server-only';
import { locales, defaultLocale, type Locale, type TranslationNamespace } from './config';

const translations = {} as Record<Locale, Record<TranslationNamespace, any>>;

// Chargement asynchrone des traductions
async function loadTranslations(locale: Locale, namespace: TranslationNamespace) {
  if (!translations[locale]) {
    translations[locale] = {} as any;
  }
  
  if (!translations[locale][namespace]) {
    try {
      const module = await import(`@/locales/${locale}/${namespace}.json`);
      translations[locale][namespace] = module.default;
    } catch (error) {
      console.error(`Failed to load translation: ${locale}/${namespace}`, error);
      // Fallback sur la locale par défaut
      if (locale !== defaultLocale) {
        return loadTranslations(defaultLocale, namespace);
      }
      return {};
    }
  }
  
  return translations[locale][namespace];
}

export async function getTranslation(locale: Locale, namespace: TranslationNamespace) {
  return await loadTranslations(locale, namespace);
}

export function getCurrentLocale(pathname: string): Locale {
  const locale = pathname.split('/')[1] as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
}