import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cardVariants } from '../../../animations/variants';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'bordered';
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles = {
  default: 'bg-white shadow-md',
  elevated: 'bg-white shadow-xl',
  bordered: 'bg-white border border-gray-200'
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

export function Card({
  variant = 'default',
  interactive = false,
  padding = 'md',
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <motion.div
      variants={interactive ? cardVariants : undefined}
      initial={interactive ? 'initial' : undefined}
      whileHover={interactive ? 'hover' : undefined}
      whileTap={interactive ? 'tap' : undefined}
      className={`
        rounded-2xl
        transition-all duration-300
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${interactive ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default Card;
