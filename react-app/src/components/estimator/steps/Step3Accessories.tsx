import { motion } from 'framer-motion';
import { DoorOpen, Square, Thermometer, Wind, Droplets, Plus, Trash2 } from 'lucide-react';
import { useEstimatorStore } from '../../../store/estimatorStore';
import { containerVariants, itemVariants } from '../../../animations/variants';
import Select from '../../common/Select/Select';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';
import BuildingProfile from '../building-profile/BuildingProfile';
import ViewControls from '../building-profile/ViewControls';
import type { DoorConfig, WindowConfig } from '../../../types/estimator';

// Generate a simple unique ID
const generateId = () => Math.random().toString(36).substring(2, 11);

export function Step3Accessories() {
  const {
    accessories,
    addDoor,
    removeDoor,
    updateDoor,
    addWindow,
    removeWindow,
    setAccessories
  } = useEstimatorStore();

  const walkDoorSizes = [
    { value: '3x7', label: "3' x 7' Walk Door" },
    { value: '4x7', label: "4' x 7' Walk Door" },
    { value: '6x7', label: "6' x 7' Double Walk Door" }
  ];

  const rollUpDoorSizes = [
    { value: '8x8', label: "8' x 8' Roll-Up Door" },
    { value: '10x10', label: "10' x 10' Roll-Up Door" },
    { value: '12x12', label: "12' x 12' Roll-Up Door" }
  ];

  const windowSizes = [
    { value: '30x36', label: '30" x 36" Window' },
    { value: '36x48', label: '36" x 48" Window' }
  ];

  const wallOptions = [
    { value: 'front', label: 'Front Wall' },
    { value: 'back', label: 'Back Wall' },
    { value: 'left', label: 'Left Wall' },
    { value: 'right', label: 'Right Wall' }
  ];

  const insulationOptions = [
    { value: 'none', label: 'No Insulation' },
    { value: 'ceiling', label: 'Ceiling Only (R-19)' },
    { value: 'full', label: 'Full Insulation (Ceiling + Walls)' }
  ];

  const handleAddWalkDoor = () => {
    const newDoor: DoorConfig = {
      id: generateId(),
      type: 'walk',
      size: '3x7',
      wall: 'front',
      quantity: 1
    };
    addDoor(newDoor);
  };

  const handleAddRollUpDoor = () => {
    const newDoor: DoorConfig = {
      id: generateId(),
      type: 'rollUp',
      size: '10x10',
      wall: 'front',
      quantity: 1
    };
    addDoor(newDoor);
  };

  const handleAddWindow = () => {
    const newWindow: WindowConfig = {
      id: generateId(),
      size: '30x36',
      wall: 'front',
      quantity: 1
    };
    addWindow(newWindow);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.p variants={itemVariants} className="text-gray-600">
        Add doors, windows, and other accessories to your building.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Accessories Selection */}
        <div className="space-y-6">
          {/* Walk Doors */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <DoorOpen className="w-5 h-5 text-orange-600" />
                Walk Doors
              </h3>
              <Button size="sm" variant="outline" onClick={handleAddWalkDoor} leftIcon={<Plus className="w-4 h-4" />}>
                Add
              </Button>
            </div>

            {accessories.walkDoors.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No walk doors added</p>
            ) : (
              <div className="space-y-3">
                {accessories.walkDoors.map((door) => (
                  <Card key={door.id} variant="bordered" padding="sm" className="flex items-center gap-3">
                    <Select
                      options={walkDoorSizes}
                      value={door.size}
                      onChange={(e) => updateDoor(door.id, { size: e.target.value as any })}
                      className="flex-1"
                    />
                    <Select
                      options={wallOptions}
                      value={door.wall}
                      onChange={(e) => updateDoor(door.id, { wall: e.target.value as any })}
                      className="flex-1"
                    />
                    <button
                      onClick={() => removeDoor(door.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>

          {/* Roll-Up Doors */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Square className="w-5 h-5 text-orange-600" />
                Roll-Up Doors
              </h3>
              <Button size="sm" variant="outline" onClick={handleAddRollUpDoor} leftIcon={<Plus className="w-4 h-4" />}>
                Add
              </Button>
            </div>

            {accessories.rollUpDoors.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No roll-up doors added</p>
            ) : (
              <div className="space-y-3">
                {accessories.rollUpDoors.map((door) => (
                  <Card key={door.id} variant="bordered" padding="sm" className="flex items-center gap-3">
                    <Select
                      options={rollUpDoorSizes}
                      value={door.size}
                      onChange={(e) => updateDoor(door.id, { size: e.target.value as any })}
                      className="flex-1"
                    />
                    <Select
                      options={wallOptions}
                      value={door.wall}
                      onChange={(e) => updateDoor(door.id, { wall: e.target.value as any })}
                      className="flex-1"
                    />
                    <button
                      onClick={() => removeDoor(door.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>

          {/* Windows */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Square className="w-5 h-5 text-orange-600" />
                Windows
              </h3>
              <Button size="sm" variant="outline" onClick={handleAddWindow} leftIcon={<Plus className="w-4 h-4" />}>
                Add
              </Button>
            </div>

            {accessories.windows.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No windows added</p>
            ) : (
              <div className="space-y-3">
                {accessories.windows.map((window) => (
                  <Card key={window.id} variant="bordered" padding="sm" className="flex items-center gap-3">
                    <Select
                      options={windowSizes}
                      value={window.size}
                      onChange={(e) => {
                        const updatedWindows = accessories.windows.map((w) =>
                          w.id === window.id ? { ...w, size: e.target.value as any } : w
                        );
                        setAccessories({ windows: updatedWindows });
                      }}
                      className="flex-1"
                    />
                    <Select
                      options={wallOptions}
                      value={window.wall}
                      onChange={(e) => {
                        const updatedWindows = accessories.windows.map((w) =>
                          w.id === window.id ? { ...w, wall: e.target.value as any } : w
                        );
                        setAccessories({ windows: updatedWindows });
                      }}
                      className="flex-1"
                    />
                    <button
                      onClick={() => removeWindow(window.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>

          {/* Other Options */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-orange-600" />
              Additional Options
            </h3>

            <Select
              label="Insulation"
              options={insulationOptions}
              value={accessories.insulation}
              onChange={(e) => setAccessories({ insulation: e.target.value as any })}
            />

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accessories.ventilation}
                  onChange={(e) => setAccessories({ ventilation: e.target.checked })}
                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <Wind className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Ridge Ventilation</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accessories.gutters}
                  onChange={(e) => setAccessories({ gutters: e.target.checked })}
                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <Droplets className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Gutters & Downspouts</span>
              </label>
            </div>
          </motion.div>
        </div>

        {/* Building Preview */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Building Preview</h3>
          <ViewControls />
          <BuildingProfile showDoors showClearanceZones />

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Doors must be placed at least 2'6" away from structural posts for proper installation and longevity.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Step3Accessories;
