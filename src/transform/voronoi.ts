import { voronoi } from 'd3-voronoi';
import { TransformComponent as TC } from '../runtime';
import { VoronoiTransform } from '../spec';
import { useMemoTransform } from './utils/memo';

export type VoronoiOptions = Omit<VoronoiTransform, 'type'>;

export const Transform: TC<VoronoiOptions> = (options) => {
  const { fields: F, as: A, extend } = options;
  const [x, y] = F;
  const [ax, ay] = A;

  return (data) => {
    const polygons = voronoi()
      .x((d) => d[x])
      .y((d) => d[y])
      .extent(extend)
      .polygons(data);

    return polygons.map((p, idx) => {
      return {
        ...p.data,
        [ax]: p.map((pi) => pi[0]),
        [ay]: p.map((pi) => pi[1]),
      };
    });
  };
};

export const Voronoi = useMemoTransform(Transform);

Voronoi.props = {};
