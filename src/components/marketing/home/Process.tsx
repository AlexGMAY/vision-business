'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

// Type-safe interfaces
interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  details: string[];
  color: 'blue' | 'green' | 'purple' | 'orange';
}

interface ProcessStepProps {
  step: ProcessStep;
  index: number;
  isDark: boolean;
  totalSteps: number;
}

// Type-safe animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const stepVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const lineVariants: Variants = {
  hidden: { 
    scaleY: 0,
    opacity: 0
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut"
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
  }
};

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Demande en Ligne",
    description: "Remplissez notre formulaire simplifié en quelques minutes seulement",
    icon: "📝",
    duration: "5 minutes",
    details: [
      "Formulaire 100% digital et sécurisé",
      "Aucun document requis à cette étape",
      "Simulation immédiate des mensualités",
      "Sauvegarde automatique de votre progression"
    ],
    color: "blue"
  },
  {
    number: "02",
    title: "Analyse du Dossier",
    description: "Notre équipe experte étudie votre demande avec attention et rapidité",
    icon: "🔍",
    duration: "24-48 heures",
    details: [
      "Vérification complète des documents",
      "Analyse de solvabilité avancée",
      "Évaluation du projet et du potentiel",
      "Scoring intelligent et personnalisé"
    ],
    color: "green"
  },
  {
    number: "03",
    title: "Approba-tion & Signature",
    description: "Recevez notre décision finale et signez votre contrat en toute sécurité",
    icon: "✍️",
    duration: "Quelques heures",
    details: [
      "Notification immédiate de la décision",
      "Signature électronique sécurisée",
      "Contrat digital et archivé automatiquement",
      "Explication détaillée des conditions"
    ],
    color: "purple"
  },
  {
    number: "04",
    title: "Déblocage des Fonds",
    description: "Les fonds sont transférés sur votre compte dans les plus brefs délais",
    icon: "💰",
    duration: "48 heures maximum",
    details: [
      "Virement bancaire sécurisé",
      "Notification de transfert immédiate",
      "Suivi en temps réel du processus",
      "Support disponible 7j/7"
    ],
    color: "orange"
  }
];

const ProcessStep: React.FC<ProcessStepProps> = ({ step, index, isDark, totalSteps }) => {
  const colors = colorClasses[step.color];
  
  return (
    <motion.div
      variants={stepVariants}
      custom={index}
      whileHover="hover"
      className={`group relative flex gap-8 ${
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Step content */}
      <div className="flex-1">
        <motion.div
          className={`relative p-8 rounded-3xl backdrop-blur-sm border-2 transition-all duration-300 ${
            isDark 
              ? `${colors.bgDark} ${colors.borderDark} hover:bg-gray-800/60`
              : `${colors.bgLight} ${colors.borderLight} hover:bg-white/80`
          }`}
        >
          {/* Step number and icon */}
          <div className="flex items-center justify-between mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${
              isDark ? colors.dark : colors.light
            } flex items-center justify-center text-white text-xl font-bold`}>
              {step.number}
            </div>
            <div className="text-3xl">{step.icon}</div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <h3 className={`text-2xl font-bold mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {step.title}
            </h3>
            <p className={`text-lg mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {step.description}
            </p>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
              isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
            }`}>
              ⏱️ {step.duration}
            </div>
          </div>

          {/* Details list */}
          <ul className="space-y-2">
            {step.details.map((detail, idx) => (
              <li key={idx} className={`flex items-center text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="w-1.5 h-1.5 bg-current rounded-full mr-3" />
                {detail}
              </li>
            ))}
          </ul>

          {/* Hover effect */}
          <div className={`absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isDark ? colors.borderDark : colors.borderLight
          }`} />
        </motion.div>
      </div>

      {/* Connecting line (except for last step) */}
      {index < totalSteps - 1 && (
        <div className="flex items-center justify-center relative">
          <motion.div
            variants={lineVariants}
            custom={index}
            className={`w-1 h-full ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            } rounded-full`}
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5
            }}
            className={`absolute w-3 h-3 rounded-full ${
              isDark ? 'bg-blue-400' : 'bg-blue-500'
            }`}
          />
        </div>
      )}
    </motion.div>
  );
};

export const Process: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();

  return (
    <section className={`relative py-20 lg:py-32 overflow-hidden ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 opacity-[0.03] ${
          isDark 
            ? 'bg-gradient-to-br from-green-500 via-blue-500 to-purple-500'
            : 'bg-gradient-to-br from-green-400 via-blue-400 to-purple-400'
        }`} />
      </div>

      {/* Animated background elements */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute -top-64 -left-64 w-128 h-128 rounded-full border-2 opacity-5 ${
          isDark ? 'border-blue-500' : 'border-blue-400'
        }`}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
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
              {t('homepage', 'process.badge') || "Notre processus"}
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
            <span className="block">{t('homepage', 'process.title') || "Simplicité et"}</span>
            <span className={`block bg-gradient-to-r bg-clip-text text-transparent ${
              isDark 
                ? 'from-green-400 via-blue-400 to-purple-400'
                : 'from-green-600 via-blue-600 to-purple-600'
            }`}>
              {t('homepage', 'process.subtitle') || "efficacité garanties"}
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
            {t('homepage', 'process.description') || "Notre processus en 4 étapes simples a été conçu pour vous offrir une expérience de financement rapide, transparente et sans stress."}
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto space-y-12"
        >
          {processSteps.map((step, index) => (
            <ProcessStep 
              key={step.number}
              step={step}
              index={index}
              isDark={isDark}
              totalSteps={processSteps.length}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isDark
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/25'
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/25'
              }`}
            >
              {t('homepage', 'process.ctaButton') || "Commencer ma demande"}
            </button>
          </motion.div>
          <motion.p
            className={`mt-4 text-sm ${
              isDark ? 'text-gray-500' : 'text-gray-600'
            }`}
          >
            {t('homepage', 'process.ctaSubtext') || "Aucun engagement • Simulation gratuite • Réponse sous 24h"}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};