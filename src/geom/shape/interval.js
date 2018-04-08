/**
 * @fileOverview interval shapes
 * @author dxq613@gmail.com
 * @author sima.zhang1990@gmail.com
 * @author huangtonger@aliyun.com
 */

const Util = require('../../util');
const Shape = require('./shape');
const PathUtil = require('../util/path');
const GPathUtil = require('@antv/g').PathUtil;
const Global = require('../../global');

// 获取柱状图的几个点
function getRectPoints(cfg, isPyramid) {
  const x = cfg.x;
  const y = cfg.y;
  const y0 = cfg.y0; // 0 点的位置
  const width = cfg.size;
  // 有3种情况，
  // 1. y，x都不是数组
  // 2. y是数组，x不是
  // 3. x是数组，y不是
  let ymin = y0;
  let ymax = y;
  if (Util.isArray(y)) {
    ymax = y[1];
    ymin = y[0];
  }

  let xmin;
  let xmax;
  if (Util.isArray(x)) {
    xmin = x[0];
    xmax = x[1];
  } else {
    xmin = x - width / 2;
    xmax = x + width / 2;
  }

  const points = [];
  points.push({
    x: xmin,
    y: ymin
  }, {
    x: xmin,
    y: ymax
  });

  if (isPyramid) {
    points.push({
      x: xmax,
      y: (ymax + ymin) / 2
    });
  } else {
    points.push({
      x: xmax,
      y: ymax
    }, {
      x: xmax,
      y: ymin
    });
  }

  return points;
}

function getRectPath(points) {
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

function getLinePoints(cfg) {
  const x = cfg.x;
  const y = cfg.y;
  const y0 = cfg.y0; // 0 点的位置
  const points = [];

  if (Util.isArray(y)) {
    Util.each(y, function(yItem, idx) {
      points.push({
        x: Util.isArray(x) ? x[idx] : x,
        y: yItem
      });
    });
  } else {
    points.push({
      x,
      y
    }, {
      x,
      y: y0
    });
  }

  return points;
}

function getTickPoints(cfg) {
  const x = cfg.x;
  const y = Util.isArray(cfg.y) ? cfg.y[1] : cfg.y;
  const y0 = Util.isArray(cfg.y) ? cfg.y[0] : cfg.y0;

  const barWidth = cfg.size;
  const points = [];

  points.push({
    x: x - barWidth / 2,
    y
  }, {
    x: x + barWidth / 2,
    y
  }, {
    x,
    y
  }, {
    x,
    y: y0
  }, {
    x: x - barWidth / 2,
    y: y0
  }, {
    x: x + barWidth / 2,
    y: y0
  });

  return points;
}

function getTickPath(points) {
  const path = [];
  path.push(
    [ 'M', points[0].x, points[0].y ],
    [ 'L', points[1].x, points[1].y ],
    [ 'M', points[2].x, points[2].y ],
    [ 'L', points[3].x, points[3].y ],
    [ 'M', points[4].x, points[4].y ],
    [ 'L', points[5].x, points[5].y ]
  );
  return path;
}

function getFillAttrs(cfg) {
  const defaultAttrs = Global.shape.interval;
  const attrs = Util.mix({}, defaultAttrs, {
    fill: cfg.color,
    stroke: cfg.color,
    fillOpacity: cfg.opacity
  }, cfg.style);
  return attrs;
}

function getLineAttrs(cfg) {
  const defaultAttrs = Global.shape.hollowInterval;
  const attrs = Util.mix({}, defaultAttrs, {
    stroke: cfg.color,
    strokeOpacity: cfg.opacity
  }, cfg.style);
  return attrs;
}

function getFunnelPath(cfg, isFunnel) {
  const path = [];
  const points = cfg.points;
  const nextPoints = cfg.nextPoints;
  if (!Util.isNil(nextPoints)) {
    path.push(
      [ 'M', points[0].x, points[0].y ],
      [ 'L', points[1].x, points[1].y ],
      [ 'L', nextPoints[1].x, nextPoints[1].y ],
      [ 'L', nextPoints[0].x, nextPoints[0].y ],
      [ 'Z' ]
    );
  } else if (isFunnel) {
    path.push(
      [ 'M', points[0].x, points[0].y ],
      [ 'L', points[1].x, points[1].y ],
      [ 'L', points[2].x, points[2].y ],
      [ 'L', points[3].x, points[3].y ],
      [ 'Z' ]
    );
  } else {
    path.push(
      [ 'M', points[0].x, points[0].y ],
      [ 'L', points[1].x, points[1].y ],
      [ 'L', points[2].x, points[2].y ],
      [ 'L', points[2].x, points[2].y ],
      [ 'Z' ]
    );
  }

  return path;
}

function getThetaCfg(point, coord) {
  const r = coord.getRadius();
  const inner = coord.innerRadius;
  let startAngle;
  let endAngle;
  const ir = r * inner;
  let startPoint;
  let endPoint;

  if (!Util.isArray(point.x) && Util.isArray(point.y)) {
    point.x = [ point.x, point.x ]; // 如果x是一个值，y是数组，将x转成数组
  }
  if (Util.isArray(point.x)) {
    startPoint = {
      x: point.x[0],
      y: point.y[0]
    };
    endPoint = {
      x: point.x[1],
      y: point.y[1]
    };
    startAngle = PathUtil.getPointAngle(coord, startPoint);
    endAngle = PathUtil.getPointAngle(coord, endPoint);
    if (endAngle <= startAngle) { // 考虑占比百分百的情形
      endAngle = endAngle + Math.PI * 2;
    }
  } else {
    endPoint = point;
    startAngle = coord.startAngle;
    endAngle = PathUtil.getPointAngle(coord, endPoint);
  }
  return {
    r,
    ir,
    startAngle,
    endAngle
  };
}

// 获取选中时的样式，当前仅支持饼图
function getSelectedCfg(type, cfg) {
  const geom = cfg.geom;
  const coord = geom.get('coord');
  const point = cfg.point;
  const r = 7.5;
  let selectedCfg;
  if (coord && coord.type === 'theta') {
    const thetaCfg = getThetaCfg(point, coord);
    const middleAngle = (thetaCfg.endAngle - thetaCfg.startAngle) / 2 + thetaCfg.startAngle;
    const x = r * Math.cos(middleAngle);
    const y = r * Math.sin(middleAngle);
    selectedCfg = {
      transform: [
        [ 't', x, y ]
      ]
    };
  }
  return Util.mix({}, selectedCfg);
}

const Interval = Shape.registerFactory('interval', {
  defaultShapeType: 'rect',
  getActiveCfg(type, cfg) {
    if (!type || Util.inArray([ 'rect', 'funnel', 'pyramid' ], type)) { // 透明度降低 0.15
      const fillOpacity = cfg.fillOpacity || cfg.opacity || 1;
      return {
        fillOpacity: fillOpacity - 0.15
      };
    }
    const lineWidth = cfg.lineWidth || 0;
    return {
      lineWidth: lineWidth + 1
    };
  },
  getDefaultPoints(pointInfo) {
    return getRectPoints(pointInfo);
  },
  getSelectedCfg(type, cfg) {
    return getSelectedCfg(type, cfg);
  }
});

// 默认柱状图
Shape.registerShape('interval', 'rect', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    const rectCfg = getFillAttrs(cfg);
    const isInCircle = cfg.isInCircle;
    return Util.mix({
      symbol: isInCircle ? 'circle' : 'square',
      radius: isInCircle ? 4.5 : 4
    }, rectCfg);
  }
});

// 空心柱状图
Shape.registerShape('interval', 'hollowRect', {
  draw(cfg, container) {
    const attrs = getLineAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    const rectCfg = getLineAttrs(cfg);
    const isInCircle = cfg.isInCircle;
    return Util.mix({
      symbol: isInCircle ? 'circle' : 'square',
      radius: isInCircle ? 4.5 : 4
    }, rectCfg);
  }
});

// 线形柱状图
Shape.registerShape('interval', 'line', {
  getPoints(pointInfo) {
    return getLinePoints(pointInfo);
  },
  draw(cfg, container) {
    const attrs = getLineAttrs(cfg);
    attrs.lineWidth = cfg.size || 1; // size 就是线的宽度
    let path = getRectPath(cfg.points);
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    const lineCfg = getLineAttrs(cfg);
    return Util.mix({
      symbol: 'line',
      radius: 5
    }, lineCfg);
  }
});

// 钉子形的柱状图
Shape.registerShape('interval', 'tick', {
  getPoints(pointInfo) {
    return getTickPoints(pointInfo);
  },
  draw(cfg, container) {
    const attrs = getLineAttrs(cfg);
    let path = getTickPath(cfg.points);
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    const lineCfg = getLineAttrs(cfg);
    return Util.mix({
      symbol: 'tick',
      radius: 5
    }, lineCfg);
  }
});

// 漏斗图
Shape.registerShape('interval', 'funnel', {
  getPoints(pointInfo) {
    pointInfo.size = pointInfo.size * 2; // 漏斗图的 size 是柱状图的两倍
    return getRectPoints(pointInfo);
  },
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let path = getFunnelPath(cfg, true);
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    const funnelCfg = getFillAttrs(cfg);
    return Util.mix({
      symbol: 'square',
      radius: 4
    }, funnelCfg);
  }
});

// 金字塔图
Shape.registerShape('interval', 'pyramid', {
  getPoints(pointInfo) {
    pointInfo.size = pointInfo.size * 2; // 漏斗图的 size 是柱状图的两倍
    return getRectPoints(pointInfo, true);
  },
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let path = getFunnelPath(cfg, false);
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    const funnelCfg = getFillAttrs(cfg);
    return Util.mix({
      symbol: 'square',
      radius: 4
    }, funnelCfg);
  }
});

// 水波图
/**
 * 用贝塞尔曲线模拟正弦波
 * Using Bezier curves to fit sine wave.
 * There is 4 control points for each curve of wave,
 * which is at 1/4 wave length of the sine wave.
 *
 * The control points for a wave from (a) to (d) are a-b-c-d:
 *          c *----* d
 *     b *
 *       |
 * ... a * ..................
 *
 * whose positions are a: (0, 0), b: (0.5, 0.5), c: (1, 1), d: (PI / 2, 1)
 *
 * @param {number} x          x position of the left-most point (a)
 * @param {number} stage      0-3, stating which part of the wave it is
 * @param {number} waveLength wave length of the sine wave
 * @param {number} amplitude  wave amplitude
 * @return {Array} 正弦片段曲线
 */
function getWaterWavePositions(x, stage, waveLength, amplitude) {
  if (stage === 0) {
    return [
      [ x + 1 / 2 * waveLength / Math.PI / 2, amplitude / 2 ],
      [ x + 1 / 2 * waveLength / Math.PI, amplitude ],
      [ x + waveLength / 4, amplitude ]
    ];
  } else if (stage === 1) {
    return [
      [ x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 2),
        amplitude
      ],
      [ x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 1),
        amplitude / 2
      ],
      [ x + waveLength / 4, 0 ]
    ];
  } else if (stage === 2) {
    return [
      [ x + 1 / 2 * waveLength / Math.PI / 2, -amplitude / 2 ],
      [ x + 1 / 2 * waveLength / Math.PI, -amplitude ],
      [ x + waveLength / 4, -amplitude ]
    ];
  }
  return [
    [ x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 2), -amplitude ],
    [ x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 1), -amplitude / 2 ],
    [ x + waveLength / 4, 0 ]
  ];
}
/**
 * 获取水波路径
 * @param  {number} radius          半径
 * @param  {number} waterLevel      水位
 * @param  {number} waveLength      波长
 * @param  {number} phase           相位
 * @param  {number} amplitude       震幅
 * @param  {number} cx              圆心x
 * @param  {number} cy              圆心y
 * @return {Array}  path            路径
 * @reference http://gitlab.alipay-inc.com/datavis/g6/blob/1.2.0/src/graph/utils/path.js#L135
 */
function getWaterWavePath(radius, waterLevel, waveLength, phase, amplitude, cx, cy) {
  const curves = Math.ceil(2 * radius / waveLength * 4) * 2;
  const path = [];

  // map phase to [-Math.PI * 2, 0]
  while (phase < -Math.PI * 2) {
    phase += Math.PI * 2;
  }
  while (phase > 0) {
    phase -= Math.PI * 2;
  }
  phase = phase / Math.PI / 2 * waveLength;

  const left = cx - radius + phase - radius * 2;
  /**
   * top-left corner as start point
   *
   * draws this point
   *  |
   * \|/
   *  ~~~~~~~~
   *  |      |
   *  +------+
   */
  path.push([ 'M', left, waterLevel ]);

  /**
   * top wave
   *
   * ~~~~~~~~ <- draws this sine wave
   * |      |
   * +------+
   */
  let waveRight = 0;
  for (let c = 0; c < curves; ++c) {
    const stage = c % 4;
    const pos = getWaterWavePositions(c * waveLength / 4, stage, waveLength, amplitude);
    path.push([
      'C',
      pos[0][0] + left, -pos[0][1] + waterLevel,
      pos[1][0] + left, -pos[1][1] + waterLevel,
      pos[2][0] + left, -pos[2][1] + waterLevel
    ]);

    if (c === curves - 1) {
      waveRight = pos[2][0];
    }
  }

  /**
   * top-right corner
   *
   *                       ~~~~~~~~
   * 3. draws this line -> |      | <- 1. draws this line
   *                       +------+
   *                          ^
   *                          |
   *                  2. draws this line
   */
  path.push([ 'L', waveRight + left, cy + radius ]);
  path.push([ 'L', left, cy + radius ]);
  path.push([ 'L', left, waterLevel ]);
  return path;
}

/**
 * 添加水波
 * @param {number} x           中心x
 * @param {number} y           中心y
 * @param {number} level       水位等级 0～1
 * @param {number} waveCount   水波数
 * @param {number} colors      色值
 * @param {number} group       图组
 * @param {number} clip        用于剪切的图形
 * @param {number} radius      绘制图形的高度
 */
function addWaterWave(x, y, level, waveCount, colors, group, clip, radius) {
  const bbox = clip.getBBox();
  const width = bbox.maxX - bbox.minX;
  const height = bbox.maxY - bbox.minY;
  const duration = 5000;
  const delayDiff = 300;
  for (let i = 0; i < waveCount; i++) {
    const wave = group.addShape('path', {
      attrs: {
        path: getWaterWavePath(
          radius,
          bbox.minY + height * level,
          width / 4, 0, width / 64, x, y
        ),
        fill: colors[i],
        clip
      }
    });
    wave.animate({
      transform: [
        [ 't', width / 2, 0 ]
      ],
      repeat: true
    }, duration - i * delayDiff);
  }
}

Shape.registerShape('interval', 'liquid-fill-gauge', {
  draw(cfg, container) {
    const self = this;
    const cy = 0.5;
    let sumX = 0;
    let minX = Infinity;
    Util.each(cfg.points, p => {
      if (p.x < minX) {
        minX = p.x;
      }
      sumX += p.x;
    });
    const cx = sumX / cfg.points.length;
    const cp = self.parsePoint({ x: cx, y: cy });
    const minP = self.parsePoint({ x: minX, y: 0.5 });
    const xWidth = cp.x - minP.x;
    const radius = Math.min(xWidth, minP.y);
    const attrs = getFillAttrs(cfg);
    const clipCircle = container.addShape('circle', {
      attrs: {
        x: cp.x,
        y: cp.y,
        r: radius
      }
    });
    addWaterWave(
      cp.x, cp.y,
      cfg.y / (2 * cp.y),
      1,
      [ attrs.fill ],
      container,
      clipCircle,
      radius * 4
    );
    return container.addShape('circle', {
      attrs: Util.mix(getLineAttrs(cfg), {
        x: cp.x,
        y: cp.y,
        r: radius + radius / 8
      })
    });
  }
});

const pathMetaCache = {};
Shape.registerShape('interval', 'liquid-fill-path', {
  draw(cfg, container) {
    const self = this;
    const attrs = Util.mix({}, getFillAttrs(cfg));
    const path = cfg.shape[1];

    const cy = 0.5;
    let sumX = 0;
    let minX = Infinity;
    Util.each(cfg.points, p => {
      if (p.x < minX) {
        minX = p.x;
      }
      sumX += p.x;
    });
    const cx = sumX / cfg.points.length;
    const cp = self.parsePoint({ x: cx, y: cy });
    const minP = self.parsePoint({ x: minX, y: 0.5 });
    const xWidth = cp.x - minP.x;
    const radius = Math.min(xWidth, minP.y);

    let pathMeta;
    if (pathMetaCache[path]) {
      pathMeta = pathMetaCache[path];
    } else {
      const segments = GPathUtil.parsePathString(path);
      pathMetaCache[path] = pathMeta = {
        segments
      };
    }
    const transform = [];
    if (attrs.rotate) {
      transform.push([ 'r', attrs.rotate / 180 * Math.PI ]);
      delete attrs.rotate;
    }
    const shape = container.addShape('path', {
      attrs: Util.mix(attrs, {
        fillOpacity: 0,
        path: pathMeta.segments
      })
    });
    const bbox = Util.cloneDeep(shape.getBBox());
    const rangeX = bbox.maxX - bbox.minX;
    const rangeY = bbox.maxY - bbox.minY;
    const range = Math.max(rangeX, rangeY);
    const scale = radius * 2 / range;
    shape.transform(
      transform.concat([
        [ 's', scale, scale ]
      ])
    );
    const dw = scale * rangeX / 2; // (bbox.maxX - bbox.minX) / 2;
    const dh = scale * rangeY / 2; // (bbox.maxY - bbox.minY) / 2;
    shape.transform([
      [ 't', cp.x - dw, cp.y - dh ]
    ]);
    addWaterWave(
      cp.x, cp.y,
      cfg.y / (2 * cp.y),
      1,
      [ attrs.fill ],
      container,
      shape,
      minP.y * 4
    );

    const keyShape = container.addShape('path', {
      attrs: Util.mix(getLineAttrs(cfg), {
        path: pathMeta.segments
      })
    });
    keyShape.transform(
      transform.concat([
        [ 's', scale, scale ],
        [ 't', cp.x - dw, cp.y - dh ]
      ])
    );
    return keyShape;
  }
});

Shape.registerShape('interval', 'top-line', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    const style = cfg.style || {};
    const linePath = [
      [ 'M', cfg.points[1].x, cfg.points[1].y ],
      [ 'L', cfg.points[2].x, cfg.points[2].y ]
    ];
    const lineAttrs = {
      stroke: style.stroke || 'white',
      lineWidth: style.lineWidth || 1,
      path: this.parsePath(linePath)
    };
    let path = getRectPath(cfg.points);
    path = this.parsePath(path);
    delete attrs.stroke; // 不在柱子上绘制线
    const rectShape = container.addShape('path', {
      attrs: Util.mix(attrs, {
        zIndex: 0,
        path
      })
    });
    container.addShape('path', {
      zIndex: 1,
      attrs: lineAttrs
    });
    return rectShape;
  },
  getMarkerCfg(cfg) {
    const rectCfg = getFillAttrs(cfg);
    const isInCircle = cfg.isInCircle;
    return Util.mix({
      symbol: isInCircle ? 'circle' : 'square',
      radius: isInCircle ? 4.5 : 4
    }, rectCfg);
  }
});

module.exports = Interval;
