'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import Image from 'next/image';

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

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
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

const imageVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -5 
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    rotate: 2,
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
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2
    }
  }
};

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface StatItem {
  number: string;
  label: string;
  suffix?: string;
}

const values: ValueItem[] = [
  {
    icon: "🤝",
    title: "Confiance & Transparence",
    description: "Des relations basées sur l'honnêteté et la clarté totale dans toutes nos opérations"
  },
  {
    icon: "⚡",
    title: "Innovation Continue", 
    description: "Nous repoussons les limites pour vous offrir des solutions financières modernes et efficaces"
  },
  {
    icon: "🎯",
    title: "Impact Social",
    description: "Notre mission est de créer un impact positif durable dans les communautés que nous servons"
  },
  {
    icon: "🔒",
    title: "Sécurité Maximale",
    description: "La protection de vos données et de vos investissements est notre priorité absolue"
  }
];

const stats: StatItem[] = [
  { number: "5", label: "Ans d'expérience", suffix: "+" },
  { number: "80", label: "Clients satisfaits", suffix: "+" },
  { number: "98", label: "Taux de satisfaction", suffix: "%" },
  { number: "2", label: "Millions débloqués", suffix: "M+" }
];

interface ValueCardProps {
  value: ValueItem;
  index: number;
  isDark: boolean;
}

const ValueCard: React.FC<ValueCardProps> = ({ value, index, isDark }) => (
  <motion.div
    variants={itemVariants}
    custom={index}
    whileHover="hover"
    className={`group relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
      isDark
        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/80 hover:border-blue-500/30'
        : 'bg-white/80 border-gray-200 hover:bg-white hover:border-blue-400/30'
    }`}
  >
    {/* Background glow effect */}
    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
      isDark 
        ? 'from-blue-500/10 to-purple-500/10' 
        : 'from-blue-400/10 to-purple-400/10'
    }`} />
    
    <div className="relative z-10">
      <div className="text-4xl mb-4">{value.icon}</div>
      <h3 className={`text-xl font-bold mb-3 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {value.title}
      </h3>
      <p className={`leading-relaxed ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {value.description}
      </p>
    </div>
  </motion.div>
);

interface StatCardProps {
  stat: StatItem;
  index: number;
  isDark: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index, isDark }) => (
  <motion.div
    variants={statVariants}
    custom={index}
    whileHover="hover"
    className="text-center"
  >
    <div className={`text-4xl md:text-5xl font-bold mb-2 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>
      {stat.number}<span className="text-blue-500">{stat.suffix}</span>
    </div>
    <div className={`text-sm font-medium ${
      isDark ? 'text-gray-400' : 'text-gray-600'
    }`}>
      {stat.label}
    </div>
  </motion.div>
);

export const About: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();

  return (
    <section className={`relative py-20 lg:py-32 overflow-hidden ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute inset-0 ${
          isDark ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-gradient-to-br from-blue-400 to-purple-400'
        }`} />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Text Content */}
            <motion.div variants={itemVariants}>
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
              >
                <span className={`text-sm font-medium ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {t('homepage', 'about.badge') || "À propos de nous"}
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                <span className="block">{t('homepage', 'about.title') || "Notre Mission"}</span>
                <span className={`block bg-gradient-to-r bg-clip-text text-transparent ${
                  isDark 
                    ? 'from-blue-400 to-purple-400' 
                    : 'from-blue-600 to-purple-600'
                }`}>
                  {t('homepage', 'about.subtitle') || "Votre Réussite"}
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className={`text-xl leading-relaxed mb-8 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t('homepage', 'about.description') || "Vision Business Microfinance est bien plus qu'une institution financière. Nous sommes le partenaire de confiance qui transforme vos ambitions en réalité. Fondée sur des principes d'intégrité et d'innovation, notre mission est de rendre le financement accessible à tous."}
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12"
              >
                {stats.map((stat, index) => (
                  <StatCard key={stat.label} stat={stat} index={index} isDark={isDark} />
                ))}
              </motion.div>
            </motion.div>

            {/* Image/Visual Content */}
            <motion.div
              variants={imageVariants}
              whileHover="hover"
              className="relative"
            >
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}>
                {/* Placeholder for company image */}
                <div className={`aspect-square flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="text-center p-8">                    
                    <Image
                      src={isDark ? "/images/entreprise-color.jpg" : "/images/enterprise-interior.jpg"}
                      alt="Vision Business Micorfinance - prêts pour tous vos besoins"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`absolute -top-4 -right-4 w-20 h-20 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${
                    isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  }`}
                >
                  💼
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className={`absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl flex items-center justify-center text-xl shadow-lg ${
                    isDark ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
                  }`}
                >
                  📈
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('homepage', 'about.valuesTitle') || "Nos Valeurs Fondamentales"}
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <ValueCard key={value.title} value={value} index={index} isDark={isDark} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};