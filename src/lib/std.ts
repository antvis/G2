import { corelib } from './core';
import { geolib } from './geo';
import { graphlib } from './graph';
import { plotlib } from './plot';

export function stdlib() {
  return {
    ...geolib(),
    ...graphlib(),
    ...plotlib(),
    ...corelib(),
  } as const;
}
