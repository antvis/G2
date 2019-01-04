
const G = require('../../renderer');
const Util = require('../../util');
const mergeBBox = require('./merge-bbox');

module.exports = function BBoxOfBackPlot(backPlot, defaultBBox) {
  let bbox = defaultBBox;
  Util.each(backPlot.get('children'), element => {
    if (element instanceof G.Group || element instanceof G.Path) {
      bbox = mergeBBox(bbox, element.getBBox());
    } else if (element instanceof G.Text) { // title
      const elementBBox = element.getBBox();
      if (element.attr('rotate')) { // vertical
        bbox = mergeBBox(bbox, Util.mix(bbox, {
          minX: bbox.minX - elementBBox.height,
          maxX: bbox.maxX + elementBBox.height
        }));
      } else {
        bbox = mergeBBox(bbox, Util.mix(bbox, {
          minY: bbox.minY - elementBBox.height,
          maxY: bbox.maxY + elementBBox.height
        }));
      }
    }
  });
  return bbox;
};
