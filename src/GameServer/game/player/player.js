export const playerModel = {
  id: 514536009,
  characters: [1505, 1106],
  position: {
      x: -34295,
      y: 83945,
      z: 10609,
  },
  rotation: {
      pitch: 0,
      yaw: 0,
      roll: 0,
  },
  attributes: {
      name: "鸣潮 PS",
      level: 80,
      headphoto: 1505,
      headframe: 80060009,
  },
  componentPbs: [
      {
          attributeComponent: {
              hardnessModeId: 1,
              rageModeId: 2,
              gameAttributes: generateGameAttributes(),
          },
      },
      {
          concomitantsComponentPb: {
              customEntityIds: [],
          },
      },
  ],
};

/**
* Generates the game attributes with default values.
* @returns {Array} Array of game attribute objects.
*/
function generateGameAttributes() {
  const defaultCurrentValue = 1; // Default value for currentValue
  const attributesCount = 139; // Number of attributes defined

  return Array.from({ length: attributesCount }, (_, index) => ({
      attributeType: index, // Setting attribute type from 0 to 138
      currentValue: index >= 59 && index <= 66 ? 0 : defaultCurrentValue, // Custom default for specific ranges
      valueIncrement: 0,
  }));
}
