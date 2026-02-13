import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { stepIndicatorVariants } from '../../../animations/variants';

export interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        const isClickable = onStepClick && (isCompleted || step.id === currentStep);

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <motion.button
              variants={stepIndicatorVariants}
              initial="inactive"
              animate={isActive ? 'active' : isCompleted ? 'completed' : 'inactive'}
              onClick={() => isClickable && onStepClick?.(step.id)}
              disabled={!isClickable}
              className={`
                flex items-center justify-center
                w-10 h-10 rounded-full
                text-sm font-semibold
                transition-all duration-300
                ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
              `}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              ) : (
                step.id
              )}
            </motion.button>

            {/* Step Title (visible on larger screens) */}
            <motion.span
              className="hidden md:block ml-2 text-sm font-medium"
              animate={{
                color: isActive ? '#EA580C' : isCompleted ? '#22C55E' : '#6B7280'
              }}
            >
              {step.title}
            </motion.span>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="relative mx-4 w-12 md:w-20">
                {/* Background Line */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200" />
                {/* Progress Line */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-orange-600"
                  initial={{ width: 0 }}
                  animate={{
                    width: isCompleted ? '100%' : isActive ? '50%' : '0%'
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;
