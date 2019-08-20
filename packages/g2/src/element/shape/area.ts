/**
 * @description Area Element shapes
 */
import * as _ from '@antv/util';
import { Group } from '@antv/g';
import { registerShape, registerShapeFactory, ShapeFactoryCFG } from './base';
import { setFillStyle, setStrokeStyle } from '../util/shape';
import {
  ShapePointInfo,
  ShapeMarkerCfg,
  ShapeDrawCFG,
  PointObject,
} from '../../interface';
import { getSplinePath, getLinePath } from '../util/path';

function getLineAttrs(cfg) {
  const lineAttrs = cfg.style;
  setStrokeStyle(lineAttrs, cfg);
  if (_.isNumber(cfg.size)) {
    lineAttrs.lineWidth = cfg.size;
  }
  return lineAttrs;
}

function getFillAttrs(cfg) {
  const areaAttrs = cfg.style;
  setFillStyle(areaAttrs, cfg);
  return areaAttrs;
}

function getPath(cfg, smooth: boolean, shape) {
  let path = [];
  const pointsArr = [];
  const topLinePoints = []; // area 区域上部分
  let bottomLinePoints = []; // area 区域下部分
  const isInCircle = cfg.isInCircle;
  _.each(cfg.points, (point) => {
    topLinePoints.push(point[1]);
    bottomLinePoints.push(point[0]);
  });
  bottomLinePoints = bottomLinePoints.reverse();
  pointsArr.push(topLinePoints, bottomLinePoints);
  _.each(pointsArr, (pointsData, index) => {
    let subPath = [];
    const points = shape.parsePoints(pointsData);
    const p1 = points[0];
    if (isInCircle) {
      points.push({ x: p1.x, y: p1.y });
    }
    if (smooth) {
      subPath = getSplinePath(points, false, cfg.constraint);
    } else {
      subPath = getLinePath(points, false);
    }

    if (index > 0) {
      subPath[0][0] = 'L';
    }
    path = path.concat(subPath);
  });
  path.push([ 'Z' ]);
  return path;
}

// TODO: 目前这个 marker 是一个矩形，不适用于 area，有以下几种解决方案：
// 1. marker 可能需要支持 group，这样就可以恢复到之前矩形上方加一个描边
// 2. 使用 circle marker
// get marker style
function _getMarkerAttr(markerCfg: ShapeMarkerCfg) {
  return {
    symbol(x: number, y: number) {
      return [
        [ 'M', x - 5.5, y - 4 ],
        [ 'L', x + 5.5, y - 4 ],
        [ 'L', x + 5.5, y + 4 ],
        [ 'L', x - 5.5, y + 4 ],
        [ 'Z' ],
      ];
    },
    radius: 5,
    fill: markerCfg.color,
  };
}

// 当只有一个数据时绘制点
function drawPointShape(shapeObj, cfg, container: Group) {
  const coord = shapeObj._coord;
  const point = coord.convertPoint(cfg.points[0][1]);
  return container.addShape('circle', {
    attrs: _.mix(
      {
        x: point.x,
        y: point.y,
        r: 2,
        fill: cfg.color,
      },
      cfg.style,
    ),
  });
}

const AreaShapeFactory: ShapeFactoryCFG = registerShapeFactory('area', {
  defaultShapeType: 'area',
  /**
   * @override
   * @protected
   * 计算点 如果存在多个点，分割成单个的点, 不考虑多个x对应一个y的情况
   * 单点则补上y0点
   */
  getDefaultPoints(pointInfo: ShapePointInfo): PointObject[] {
    const x = pointInfo.x;
    let y = pointInfo.y;
    const y0 = pointInfo.y0;
    y = _.isArray(y) ? y : [ y0, y ];

    return y.map((yItem) => {
      return {
        x: x as number,
        y: yItem as number,
      };
    });
  },

  drawShape(type: string | string[], cfg: ShapeDrawCFG, container: Group) {
    const shape = this.getShape(type);
    const shapeName = shape.name;
    const theme = this._theme;
    if (theme && theme.area && theme.area[shapeName]) {
      const defaultShapeStyle = theme.area[shapeName].default;
      cfg.style = _.mix({}, defaultShapeStyle, cfg.style);
    }

    const gShape =
      cfg.points.length === 1 && cfg.showSinglePoint
        ? drawPointShape(this, cfg, container)
        : shape.draw(cfg, container);

    if (gShape) {
      gShape.set('origin', cfg.origin);
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
      markerStyle = _getMarkerAttr(markerCfg);
    }

    const theme = this._theme;
    const shapeName = shape.name;

    if (theme && theme.area && theme.area[shapeName]) {
      markerStyle = _.mix({}, theme.area[shapeName].default, markerStyle);
    }

    return markerStyle;
  },
});

// 默认：填充区域图
registerShape('area', 'area', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = getFillAttrs(cfg);
    const path = getPath(cfg, false, this);
    return container.addShape('path', {
      attrs: _.mix(attrs, {
        path,
      }),
    });
  },
});

// 填充平滑区域图
registerShape('area', 'smooth', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = getFillAttrs(cfg);
    const coord = this.getCoord();
    // 曲线的限制
    cfg.constraint = [ [ coord.start.x, coord.end.y ], [ coord.end.x, coord.start.y ] ];
    const path = getPath(cfg, true, this);
    return container.addShape('path', {
      attrs: _.mix(attrs, {
        path,
      }),
    });
  },
});

// 封闭的折线
registerShape('area', 'line', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = getLineAttrs(cfg);
    const path = getPath(cfg, false, this);
    return container.addShape('path', {
      attrs: _.mix(attrs, {
        path,
      }),
    });
  },
});

// 封闭的平滑线
registerShape('area', 'smoothLine', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = getLineAttrs(cfg);
    const path = getPath(cfg, true, this);
    return container.addShape('path', {
      attrs: _.mix(attrs, {
        path,
      }),
    });
  },
});

export default AreaShapeFactory;
