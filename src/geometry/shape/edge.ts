import { each } from '@antv/util';
import { IGroup } from '../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../interface';
import { registerShape, registerShapeFactory } from './base';
import { getStyle } from './util/get-style';
import { getLinePath } from './util/path';
import { splitPoints } from './util/split-points';
import { getArcPath } from '../../util/graphics';

const CORNER_PERCENT = 1 / 3;
function getVHVPath(from: Point, to: Point) {
  const points = [];
  points.push({
    x: from.x,
    y: from.y * (1 - CORNER_PERCENT) + to.y * CORNER_PERCENT,
  });
  points.push({
    x: to.x,
    y: from.y * (1 - CORNER_PERCENT) + to.y * CORNER_PERCENT,
  });
  points.push(to);

  const path = [
    ['M', from.x, from.y]
  ];
  each(points, point => {
    path.push(['L', point.x, point.y]);
  });

  return path;
}

function getCPath(from: Point, to: Point) {
  const points = [];
  points.push({
    x: from.x,
    y: from.y * 1 / 2 + to.y * 1 / 2,
  });

  points.push({
    x: to.x,
    y: from.y * 1 / 2 + to.y * 1 / 2,
  });
  points.push(to);

  const sub = ['C'];
  each(points, point => {
    sub.push(point.x, point.y);
  });

  return sub;
}

function getQPath(to: Point, center: Point) {
  const points = [];
  points.push({
    x: center.x,
    y: center.y
  });
  points.push(to);

  const sub = ['Q'];
  each(points, point => {
    sub.push(point.x, point.y);
  });

  return sub;
}

function getSmoothPath(from: Point, to: Point) {
  const sub = getCPath(from, to);
  const path = [
    ['M', from.x, from.y]
  ];

  path.push(sub);
  return path;
}

function getArcShapePath(from: Point, to: Point, center: Point) {
  const sub = getQPath(to, center);
  const path = [
    ['M', from.x, from.y]
  ];
  path.push(sub);
  return path;
}

function getArcShapeWeightPath(points: Point[], center: Point) {
  const arc1 = getQPath(points[1], center);
  const arc2 = getQPath(points[3], center);
  const path = [
    ['M', points[0].x, points[0].y]
  ];
  path.push(arc2);
  path.push(['L', points[3].x, points[3].y]);
  path.push(['L', points[2].x, points[2].y]);
  path.push(arc1);
  path.push(['L', points[1].x, points[1].y]);
  path.push(['L', points[0].x, points[0].y]);
  path.push(['Z']);
  return path;
}

const EdgeShapeFactory = registerShapeFactory('edge', {
  defaultShapeType: 'line',
  getDefaultPoints(pointInfo: ShapePoint): Point[] {
    return splitPoints(pointInfo);
  },
});


registerShape('edge', 'line', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false, 'lineWidth');
    const path = getLinePath(this.parsePoints(cfg.points), this.coordinate.isPolar);
    return container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
    });
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    return {
      symbol: 'circle',
      style: {
        r: 4.5,
        fill: markerCfg.color,
      },
    };
  }
});

registerShape('edge', 'vhv', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false, 'lineWidth');
    const points = cfg.points;
    const path = this.parsePath(getVHVPath(points[0] as Point, points[1] as Point));
    return container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
    });
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    return {
      symbol: 'circle',
      style: {
        r: 4.5,
        fill: markerCfg.color,
      },
    };
  }
});

registerShape('edge', 'smooth', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false, 'lineWidth');
    const points = cfg.points;
    const path = this.parsePath(getSmoothPath(points[0] as Point, points[1] as Point));
    return container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
    });
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    return {
      symbol: 'circle',
      style: {
        r: 4.5,
        fill: markerCfg.color,
      },
    };
  }
});

// 弧线包括笛卡尔坐标系下的半圆弧线、极坐标系下以圆心为控制点的二阶曲线、笛卡尔坐标系下带权重的三阶曲线、极坐标系下带权重的以圆心为控制点的二阶曲线
registerShape('edge', 'arc', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false, 'lineWidth');

    let points = cfg.points as Point[];
    const type = points.length > 2 ? 'weight' : 'normal';
    let path;
    if (cfg.isInCircle) {
      const center = { x: 0, y: 1 };
      if (type === 'normal') {
        path = getArcShapePath(points[0], points[1], center);
      } else {
        style.fill = style.stroke;
        path = getArcShapeWeightPath(points, center);
      }
      path = this.parsePath(path);

      return container.addShape('path', {
        attrs: {
          ...style,
          path,
        },
      });
    } else {
      if (type === 'normal') {
        points = this.parsePoints(points);
        path = getArcPath(
          (points[1].x + points[0].x) / 2,
          points[0].y,
          Math.abs((points[1].x - points[0].x)) / 2,
          Math.PI,
          Math.PI * 2);
        return container.addShape('path', {
          attrs: {
            ...style,
            path,
          },
        });
      } else {
        const c1 = getCPath(points[1], points[3]);
        const c2 = getCPath(points[2], points[0]);

        path = [
          ['M', points[0].x, points[0].y],
          ['L', points[1].x, points[1].y],
          c1,
          ['L', points[3].x, points[3].y],
          ['L', points[2].x, points[2].y],
          c2,
          ['Z'],
        ];
        path = this.parsePath(path);
        style.fill = style.stroke;

        return container.addShape('path', {
          attrs: {
            ...style,
            path,
          },
        });
      }
    }
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    return {
      symbol: 'circle',
      style: {
        r: 4.5,
        fill: markerCfg.color,
      },
    };
  }
});

export default EdgeShapeFactory;
