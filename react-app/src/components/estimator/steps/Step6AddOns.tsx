import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useEstimatorStore } from '../../../store/estimatorStore';
import { containerVariants, itemVariants } from '../../../animations/variants';
import {
  WINDOW_PRICES,
  INSULATION_PRICES,
  OPTION_PRICES,
  CONCRETE_PRICES,
  BUILDING_SIZES,
  EAVE_HEIGHTS,
  DOOR_PRICE_MATRIX,
  WALK_DOOR_PRICES
} from '../../../constants/pricing';
import type { WindowConfig } from '../../../types/estimator';

const generateId = () => Math.random().toString(36).substring(2, 11);

export function Step6AddOns() {
  const {
    building,
    accessories,
    concrete,
    addWindow,
    removeWindow,
    setAccessories,
    setConcreteConfig
  } = useEstimatorStore();

  // Window counts by size
  const window3x3Count = accessories.windows.filter(w => w.size === '3x3').length;
  const window4x4Count = accessories.windows.filter(w => w.size === '4x4').length;

  // Handle window quantity change
  const handleWindowChange = (size: '3x3' | '4x4', delta: number) => {
    if (delta > 0) {
      const newWindow: WindowConfig = {
        id: generateId(),
        size,
        wall: 'front',
        quantity: 1
      };
      addWindow(newWindow);
    } else {
      const windowsOfSize = accessories.windows.filter(w => w.size === size);
      if (windowsOfSize.length > 0) {
        removeWindow(windowsOfSize[windowsOfSize.length - 1].id);
      }
    }
  };

  // Calculate costs
  const windowCost = (window3x3Count * WINDOW_PRICES['3x3']) + (window4x4Count * WINDOW_PRICES['4x4']);

  // Insulation - separate wall and roof
  const hasWallInsulation = accessories.insulation === 'wall' || accessories.insulation === 'full';
  const hasRoofInsulation = accessories.insulation === 'ceiling' || accessories.insulation === 'full';

  const handleInsulationToggle = (type: 'wall' | 'roof') => {
    const currentHasWall = accessories.insulation === 'wall' || accessories.insulation === 'full';
    const currentHasRoof = accessories.insulation === 'ceiling' || accessories.insulation === 'full';

    let newInsulation: 'none' | 'wall' | 'ceiling' | 'full' = 'none';

    if (type === 'wall') {
      const newHasWall = !currentHasWall;
      if (newHasWall && currentHasRoof) newInsulation = 'full';
      else if (newHasWall) newInsulation = 'wall';
      else if (currentHasRoof) newInsulation = 'ceiling';
    } else {
      const newHasRoof = !currentHasRoof;
      if (currentHasWall && newHasRoof) newInsulation = 'full';
      else if (newHasRoof) newInsulation = 'ceiling';
      else if (currentHasWall) newInsulation = 'wall';
    }

    setAccessories({ insulation: newInsulation });
  };

  const insulationCost = INSULATION_PRICES[accessories.insulation] || 0;
  const gutterCost = accessories.gutters ? OPTION_PRICES.gutters : 0;

  // Concrete
  const sqft = building.width * building.length;
  const concreteCost = concrete.type === 'slab' ? sqft * CONCRETE_PRICES.slab : 0;

  // Get running total from previous steps
  const basePrice = BUILDING_SIZES.find(s => s.id === building.buildingSizeId)?.startingPrice || 0;
  const heightModifier = EAVE_HEIGHTS.find(h => h.id === building.eaveHeightId)?.modifier || 0;
  const walkDoorCount = accessories.walkDoors.length;
  const extraWalkDoors = Math.max(0, walkDoorCount - 1);
  const walkDoorCost = extraWalkDoors * WALK_DOOR_PRICES.extra_walkthrough;
  const overheadDoorCost = accessories.rollUpDoors.reduce((total, door) => {
    const key = `${door.height}x${door.width}`;
    return total + (DOOR_PRICE_MATRIX[key] || 0);
  }, 0);

  const addOnsCost = windowCost + insulationCost + gutterCost + concreteCost;
  const totalSoFar = basePrice + heightModifier + walkDoorCost + overheadDoorCost + addOnsCost;

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.p variants={itemVariants} className="text-gray-600">
        Add optional features and upgrades to your building.
      </motion.p>

      {/* Windows */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Windows</h3>

        <div className="space-y-4">
          {/* 3x3 Window */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">3' x 3' Fixed Window</p>
              <p className="text-sm text-gray-500">${WINDOW_PRICES['3x3'].toLocaleString()} each</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleWindowChange('3x3', -1)}
                disabled={window3x3Count === 0}
                className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-gray-800">{window3x3Count}</span>
              <button
                onClick={() => handleWindowChange('3x3', 1)}
                className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
              {window3x3Count > 0 && (
                <span className="text-emerald-600 font-medium ml-2">
                  ${(window3x3Count * WINDOW_PRICES['3x3']).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* 4x4 Window */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">4' x 4' Fixed Window</p>
              <p className="text-sm text-gray-500">${WINDOW_PRICES['4x4'].toLocaleString()} each</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleWindowChange('4x4', -1)}
                disabled={window4x4Count === 0}
                className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-gray-800">{window4x4Count}</span>
              <button
                onClick={() => handleWindowChange('4x4', 1)}
                className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
              {window4x4Count > 0 && (
                <span className="text-emerald-600 font-medium ml-2">
                  ${(window4x4Count * WINDOW_PRICES['4x4']).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Insulation */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Insulation</h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">Wall Insulation</p>
              <p className="text-sm text-gray-500">${INSULATION_PRICES.wall.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasWallInsulation}
                onChange={() => handleInsulationToggle('wall')}
                className="w-5 h-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">Roof Insulation</p>
              <p className="text-sm text-gray-500">${INSULATION_PRICES.roof.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasRoofInsulation}
                onChange={() => handleInsulationToggle('roof')}
                className="w-5 h-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </label>
        </div>
      </motion.div>

      {/* Options */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Options</h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">Gutters & Downspouts</p>
              <p className="text-sm text-gray-500">${OPTION_PRICES.gutters.toLocaleString()}</p>
            </div>
            <input
              type="checkbox"
              checked={accessories.gutters}
              onChange={(e) => setAccessories({ gutters: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
            />
          </label>
        </div>
      </motion.div>

      {/* Concrete */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Concrete Slab</h3>
        <p className="text-sm text-gray-500 mb-4">
          ${CONCRETE_PRICES.slab}/sq ft - Based on {sqft.toLocaleString()} sq ft = ${(sqft * CONCRETE_PRICES.slab).toLocaleString()}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setConcreteConfig({ type: 'none' })}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              concrete.type === 'none'
                ? 'border-cyan-400 bg-emerald-500 text-white'
                : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300'
            }`}
          >
            <p className="font-medium">No Concrete</p>
            <p className={`text-sm ${concrete.type === 'none' ? 'text-white/80' : 'text-gray-500'}`}>I'll handle separately</p>
          </button>
          <button
            onClick={() => setConcreteConfig({ type: 'slab' })}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              concrete.type === 'slab'
                ? 'border-cyan-400 bg-emerald-500 text-white'
                : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300'
            }`}
          >
            <p className="font-medium">Add Concrete Slab</p>
            <p className={`text-sm ${concrete.type === 'slab' ? 'text-white/80' : 'text-emerald-600 font-semibold'}`}>
              +${(sqft * CONCRETE_PRICES.slab).toLocaleString()}
            </p>
          </button>
        </div>
      </motion.div>

      {/* Running Total */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
      >
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Building + Height</span>
            <span className="text-gray-800">${(basePrice + heightModifier).toLocaleString()}</span>
          </div>
          {(walkDoorCost + overheadDoorCost) > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Doors</span>
              <span className="text-gray-800">${(walkDoorCost + overheadDoorCost).toLocaleString()}</span>
            </div>
          )}
          {windowCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Windows</span>
              <span className="text-gray-800">+${windowCost.toLocaleString()}</span>
            </div>
          )}
          {insulationCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Insulation</span>
              <span className="text-gray-800">+${insulationCost.toLocaleString()}</span>
            </div>
          )}
          {gutterCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Gutters & Downspouts</span>
              <span className="text-gray-800">+${gutterCost.toLocaleString()}</span>
            </div>
          )}
          {concreteCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Concrete Slab</span>
              <span className="text-gray-800">+${concreteCost.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="text-2xl font-bold text-emerald-600">
              ${totalSoFar.toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Step6AddOns;
