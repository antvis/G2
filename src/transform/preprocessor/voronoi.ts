import { voronoi } from 'd3-voronoi';
import { TransformComponent as TC } from '../../runtime';
import { VoronoiTransform } from '../../spec';
import { merge } from '../utils/helper';

export type VoronoiOptions = Omit<VoronoiTransform, 'type'>;

export const Voronoi: TC<VoronoiOptions> = (options) => {
  const { fields: F, as: A, extend } = options;
  const [x, y] = F;
  const [ax, ay] = A;

  return merge(({ data }) => {
    const polygons = voronoi()
      .x((d) => d[x])
      .y((d) => d[y])
      .extent(extend)
      .polygons(data)
      .map((p) => ({
        ...p.data,
        [ax]: p.map((pi) => pi[0]),
        [ay]: p.map((pi) => pi[1]),
      }));
    return { data: polygons };
  });
};

Voronoi.props = {
  type: 'preprocessor',
};
