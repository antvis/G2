import { convertToPath, DisplayObject, Animation as GAnimation } from '@antv/g';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from '../spec';
import { effectTiming } from './utils';

export type MorphingOptions = Animation;

function attributeOf(shape: DisplayObject, keys: string[]) {
  const attribute = {};
  for (const key of keys) {
    const value = shape.style[key];
    if (value) {
      attribute[key] = value;
    }
  }
  return attribute;
}

function pathToPath(
  from: DisplayObject,
  to: DisplayObject,
  timeEffect: Record<string, any>,
): GAnimation {
  // @todo Add more attributes need to be transform.
  const keys = [
    'fill',
    'stroke',
    'fillOpacity',
    'strokeOpacity',
    'opacity',
    'lineWidth',
  ];

  // Convert Path will take transform, anchor, etc into account,
  // so there is no need to specify these attributes in keyframes.
  const keyframes = [
    {
      path: convertToPath(from),
      ...attributeOf(from, keys),
    },
    {
      path: convertToPath(to),
      ...attributeOf(to, keys),
    },
  ];
  const animation = from.animate(keyframes, timeEffect);

  // Remove transform because it already applied in path
  // converted by convertToPath.
  animation.onfinish = () => (from.style.transform = 'none');
  return animation;
}

/**
 * @todo After @antv/g supports smooth transition between transform attributes.
 */
function shapeToShape(
  from: DisplayObject,
  to: DisplayObject,
  timeEffect: Record<string, any>,
): GAnimation {
  return null;
}

/**
 * Transform mark from transparent to solid.
 */
export const Morphing: AC<MorphingOptions> = (options) => {
  return (shape, style, coordinate, defaults) => {
    const { to, ...rest } = style;
    const timeEffect = effectTiming(defaults, rest, options);
    try {
      return pathToPath(shape, to, timeEffect);
    } catch {
      return shapeToShape(shape, to, timeEffect);
    }
  };
};

Morphing.props = {};
