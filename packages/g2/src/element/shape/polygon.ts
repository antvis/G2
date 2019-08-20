import * as _ from '@antv/util';
import { Group } from '@antv/g';
import { registerShape, registerShapeFactory, ShapeFactoryCFG } from './base';
import { setFillStyle, setStrokeStyle } from '../util/shape';
import { DataPointType, ShapePointInfo, ShapeMarkerCfg, ShapeDrawCFG } from '../../interface';

function getAttrs(cfg: DataPointType) {
  const attrs = cfg.style;
  setFillStyle(attrs, cfg);
  return attrs;
}

function getHollowAttrs(cfg: DataPointType) {
  const attrs = cfg.style;
  setStrokeStyle(attrs, cfg);
  return attrs;
}

function getPath(points: DataPointType[]) {
  let flag = points[0];
  let i = 1;

  const path = [ [ 'M', flag.x, flag.y ] ];

  while (i < points.length) {
    const c = points[i];
    if (c.x !== points[i - 1].x || c.y !== points[i - 1].y) {
      path.push([ 'L', c.x, c.y ]);
      if (c.x === flag.x && c.y === flag.y && i < points.length - 1) {
        flag = points[i + 1];
        path.push([ 'Z' ]);
        path.push([ 'M', flag.x, flag.y ]);
        i++;
      }
    }
    i++;
  }

  if (!_.isEqual(path[path.length - 1], flag)) {
    path.push([ 'L', flag.x, flag.y ]);
  }

  path.push([ 'Z' ]);

  return path;
}

function getMarkerAttrs(markerCfg: ShapeMarkerCfg) {
  const markerStyle = {
    symbol: 'square',
    radius: 4,
  };
  setFillStyle(markerStyle, markerCfg);
  return markerStyle;
}

const PolygonShapeFactory: ShapeFactoryCFG = registerShapeFactory('polygon', {
  defaultShapeType: 'polygon',
  getDefaultPoints(pointInfo: ShapePointInfo) {
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
  draw(cfg: ShapeDrawCFG, container: Group) {
    if (!_.isEmpty(cfg.points)) {
      const attrs = getAttrs(cfg);
      let path = getPath(cfg.points);
      path = this.parsePath(path);
      return container.addShape('path', {
        attrs: _.mix(attrs, {
          path,
        }),
      });
    }
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    return getMarkerAttrs(markerCfg);
  },
});

registerShape('polygon', 'hollow', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    if (!_.isEmpty(cfg.points)) {
      const attrs = getHollowAttrs(cfg);
      let path = getPath(cfg.points);
      path = this.parsePath(path);

      return container.addShape('path', {
        attrs: _.mix(attrs, {
          path,
        }),
      });
    }
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    return getMarkerAttrs(markerCfg);
  },
});

export default PolygonShapeFactory;
