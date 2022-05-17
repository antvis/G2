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

export function isParallel(coordinate: Coordinate): boolean {
  const { transformations } = coordinate.getOptions();
  return transformations.some(([type]) => type === 'parallel');
}

export function getPolarOptions(coordinate: Coordinate): [number, number] {
  const { transformations } = coordinate.getOptions();
  const [, sr, er] = transformations.find(([type]) => type === 'polar');
  return [(+sr / Math.PI) * 180, (+er / Math.PI) * 180];
}
