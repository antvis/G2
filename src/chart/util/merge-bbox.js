
module.exports = function mergeBBox(box1, box2) {
  return {
    minX: Math.min(box1.minX, box2.minX),
    minY: Math.min(box1.minY, box2.minY),
    maxX: Math.max(box1.maxX, box2.maxX),
    maxY: Math.max(box1.maxY, box2.maxY)
  };
};
