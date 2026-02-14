import { motion } from 'framer-motion';
import { useEstimatorStore } from '../../../store/estimatorStore';
import { containerVariants, itemVariants } from '../../../animations/variants';
import { EAVE_HEIGHTS, BUILDING_SIZES } from '../../../constants/pricing';

export function Step3EaveHeight() {
  const { building, setBuildingConfig } = useEstimatorStore();

  const handleHeightSelect = (heightId: string) => {
    const selectedHeight = EAVE_HEIGHTS.find(h => h.id === heightId);
    if (selectedHeight) {
      setBuildingConfig({
        eaveHeightId: heightId,
        height: selectedHeight.height
      });
    }
  };

  // Get base price from selected building size
  const basePrice = BUILDING_SIZES.find(s => s.id === building.buildingSizeId)?.startingPrice || 0;
  const heightModifier = EAVE_HEIGHTS.find(h => h.id === building.eaveHeightId)?.modifier || 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.p variants={itemVariants} className="text-gray-600">
        Select your eave height. Taller buildings have additional costs.
      </motion.p>

      {/* Eave Height Options */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {EAVE_HEIGHTS.map((height) => (
            <button
              key={height.id}
              onClick={() => handleHeightSelect(height.id)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200 text-center
                ${building.eaveHeightId === height.id
                  ? 'border-cyan-400 bg-emerald-500 text-white'
                  : 'border-gray-200 bg-white hover:border-gray-300 text-gray-800'
                }
              `}
            >
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  {height.label}
                </p>
                <p className={`text-sm font-medium ${building.eaveHeightId === height.id ? 'text-white/80' : 'text-gray-500'}`}>
                  {height.modifier === 0 ? 'Base Price' : `+$${height.modifier.toLocaleString()}`}
                </p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Running Total */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
      >
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Building Size ({building.width}' x {building.length}')</span>
            <span className="text-gray-800">${basePrice.toLocaleString()}</span>
          </div>
          {heightModifier > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Height Upgrade ({building.height} ft)</span>
              <span className="text-gray-800">+${heightModifier.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
            <span className="font-semibold text-gray-800">Subtotal</span>
            <span className="text-2xl font-bold text-emerald-600">
              ${(basePrice + heightModifier).toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Step3EaveHeight;
