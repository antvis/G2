/**
 * @fileOverview area shape
 * @author dxq613@gmail.com
 */

const Util = require('../../util');
const Shape = require('./shape');
const PathUtil = require('./util/path-util');
const Global = require('../../global');

function getLineAttrs(cfg) {
  const defaultAttrs = Global.shape.hollowArea;
  const lineAttrs = Util.mix({}, defaultAttrs, {
    stroke: cfg.color,
    lineWidth: cfg.size,
    strokeOpacity: cfg.opacity
  }, cfg.style);
  return lineAttrs;
}

function getFillAttrs(cfg) {
  const defaultAttrs = Global.shape.area;
  const areaAttrs = Util.mix({}, defaultAttrs, {
    fill: cfg.color,
    stroke: cfg.color,
    lineWidth: cfg.size,
    fillOpacity: cfg.opacity
  }, cfg.style);
  return areaAttrs;
}

function getPath(cfg, smooth) {
  let path = [];
  const points = [];
  const topLinePoints = []; // area 区域上部分
  let bottomLinePoints = []; // area 区域下部分
  const isInCircle = cfg.isInCircle;
  Util.each(cfg.points, function(point) {
    topLinePoints.push(point[0]);
    bottomLinePoints.push(point[1]);
  });
  bottomLinePoints = bottomLinePoints.reverse();
  points.push(topLinePoints, bottomLinePoints);
  Util.each(points, function(point, index) {
    let subPath = [];
    if (smooth) {
      subPath = PathUtil.getSplinePath(point, false);
    } else {
      subPath = PathUtil.getLinePath(point, false);
    }
    if (isInCircle) {
      const p1 = point[0];
      subPath.push([ 'L', p1.x, p1.y ]);
    } else if (index > 0) {
      subPath[0][0] = 'L';
    }
    path = path.concat(subPath);
  });
  path.push([ 'Z' ]);
  return path;
}

function _markerFn(x, y, r) {
  return [
    [ 'M', x - r, y + r ],
    [ 'L', x - r, y - r ],
    [ 'L', x, y ],
    [ 'L', x + r, y - r ],
    [ 'L', x + r, y + r ],
    [ 'z' ]
  ];
}

function _smoothMarkerFn(x, y, r) {
  return [
    [ 'M', x - r, y + r ],
    [ 'L', x - r, y ],
    [ 'R', x - r / 2, y - r / 2, x, y, x + r / 2, y + r / 2, x + r, y ],
    [ 'L', x + r, y + r ],
    [ 'Z' ]
  ];
}

// get marker cfg
function _getMarkerCfg(cfg, smooth, hollow) {
  const areaCfg = hollow ? getLineAttrs(cfg) : getFillAttrs(cfg);

  return Util.mix({
    symbol: smooth ? _smoothMarkerFn : _markerFn
  }, areaCfg);
}

// 鼠标悬浮触发active状态
function getActiveCfg(type) {
  if (!type || type.indexOf('line') === -1) {
    return Global.activeShape.area;
  }
  return Global.activeShape.hollowArea;
}

// 当只有一个数据时绘制点
function drawPointShape(shapeObj, cfg, container) {
  const coord = shapeObj._coord;
  const point = coord.convertPoint(cfg.points[0][1]);
  return container.addShape('circle', {
    attrs: Util.mix({
      x: point.x,
      y: point.y,
      r: 2,
      fill: cfg.color
    }, cfg.style)
  });
}

const Area = Shape.registerFactory('area', {
  defaultShapeType: 'area',
  /**
   * @override
   * @protected
   * 计算点 如果存在多个点，分割成单个的点, 不考虑多个x对应一个y的情况
   * 单点则补上y0点
   */
  getDefaultPoints(pointInfo) {
    const points = [];
    const x = pointInfo.x;
    let y = pointInfo.y;
    const y0 = pointInfo.y0;
    y = Util.isArray(y) ? y : [ y0, y ];

    Util.each(y, function(yItem) {
      points.push({
        x,
        y: yItem
      });
    });
    return points;
  },
  // 获取激活的图形属性
  getActiveCfg(type) {
    return getActiveCfg(type);
  },
  drawShape(type, cfg, container) {
    const shape = this.getShape(type);
    let gShape;
    if (cfg.points.length === 1 && Global.showSinglePoint) {
      gShape = drawPointShape(this, cfg, container);
    } else {
      gShape = shape.draw(cfg, container);
    }
    if (gShape) {
      gShape.set('origin', cfg.origin);
      gShape.set('geom', Util.lowerFirst(this.className));
    }
    return gShape;
  },
  getSelectedCfg(type, cfg) {
    if (cfg && cfg.style) {
      return cfg.style;
    }
    return this.getActiveCfg(type);
  }
});

// 默认：填充区域图
Shape.registShape('area', 'area', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let path = getPath(cfg, false);
    path = this.parsePath(path, false);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    return _getMarkerCfg(cfg, false, false);
  }
});

// 填充平滑区域图
Shape.registShape('area', 'smooth', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let path = getPath(cfg, true);
    path = this.parsePath(path, false);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    return _getMarkerCfg(cfg, true, false);
  }
});

// 封闭的折线
Shape.registShape('area', 'line', {
  draw(cfg, container) {
    const attrs = getLineAttrs(cfg);
    let path = getPath(cfg, false);
    path = this.parsePath(path, false);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    return _getMarkerCfg(cfg, false, true);
  }
});


// 封闭的平滑线
Shape.registShape('area', 'smoothLine', {
  draw(cfg, container) {
    const attrs = getLineAttrs(cfg);
    let path = getPath(cfg, true);
    path = this.parsePath(path, false);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    return _getMarkerCfg(cfg, true, true);
  }
});

Area.spline = Area.smooth;

module.exports = Area;
