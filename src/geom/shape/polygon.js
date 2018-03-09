/**
 * @fileOverview line shapes
 * @author dxq613@gmail.com
 * @author sima.zhang1990@gmail.com
 * @author huangtonger@aliyun.com
 */

const Util = require('../../util');
const Shape = require('./shape');
const Global = require('../../global');

function getAttrs(cfg) {
  const defaultCfg = Global.shape.polygon;
  const shapeCfg = Util.mix({}, defaultCfg, {
    stroke: cfg.color,
    fill: cfg.color,
    fillOpacity: cfg.opacity
  }, cfg.style);
  return shapeCfg;
}

function getHollowAttrs(cfg) {
  const defaultCfg = Global.shape.hollowPolygon;
  const shapeCfg = Util.mix({}, defaultCfg, {
    stroke: cfg.color,
    strokeOpacity: cfg.opacity
  }, cfg.style);
  return shapeCfg;
}
function getPath(points) {
  const path = [];
  let flag = [ points[0].x, points[0].y ];
  let flagIndex = 0;
  let lastStartPoint = points[0];
  Util.each(points, function(obj, index) {
    const subPath = index === 0 ? [ 'M', obj.x, obj.y ] : [ 'L', obj.x, obj.y ];
    path.push(subPath);
    if (flagIndex !== index && index < (points.length - 1) && Util.isEqualWith(flag, [ obj.x, obj.y ])) {
      const nextPoint = points[index + 1];
      path.push([ 'Z' ]);
      path.push([ 'M', nextPoint.x, nextPoint.y ]);
      lastStartPoint = nextPoint;
      flagIndex = index + 1;
      flag = [ nextPoint.x, nextPoint.y ];
    }
  });
  path.push([ 'L', lastStartPoint.x, lastStartPoint.y ]);
  path.push([ 'Z' ]);
  return path;
}

// regist line geom
const Polygon = Shape.registerFactory('polygon', {
  defaultShapeType: 'polygon',
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

Shape.registerShape('polygon', 'polygon', {
  draw(cfg, container) {
    if (!Util.isEmpty(cfg.points)) {
      const attrs = getAttrs(cfg);
      let path = getPath(cfg.points);
      path = this.parsePath(path);
      return container.addShape('path', {
        attrs: Util.mix(attrs, {
          path
        })
      });
    }
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'square',
      radius: 4
    }, getAttrs(cfg));
  }
});

Shape.registerShape('polygon', 'hollow', {
  draw(cfg, container) {
    if (!Util.isEmpty(cfg.points)) {
      const attrs = getHollowAttrs(cfg);
      let path = getPath(cfg.points);
      path = this.parsePath(path);

      return container.addShape('path', {
        attrs: Util.mix(attrs, {
          path
        })
      });
    }
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'square',
      radius: 4
    }, getAttrs(cfg));
  }
});

module.exports = Polygon;
