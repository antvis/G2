import { isFunction } from '@antv/util';
import type { PathStyleProps } from '@antv/g';
import { ShapeComponent as SC } from '../../runtime';
import { addWaterWave } from './addWaterWave';
import { getLiquidShape } from './getLiquidShape';

export type LiquidShapeOptions = Record<string, any>;

export const LiquidShape: SC<LiquidShapeOptions> = (options, context) => {
  if (!context) return;
  const { coordinate } = context;
  const { liquidOptions, styleOptions } = options;
  const { liquidShape, percent } = liquidOptions;
  const { shapeStyle, outline = {}, wave = {}, ...attr } = styleOptions;
  const { border = 2, distance = 0, style = {} } = outline;
  const { length = 192, count = 3 } = wave;

  return (points, cfg, defaultAttr) => {
    const { document } = context.canvas;
    const { color, fillOpacity } = defaultAttr;
    const attrs = { fill: color, ...defaultAttr, ...attr } as PathStyleProps;

    const g = document.createElement('g', {});

    // 中心点x/ 中心点y
    const [centerX, centerY] = coordinate.getCenter();
    // 半径
    const radius = Math.min(...coordinate.getSize()) / 2;

    // 1、 获取整体形状的 path 路径
    const buildPath = isFunction(liquidShape)
      ? liquidShape
      : getLiquidShape(liquidShape);
    const shapePath = buildPath(centerX, centerY, radius * 2, radius * 2);

    if (shapeStyle) {
      // 2、背景创建
      const backgroundShape = document.createElement('path', {
        style: {
          path: shapePath,
          ...shapeStyle,
        },
      });

      g.appendChild(backgroundShape);
    }

    // 比例大于 0 时才绘制水波
    if (percent > 0) {
      // 3、剪切创建
      const clipShape = document.createElement('path', {
        style: {
          path: shapePath,
        },
      });

      g.appendChild(clipShape);
      g.style.clipPath = clipShape;

      // 4. 水波创建
      addWaterWave(
        centerX,
        centerY,
        1 - percent,
        count,
        attrs,
        g,
        clipShape.getBBox().y,
        radius * 2,
        length,
        true,
        document,
      );
    }

    // 5. 绘制一个 distance 宽的 border
    const distanceShape = document.createElement('path', {
      style: {
        path: shapePath,
        fill: 'transparent',
        lineWidth: border + 2 * distance,
        stroke: '#fff',
      },
    });

    // 6. 绘制一个 border 宽的 border
    const borderShape = document.createElement('path', {
      style: {
        path: shapePath,
        // 主题默认 color fillOpacity
        stroke: color,
        strokeOpacity: fillOpacity,
        lineWidth: border,
        ...attrs,
        ...style,
        fill: 'transparent',
      },
    });

    g.appendChild(distanceShape);
    g.appendChild(borderShape);

    return g;
  };
};

LiquidShape.props = {};
