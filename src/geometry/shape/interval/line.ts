import { isArray } from '@antv/util';
import { IGroup } from '../../../dependents';
import { Point, ShapeInfo } from '../../../interface';
import { ShapeMarkerCfg, ShapePoint } from '../interface';

import { registerShape } from '../base';
import { getStyle } from '../util/get-style';
import { getRectPath } from './util';

// 根据数据点生成 Line 的两个关键点
function getLinePoints(pointInfo: ShapePoint): Point[] {
  const { x, y, y0 } = pointInfo;

  if (isArray(y)) {
    return y.map((yItem, idx) => {
      return {
        x: isArray(x) ? x[idx] : x,
        y: yItem,
      };
    });
  }

  // 起始点从 y0 开始
  return [
    { x: x as number, y: y0 },
    { x: x as number, y },
  ];
}

registerShape('interval', 'line', {
  getPoints(shapePoint: ShapePoint) {
    return getLinePoints(shapePoint);
  },
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false, 'lineWidth');
    const path = this.parsePath(getRectPath(cfg.points as Point[]));
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

    return shape;
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: (x: number, y: number, r: number) => {
        return [
          ['M', x, y - r],
          ['L', x, y + r],
        ];
      },
      style: {
        r: 5,
        stroke: color,
      },
    };
  },
});
