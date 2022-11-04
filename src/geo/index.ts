import { GeoView } from './geoView';
import { Choropleth } from './choropleth';

export { GeoView, Choropleth };

export type { GeoViewOptions } from './geoView';
export type { ChoroplethOptions } from './choropleth';

export const geoLibrary = {
  'composition.geoView': GeoView,
  'composition.choropleth': Choropleth,
};
