import { GeoView } from './geoView';
import { GeoPath } from './geoPath';

export { GeoView, GeoPath };

export type { GeoViewOptions } from './geoView';
export type { GeoPathOptions } from './geoPath';

export const geoLibrary = {
  'composition.geoView': GeoView,
  'composition.geoPath': GeoPath,
};
