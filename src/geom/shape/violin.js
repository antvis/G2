/**
 * @fileOverview venn shapes
 * @author leungwensen@gmail.com
 */
const Util = require('../../util');
const Shape = require('./shape');
const ShapeUtil = require('../util/shape');
const Global = require('../../global');
const PathUtil = require('../util/path');

function getAttrs(cfg) {
  const defaultCfg = Global.shape.venn;
  const pathAttrs = Util.mix({}, defaultCfg, cfg.style);
  ShapeUtil.addFillAttrs(pathAttrs, cfg);
  if (cfg.color) {
    pathAttrs.stroke = pathAttrs.stroke || cfg.color;
  }
  return pathAttrs;
}
function getHollowAttrs(cfg) {
  const defaultCfg = Global.shape.hollowVenn;
  const pathAttrs = Util.mix({}, defaultCfg, cfg.style);
  ShapeUtil.addStrokeAttrs(pathAttrs, cfg);
  return pathAttrs;
}

function getViolinPath(points) {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point) {
      const action = i === 0 ? 'M' : 'L';
      path.push([ action, point.x, point.y ]);
    }
  }
  const first = points[0];
  if (first) {
    path.push([ 'L', first.x, first.y ]);
    path.push([ 'z' ]);
  }
  return path;
}
function getSmoothViolinPath(points) {
  const half = points.length / 2;
  const leftPoints = [];
  const rightPoints = [];
  for (let i = 0; i < points.length; i++) {
    if (i < half) {
      leftPoints.push(points[i]);
    } else {
      rightPoints.push(points[i]);
    }
  }
  const leftPath = PathUtil.getSplinePath(leftPoints, false);
  const rightPath = PathUtil.getSplinePath(rightPoints, false);
  leftPath.push([ 'L', rightPoints[0].x, rightPoints[0].y ]);
  rightPath.shift();
  const path = leftPath.concat(rightPath);
  path.push([ 'L', leftPoints[0].x, leftPoints[0].y ]);
  path.push([ 'z' ]);
  return path;
}

function normalizeSize(arr) {
  const max = Math.max.apply(null, arr);
  return arr.map(num => num / max);
}

// register violin geom shape
const Violin = Shape.registerFactory('violin', {
  defaultShapeType: 'violin',
  getDefaultPoints(pointInfo) {
    const radius = pointInfo.size / 2;
    const points = [];
    const sizeArr = normalizeSize(pointInfo._size);
    Util.each(pointInfo.y, (y, index) => {
      const offset = sizeArr[index] * radius;
      const isMin = index === 0;
      const isMax = index === pointInfo.y.length - 1;
      points.push({
        isMin,
        isMax,
        x: pointInfo.x - offset,
        y
      });
      points.unshift({
        isMin,
        isMax,
        x: pointInfo.x + offset,
        y
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

// normal violin, filled path
Shape.registerShape('violin', 'violin', {
  draw(cfg, container) {
    const attrs = getAttrs(cfg);
    let path = getViolinPath(cfg.points);
    path = this.parsePath(path);
    const pathShape = container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
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
// smooth spline violin, filled path
Shape.registerShape('violin', 'smooth', {
  draw(cfg, container) {
    const attrs = getAttrs(cfg);
    let path = getSmoothViolinPath(cfg.points);
    path = this.parsePath(path);
    const pathShape = container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
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
// hollow violin, stroked path
Shape.registerShape('violin', 'hollow', {
  draw(cfg, container) {
    const attrs = getHollowAttrs(cfg);
    let path = getViolinPath(cfg.points);
    path = this.parsePath(path);
    const pathShape = container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
    return pathShape;
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'circle',
      radius: 4
    }, getHollowAttrs(cfg));
  }
});
// hollow smooth spline violin, stroked path
Shape.registerShape('violin', 'smoothHollow', {
  draw(cfg, container) {
    const attrs = getHollowAttrs(cfg);
    let path = getSmoothViolinPath(cfg.points);
    path = this.parsePath(path);
    const pathShape = container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
    return pathShape;
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'circle',
      radius: 4
    }, getHollowAttrs(cfg));
  }
});


module.exports = Violin;
