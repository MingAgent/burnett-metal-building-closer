import { motion } from 'framer-motion';
import { useEstimatorStore } from '../../../store/estimatorStore';
import { containerVariants, itemVariants } from '../../../animations/variants';
import { ROOF_COLORS, WALL_COLORS, TRIM_COLORS } from '../../../constants/colors';
import type { ColorOption } from '../../../constants/colors';

interface ColorSwatchProps {
  color: ColorOption;
  isSelected: boolean;
  onClick: () => void;
}

function ColorSwatch({ color, isSelected, onClick }: ColorSwatchProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-10 h-10 rounded-lg shadow-sm transition-all duration-200
        ${isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 scale-110' : 'hover:scale-105'}
      `}
      style={{ backgroundColor: color.hex }}
      title={color.name}
    >
      {color.hex === '#FFFFFF' && (
        <div className="absolute inset-0 border border-gray-300 rounded-lg" />
      )}
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
            color.hex === '#FFFFFF' || color.hex === '#FEF3C7' || color.hex === '#D7CCC8' || color.hex === '#E8DCC8'
              ? 'bg-gray-800' : 'bg-white'
          }`}>
            <svg className={`w-2.5 h-2.5 ${
              color.hex === '#FFFFFF' || color.hex === '#FEF3C7' || color.hex === '#D7CCC8' || color.hex === '#E8DCC8'
                ? 'text-white' : 'text-emerald-600'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </button>
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
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <span className="text-sm text-gray-500">{selectedColorName}</span>
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
    </div>
  );
}

export function Step5Colors() {
  const { colors, setColors } = useEstimatorStore();

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.p variants={itemVariants} className="text-gray-600">
        Choose colors for your building panels and trim.
      </motion.p>

      <motion.div variants={itemVariants} className="space-y-4">
        <ColorSection
          title="Wall Panels"
          colors={WALL_COLORS}
          selectedColor={colors.walls}
          onSelect={(hex) => setColors({ walls: hex })}
        />

        <ColorSection
          title="Roof Panels"
          colors={ROOF_COLORS}
          selectedColor={colors.roof}
          onSelect={(hex) => setColors({ roof: hex })}
        />

        <ColorSection
          title="Trim"
          colors={TRIM_COLORS}
          selectedColor={colors.trim}
          onSelect={(hex) => setColors({ trim: hex })}
        />
      </motion.div>

      {/* Color Summary */}
      <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-3">Your Color Selections</h4>
        <div className="flex gap-6">
          {[
            { label: 'Walls', color: colors.walls, colorList: WALL_COLORS },
            { label: 'Roof', color: colors.roof, colorList: ROOF_COLORS },
            { label: 'Trim', color: colors.trim, colorList: TRIM_COLORS }
          ].map(({ label, color, colorList }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded border border-gray-300"
                style={{ backgroundColor: color }}
              />
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-medium text-gray-800">
                  {colorList.find((c) => c.hex === color)?.name || 'Custom'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Step5Colors;
