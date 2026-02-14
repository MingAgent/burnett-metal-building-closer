import { motion } from 'framer-motion';
import { useEstimatorStore } from '../../../store/estimatorStore';
import { containerVariants, itemVariants } from '../../../animations/variants';
import { BUILDING_SIZES } from '../../../constants/pricing';

export function Step2BuildingSize() {
  const { building, setBuildingConfig } = useEstimatorStore();

  const handleSizeSelect = (sizeId: string) => {
    const selectedSize = BUILDING_SIZES.find(s => s.id === sizeId);
    if (selectedSize) {
      setBuildingConfig({
        buildingSizeId: sizeId,
        width: selectedSize.width,
        length: selectedSize.length
      });
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.p variants={itemVariants} className="text-gray-600">
        Select your building size to get started.
      </motion.p>

      {/* Building Size Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {BUILDING_SIZES.map((size) => (
            <button
              key={size.id}
              onClick={() => handleSizeSelect(size.id)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200 text-center
                ${building.buildingSizeId === size.id
                  ? 'border-cyan-400 bg-emerald-500 text-white'
                  : 'border-gray-200 bg-white hover:border-gray-300 text-gray-800'
                }
              `}
            >
              <div className="space-y-2">
                <p className="text-lg font-bold">
                  {size.label}
                </p>
                <p className={`text-sm ${building.buildingSizeId === size.id ? 'text-white/80' : 'text-gray-500'}`}>
                  {size.sqft.toLocaleString()} sq ft
                </p>
                <p className={`text-xl font-bold ${building.buildingSizeId === size.id ? 'text-white' : 'text-emerald-600'}`}>
                  ${size.startingPrice.toLocaleString()}
                </p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Selected Size Summary */}
      {building.buildingSizeId && (
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Selected Size</p>
              <p className="text-lg font-semibold text-gray-800">
                {building.width}' x {building.length}' ({(building.width * building.length).toLocaleString()} sq ft)
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Base Price</p>
              <p className="text-2xl font-bold text-emerald-600">
                ${BUILDING_SIZES.find(s => s.id === building.buildingSizeId)?.startingPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Step2BuildingSize;
