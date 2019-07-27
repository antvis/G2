/**
 * @fileOverview 边的 shape
 * @author dxq613@gmail.com
 */

const Util = require('../../util');
const Shape = require('./shape');
const ShapeUtil = require('../util/shape');
const Global = require('../../global');
const PathUtil = require('../util/path');
const CORNER_PERCENT = 1 / 3;

function getAttrs(cfg) {
  const defaultCfg = Global.shape.edge;
  const lineAttrs = Util.mix({}, defaultCfg, cfg.style);
  ShapeUtil.addStrokeAttrs(lineAttrs, cfg);
  return lineAttrs;
}

const Edge = Shape.registerFactory('edge', {
  defaultShapeType: 'line',
  getDefaultPoints(pointInfo) {
    return ShapeUtil.splitPoints(pointInfo);
  },
  getActiveCfg(type, cfg) {
    const lineWidth = cfg.lineWidth || 0;
    return {
      lineWidth: lineWidth + 1
    };
  }
});

function getCPath(from, to) {
  const points = [];
  points.push({
    x: from.x,
    y: from.y * (1 - 1 / 2) + to.y * 1 / 2
  });

  points.push({
    y: from.y * (1 - 1 / 2) + to.y * 1 / 2,
    x: to.x
  });
  points.push(to);
  const sub = [ 'C' ];

  Util.each(points, function(point) {
    sub.push(point.x, point.y);
  });
  return sub;
}

function getQPath(to, center) {
  const points = [];
  points.push({
    x: center.x,
    y: center.y
  });
  points.push(to);

  const sub = [ 'Q' ];
  Util.each(points, function(point) {
    sub.push(point.x, point.y);
  });
  return sub;
}

function createSmoothPath(from, to) {
  const sub = getCPath(from, to);
  const path = [
    [ 'M', from.x, from.y ]
  ];

  path.push(sub);
  return path;
}

function createArcPath(from, to, center) {
  const sub = getQPath(to, center);
  const path = [
    [ 'M', from.x, from.y ]
  ];
  path.push(sub);
  return path;
}

function createArcWeightPath(points, center) {
  const arc1 = getQPath(points[1], center);
  const arc2 = getQPath(points[3], center);
  const path = [
    [ 'M', points[0].x, points[0].y ]
  ];
  path.push(arc2);
  path.push([ 'L', points[3].x, points[3].y ]);
  path.push([ 'L', points[2].x, points[2].y ]);
  path.push(arc1);
  path.push([ 'L', points[1].x, points[1].y ]);
  path.push([ 'L', points[0].x, points[0].y ]);
  path.push([ 'Z' ]);
  return path;
}


function createRectPath(from, to) {
  const points = [];
  points.push({
    y: from.y * (1 - CORNER_PERCENT) + to.y * CORNER_PERCENT,
    x: from.x
  });
  points.push({
    y: from.y * (1 - CORNER_PERCENT) + to.y * CORNER_PERCENT,
    x: to.x
  });
  points.push(to);
  const path = [
    [ 'M', from.x, from.y ]
  ];
  Util.each(points, function(point) {
    path.push([ 'L', point.x, point.y ]);
  });
  return path;
}

Shape.registerShape('edge', 'line', {
  draw(cfg, container) {
    const points = this.parsePoints(cfg.points);
    const attrCfg = getAttrs(cfg);
    const path = PathUtil.getLinePath(points);
    const line = container.addShape('path', {
      attrs: Util.mix(attrCfg, {
        path
      })
    });
    return line;
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'circle',
      radius: 4.5
    }, getAttrs(cfg));
  }
});

Shape.registerShape('edge', 'vhv', {
  draw(cfg, container) {
    const points = cfg.points;
    const attrCfg = getAttrs(cfg);
    let path = createRectPath(points[0], points[1]);
    path = this.parsePath(path);
    const line = container.addShape('path', {
      attrs: Util.mix(attrCfg, {
        path
      })
    });
    return line;
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'circle',
      radius: 4.5
    }, getAttrs(cfg));
  }
});

Shape.registerShape('edge', 'smooth', {
  draw(cfg, container) {
    const points = cfg.points;
    const attrCfg = getAttrs(cfg);
    let path = createSmoothPath(points[0], points[1]);
    path = this.parsePath(path);

    const line = container.addShape('path', {
      attrs: Util.mix(attrCfg, {
        path
      })
    });
    return line;
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'circle',
      radius: 4.5
    }, getAttrs(cfg));
  }
});

//  弧线包括笛卡尔坐标系下的半圆弧线、极坐标系下以圆心为控制点的二阶曲线、笛卡尔坐标系下带权重的三阶曲线、极坐标系下带权重的以圆心为控制点的二阶曲线
Shape.registerShape('edge', 'arc', {
  draw(cfg, container) {
    let points = cfg.points;
    const type = points.length > 2 ? 'weight' : 'normal';
    const attrCfg = getAttrs(cfg);
    let line;
    let path;
    if (cfg.isInCircle) {
      const center = {
        x: 0,
        y: 1
      };
      if (type === 'normal') {
        path = createArcPath(points[0], points[1], center);
      } else {
        attrCfg.fill = attrCfg.stroke;
        path = createArcWeightPath(points, center);
      }
      path = this.parsePath(path);
      line = container.addShape('path', {
        attrs: Util.mix(attrCfg, {
          path
        })
      });
    } else {
      if (type === 'normal') {
        points = this.parsePoints(points);
        line = container.addShape('arc', {
          attrs: Util.mix(attrCfg, {
            x: (points[1].x + points[0].x) / 2,
            y: points[0].y,
            r: Math.abs((points[1].x - points[0].x)) / 2,
            startAngle: Math.PI,
            endAngle: Math.PI * 2
          })
        });
      } else {
        path = [
          [ 'M', points[0].x, points[0].y ],
          [ 'L', points[1].x, points[1].y ]
        ];
        const c1 = getCPath(points[1], points[3]);
        const c2 = getCPath(points[2], points[0]);
        path.push(c1);
        path.push([ 'L', points[3].x, points[3].y ]);
        path.push([ 'L', points[2].x, points[2].y ]);
        path.push(c2);
        path.push([ 'Z' ]);
        path = this.parsePath(path);
        attrCfg.fill = attrCfg.stroke;
        line = container.addShape('path', {
          attrs: Util.mix(attrCfg, {
            path
          })
        });
      }
    }
    return line;
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'circle',
      radius: 4.5
    }, getAttrs(cfg));
  }
});

module.exports = Edge;
