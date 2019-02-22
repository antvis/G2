
const G = require('../../renderer');
const Util = require('../../util');
const mergeBBox = require('./merge-bbox');

function applyMatrix(point, matrix, tag = 1) {
  const vector = [ point.x, point.y, tag ];
  Util.vec3.transformMat3(vector, vector, matrix);
  return {
    x: vector[0],
    y: vector[1]
  };
}

function getTitleBBox(title) {
  const bbox = title.getBBox();
  let leftTop = {
    x: bbox.minX,
    y: bbox.minY
  };
  let rightBottom = {
    x: bbox.maxX,
    y: bbox.maxY
  };
  const matrix = title.attr('matrix');
  leftTop = applyMatrix(leftTop, matrix);
  rightBottom = applyMatrix(rightBottom, matrix);

  return {
    minX: leftTop.x,
    minY: leftTop.y,
    maxX: rightBottom.x,
    maxY: rightBottom.y
  };
}

module.exports = function BBoxOfBackPlot(backPlot, defaultBBox) {
  let bbox = defaultBBox;
  Util.each(backPlot.get('children'), element => {
    if ((element instanceof G.Group && element.get('children').length) || element instanceof G.Path) {
      bbox = mergeBBox(bbox, element.getBBox());
    } else if (element instanceof G.Text) { // title
      const elementBBox = getTitleBBox(element);
      const dx = Math.abs(elementBBox.maxX - elementBBox.minX);
      const dy = Math.abs(elementBBox.maxY - elementBBox.minY);
      if (dx < dy) {
        bbox = mergeBBox(bbox, Util.mix(bbox, {
          minX: Math.min(bbox.minX, elementBBox.minX),
          maxX: Math.max(bbox.maxX, elementBBox.maxX)
        }));
      } else {
        bbox = mergeBBox(bbox, Util.mix(bbox, {
          minY: Math.min(bbox.minY, elementBBox.minY),
          maxY: Math.max(bbox.maxY, elementBBox.maxY)
        }));
      }
    }
  });
  return bbox;
};
