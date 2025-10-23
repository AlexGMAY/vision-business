'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

// Type-safe interfaces
interface Feature {
  icon: string;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  stats?: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  isDark: boolean;
}

// Type-safe animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const statVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.5 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "backOut"
    }
  }
};

// Color system
const colorClasses = {
  blue: {
    light: 'from-blue-500 to-blue-600',
    dark: 'from-blue-400 to-blue-500/50',
    bgLight: 'bg-blue-500/10',
    bgDark: 'bg-blue-400/10',
    borderLight: 'border-blue-500/20',
    borderDark: 'border-blue-400/20',
    textLight: 'text-blue-600',
    textDark: 'text-blue-400'
  },
  green: {
    light: 'from-green-500 to-green-600',
    dark: 'from-green-400 to-green-500/50',
    bgLight: 'bg-green-500/10',
    bgDark: 'bg-green-400/10',
    borderLight: 'border-green-500/20',
    borderDark: 'border-green-400/20',
    textLight: 'text-green-600',
    textDark: 'text-green-400'
  },
  purple: {
    light: 'from-purple-500 to-purple-600',
    dark: 'from-purple-400 to-purple-500/50',
    bgLight: 'bg-purple-500/10',
    bgDark: 'bg-purple-400/10',
    borderLight: 'border-purple-500/20',
    borderDark: 'border-purple-400/20',
    textLight: 'text-purple-600',
    textDark: 'text-purple-400'
  },
  orange: {
    light: 'from-orange-500 to-orange-600',
    dark: 'from-orange-400 to-orange-500/50',
    bgLight: 'bg-orange-500/10',
    bgDark: 'bg-orange-400/10',
    borderLight: 'border-orange-500/20',
    borderDark: 'border-orange-400/20',
    textLight: 'text-orange-600',
    textDark: 'text-orange-400'
  }
};

const features: Feature[] = [
  {
    icon: "⚡",
    title: "Décision Rapide",
    description: "Obtenez une réponse sous 24-48 heures maximum grâce à notre processus d'approbation accéléré et notre technologie de scoring avancée.",
    color: "blue",
    stats: "24-48h"
  },
  {
    icon: "🔒",
    title: "Sécurité Maximale",
    description: "Vos données sont protégées par des mesures de sécurité bancaire de niveau enterprise, incluant le chiffrement de bout en bout et l'authentification multi-facteurs.",
    color: "green",
    stats: "100%"
  },
  {
    icon: "💬",
    title: "Transparence Totale",
    description: "Aucun frais caché, aucun surprise. Tous nos taux, frais et conditions sont communiqués clairement avant toute signature de contrat.",
    color: "purple",
    stats: "0 Frais"
  },
  {
    icon: "👥",
    title: "Accompagnement Personnalisé",
    description: "Bénéficiez d'un conseiller dédié qui vous accompagne à chaque étape de votre projet, du dépôt de dossier au remboursement final.",
    color: "orange",
    stats: "1:1"
  },
  {
    icon: "🌍",
    title: "Accessibilité Maximale",
    description: "Nos solutions sont conçues pour être accessibles à tous, avec des conditions adaptées aux étudiants, entrepreneurs et particuliers.",
    color: "blue",
    stats: "99%"
  },
  {
    icon: "🔄",
    title: "Flexibilité Optimale",
    description: "Des plans de remboursement sur mesure, la possibilité de remboursement anticipé sans frais, et des reports de paiement en cas de besoin.",
    color: "green",
    stats: "Flex"
  }
];

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, isDark }) => {
  const colors = colorClasses[feature.color];
  
  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover="hover"
      className={`group relative p-8 rounded-3xl backdrop-blur-sm border-2 transition-all duration-300 cursor-default ${
        isDark 
          ? `${colors.bgDark} ${colors.borderDark} hover:bg-gray-800/60`
          : `${colors.bgLight} ${colors.borderLight} hover:bg-white/80`
      }`}
    >
      {/* Animated background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-300 ${
          isDark ? colors.dark : colors.light
        }`}        
      />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Icon with gradient background */}
        <div className="flex items-center justify-between mb-6">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
            isDark 
              ? 'bg-gray-700/50 text-gray-200' 
              : 'bg-white/80 text-gray-700'
          }`}>
            {feature.icon}
          </div>
          
          {/* Stats badge */}
          {feature.stats && (
            <motion.div
              variants={statVariants}
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                isDark 
                  ? 'bg-gray-700 text-gray-200' 
                  : 'bg-white text-gray-700'
              }`}
            >
              {feature.stats}
            </motion.div>
          )}
        </div>

        {/* Title and description */}
        <div>
          <h3 className={`text-xl font-bold mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {feature.title}
          </h3>
          <p className={`leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {feature.description}
          </p>
        </div>

        {/* Animated underline */}
        <motion.div
          className={`h-1 bg-gradient-to-r mt-4 ${
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
          y: [0, -8, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 0.7
        }}
        className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
          isDark ? colors.textDark : colors.textLight
        }`}
      />
    </motion.div>
  );
};

export const WhyChooseUs: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();

  return (
    <section className={`relative py-20 lg:py-32 overflow-hidden ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 opacity-[0.02] ${
          isDark 
            ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500'
            : 'bg-gradient-to-br from-blue-400 via-purple-400 to-orange-400'
        }`} />
      </div>

      {/* Animated background elements */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute -top-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-10 ${
          isDark ? 'bg-blue-500' : 'bg-blue-400'
        }`}
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute -bottom-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-10 ${
          isDark ? 'bg-purple-500' : 'bg-purple-400'
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
              {t('homepage', 'whyChooseUs.badge') || "Pourquoi nous choisir"}
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
            <span className="block">{t('homepage', 'whyChooseUs.title') || "L'excellence dans"}</span>
            <span className={`block bg-gradient-to-r bg-clip-text text-transparent ${
              isDark 
                ? 'from-blue-400 via-purple-400 to-orange-400'
                : 'from-blue-600 via-purple-600 to-orange-600'
            }`}>
              {t('homepage', 'whyChooseUs.subtitle') || "chaque détail"}
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
            {t('homepage', 'whyChooseUs.description') || "Nous repoussons constamment les limites de l'excellence pour vous offrir une expérience de financement incomparable, où chaque détail est pensé pour votre succès."}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={`${feature.title}-${index}`} 
              feature={feature} 
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
            className={`text-lg font-semibold mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t('homepage', 'whyChooseUs.ctaText') || "Prêt à bénéficier de notre expertise ?"}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex gap-4"
          >
            <button
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              {t('homepage', 'whyChooseUs.ctaPrimary') || "Commencer maintenant"}
            </button>
            <button
              className={`px-8 py-4 rounded-xl font-semibold text-lg border transition-all duration-300 ${
                isDark
                  ? 'border-gray-600 hover:bg-gray-800 text-white'
                  : 'border-gray-300 hover:bg-gray-100 text-gray-800'
              }`}
            >
              {t('homepage', 'whyChooseUs.ctaSecondary') || "Nous contacter"}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};