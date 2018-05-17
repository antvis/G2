/**
 * @fileOverview the region guide
 * @author Ye Liu liuye10@yahoo.com
 */
const Util = require('../../util');
const Base = require('./base');

class RegionFilter extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();

    return Util.mix({}, cfg, {
      type: 'regionFilter',
      zIndex: 1,
      top: true,
      start: null,
      end: null,
      color: null,
      style: {
        opacity: 1
      }
    });
  }

  render(coord, group) {
    const self = this;
    const view = self.view;
    const layer = group.addGroup();
    view.once('afterpaint', function() {
      self._drawShapes(view, layer);
      const clip = self._drawClip(coord, group);
      layer.attr({ clip });
    });

    self.appendInfo && layer.setSilent('appendInfo', self.appendInfo);
    self.el = layer;
  }

  _drawShapes(view, layer) {
    const self = this;
    const output = [];
    const geoms = view.getAllGeoms();
    geoms.map(geom => {
      const shapes = geom.getShapes();
      shapes.map(shape => {
        const shapeType = shape.type;
        const shapeAttr = Util.cloneDeep(shape.get('attrs'));
        self._adjustDisplay(shapeAttr);
        const s = layer.addShape(shapeType, {
          attrs: shapeAttr
        });
        output.push(s);
        return shape;
      });
      return geom;
    });
    return output;
  }

  _drawClip(coord, group) {
    const self = this;
    const start = self.parsePoint(coord, self.start);
    const end = self.parsePoint(coord, self.end);
    const c = group.addShape('rect', {
      attrs: {
        x: start.x,
        y: start.y,
        width: end.x - start.x,
        height: end.y - start.y,
        opacity: 1
      }
    });
    return c;
  }

  _adjustDisplay(attr) {
    const self = this;
    const color = self.color;
    if (attr.fill) {
      attr.fill = color;
    }
    attr.stroke = color;
  }
}

module.exports = RegionFilter;
