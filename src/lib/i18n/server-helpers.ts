import 'server-only';

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

export async function getServerTranslation(namespace: string, locale: string = 'fr') {
  const validLocale = ['fr', 'en'].includes(locale) ? locale as 'fr' | 'en' : 'fr';
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

  return { getTranslation };
}