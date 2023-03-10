import { Coordinate } from '@antv/coord';

export function isTranspose(coordinate: Coordinate): boolean {
  const { transformations } = coordinate.getOptions();
  const transposes = transformations
    .map(([type]) => type)
    .filter((type) => type === 'transpose');
  return transposes.length % 2 !== 0;
}

export function isPolar(coordinate: Coordinate): boolean {
  const { transformations } = coordinate.getOptions();
  return transformations.some(([type]) => type === 'polar');
}

export function isRadial(coordinate: Coordinate): boolean {
  const { transformations } = coordinate.getOptions();
  return (
    // distinguish radial from theta.
    transformations.some(([type]) => type === 'reflect') &&
    transformations.some(([type]) => type.startsWith('transpose'))
  );
}

export function isHelix(coordinate: Coordinate): boolean {
  const { transformations } = coordinate.getOptions();
  return transformations.some(([type]) => type === 'helix');
}

export function isParallel(coordinate: Coordinate): boolean {
  const { transformations } = coordinate.getOptions();
  return transformations.some(([type]) => type === 'parallel');
}

export function isFisheye(coordinate: Coordinate): boolean {
  const { transformations } = coordinate.getOptions();
  return transformations.some(([type]) => type === 'fisheye');
}

export function isRadar(coordinate: Coordinate): boolean {
  return isParallel(coordinate) && isPolar(coordinate);
}

export function isCircular(coordinate: Coordinate): boolean {
  return isHelix(coordinate) || isPolar(coordinate);
}

export function isTheta(coordinate: Coordinate): boolean {
  return isPolar(coordinate) && isTranspose(coordinate);
}

export function isNonCartesian(coordinate: Coordinate): boolean {
  return (
    isPolar(coordinate) ||
    isParallel(coordinate) ||
    isRadial(coordinate) ||
    isTheta(coordinate)
  );
}

export function getRadius(coordinate: Coordinate): number {
  if (isCircular(coordinate)) {
    const [width, height] = coordinate.getSize();
    const polar = coordinate
      .getOptions()
      .transformations.find((t) => t[0] === 'polar');
    // coordinate.size * outerRadius.
    if (polar) return (Math.max(width, height) / 2) * polar[4];
  }
  return 0;
}

export function radiusOf(coordinate: Coordinate): [number, number] {
  const { transformations } = coordinate.getOptions();
  const [, , , innerRadius, outerRadius] = transformations.find(
    (d) => d[0] === 'polar',
  );
  return [+innerRadius, +outerRadius];
}

export function angleOf(
  coordinate: Coordinate,
  isRadius = true,
): [number, number] {
  const { transformations } = coordinate.getOptions();
  const [, startAngle, endAngle] = transformations.find(
    (d) => d[0] === 'polar',
  );

  return isRadius
    ? [(+startAngle * 180) / Math.PI, (+endAngle * 180) / Math.PI]
    : ([startAngle, endAngle] as [number, number]);
}

export function getTransformOptions(coordinate: Coordinate, type: string) {
  const { transformations } = coordinate.getOptions();
  const [, ...args] = transformations.find((d) => d[0] === type);
  return args;
}
