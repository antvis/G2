import { Group } from '@antv/g';
import * as Util from '@antv/util';
import Element from '../element';

import { PointObject, ShapeDrawCFG } from '../../interface';
import { registerShape, registerShapeFactory, ShapePointCfg } from '../shape';

function getPath(points: any[]) {
  let flag: any = points[0];
  let i = 1;

  const path = [['M', flag.x, flag.y]];

  while (i < points.length) {
    const c: any = points[i];
    if (c.x !== points[i - 1].x || c.y !== points[i - 1].y) {
      path.push(['L', c.x, c.y]);
      if (c.x === flag.x && c.y === flag.y && i < points.length - 1) {
        flag = points[i + 1];
        path.push(['Z']);
        path.push(['M', flag.x, flag.y]);
        i++;
      }
    }
    i++;
  }

  if (!Util.isEqual(path[path.length - 1], flag)) {
    path.push(['L', flag.x, flag.y]);
  }

  path.push(['Z']);

  return path;
}

const PolygonShapeFactory = registerShapeFactory('polygon', {
  defaultShapeType: 'polygon',
  getDefaultPoints(pointInfo: ShapePointCfg) {
    const points = [];
    Util.each(pointInfo.x as number[], (subX, index) => {
      const subY = pointInfo.y[index];
      points.push({
        x: subX,
        y: subY,
      });
    });
    return points;
  },
});

registerShape('polygon', 'polygon', {
  draw(cfg: ShapeDrawCFG, container: Element) {
    if (!Util.isEmpty(cfg.points)) {
      const shapeAttrs: any = cfg.style;
      if (cfg.color) {
        shapeAttrs.fill = cfg.color;
      }
      const path = this.parsePath(getPath(cfg.points));
      return container.addShape('path', {
        attrs: {
          ...shapeAttrs,
          path,
        },
      });
    }
  },
  update(cfg: ShapeDrawCFG, container: Element) {
    // TODO: 可优化
    if (!Util.isEmpty(cfg.points)) {
      const shapeAttrs: any = cfg.style;
      if (cfg.color) {
        shapeAttrs.fill = cfg.color;
      }
      const path = this.parsePath(getPath(cfg.points));
      const shape = container.get('shape');
      shape.attr({
        ...shapeAttrs,
        path,
      });
    }
  },
});

export default PolygonShapeFactory;
