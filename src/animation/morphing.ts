import {
  convertToPath,
  DisplayObject,
  Animation as GAnimation,
  Rect,
  Path,
} from '@antv/g';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from '../spec';
import { effectTiming } from './utils';

export type MorphingOptions = Animation;

type BBox = [number, number, number, number];

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
  animation.finished.then(() => (shape.style.transform = 'none'));
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

function pack(
  x0: number,
  y0: number,
  width: number,
  height: number,
  count: number,
): BBox[] {
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
      B.push([x, y, w, h]);
    }
    n -= c;
    j += 1;
  }
  return B;
}

function split(shape: DisplayObject, count: number): string[] {
  const [x, y, width, height] = localBBoxOf(shape);
  return pack(x, y, width, height, count).map(d);
}

function oneToMultiple(
  from: DisplayObject,
  to: DisplayObject[],
  timeEffect: Record<string, any>,
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
) {
  const D = split(to, from.length);
  // @todo Replace with to.style.
  const { fillOpacity, strokeOpacity, opacity } = to.parsedStyle;
  const keyframes = [
    { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
    { fillOpacity: 0, strokeOpacity: 0, opacity: 0, offset: 0.99 },
    {
      fillOpacity: fillOpacity.value,
      strokeOpacity: strokeOpacity.value,
      opacity: opacity.value,
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
 */
export const Morphing: AC<MorphingOptions> = (options) => {
  return (from, to, value, coordinate, defaults) => {
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
      return oneToMultiple(f, to, timeEffect);
    }
    if (fl > 1 && tl === 1) {
      const [t] = to;
      return multipleToOne(from, t, timeEffect);
    }
    return null;
  };
};

Morphing.props = {};
