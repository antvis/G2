/**
 * @fileOverview interval shapes
 * @author dxq613@gmail.com
 * @author sima.zhang1990@gmail.com
 * @author huangtonger@aliyun.com
 */

const Util = require('../../util');
const Shape = require('./shape');
const PathUtil = require('../util/path');
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
    [ 'M', points[0].x, points[0].y ], [ 'L', points[1].x, points[1].y ], [ 'M', points[2].x, points[2].y ], [ 'L', points[3].x, points[3].y ], [ 'M', points[4].x, points[4].y ], [ 'L', points[5].x, points[5].y ]
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
      [ 'M', points[0].x, points[0].y ], [ 'L', points[1].x, points[1].y ], [ 'L', nextPoints[1].x, nextPoints[1].y ], [ 'L', nextPoints[0].x, nextPoints[0].y ], [ 'Z' ]
    );
  } else if (isFunnel) {
    path.push(
      [ 'M', points[0].x, points[0].y ], [ 'L', points[1].x, points[1].y ], [ 'L', points[2].x, points[2].y ], [ 'L', points[3].x, points[3].y ], [ 'Z' ]
    );
  } else {
    path.push(
      [ 'M', points[0].x, points[0].y ], [ 'L', points[1].x, points[1].y ], [ 'L', points[2].x, points[2].y ], [ 'Z' ]
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
module.exports = Interval;
