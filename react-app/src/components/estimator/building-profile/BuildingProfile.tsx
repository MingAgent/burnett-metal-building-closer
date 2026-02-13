import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useEstimatorStore } from '../../../store/estimatorStore';
import { DOOR_POST_CLEARANCE_FT } from '../../../constants/pricing';

interface BuildingProfileProps {
  showDoors?: boolean;
  showClearanceZones?: boolean;
  className?: string;
}

export function BuildingProfile({
  showDoors: _showDoors = false,
  showClearanceZones = false,
  className = ''
}: BuildingProfileProps) {
  // _showDoors will be used in future for rendering doors on the building
  void _showDoors;
  const { building, colors } = useEstimatorStore();
  const { width, length, height, buildingView } = building;

  // Calculate display dimensions based on view
  const displayWidth = buildingView === 'left' || buildingView === 'right' ? length : width;
  const displayHeight = height;

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 400;
  const padding = 60;
  const groundY = svgHeight - padding;

  // Scale factor to fit building in SVG
  const maxBuildingWidth = svgWidth - padding * 2;
  const maxBuildingHeight = svgHeight - padding * 2 - 50; // Leave room for roof
  const scale = Math.min(
    maxBuildingWidth / displayWidth,
    maxBuildingHeight / displayHeight
  );

  const scaledWidth = displayWidth * scale;
  const scaledHeight = displayHeight * scale;
  const buildingX = (svgWidth - scaledWidth) / 2;
  const roofPeakHeight = 30;

  // Post positions
  const leftPostX = buildingX;
  const centerPostX = buildingX + scaledWidth / 2;
  const rightPostX = buildingX + scaledWidth;

  // Clearance zone calculations
  const clearancePixels = DOOR_POST_CLEARANCE_FT * scale;

  // Determine if gabled (front/back) or eave (left/right) view
  const isGabledView = buildingView === 'front' || buildingView === 'back';

  // Building colors
  const roofColor = colors.roof;
  const wallColor = colors.walls;
  const trimColor = colors.trim;

  // Generate roof path
  const roofPath = useMemo(() => {
    if (isGabledView) {
      // Peaked roof for front/back
      const peakX = buildingX + scaledWidth / 2;
      const peakY = groundY - scaledHeight - roofPeakHeight;
      const leftEave = groundY - scaledHeight;
      const rightEave = groundY - scaledHeight;
      return `M ${buildingX - 10} ${leftEave} L ${peakX} ${peakY} L ${rightPostX + 10} ${rightEave}`;
    } else {
      // Flat eave for side views
      const roofY = groundY - scaledHeight;
      return `M ${buildingX - 10} ${roofY} L ${rightPostX + 10} ${roofY}`;
    }
  }, [isGabledView, buildingX, scaledWidth, scaledHeight, groundY, rightPostX, roofPeakHeight]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-b from-sky-100 to-sky-200 rounded-xl p-4 overflow-hidden ${className}`}
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto"
        style={{ maxHeight: '350px' }}
      >
        {/* Sky gradient */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
          <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width={svgWidth} height={groundY} fill="url(#skyGradient)" />

        {/* Ground */}
        <rect x="0" y={groundY} width={svgWidth} height={svgHeight - groundY} fill="url(#groundGradient)" />

        {/* Clearance Zones */}
        {showClearanceZones && (
          <>
            {/* Left post clearance zone */}
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              x={leftPostX}
              y={groundY - scaledHeight * 0.9}
              width={clearancePixels}
              height={scaledHeight * 0.9}
              fill="#ef4444"
            />
            {/* Center post clearance zone */}
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              x={centerPostX - clearancePixels / 2}
              y={groundY - scaledHeight * 0.9}
              width={clearancePixels}
              height={scaledHeight * 0.9}
              fill="#ef4444"
            />
            {/* Right post clearance zone */}
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              x={rightPostX - clearancePixels}
              y={groundY - scaledHeight * 0.9}
              width={clearancePixels}
              height={scaledHeight * 0.9}
              fill="#ef4444"
            />
          </>
        )}

        {/* Building walls */}
        <motion.rect
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ transformOrigin: `${buildingX + scaledWidth / 2}px ${groundY}px` }}
          x={buildingX}
          y={groundY - scaledHeight}
          width={scaledWidth}
          height={scaledHeight}
          fill={wallColor}
          stroke={trimColor}
          strokeWidth="3"
        />

        {/* Roof */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          d={roofPath}
          fill="none"
          stroke={roofColor}
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Posts */}
        {[leftPostX, centerPostX, rightPostX].map((x, i) => (
          <motion.line
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            style={{ transformOrigin: `${x}px ${groundY}px` }}
            x1={x}
            y1={groundY}
            x2={x}
            y2={groundY - scaledHeight}
            stroke="#8B4513"
            strokeWidth="4"
            strokeDasharray="8,4"
            opacity="0.6"
          />
        ))}

        {/* Dimension labels */}
        {/* Width */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <line
            x1={buildingX}
            y1={groundY + 20}
            x2={buildingX + scaledWidth}
            y2={groundY + 20}
            stroke="#374151"
            strokeWidth="1"
            markerStart="url(#arrowStart)"
            markerEnd="url(#arrowEnd)"
          />
          <text
            x={buildingX + scaledWidth / 2}
            y={groundY + 40}
            textAnchor="middle"
            className="text-sm font-semibold fill-gray-700"
          >
            {displayWidth}'
          </text>
        </motion.g>

        {/* Height */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <line
            x1={buildingX - 20}
            y1={groundY}
            x2={buildingX - 20}
            y2={groundY - scaledHeight}
            stroke="#374151"
            strokeWidth="1"
          />
          <text
            x={buildingX - 30}
            y={groundY - scaledHeight / 2}
            textAnchor="middle"
            className="text-sm font-semibold fill-gray-700"
            transform={`rotate(-90, ${buildingX - 30}, ${groundY - scaledHeight / 2})`}
          >
            {displayHeight}'
          </text>
        </motion.g>

        {/* View label */}
        <motion.text
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          x={svgWidth / 2}
          y={30}
          textAnchor="middle"
          className="text-lg font-bold fill-gray-800"
        >
          {buildingView.charAt(0).toUpperCase() + buildingView.slice(1)} View
        </motion.text>

        {/* Clearance labels */}
        {showClearanceZones && (
          <>
            <text x={leftPostX + 5} y={groundY - 10} className="text-xs fill-red-600">
              2'6"
            </text>
            <text x={centerPostX + 5} y={groundY - 10} className="text-xs fill-red-600">
              2'6"
            </text>
            <text x={rightPostX - clearancePixels + 5} y={groundY - 10} className="text-xs fill-red-600">
              2'6"
            </text>
          </>
        )}
      </svg>
    </motion.div>
  );
}

export default BuildingProfile;
