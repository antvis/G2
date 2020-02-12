import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../../interface';

import { registerShape, registerShapeFactory } from '../base';
import { getStyle } from '../util/get-style';
import { getRectPath, getRectPoints } from './util';

/** Interval 的 shape 工厂 */
const IntervalShapeFactory = registerShapeFactory('interval', {
  defaultShapeType: 'rect',
  getDefaultPoints(pointInfo: ShapePoint): Point[] {
    return getRectPoints(pointInfo);
  },
});

/** Inerval 默认 shape，填充的矩形 */
registerShape('interval', 'rect', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, false, true);
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
    const { color, isInPolar } = markerCfg;
    if (isInPolar) {
      return {
        symbol: 'circle',
        style: {
          r: 4.5,
          fill: color,
        },
      };
    }

    return {
      symbol: 'square',
      style: {
        r: 4,
        fill: color,
      },
    };
  },
});

export default IntervalShapeFactory;
