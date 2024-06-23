import { isFunction } from '@antv/util';
import type { PathStyleProps } from '@antv/g';
import type { ShapeComponent as SC } from '../../runtime';
import { addWave } from './wave';
import { LiquidShapesPath } from './shapes';

const getLiquidShape = (shape = 'circle') =>
  LiquidShapesPath[shape] || LiquidShapesPath.circle;

export type LiquidOptions = Record<string, any>;

export const Liquid: SC<LiquidOptions> = (options, context) => {
  if (!context) return;
  const { coordinate } = context;
  const { liquidOptions, styleOptions } = options;
  const { liquidShape, percent } = liquidOptions;
  const {
    background: backgroundStyle,
    outline = {},
    wave = {},
    ...attr
  } = styleOptions;
  const { border = 2, distance = 0, ...outlineStyle } = outline;
  const { length = 192, count = 3 } = wave;

  return (points, cfg, defaultAttr) => {
    const { document } = context.canvas;
    const { color, fillOpacity } = defaultAttr;
    const attrs = { fill: color, ...defaultAttr, ...attr } as PathStyleProps;

    const g = document.createElement('g', {});

    // Center x/y.
    const [centerX, centerY] = coordinate.getCenter();
    // [width,height].
    const size = coordinate.getSize();
    const radius = Math.min(...size) / 2;

    // 1、Gets the path of the overall shape.
    const buildPath = isFunction(liquidShape)
      ? liquidShape
      : getLiquidShape(liquidShape);
    const shapePath = buildPath(centerX, centerY, radius, ...size);

    // 2、Background create.
    if (Object.keys(backgroundStyle).length) {
      const backgroundShape = document.createElement('path', {
        style: {
          d: shapePath,
          fill: '#fff',
          ...backgroundStyle,
        },
      });

      g.appendChild(backgroundShape);
    }

    // Percent > 0 Mapping water waves.
    if (percent > 0) {
      // 3. Clip create.
      const clipShape = document.createElement('path', {
        style: {
          d: shapePath,
        },
      });

      g.appendChild(clipShape);
      g.style.clipPath = clipShape;

      // 4. Wave create.
      addWave(
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

    // 5. Draw distance.
    const distanceShape = document.createElement('path', {
      style: {
        d: shapePath,
        fill: 'transparent',
        lineWidth: border + 2 * distance,
        stroke: '#fff',
      },
    });

    // 6. Draw border.
    const borderShape = document.createElement('path', {
      style: {
        d: shapePath,
        stroke: color,
        strokeOpacity: fillOpacity,
        lineWidth: border,
        ...attrs,
        ...outlineStyle,
        fill: 'transparent',
      },
    });

    g.appendChild(distanceShape);
    g.appendChild(borderShape);

    return g;
  };
};

Liquid.props = {};
