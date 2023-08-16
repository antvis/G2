import { corelib } from './core';
import { geolib } from './geo';
import { graphlib } from './graph';
import { plotlib } from './plot';
import { threedlib } from './threed';

export function stdlib() {
  return {
    ...geolib(),
    ...graphlib(),
    ...plotlib(),
    ...threedlib(),
    ...corelib(),
  } as const;
}
