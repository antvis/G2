/**
 * @fileOverview venn shapes
 * @author leungwensen@gmail.com
 */
const Util = require('../../util');
const Shape = require('./shape');
const Global = require('../../global');
// const PathUtil = Util.PathUtil;

function getAttrs(cfg) {
  const defaultCfg = Global.shape.venn;
  const shapeCfg = Util.mix({}, defaultCfg, {
    stroke: cfg.color,
    fill: cfg.color,
    fillOpacity: cfg.opacity
  }, cfg.style);
  return shapeCfg;
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
  path.push([ 'L', first.x, first.y ]);
  path.push([ 'z' ]);
  return path;
}

function getHollowAttrs(cfg) {
  const defaultCfg = Global.shape.hollowVenn;
  const shapeCfg = Util.mix({}, defaultCfg, {
    stroke: cfg.color,
    strokeOpacity: cfg.opacity
  }, cfg.style);
  return shapeCfg;
}

function normalizeSize(arr) {
  const max = Math.max.apply(null, arr);
  return arr.map(num => num / max);
}

// register venn geom
const Violin = Shape.registerFactory('violin', {
  defaultShapeType: 'violin',
  getDefaultPoints(pointInfo) {
    const radius = pointInfo.size / 2;
    const points = [];

    const sizeArr = normalizeSize(pointInfo._size);

    Util.each(pointInfo.y, (y, index) => {
      const offset = sizeArr[index] * radius;
      const isMin = index === 0;
      const isMax = index === pointInfo.y.length;
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
    // console.log(cfg);
    return Util.mix({
      symbol: 'circle',
      radius: 4
    }, getAttrs(cfg));
  }
});

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
    // console.log(cfg);
    return Util.mix({
      symbol: 'circle',
      radius: 4
    }, getHollowAttrs(cfg));
  }
});


module.exports = Violin;
