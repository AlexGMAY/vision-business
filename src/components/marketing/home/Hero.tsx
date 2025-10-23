'use client';

import { motion, Variants, Transition } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import Image from 'next/image';

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
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const buttonTransition: Transition = {
  duration: 0.5,
  ease: "easeOut"
};

const buttonVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: buttonTransition
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.98
  }
};

const backgroundShapeVariants: Variants = {
  animate: {
    x: [0, 100, 0],
    y: [0, -50, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const backgroundShapeVariants2: Variants = {
  animate: {
    x: [0, -100, 0],
    y: [0, 50, 0],
    scale: [1, 1.2, 1],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const scrollIndicatorVariants: Variants = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
};

const scrollDotVariants: Variants = {
  animate: {
    y: [0, 12, 0],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
};

const arrowVariants: Variants = {
  animate: {
    x: [0, 4, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity
    }
  }
};

interface TrustItem {
  label: string;
  value: string;
}

const trustItems: TrustItem[] = [
  { label: "Clients satisfaits", value: "80+" },
  { label: "Fonds débloqués", value: "2M+" },
  { label: "Taux satisfaction", value: "98%" },
  { label: "Décision rapide", value: "24-48h" }
];

interface TrustIndicatorProps {
  item: TrustItem;
  index: number;
}

const TrustIndicator: React.FC<TrustIndicatorProps> = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 + index * 0.1 }}
    className="text-center"
  >
    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
      {item.value}
    </div>
    <div className="text-sm text-white/60 font-medium">
      {item.label}
    </div>
  </motion.div>
);

interface CTAButtonProps {
  href: string;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  isDark: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({ href, variant, children, isDark }) => {
  const isPrimary = variant === 'primary';
  
  const primaryClasses = isDark 
    ? 'text-white bg-blue-600 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/25'
    : 'text-white bg-blue-600 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/25';
  
  const secondaryClasses = isDark
    ? 'text-white bg-transparent border-2 border-white/30 hover:border-white/50 backdrop-blur-sm hover:bg-white/10'
    : 'text-blue-600 bg-transparent border-2 border-blue-600/30 hover:border-blue-600/50 backdrop-blur-sm hover:bg-blue-50';

  return (
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <Link
        href={href}
        className={`
          group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl overflow-hidden transition-all duration-300
          ${isPrimary ? primaryClasses : secondaryClasses}
        `}
      >
        {isPrimary && (
          <>
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 ${
              isDark ? '' : 'from-blue-600 to-purple-600'
            }`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </>
        )}
        
        <span className="relative flex items-center space-x-2">
          <span>{children}</span>
          {isPrimary && (
            <motion.span
              variants={arrowVariants}
              animate="animate"
            >
              →
            </motion.span>
          )}
        </span>
      </Link>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();

  // Dynamic background based on theme
  const backgroundGradient = isDark
    ? 'bg-gradient-to-br from-blue-900/90 via-blue-800/70 to-purple-900/80'
    : 'bg-gradient-to-br from-blue-800/90 via-cyan-800/70 to-purple-900/80';

  const textGradient = isDark
    ? 'bg-gradient-to-r from-cyan-300 to-purple-500'
    : 'bg-gradient-to-r from-white to-blue-50';

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden`}>
      {/* Background Image with Next.js Image */}
      <div className="absolute inset-0">
        <Image
          src={isDark ? "/images/vb-micro-bg.jpg" : "/images/entreprise-bg.jpg"}
          alt="Vision Business Micorfinance - prêts pour tous vos besoins"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Gradient Overlay - Different for light/dark mode */}
      <div className={`absolute inset-0 ${backgroundGradient}`} />
      
      {/* Optional Pattern Overlay */}
      <div className={`absolute inset-0 opacity-[0.03] ${
        isDark 
          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500'
          : 'bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400'
      }`} />

      {/* Background Elements */}
      <div className={`absolute inset-0 ${isDark ? 'bg-black/20' : 'bg-white/10'}`} />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
            isDark ? 'bg-blue-500/10' : 'bg-blue-400/20'
          }`}
          variants={backgroundShapeVariants}
          animate="animate"
        />
        <motion.div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/10' : 'bg-purple-400/20'
          }`}
          variants={backgroundShapeVariants2}
          animate="animate"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className={`inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm border mb-8 ${
              isDark 
                ? 'bg-white/10 border-white/20 text-white/90' 
                : 'bg-white/20 border-white/30 text-gray-800'
            }`}
          >
            <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
              isDark ? 'bg-green-400' : 'bg-green-500'
            }`} />
            <span className="text-sm font-medium">
              {t('common', 'trustedBy') || "Partenaire de confiance de +80 clients"}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span>{t('homepage', 'hero.title') || "Donnez vie"}</span> {""}
            <span className={`bg-clip-text text-transparent ${textGradient}`}>
              {t('homepage', 'hero.subtitle') || "à vos projets"}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-white/80' : 'text-white/90'
            }`}
          >
            {t('homepage', 'hero.description') || "Prêts rapides et transparents pour étudiants, petites entreprises et besoins personnels. Votre vision est notre métier."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <CTAButton href="/demander" variant="primary" isDark={isDark}>
              {t('homepage', 'hero.ctaPrimary') || "Demander un prêt"}
            </CTAButton>
            
            <CTAButton href="/prets" variant="secondary" isDark={isDark}>
              {t('homepage', 'hero.ctaSecondary') || "Découvrir nos solutions"}
            </CTAButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {trustItems.map((item, index) => (
              <TrustIndicator key={item.label} item={item} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          variants={scrollIndicatorVariants}
          animate="animate"
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            isDark ? 'border-white/30' : 'border-white/40'
          }`}
        >
          <motion.div
            variants={scrollDotVariants}
            animate="animate"
            className={`w-1 h-3 rounded-full mt-2 ${
              isDark ? 'bg-white/50' : 'bg-white/60'
            }`}
          />
        </motion.div>
      </motion.div> */}
    </section>
  );
};