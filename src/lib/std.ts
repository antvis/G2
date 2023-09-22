import { corelib } from './core';
import { geolib } from './geo';
import { graphlib } from './graph';
import { plotlib } from './plot';
import { autolib } from './auto';

export function stdlib() {
  return {
    ...geolib(),
    ...graphlib(),
    ...plotlib(),
    ...corelib(),
    ...autolib(),
  } as const;
}
