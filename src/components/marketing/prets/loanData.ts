import { LoanProduct } from './types';

// Color system
export const colorClasses = {
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

// All 14 loan products with translation keys
export const allLoanProducts: LoanProduct[] = [
  // Original 6 products
  {
    id: 'student-loan',
    title: 'loans.products.student.title',
    subtitle: 'loans.products.student.subtitle',
    description: 'loans.products.student.description',
    amount: 'loans.products.student.amount',
    interestRate: 'loans.products.student.interestRate',
    term: 'loans.products.student.term',
    features: [
      'loans.products.student.features.0',
      'loans.products.student.features.1',
      'loans.products.student.features.2',
      'loans.products.student.features.3'
    ],
    eligibility: [
      'loans.products.student.eligibility.0',
      'loans.products.student.eligibility.1',
      'loans.products.student.eligibility.2',
      'loans.products.student.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.student.documents.0',
      'loans.products.student.documents.1',
      'loans.products.student.documents.2',
      'loans.products.student.documents.3'
    ],
    icon: '🎓',
    color: 'blue',
    image: '/images/loans/student.jpg',
    category: 'student',
    amountRange: {
      min: 0,
      max: 0
    },
    termRange: {
      min: 0,
      max: 0
    },
    speed: '',
    bestFor: []
  },
  {
    id: 'business-loan',
    title: 'loans.products.business.title',
    subtitle: 'loans.products.business.subtitle',
    description: 'loans.products.business.description',
    amount: 'loans.products.business.amount',
    interestRate: 'loans.products.business.interestRate',
    term: 'loans.products.business.term',
    features: [
      'loans.products.business.features.0',
      'loans.products.business.features.1',
      'loans.products.business.features.2',
      'loans.products.business.features.3'
    ],
    eligibility: [
      'loans.products.business.eligibility.0',
      'loans.products.business.eligibility.1',
      'loans.products.business.eligibility.2',
      'loans.products.business.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.business.documents.0',
      'loans.products.business.documents.1',
      'loans.products.business.documents.2',
      'loans.products.business.documents.3'
    ],
    icon: '🏢',
    color: 'green',
    image: '/images/loans/business.jpg',
    category: 'business',
    amountRange: {
      min: 0,
      max: 0
    },
    termRange: {
      min: 0,
      max: 0
    },
    speed: '',
    bestFor: []
  },
  {
    id: 'personal-loan',
    title: 'loans.products.personal.title',
    subtitle: 'loans.products.personal.subtitle',
    description: 'loans.products.personal.description',
    amount: 'loans.products.personal.amount',
    interestRate: 'loans.products.personal.interestRate',
    term: 'loans.products.personal.term',
    features: [
      'loans.products.personal.features.0',
      'loans.products.personal.features.1',
      'loans.products.personal.features.2',
      'loans.products.personal.features.3'
    ],
    eligibility: [
      'loans.products.personal.eligibility.0',
      'loans.products.personal.eligibility.1',
      'loans.products.personal.eligibility.2',
      'loans.products.personal.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.personal.documents.0',
      'loans.products.personal.documents.1',
      'loans.products.personal.documents.2',
      'loans.products.personal.documents.3'
    ],
    icon: '👨‍👩‍👧‍👦',
    color: 'purple',
    image: '/images/loans/personal.jpg',
    category: 'personal',
    amountRange: {
      min: 0,
      max: 0
    },
    termRange: {
      min: 0,
      max: 0
    },
    speed: '',
    bestFor: []
  },
  {
    id: 'emergency-loan',
    title: 'loans.products.emergency.title',
    subtitle: 'loans.products.emergency.subtitle',
    description: 'loans.products.emergency.description',
    amount: 'loans.products.emergency.amount',
    interestRate: 'loans.products.emergency.interestRate',
    term: 'loans.products.emergency.term',
    features: [
      'loans.products.emergency.features.0',
      'loans.products.emergency.features.1',
      'loans.products.emergency.features.2',
      'loans.products.emergency.features.3'
    ],
    eligibility: [
      'loans.products.emergency.eligibility.0',
      'loans.products.emergency.eligibility.1',
      'loans.products.emergency.eligibility.2',
      'loans.products.emergency.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.emergency.documents.0',
      'loans.products.emergency.documents.1',
      'loans.products.emergency.documents.2',
      'loans.products.emergency.documents.3'
    ],
    icon: '🚑',
    color: 'red',
    image: '/images/loans/emergency.jpg',
    category: 'emergency',
    amountRange: {
      min: 0,
      max: 0
    },
    termRange: {
      min: 0,
      max: 0
    },
    speed: '',
    bestFor: []
  },
  {
    id: 'equipment-loan',
    title: 'loans.products.equipment.title',
    subtitle: 'loans.products.equipment.subtitle',
    description: 'loans.products.equipment.description',
    amount: 'loans.products.equipment.amount',
    interestRate: 'loans.products.equipment.interestRate',
    term: 'loans.products.equipment.term',
    features: [
      'loans.products.equipment.features.0',
      'loans.products.equipment.features.1',
      'loans.products.equipment.features.2',
      'loans.products.equipment.features.3'
    ],
    eligibility: [
      'loans.products.equipment.eligibility.0',
      'loans.products.equipment.eligibility.1',
      'loans.products.equipment.eligibility.2',
      'loans.products.equipment.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.equipment.documents.0',
      'loans.products.equipment.documents.1',
      'loans.products.equipment.documents.2',
      'loans.products.equipment.documents.3'
    ],
    icon: '🛠️',
    color: 'orange',
    image: '/images/loans/equipment.jpg',
    category: 'equipment',
    amountRange: {
      min: 0,
      max: 0
    },
    termRange: {
      min: 0,
      max: 0
    },
    speed: '',
    bestFor: []
  },
  {
    id: 'housing-loan',
    title: 'loans.products.housing.title',
    subtitle: 'loans.products.housing.subtitle',
    description: 'loans.products.housing.description',
    amount: 'loans.products.housing.amount',
    interestRate: 'loans.products.housing.interestRate',
    term: 'loans.products.housing.term',
    features: [
      'loans.products.housing.features.0',
      'loans.products.housing.features.1',
      'loans.products.housing.features.2',
      'loans.products.housing.features.3'
    ],
    eligibility: [
      'loans.products.housing.eligibility.0',
      'loans.products.housing.eligibility.1',
      'loans.products.housing.eligibility.2',
      'loans.products.housing.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.housing.documents.0',
      'loans.products.housing.documents.1',
      'loans.products.housing.documents.2',
      'loans.products.housing.documents.3'
    ],
    icon: '🏠',
    color: 'teal',
    image: '/images/loans/housing.jpg',
    category: 'housing',
    amountRange: {
      min: 0,
      max: 0
    },
    termRange: {
      min: 0,
      max: 0
    },
    speed: '',
    bestFor: []
  },
  // 4 New products
  {
    id: 'agriculture-loan',
    title: 'loans.products.agriculture.title',
    subtitle: 'loans.products.agriculture.subtitle',
    description: 'loans.products.agriculture.description',
    amount: 'loans.products.agriculture.amount',
    interestRate: 'loans.products.agriculture.interestRate',
    term: 'loans.products.agriculture.term',
    features: [
      'loans.products.agriculture.features.0',
      'loans.products.agriculture.features.1',
      'loans.products.agriculture.features.2',
      'loans.products.agriculture.features.3'
    ],
    eligibility: [
      'loans.products.agriculture.eligibility.0',
      'loans.products.agriculture.eligibility.1',
      'loans.products.agriculture.eligibility.2',
      'loans.products.agriculture.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.agriculture.documents.0',
      'loans.products.agriculture.documents.1',
      'loans.products.agriculture.documents.2',
      'loans.products.agriculture.documents.3'
    ],
    icon: '🌾',
    color: 'green',
    image: '/images/loans/agriculture.jpg',
    category: 'agriculture',
    amountRange: {
      min: 0,
      max: 0
    },
    termRange: {
      min: 0,
      max: 0
    },
    speed: '',
    bestFor: []
  },
  {
    id: 'auto-loan',
    title: 'loans.products.auto.title',
    subtitle: 'loans.products.auto.subtitle',
    description: 'loans.products.auto.description',
    amount: 'loans.products.auto.amount',
    interestRate: 'loans.products.auto.interestRate',
    term: 'loans.products.auto.term',
    features: [
      'loans.products.auto.features.0',
      'loans.products.auto.features.1',
      'loans.products.auto.features.2',
      'loans.products.auto.features.3'
    ],
    eligibility: [
      'loans.products.auto.eligibility.0',
      'loans.products.auto.eligibility.1',
      'loans.products.auto.eligibility.2',
      'loans.products.auto.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.auto.documents.0',
      'loans.products.auto.documents.1',
      'loans.products.auto.documents.2',
      'loans.products.auto.documents.3'
    ],
    icon: '🚗',
    color: 'blue',
    image: '/images/loans/auto.jpg',
    category: 'auto',
    amountRange: {
      min: 0,
      max: 0
    },
    termRange: {
      min: 0,
      max: 0
    },
    speed: '',
    bestFor: []
  },
  {
    id: 'education-loan',
    title: 'loans.products.education.title',
    subtitle: 'loans.products.education.subtitle',
    description: 'loans.products.education.description',
    amount: 'loans.products.education.amount',
    interestRate: 'loans.products.education.interestRate',
    term: 'loans.products.education.term',
    features: [
      'loans.products.education.features.0',
      'loans.products.education.features.1',
      'loans.products.education.features.2',
      'loans.products.education.features.3'
    ],
    eligibility: [
      'loans.products.education.eligibility.0',
      'loans.products.education.eligibility.1',
      'loans.products.education.eligibility.2',
      'loans.products.education.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.education.documents.0',
      'loans.products.education.documents.1',
      'loans.products.education.documents.2',
      'loans.products.education.documents.3'
    ],
    icon: '📚',
    color: 'purple',
    image: '/images/loans/education.jpg',
    category: 'education',
    amountRange: {
      min: 0,
      max: 0
    },
    termRange: {
      min: 0,
      max: 0
    },
    speed: '',
    bestFor: []
  },
  {
    id: 'health-loan',
    title: 'loans.products.health.title',
    subtitle: 'loans.products.health.subtitle',
    description: 'loans.products.health.description',
    amount: 'loans.products.health.amount',
    interestRate: 'loans.products.health.interestRate',
    term: 'loans.products.health.term',
    features: [
      'loans.products.health.features.0',
      'loans.products.health.features.1',
      'loans.products.health.features.2',
      'loans.products.health.features.3'
    ],
    eligibility: [
      'loans.products.health.eligibility.0',
      'loans.products.health.eligibility.1',
      'loans.products.health.eligibility.2',
      'loans.products.health.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.health.documents.0',
      'loans.products.health.documents.1',
      'loans.products.health.documents.2',
      'loans.products.health.documents.3'
    ],
    icon: '🏥',
    color: 'red',
    image: '/images/loans/health.jpg',
    category: 'health',
    amountRange: {
      min: 0,
      max: 0
    },
    termRange: {
      min: 0,
      max: 0
    },
    speed: '',
    bestFor: []
  },
  {
    id: 'startup-loan',
    title: 'loans.products.startup.title',
    subtitle: 'loans.products.startup.subtitle',
    description: 'loans.products.startup.description',
    amount: 'loans.products.startup.amount',
    interestRate: 'loans.products.startup.interestRate',
    term: 'loans.products.startup.term',
    features: [
      'loans.products.startup.features.0',
      'loans.products.startup.features.1',
      'loans.products.startup.features.2',
      'loans.products.startup.features.3'
    ],
    eligibility: [
      'loans.products.startup.eligibility.0',
      'loans.products.startup.eligibility.1',
      'loans.products.startup.eligibility.2',
      'loans.products.startup.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.startup.documents.0',
      'loans.products.startup.documents.1',
      'loans.products.startup.documents.2',
      'loans.products.startup.documents.3'
    ],
    icon: '🚀',
    color: 'blue',
    image: '/images/loans/startup.jpg',
    category: 'startup',
    // New fields for comparison
    amountRange: { min: 50000, max: 500000 },
    termRange: { min: 6, max: 18 },
    speed: '48h',
    bestFor: ['Nouvelles entreprises', 'Startups', 'Projets innovants']
  },
  {
    id: 'growth-loan',
    title: 'loans.products.growth.title',
    subtitle: 'loans.products.growth.subtitle',
    description: 'loans.products.growth.description',
    amount: 'loans.products.growth.amount',
    interestRate: 'loans.products.growth.interestRate',
    term: 'loans.products.growth.term',
    features: [
      'loans.products.growth.features.0',
      'loans.products.growth.features.1',
      'loans.products.growth.features.2',
      'loans.products.growth.features.3'
    ],
    eligibility: [
      'loans.products.growth.eligibility.0',
      'loans.products.growth.eligibility.1',
      'loans.products.growth.eligibility.2',
      'loans.products.growth.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.growth.documents.0',
      'loans.products.growth.documents.1',
      'loans.products.growth.documents.2',
      'loans.products.growth.documents.3'
    ],
    icon: '📈',
    color: 'green',
    image: '/images/loans/growth.jpg',
    category: 'growth',
    amountRange: { min: 200000, max: 2000000 },
    termRange: { min: 12, max: 24 },
    speed: '24h',
    bestFor: ['Expansion entreprise', 'Développement marché', 'Recrutement']
  },  
  {
    id: 'cashflow-loan',
    title: 'loans.products.cashflow.title',
    subtitle: 'loans.products.cashflow.subtitle',
    description: 'loans.products.cashflow.description',
    amount: 'loans.products.cashflow.amount',
    interestRate: 'loans.products.cashflow.interestRate',
    term: 'loans.products.cashflow.term',
    features: [
      'loans.products.cashflow.features.0',
      'loans.products.cashflow.features.1',
      'loans.products.cashflow.features.2',
      'loans.products.cashflow.features.3'
    ],
    eligibility: [
      'loans.products.cashflow.eligibility.0',
      'loans.products.cashflow.eligibility.1',
      'loans.products.cashflow.eligibility.2',
      'loans.products.cashflow.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.cashflow.documents.0',
      'loans.products.cashflow.documents.1',
      'loans.products.cashflow.documents.2',
      'loans.products.cashflow.documents.3'
    ],
    icon: '💰',
    color: 'purple',
    image: '/images/loans/cashflow.jpg',
    category: 'cashflow',
    amountRange: { min: 50000, max: 800000 },
    termRange: { min: 3, max: 12 },
    speed: '24h',
    bestFor: ['Trésorerie', 'Fond de roulement', 'Dépenses courantes']
  }, 
  {
    id: 'women-loan',
    title: 'loans.products.women.title',
    subtitle: 'loans.products.women.subtitle',
    description: 'loans.products.women.description',
    amount: 'loans.products.women.amount',
    interestRate: 'loans.products.women.interestRate',
    term: 'loans.products.women.term',
    features: [
      'loans.products.women.features.0',
      'loans.products.women.features.1',
      'loans.products.women.features.2',
      'loans.products.women.features.3'
    ],
    eligibility: [
      'loans.products.women.eligibility.0',
      'loans.products.women.eligibility.1',
      'loans.products.women.eligibility.2',
      'loans.products.women.eligibility.3'
    ],
    requiredDocuments: [
      'loans.products.women.documents.0',
      'loans.products.women.documents.1',
      'loans.products.women.documents.2',
      'loans.products.women.documents.3'
    ],
    icon: '👩‍💼',
    color: 'teal',
    image: '/images/loans/women.jpg',
    category: 'women',
    amountRange: { min: 50000, max: 1000000 },
    termRange: { min: 6, max: 24 },
    speed: '48h',
    bestFor: ['Femmes entrepreneures', 'Projets féminins', 'Leadership']
  }
];