/**
 * @fileOverview the region guide
 * @author Ye Liu liuye10@yahoo.com
 */
const Util = require('../../util');
const Base = require('./base');
const renderer = require('../../renderer');

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
      apply: null,
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
      // 2018-08-08 by blue.lb padding为auto时，会导致重新绘制一次，这时候layer已经被销毁了
      if (layer.get('destroyed')) return;
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
      const geomType = geom.get('type');
      const filter = self._geomFilter(geomType);
      if (filter) {
        shapes.map(shape => {
          const shapeType = shape.type;
          const shapeAttr = Util.cloneDeep(shape.attr());
          self._adjustDisplay(shapeAttr);
          const s = layer.addShape(shapeType, {
            attrs: shapeAttr
          });
          output.push(s);
          return shape;
        });
      }
      return geom;
    });
    return output;
  }

  _drawClip(coord) {
    const self = this;
    const start = self.parsePoint(coord, self.start);
    const end = self.parsePoint(coord, self.end);
    const c = new renderer.Rect({
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
      attr.fill = attr.fillStyle = color;
    }
    attr.stroke = attr.strokeStyle = color;
  }

  _geomFilter(geomType) {
    const self = this;
    if (self.apply) {
      return Util.inArray(self.apply, geomType);
    }
    return true;
  }
}

module.exports = RegionFilter;
