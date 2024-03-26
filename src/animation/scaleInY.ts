import { arc } from 'd3-shape';
import {
  Path,
  convertToPath,
  CSS,
  PropertySyntax,
  DisplayObject,
} from '@antv/g';
import { G2Element } from 'utils/selection';
import { AnimationComponent as AC } from '../runtime';
import { isTranspose, isPolar } from '../utils/coordinate';
import { getArcObject } from '../shape/utils';
import { Animation } from './types';

export type ScaleInYOptions = Animation;

/**
 * Scale mark from nothing to desired shape in y direction.
 */
export const ScaleInY: AC<ScaleInYOptions> = (options, context) => {
  // Small enough to hide or show very small part of mark,
  // but bigger enough to not cause bug.
  const ZERO = 0.0001;

  const { coordinate } = context;

  // the polar coordinate need
  CSS.registerProperty({
    name: 'scaleInYRadius',
    inherits: false,
    initialValue: '',
    interpolable: true,
    syntax: PropertySyntax.NUMBER,
  });

  return (from, _, defaults) => {
    const [shape] = from;
    const PolarScaleInY = (shape: DisplayObject) => {
      const { __data__, style } = shape as G2Element;
      const {
        radius = 0,
        inset = 0,
        fillOpacity = 1,
        strokeOpacity = 1,
        opacity = 1,
      } = style;
      const { points, y, y1 } = __data__;
      const arcObject = getArcObject(coordinate, points, [y, y1]);
      const { innerRadius, outerRadius } = arcObject;
      const path = arc()
        .cornerRadius(radius as number)
        .padAngle((inset * Math.PI) / 180);
      const pathForConversion = new Path({});
      const createArcPath = (arcParams: {
        startAngle: number;
        endAngle: number;
        innerRadius: number;
        outerRadius: number;
      }) => {
        pathForConversion.attr({
          d: path(arcParams),
        });
        const convertedPathDefinition = convertToPath(pathForConversion);
        return convertedPathDefinition;
      };

      const keyframes = [
        {
          scaleInYRadius: innerRadius + ZERO,
          fillOpacity: 0,
          strokeOpacity: 0,
          opacity: 0,
        },
        {
          scaleInYRadius: innerRadius + ZERO,
          fillOpacity,
          strokeOpacity,
          opacity,
          offset: 0.01,
        },
        {
          scaleInYRadius: outerRadius,
          fillOpacity,
          strokeOpacity,
          opacity,
        },
      ];

      const animation = shape.animate(keyframes, { ...defaults, ...options });
      animation.onframe = function () {
        shape.style.d = createArcPath({
          ...arcObject,
          outerRadius: Number(shape.style.scaleInYRadius),
        });
      };

      animation.onfinish = function () {
        shape.style.d = createArcPath({
          ...arcObject,
          outerRadius: outerRadius,
        });
      };

      return animation;
    };

    const RectangularScaleInY = (shape: DisplayObject) => {
      const { style } = shape as G2Element;
      const {
        transform: prefix = '',
        fillOpacity = 1,
        strokeOpacity = 1,
        opacity = 1,
      } = style;
      const [transformOrigin, transform]: [string, string] = isTranspose(
        coordinate,
      )
        ? [`left top`, `scale(${ZERO}, 1)`] // left-top corner
        : [`left bottom`, `scale(1, ${ZERO})`]; // left-bottom corner

      // Using a short fadeIn transition to hide element with scale(0.001)
      // which is still visible.
      const keyframes = [
        {
          transform: `${prefix} ${transform}`.trimStart(),
          transformOrigin,
          fillOpacity: 0,
          strokeOpacity: 0,
          opacity: 0,
        },
        {
          transform: `${prefix} ${transform}`.trimStart(),
          transformOrigin,
          fillOpacity,
          strokeOpacity,
          opacity,
          offset: 0.01,
        },
        {
          transform: `${prefix} scale(1, 1)`.trimStart(),
          transformOrigin,
          fillOpacity,
          strokeOpacity,
          opacity,
        },
      ];

      const animation = shape.animate(keyframes, { ...defaults, ...options });
      return animation;
    };

    if (isPolar(coordinate)) {
      return PolarScaleInY(shape);
    } else {
      return RectangularScaleInY(shape);
    }
  };
};
