/**
 * Point shape factory
 */
import { Marker, Group } from '@antv/g';
import * as _ from '@antv/util';
import { registerShape, registerShapeFactory, ShapeFactoryCFG } from './base';
import { splitPoints, setStrokeStyle, setFillStyle } from '../util/shape';
import {
  ShapeDrawCFG,
  ShapeMarkerCfg,
  ShapePointInfo,
} from '../../interface';
import { PointSymbols } from '../util/symbol';

_.each(PointSymbols, (func, symbol) => {
  // point 中需要用到这么些 Marker.symbol
  // 使用 Marker 提供的静态方法注册进去
  Marker.symbolsFactory.register(symbol, func);
});

const SHAPES = [ 'circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangleDown' ];
const HOLLOW_SHAPES = [ 'cross', 'tick', 'plus', 'hyphen', 'line' ];

function getFillAttrs(cfg) {
  const pointAttrs = cfg.style;
  setFillStyle(pointAttrs, cfg);
  if (_.isNumber(cfg.size)) {
    pointAttrs.radius = cfg.size;
  }
  return pointAttrs;
}

function getLineAttrs(cfg) {
  const pointAttrs = cfg.style;
  setStrokeStyle(pointAttrs, cfg);
  if (_.isNumber(cfg.size)) {
    pointAttrs.radius = cfg.size;
  }
  return pointAttrs;
}

function getRectPath(cfg) {
  const x = cfg.points[0].x;
  const y = cfg.points[0].y;
  const w = cfg.size[0];
  const h = cfg.size[1];
  const path = [
    [ 'M', x - 0.5 * w, y - 0.5 * h ],
    [ 'L', x + 0.5 * w, y - 0.5 * h ],
    [ 'L', x + 0.5 * w, y + 0.5 * h ],
    [ 'L', x - 0.5 * w, y + 0.5 * h ],
    [ 'z' ],
  ];
  return path;
}

const PointShapeFactory: ShapeFactoryCFG = registerShapeFactory('point', {
  defaultShapeType: 'hollowCircle',
  getDefaultPoints(pointInfo: ShapePointInfo) {
    return splitPoints(pointInfo);
  },
});

// 用于桑基图的节点
registerShape('point', 'rect', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const rectAttrs = getFillAttrs(cfg);
    let path = getRectPath(cfg);
    path = this.parsePath(path);
    const gShape = container.addShape('path', {
      attrs: _.mix(rectAttrs, {
        path,
      }),
    });
    return gShape;
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const markerStyle = {
      symbol: 'rect',
      radius: 4.5,
    };
    setFillStyle(markerStyle, markerCfg);
    return markerStyle;
  },
});

// 所有的 SHAPES 都注册一下
_.each(SHAPES, (shape: string) => {
  registerShape('point', shape, {
    draw(cfg: ShapeDrawCFG, container: Group) {
      const attrs = getFillAttrs(cfg);
      return container.addShape('Marker', {
        attrs: {
          ...attrs,
          symbol: shape,
          x: cfg.x,
          y: cfg.y,
        },
      });
    },
    getMarkerStyle(markerCfg: ShapeMarkerCfg) {
      const markerStyle = {
        symbol: shape,
        radius: 4.5,
      };
      setFillStyle(markerStyle, markerCfg);
      return markerStyle;
    },
  });
  // 添加该 shape 对应的 hollow-shape
  registerShape('point', `hollow${_.upperFirst(shape)}`, {
    draw(cfg: ShapeDrawCFG, container: Group) {
      const attrs = getLineAttrs(cfg);
      return container.addShape('Marker', {
        attrs: {
          ...attrs,
          symbol: shape,
          x: cfg.x,
          y: cfg.y,
        },
      });
    },
    getMarkerStyle(markerCfg: ShapeMarkerCfg) {
      const markerStyle = {
        symbol: shape,
        radius: 4.5,
      };
      setStrokeStyle(markerStyle, markerCfg);
      return markerStyle;
    },
  });
});

// 添加 hollowShapes
_.each(HOLLOW_SHAPES, (shape: string) => {
  registerShape('point', shape, {
    draw(cfg: ShapeDrawCFG, container: Group) {
      const attrs = getLineAttrs(cfg);
      return container.addShape('Marker', {
        attrs: {
          ...attrs,
          symbol: shape,
          x: cfg.x,
          y: cfg.y,
        },
      });
    },
    getMarkerStyle(markerCfg: ShapeMarkerCfg) {
      const markerStyle = {
        symbol: shape,
        radius: 4.5,
      };
      setStrokeStyle(markerStyle, markerCfg);
      return markerStyle;
    },
  });
});

// image
registerShape('point', 'image', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    cfg.points = this.parsePoints(cfg.points);
    return container.addShape('image', {
      attrs: {
        x: cfg.points[0].x - (cfg.size / 2),
        y: cfg.points[0].y - cfg.size,
        width: cfg.size,
        height: cfg.size,
        img: cfg.shape[1],
      },
    });
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const markerStyle = {
      symbol: 'circle',
      radius: 4.5,
    };
    setFillStyle(markerStyle, markerCfg);
    return markerStyle;
  },
});

// path 解析，缓存一下
const pathMetaParser = _.memoize((path: string) => {
  const segments = _.parsePathString(path);
  const nums = _.flatten(segments).filter((num) => _.isNumber(num));
  return {
    range: Math.max.apply(null, nums) - Math.min.apply(null, nums),
    segments,
  };
});

// path
registerShape('point', 'path', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _.mix({}, getLineAttrs(cfg), getFillAttrs(cfg));
    const path = cfg.shape[1];
    const size = cfg.size || 10;
    const pathMeta = pathMetaParser(path);
    const scale = size / pathMeta.range;
    const transform = [];

    if (attrs.rotate) {
      transform.push([ 'r', attrs.rotate / 180 * Math.PI ]);
      delete attrs.rotate;
    }
    const shape = container.addShape('path', {
      attrs: {
        ...attrs,
        path: pathMeta.segments,
      },
    });
    transform.push([ 's', scale, scale ], [ 't', cfg.x, cfg.y ]);
    shape.transform(transform);
    return shape;
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const markerStyle = {
      symbol: 'circle',
      radius: 4.5,
    };
    setFillStyle(markerStyle, markerCfg);
    return markerStyle;
  },
});

export default PointShapeFactory;
