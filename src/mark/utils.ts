import { Channel } from '../runtime';

export function baseChannels(): Channel[] {
  return [
    { name: 'color' },
    { name: 'shape' },
    { name: 'enterType' },
    { name: 'enterDelay', scaleName: 'enter' },
    { name: 'enterDuration', scaleName: 'enter' },
    { name: 'enterEasing' },
    { name: 'key', scale: 'identity' },
    { name: 'groupKey', scale: 'identity' },
    { name: 'label', scale: 'identity' },
  ];
}

export function baseGeometryChannels(): Channel[] {
  return [
    ...baseChannels(),
    { name: 'title', scale: 'identity' },
    { name: 'tooltip', scale: 'identity', independent: true },
  ];
}

export function baseAnnotationChannels(): Channel[] {
  return baseChannels();
}

export function basePreInference() {
  return [{ type: 'maybeArrayField' }];
}

export function basePostInference() {
  return [{ type: 'maybeKey' }];
}
