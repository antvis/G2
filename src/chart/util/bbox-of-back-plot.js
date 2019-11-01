
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
  Util.each(backPlot.get('children'), group => {
    // 这段代码假设了子元素是 axis，同时 title 超出长度，
    // 这种临时代码需要在 4.0 中修复掉
    if (group instanceof G.Group) {
      Util.each(group.get('children'), element => {
        if ((element instanceof G.Group && element.get('children').length) || element instanceof G.Path) {
          bbox = mergeBBox(bbox, element.getBBox());
        } else if (element instanceof G.Text) { // title
          const elementBBox = getTitleBBox(element);
          bbox = mergeBBox(bbox, elementBBox);
        }
      });
    }
  });
  return bbox;
};
