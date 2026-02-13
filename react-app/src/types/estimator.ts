// Customer Information Types
export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

// Building Configuration Types
export type LegType = 'standard' | 'certified';
export type BuildingView = 'front' | 'back' | 'left' | 'right';

export interface Breezeway {
  frontBack: boolean;
  sideSide: boolean;
}

export interface BuildingConfig {
  width: number;
  length: number;
  height: number;
  legType: LegType;
  buildingView: BuildingView;
  breezeway: Breezeway;
}

// Door and Window Types
export type DoorType = 'walk' | 'rollUp';
export type DoorSize = '3x7' | '4x7' | '6x7' | '8x8' | '10x10' | '12x12';

export interface DoorConfig {
  id: string;
  type: DoorType;
  size: DoorSize;
  wall: 'front' | 'back' | 'left' | 'right';
  quantity: number;
}

export interface WindowConfig {
  id: string;
  size: '30x36' | '36x48';
  wall: 'front' | 'back' | 'left' | 'right';
  quantity: number;
}

// Accessories Types
export type InsulationType = 'none' | 'ceiling' | 'full';

export interface AccessoriesConfig {
  walkDoors: DoorConfig[];
  rollUpDoors: DoorConfig[];
  windows: WindowConfig[];
  insulation: InsulationType;
  ventilation: boolean;
  gutters: boolean;
}

// Color Types
export interface ColorConfig {
  roof: string;
  walls: string;
  trim: string;
}

// Concrete Types
export type ConcreteType = 'none' | 'piers' | 'slab' | 'turnkey';

export interface ConcreteConfig {
  type: ConcreteType;
  existingPad: boolean;
  thickness: number;
}

// Pricing Types
export interface PricingBreakdown {
  basePrice: number;
  accessoriesTotal: number;
  concreteTotal: number;
  laborTotal: number;
  deliveryTotal: number;
  grandTotal: number;
  depositAmount: number;
}

// Contract Types
export interface SignatureData {
  contractor: string | null;
  customer: string | null;
  contractorDate: string | null;
  customerDate: string | null;
}

export interface ContractConfig {
  signatures: SignatureData;
  agreedToTerms: boolean;
  depositPaid: boolean;
}

// Door Position Map (for drag-drop)
export type DoorPositionMap = Record<string, number>; // key: `${doorId}-${view}`

// Complete Estimator State
export interface EstimatorState {
  // Navigation
  currentStep: number;
  currentContractSection: number;

  // Form Data
  customer: CustomerInfo;
  building: BuildingConfig;
  accessories: AccessoriesConfig;
  doorPositions: DoorPositionMap;
  colors: ColorConfig;
  concrete: ConcreteConfig;
  pricing: PricingBreakdown;
  contract: ContractConfig;
}

// Actions Interface
export interface EstimatorActions {
  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  nextContractSection: () => void;
  prevContractSection: () => void;

  // Setters
  setCustomerInfo: (info: Partial<CustomerInfo>) => void;
  setBuildingConfig: (config: Partial<BuildingConfig>) => void;
  setAccessories: (accessories: Partial<AccessoriesConfig>) => void;
  setDoorPosition: (doorId: string, view: string, position: number) => void;
  setColors: (colors: Partial<ColorConfig>) => void;
  setConcreteConfig: (config: Partial<ConcreteConfig>) => void;
  setContractData: (data: Partial<ContractConfig>) => void;

  // Door/Window Management
  addDoor: (door: DoorConfig) => void;
  removeDoor: (doorId: string) => void;
  updateDoor: (doorId: string, updates: Partial<DoorConfig>) => void;
  addWindow: (window: WindowConfig) => void;
  removeWindow: (windowId: string) => void;

  // Calculations
  calculatePricing: () => void;

  // Persistence
  resetEstimate: () => void;
  saveEstimate: () => void;
  loadEstimate: () => void;
}

export type EstimatorStore = EstimatorState & EstimatorActions;
