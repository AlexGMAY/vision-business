'use client';

import { motion } from 'framer-motion';
import { useDarkMode } from '@/components/shared/DarkModeProvider';
import { ApplicationStep } from './ApplicationLayout';

interface ProgressTrackerProps {
  steps: { id: ApplicationStep; title: string }[];
  currentStep: ApplicationStep;
  className?: string;
}

export function ProgressTracker({ steps, currentStep, className = '' }: ProgressTrackerProps) {
  const { isDark } = useDarkMode();
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className={className}>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {Math.round(progress)}% {currentIndex + 1}/{steps.length}
          </span>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between relative">
        {/* Connecting Line */}
        <div className={`absolute top-4 left-0 right-0 h-0.5 -z-10 ${
          isDark ? 'bg-gray-700' : 'bg-gray-200'
        }`} />
        
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const status = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                  status === 'completed'
                    ? 'bg-green-500 border-green-500 text-white'
                    : status === 'current'
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : isDark
                    ? 'bg-gray-800 border-gray-600 text-gray-400'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {status === 'completed' ? '✓' : index + 1}
              </motion.div>
              
              <span className={`text-xs mt-2 text-center max-w-20 ${
                status === 'current'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : isDark
                  ? 'text-gray-500'
                  : 'text-gray-600'
              }`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}