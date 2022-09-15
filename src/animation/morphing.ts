import {
  convertToPath,
  DisplayObject,
  IAnimation as GAnimation,
  Path,
} from '@antv/g';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from '../spec';
import { effectTiming } from './utils';

export type MorphingOptions = Animation & { split: 'pack' | SplitFunction };

type BBox = [number, number, number, number];

type SplitFunction = (shape: DisplayObject, count: number) => string[];

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

function localBBoxOf(shape: DisplayObject): BBox {
  const { min, max } = shape.getLocalBounds();
  const [x0, y0] = min;
  const [x1, y1] = max;
  const height = y1 - y0;
  const width = x1 - x0;
  return [x0, y0, width, height];
}

function d(bbox: BBox): string {
  const [x, y, width, height] = bbox;
  return `
    M ${x} ${y}
    L ${x + width} ${y}
    L ${x + width} ${y + height}
    L ${x} ${y + height}
    Z
  `;
}

function pack(shape: DisplayObject, count: number): string[] {
  const [x0, y0, width, height] = localBBoxOf(shape);
  const aspect = height / width;
  const col = Math.ceil(Math.sqrt(count / aspect));
  const row = Math.ceil(count / col);
  const B = [];
  const h = height / row;
  let j = 0;
  let n = count;
  while (n > 0) {
    const c = Math.min(n, col);
    const w = width / c;
    for (let i = 0; i < c; i++) {
      const x = x0 + i * w;
      const y = y0 + j * h;
      B.push(d([x, y, w, h]));
    }
    n -= c;
    j += 1;
  }
  return B;
}

function normalizeSplit(
  split: MorphingOptions['split'] = 'pack',
): SplitFunction {
  if (typeof split == 'function') return split;
  return pack;
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

function oneToOne(
  shape: DisplayObject,
  from: DisplayObject,
  to: DisplayObject,
  timeEffect: Record<string, any>,
) {
  const fromPath = convertToPath(from);
  const toPath = convertToPath(to);
  if (fromPath === undefined || toPath === undefined) {
    return shapeToShape(from, to, timeEffect);
  }

  // @todo Add more attributes need to be transform.
  // @todo Opacity transform unexpectedly.
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
  // console.log(from.style.path, to.style.path, from.style.transform, to.style.transform)
  const keyframes = [
    {
      path: fromPath,
      ...attributeOf(from, keys),
    },
    {
      path: toPath,
      ...attributeOf(to, keys),
    },
  ];
  const animation = shape.animate(keyframes, timeEffect);

  // Remove transform because it already applied in path
  // converted by convertToPath.
  // @todo Remove this scale(1, 1)
  shape.style.transform = 'scale(1, 1)';
  shape.style.transform = 'none';
  return animation;
}

function oneToMultiple(
  from: DisplayObject,
  to: DisplayObject[],
  timeEffect: Record<string, any>,
  split: SplitFunction,
) {
  // Hide the shape to be split before being removing.
  from.style.visibility = 'hidden';
  const D = split(from, to.length);
  return to.map((shape, i) => {
    const path = new Path({
      style: {
        path: D[i],
        fill: from.style.fill,
      },
    });
    return oneToOne(shape, path, shape, timeEffect);
  });
}

function multipleToOne(
  from: DisplayObject[],
  to: DisplayObject,
  timeEffect: Record<string, any>,
  split: SplitFunction,
) {
  const D = split(to, from.length);
  const { fillOpacity, strokeOpacity, opacity } = to.style;
  const keyframes = [
    { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
    { fillOpacity: 0, strokeOpacity: 0, opacity: 0, offset: 0.99 },
    {
      fillOpacity,
      strokeOpacity,
      opacity,
    },
  ];
  const animation = to.animate(keyframes, timeEffect);
  const animations = from.map((shape, i) => {
    const path = new Path({
      style: {
        path: D[i],
        fill: to.style.fill,
      },
    });
    return oneToOne(shape, shape, path, timeEffect);
  });
  return [...animations, animation];
}

/**
 * Morphing animations.
 * @todo Support ore split function.
 */
export const Morphing: AC<MorphingOptions> = (options) => {
  return (from, to, value, coordinate, defaults) => {
    const split = normalizeSplit(options.split);
    const timeEffect = effectTiming(defaults, value, options);
    const { length: fl } = from;
    const { length: tl } = to;
    if ((fl === 1 && tl === 1) || (fl > 1 && tl > 1)) {
      const [f] = from;
      const [t] = to;
      return oneToOne(f, f, t, timeEffect);
    }
    if (fl === 1 && tl > 1) {
      const [f] = from;
      return oneToMultiple(f, to, timeEffect, split);
    }
    if (fl > 1 && tl === 1) {
      const [t] = to;
      return multipleToOne(from, t, timeEffect, split);
    }
    return null;
  };
};

Morphing.props = {};
