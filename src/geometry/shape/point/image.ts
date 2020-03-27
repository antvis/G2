import { IGroup } from '../../../dependents';
import { ShapeInfo, ShapeMarkerCfg } from '../../../interface';

import { registerShape } from '../base';
import { getStyle } from '../util/get-style';

registerShape('point', 'image', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const { r: size } = getStyle(cfg, false, false, 'r');
    const points = this.parsePoints(cfg.points);
    let pointPosition = points[0];
    if (cfg.isStack) {
      pointPosition = points[1];
    } else if (points.length > 1) {
      const group = container.addGroup();
      for (const point of points) {
        group.addShape('image', {
          attrs: {
            x: (point.x as number) - size / 2,
            y: (point.y as number) - size,
            width: size,
            height: size,
            img: cfg.shape[1],
          },
        });
      }

      return group;
    }

    return container.addShape('image', {
      attrs: {
        x: (pointPosition.x as number) - size / 2,
        y: (pointPosition.y as number) - size,
        width: size,
        height: size,
        img: cfg.shape[1],
      },
    });
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: 'circle',
      style: {
        r: 4.5,
        fill: color,
      },
    };
  },
});
