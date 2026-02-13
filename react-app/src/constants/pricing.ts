// Base pricing per square foot based on building dimensions
export const BASE_PRICE_PER_SQFT = 8.50;

// Leg type multipliers
export const LEG_TYPE_MULTIPLIERS = {
  standard: 1.0,
  certified: 1.15
} as const;

// Door prices
export const DOOR_PRICES = {
  walk: {
    '3x7': 350,
    '4x7': 400,
    '6x7': 550,
    '8x8': 0,
    '10x10': 0,
    '12x12': 0
  },
  rollUp: {
    '3x7': 0,
    '4x7': 0,
    '6x7': 0,
    '8x8': 850,
    '10x10': 1100,
    '12x12': 1450
  }
} as const;

// Window prices
export const WINDOW_PRICES = {
  '30x36': 175,
  '36x48': 225
} as const;

// Insulation prices (per square foot)
export const INSULATION_PRICES = {
  none: 0,
  ceiling: 1.25,
  full: 2.50
} as const;

// Additional options
export const OPTION_PRICES = {
  ventilation: 150,
  gutters: 4.50 // per linear foot
} as const;

// Concrete prices
export const CONCRETE_PRICES = {
  none: 0,
  piers: 125, // per pier
  slab: 6.50, // per sqft
  turnkey: 8.75 // per sqft
} as const;

// Concrete thickness multipliers
export const CONCRETE_THICKNESS_MULTIPLIERS = {
  4: 1.0,
  5: 1.15,
  6: 1.30
} as const;

// Labor and delivery
export const LABOR_RATE_PER_SQFT = 3.50;
export const DELIVERY_BASE = 500;
export const DELIVERY_RATE_PER_MILE = 3.50;

// Deposit percentage
export const DEPOSIT_PERCENTAGE = 0.35;

// Post clearance (in feet) - minimum distance from posts for doors
export const DOOR_POST_CLEARANCE_FT = 2.5;

// Building size constraints
export const BUILDING_CONSTRAINTS = {
  width: {
    min: 12,
    max: 40,
    step: 2
  },
  length: {
    min: 20,
    max: 100,
    step: 5
  },
  height: {
    min: 8,
    max: 16,
    step: 1
  }
} as const;

// Standard dimension options
export const WIDTH_OPTIONS = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40];
export const LENGTH_OPTIONS = [20, 21, 25, 26, 30, 31, 35, 36, 40, 41, 45, 46, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
export const HEIGHT_OPTIONS = [8, 9, 10, 11, 12, 13, 14, 15, 16];
