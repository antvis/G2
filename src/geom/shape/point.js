/**
 * @fileOverview point shapes
 * @author dxq613@gmail.com
 * @author sima.zhang1990@gmail.com
 * @author huangtonger@aliyun.com
 */

const Util = require('../../util');
const ShapeUtil = require('../util/shape');
const Global = require('../../global');
const Shape = require('./shape');
// const svgpath = require('svgpath');
const { Marker } = require('../../renderer');

const PathUtil = Util.PathUtil;

const SHAPES = [ 'circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangle-down' ];
const HOLLOW_SHAPES = [ 'cross', 'tick', 'plus', 'hyphen', 'line', 'pointerLine', 'pointerArrow' ];
const SQRT_3 = Math.sqrt(3);

// 增加marker
Util.mix(Marker.Symbols, {
  hexagon(x, y, r) {
    const diffX = (r / 2) * SQRT_3;
    return [
      [ 'M', x, y - r ],
      [ 'L', x + diffX, y - r / 2 ],
      [ 'L', x + diffX, y + r / 2 ],
      [ 'L', x, y + r ],
      [ 'L', x - diffX, y + r / 2 ],
      [ 'L', x - diffX, y - r / 2 ],
      [ 'Z' ]
    ];
  },
  bowtie(x, y, r) {
    const diffY = r - 1.5;
    return [
      [ 'M', x - r, y - diffY ],
      [ 'L', x + r, y + diffY ],
      [ 'L', x + r, y - diffY ],
      [ 'L', x - r, y + diffY ],
      [ 'Z' ]
    ];
  },
  cross(x, y, r) {
    return [
      [ 'M', x - r, y - r ],
      [ 'L', x + r, y + r ],
      [ 'M', x + r, y - r ],
      [ 'L', x - r, y + r ]
    ];
  },
  tick(x, y, r) {
    return [
      [ 'M', x - r / 2, y - r ],
      [ 'L', x + r / 2, y - r ],
      [ 'M', x, y - r ],
      [ 'L', x, y + r ],
      [ 'M', x - r / 2, y + r ],
      [ 'L', x + r / 2, y + r ]
    ];
  },
  plus(x, y, r) {
    return [
      [ 'M', x - r, y ],
      [ 'L', x + r, y ],
      [ 'M', x, y - r ],
      [ 'L', x, y + r ]
    ];
  },
  hyphen(x, y, r) {
    return [
      [ 'M', x - r, y ],
      [ 'L', x + r, y ]
    ];
  },
  line(x, y, r) {
    return [
      [ 'M', x, y - r ],
      [ 'L', x, y + r ]
    ];
  }
});

function getFillAttrs(cfg) {
  const defaultAttrs = Global.shape.point;
  const pointAttrs = Util.mix({}, defaultAttrs, cfg.style);
  ShapeUtil.addFillAttrs(pointAttrs, cfg);
  if (Util.isNumber(cfg.size)) {
    pointAttrs.radius = cfg.size;
  }
  return pointAttrs;
}

function getLineAttrs(cfg) {
  const defaultAttrs = Global.shape.hollowPoint;
  const pointAttrs = Util.mix({}, defaultAttrs, cfg.style);
  ShapeUtil.addStrokeAttrs(pointAttrs, cfg);
  if (Util.isNumber(cfg.size)) {
    pointAttrs.radius = cfg.size;
  }
  return pointAttrs;
}

const Point = Shape.registerFactory('point', {
  defaultShapeType: 'hollowCircle',
  getActiveCfg(type, cfg) { // 点放大 + 颜色加亮
    const radius = cfg.radius;
    let color;
    if (type && (type.indexOf('hollow') === 0 || Util.indexOf(HOLLOW_SHAPES, type) !== -1) || !type) {
      color = cfg.stroke || cfg.strokeStyle;
    } else {
      color = cfg.fill || cfg.fillStyle;
    }

    return {
      radius: radius + 1,
      shadowBlur: radius,
      shadowColor: color,
      stroke: color,
      strokeOpacity: 1,
      lineWidth: 1
    };
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
    attrs.radius = 4.5;
    return attrs;
  }
});

// 添加shapes
Util.each(SHAPES, function(shape) {
  Shape.registerShape('point', shape, {
    draw(cfg, container) {
      // cfg.points = this.parsePoints(cfg.points);
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
      attrs.radius = 4.5;
      return attrs;
    }
  });
  // 添加该 shape 对应的 hollowShape
  Shape.registerShape('point', 'hollow' + Util.upperFirst(shape), {
    draw(cfg, container) {
      // cfg.points = this.parsePoints(cfg.points);
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
      attrs.radius = 4.5;
      return attrs;
    }
  });
});

// 添加 hollowShapes
Util.each(HOLLOW_SHAPES, function(shape) {
  Shape.registerShape('point', shape, {
    draw(cfg, container) {
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
      attrs.radius = 4.5;
      return attrs;
    }
  });
});

// image
Shape.registerShape('point', 'image', {
  draw(cfg, container) {
    cfg.points = this.parsePoints(cfg.points);
    return container.addShape('image', {
      attrs: {
        x: cfg.points[0].x - (cfg.size / 2),
        y: cfg.points[0].y - cfg.size,
        width: cfg.size,
        height: cfg.size,
        img: cfg.shape[1]
      }
    });
  }
});

// path
const pathMetaCache = {};
Shape.registerShape('point', 'path', {
  draw(cfg, container) {
    const attrs = Util.mix({}, getLineAttrs(cfg), getFillAttrs(cfg));
    const path = cfg.shape[1];
    const size = cfg.size || 10;
    let pathMeta;
    if (pathMetaCache[path]) {
      pathMeta = pathMetaCache[path];
    } else {
      const segments = PathUtil.parsePathString(path);
      const nums = Util.flatten(segments).filter(num => Util.isNumber(num));
      pathMetaCache[path] = pathMeta = {
        range: Math.max.apply(null, nums) - Math.min.apply(null, nums),
        segments
      };
    }
    const scale = size / pathMeta.range;
    const transform = [];

    if (attrs.rotate) {
      transform.push([ 'r', attrs.rotate / 180 * Math.PI ]);
      delete attrs.rotate;
    }
    const shape = container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: pathMeta.segments
      })
    });
    transform.push([ 's', scale, scale ], [ 't', cfg.x, cfg.y ]);
    shape.transform(transform);
    return shape;
  }
});

module.exports = Point;
