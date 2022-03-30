import { Coordinate } from '@antv/coord';
import { G2Area, G2CoordinateOptions, G2Library } from './types/options';
import { CoordinateComponent, CoordinateTransform } from './types/component';
import { useLibrary } from './library';
import { Padding } from './types/common';

export function createCoordinate(
  layout: Padding,
  partialOptions: G2Area,
  library: G2Library,
): Coordinate {
  const [useCoordinate] = useLibrary<
    G2CoordinateOptions,
    CoordinateComponent,
    CoordinateTransform
  >('coordinate', library);

  const {
    paddingLeft: pl,
    paddingRight: pr,
    paddingBottom: pb,
    paddingTop: pt,
  } = layout;

  const {
    x,
    y,
    width,
    height,
    coordinate: partialTransform = [],
  } = partialOptions;

  const transform = inferCoordinate(partialTransform);
  const coordinate = new Coordinate({
    x: x + pl,
    y: y + pt,
    width: width - pl - pr,
    height: height - pt - pb,
    transformations: transform.map(useCoordinate).flat(),
  });

  return coordinate;
}

export function isPolar(coordinate: G2CoordinateOptions[]) {
  const polar = coordinate.find((d) => d.type === 'polar');
  return polar !== undefined;
}

export function isTranspose(coordinate: G2CoordinateOptions[]) {
  const transposes = coordinate.filter(({ type }) => type === 'transpose');
  return transposes.length % 2 === 1;
}

export function isParallel(coordinate: G2CoordinateOptions[]) {
  const parallel = coordinate.find((d) => d.type === 'parallel');
  return parallel !== undefined;
}

function inferCoordinate(
  coordinate: G2CoordinateOptions[],
): G2CoordinateOptions[] {
  return [...coordinate, { type: 'cartesian' }];
}
