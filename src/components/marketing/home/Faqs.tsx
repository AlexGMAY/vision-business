'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

// Type-safe interfaces
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'eligibility' | 'documents' | 'process' | 'repayment' | 'security';
}

interface FAQAccordionProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  isDark: boolean;
}

// Type-safe animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const contentVariants: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const iconVariants: Variants = {
  closed: {
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  open: {
    rotate: 45,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const faqItems: FAQItem[] = [
  // General Questions
  {
    id: '1',
    question: "Quels sont les types de prêts proposés par Vision Business ?",
    answer: "Nous proposons 6 types de prêts principaux : Prêts Étudiants (jusqu'à 5M FCFA), Prêts PME (500K à 50M FCFA), Prêts Personnels (50K à 10M FCFA), Prêts Urgence (25K à 2M FCFA), Prêts Équipement (1M à 30M FCFA) et Prêts Logement (5M à 100M FCFA). Chaque prêt est conçu pour répondre à des besoins spécifiques avec des conditions adaptées.",
    category: 'general'
  },
  {
    id: '2',
    question: "Quelle est la durée maximale de remboursement ?",
    answer: "La durée de remboursement varie selon le type de prêt : Prêts Personnels (3-36 mois), Prêts Étudiants (12-60 mois), Prêts PME (6-84 mois), Prêts Logement (60-240 mois). Nous ajustons la durée en fonction de votre capacité de remboursement et de la nature de votre projet.",
    category: 'general'
  },
  {
    id: '3',
    question: "Y a-t-il des frais cachés ?",
    answer: "Absolument pas. Nous pratiquons une politique de transparence totale. Tous les frais (taux d'intérêt, frais de dossier le cas échéant, assurance) sont communiqués clairement avant toute signature. Aucun frais supplémentaire ne vous sera demandé.",
    category: 'general'
  },
  {
    id: '4',
    question: "Puis-je rembourser par anticipation sans frais ?",
    answer: "Oui, tous nos prêts permettent le remboursement anticipé sans aucun frais de pénalité. Vous pouvez réduire la durée de votre prêt ou augmenter vos mensualités à tout moment selon vos capacités.",
    category: 'general'
  },

  // Eligibility Questions
  {
    id: '5',
    question: "Qui peut bénéficier de vos prêts ?",
    answer: "Nos prêts sont accessibles aux : Résidents congolais âgés de 18 à 65 ans (21-65 pour les prêts personnels), étudiants inscrits dans des établissements reconnus, entreprises enregistrées depuis au moins 6 mois, et particuliers ayant des revenus stables. Chaque prêt a des critères spécifiques détaillés sur notre site.",
    category: 'eligibility'
  },
  {
    id: '6',
    question: "Faut-il avoir un garant pour obtenir un prêt ?",
    answer: "Cela dépend du type de prêt et du montant. Les prêts étudiants peuvent être accordés sans garant, les prêts personnels de faible montant également. Pour les prêts plus importants (PME, logement), des garanties sont généralement requises. Nous évaluons au cas par cas.",
    category: 'eligibility'
  },

  // Documents Questions
  {
    id: '7',
    question: "Quels documents sont nécessaires pour une demande ?",
    answer: "Les documents de base incluent : Pièce d'identité valide, justificatif de domicile récent, et justificatifs de revenus (bulletins de salaire, relevés bancaires). Des documents spécifiques sont requis selon le type de prêt (preuve d'inscription pour étudiants, statuts d'entreprise pour PME, etc.).",
    category: 'documents'
  },
  {
    id: '8',
    question: "Combien de temps faut-il pour rassembler les documents ?",
    answer: "La plupart de nos clients rassemblent les documents nécessaires en 1 à 2 jours. Nous avons simplifié au maximum les exigences documentaires. Notre équipe peut vous aider à identifier les documents requis spécifiquement pour votre situation.",
    category: 'documents'
  },

  // Process Questions
  {
    id: '9',
    question: "Combien de temps prend l'approbation d'un prêt ?",
    answer: "Notre processus d'approbation est parmi les plus rapides du marché : Décision sous 24-48 heures pour la majorité des demandes, déblocage des fonds sous 48 heures après signature. Les prêts urgence sont traités en moins de 4 heures.",
    category: 'process'
  },
  {
    id: '10',
    question: "Comment se déroule le processus de demande ?",
    answer: "Le processus comprend 4 étapes simples : 1) Demande en ligne (5 min), 2) Analyse de dossier (24-48h), 3) Signature électronique sécurisée, 4) Déblocage des fonds (48h max). Un conseiller vous accompagne à chaque étape.",
    category: 'process'
  },

  // Repayment Questions
  {
    id: '11',
    question: "Que se passe-t-il en cas de retard de paiement ?",
    answer: "Nous comprenons que des difficultés peuvent survenir. Contactez-nous immédiatement : nous proposons des solutions flexibles (report d'échéance, rééchelonnement). Des pénalités de retard modérées peuvent s'appliquer après un délai de grâce.",
    category: 'repayment'
  },
  {
    id: '12',
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons les virements bancaires, les prélèvements automatiques, les paiements mobiles (Orange Money, MPesa Mobile Money), et les versements en agence. Vous pouvez choisir le mode qui vous convient le mieux.",
    category: 'repayment'
  }
];

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faq, isOpen, onToggle, isDark }) => {
  return (
    <motion.div
      variants={itemVariants}
      className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
        isDark 
          ? 'border-gray-700 hover:border-gray-600' 
          : 'border-gray-200 hover:border-gray-300'
      } ${isOpen ? (isDark ? 'bg-gray-800/50' : 'bg-gray-50') : ''}`}
    >
      <button
        onClick={onToggle}
        className={`w-full px-6 py-6 text-left flex items-center justify-between transition-all duration-300 ${
          isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'
        }`}
      >
        <h3 className={`text-lg font-semibold pr-8 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {faq.question}
        </h3>
        <motion.div
          variants={iconVariants}
          animate={isOpen ? "open" : "closed"}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg ${
            isDark 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          +
        </motion.div>
      </button>

      <motion.div
        variants={contentVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={`overflow-hidden ${
          isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'
        }`}
      >
        <div className="px-6 pb-6">
          <p className={`leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {faq.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['1']));

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const leftColumnItems = faqItems.slice(0, 6);
  const rightColumnItems = faqItems.slice(6, 12);

  return (
    <section className={`relative py-20 lg:py-32 overflow-hidden ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 opacity-[0.02] ${
          isDark 
            ? 'bg-gradient-to-br from-indigo-500 via-pink-500 to-cyan-500'
            : 'bg-gradient-to-br from-indigo-400 via-pink-400 to-cyan-400'
        }`} />
      </div>

      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl ${
          isDark ? 'bg-indigo-500' : 'bg-indigo-400'
        }`}
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.1, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl ${
          isDark ? 'bg-cyan-500' : 'bg-cyan-400'
        }`}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full backdrop-blur-sm border mb-6"
          >
            <span className={`text-sm font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t('homepage', 'faq.badge') || "Questions fréquentes"}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span className="block">{t('homepage', 'faq.title') || "Vous avez des"}</span>
            <span className={`block bg-gradient-to-r bg-clip-text text-transparent ${
              isDark 
                ? 'from-indigo-400 via-pink-400 to-cyan-400'
                : 'from-indigo-600 via-pink-600 to-cyan-600'
            }`}>
              {t('homepage', 'faq.subtitle') || "questions ?"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t('homepage', 'faq.description') || "Retrouvez les réponses aux questions les plus fréquemment posées par nos clients. Si vous ne trouvez pas votre réponse, notre équipe est à votre écoute."}
          </motion.p>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {leftColumnItems.map((faq) => (
                <FAQAccordion
                  key={faq.id}
                  faq={faq}
                  isOpen={openItems.has(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                  isDark={isDark}
                />
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {rightColumnItems.map((faq) => (
                <FAQAccordion
                  key={faq.id}
                  faq={faq}
                  isOpen={openItems.has(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.p
            className={`text-lg font-semibold mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t('homepage', 'faq.ctaText') || "Vous ne trouvez pas la réponse à votre question ?"}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex gap-4"
          >
            <button
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isDark
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/25'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/25'
              }`}
            >
              {t('homepage', 'faq.ctaPrimary') || "Nous contacter"}
            </button>
            <button
              className={`px-8 py-4 rounded-xl font-semibold text-lg border transition-all duration-300 ${
                isDark
                  ? 'border-gray-600 hover:bg-gray-800 text-white'
                  : 'border-gray-300 hover:bg-gray-100 text-gray-800'
              }`}
            >
              {t('homepage', 'faq.ctaSecondary') || "Voir tous les prêts"}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};