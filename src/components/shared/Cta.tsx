'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

// Type-safe interfaces
interface CtaProps {
  title: string;
  subtitle?: string;
  primaryButton: {
    text: string;
    href: string;
    icon?: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
    icon?: string;
  };
  variant?: 'default' | 'gradient' | 'minimal' | 'featured';
  alignment?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  backgroundImage?: string;
  overlay?: boolean;
  stats?: Array<{
    value: string;
    label: string;
    icon?: string;
  }>;
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

const buttonVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
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

const statVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
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

// Variant styles
const variantStyles = {
  default: {
    light: 'bg-white border-gray-200',
    dark: 'bg-gray-800 border-gray-700'
  },
  gradient: {
    light: 'bg-gradient-to-r from-blue-600 to-purple-600',
    dark: 'bg-gradient-to-r from-blue-700 to-purple-700'
  },
  minimal: {
    light: 'bg-transparent border-gray-200',
    dark: 'bg-transparent border-gray-700'
  },
  featured: {
    light: 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200',
    dark: 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
  }
};

// Size styles
const sizeStyles = {
  sm: {
    padding: 'py-12 lg:py-16',
    title: 'text-2xl md:text-3xl',
    subtitle: 'text-base',
    button: 'px-6 py-3 text-base'
  },
  md: {
    padding: 'py-16 lg:py-20',
    title: 'text-3xl md:text-4xl',
    subtitle: 'text-lg',
    button: 'px-8 py-4 text-lg'
  },
  lg: {
    padding: 'py-20 lg:py-24',
    title: 'text-4xl md:text-5xl',
    subtitle: 'text-xl',
    button: 'px-10 py-4 text-lg'
  },
  xl: {
    padding: 'py-24 lg:py-32',
    title: 'text-5xl md:text-6xl',
    subtitle: 'text-xl md:text-2xl',
    button: 'px-12 py-5 text-xl'
  }
};

// Alignment styles
const alignmentStyles = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end'
};

interface CtaButtonProps {
  button: {
    text: string;
    href: string;
    icon?: string;
  };
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg' | 'xl';
  isDark: boolean;
  ctaVariant: 'default' | 'gradient' | 'minimal' | 'featured';
}

const CtaButton: React.FC<CtaButtonProps> = ({ button, variant, size, isDark, ctaVariant }) => {
  const isPrimary = variant === 'primary';
  
  const baseClasses = `inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ${sizeStyles[size].button}`;
  
  const primaryClasses = ctaVariant === 'gradient' 
    ? 'bg-white text-blue-600 hover:bg-blue-50 hover:shadow-2xl hover:shadow-white/25'
    : isDark
      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25';

  const secondaryClasses = ctaVariant === 'gradient'
    ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
    : isDark
      ? 'border-2 border-gray-600 hover:bg-gray-700 text-white'
      : 'border-2 border-gray-300 hover:bg-gray-100 text-gray-800';

  return (
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <Link
        href={button.href}
        className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
      >
        <span className="flex items-center space-x-2">
          <span>{button.text}</span>
          {button.icon && <span>{button.icon}</span>}
          {isPrimary && (
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          )}
        </span>
      </Link>
    </motion.div>
  );
};

interface StatItemProps {
  stat: {
    value: string;
    label: string;
    icon?: string;
  };
  isDark: boolean;
  ctaVariant: 'default' | 'gradient' | 'minimal' | 'featured';
}

const StatItem: React.FC<StatItemProps> = ({ stat, isDark, ctaVariant }) => (
  <motion.div
    variants={statVariants}
    className="text-center"
  >
    <div className={`text-2xl md:text-3xl font-bold mb-1 ${
      ctaVariant === 'gradient' ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'
    }`}>
      {stat.value}
    </div>
    <div className={`text-sm ${
      ctaVariant === 'gradient' ? 'text-white/80' : isDark ? 'text-gray-400' : 'text-gray-600'
    }`}>
      {stat.label}
    </div>
  </motion.div>
);

export const Cta: React.FC<CtaProps> = ({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  variant = 'default',
  alignment = 'center',
  size = 'lg',
  className = '',
  backgroundImage,
  overlay = true,
  stats = []
}) => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const alignmentStyle = alignmentStyles[alignment];

  const isGradientVariant = variant === 'gradient';
  const textColor = isGradientVariant 
    ? 'text-white' 
    : isDark 
      ? 'text-white' 
      : 'text-gray-900';

  const subtitleColor = isGradientVariant
    ? 'text-white/80'
    : isDark
      ? 'text-gray-400'
      : 'text-gray-600';

  return (
    <section 
      className={`relative overflow-hidden ${sizeStyle.padding} ${className} ${
        variant !== 'gradient' && (isDark ? variantStyle.dark : variantStyle.light)
      } ${variant === 'minimal' ? 'border' : ''}`}
      style={{
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background overlay for image */}
      {backgroundImage && overlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Gradient background for gradient variant */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
      )}

      {/* Animated background elements for featured variant */}
      {variant === 'featured' && (
        <>
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
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-10 ${
              isDark ? 'bg-blue-500' : 'bg-blue-400'
            }`}
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-10 ${
              isDark ? 'bg-purple-500' : 'bg-purple-400'
            }`}
          />
        </>
      )}

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={`flex flex-col ${alignmentStyle} max-w-4xl mx-auto`}
        >
          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className={`${sizeStyle.title} font-bold mb-4 leading-tight ${textColor}`}
          >
            {title}
          </motion.h2>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              variants={itemVariants}
              className={`${sizeStyle.subtitle} mb-8 max-w-2xl ${subtitleColor} ${
                alignment === 'center' ? 'mx-auto' : ''
              }`}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className={`flex flex-col sm:flex-row gap-4 mb-12 ${
              alignment === 'center' ? 'justify-center' : 
              alignment === 'right' ? 'justify-end' : 'justify-start'
            }`}
          >
            <CtaButton
              button={primaryButton}
              variant="primary"
              size={size}
              isDark={isDark}
              ctaVariant={variant}
            />
            
            {secondaryButton && (
              <CtaButton
                button={secondaryButton}
                variant="secondary"
                size={size}
                isDark={isDark}
                ctaVariant={variant}
              />
            )}
          </motion.div>

          {/* Stats */}
          {stats.length > 0 && (
            <motion.div
              variants={itemVariants}
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl ${
                alignment === 'center' ? 'mx-auto' : ''
              }`}
            >
              {stats.map((stat, index) => (
                <StatItem
                  key={stat.label}
                  stat={stat}
                  isDark={isDark}
                  ctaVariant={variant}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Pre-configured CTA variants for common use cases
export const HomepageCta: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Cta
      title={t('homepage', 'cta.homepage.title') || "Prêt à concrétiser vos projets ?"}
      subtitle={t('homepage', 'cta.homepage.subtitle') || "Rejoignez des milliers de clients satisfaits qui ont transformé leurs rêves en réalité avec Vision Business."}
      primaryButton={{
        text: t('homepage', 'cta.homepage.primaryButton') || "Demander un prêt",
        href: "/application",
        icon: "🚀"
      }}
      secondaryButton={{
        text: t('homepage', 'cta.homepage.secondaryButton') || "Nous contacter",
        href: "/contact"
      }}
      variant="gradient"
      size="lg"
      alignment="center"
      stats={[
        { value: "80+", label: "Clients satisfaits" },
        { value: "98%", label: "Taux de satisfaction" },
        { value: "24-48h", label: "Décision rapide" },
        { value: "2M+", label: "Fonds débloqués" }
      ]}
    />
  );
};

export const LoansCta: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Cta
      title={t('homepage', 'cta.loans.title') || "Trouvez le prêt parfait pour votre projet"}
      subtitle={t('homepage', 'cta.loans.subtitle') || "Avec 6 solutions de financement adaptées, nous avons le prêt qu'il vous faut, quel que soit votre projet."}
      primaryButton={{
        text: t('homepage', 'cta.loans.primaryButton') || "Voir tous les prêts",
        href: "/prets"
      }}
      variant="featured"
      size="lg"
      alignment="center"
    />
  );
};

export const ContactCta: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Cta
      title={t('homepage', 'cta.contact.title') || "Besoin d'aide pour choisir ?"}
      subtitle={t('homepage', 'cta.contact.subtitle') || "Notre équipe d'experts est à votre écoute pour vous guider vers la solution de financement la plus adaptée à votre situation."}
      primaryButton={{
        text: t('homepage', 'cta.contact.primaryButton') || "Nous contacter",
        href: "/contact",
        icon: "💬"
      }}
      secondaryButton={{
        text: t('homepage', 'cta.contact.secondaryButton') || "Appeler maintenant",
        href: "tel:+243859856525"
      }}
      variant="minimal"
      size="md"
      alignment="center"
    />
  );
};