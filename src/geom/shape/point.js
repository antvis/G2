/**
 * @fileOverview point shapes
 * @author dxq613@gmail.com
 * @author huangtonger@aliyun.com
 */

const Util = require('../../util');
const ShapeUtil = require('../util/shape');
const Marker = require('@ali/g').Marker;
const Global = require('../../global');
const Shape = require('./shape');
const SHAPES = [ 'circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangle-down' ];
const HOLLOW_SHAPES = [ 'cross', 'tick', 'plus', 'hyphen', 'line', 'pointerLine', 'pointerArrow' ];
const SQRT_3 = Math.sqrt(3);

// 增加marker
Util.mix(Marker.Symbols, {
  hexagon(x, y, r, ctx) {
    const diffX = r / 2 * SQRT_3;
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + diffX, y - r / 2);
    ctx.lineTo(x + diffX, y + r / 2);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x - diffX, y + r / 2);
    ctx.lineTo(x - diffX, y - r / 2);
    ctx.closePath();
  },
  bowtie(x, y, r, ctx) {
    ctx.moveTo(x - r, y - r);
    ctx.lineTo(x + r, y + r);
    ctx.lineTo(x + r, y - r);
    ctx.lineTo(x - r, y + r);
    ctx.closePath();
  },
  cross(x, y, r, ctx) {
    ctx.moveTo(x - r, y - r);
    ctx.lineTo(x + r, y + r);
    ctx.moveTo(x + r, y - r);
    ctx.lineTo(x - r, y + r);
  },
  tick(x, y, r, ctx) {
    ctx.moveTo(x - r / 2, y - r);
    ctx.lineTo(x + r / 2, y - r);
    ctx.moveTo(x, y - r);
    ctx.lineTo(x, y + r);
    ctx.moveTo(x - r / 2, y + r);
    ctx.lineTo(x + r / 2, y + r);
  },
  plus(x, y, r, ctx) {
    ctx.moveTo(x - r, y);
    ctx.lineTo(x + r, y);
    ctx.moveTo(x, y - r);
    ctx.lineTo(x, y + r);
  },
  hyphen(x, y, r, ctx) {
    ctx.moveTo(x - r, y);
    ctx.lineTo(x + r, y);
  },
  line(x, y, r, ctx) {
    ctx.moveTo(x, y - r);
    ctx.lineTo(x, y + r);
  }
});

function getFillAttrs(cfg) {
  const defaultAttrs = Global.shape.point;
  const pointAttrs = Util.mix({}, defaultAttrs, {
    fill: cfg.color,
    fillOpacity: cfg.opacity,
    radius: cfg.size
  }, cfg.style);
  return pointAttrs;
}

function getLineAttrs(cfg) {
  const defaultAttrs = Global.shape.hollowPoint;
  const pointAttrs = Util.mix({}, defaultAttrs, {
    stroke: cfg.color,
    strokeOpacity: cfg.opacity,
    radius: cfg.size
  }, cfg.style);
  return pointAttrs;
}

// 鼠标悬浮触发active状态
function _getActiveCfg(type) {
  if (type && (type.indexOf('hollow') === 0 || Util.indexOf(HOLLOW_SHAPES, type) !== -1)) {
    return Global.activeShape.hollowPoint;
  }
  return Global.activeShape.point;
}

const Point = Shape.registerFactory('point', {
  defaultShapeType: 'hollowCircle',
  getActiveCfg(type, cfg) {
    const activeCfg = _getActiveCfg(type);
    if (cfg && cfg.size) {
      delete activeCfg.radius;
    }
    return activeCfg;
  },
  getDefaultPoints(pointInfo) {
    return ShapeUtil.splitPoints(pointInfo);
  }
});

function getRectPath(cfg) {
  const x = cfg.points[0].x;
  const y = cfg.points[0].y;
  const w = cfg.size[0];
  const h = cfg.size[1];
  const path = [[ 'M', x - 0.5 * w, y - 0.5 * h ],
      [ 'L', x + 0.5 * w, y - 0.5 * h ],
      [ 'L', x + 0.5 * w, y + 0.5 * h ],
      [ 'L', x - 0.5 * w, y + 0.5 * h ],
      [ 'z' ]];
  return path;
}

// 用于桑基图的节点
Shape.registerShape('point', 'rect', {
  draw(cfg, container) {
    const rectAttrs = getFillAttrs(cfg);
    let path = getRectPath(cfg);
    path = this.parsePath(path);
    const gShape = container.addShape('path', {
      attrs: Util.mix(rectAttrs, {
        path
      })
    });
    return gShape;
  },
  getMarkerCfg(cfg) {
    const attrs = getFillAttrs(cfg);
    attrs.symbol = 'rect';
    return attrs;
  }
});

// 添加shapes
Util.each(SHAPES, function(shape) {
  Shape.registerShape('point', shape, {
    draw(cfg, container) {
      cfg.points = this.parsePoints(cfg.points);
      const attrs = getFillAttrs(cfg);
      return container.addShape('Marker', {
        attrs: Util.mix(attrs, {
          symbol: shape,
          x: cfg.x,
          y: cfg.y
        })
      });
    },
    getMarkerCfg(cfg) {
      const attrs = getFillAttrs(cfg);
      attrs.symbol = shape;
      return attrs;
    }
  });
  // 添加该 shape 对应的 hollowShape
  Shape.registerShape('point', 'hollow' + Util.upperFirst(shape), {
    draw(cfg, container) {
      cfg.points = this.parsePoints(cfg.points);
      const attrs = getLineAttrs(cfg);
      return container.addShape('Marker', {
        attrs: Util.mix(attrs, {
          symbol: shape,
          x: cfg.x,
          y: cfg.y
        })
      });
    },
    getMarkerCfg(cfg) {
      const attrs = getLineAttrs(cfg);
      attrs.symbol = shape;
      return attrs;
    }
  });
});

// 添加 hollowShapes
Util.each(HOLLOW_SHAPES, function(shape) {
  Shape.registerShape('point', shape, {
    draw(cfg, container) {
      cfg.points = this.parsePoints(cfg.points);
      const attrs = getLineAttrs(cfg);
      return container.addShape('Marker', {
        attrs: Util.mix(attrs, {
          symbol: shape,
          x: cfg.x,
          y: cfg.y
        })
      });
    },
    getMarkerCfg(cfg) {
      const attrs = getLineAttrs(cfg);
      attrs.symbol = shape;
      return attrs;
    }
  });
});

module.exports = Point;
