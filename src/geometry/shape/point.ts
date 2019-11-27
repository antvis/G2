import * as _ from '@antv/util';
import { IGroup } from '../../dependents';
import { Point, ShapeInfo, ShapePoint } from '../../interface';
import { registerShape, registerShapeFactory } from './base';
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

function getAttributes(cfg, shapeName) {
  const style = cfg.style;
  if (cfg.color) {
    if (HOLLOW_SHAPES.includes(shapeName) || _.startsWith(shapeName, 'hollow')) {
      // 描边图形
      style.stroke = cfg.color;
    } else {
      style.fill = cfg.color;
    }
  }
  if (cfg.size) {
    style.r = cfg.size;
  }
  return {
    ...style,
    x: cfg.x,
    y: cfg.y,
    symbol: shapeName,
  };
}

const PointShapeFactory = registerShapeFactory('point', {
  defaultShapeType: 'circle',
  getDefaultPoints(pointInfo: ShapePoint): Point[] {
    return splitPoints(pointInfo);
  },
});

// 所有的 SHAPES 都注册一下
_.each(SHAPES, (shapeName: string) => {
  registerShape('point', shapeName, {
    draw(cfg: ShapeInfo, container: IGroup) {
      const attrs = getAttributes(cfg, shapeName);

      const shape = container.addShape('marker', {
        attrs,
        name: 'point',
      });

      return shape;
    },
    getMarker(color: string, isInCircle: boolean) {
      return {
        symbol: PointSymbols[shapeName] || shapeName,
        r: 4.5,
        fill: color,
      };
    },
  });
  // 添加该 shape 对应的 hollow-shape
  registerShape('point', `hollow${_.upperFirst(shapeName)}`, {
    draw(cfg: ShapeInfo, container: IGroup) {
      const attrs = getAttributes(cfg, shapeName);
      const shape = container.addShape('marker', {
        attrs,
        name: 'point',
      });

      return shape;
    },
    getMarker(color: string, isInCircle: boolean) {
      return {
        symbol: PointSymbols[shapeName] || shapeName,
        r: 4.5,
        stroke: color,
      };
    },
  });
});

// 添加 hollowShapes
_.each(HOLLOW_SHAPES, (shapeName: string) => {
  registerShape('point', shapeName, {
    draw(cfg: ShapeInfo, container: IGroup) {
      const attrs = getAttributes(cfg, shapeName);
      const shape = container.addShape('marker', {
        attrs,
        name: 'point',
      });

      return shape;
    },
    getMarker(color: string, isInCircle: boolean) {
      return {
        symbol: PointSymbols[shapeName],
        r: 4.5,
        stroke: color,
      };
    },
  });
});

export default PointShapeFactory;
