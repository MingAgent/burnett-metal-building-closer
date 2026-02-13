import type { Variants } from 'framer-motion';

// Page transition variants for step wizard
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: 50,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.98,
    transition: {
      duration: 0.3
    }
  }
};

// Reverse page transition (for going back)
export const pageVariantsReverse: Variants = {
  initial: {
    opacity: 0,
    x: -50,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    x: 50,
    scale: 0.98,
    transition: {
      duration: 0.3
    }
  }
};

// Card hover effects
export const cardVariants: Variants = {
  initial: {
    scale: 1,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98
  }
};

// Stagger container for lists
export const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Item variants for staggered lists
export const itemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

// Fade in from bottom
export const fadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Scale and fade
export const scaleInVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Color swatch selection
export const swatchVariants: Variants = {
  initial: { scale: 1 },
  selected: {
    scale: 1.15,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  }
};

// Price counter animation
export const priceVariants: Variants = {
  initial: { scale: 1.2, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200
    }
  }
};

// Modal/overlay animations
export const modalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 }
  }
};

// Backdrop fade
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

// Step indicator variants
export const stepIndicatorVariants: Variants = {
  inactive: {
    backgroundColor: '#E5E7EB',
    color: '#6B7280',
    scale: 1
  },
  active: {
    backgroundColor: '#EA580C',
    color: '#FFFFFF',
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  },
  completed: {
    backgroundColor: '#22C55E',
    color: '#FFFFFF',
    scale: 1
  }
};

// Button press effect
export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// Input focus effect
export const inputFocusVariants: Variants = {
  initial: {
    borderColor: '#D1D5DB',
    boxShadow: '0 0 0 0 rgba(234, 88, 12, 0)'
  },
  focus: {
    borderColor: '#EA580C',
    boxShadow: '0 0 0 3px rgba(234, 88, 12, 0.2)',
    transition: { duration: 0.2 }
  }
};

// Accordion/collapse variants
export const collapseVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 }
    }
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.3, delay: 0.1 }
    }
  }
};

// Slide in from right (for drawers/panels)
export const slideInRightVariants: Variants = {
  initial: {
    x: '100%',
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Tooltip pop
export const tooltipVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 10
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 10,
    transition: { duration: 0.1 }
  }
};
