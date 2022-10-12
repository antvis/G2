import { Coordinate } from '@antv/coord';
import { G2View, G2CoordinateOptions, G2Library } from './types/options';
import { CoordinateComponent, CoordinateTransform } from './types/component';
import { useLibrary } from './library';
import { Layout } from './types/common';

export function createCoordinate(
  layout: Layout,
  partialOptions: G2View,
  library: G2Library,
): Coordinate {
  const [useCoordinate] = useLibrary<
    G2CoordinateOptions,
    CoordinateComponent,
    CoordinateTransform
  >('coordinate', library);
  const {
    innerHeight,
    innerWidth,
    insetLeft,
    insetTop,
    insetRight,
    insetBottom,
  } = layout;
  const { coordinate: partialTransform = [] } = partialOptions;
  const transform = inferCoordinate(partialTransform);
  const coordinate = new Coordinate({
    // @todo Find a better solution.
    // Store more layout information for component.
    ...layout,
    x: insetLeft,
    y: insetTop,
    width: innerWidth - insetLeft - insetRight,
    height: innerHeight - insetBottom - insetTop,
    transformations: transform.map(useCoordinate).flat(),
  });
  return coordinate;
}

export function isPolar(coordinate: G2CoordinateOptions[]) {
  const polar = coordinate.find((d) => d.type === 'polar');
  return polar !== undefined;
}

export function isHelix(coordinate: G2CoordinateOptions[]) {
  const polar = coordinate.find((d) => d.type === 'helix');
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

export function isTheta(coordinate: G2CoordinateOptions[]) {
  const reflect = coordinate.find((d) => d.type === 'theta');
  return reflect !== undefined;
}

export function isReflect(coordinate: G2CoordinateOptions[]) {
  const reflect = coordinate.find((d) => d.type === 'reflect');
  return reflect !== undefined;
}

export function isRadial(coordinate: G2CoordinateOptions[]) {
  const reflect = coordinate.find((d) => d.type === 'radial');
  return reflect !== undefined;
}

export function isReflectY(coordinate: G2CoordinateOptions[]) {
  const reflect = coordinate.find((d) => d.type === 'reflectY');
  return reflect !== undefined;
}

function inferCoordinate(
  coordinate: G2CoordinateOptions[],
): G2CoordinateOptions[] {
  if (coordinate.find((d) => d.type === 'cartesian')) return coordinate;
  return [...coordinate, { type: 'cartesian' }];
}
