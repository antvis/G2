import { CompositionComponent as CC, G2ViewTree } from '../runtime';
import { CircleComposition } from '../spec';
import { Container } from '../utils/container';
import { angle, angleBetween, dist, sub } from '../utils/vector';
import {
  inferColor,
  setAnimation,
  setStyle,
  toGrid,
  setChildren,
  setData,
} from './rect';
import { useDefaultAdaptor } from './utils';

export type CircleOptions = Omit<CircleComposition, 'type'>;

const setScale = useDefaultAdaptor<G2ViewTree>((options) => {
  return {
    scale: {
      x: { guide: { type: 'axisX' }, paddingOuter: 0, paddingInner: 0.1 },
      y: { guide: null, range: [0, 1], paddingOuter: 0, paddingInner: 0.1 },
    },
  };
});

const setCoordinate = useDefaultAdaptor((options: G2ViewTree) => {
  return {
    coordinate: [{ type: 'polar' }],
  };
});

const setEncode = (options) => {
  const { encode, ...rest } = options;
  const { position } = encode;
  return {
    ...rest,
    encode: { x: position },
  };
};

/**
 * Every facet should do not show both axisX and axisY by default.
 */
function createGuideCircle(guide) {
  return (facet) => null;
}

/**
 * Use the inscribed circle of the sector as the
 * circumscribed circle of the new bbox.
 */
function subLayoutCircle(data) {
  const { points } = data;
  const [p0, p1, p2, p3] = points;

  const sr = dist(p0, p3); // radius of sector
  const v0 = sub(p0, p3);
  const v1 = sub(p1, p2);
  const a01 = angleBetween(v0, v1);

  // sr = ir + ir / sin(theta/2)
  const t = 1 / Math.sin(a01 / 2);
  const ir = sr / (1 + t); // radius of inscribed circle
  const s = ir * Math.sqrt(2); // size of the bbox.

  // This assume the innerRadius of polar is 0.
  // @todo Compute the right origin if it's not 0,
  // or maybe pass the coordinate to get the right center.
  const [x0, y0] = p2;
  const a0 = angle(v0);
  const a3 = a0 + a01 / 2;
  const d = ir * t;
  const cx = x0 + d * Math.sin(a3); // center x of inscribed circle
  const cy = y0 + d * Math.cos(a3); // center y of inscribed circle
  return [cx - s / 2, cy - s / 2, s, s];
}

/**
 * @todo Pack.
 */
export const Circle: CC<CircleComposition> = () => {
  return (options) => {
    const newOptions = Container.of<G2ViewTree>(options)
      .call(toGrid)
      .call(setEncode)
      .call(inferColor)
      .call(setCoordinate)
      .call(setData)
      .call(
        setChildren,
        subLayoutCircle,
        createGuideCircle,
        createGuideCircle,
        { frame: false },
      )
      .call(setAnimation)
      .call(setStyle)
      .call(setScale)
      .value();
    return [newOptions];
  };
};
