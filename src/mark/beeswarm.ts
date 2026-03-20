import {
  forceSimulation,
  forceX,
  forceY,
  forceCollide,
} from '@antv/vendor/d3-force';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { PointMark } from '../spec';
import {
  PointBowtie,
  PointCross,
  PointDiamond,
  PointHexagon,
  PointHollowBowtie,
  PointHollowDiamond,
  PointHollowHexagon,
  PointHollow,
  PointHollowSquare,
  PointHollowTriangle,
  PointHollowTriangleDown,
  PointHyphen,
  PointLine,
  PointTriangleDown,
  PointPlus,
  PointSquare,
  PointShape,
  PointTick,
  PointTriangle,
  PointCircle,
  PointHollowCircle,
} from '../shape';
import { MaybeZeroX, MaybeZeroY, MaybeSize } from '../transform';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  createBandOffset,
  tooltip2d,
} from './utils';

const shape = {
  hollow: PointHollow,
  hollowDiamond: PointHollowDiamond,
  hollowHexagon: PointHollowHexagon,
  hollowSquare: PointHollowSquare,
  hollowTriangleDown: PointHollowTriangleDown,
  hollowTriangle: PointHollowTriangle,
  hollowBowtie: PointHollowBowtie,
  hollowCircle: PointHollowCircle,
  point: PointShape,
  plus: PointPlus,
  diamond: PointDiamond,
  square: PointSquare,
  triangle: PointTriangle,
  hexagon: PointHexagon,
  cross: PointCross,
  bowtie: PointBowtie,
  hyphen: PointHyphen,
  line: PointLine,
  tick: PointTick,
  triangleDown: PointTriangleDown,
  circle: PointCircle,
};

export type BeeswarmOptions = Omit<PointMark, 'type'>;

const DEFAULT_RADIUS = 4;
const ITERATIONS = 200;

/**
 * 蜂群图 (Beeswarm)
 */
export const Beeswarm: MC<BeeswarmOptions> = (options) => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, size: S } = value;

    if (!X.length || !Y.length) return [index, Y.map(() => [[]])];
    const [width, height] = coordinate.getSize();
    const offset = createBandOffset(scale, value, options);

    const nodes = Array.from(index, (i) => {
      const x0 = +X[i] * width;
      const y0 = +Y[i] * height;
      const r = +S[i] || DEFAULT_RADIUS;
      return { i, x: x0, y: y0, r };
    });

    // 2. forceSimulation
    const sim = forceSimulation(nodes)
      .stop()
      .force(
        'collide',
        forceCollide<any>()
          .radius((d) => d.r + 1)
          .strength(1),
      );

    // 主轴吸附
    sim.force('x', forceX<any>((d) => d.x).strength(0));
    sim.force('y', forceY<any>((d) => d.y).strength(5));

    for (let i = 0; i < ITERATIONS; i++) sim.tick();
    sim.stop();

    const xy = (i: number): Vector2 => {
      const n = nodes.find((d) => d.i === i)!;
      return [n.x / width, n.y / height];
    };

    const P = S
      ? Array.from(index, (i) => {
          const [cx, cy] = xy(i);
          const r = +S[i];
          const a = r / width;
          const b = r / height;
          const p1: Vector2 = [cx - a, cy - b];
          const p2: Vector2 = [cx + a, cy + b];
          return [
            coordinate.map(offset(p1, i)),
            coordinate.map(offset(p2, i)),
          ] as Vector2[];
        })
      : Array.from(
          index,
          (i) => [coordinate.map(offset(xy(i), i))] as Vector2[],
        );

    return [index, P];
  };
};

Beeswarm.props = {
  defaultShape: 'point',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'series', scale: 'band' },
    { name: 'size', quantitative: 'sqrt' },
  ],
  preInference: [
    ...basePreInference(),
    { type: MaybeZeroX },
    { type: MaybeZeroY },
  ],
  postInference: [...basePostInference(), { type: MaybeSize }, ...tooltip2d()],
};
