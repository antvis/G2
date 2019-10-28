import * as _ from '@antv/util';
import { Point, ShapeDrawCFG, ShapePoint } from '../../interface';
import { doAnimate } from '../animate';
import Element from '../element/index';
import { registerShape, registerShapeFactory } from './base';
import { splitPoints } from './util/split-points';

const SHAPES = ['circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangleDown'];
const HOLLOW_SHAPES = ['cross', 'tick', 'plus', 'hyphen', 'line'];

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
    draw(cfg: ShapeDrawCFG, element: Element) {
      const attrs = getAttributes(cfg, shapeName);

      const shape = element.container.addShape('marker', {
        attrs,
      });

      if (cfg.animate) {
        doAnimate(shape, cfg, this.coordinate);
      }

      return shape;
    },
    update(cfg: ShapeDrawCFG, element: Element) {
      const attrs = getAttributes(cfg, shapeName);
      const shape = element.shape;
      if (cfg.animate) {
        doAnimate(shape, cfg, this.coordinate, attrs);
      } else {
        shape.attr(attrs);
      }
    },
  });
  // 添加该 shape 对应的 hollow-shape
  registerShape('point', `hollow${_.upperFirst(shapeName)}`, {
    draw(cfg: ShapeDrawCFG, element: Element) {
      const attrs = getAttributes(cfg, shapeName);
      const shape = element.container.addShape('marker', {
        attrs,
      });

      if (cfg.animate) {
        doAnimate(shape, cfg, this.coordinate);
      }

      return shape;
    },
    update(cfg: ShapeDrawCFG, element: Element) {
      const attrs = getAttributes(cfg, shapeName);
      const shape = element.shape;

      if (cfg.animate) {
        doAnimate(shape, cfg, this.coordinate, attrs);
      } else {
        shape.attr(attrs);
      }
    },
  });
});

// 添加 hollowShapes
_.each(HOLLOW_SHAPES, (shapeName: string) => {
  registerShape('point', shapeName, {
    draw(cfg: ShapeDrawCFG, element: Element) {
      const attrs = getAttributes(cfg, shapeName);
      const shape = element.container.addShape('marker', {
        attrs,
      });

      if (cfg.animate) {
        doAnimate(shape, cfg, this.coordinate);
      }

      return shape;
    },
    update(cfg: ShapeDrawCFG, element: Element) {
      const attrs = getAttributes(cfg, shapeName);
      const shape = element.shape;
      if (cfg.animate) {
        doAnimate(shape, cfg, this.coordinate, attrs);
      } else {
        shape.attr(attrs);
      }
    },
  });
});

export default PointShapeFactory;
