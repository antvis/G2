import { each, startsWith, upperFirst } from '@antv/util';
import { IGroup } from '../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../interface';
import { registerShape, registerShapeFactory } from './base';
import { getStyle } from './util/get-style';
import { splitPoints } from './util/split-points';

const SHAPES = ['circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangleDown'];
const HOLLOW_SHAPES = ['cross', 'tick', 'plus', 'hyphen', 'line'];
const PointSymbols = {
  hexagon: (x: number, y: number, r: number) => {
    const diffX = (r / 2) * Math.sqrt(3);
    return [
      ['M', x, y - r],
      ['L', x + diffX, y - r / 2],
      ['L', x + diffX, y + r / 2],
      ['L', x, y + r],
      ['L', x - diffX, y + r / 2],
      ['L', x - diffX, y - r / 2],
      ['Z'],
    ];
  },
  bowtie: (x: number, y: number, r: number) => {
    const diffY = r - 1.5;
    return [['M', x - r, y - diffY], ['L', x + r, y + diffY], ['L', x + r, y - diffY], ['L', x - r, y + diffY], ['Z']];
  },
  cross: (x: number, y: number, r: number) => {
    return [
      ['M', x - r, y - r],
      ['L', x + r, y + r],
      ['M', x + r, y - r],
      ['L', x - r, y + r],
    ];
  },
  tick: (x: number, y: number, r: number) => {
    return [
      ['M', x - r / 2, y - r],
      ['L', x + r / 2, y - r],
      ['M', x, y - r],
      ['L', x, y + r],
      ['M', x - r / 2, y + r],
      ['L', x + r / 2, y + r],
    ];
  },
  plus: (x: number, y: number, r: number) => {
    return [
      ['M', x - r, y],
      ['L', x + r, y],
      ['M', x, y - r],
      ['L', x, y + r],
    ];
  },
  hyphen: (x: number, y: number, r: number) => {
    return [
      ['M', x - r, y],
      ['L', x + r, y],
    ];
  },
  line: (x: number, y: number, r: number) => {
    return [
      ['M', x, y - r],
      ['L', x, y + r],
    ];
  },
};

function drawPoints(shape, cfg: ShapeInfo, container: IGroup, shapeName) {
  const isStroke = HOLLOW_SHAPES.includes(shapeName) || startsWith(shapeName, 'hollow');
  const style = getStyle(cfg, isStroke, !isStroke, 'r');
  const points = shape.parsePoints(cfg.points);

  if (points.length > 1) {
    const group = container.addGroup();
    for (const point of points) {
      group.addShape({
        type: 'marker',
        attrs: {
          ...style,
          symbol: shapeName,
          ...point,
        },
      });
    }
    return group;
  }

  return container.addShape({
    type: 'marker',
    attrs: {
      ...style,
      symbol: shapeName,
      ...points[0],
    },
  });
}

const PointShapeFactory = registerShapeFactory('point', {
  defaultShapeType: 'circle',
  getDefaultPoints(pointInfo: ShapePoint): Point[] {
    return splitPoints(pointInfo);
  },
});

// 所有的 SHAPES 都注册一下
each(SHAPES, (shapeName: string) => {
  registerShape('point', shapeName, {
    draw(cfg: ShapeInfo, container: IGroup) {
      return drawPoints(this, cfg, container, shapeName);
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      const { color } = markerCfg;
      return {
        symbol: PointSymbols[shapeName] || shapeName,
        style: {
          r: 4.5,
          fill: color,
        },
      };
    },
  });
  // 添加该 shape 对应的 hollow-shape
  registerShape('point', `hollow${upperFirst(shapeName)}`, {
    draw(cfg: ShapeInfo, container: IGroup) {
      return drawPoints(this, cfg, container, shapeName);
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      const { color } = markerCfg;
      return {
        symbol: PointSymbols[shapeName] || shapeName,
        style: {
          r: 4.5,
          stroke: color,
        },
      };
    },
  });
});

// 添加 hollowShape
each(HOLLOW_SHAPES, (shapeName: string) => {
  registerShape('point', shapeName, {
    draw(cfg: ShapeInfo, container: IGroup) {
      return drawPoints(this, cfg, container, shapeName);
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      const { color } = markerCfg;
      return {
        symbol: PointSymbols[shapeName],
        style: {
          r: 4.5,
          stroke: color,
        },
      };
    },
  });
});

registerShape('point', 'image', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const { r: size } = getStyle(cfg, false, false, 'r');
    const points = this.parsePoints(cfg.points);
    if (points.length > 1) {
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
        x: (points[0].x as number) - size / 2,
        y: (points[0].y as number) - size,
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

export default PointShapeFactory;
