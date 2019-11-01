/**
 * @fileOverview area shape
 * @author dxq613@gmail.com
 * @author sima.zhang1990@gmail.com
 */

const Util = require('../../util');
const Shape = require('./shape');
const PathUtil = require('../util/path');
const ShapeUtil = require('../util/shape');
const Global = require('../../global');

function getLineAttrs(cfg) {
  const defaultAttrs = Global.shape.hollowArea;
  const lineAttrs = Util.mix({}, defaultAttrs, cfg.style);
  ShapeUtil.addStrokeAttrs(lineAttrs, cfg);
  if (Util.isNumber(cfg.size)) {
    lineAttrs.lineWidth = cfg.size;
  }
  return lineAttrs;
}

function getFillAttrs(cfg) {
  const defaultAttrs = Global.shape.area;
  const areaAttrs = Util.mix({}, defaultAttrs, cfg.style);
  ShapeUtil.addFillAttrs(areaAttrs, cfg);
  if (cfg.color) {
    areaAttrs.stroke = areaAttrs.stroke || cfg.color;
  }
  if (Util.isNumber(cfg.size)) {
    areaAttrs.lineWidth = cfg.size;
  }
  return areaAttrs;
}

function getPath(cfg, smooth, shape) {
  let path = [];
  const pointsArr = [];
  const topLinePoints = []; // area 区域上部分
  let bottomLinePoints = []; // area 区域下部分
  const isInCircle = cfg.isInCircle;
  Util.each(cfg.points, point => {
    topLinePoints.push(point[1]);
    bottomLinePoints.push(point[0]);
  });
  // if (!isInCircle) {
  bottomLinePoints = bottomLinePoints.reverse();
  // }
  pointsArr.push(topLinePoints, bottomLinePoints);
  Util.each(pointsArr, (points, index) => {
    let subPath = [];
    points = shape.parsePoints(points);
    const p1 = points[0];
    if (isInCircle) {
      points.push({ x: p1.x, y: p1.y });
    }
    if (smooth) {
      subPath = PathUtil.getSplinePath(points, false, cfg.constraint);
    } else {
      subPath = PathUtil.getLinePath(points, false);
    }

    if (index > 0) {
      subPath[0][0] = 'L';
    }
    path = path.concat(subPath);
  });
  path.push([ 'Z' ]);
  return path;
}

// get marker cfg
function _getMarkerCfg(cfg) {
  return {
    symbol(x, y, r) {
      return [
        [ 'M', x - r, y - 4 ],
        [ 'L', x + r, y - 4 ],
        [ 'L', x + r, y + 4 ],
        [ 'L', x - r, y + 4 ],
        [ 'Z' ]
      ];
    },
    radius: 5,
    fill: cfg.color,
    fillOpacity: 0.6
  };
}

// 鼠标悬浮触发active状态
function getActiveCfg(type, cfg) {
  if (type === 'line' || type === 'smoothLine') { // 线加粗
    const lineWidth = cfg.lineWidth || 0;
    return {
      lineWidth: lineWidth + 1
    };
  }
  const opacity = cfg.fillOpacity || cfg.opacity || 1;
  return {
    fillOpacity: opacity - 0.15,
    strokeOpacity: opacity - 0.15
  };
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

    Util.each(y, yItem => {
      points.push({
        x,
        y: yItem
      });
    });
    return points;
  },
  // 获取激活的图形属性
  getActiveCfg(type, cfg) {
    return getActiveCfg(type, cfg);
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
      gShape._id = cfg.splitedIndex ? cfg._id + cfg.splitedIndex : cfg._id;
      gShape.name = this.name;
    }
    return gShape;
  },
  getSelectedCfg(type, cfg) {
    if (cfg && cfg.style) {
      return cfg.style;
    }
    return this.getActiveCfg(type, cfg);
  }
});

// 默认：填充区域图
Shape.registerShape('area', 'area', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    const path = getPath(cfg, false, this);
    // path = this.parsePath(path, false);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    return _getMarkerCfg(cfg);
  }
});

// 填充平滑区域图
Shape.registerShape('area', 'smooth', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    const coord = this._coord;
    // 曲线的限制
    cfg.constraint = [
      [ coord.start.x, coord.end.y ],
      [ coord.end.x, coord.start.y ]
    ];
    const path = getPath(cfg, true, this);
   // path = this.parsePath(path, false);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    return _getMarkerCfg(cfg);
  }
});

// 封闭的折线
Shape.registerShape('area', 'line', {
  draw(cfg, container) {
    const attrs = getLineAttrs(cfg);
    const path = getPath(cfg, false, this);
    // path = this.parsePath(path, false);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    return _getMarkerCfg(cfg);
  }
});


// 封闭的平滑线
Shape.registerShape('area', 'smoothLine', {
  draw(cfg, container) {
    const attrs = getLineAttrs(cfg);
    const path = getPath(cfg, true, this);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    return _getMarkerCfg(cfg);
  }
});

Area.spline = Area.smooth;

module.exports = Area;

