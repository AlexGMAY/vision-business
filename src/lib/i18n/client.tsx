// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';
// import { type Locale, type TranslationNamespace } from './config';

// const TranslationsContext = createContext<any>(undefined);

// export function TranslationsProvider({ 
//   children, 
//   initialLocale 
// }: { 
//   children: React.ReactNode;
//   initialLocale: Locale;
// }) {
//   const [locale, setLocale] = useState<Locale>(initialLocale);
//   const [translations, setTranslations] = useState<Record<string, any>>({});

//   // Charger les traductions
//   useEffect(() => {
//     const loadAllTranslations = async () => {
//       try {
//         const modules = await Promise.all([
//           import(`@/locales/${locale}/common.json`),
//           import(`@/locales/${locale}/navigation.json`),
//           import(`@/locales/${locale}/homepage.json`),
//           import(`@/locales/${locale}/forms.json`),
//           import(`@/locales/${locale}/legal.json`)
//         ]);

//         setTranslations({
//           common: modules[0].default,
//           navigation: modules[1].default,
//           homepage: modules[2].default,
//           forms: modules[3].default,
//           legal: modules[4].default
//         });
//       } catch (error) {
//         console.error('Failed to load translations:', error);
//       }
//     };

//     loadAllTranslations();
//   }, [locale]);

//   // Fonction de traduction
//   const t = (namespace: TranslationNamespace, key: string, params?: Record<string, string>) => {
//     const namespaceTranslations = translations[namespace];
//     if (!namespaceTranslations) return key;

//     const keys = key.split('.');
//     let translation: any = namespaceTranslations;
    
//     for (const k of keys) {
//       translation = translation?.[k];
//       if (translation === undefined) return key;
//     }

//     if (typeof translation === 'string' && params) {
//       Object.entries(params).forEach(([param, value]) => {
//         translation = translation.replace(`{{${param}}}`, value);
//       });
//     }

//     return translation || key;
//   };

//   const value = {
//     locale,
//     setLocale,
//     t
//   };

//   return (
//     <TranslationsContext.Provider value={value}>
//       {children}
//     </TranslationsContext.Provider>
//   );
// }

// export function useTranslation() {
//   const context = useContext(TranslationsContext);
//   if (context === undefined) {
//     throw new Error('useTranslation must be used within a TranslationsProvider');
//   }
//   return context;
// }

'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const TranslationsContext = createContext<any>(null);

export function TranslationsProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState('fr'); // Toujours français pour l'instant
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const modules = await Promise.all([
          import(`@/locales/fr/common.json`),
          import(`@/locales/fr/navigation.json`),
          import(`@/locales/fr/homepage.json`),
          import(`@/locales/fr/forms.json`),
          import(`@/locales/fr/legal.json`)
        ]);
        
        setTranslations({
          common: modules[0].default,
          navigation: modules[1].default,
          homepage: modules[2].default,
          forms: modules[3].default,
          legal: modules[4].default
        });
      } catch (error) {
        console.error('Translation loading error:', error);
      }
    };

    loadTranslations();
  }, []);

  const t = (namespace: string, key: string, params?: any) => {
    const ns = (translations as any)[namespace];
    if (!ns) return key;
    
    const keys = key.split('.');
    let value = ns;
    for (const k of keys) {
      value = value?.[k];
    }
    
    let result = value || key;
    if (params && typeof result === 'string') {
      Object.keys(params).forEach(param => {
        result = result.replace(`{{${param}}}`, params[param]);
      });
    }
    
    return result;
  };

  return (
    <TranslationsContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationsProvider');
  }
  return context;
}