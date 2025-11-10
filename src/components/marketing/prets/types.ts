export interface LoanProduct {
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
  category: string;
  // New fields for comparison
  amountRange: { min: number; max: number };
  termRange: { min: number; max: number };
  speed: string;
  bestFor: string[];
}

export interface LoanCardProps {
  loan: LoanProduct;
  index: number;
  isDark: boolean;
  onLearnMore: (loan: LoanProduct) => void;
}

export interface LoanModalProps {
  loan: LoanProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}