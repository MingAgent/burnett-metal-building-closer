# Gryphon FrameWorks - React Architecture Plan

## 1. Technology Stack

### Core Framework
- **React 18.2+** - Latest stable with concurrent features
- **Vite** - Fast build tool and dev server (faster than Create React App)
- **TypeScript** - Type safety for complex state and calculations

### Styling
- **Tailwind CSS 3.4+** - Utility-first CSS (already used in current app)
- **CSS Modules** - For component-specific animations

### Animation Libraries
- **Framer Motion 11+** - Primary animation library for:
  - Page transitions
  - Step wizard animations
  - Card hover effects
  - Form field animations
  - Modal/drawer animations

- **GSAP 3.12+** - For complex SVG animations:
  - Building profile rendering
  - Door drag-and-drop
  - Measurement lines
  - Post clearance zones

### State Management
- **Zustand** - Lightweight, performant state management
  - Simpler than Redux
  - Built-in persistence middleware
  - TypeScript-first

### Form Handling
- **React Hook Form** - Performance-focused forms
- **Zod** - Schema validation

### Additional Libraries
- **signature_pad** - Canvas signature capture
- **@emailjs/browser** - Email functionality
- **xlsx (SheetJS)** - Excel export
- **html2canvas + jsPDF** - PDF generation

---

## 2. Project Structure

```
gryphon-frameworks-react/
├── public/
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   └── logo.png
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── Checkbox/
│   │   │   ├── RadioGroup/
│   │   │   ├── Modal/
│   │   │   ├── Tooltip/
│   │   │   └── LoadingSpinner/
│   │   │
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── StepWizard/
│   │   │   │   ├── StepWizard.tsx
│   │   │   │   ├── StepIndicator.tsx
│   │   │   │   ├── StepContent.tsx
│   │   │   │   └── StepNavigation.tsx
│   │   │   └── AnimatedPage/
│   │   │
│   │   ├── estimator/
│   │   │   ├── steps/
│   │   │   │   ├── Step1CustomerInfo.tsx
│   │   │   │   ├── Step2BuildingSize.tsx
│   │   │   │   ├── Step3Accessories.tsx
│   │   │   │   ├── Step4Colors.tsx
│   │   │   │   ├── Step5Concrete.tsx
│   │   │   │   └── Step6Review.tsx
│   │   │   │
│   │   │   ├── building-profile/
│   │   │   │   ├── BuildingProfile.tsx
│   │   │   │   ├── BuildingRenderer.tsx
│   │   │   │   ├── DoorElement.tsx
│   │   │   │   ├── WindowElement.tsx
│   │   │   │   ├── PostMarkers.tsx
│   │   │   │   ├── ClearanceZones.tsx
│   │   │   │   ├── MeasurementLines.tsx
│   │   │   │   └── ViewControls.tsx
│   │   │   │
│   │   │   ├── accessories/
│   │   │   │   ├── DoorSelector.tsx
│   │   │   │   ├── WindowSelector.tsx
│   │   │   │   ├── InsulationOptions.tsx
│   │   │   │   └── AccessoryCard.tsx
│   │   │   │
│   │   │   ├── pricing/
│   │   │   │   ├── PriceSummary.tsx
│   │   │   │   ├── PriceBreakdown.tsx
│   │   │   │   └── DepositCalculator.tsx
│   │   │   │
│   │   │   └── color-picker/
│   │   │       ├── ColorPicker.tsx
│   │   │       ├── ColorSwatch.tsx
│   │   │       └── colorData.ts
│   │   │
│   │   └── contract/
│   │       ├── sections/
│   │       │   ├── Section1DepositPayment.tsx
│   │       │   ├── Section2SitePrep.tsx
│   │       │   ├── Section3Terms.tsx
│   │       │   ├── Section4Permits.tsx
│   │       │   ├── Section5Payment.tsx
│   │       │   ├── Section6FinalWalkThru.tsx
│   │       │   └── Section7Signatures.tsx
│   │       │
│   │       ├── SignaturePad/
│   │       │   ├── SignaturePad.tsx
│   │       │   └── SignaturePad.module.css
│   │       │
│   │       └── ContractSummary.tsx
│   │
│   ├── hooks/
│   │   ├── useEstimatorStore.ts
│   │   ├── useBuildingCalculations.ts
│   │   ├── useDoorDrag.ts
│   │   ├── useSignature.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useAnimatedValue.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── store/
│   │   ├── index.ts
│   │   ├── estimatorStore.ts
│   │   ├── slices/
│   │   │   ├── customerSlice.ts
│   │   │   ├── buildingSlice.ts
│   │   │   ├── accessoriesSlice.ts
│   │   │   ├── colorsSlice.ts
│   │   │   ├── concreteSlice.ts
│   │   │   └── contractSlice.ts
│   │   └── types.ts
│   │
│   ├── utils/
│   │   ├── calculations/
│   │   │   ├── pricing.ts
│   │   │   ├── dimensions.ts
│   │   │   ├── concrete.ts
│   │   │   └── accessories.ts
│   │   │
│   │   ├── formatting/
│   │   │   ├── currency.ts
│   │   │   ├── dates.ts
│   │   │   └── dimensions.ts
│   │   │
│   │   ├── validation/
│   │   │   ├── schemas.ts
│   │   │   └── validators.ts
│   │   │
│   │   └── export/
│   │       ├── excel.ts
│   │       ├── pdf.ts
│   │       └── email.ts
│   │
│   ├── constants/
│   │   ├── pricing.ts
│   │   ├── colors.ts
│   │   ├── dimensions.ts
│   │   └── config.ts
│   │
│   ├── animations/
│   │   ├── variants.ts
│   │   ├── transitions.ts
│   │   └── gsapAnimations.ts
│   │
│   ├── types/
│   │   ├── estimator.ts
│   │   ├── building.ts
│   │   ├── accessories.ts
│   │   └── contract.ts
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── EstimatorPage.tsx
│   │   ├── ContractPage.tsx
│   │   └── ThankYouPage.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 3. Component Hierarchy

```
App
├── Header (logo, branding)
│
├── EstimatorPage
│   ├── StepWizard
│   │   ├── StepIndicator (animated progress)
│   │   │
│   │   ├── AnimatedPage (Framer Motion wrapper)
│   │   │   └── Step1CustomerInfo
│   │   │       ├── Input (name)
│   │   │       ├── Input (email)
│   │   │       ├── Input (phone)
│   │   │       └── Input (address)
│   │   │
│   │   ├── AnimatedPage
│   │   │   └── Step2BuildingSize
│   │   │       ├── DimensionInput (width)
│   │   │       ├── DimensionInput (length)
│   │   │       ├── DimensionInput (height)
│   │   │       ├── RadioGroup (leg type)
│   │   │       └── BuildingProfile
│   │   │           ├── ViewControls
│   │   │           ├── BuildingRenderer (SVG)
│   │   │           │   ├── PostMarkers
│   │   │           │   ├── ClearanceZones
│   │   │           │   └── MeasurementLines
│   │   │           └── BreezeWayControls
│   │   │
│   │   ├── AnimatedPage
│   │   │   └── Step3Accessories
│   │   │       ├── DoorSelector
│   │   │       │   └── AccessoryCard[] (walk doors, roll-up doors)
│   │   │       ├── WindowSelector
│   │   │       │   └── AccessoryCard[] (window options)
│   │   │       ├── InsulationOptions
│   │   │       │   └── RadioGroup
│   │   │       └── BuildingProfile (with doors/windows)
│   │   │           ├── DoorElement[] (draggable)
│   │   │           └── WindowElement[]
│   │   │
│   │   ├── AnimatedPage
│   │   │   └── Step4Colors
│   │   │       ├── ColorPicker (roof)
│   │   │       │   └── ColorSwatch[]
│   │   │       ├── ColorPicker (walls)
│   │   │       │   └── ColorSwatch[]
│   │   │       ├── ColorPicker (trim)
│   │   │       │   └── ColorSwatch[]
│   │   │       └── BuildingPreview (colored)
│   │   │
│   │   ├── AnimatedPage
│   │   │   └── Step5Concrete
│   │   │       ├── RadioGroup (foundation type)
│   │   │       ├── Checkbox (existing pad)
│   │   │       └── ConcreteCalculator
│   │   │
│   │   └── AnimatedPage
│   │       └── Step6Review
│   │           ├── PriceSummary
│   │           │   └── AnimatedNumber (total)
│   │           ├── PriceBreakdown
│   │           │   └── LineItem[]
│   │           ├── DepositCalculator
│   │           └── ActionButtons
│   │
│   └── StepNavigation (prev/next buttons)
│
├── ContractPage
│   ├── ContractWizard
│   │   ├── Section1DepositPayment
│   │   ├── Section2SitePrep
│   │   ├── Section3Terms
│   │   ├── Section4Permits
│   │   ├── Section5Payment
│   │   ├── Section6FinalWalkThru
│   │   └── Section7Signatures
│   │       ├── SignaturePad (contractor)
│   │       └── SignaturePad (customer)
│   │
│   └── ContractSummary
│
└── Footer
```

---

## 4. State Management Architecture

### Zustand Store Structure

```typescript
// types/estimator.ts
interface EstimatorState {
  // Navigation
  currentStep: number;
  currentContractSection: number;

  // Customer Info
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };

  // Building Configuration
  building: {
    width: number;
    length: number;
    height: number;
    legType: 'standard' | 'certified';
    buildingView: 'front' | 'back' | 'left' | 'right';
    breezeway: {
      frontBack: boolean;
      sideSide: boolean;
    };
  };

  // Accessories
  accessories: {
    walkDoors: DoorConfig[];
    rollUpDoors: DoorConfig[];
    windows: WindowConfig[];
    insulation: 'none' | 'ceiling' | 'full';
    ventilation: boolean;
    gutters: boolean;
  };

  // Door Positions (for drag-drop)
  doorPositions: Record<string, number>; // key: `${doorId}-${view}`

  // Colors
  colors: {
    roof: string;
    walls: string;
    trim: string;
  };

  // Concrete
  concrete: {
    type: 'none' | 'piers' | 'slab' | 'turnkey';
    existingPad: boolean;
    thickness: number;
  };

  // Pricing (calculated)
  pricing: {
    basePrice: number;
    accessoriesTotal: number;
    concreteTotal: number;
    laborTotal: number;
    deliveryTotal: number;
    grandTotal: number;
    depositAmount: number;
  };

  // Contract
  contract: {
    signatures: {
      contractor: string | null;
      customer: string | null;
      contractorDate: string | null;
      customerDate: string | null;
    };
    agreedToTerms: boolean;
    depositPaid: boolean;
  };

  // Actions
  setCustomerInfo: (info: Partial<CustomerInfo>) => void;
  setBuildingConfig: (config: Partial<BuildingConfig>) => void;
  setAccessories: (accessories: Partial<AccessoriesConfig>) => void;
  setDoorPosition: (doorId: string, view: string, position: number) => void;
  setColors: (colors: Partial<ColorsConfig>) => void;
  setConcreteConfig: (config: Partial<ConcreteConfig>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  calculatePricing: () => void;
  resetEstimate: () => void;
  saveEstimate: () => void;
  loadEstimate: () => void;
}
```

---

## 5. Animation Implementation Plan

### Framer Motion Variants

```typescript
// animations/variants.ts

// Page transitions for step wizard
export const pageVariants = {
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

// Card hover effects
export const cardVariants = {
  initial: {
    scale: 1,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98
  }
};

// Stagger children animations
export const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const itemVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Color swatch selection
export const swatchVariants = {
  initial: { scale: 1 },
  selected: {
    scale: 1.15,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  }
};

// Price counter animation
export const priceVariants = {
  initial: { scale: 1.2, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200
    }
  }
};

// Modal animations
export const modalVariants = {
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
```

### GSAP Animations for Building Profile

```typescript
// animations/gsapAnimations.ts
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

// Building profile entrance animation
export const animateBuildingProfile = (container: HTMLElement) => {
  const tl = gsap.timeline();

  // Animate the building structure
  tl.from(container.querySelector('.building-roof'), {
    scaleY: 0,
    transformOrigin: 'bottom',
    duration: 0.5,
    ease: 'power2.out'
  })
  .from(container.querySelector('.building-walls'), {
    scaleY: 0,
    transformOrigin: 'bottom',
    duration: 0.4,
    ease: 'power2.out'
  }, '-=0.2')
  .from(container.querySelectorAll('.building-post'), {
    scaleY: 0,
    transformOrigin: 'bottom',
    duration: 0.3,
    stagger: 0.1,
    ease: 'power2.out'
  }, '-=0.2')
  .from(container.querySelectorAll('.measurement-line'), {
    opacity: 0,
    scale: 0,
    duration: 0.3,
    stagger: 0.05,
    ease: 'back.out(1.5)'
  }, '-=0.1');

  return tl;
};

// Door drag functionality with constraints
export const initDoorDraggable = (
  doorElement: HTMLElement,
  constraints: { minX: number; maxX: number },
  onDrag: (x: number) => void,
  onDragEnd: (x: number) => void
) => {
  return Draggable.create(doorElement, {
    type: 'x',
    bounds: constraints,
    inertia: true,
    onDrag: function() {
      onDrag(this.x);
    },
    onDragEnd: function() {
      // Snap to valid position (away from clearance zones)
      onDragEnd(this.x);
    },
    cursor: 'grab',
    activeCursor: 'grabbing'
  });
};

// View transition animation
export const animateViewChange = (
  container: HTMLElement,
  direction: 'left' | 'right'
) => {
  const xOffset = direction === 'right' ? -50 : 50;

  return gsap.timeline()
    .to(container, {
      opacity: 0,
      x: xOffset,
      duration: 0.2,
      ease: 'power2.in'
    })
    .set(container, { x: -xOffset })
    .to(container, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
};

// Clearance zone pulse animation
export const animateClearanceWarning = (zones: NodeListOf<Element>) => {
  return gsap.to(zones, {
    opacity: 0.4,
    duration: 0.3,
    repeat: 3,
    yoyo: true,
    ease: 'power1.inOut'
  });
};
```

---

## 6. Key Component Implementations

### Step Wizard with Animations

```tsx
// components/layout/StepWizard/StepWizard.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '@/animations/variants';
import { useEstimatorStore } from '@/hooks/useEstimatorStore';

const steps = [
  { id: 1, title: 'Customer Info', component: Step1CustomerInfo },
  { id: 2, title: 'Building Size', component: Step2BuildingSize },
  { id: 3, title: 'Accessories', component: Step3Accessories },
  { id: 4, title: 'Colors', component: Step4Colors },
  { id: 5, title: 'Concrete', component: Step5Concrete },
  { id: 6, title: 'Review', component: Step6Review },
];

export const StepWizard = () => {
  const { currentStep, nextStep, prevStep } = useEstimatorStore();
  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator steps={steps} currentStep={currentStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <CurrentStepComponent />
        </motion.div>
      </AnimatePresence>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrev={prevStep}
        onNext={nextStep}
      />
    </div>
  );
};
```

### Building Profile Component

```tsx
// components/estimator/building-profile/BuildingProfile.tsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useEstimatorStore } from '@/hooks/useEstimatorStore';
import { BuildingRenderer } from './BuildingRenderer';
import { ViewControls } from './ViewControls';
import { animateBuildingProfile } from '@/animations/gsapAnimations';

export const BuildingProfile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { building, doorPositions, accessories } = useEstimatorStore();
  const { width, length, height, buildingView, breezeway } = building;

  useEffect(() => {
    if (containerRef.current) {
      animateBuildingProfile(containerRef.current);
    }
  }, [buildingView]);

  return (
    <div className="space-y-4">
      <ViewControls />

      <div
        ref={containerRef}
        className="bg-gradient-to-b from-sky-100 to-sky-200 rounded-xl p-6 overflow-hidden"
      >
        <BuildingRenderer
          width={width}
          length={length}
          height={height}
          view={buildingView}
          breezeway={breezeway}
          doors={accessories.walkDoors}
          rollUpDoors={accessories.rollUpDoors}
          doorPositions={doorPositions}
        />
      </div>

      <BreezeWayControls />
    </div>
  );
};
```

---

## 7. Implementation Phases

### Phase 4: Project Setup (Next)
1. Initialize Vite + React + TypeScript project
2. Install all dependencies
3. Configure Tailwind CSS
4. Set up folder structure
5. Configure ESLint + Prettier
6. Create base layout components

### Phase 5: Core Components
1. Build common UI components (Button, Input, Card, etc.)
2. Create StepWizard with Framer Motion
3. Build StepIndicator with animated progress
4. Implement AnimatedPage wrapper

### Phase 6: Estimator Steps
1. Step1CustomerInfo with form validation
2. Step2BuildingSize with BuildingProfile
3. Step3Accessories with DoorSelector/WindowSelector
4. Step4Colors with animated ColorPicker
5. Step5Concrete with calculator
6. Step6Review with animated pricing

### Phase 7: Building Profile (Complex)
1. SVG BuildingRenderer
2. GSAP drag-and-drop for doors
3. Post markers and clearance zones
4. View cycling with animations
5. Breezeway auto-centering

### Phase 8: State Management
1. Zustand store setup
2. Persistence middleware
3. Pricing calculations
4. Form validation integration

### Phase 9: Contract Section
1. Contract wizard
2. SignaturePad component
3. Terms and conditions
4. PDF generation

### Phase 10: Testing & Deployment
1. Component testing
2. Integration testing
3. Performance optimization
4. GitHub deployment
5. GitHub Pages setup

---

## 8. File Dependencies Map

```
main.tsx
└── App.tsx
    ├── store/index.ts (Zustand provider)
    ├── pages/EstimatorPage.tsx
    │   └── components/layout/StepWizard/
    │       ├── animations/variants.ts
    │       └── components/estimator/steps/*
    │           └── hooks/useBuildingCalculations.ts
    │               └── utils/calculations/pricing.ts
    │                   └── constants/pricing.ts
    └── pages/ContractPage.tsx
        └── components/contract/sections/*
            └── components/contract/SignaturePad/
```

---

## 9. Environment Variables

```env
# .env.example
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_APP_TITLE=Gryphon FrameWorks Estimator
```

---

## 10. Quality Assurance Checklist

### Per-Component QA
- [ ] TypeScript types are complete and accurate
- [ ] Component renders without errors
- [ ] Animations play smoothly (60fps)
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] No console errors/warnings

### Integration QA
- [ ] State persists correctly
- [ ] Step navigation works bidirectionally
- [ ] Pricing calculations are accurate
- [ ] Door drag respects clearance zones
- [ ] View cycling maintains state
- [ ] PDF export matches screen

### Performance QA
- [ ] Initial load < 2 seconds
- [ ] Step transitions < 300ms
- [ ] No layout shifts
- [ ] Images optimized
- [ ] Bundle size < 500KB

---

*This architecture plan provides the complete blueprint for rebuilding the Gryphon FrameWorks estimator in React with professional animations.*
