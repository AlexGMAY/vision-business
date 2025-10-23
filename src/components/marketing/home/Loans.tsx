'use client';

import { motion, Variants } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

// Type-safe interfaces
interface LoanProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  amount: string;
  interestRate: string;
  term: string;
  features: string[];
  eligibility: string[];
  requiredDocuments: string[];
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal';
  image: string;
  category: 'student' | 'business' | 'personal' | 'emergency' | 'equipment' | 'housing';
}

interface LoanCardProps {
  loan: LoanProduct;
  index: number;
  isDark: boolean;
  onLearnMore: (loan: LoanProduct) => void;
}

interface LoanModalProps {
  loan: LoanProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

// Type-safe animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Color system
const colorClasses = {
  blue: {
    light: 'from-blue-500 to-blue-600',
    dark: 'from-blue-400 to-blue-500',
    bgLight: 'bg-blue-500/10',
    bgDark: 'bg-blue-400/10',
    borderLight: 'border-blue-500/20',
    borderDark: 'border-blue-400/20',
    textLight: 'text-blue-600',
    textDark: 'text-blue-400'
  },
  green: {
    light: 'from-green-500 to-green-600',
    dark: 'from-green-400 to-green-500',
    bgLight: 'bg-green-500/10',
    bgDark: 'bg-green-400/10',
    borderLight: 'border-green-500/20',
    borderDark: 'border-green-400/20',
    textLight: 'text-green-600',
    textDark: 'text-green-400'
  },
  purple: {
    light: 'from-purple-500 to-purple-600',
    dark: 'from-purple-400 to-purple-500',
    bgLight: 'bg-purple-500/10',
    bgDark: 'bg-purple-400/10',
    borderLight: 'border-purple-500/20',
    borderDark: 'border-purple-400/20',
    textLight: 'text-purple-600',
    textDark: 'text-purple-400'
  },
  orange: {
    light: 'from-orange-500 to-orange-600',
    dark: 'from-orange-400 to-orange-500',
    bgLight: 'bg-orange-500/10',
    bgDark: 'bg-orange-400/10',
    borderLight: 'border-orange-500/20',
    borderDark: 'border-orange-400/20',
    textLight: 'text-orange-600',
    textDark: 'text-orange-400'
  },
  red: {
    light: 'from-red-500 to-red-600',
    dark: 'from-red-400 to-red-500',
    bgLight: 'bg-red-500/10',
    bgDark: 'bg-red-400/10',
    borderLight: 'border-red-500/20',
    borderDark: 'border-red-400/20',
    textLight: 'text-red-600',
    textDark: 'text-red-400'
  },
  teal: {
    light: 'from-teal-500 to-teal-600',
    dark: 'from-teal-400 to-teal-500',
    bgLight: 'bg-teal-500/10',
    bgDark: 'bg-teal-400/10',
    borderLight: 'border-teal-500/20',
    borderDark: 'border-teal-400/20',
    textLight: 'text-teal-600',
    textDark: 'text-teal-400'
  }
};

// Sample loan products data
const loanProducts: LoanProduct[] = [
  {
    id: 'student-loan',
    title: 'Prêt Étudiant',
    subtitle: 'Financez votre avenir académique',
    description: 'Des solutions de financement adaptées pour couvrir vos frais de scolarité, hébergement, matériel pédagogique et autres besoins académiques.',
    amount: 'Jusqu\'à 5,000,000 FC',
    interestRate: 'Taux préférentiel étudiant',
    term: '12 à 60 mois',
    features: [
      'Garantie requise',
      'Report de remboursement possible',
      'Délai de grâce accordé',
      'Accompagnement personnalisé'
    ],
    eligibility: [
      'Être inscrit dans un établissement reconnu',
      'Avoir entre 18 et 35 ans',
      'Fournir une preuve d\'inscription',
      'Avoir un garant (optionnel)'
    ],
    requiredDocuments: [
      'Carte d\'étudiant valide',
      'Relevés de notes récents',
      'Pièce d\'identité',
      'Justificatif de domicile'
    ],
    icon: '🎓',
    color: 'blue',
    image: '/images/loans/student.jpg',
    category: 'student'
  },
  {
    id: 'business-loan',
    title: 'Prêt PME',
    subtitle: 'Développez votre entreprise',
    description: 'Financement sur mesure pour les petites et moyennes entreprises souhaitant investir, croître ou moderniser leurs opérations.',
    amount: '500,000 à 50,000,000 FC',
    interestRate: 'Taux compétitifs selon profil',
    term: '6 à 84 mois',
    features: [
      'Étude de projet gratuite',
      'Accompagnement business',
      'Flexibilité de remboursement',
      'Renouvellement possible'
    ],
    eligibility: [
      'Entreprise enregistrée depuis 6+ mois',
      'Chiffre d\'affaires stable',
      'Business plan solide',
      'Garanties selon montant'
    ],
    requiredDocuments: [
      'Statuts de l\'entreprise',
      'Relevés bancaires 6 mois',
      'Business plan détaillé',
      'Documents d\'identité dirigeant'
    ],
    icon: '🏢',
    color: 'green',
    image: '/images/loans/business.jpg',
    category: 'business'
  },
  {
    id: 'personal-loan',
    title: 'Prêt Personnel',
    subtitle: 'Pour vos projets de vie',
    description: 'Financement flexible pour vos projets personnels : mariage, voyage, éducation, santé, ou tout autre besoin familial.',
    amount: '50,000 à 10,000,000 FC',
    interestRate: 'Taux fixes avantageux',
    term: '3 à 36 mois',
    features: [
      'Décision sous 24h',
      'Documentation simplifiée',
      'Aucun frais caché',
      'Remboursement anticipé gratuit'
    ],
    eligibility: [
      'Âge entre 21 et 65 ans',
      'Revenus stables',
      'Historique de crédit positif',
      'Résident en Côte d\'Ivoire'
    ],
    requiredDocuments: [
      'Pièce d\'identité valide',
      'Justificatif de revenus',
      'Justificatif de domicile',
      'Relevés bancaires récents'
    ],
    icon: '👨‍👩‍👧‍👦',
    color: 'purple',
    image: '/images/loans/personal.jpg',
    category: 'personal'
  },
  {
    id: 'emergency-loan',
    title: 'Prêt Urgence',
    subtitle: 'Solutions rapides pour situations critiques',
    description: 'Financement express pour faire face aux situations d\'urgence médicale, familiale ou professionnelle nécessitant une intervention rapide.',
    amount: '25,000 à 2,000,000 FC',
    interestRate: 'Taux adaptés aux urgences',
    term: '1 à 12 mois',
    features: [
      'Déblocage sous 4h',
      'Procédure accélérée',
      'Support 24/7',
      'Conditions flexibles'
    ],
    eligibility: [
      'Client existant préférable',
      'Situation d\'urgence justifiée',
      'Capacité de remboursement',
      'Documents d\'identité'
    ],
    requiredDocuments: [
      'Pièce d\'identité',
      'Justificatif d\'urgence',
      'Preuve de revenus',
      'Contacts d\'urgence'
    ],
    icon: '🚑',
    color: 'red',
    image: '/images/loans/emergency.jpg',
    category: 'emergency'
  },
  {
    id: 'equipment-loan',
    title: 'Prêt Équipement',
    subtitle: 'Modernisez votre outil de travail',
    description: 'Financement spécialisé pour l\'acquisition d\'équipements professionnels, machines, véhicules ou technologies nécessaires à votre activité.',
    amount: '1,000,000 à 30,000,000 FC',
    interestRate: 'Taux avantageux équipement',
    term: '12 à 60 mois',
    features: [
      'Financement jusqu\'à 100%',
      'Période de grâce possible',
      'Assurance incluse',
      'Maintenance conseillée'
    ],
    eligibility: [
      'Entreprise opérationnelle',
      'Justification de l\'investissement',
      'Garanties sur équipement',
      'Plan de rentabilité'
    ],
    requiredDocuments: [
      'Devis d\'équipement',
      'Business plan',
      'Statuts entreprise',
      'Relevés bancaires'
    ],
    icon: '🛠️',
    color: 'orange',
    image: '/images/loans/equipment.jpg',
    category: 'equipment'
  },
  {
    id: 'housing-loan',
    title: 'Prêt Logement',
    subtitle: 'Concrétisez votre projet immobilier',
    description: 'Solutions de financement pour l\'acquisition, la construction ou la rénovation de votre résidence principale ou investissement locatif.',
    amount: '5,000,000 à 100,000,000 FC',
    interestRate: 'Taux immobilier préférentiel',
    term: '60 à 240 mois',
    features: [
      'Apport minimum réduit',
      'Période de préfinancement',
      'Expertise immobilière incluse',
      'Assurance habitation offerte'
    ],
    eligibility: [
      'Revenus stables et suffisants',
      'Apport personnel minimum 10%',
      'Projet immobilier viable',
      'Garanties hypothécaires'
    ],
    requiredDocuments: [
      'Contrat de réservation/vente',
      'Plans du projet',
      'Devis de construction',
      'Justificatifs de revenus'
    ],
    icon: '🏠',
    color: 'teal',
    image: '/images/loans/housing.jpg',
    category: 'housing'
  }
];

const LoanCard: React.FC<LoanCardProps> = ({ loan, index, isDark, onLearnMore }) => {
  const colors = colorClasses[loan.color];
  
  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover="hover"
      className={`group relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
        isDark 
          ? `${colors.bgDark} ${colors.borderDark} hover:bg-gray-800/60`
          : `${colors.bgLight} ${colors.borderLight} hover:bg-white/80`
      }`}
      onClick={() => onLearnMore(loan)}
    >
      {/* Header with gradient */}
      <div className={`relative h-32 bg-gradient-to-r ${isDark ? colors.dark : colors.light}`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-4 left-4 text-3xl">
          {loan.icon}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg">{loan.title}</h3>
          <p className="text-white/80 text-sm">{loan.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Key info */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Montant</span>
            <span className={`font-semibold ${isDark ? colors.textDark : colors.textLight}`}>
              {loan.amount}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Taux</span>
            <span className={`font-semibold ${isDark ? colors.textDark : colors.textLight}`}>
              {loan.interestRate}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Durée</span>
            <span className={`font-semibold ${isDark ? colors.textDark : colors.textLight}`}>
              {loan.term}
            </span>
          </div>
        </div>

        {/* Features preview */}
        <div className="mb-4">
          <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Avantages principaux
          </h4>
          <ul className="space-y-1">
            {loan.features.slice(0, 2).map((feature, idx) => (
              <li key={idx} className={`text-xs flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="w-1 h-1 bg-current rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
            isDark
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          En savoir plus
        </motion.button>
      </div>

      {/* Hover effect */}
      <div className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isDark ? colors.borderDark : colors.borderLight
      }`} />
    </motion.div>
  );
};

const LoanModal: React.FC<LoanModalProps> = ({ loan, isOpen, onClose, isDark }) => {
  if (!loan || !isOpen) return null;

  const colors = colorClasses[loan.color];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative h-48 bg-gradient-to-r ${isDark ? colors.dark : colors.light} rounded-t-3xl`}>
          <div className="absolute inset-0 bg-black/10 rounded-t-3xl" />
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center ${
              isDark ? 'bg-black/20 hover:bg-black/30 text-white' : 'bg-white/20 hover:bg-white/30 text-gray-800'
            } transition-all duration-200`}
          >
            ✕
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-4xl mb-2">{loan.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-1">{loan.title}</h2>
            <p className="text-white/80 text-lg">{loan.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Description
            </h3>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {loan.description}
            </p>
          </div>

          {/* Key Information Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Montant
              </h4>
              <p className={`font-bold ${isDark ? colors.textDark : colors.textLight}`}>
                {loan.amount}
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Taux d'intérêt
              </h4>
              <p className={`font-bold ${isDark ? colors.textDark : colors.textLight}`}>
                {loan.interestRate}
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Durée
              </h4>
              <p className={`font-bold ${isDark ? colors.textDark : colors.textLight}`}>
                {loan.term}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Avantages
              </h3>
              <ul className="space-y-2">
                {loan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="w-2 h-2 bg-current rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Éligibilité
              </h3>
              <ul className="space-y-2">
                {loan.eligibility.map((item, idx) => (
                  <li key={idx} className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="w-2 h-2 bg-current rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Required Documents */}
          <div className="mb-8">
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Documents Requis
            </h3>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <ul className="space-y-2">
                {loan.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="w-2 h-2 bg-current rounded-full mr-3" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Demander ce prêt
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-4 rounded-xl font-semibold text-lg border transition-all duration-200 ${
                isDark
                  ? 'border-gray-600 hover:bg-gray-700 text-white'
                  : 'border-gray-300 hover:bg-gray-100 text-gray-800'
              }`}
              onClick={onClose}
            >
              Fermer
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Loans: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const [selectedLoan, setSelectedLoan] = useState<LoanProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleLearnMore = (loan: LoanProduct) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLoan(null), 300);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`relative py-20 lg:py-32 overflow-hidden ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
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
              {t('homepage', 'loans.badge') || "Nos Solutions de Financement"}
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
            <span className="block">{t('homepage', 'loans.title') || "Des prêts adaptés à"}</span>
            <span className={`block bg-gradient-to-r bg-clip-text text-transparent ${
              isDark 
                ? 'from-blue-400 via-purple-400 to-green-400'
                : 'from-blue-600 via-purple-600 to-green-600'
            }`}>
              {t('homepage', 'loans.subtitle') || "chaque projet"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className={`text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t('homepage', 'loans.description') || "Découvrez notre gamme complète de solutions de financement conçues pour répondre à tous vos besoins, des projets personnels aux investissements d'entreprise."}
          </motion.p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-200 ${
              isDark
                ? 'bg-gray-800/80 border-gray-700 hover:bg-gray-700 text-white'
                : 'bg-white/80 border-gray-300 hover:bg-white text-gray-800'
            }`}
          >
            ‹
          </button>
          
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-200 ${
              isDark
                ? 'bg-gray-800/80 border-gray-700 hover:bg-gray-700 text-white'
                : 'bg-white/80 border-gray-300 hover:bg-white text-gray-800'
            }`}
          >
            ›
          </button>

          {/* Cards Slider */}
          <motion.div
            ref={scrollContainerRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loanProducts.map((loan, index) => (
              <div key={loan.id} className="flex-shrink-0 w-80 snap-start">
                <LoanCard 
                  loan={loan} 
                  index={index} 
                  isDark={isDark} 
                  onLearnMore={handleLearnMore}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/prets"
            className={`inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
            }`}
          >
            Voir tous nos prêts ({loanProducts.length}+)
            <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>

      {/* Modal */}
      <LoanModal 
        loan={selectedLoan} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        isDark={isDark}
      />
    </section>
  );
};