'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

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
    y: 20,
    scale: 0.8
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
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const glowVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

interface TrustItem {
  icon: string;
  value: string;
  label: string;
  description?: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const trustItems: TrustItem[] = [
  {
    icon: "👥",
    value: "80+",
    label: "Clients Satisfaits",
    description: "Entreprises et particuliers",
    color: "blue"
  },
  {
    icon: "💰", 
    value: "2M+",
    label: "Fonds Débloqués",
    description: "En financements",
    color: "green"
  },
  {
    icon: "⭐",
    value: "98%",
    label: "Taux Satisfaction", 
    description: "Clients heureux",
    color: "purple"
  },
  {
    icon: "⚡",
    value: "24-48h",
    label: "Décision Rapide",
    description: "Traitement express",
    color: "orange"
  },
  {
    icon: "🛡️",
    value: "100%",
    label: "Sécurité Données",
    description: "Protection garantie", 
    color: "blue"
  },
  {
    icon: "🌍",
    value: "5+",
    label: "Ans d'Expérience",
    description: "Expertise prouvée",
    color: "green"
  }
];

// Color mapping for themes
const colorClasses = {
  blue: {
    light: 'from-blue-500 to-blue-600',
    dark: 'from-blue-400 to-blue-500',
    bgLight: 'bg-blue-500/10',
    bgDark: 'bg-blue-400/10',
    borderLight: 'border-blue-500/20',
    borderDark: 'border-blue-400/20'
  },
  green: {
    light: 'from-green-500 to-green-600', 
    dark: 'from-green-400 to-green-500',
    bgLight: 'bg-green-500/10',
    bgDark: 'bg-green-400/10',
    borderLight: 'border-green-500/20',
    borderDark: 'border-green-400/20'
  },
  purple: {
    light: 'from-purple-500 to-purple-600',
    dark: 'from-purple-400 to-purple-500', 
    bgLight: 'bg-purple-500/10',
    bgDark: 'bg-purple-400/10',
    borderLight: 'border-purple-500/20',
    borderDark: 'border-purple-400/20'
  },
  orange: {
    light: 'from-orange-500 to-orange-600',
    dark: 'from-orange-400 to-orange-500',
    bgLight: 'bg-orange-500/10', 
    bgDark: 'bg-orange-400/10',
    borderLight: 'border-orange-500/20',
    borderDark: 'border-orange-400/20'
  }
};

interface TrustCardProps {
  item: TrustItem;
  index: number;
  isDark: boolean;
}

const TrustCard: React.FC<TrustCardProps> = ({ item, index, isDark }) => {
  const colors = colorClasses[item.color];
  
  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover="hover"
      className={`group relative p-6 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 cursor-default ${
        isDark 
          ? `${colors.bgDark} ${colors.borderDark} hover:bg-gray-800/60`
          : `${colors.bgLight} ${colors.borderLight} hover:bg-white/80`
      }`}
    >
      {/* Animated background glow */}
      <motion.div
        variants={glowVariants}
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${
          isDark ? colors.dark : colors.light
        }`}        
      />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Icon with gradient background */}
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
            isDark 
              ? 'bg-gray-700/50 text-gray-200' 
              : 'bg-white/80 text-gray-700'
          }`}>
            {item.icon}
          </div>
          
          {/* Value with gradient text */}
          <div className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
            isDark ? colors.dark : colors.light
          }`}>
            {item.value}
          </div>
        </div>

        {/* Label and description */}
        <div>
          <h3 className={`font-bold text-lg mb-1 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {item.label}
          </h3>
          {item.description && (
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {item.description}
            </p>
          )}
        </div>

        {/* Animated underline */}
        <motion.div
          className={`h-0.5 bg-gradient-to-r mt-3 ${
            isDark ? colors.dark : colors.light
          }`}
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        />
      </div>

      {/* Floating particles */}
      <motion.div
        animate={{ 
          y: [0, -5, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.5
        }}
        className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
          isDark ? 'bg-blue-400' : 'bg-blue-500'
        }`}
      />
    </motion.div>
  );
};

interface TrustBarProps {
  className?: string;
}

export const TrustBar: React.FC<TrustBarProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();

  return (
    <section className={`relative py-16 lg:py-24 overflow-hidden ${className} ${
      isDark ? 'bg-gray-900/50' : 'bg-white/50'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 opacity-5 ${
          isDark 
            ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-green-500'
            : 'bg-gradient-to-br from-blue-400 via-purple-400 to-green-400'
        }`} />
      </div>

      {/* Animated background orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-10 ${
          isDark ? 'bg-blue-500' : 'bg-blue-400'
        }`}
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-10 ${
          isDark ? 'bg-purple-500' : 'bg-purple-400'
        }`}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
              {t('homepage', 'trustBar.badge') || "Ils nous font confiance"}
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
            <span className="block">{t('homepage', 'trustBar.title') || "Des chiffres qui"}</span>
            <span className={`block bg-gradient-to-r bg-clip-text text-transparent ${
              isDark 
                ? 'from-blue-400 via-purple-400 to-green-400'
                : 'from-blue-600 via-purple-600 to-green-600'
            }`}>
              {t('homepage', 'trustBar.subtitle') || "parlent d'eux-mêmes"}
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
            {t('homepage', 'trustBar.description') || "Notre engagement envers l'excellence se reflète dans chaque chiffre. Découvrez pourquoi des milliers de clients nous font confiance."}
          </motion.p>
        </motion.div>

        {/* Trust Items Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {trustItems.map((item, index) => (
            <TrustCard 
              key={`${item.label}-${index}`} 
              item={item} 
              index={index} 
              isDark={isDark} 
            />
          ))}
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
            className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t('homepage', 'trustBar.ctaText') || "Prêt à rejoindre notre communauté de clients satisfaits ?"}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              {t('homepage', 'trustBar.ctaButton') || "Commencer maintenant"}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};