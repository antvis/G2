import * as _ from '@antv/util';
import { setFillStyle, setStrokeStyle } from '../util/shape';
import { registerShapeFactory, registerShape, ShapeFactoryCFG } from './base';
import { ShapeDrawCFG, ShapePointInfo, ShapeMarkerCfg, PointObject } from '../../interface';
import { Group } from '@antv/g';

function _sortValue(oldValue): number[] {
  let value = oldValue;
  if (!_.isArray(oldValue)) {
    value = [ oldValue ];
  }
  // 从大到小排序
  const sorted = value.sort((a, b) => {
    return a < b ? 1 : -1;
  });

  const length = sorted.length;
  if (length < 4) {
    const min = sorted[length - 1];
    for (let i = 0; i < 4 - length; i++) {
      sorted.push(min);
    }
  }
  return sorted;
}

function _getPoints(x, y, width: number): PointObject[] {
  const yValues = _sortValue(y);
  const points = [
    {
      x,
      y: yValues[0],
    },
    {
      x,
      y: yValues[1],
    },
    {
      x: x - width / 2,
      y: yValues[2],
    },
    {
      x: x - width / 2,
      y: yValues[1],
    },
    {
      x: x + width / 2,
      y: yValues[1],
    },
    {
      x: x + width / 2,
      y: yValues[2],
    },
    {
      x,
      y: yValues[2],
    },
    {
      x,
      y: yValues[3],
    },
  ]; // 按照顺时针连接
  return points;
}

function _getPath(points) {
  const path = [
    [ 'M', points[0].x, points[0].y ],
    [ 'L', points[1].x, points[1].y ],
    [ 'M', points[2].x, points[2].y ],
    [ 'L', points[3].x, points[3].y ],
    [ 'L', points[4].x, points[4].y ],
    [ 'L', points[5].x, points[5].y ],
    [ 'Z' ],
    [ 'M', points[6].x, points[6].y ],
    [ 'L', points[7].x, points[7].y ],
  ];
  return path;
}

function _getAttrs(cfg) {
  const lineAttrs = cfg.style;
  setFillStyle(lineAttrs, cfg);
  setStrokeStyle(lineAttrs, cfg);
  return lineAttrs;
}

const KLineShapeFactory: ShapeFactoryCFG = registerShapeFactory('kline', {
  defaultShapeType: 'kline',
});

registerShape('kline', 'kline', {
  getPoints(pointInfo: ShapePointInfo) {
    return _getPoints(pointInfo.x, pointInfo.y, pointInfo.size);
  },
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getAttrs(cfg);
    let path = _getPath(cfg.points);
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: _.mix(attrs, {
        path,
      }),
    });
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    return {
      symbol(x: number, y: number, r: number) {
        const yValues = [ y + 7.5, y + 3, y - 3, y - 7.5 ];
        const points = _getPoints(x, yValues, r);
        return [
          [ 'M', points[0].x, points[0].y ],
          [ 'L', points[1].x, points[1].y ],
          [ 'M', points[2].x, points[2].y ],
          [ 'L', points[3].x, points[3].y ],
          [ 'L', points[4].x, points[4].y ],
          [ 'L', points[5].x, points[5].y ],
          [ 'Z' ],
          [ 'M', points[6].x, points[6].y ],
          [ 'L', points[7].x, points[7].y ],
        ];
      },
      lineWidth: 1,
      stroke: markerCfg.color,
      fill: markerCfg.color,
      radius: 6,
    };
  },
});

export default KLineShapeFactory;
