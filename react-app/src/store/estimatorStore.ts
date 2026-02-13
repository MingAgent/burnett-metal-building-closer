import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  EstimatorStore,
  CustomerInfo,
  BuildingConfig,
  AccessoriesConfig,
  ColorConfig,
  ConcreteConfig,
  ContractConfig,
  DoorConfig,
  WindowConfig
} from '../types/estimator';
import { calculateTotalPrice } from '../utils/calculations/pricing';
import { DEFAULT_COLORS } from '../constants/colors';

// Initial state values
const initialCustomer: CustomerInfo = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: ''
};

const initialBuilding: BuildingConfig = {
  width: 24,
  length: 30,
  height: 10,
  legType: 'standard',
  buildingView: 'front',
  breezeway: {
    frontBack: false,
    sideSide: false
  }
};

const initialAccessories: AccessoriesConfig = {
  walkDoors: [],
  rollUpDoors: [],
  windows: [],
  insulation: 'none',
  ventilation: false,
  gutters: false
};

const initialColors: ColorConfig = {
  roof: DEFAULT_COLORS.roof,
  walls: DEFAULT_COLORS.walls,
  trim: DEFAULT_COLORS.trim
};

const initialConcrete: ConcreteConfig = {
  type: 'none',
  existingPad: false,
  thickness: 4
};

const initialContract: ContractConfig = {
  signatures: {
    contractor: null,
    customer: null,
    contractorDate: null,
    customerDate: null
  },
  agreedToTerms: false,
  depositPaid: false
};

export const useEstimatorStore = create<EstimatorStore>()(
  persist(
    (set, get) => ({
      // Initial State
      currentStep: 1,
      currentContractSection: 1,
      customer: initialCustomer,
      building: initialBuilding,
      accessories: initialAccessories,
      doorPositions: {},
      colors: initialColors,
      concrete: initialConcrete,
      pricing: {
        basePrice: 0,
        accessoriesTotal: 0,
        concreteTotal: 0,
        laborTotal: 0,
        deliveryTotal: 0,
        grandTotal: 0,
        depositAmount: 0
      },
      contract: initialContract,

      // Navigation Actions
      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 6) {
          set({ currentStep: currentStep + 1 });
          get().calculatePricing();
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      goToStep: (step: number) => {
        if (step >= 1 && step <= 6) {
          set({ currentStep: step });
          get().calculatePricing();
        }
      },

      nextContractSection: () => {
        const { currentContractSection } = get();
        if (currentContractSection < 7) {
          set({ currentContractSection: currentContractSection + 1 });
        }
      },

      prevContractSection: () => {
        const { currentContractSection } = get();
        if (currentContractSection > 1) {
          set({ currentContractSection: currentContractSection - 1 });
        }
      },

      // Setters
      setCustomerInfo: (info) => {
        set((state) => ({
          customer: { ...state.customer, ...info }
        }));
      },

      setBuildingConfig: (config) => {
        set((state) => ({
          building: { ...state.building, ...config }
        }));
        get().calculatePricing();
      },

      setAccessories: (accessories) => {
        set((state) => ({
          accessories: { ...state.accessories, ...accessories }
        }));
        get().calculatePricing();
      },

      setDoorPosition: (doorId, view, position) => {
        set((state) => ({
          doorPositions: {
            ...state.doorPositions,
            [`${doorId}-${view}`]: position
          }
        }));
      },

      setColors: (colors) => {
        set((state) => ({
          colors: { ...state.colors, ...colors }
        }));
      },

      setConcreteConfig: (config) => {
        set((state) => ({
          concrete: { ...state.concrete, ...config }
        }));
        get().calculatePricing();
      },

      setContractData: (data) => {
        set((state) => ({
          contract: { ...state.contract, ...data }
        }));
      },

      // Door Management
      addDoor: (door: DoorConfig) => {
        set((state) => {
          const key = door.type === 'walk' ? 'walkDoors' : 'rollUpDoors';
          return {
            accessories: {
              ...state.accessories,
              [key]: [...state.accessories[key], door]
            }
          };
        });
        get().calculatePricing();
      },

      removeDoor: (doorId: string) => {
        set((state) => ({
          accessories: {
            ...state.accessories,
            walkDoors: state.accessories.walkDoors.filter(d => d.id !== doorId),
            rollUpDoors: state.accessories.rollUpDoors.filter(d => d.id !== doorId)
          }
        }));
        get().calculatePricing();
      },

      updateDoor: (doorId: string, updates: Partial<DoorConfig>) => {
        set((state) => ({
          accessories: {
            ...state.accessories,
            walkDoors: state.accessories.walkDoors.map(d =>
              d.id === doorId ? { ...d, ...updates } : d
            ),
            rollUpDoors: state.accessories.rollUpDoors.map(d =>
              d.id === doorId ? { ...d, ...updates } : d
            )
          }
        }));
        get().calculatePricing();
      },

      // Window Management
      addWindow: (window: WindowConfig) => {
        set((state) => ({
          accessories: {
            ...state.accessories,
            windows: [...state.accessories.windows, window]
          }
        }));
        get().calculatePricing();
      },

      removeWindow: (windowId: string) => {
        set((state) => ({
          accessories: {
            ...state.accessories,
            windows: state.accessories.windows.filter(w => w.id !== windowId)
          }
        }));
        get().calculatePricing();
      },

      // Calculate Pricing
      calculatePricing: () => {
        const state = get();
        const pricing = calculateTotalPrice(
          state.building,
          state.accessories,
          state.concrete
        );
        set({ pricing });
      },

      // Reset
      resetEstimate: () => {
        set({
          currentStep: 1,
          currentContractSection: 1,
          customer: initialCustomer,
          building: initialBuilding,
          accessories: initialAccessories,
          doorPositions: {},
          colors: initialColors,
          concrete: initialConcrete,
          pricing: {
            basePrice: 0,
            accessoriesTotal: 0,
            concreteTotal: 0,
            laborTotal: 0,
            deliveryTotal: 0,
            grandTotal: 0,
            depositAmount: 0
          },
          contract: initialContract
        });
      },

      // Persistence
      saveEstimate: () => {
        // Zustand persist middleware handles this automatically
        console.log('Estimate saved to localStorage');
      },

      loadEstimate: () => {
        // Zustand persist middleware handles this automatically
        console.log('Estimate loaded from localStorage');
        get().calculatePricing();
      }
    }),
    {
      name: 'gryphon-estimator-storage',
      partialize: (state) => ({
        customer: state.customer,
        building: state.building,
        accessories: state.accessories,
        doorPositions: state.doorPositions,
        colors: state.colors,
        concrete: state.concrete,
        contract: state.contract
      })
    }
  )
);
