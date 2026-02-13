import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useEstimatorStore } from '../../../store/estimatorStore';
import { containerVariants, itemVariants, swatchVariants } from '../../../animations/variants';
import { ROOF_COLORS, WALL_COLORS, TRIM_COLORS } from '../../../constants/colors';
import type { ColorOption } from '../../../constants/colors';
import BuildingProfile from '../building-profile/BuildingProfile';

interface ColorSwatchProps {
  color: ColorOption;
  isSelected: boolean;
  onClick: () => void;
}

function ColorSwatch({ color, isSelected, onClick }: ColorSwatchProps) {
  return (
    <motion.button
      variants={swatchVariants}
      initial="initial"
      animate={isSelected ? 'selected' : 'initial'}
      whileHover="hover"
      onClick={onClick}
      className={`
        relative w-12 h-12 rounded-lg shadow-md
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        ${isSelected ? 'ring-2 ring-orange-600 ring-offset-2' : ''}
      `}
      style={{ backgroundColor: color.hex }}
      title={color.name}
    >
      {/* Border for light colors */}
      {color.hex === '#FFFFFF' && (
        <div className="absolute inset-0 border border-gray-300 rounded-lg" />
      )}
      {/* Checkmark for selected */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              color.hex === '#FFFFFF' || color.hex === '#FEF3C7' || color.hex === '#D7CCC8' || color.hex === '#E8DCC8'
                ? 'bg-gray-800'
                : 'bg-white'
            }`}
          >
            <svg
              className={`w-3 h-3 ${
                color.hex === '#FFFFFF' || color.hex === '#FEF3C7' || color.hex === '#D7CCC8' || color.hex === '#E8DCC8'
                  ? 'text-white'
                  : 'text-orange-600'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>
      )}
    </motion.button>
  );
}

interface ColorSectionProps {
  title: string;
  colors: ColorOption[];
  selectedColor: string;
  onSelect: (hex: string) => void;
}

function ColorSection({ title, colors, selectedColor, onSelect }: ColorSectionProps) {
  const selectedColorName = colors.find((c) => c.hex === selectedColor)?.name || 'Custom';

  return (
    <motion.div variants={itemVariants} className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <span className="text-sm text-gray-500">
          Selected: <span className="font-medium text-gray-700">{selectedColorName}</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <ColorSwatch
            key={color.hex + color.name}
            color={color}
            isSelected={selectedColor === color.hex}
            onClick={() => onSelect(color.hex)}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function Step4Colors() {
  const { colors, setColors } = useEstimatorStore();

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.p variants={itemVariants} className="text-gray-600">
        Choose the colors for your metal building. See a live preview as you select.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Selection */}
        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-6">
              <Palette className="w-5 h-5 text-orange-600" />
              Color Selection
            </h3>
          </motion.div>

          <ColorSection
            title="Roof Color"
            colors={ROOF_COLORS}
            selectedColor={colors.roof}
            onSelect={(hex) => setColors({ roof: hex })}
          />

          <ColorSection
            title="Wall Color"
            colors={WALL_COLORS}
            selectedColor={colors.walls}
            onSelect={(hex) => setColors({ walls: hex })}
          />

          <ColorSection
            title="Trim Color"
            colors={TRIM_COLORS}
            selectedColor={colors.trim}
            onSelect={(hex) => setColors({ trim: hex })}
          />
        </div>

        {/* Live Preview */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
          <BuildingProfile />

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> For best results, choose contrasting colors between your roof and walls.
              Darker trim colors help define the building's profile.
            </p>
          </div>

          {/* Color Summary */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-3">Your Selections</h4>
            <div className="space-y-2">
              {[
                { label: 'Roof', color: colors.roof, colors: ROOF_COLORS },
                { label: 'Walls', color: colors.walls, colors: WALL_COLORS },
                { label: 'Trim', color: colors.trim, colors: TRIM_COLORS }
              ].map(({ label, color, colors: colorOptions }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-gray-600">{label}:</span>
                  <span className="text-sm font-medium text-gray-800">
                    {colorOptions.find((c) => c.hex === color)?.name || 'Custom'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Step4Colors;
