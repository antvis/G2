import { GeoView } from '../composition/geoView';
import { GeoPath } from '../composition/geoPath';

export function geolib() {
  return {
    'composition.geoView': GeoView,
    'composition.geoPath': GeoPath,
  } as const;
}
