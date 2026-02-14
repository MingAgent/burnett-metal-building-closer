import { motion } from 'framer-motion';
import { useEstimatorStore } from '../../../store/estimatorStore';
import { containerVariants, itemVariants } from '../../../animations/variants';
import {
  BUILDING_SIZES,
  EAVE_HEIGHTS,
  DOOR_PRICE_MATRIX,
  WALK_DOOR_PRICES,
  WINDOW_PRICES,
  INSULATION_PRICES,
  OPTION_PRICES,
  CONCRETE_PRICES
} from '../../../constants/pricing';
import { ROOF_COLORS, WALL_COLORS, TRIM_COLORS } from '../../../constants/colors';

export function Step7Summary() {
  const { customer, building, accessories, concrete, colors } = useEstimatorStore();

  // Calculate all costs
  const basePrice = BUILDING_SIZES.find(s => s.id === building.buildingSizeId)?.startingPrice || 0;
  const heightModifier = EAVE_HEIGHTS.find(h => h.id === building.eaveHeightId)?.modifier || 0;

  const walkDoorCount = accessories.walkDoors.length;
  const extraWalkDoors = Math.max(0, walkDoorCount - 1);
  const walkDoorCost = extraWalkDoors * WALK_DOOR_PRICES.extra_walkthrough;

  const overheadDoorCost = accessories.rollUpDoors.reduce((total, door) => {
    const key = `${door.height}x${door.width}`;
    return total + (DOOR_PRICE_MATRIX[key] || 0);
  }, 0);

  const window3x3Count = accessories.windows.filter(w => w.size === '3x3').length;
  const window4x4Count = accessories.windows.filter(w => w.size === '4x4').length;
  const windowCost = (window3x3Count * WINDOW_PRICES['3x3']) + (window4x4Count * WINDOW_PRICES['4x4']);

  const insulationCost = INSULATION_PRICES[accessories.insulation] || 0;
  const gutterCost = accessories.gutters ? OPTION_PRICES.gutters : 0;

  const sqft = building.width * building.length;
  const concreteCost = concrete.type === 'slab' ? sqft * CONCRETE_PRICES.slab : 0;

  const grandTotal = basePrice + heightModifier + walkDoorCost + overheadDoorCost + windowCost + insulationCost + gutterCost + concreteCost;

  // Get color names
  const getColorName = (hex: string, colorList: { hex: string; name: string }[]) =>
    colorList.find(c => c.hex === hex)?.name || 'Custom';

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.p variants={itemVariants} className="text-gray-600">
        Review your building configuration and pricing.
      </motion.p>

      {/* Customer Info */}
      {customer.name && (
        <motion.div variants={itemVariants} className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium text-gray-800">{customer.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">{customer.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{customer.email || 'Not provided'}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Building Configuration */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Building Configuration</h3>

        <div className="space-y-4">
          {/* Size & Height */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Building Size</p>
              <p className="font-medium text-gray-800">{building.width}' x {building.length}'</p>
            </div>
            <div>
              <p className="text-gray-500">Square Footage</p>
              <p className="font-medium text-gray-800">{sqft.toLocaleString()} sq ft</p>
            </div>
            <div>
              <p className="text-gray-500">Eave Height</p>
              <p className="font-medium text-gray-800">{building.height} ft</p>
            </div>
          </div>

          {/* Doors */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-500 text-sm mb-2">Doors</p>
            <ul className="text-sm space-y-1">
              <li className="text-gray-800">
                {walkDoorCount} x 3070 Walk-Through Door{walkDoorCount > 1 ? 's' : ''}
                {walkDoorCount === 1 && ' (included)'}
              </li>
              {accessories.rollUpDoors.map((door) => (
                <li key={door.id} className="text-gray-800">
                  {door.width}' x {door.height}' Overhead Door on {door.wall} wall
                </li>
              ))}
            </ul>
          </div>

          {/* Colors */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-500 text-sm mb-2">Colors</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: colors.walls }} />
                <span className="text-sm text-gray-800">Walls: {getColorName(colors.walls, WALL_COLORS)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: colors.roof }} />
                <span className="text-sm text-gray-800">Roof: {getColorName(colors.roof, ROOF_COLORS)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: colors.trim }} />
                <span className="text-sm text-gray-800">Trim: {getColorName(colors.trim, TRIM_COLORS)}</span>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          {(window3x3Count + window4x4Count > 0 || insulationCost > 0 || gutterCost > 0 || concreteCost > 0) && (
            <div className="border-t border-gray-100 pt-4">
              <p className="text-gray-500 text-sm mb-2">Add-Ons</p>
              <ul className="text-sm space-y-1">
                {window3x3Count > 0 && (
                  <li className="text-gray-800">{window3x3Count} x 3' x 3' Window</li>
                )}
                {window4x4Count > 0 && (
                  <li className="text-gray-800">{window4x4Count} x 4' x 4' Window</li>
                )}
                {accessories.insulation !== 'none' && (
                  <li className="text-gray-800">
                    {accessories.insulation === 'full' ? 'Wall & Roof' :
                     accessories.insulation === 'wall' ? 'Wall' : 'Roof'} Insulation
                  </li>
                )}
                {accessories.gutters && (
                  <li className="text-gray-800">Gutters & Downspouts</li>
                )}
                {concrete.type === 'slab' && (
                  <li className="text-gray-800">Concrete Slab</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </motion.div>

      {/* Price Breakdown */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Breakdown</h3>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Building ({building.width}' x {building.length}')</span>
            <span className="text-gray-800">${basePrice.toLocaleString()}</span>
          </div>
          {heightModifier > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Height Upgrade ({building.height} ft)</span>
              <span className="text-gray-800">+${heightModifier.toLocaleString()}</span>
            </div>
          )}
          {extraWalkDoors > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Additional Walk Doors ({extraWalkDoors})</span>
              <span className="text-gray-800">+${walkDoorCost.toLocaleString()}</span>
            </div>
          )}
          {overheadDoorCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Overhead Doors ({accessories.rollUpDoors.length})</span>
              <span className="text-gray-800">+${overheadDoorCost.toLocaleString()}</span>
            </div>
          )}
          {windowCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Windows ({window3x3Count + window4x4Count})</span>
              <span className="text-gray-800">+${windowCost.toLocaleString()}</span>
            </div>
          )}
          {insulationCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Insulation</span>
              <span className="text-gray-800">+${insulationCost.toLocaleString()}</span>
            </div>
          )}
          {gutterCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Gutters & Downspouts</span>
              <span className="text-gray-800">+${gutterCost.toLocaleString()}</span>
            </div>
          )}
          {concreteCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Concrete Slab</span>
              <span className="text-gray-800">+${concreteCost.toLocaleString()}</span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Grand Total</span>
              <span className="text-3xl font-bold text-emerald-600">
                ${grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div variants={itemVariants} className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
        <h3 className="text-lg font-semibold text-emerald-800 mb-2">Ready to proceed?</h3>
        <p className="text-emerald-700">
          Click "Finish" to save your estimate. We'll contact you to discuss your project and schedule a site visit.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Step7Summary;
