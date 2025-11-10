// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';

// const TranslationsContext = createContext<any>(null);

// export function TranslationsProvider({ children }: { children: React.ReactNode }) {
//   const [locale, setLocale] = useState('fr'); // Toujours français pour l'instant
//   const [translations, setTranslations] = useState({});

//   useEffect(() => {
//     const loadTranslations = async () => {
//       try {
//         const modules = await Promise.all([
//           import(`@/locales/fr/common.json`),
//           import(`@/locales/fr/navigation.json`),
//           import(`@/locales/fr/homepage.json`),
//           import(`@/locales/fr/forms.json`),
//           import(`@/locales/fr/legal.json`),
//           import(`@/locales/fr/about.json`),
//           import(`@/locales/fr/contact.json`),
//           import(`@/locales/fr/loans.json`),
//           import(`@/locales/fr/prets.json`)
//         ]);
        
//         setTranslations({
//           common: modules[0].default,
//           navigation: modules[1].default,
//           homepage: modules[2].default,
//           forms: modules[3].default,
//           legal: modules[4].default,
//           about: modules[5].default,
//           contact: modules[6].default,
//           loans: modules[7].default,
//           prets: modules[8].default,
//         });
//       } catch (error) {
//         console.error('Translation loading error:', error);
//       }
//     };

//     loadTranslations();
//   }, []);

//   const t = (namespace: string, key: string, params?: any) => {
//     const ns = (translations as any)[namespace];
//     if (!ns) return key;
    
//     const keys = key.split('.');
//     let value = ns;
//     for (const k of keys) {
//       value = value?.[k];
//     }
    
//     let result = value || key;
//     if (params && typeof result === 'string') {
//       Object.keys(params).forEach(param => {
//         result = result.replace(`{{${param}}}`, params[param]);
//       });
//     }
    
//     return result;
//   };

//   return (
//     <TranslationsContext.Provider value={{ locale, setLocale, t }}>
//       {children}
//     </TranslationsContext.Provider>
//   );
// }

// export function useTranslation() {
//   const context = useContext(TranslationsContext);
//   if (!context) {
//     throw new Error('useTranslation must be used within TranslationsProvider');
//   }
//   return context;
// }

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TranslationsContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (namespace: string, key: string, params?: any) => string;
}

const TranslationsContext = createContext<TranslationsContextType | null>(null);

interface TranslationsProviderProps {
  children: ReactNode;
}

export function TranslationsProvider({ children }: TranslationsProviderProps) {
  const [locale, setLocale] = useState('fr'); // Default to French
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const modules = await Promise.all([
          import(`@/locales/fr/common.json`),
          import(`@/locales/fr/navigation.json`),
          import(`@/locales/fr/homepage.json`),
          import(`@/locales/fr/forms.json`),
          import(`@/locales/fr/legal.json`),
          import(`@/locales/fr/about.json`),
          import(`@/locales/fr/contact.json`),
          import(`@/locales/fr/loans.json`),
          import(`@/locales/fr/prets.json`),
          import(`@/locales/fr/footer.json`)
        ]);
        
        setTranslations({
          common: modules[0].default,
          navigation: modules[1].default,
          homepage: modules[2].default,
          forms: modules[3].default,
          legal: modules[4].default,
          about: modules[5].default,
          contact: modules[6].default,
          loans: modules[7].default,
          prets: modules[8].default,
          footer: modules[9].default,
        });
      } catch (error) {
        console.error('Translation loading error:', error);
      }
    };

    loadTranslations();
  }, []);

  const t = (namespace: string, key: string, params?: any): string => {
    const ns = translations[namespace];
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
