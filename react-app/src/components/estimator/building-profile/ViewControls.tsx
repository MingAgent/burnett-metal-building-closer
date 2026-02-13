import { motion } from 'framer-motion';
import { useEstimatorStore } from '../../../store/estimatorStore';
import type { BuildingView } from '../../../types/estimator';

const views: { id: BuildingView; label: string }[] = [
  { id: 'front', label: 'Front' },
  { id: 'back', label: 'Back' },
  { id: 'left', label: 'Left Side' },
  { id: 'right', label: 'Right Side' }
];

export function ViewControls() {
  const { building, setBuildingConfig } = useEstimatorStore();
  const { buildingView } = building;

  return (
    <div className="flex justify-center mb-4">
      <div className="inline-flex rounded-lg overflow-hidden border border-gray-300 bg-gray-100">
        {views.map((view) => {
          const isActive = buildingView === view.id;
          return (
            <motion.button
              key={view.id}
              onClick={() => setBuildingConfig({ buildingView: view.id })}
              className={`
                relative px-4 py-2 text-sm font-medium
                transition-colors duration-200
                ${isActive
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }
              `}
              whileHover={{ scale: isActive ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="activeViewTab"
                  className="absolute inset-0 bg-orange-600"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
              <span className="relative z-10">{view.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default ViewControls;
