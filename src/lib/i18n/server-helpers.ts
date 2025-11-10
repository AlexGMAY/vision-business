// import 'server-only';

// const translations = {
//   fr: {} as Record<string, any>,
//   en: {} as Record<string, any>,
// };

// async function loadTranslation(locale: 'fr' | 'en', namespace: string) {
//   if (!translations[locale][namespace]) {
//     try {
//       const module = await import(`@/locales/${locale}/${namespace}.json`);
//       translations[locale][namespace] = module.default;
//     } catch (error) {
//       console.error(`Failed to load translation: ${locale}/${namespace}`, error);
//       translations[locale][namespace] = {};
//     }
//   }
//   return translations[locale][namespace];
// }

// export async function getServerTranslation(namespace: string, locale: string = 'fr') {
//   const validLocale = ['fr', 'en'].includes(locale) ? locale as 'fr' | 'en' : 'fr';
//   const translationData = await loadTranslation(validLocale, namespace);

//   const getTranslation = (key: string, fallback: string, params?: any) => {
//     const keys = key.split('.');
//     let value = translationData;
    
//     for (const k of keys) {
//       value = value?.[k];
//     }
    
//     let result = value || fallback;
//     if (params && typeof result === 'string') {
//       Object.keys(params).forEach(param => {
//         result = result.replace(`{{${param}}}`, params[param]);
//       });
//     }
    
//     return result;
//   };

//   return { getTranslation };
// }

import 'server-only';
import { cookies, headers } from 'next/headers';

const translations = {
  fr: {} as Record<string, any>,
  en: {} as Record<string, any>,
};

async function loadTranslation(locale: 'fr' | 'en', namespace: string) {
  if (!translations[locale][namespace]) {
    try {
      const module = await import(`@/locales/${locale}/${namespace}.json`);
      translations[locale][namespace] = module.default;
    } catch (error) {
      console.error(`Failed to load translation: ${locale}/${namespace}`, error);
      translations[locale][namespace] = {};
    }
  }
  return translations[locale][namespace];
}

// Detect language from request
async function detectLanguage(): Promise<'fr' | 'en'> {
  try {
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');
    const cookieStore = await cookies();
    const preferredLanguage = cookieStore.get('preferred-locale')?.value;

    // Priority: 1. Cookie, 2. Browser preference, 3. Default to French
    if (preferredLanguage === 'fr' || preferredLanguage === 'en') {
      return preferredLanguage;
    }

    if (acceptLanguage?.includes('fr')) {
      return 'fr';
    }

    if (acceptLanguage?.includes('en')) {
      return 'en';
    }

    return 'fr'; // Default language
  } catch (error) {
    return 'fr'; // Fallback for server components
  }
}

export async function getServerTranslation(namespace: string, locale?: string) {
  const detectedLocale = locale || await detectLanguage();
  const validLocale = ['fr', 'en'].includes(detectedLocale) ? detectedLocale as 'fr' | 'en' : 'fr';
  
  const translationData = await loadTranslation(validLocale, namespace);

  const getTranslation = (key: string, fallback: string, params?: any) => {
    const keys = key.split('.');
    let value = translationData;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    let result = value || fallback;
    if (params && typeof result === 'string') {
      Object.keys(params).forEach(param => {
        result = result.replace(`{{${param}}}`, params[param]);
      });
    }
    
    return result;
  };

  return { getTranslation, language: validLocale };
}