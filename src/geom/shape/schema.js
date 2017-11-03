/**
 * @fileOverview 自定义的 shape
 * @author dxq613@gmail.com
 * @author sima.zhang1990@gmail.com
 */

const Util = require('../../util');
const Shape = require('./shape');
const Global = require('../../global');

function _parseValue(value) {
  if (!Util.isArray(value)) {
    value = [ value ];
  }
  const min = value[0]; // 最小值
  const max = value[value.length - 1]; // 最大值
  const min1 = value.length > 1 ? value[1] : min;
  const max1 = value.length > 3 ? value[3] : max;
  const median = value.length > 2 ? value[2] : min1;

  return {
    min, // 最小值
    max, // 最大值
    min1,
    max1,
    median
  };
}

function addPoints(from, to) {
  Util.each(from, function(subArr) {
    to.push({
      x: subArr[0],
      y: subArr[1]
    });
  });
}

function getAttrs(cfg) {
  const defaultAttrs = Global.shape.schema;
  const attrs = Util.mix({}, defaultAttrs, {
    stroke: cfg.color,
    strokeOpacity: cfg.opacity
  }, cfg.style);
  return attrs;
}

function getFillAttrs(cfg) {
  const defaultAttrs = Global.shape.schema;
  const attrs = Util.mix({}, defaultAttrs, {
    fill: cfg.color,
    stroke: cfg.color,
    fillOpacity: cfg.opacity
  }, cfg.style);
  return attrs;
}

function getBoxPoints(x, y, width) {
  const points = [];
  let pointsArray;
  let obj;
  if (Util.isArray(y)) { // 2维
    obj = _parseValue(y);
    pointsArray = [
      [ x - width / 2, obj.max ],
      [ x + width / 2, obj.max ],
      [ x, obj.max ],
      [ x, obj.max1 ],
      [ x - width / 2, obj.min1 ],
      [ x - width / 2, obj.max1 ],
      [ x + width / 2, obj.max1 ],
      [ x + width / 2, obj.min1 ],
      [ x, obj.min1 ],
      [ x, obj.min ],
      [ x - width / 2, obj.min ],
      [ x + width / 2, obj.min ],
      [ x - width / 2, obj.median ],
      [ x + width / 2, obj.median ]
    ];
  } else { // 只有一个维度
    y = y || 0.5;
    obj = _parseValue(x);
    pointsArray = [
      [ obj.min, y - width / 2 ],
      [ obj.min, y + width / 2 ],
      [ obj.min, y ],
      [ obj.min1, y ],
      [ obj.min1, y - width / 2 ],
      [ obj.min1, y + width / 2 ],
      [ obj.max1, y + width / 2 ],
      [ obj.max1, y - width / 2 ],
      [ obj.max1, y ],
      [ obj.max, y ],
      [ obj.max, y - width / 2 ],
      [ obj.max, y + width / 2 ],
      [ obj.median, y - width / 2 ],
      [ obj.median, y + width / 2 ]
    ];
  }
  addPoints(pointsArray, points);
  return points;
}

function _sortValue(value) {
  if (!Util.isArray(value)) {
    value = [ value ];
  }
  // 从大到小排序
  const sorted = value.sort(function(a, b) {
    return a < b ? 1 : -1;
  });

  const length = sorted.length;
  if (length < 4) {
    const min = sorted[length - 1];
    for (let i = 0; i < (4 - length); i++) {
      sorted.push(min);
    }
  }

  return sorted;
}

// 获取K线图的points
function getCandlePoints(x, y, width) {
  const yValues = _sortValue(y);
  const points = [{
    x,
    y: yValues[0]
  }, {
    x,
    y: yValues[1]
  }, {
    x: x - width / 2,
    y: yValues[2]
  }, {
    x: x - width / 2,
    y: yValues[1]
  }, {
    x: x + width / 2,
    y: yValues[1]
  }, {
    x: x + width / 2,
    y: yValues[2]
  }, {
    x,
    y: yValues[2]
  }, {
    x,
    y: yValues[3]
  }]; // 按照顺时针连接
  return points;
}

function getBoxPath(points) {
  const path = [
    [ 'M', points[0].x, points[0].y ],
    [ 'L', points[1].x, points[1].y ],
    [ 'M', points[2].x, points[2].y ],
    [ 'L', points[3].x, points[3].y ],
    [ 'M', points[4].x, points[4].y ],
    [ 'L', points[5].x, points[5].y ],
    [ 'L', points[6].x, points[6].y ],
    [ 'L', points[7].x, points[7].y ],
    [ 'L', points[4].x, points[4].y ], // 封闭 z
    [ 'Z' ],
    [ 'M', points[8].x, points[8].y ],
    [ 'L', points[9].x, points[9].y ],
    [ 'M', points[10].x, points[10].y ],
    [ 'L', points[11].x, points[11].y ],
    [ 'M', points[12].x, points[12].y ],
    [ 'L', points[13].x, points[13].y ]
  ];
  return path;
}

function getCandlePath(points) {
  const path = [
    [ 'M', points[0].x, points[0].y ],
    [ 'L', points[1].x, points[1].y ],
    [ 'M', points[2].x, points[2].y ],
    [ 'L', points[3].x, points[3].y ],
    [ 'L', points[4].x, points[4].y ],
    [ 'L', points[5].x, points[5].y ],
    [ 'Z' ],
    [ 'M', points[6].x, points[6].y ],
    [ 'L', points[7].x, points[7].y ]
  ];
  return path;
}

const Schema = Shape.registerFactory('schema', {
  defaultShapeType: '',
  getActiveCfg(type, cfg) {
    if (type === 'box') {
      const lineWidth = cfg.lineWidth || 1;
      return {
        lineWidth: lineWidth + 1
      };
    }
    const opacity = cfg.fillOpacity || cfg.opacity || 1;
    return {
      fillOpacity: opacity - 0.15,
      strokeOpacity: opacity - 0.15
    };
  },
  getSelectedCfg(type, cfg) {
    if (cfg && cfg.style) {
      return cfg.style;
    }
    return this.getActiveCfg(type, cfg);
  }
});

// 箱线图
Shape.registerShape('schema', 'box', {
  getPoints(pointInfo) {
    return getBoxPoints(pointInfo.x, pointInfo.y, pointInfo.size);
  },
  draw(cfg, container) {
    const attrs = getAttrs(cfg);
    let path = getBoxPath(cfg.points);
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    return {
      symbol(x, y, r, ctx) {
        const yValues = [ y - 6, y - 3, y, y + 3, y + 6 ];
        const points = getBoxPoints(x, yValues, r);
        ctx.moveTo(points[0].x + 1, points[0].y);
        ctx.lineTo(points[1].x - 1, points[1].y);
        ctx.moveTo(points[2].x, points[2].y);
        ctx.lineTo(points[3].x, points[3].y);
        ctx.moveTo(points[4].x, points[4].y);
        ctx.lineTo(points[5].x, points[5].y);
        ctx.lineTo(points[6].x, points[6].y);
        ctx.lineTo(points[7].x, points[7].y);
        ctx.lineTo(points[4].x, points[4].y);
        ctx.closePath();
        ctx.moveTo(points[8].x, points[8].y);
        ctx.lineTo(points[9].x, points[9].y);
        ctx.moveTo(points[10].x + 1, points[10].y);
        ctx.lineTo(points[11].x - 1, points[11].y);
        ctx.moveTo(points[12].x, points[12].y);
        ctx.lineTo(points[13].x, points[13].y);
      },
      radius: 6,
      lineWidth: 1,
      stroke: cfg.color
    };
  }
});

// K线
Shape.registerShape('schema', 'candle', {
  getPoints(pointInfo) {
    return getCandlePoints(pointInfo.x, pointInfo.y, pointInfo.size);
  },
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let path = getCandlePath(cfg.points);
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path
      })
    });
  },
  getMarkerCfg(cfg) {
    return {
      symbol(x, y, r, ctx) {
        y = [ y + 7.5, y + 3, y - 3, y - 7.5 ];
        const points = getCandlePoints(x, y, r);
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.moveTo(points[2].x, points[2].y);
        ctx.lineTo(points[3].x, points[3].y);
        ctx.lineTo(points[4].x, points[4].y);
        ctx.lineTo(points[5].x, points[5].y);
        ctx.closePath();
        ctx.moveTo(points[6].x, points[6].y);
        ctx.lineTo(points[7].x, points[7].y);
      },
      lineWidth: 1,
      stroke: cfg.color,
      fill: cfg.color,
      radius: 6
    };
  }
});

module.exports = Schema;
