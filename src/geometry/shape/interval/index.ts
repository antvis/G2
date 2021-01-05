import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../../interface';

import { registerShape, registerShapeFactory } from '../base';
import { BACKGROUND_SHAPE } from '../constant';
import { getBackgroundRectStyle, getStyle } from '../util/get-style';
import { getBackgroundRectPath, getIntervalRectPath, getRectPoints } from './util';

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
    const group = container.addGroup();

    const backgroundCfg = cfg.style?.background;
    if (backgroundCfg) {
      const backgroundStyle = getBackgroundRectStyle(cfg.style?.background);
      const backgroundPath = getBackgroundRectPath(
        cfg,
        this.parsePoints(cfg.points) as Point[],
        this.coordinate,
      );
      group.addShape('path', {
        attrs: {
          ...backgroundStyle,
          path: backgroundPath,
        },
        zIndex: -1,
        name: BACKGROUND_SHAPE,
      });
    }

    const path = this.parsePath(getIntervalRectPath(cfg.points as Point[], style.lineCap, this.coordinate));
    group.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

    return group;
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
