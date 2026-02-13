import { motion } from 'framer-motion';
import { Ruler, ArrowUpDown, Building } from 'lucide-react';
import Select from '../../common/Select/Select';
import { useEstimatorStore } from '../../../store/estimatorStore';
import { containerVariants, itemVariants } from '../../../animations/variants';
import { WIDTH_OPTIONS, LENGTH_OPTIONS, HEIGHT_OPTIONS } from '../../../constants/pricing';
import BuildingProfile from '../building-profile/BuildingProfile';
import ViewControls from '../building-profile/ViewControls';

export function Step2BuildingSize() {
  const { building, setBuildingConfig } = useEstimatorStore();

  const widthOptions = WIDTH_OPTIONS.map((w) => ({
    value: w,
    label: `${w} feet`
  }));

  const lengthOptions = LENGTH_OPTIONS.map((l) => ({
    value: l,
    label: `${l} feet`
  }));

  const heightOptions = HEIGHT_OPTIONS.map((h) => ({
    value: h,
    label: `${h} feet`
  }));

  const legTypeOptions = [
    { value: 'standard', label: 'Standard (29 gauge)' },
    { value: 'certified', label: 'Certified (26 gauge - Wind/Snow rated)' }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.p variants={itemVariants} className="text-gray-600">
        Configure your building dimensions and structural specifications.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dimension Inputs */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-orange-600" />
            Building Dimensions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Width"
              options={widthOptions}
              value={building.width}
              onChange={(e) => setBuildingConfig({ width: Number(e.target.value) })}
            />
            <Select
              label="Length"
              options={lengthOptions}
              value={building.length}
              onChange={(e) => setBuildingConfig({ length: Number(e.target.value) })}
            />
            <Select
              label="Height"
              options={heightOptions}
              value={building.height}
              onChange={(e) => setBuildingConfig({ height: Number(e.target.value) })}
            />
          </div>

          {/* Square Footage Display */}
          <motion.div
            className="bg-orange-50 rounded-lg p-4 border border-orange-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={`${building.width}-${building.length}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Total Square Footage:</span>
              <motion.span
                className="text-2xl font-bold text-orange-600"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                key={building.width * building.length}
              >
                {(building.width * building.length).toLocaleString()} sq ft
              </motion.span>
            </div>
          </motion.div>

          {/* Leg Type Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-orange-600" />
              Frame Type
            </h3>

            <Select
              options={legTypeOptions}
              value={building.legType}
              onChange={(e) => setBuildingConfig({ legType: e.target.value as 'standard' | 'certified' })}
            />

            <p className="text-sm text-gray-500">
              {building.legType === 'certified'
                ? 'Certified frames are engineered for higher wind and snow loads with thicker gauge steel.'
                : 'Standard frames are suitable for most residential and light commercial applications.'
              }
            </p>
          </div>
        </motion.div>

        {/* Building Preview */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Building className="w-5 h-5 text-orange-600" />
            Building Preview
          </h3>

          <ViewControls />
          <BuildingProfile />

          {/* Breezeway Options */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Breezeway Options</h4>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={building.breezeway.frontBack}
                  onChange={(e) =>
                    setBuildingConfig({
                      breezeway: { ...building.breezeway, frontBack: e.target.checked }
                    })
                  }
                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Front/Back Breezeway</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={building.breezeway.sideSide}
                  onChange={(e) =>
                    setBuildingConfig({
                      breezeway: { ...building.breezeway, sideSide: e.target.checked }
                    })
                  }
                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Side/Side Breezeway</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Breezeway options will automatically center doors on opposite walls.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Step2BuildingSize;
