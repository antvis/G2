// Build-time schema definition; excluded from the published runtime sources.
import { stdlib } from '../../../src/lib';

const componentTypes = Object.keys(stdlib()).reduce<Record<string, string[]>>(
  (result, key) => {
    const [namespace, type] = key.split('.');
    if (!namespace || !type) return result;
    (result[namespace] ||= []).push(type);
    return result;
  },
  {},
);

const types = (namespace: string) => [...new Set(componentTypes[namespace])];
const dataConnectors = new Set(['fetch', 'inline', 'column']);
const coordinateTypes = types('coordinate');

export const catalog = {
  markTypes: types('mark'),
  compositionTypes: ['view', ...types('composition')],
  transformTypes: types('transform'),
  dataTransformTypes: types('data').filter((type) => !dataConnectors.has(type)),
  scaleTypes: types('scale'),
  coordinateTypes,
  coordinateTransformTypes: ['transpose', 'fisheye'].filter((type) =>
    coordinateTypes.includes(type),
  ),
  animationTypes: types('animation'),
  interactionTypes: types('interaction'),
  labelTransformTypes: types('labelTransform'),
  themeTypes: types('theme'),
};
