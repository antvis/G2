
module.exports = function plotRange2BBox(plotRange) {
  return {
    minX: plotRange.tl.x,
    minY: plotRange.tl.y,
    maxX: plotRange.br.x,
    maxY: plotRange.br.y
  };
};
