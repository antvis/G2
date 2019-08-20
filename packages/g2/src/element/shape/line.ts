/**
 * @description line shapes
 */
import * as _ from '@antv/util';
import { Group } from '@antv/g';
import { registerShape, registerShapeFactory, ShapeFactoryCFG } from './base';
import { getLinePath, getSplinePath } from '../util/path';
import { splitPoints, setStrokeStyle } from '../util/shape';
import { LineSymbols } from '../util/symbol';
import {
  DataPointType,
  ShapeDrawCFG,
  ShapeMarkerCfg,
} from '../../interface';

const DOT_LINEDASH = [ 1, 1 ];
const DASH_LINEDASH = [ 5.5, 1 ];

// 获取图形属性
function _getAttrs(cfg: ShapeDrawCFG) {
  const lineAttrs = cfg.style;
  setStrokeStyle(lineAttrs, cfg);
  if (cfg.size) {
    lineAttrs.lineWidth = cfg.size;
  }
  return lineAttrs;
}

// 获取 Marker 的图形属性
function _getMarkerAttrs(cfg: DataPointType) {
  const markerAttrs = {
    lineWidth: 2,
    radius: 6,
  };
  setStrokeStyle(markerAttrs, cfg);
  return markerAttrs;
}

// 当只有一个数据时绘制点
function _drawPointShape(cfg, container) {
  const point = cfg.points[0];
  return container.addShape('circle', {
    attrs: {
      x: point.x,
      y: point.y,
      r: 2,
      fill: cfg.color,
    },
  });
}

// 获取带有上下区间的 path
function _getRangePath(points, smooth, isInCircle, cfg) {
  const isStack = cfg.isStack;
  const topPoints = [];
  const bottomPoints = [];
  for (let i = 0, len = points.length; i < len; i++) {
    const point = points[i];
    const tmp = splitPoints(point);
    bottomPoints.push(tmp[0]);
    topPoints.push(tmp[1]);
  }
  const topPath = _getSinglePath(topPoints, smooth, isInCircle, cfg);
  const bottomPath = _getSinglePath(bottomPoints, smooth, isInCircle, cfg);
  if (isStack) {
    return topPath;
  }
  return topPath.concat(bottomPath);
}

// 单条 path
function _getSinglePath(points, smooth: boolean, isInCircle: boolean, cfg) {
  let path;
  if (!smooth) {
    path = getLinePath(points, false);
    isInCircle && path.push([ 'Z' ]);
  } else {
    // 直角坐标系下绘制曲线时限制最大值、最小值
    const constraint = cfg.constraint;
    isInCircle && points.length && points.push({ x: points[0].x, y: points[0].y });
    path = getSplinePath(points, false, constraint);
  }

  return path;
}

// get line path
function _getPath(cfg, smooth: boolean) {
  const { points, isInCircle } = cfg;
  const first = points[0];
  return _.isArray(first.y) ?
    _getRangePath(points, smooth, isInCircle, cfg) :
    _getSinglePath(points, smooth, isInCircle, cfg);
}

function _interpPoints(points, fn) {
  let tmpPoints = [];
  _.each(points, (point, index) => {
    const nextPoint = points[index + 1];
    tmpPoints.push(point);
    if (nextPoint) {
      tmpPoints = tmpPoints.concat(fn(point, nextPoint));
    }
  });
  return tmpPoints;
}

// 插值的图形path，不考虑null
function _getInterPath(points) {
  const path = points.map((point, index) => {
    return index === 0 ? [ 'M', point.x, point.y ] : [ 'L', point.x, point.y ];
  });
  return path;
}

// 插值的图形
function _getInterPointShapeCfg(cfg, fn) {
  const points = _interpPoints(cfg.points, fn);
  return _getInterPath(points);
}

const LineShapeFactory: ShapeFactoryCFG = registerShapeFactory('line', {
  defaultShapeType: 'line',
  drawShape(type: string | string[], cfg: ShapeDrawCFG, container: Group) {
    const shape = this.getShape(type);

    // 因为覆盖了 ShapeFactotyBase.drawShape 方法，所以记得要应用 shape 主题配置
    const shapeName = shape.name;
    const theme = this._theme;
    if (theme && theme.line && theme.line[shapeName]) {
      const defaultShapeStyle = theme.line[shapeName].default;
      cfg.style = _.mix({}, defaultShapeStyle, cfg.style);
    }

    const gShape = (cfg.points.length === 1 && cfg.showSinglePoint) ?
      _drawPointShape(cfg, container) :
      shape.draw(cfg, container);

    if (gShape) {
      gShape.setSilent('origin', cfg.origin);
      gShape.id = cfg.splitedIndex ? cfg.id + cfg.splitedIndex : cfg.id;
      gShape.name = this.name;
    }

    return gShape;
  },
  getMarkerStyle(type: string, markerCfg: ShapeMarkerCfg) {
    const shape = this.getShape(type);
    let markerStyle;
    if (shape.getMarkerStyle) {
      markerStyle = shape.getMarkerStyle(markerCfg);
    } else {
      markerStyle = _getMarkerAttrs(markerCfg);
      let symbol = LineSymbols[type];

      if (type === 'dot') {
        symbol = LineSymbols.line;
        markerStyle.lineDash = markerStyle.lineDash || DOT_LINEDASH;
      }

      if (type === 'dash') {
        symbol = LineSymbols.line;
        markerStyle.lineDash = markerStyle.lineDash || DASH_LINEDASH;
      }

      markerStyle.symbol = symbol;
    }

    const theme = this._theme;
    const shapeName = shape.name;

    if (theme && theme.line && theme.line[shapeName]) {
      markerStyle = _.mix({}, theme.line[shapeName].default, markerStyle);
    }

    return markerStyle;
  },
});

// 开始往 LineShapeFactory 注册具体的 shape
registerShape('line', 'line', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getAttrs(cfg);
    const path = _getPath(cfg, false);
    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
});

// 点线 ···
registerShape('line', 'dot', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getAttrs(cfg);
    const path = _getPath(cfg, false);
    return container.addShape('path', {
      attrs: {
        lineDash: DOT_LINEDASH,
        ...attrs,
        path,
      },
    });
  },
});

// 断线 - - -
registerShape('line', 'dash', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getAttrs(cfg);
    const path = _getPath(cfg, false);
    return container.addShape('path', {
      attrs: {
        lineDash: DASH_LINEDASH,
        ...attrs,
        path,
      },
    });
  },
});

// 平滑曲线
registerShape('line', 'smooth', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getAttrs(cfg);
    const coord = this.getCoord();
    // 曲线的限制
    cfg.constraint = [
      [ coord.start.x, coord.end.y ],
      [ coord.end.x, coord.start.y ],
    ];
    const path = _getPath(cfg, true);
    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
});

// step line,
registerShape('line', 'hv', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getAttrs(cfg);
    const path = _getInterPointShapeCfg(cfg, (point, nextPoint) => {
      return [ {
        x: nextPoint.x,
        y: point.y,
      } ];
    });
    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
});

registerShape('line', 'vh', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getAttrs(cfg);
    const path = _getInterPointShapeCfg(cfg, (point, nextPoint) => {
      return [ {
        x: point.x,
        y: nextPoint.y,
      } ];
    });
    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
});

registerShape('line', 'hvh', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getAttrs(cfg);
    const path = _getInterPointShapeCfg(cfg, (point, nextPoint) => {
      const middleX = (nextPoint.x + point.x) / 2;
      return [
        { x: middleX, y: point.y },
        { x: middleX, y: nextPoint.y },
      ];
    });
    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
});

registerShape('line', 'vhv', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getAttrs(cfg);
    const path = _getInterPointShapeCfg(cfg, (point, nextPoint) => {
      const middleY = (point.y + nextPoint.y) / 2;
      return [
        { x: point.x, y: middleY },
        { x: nextPoint.x, y: middleY },
      ];
    });
    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
});

export default LineShapeFactory;
