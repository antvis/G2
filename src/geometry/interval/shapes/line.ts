import { isArray } from '@antv/util';
import { Path } from '@antv/g';
import { Group } from '../../../types/g';
import { Point } from '../../../types/common';
import { ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../../types/geometry';
import { registerShape } from '../../factory';
import { getShapeStyle } from '../../../util/element';
import { getRectPath } from '../util';

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
  draw(cfg: ShapeInfo, container: Group) {
    const style = getShapeStyle(cfg, true, false, 'lineWidth');
    const newStyle = { ...style };
    delete newStyle.fill;

    const path = this.parsePath(getRectPath(cfg.points as Point[], false));
    const shape = new Path({
      attrs: {
        ...newStyle,
        path,
      },
      name: 'interval',
    });
    container.appendChild(shape);

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
