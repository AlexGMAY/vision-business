'use client';

import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '@/lib/i18n/client';
import { useDarkMode } from '@/components/shared/DarkModeProvider';

// Type-safe interfaces
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  content: string;
  avatar: string;
  loanType: string;
  amount: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal';
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isDark: boolean;
  isActive: boolean;
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

const cardVariants: Variants = {
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
      duration: 0.6,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -50,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8
  })
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
    textDark: 'text-gray-100',
    textLight: 'text-gray-700'
  },
  green: {
    light: 'from-green-500 to-green-600',
    dark: 'from-green-400 to-green-500',
    bgLight: 'bg-green-500/10',
    bgDark: 'bg-green-400/10',
    borderLight: 'border-green-500/20',
    borderDark: 'border-green-400/20',
    textDark: 'text-gray-100',
    textLight: 'text-gray-700'
  },
  purple: {
    light: 'from-purple-500 to-purple-600',
    dark: 'from-purple-400 to-purple-500',
    bgLight: 'bg-purple-500/10',
    bgDark: 'bg-purple-400/10',
    borderLight: 'border-purple-500/20',
    borderDark: 'border-purple-400/20',
    textDark: 'text-gray-100',
    textLight: 'text-gray-700'
  },
  orange: {
    light: 'from-orange-500 to-orange-600',
    dark: 'from-orange-400 to-orange-500',
    bgLight: 'bg-orange-500/10',
    bgDark: 'bg-orange-400/10',
    borderLight: 'border-orange-500/20',
    borderDark: 'border-orange-400/20',
    textDark: 'text-gray-100',
    textLight: 'text-gray-700'
  },
  red: {
    light: 'from-red-500 to-red-600',
    dark: 'from-red-400 to-red-500',
    bgLight: 'bg-red-500/10',
    bgDark: 'bg-red-400/10',
    borderLight: 'border-red-500/20',
    borderDark: 'border-red-400/20',
    textDark: 'text-gray-100',
    textLight: 'text-gray-700'
  },
  teal: {
    light: 'from-teal-500 to-teal-600',
    dark: 'from-teal-400 to-teal-500',
    bgLight: 'bg-teal-500/10',
    bgDark: 'bg-teal-400/10',
    borderLight: 'border-teal-500/20',
    borderDark: 'border-teal-400/20',
    textDark: 'text-gray-100',
    textLight: 'text-gray-700'
  }
};

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marie Kondi',
    role: 'Étudiante en Médecine',
    company: 'Université de Kinshasa',
    rating: 5,
    content: "Grâce au prêt étudiant de Vision Business, j'ai pu financer intégralement mes frais de scolarité sans stress. Le processus était incroyablement simple et l'équipe extrêmement à l'écoute. Je recommande vivement !",
    avatar: '👩‍🎓',
    loanType: 'Prêt Étudiant',
    amount: '2,500,000 FC',
    color: 'blue'
  },
  {
    id: '2',
    name: 'Jean Aké',
    role: 'Entrepreneur',
    company: 'Aké Industries',
    rating: 5,
    content: "Le prêt PME m'a permis d'acquérir de nouvelles machines et de doubler notre capacité de production. L'accompagnement personnalisé et la flexibilité des remboursements ont fait toute la différence pour mon entreprise.",
    avatar: '👨‍💼',
    loanType: 'Prêt PME',
    amount: '15,000,000 FC',
    color: 'green'
  },
  {
    id: '3',
    name: 'Aminata Tshibondo',
    role: 'Infirmière',
    company: 'CHU de Cocody',
    rating: 5,
    content: "J'ai utilisé le prêt personnel pour financer le mariage de mes rêves. Tout s'est déroulé à la perfection : délais respectés, communication claire, et des mensualités adaptées à mon budget. Merci Vision Business !",
    avatar: '👰',
    loanType: 'Prêt Personnel',
    amount: '3,000,000 FC',
    color: 'purple'
  },
  {
    id: '4',
    name: 'Koffi Yao',
    role: 'Commerçant',
    company: 'Yao Market',
    rating: 5,
    content: "Quand j'ai eu une urgence familiale, Vision Business m'a accordé un prêt en moins de 4 heures. Leur réactivité et leur compassion dans les moments difficiles sont remarquables. Vraiment professionnels !",
    avatar: '👨‍💻',
    loanType: 'Prêt Urgence',
    amount: '1,500,000 FC',
    color: 'red'
  },
  {
    id: '5',
    name: 'John Bamba',
    role: 'Agricultrice',
    company: 'Ferme Bamba',
    rating: 5,
    content: "Le prêt équipement m'a permis d'acheter un nouveau tracteur et des systèmes d'irrigation modernes. Ma production a augmenté de 60% en 6 mois. Un investissement qui porte ses fruits !",
    avatar: '👩‍🌾',
    loanType: 'Prêt Équipement',
    amount: '8,000,000 FC',
    color: 'orange'
  },
  {
    id: '6',
    name: 'Paul N\'Guesso',
    role: 'Ingénieur',
    company: 'Smart Solutions',
    rating: 5,
    content: "Avec le prêt logement, j'ai pu acheter mon premier appartement. L'expertise immobilière incluse et les taux avantageux ont rendu mon projet accessible. Je suis maintenant propriétaire grâce à Vision Business !",
    avatar: '👨‍🔧',
    loanType: 'Prêt Logement',
    amount: '25,000,000 FC',
    color: 'teal'
  }
];

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isDark, isActive }) => {
  const colors = colorClasses[testimonial.color];
  
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative p-8 rounded-3xl backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer ${
        isDark 
          ? `${colors.bgDark} ${colors.borderDark} hover:bg-gray-800/60`
          : `${colors.bgLight} ${colors.borderLight} hover:bg-white/80`
      } ${isActive ? 'ring-2 ring-opacity-50' : ''}`}
      style={{
        boxShadow: isActive 
          ? isDark 
            ? `0 20px 40px rgba(59, 130, 246, 0.15)`
            : `0 20px 40px rgba(59, 130, 246, 0.1)`
          : 'none'
      }}
    >
      {/* Quote icon */}
      <div className="text-4xl mb-4 opacity-20">❝</div>

      {/* Rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">
            {i < testimonial.rating ? '★' : '☆'}
          </span>
        ))}
      </div>

      {/* Content */}
      <blockquote className={`text-lg leading-relaxed mb-6 italic ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        "{testimonial.content}"
      </blockquote>

      {/* Author info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
            isDark ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            {testimonial.avatar}
          </div>
          <div>
            <div className={`font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {testimonial.name}
            </div>
            <div className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {testimonial.role}
            </div>
            {testimonial.company && (
              <div className={`text-xs ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {testimonial.company}
              </div>
            )}
          </div>
        </div>

        {/* Loan info */}
        <div className="text-right">
          <div className={`text-sm font-semibold ${
            isDark ? colors.textDark : colors.textLight
          }`}>
            {testimonial.loanType}
          </div>
          <div className={`text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {testimonial.amount}
          </div>
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${
            isDark ? 'bg-green-400' : 'bg-green-500'
          }`}
        />
      )}
    </motion.div>
  );
};

export const Testimonial = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    setCurrentIndex([(currentIndex + 1) % testimonials.length, 1]);
  };

  const prevTestimonial = () => {
    setCurrentIndex([
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1,
      -1
    ]);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex([index, index > currentIndex ? 1 : -1]);
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextTestimonial, 5000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isPaused]);

  const visibleTestimonials = [
    testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length],
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length]
  ];

return (
  <section 
    className={`relative py-20 lg:py-32 overflow-hidden ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
  >
    {/* Background pattern */}
    <div className="absolute inset-0">
      <div className={`absolute inset-0 opacity-[0.02] ${
        isDark 
          ? 'bg-gradient-to-br from-yellow-500 via-red-500 to-purple-500'
          : 'bg-gradient-to-br from-yellow-400 via-red-400 to-purple-400'
      }`} />
    </div>

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
          className={`inline-flex items-center px-6 py-3 rounded-full backdrop-blur-sm border mb-6 ${
            isDark ? 'border-gray-700' : 'border-gray-300'
          }`}
        >
          <span className={`text-sm font-semibold ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t('homepage', 'testimonials.badge') || "Témoignages clients"}
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
          <span className="block">{t('homepage', 'testimonials.title') || "Ils nous font"}</span>
          <span className={`block bg-gradient-to-r bg-clip-text text-transparent ${
            isDark 
              ? 'from-yellow-400 via-red-400 to-purple-400'
              : 'from-yellow-600 via-red-600 to-purple-600'
          }`}>
            {t('homepage', 'testimonials.subtitle') || "confiance"}
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
          {t('homepage', 'testimonials.description') || "Découvrez les expériences authentiques de nos clients qui ont transformé leurs projets en réalité grâce à nos solutions de financement."}
        </motion.p>
      </motion.div>

      {/* Stacked Cards Testimonials */}
      <div className="relative max-w-6xl mx-auto">
        <div className="relative h-[400px] flex items-center justify-center">
          {testimonials.map((testimonial, index) => {
            const position = index - currentIndex;
            const isActive = position === 0;
            const isNext = position === 1;
            const isPrevious = position === -1;
            const isHidden = Math.abs(position) > 2;

            if (isHidden) return null;

            return (
              <motion.div
                key={testimonial.id}
                className={`absolute cursor-pointer ${
                  isActive ? 'z-30' : isNext || isPrevious ? 'z-20' : 'z-10'
                }`}
                style={{
                  originX: 0.5,
                  originY: 0.5,
                  width: '380px'
                }}
                initial={false}
                animate={{
                  x: position * 300,
                  scale: 1 - Math.abs(position) * 0.15,
                  rotate: position * 5,
                  opacity: 1 - Math.abs(position) * 0.4,
                  filter: `blur(${Math.abs(position) * 2}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                onClick={() => {
                  if (isNext) nextTestimonial();
                  if (isPrevious) prevTestimonial();
                  if (Math.abs(position) > 1) goToTestimonial(index);
                }}
                whileHover={{
                  scale: isActive ? 1 : 1.05,
                  y: isActive ? 0 : -10,
                }}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isDark={isDark}
                  isActive={isActive} index={0}                />
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center space-x-8 mt-20">
          <button
            onClick={prevTestimonial}
            className={`w-14 h-14 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-200 ${
              isDark
                ? 'bg-gray-800/80 border-gray-700 hover:bg-gray-700 text-white hover:scale-110'
                : 'bg-white/80 border-gray-300 hover:bg-white text-gray-800 hover:scale-110'
            }`}
            aria-label="Previous testimonial"
          >
            ←
          </button>
          
          {/* Progress Dots */}
          <div className="flex space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? isDark ? 'bg-blue-400 scale-125' : 'bg-blue-500 scale-125'
                    : isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className={`w-14 h-14 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-200 ${
              isDark
                ? 'bg-gray-800/80 border-gray-700 hover:bg-gray-700 text-white hover:scale-110'
                : 'bg-white/80 border-gray-300 hover:bg-white text-gray-800 hover:scale-110'
            }`}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        {/* Auto-slide indicator */}
        <div className="text-center mt-8 space-y-2">   
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`inline-flex items-center space-x-2 text-sm ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              isPaused 
                ? isDark ? 'bg-yellow-400' : 'bg-yellow-500'
                : isDark ? 'bg-green-400' : 'bg-green-500'
            }`} />
            <span>
              {isPaused ? 'Défilement en pause' : 'Défilement automatique'}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);
};