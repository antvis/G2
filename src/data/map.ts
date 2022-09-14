import { DataComponent as DC } from '../runtime';
import { identity } from '../utils/helper';
import { MapTransform } from '../spec';

export type MapOptions = Omit<MapTransform, 'type'>;

/**
 * Map transform by function.
 */
export const Map: DC<MapOptions> = (options) => {
  const { callback = identity } = options;
  return (data) => (Array.isArray(data) ? data.map(callback) : data);
};

Map.props = {};
