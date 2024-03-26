import { arc } from 'd3-shape';
import { CSS, PropertySyntax } from '@antv/g';
import { G2Element } from '../utils/selection';
import { AnimationComponent as AC } from '../runtime';
import { getArcObject } from '../shape/utils';
import { isPolar } from '../utils/coordinate';
import { Animation } from './types';
import { ScaleInX } from './scaleInX';

export type WaveInOptions = Animation;

/**
 * Transform mark from transparent to solid.
 */
export const WaveIn: AC<WaveInOptions> = (options, context) => {
  const ZERO = 0.0001;

  // @see https://g-next.antv.vision/zh/docs/api/css/css-properties-values-api#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7
  CSS.registerProperty({
    name: 'waveInArcAngle',
    inherits: false,
    initialValue: '',
    interpolable: true,
    syntax: PropertySyntax.NUMBER,
  });

  const { coordinate } = context;

  return (from, to, defaults) => {
    const [shape] = from;

    if (!isPolar(coordinate)) {
      return ScaleInX(options, context)(from, to, defaults);
    }

    const { __data__, style } = shape as G2Element;
    const {
      radius = 0,
      inset = 0,
      fillOpacity = 1,
      strokeOpacity = 1,
      opacity = 1,
    } = style;

    const { points, y, y1 } = __data__;

    const path = arc()
      .cornerRadius(radius as number)
      .padAngle((inset * Math.PI) / 180);
    const arcObject = getArcObject(coordinate, points, [y, y1]);
    const { startAngle, endAngle } = arcObject;

    const keyframes = [
      // Use custom interpolable CSS property.
      {
        waveInArcAngle: startAngle + ZERO,
        fillOpacity: 0,
        strokeOpacity: 0,
        opacity: 0,
      },
      {
        waveInArcAngle: startAngle + ZERO,
        fillOpacity,
        strokeOpacity,
        opacity,
        offset: 0.01,
      },
      {
        waveInArcAngle: endAngle,
        fillOpacity,
        strokeOpacity,
        opacity,
      },
    ];
    const animation = shape.animate(keyframes, { ...defaults, ...options });

    animation.onframe = function () {
      shape.style.d = path({
        ...arcObject,
        endAngle: Number(shape.style.waveInArcAngle),
      });
    };
    animation.onfinish = function () {
      shape.style.d = path({
        ...arcObject,
        endAngle: endAngle,
      });
    };

    return animation;
  };
};

WaveIn.props = {};
