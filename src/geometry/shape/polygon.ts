import * as _ from '@antv/util';
import { IGroup } from '../../dependents';
import { ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../interface';
import { registerShape, registerShapeFactory } from './base';

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

  if (!_.isEqual(_.last(path), flag)) {
    path.push(['L', flag.x, flag.y]);
  }

  path.push(['Z']);

  return path;
}

const PolygonShapeFactory = registerShapeFactory('polygon', {
  defaultShapeType: 'polygon',
  getDefaultPoints(pointInfo: ShapePoint) {
    const points = [];
    _.each(pointInfo.x as number[], (subX, index) => {
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
  draw(cfg: ShapeInfo, container: IGroup) {
    if (!_.isEmpty(cfg.points)) {
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
        name: 'polygon',
      });
    }
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: 'square',
      r: 4,
      fill: color,
    };
  },
});

registerShape('polygon', 'hollow', {
  draw(cfg: ShapeInfo, container: IGroup) {
    if (!_.isEmpty(cfg.points)) {
      const shapeAttrs: any = cfg.style;
      if (cfg.color) {
        shapeAttrs.stroke = cfg.color;
      }
      const path = this.parsePath(getPath(cfg.points));
      return container.addShape('path', {
        attrs: {
          ...shapeAttrs,
          path,
        },
        name: 'polygon',
      });
    }
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: 'square',
      r: 4,
      stroke: color,
    };
  },
});

export default PolygonShapeFactory;
