/**
 * @fileOverview line shapes
 * @author dxq613@gmail.com
 * @author sima.zhang1990@gmail.com
 * @author huangtonger@aliyun.com
 # @author liuye10@yahoo.com
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
  let flag = points[0];
  let i = 1;

  const path = [[ 'M', flag.x, flag.y ]];

  while (i < points.length) {
    const c = points[i];
    if (c.x !== points[i - 1].x || c.y !== points[i - 1].y) {
      path.push([ 'L', c.x, c.y ]);
      if (c.x === flag.x && c.y === flag.y && i < points.length - 1) {
        flag = points[i + 1];
        path.push([ 'Z' ]);
        path.push([ 'M', flag.x, flag.y ]);
        i++;
      }
    }
    i++;
  }

  if (!Util.isEqual(path[path.length - 1], flag)) {
    path.push([ 'L', flag.x, flag.y ]);
  }

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
