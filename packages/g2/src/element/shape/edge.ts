/**
 * @description Edge Element shapes
 * @author xinming002@gmail.com
 */
import * as _ from '@antv/util';
import { registerShape, registerShapeFactory, ShapeFactoryCFG } from './base';
import { getLinePath } from '../util/path';
import { ShapePointInfo, ShapeDrawCFG, ShapeMarkerCfg } from '../../interface';
import { splitPoints, setStrokeStyle } from '../util/shape';
import { Group } from '@antv/g';

const CORNER_PERCENT = 1 / 3;

// 获取图形属性
function _getAttrs(cfg) {
  const lineAttrs = cfg.style;
  setStrokeStyle(lineAttrs, cfg);
  return lineAttrs;
}

// 获取Marker的图形属性
function _getMarkerAttrs(cfg: ShapeMarkerCfg) {
  const markerStyle = {
    symbol: 'circle',
    radius: 4.5,
  };
  setStrokeStyle(markerStyle, cfg);
  return markerStyle;
}

// 获取Cubic Bezier路径
function _getCPath(from, to) {
  const points = [];
  points.push({
    x: from.x,
    y: from.y * (1 - 1 / 2) + to.y * 1 / 2,
  });

  points.push({
    y: from.y * (1 - 1 / 2) + to.y * 1 / 2,
    x: to.x,
  });
  points.push(to);
  const sub = [ 'C' ];

  _.each(points, (point) => {
    sub.push(point.x, point.y);
  });
  return sub;
}

// 获取Quadratic Bezier路径
function _getQPath(to, center) {
  const points = [];
  points.push({
    x: center.x,
    y: center.y,
  });
  points.push(to);

  const sub = [ 'Q' ];
  _.each(points, (point) => {
    sub.push(point.x, point.y);
  });
  return sub;
}

function _createSmoothPath(from, to) {
  const sub = _getCPath(from, to);
  const path = [
    [ 'M', from.x, from.y ],
  ];

  path.push(sub);
  return path;
}

function _createArcPath(from, to, center) {
  const sub = _getQPath(to, center);
  const path = [
    [ 'M', from.x, from.y ],
  ];
  path.push(sub);
  return path;
}

function _createArcWeightPath(points, center) {
  const arc1 = _getQPath(points[1], center);
  const arc2 = _getQPath(points[3], center);
  const path = [
    [ 'M', points[0].x, points[0].y ],
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

function _createRectPath(from, to) {
  const points = [];
  points.push({
    y: from.y * (1 - CORNER_PERCENT) + to.y * CORNER_PERCENT,
    x: from.x,
  });
  points.push({
    y: from.y * (1 - CORNER_PERCENT) + to.y * CORNER_PERCENT,
    x: to.x,
  });
  points.push(to);
  const path = [
    [ 'M', from.x, from.y ],
  ];
  _.each(points, (point) => {
    path.push([ 'L', point.x, point.y ]);
  });
  return path;
}

const EdgeShapeFactory: ShapeFactoryCFG = registerShapeFactory('edge', {
  defaultShapeType: 'line',
  getDefaultPoints(pointInfo: ShapePointInfo) {
    return splitPoints(pointInfo);
  },
  getMarkerStyle(type: string, markerCfg: ShapeMarkerCfg) {
    const shape = this.getShape(type);
    let markerStyle;
    if (shape.getMarkerStyle) {
      markerStyle = shape.getMarkerStyle(markerCfg);
    } else {
      markerStyle = _getMarkerAttrs(markerCfg);
    }

    const theme = this._theme;
    const shapeName = shape.name;

    if (theme && theme.edge && theme.edge[shapeName]) {
      markerStyle = _.mix({}, theme.edge[shapeName].default, markerStyle);
    }

    return markerStyle;
  },
});

registerShape('edge', 'line', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const { isInCircle } = cfg;
    const points = this.parsePoints(cfg.points);
    const attrCfg = _getAttrs(cfg);
    const path = getLinePath(points, isInCircle);
    const line = container.addShape('path', {
      attrs: _.mix(attrCfg, {
        path,
      }),
    });
    return line;
  },
});

registerShape('edge', 'vhv', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const points = cfg.points;
    const attrCfg = _getAttrs(cfg);
    let path = _createRectPath(points[0], points[1]);
    path = this.parsePath(path);
    const line = container.addShape('path', {
      attrs: _.mix(attrCfg, {
        path,
      }),
    });
    return line;
  },
});

registerShape('edge', 'smooth', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const points = cfg.points;
    const attrCfg = _getAttrs(cfg);
    let path = _createSmoothPath(points[0], points[1]);
    path = this.parsePath(path);

    const line = container.addShape('path', {
      attrs: _.mix(attrCfg, {
        path,
      }),
    });
    return line;
  },
});

// 弧线包括:
// 1. 笛卡尔坐标系下的半圆弧线
// 2. 极坐标系下以圆心为控制点的二阶曲线
// 3. 笛卡尔坐标系下带权重的三阶曲线
// 4. 极坐标系下带权重的以圆心为控制点的二阶曲线
registerShape('edge', 'arc', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    let points = cfg.points;
    const type = points.length > 2 ? 'weight' : 'normal';
    const attrCfg = _getAttrs(cfg);
    let line;
    let path;
    if (cfg.isInCircle) {
      const center = {
        x: 0,
        y: 1,
      };
      if (type === 'normal') {
        path = _createArcPath(points[0], points[1], center);
      } else {
        attrCfg.fill = attrCfg.stroke;
        path = _createArcWeightPath(points, center);
      }
      path = this.parsePath(path);
      line = container.addShape('path', {
        attrs: _.mix(attrCfg, {
          path,
        }),
      });
    } else {
      if (type === 'normal') {
        points = this.parsePoints(points);
        line = container.addShape('arc', {
          attrs: _.mix(attrCfg, {
            x: (points[1].x + points[0].x) / 2,
            y: points[0].y,
            r: Math.abs((points[1].x - points[0].x)) / 2,
            startAngle: Math.PI,
            endAngle: Math.PI * 2,
          }),
        });
      } else {
        path = [
          [ 'M', points[0].x, points[0].y ],
          [ 'L', points[1].x, points[1].y ],
        ];
        const c1 = _getCPath(points[1], points[3]);
        const c2 = _getCPath(points[2], points[0]);
        path.push(c1);
        path.push([ 'L', points[3].x, points[3].y ]);
        path.push([ 'L', points[2].x, points[2].y ]);
        path.push(c2);
        path.push([ 'Z' ]);
        path = this.parsePath(path);
        attrCfg.fill = attrCfg.stroke;
        line = container.addShape('path', {
          attrs: _.mix(attrCfg, {
            path,
          }),
        });
      }
    }
    return line;
  },
});

export default EdgeShapeFactory;
