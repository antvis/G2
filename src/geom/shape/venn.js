/**
 * @fileOverview venn shapes
 * @author leungwensen@gmail.com
 */
const Util = require('../../util');
const Shape = require('./shape');
const Global = require('../../global');
const {
  PathUtil
} = require('@antv/g');

function getAttrs(cfg) {
  const defaultCfg = Global.shape.venn;
  const shapeCfg = Util.mix({}, defaultCfg, {
    stroke: cfg.color,
    fill: cfg.color,
    fillOpacity: cfg.opacity
  }, cfg.style);
  return shapeCfg;
}

function getHollowAttrs(cfg) {
  const defaultCfg = Global.shape.hollowVenn;
  const shapeCfg = Util.mix({}, defaultCfg, {
    stroke: cfg.color,
    strokeOpacity: cfg.opacity
  }, cfg.style);
  return shapeCfg;
}

// register venn geom
const Venn = Shape.registerFactory('venn', {
  defaultShapeType: 'venn',
  getDefaultPoints(pointInfo) {
    const points = [];
    Util.each(pointInfo.x, function(subX, index) {
      const subY = pointInfo.y[index];
      points.push({
        x: subX,
        y: subY
      });
    });
    return points;
  },
  getActiveCfg(type, cfg) {
    const lineWidth = cfg.lineWidth || 1;
    if (type === 'hollow') {
      return {
        lineWidth: lineWidth + 1
      };
    }

    const opacity = cfg.fillOpacity || cfg.opacity || 1;
    return {
      // lineWidth,
      fillOpacity: opacity - 0.08
    };
  },
  getSelectedCfg(type, cfg) {
    if (cfg && cfg.style) {
      return cfg.style;
    }
    return this.getActiveCfg(type, cfg);
  }
});

Shape.registerShape('venn', 'venn', {
  draw(cfg, container) {
    const origin = cfg.origin._origin;
    const path = origin.path;
    const attrs = getAttrs(cfg);
    const segments = PathUtil.parsePathString(path);

    const pathShape = container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: segments
      })
    });
    return pathShape;
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'circle',
      radius: 4
    }, getAttrs(cfg));
  }
});

Shape.registerShape('venn', 'hollow', {
  draw(cfg, container) {
    const origin = cfg.origin._origin;
    const path = origin.path;
    const attrs = getHollowAttrs(cfg);
    const segments = PathUtil.parsePathString(path);

    const pathShape = container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: segments
      })
    });
    return pathShape;
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'circle',
      radius: 4
    }, getAttrs(cfg));
  }
});

module.exports = Venn;
