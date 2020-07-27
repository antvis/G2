import { isEmpty, clamp } from '@antv/util';
import { IGroup } from '../../../dependents';
import { ShapeInfo, ShapeMarkerCfg } from '../../../interface';

import { registerShape } from '../base';
import { getStyle } from '../util/get-style';

function getRectAttrs(points: any[], size: number) {
  const width = Math.abs(points[0].x - points[2].x);
  const height = Math.abs(points[0].y - points[2].y);

  let len = Math.min(width, height);
  if (size) {
    len = clamp(size, 0, Math.min(width, height));
  }
  len = len / 2;
  const centerX = (points[0].x + points[2].x) / 2;
  const centerY = (points[0].y + points[2].y) / 2;

  return {
    x: centerX - len,
    y: centerY - len,
    width: len * 2,
    height: len * 2,
  };
}

registerShape('polygon', 'square', {
  draw(cfg: ShapeInfo, container: IGroup) {
    if (!isEmpty(cfg.points)) {
      const shapeAttrs = getStyle(cfg, true, true);
      const points = this.parsePoints(cfg.points); // 转换为画布坐标
      return container.addShape('rect', {
        attrs: {
          ...shapeAttrs,
          ...getRectAttrs(points, cfg.size), // 获取 rect 绘图信息
        },
        name: 'polygon',
      });
    }
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: 'square',
      style: {
        r: 4,
        fill: color,
      },
    };
  },
});
