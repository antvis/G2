
const Util = require('../../util');
const Interaction = require('./base');

const BRUSH_TYPES = [ 'X', 'Y', 'XY', 'POLYGON' ];
const DEFAULT_TYPE = 'XY';

class Brush extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      type: DEFAULT_TYPE,
      startPoint: null,
      brushing: false,
      dragging: false,
      brushShape: null,
      container: null,
      polygonPath: null,
      style: {
        fill: '#C5D4EB',
        opacity: 0.3,
        lineWidth: 1,
        stroke: '#82A6DD'
      },
      draggable: false,
      dragOffX: 0,
      dragOffY: 0,
      inPlot: true,
      xField: null,
      yField: null
    });
  }

  constructor(cfg, view) {
    super(cfg, view);
    const me = this;
    me.filter = !me.draggable;
    me.type = me.type.toUpperCase();

    if (BRUSH_TYPES.indexOf(me.type) === -1) {
      me.type = DEFAULT_TYPE;
    }
  }
}

module.exports = Brush;
