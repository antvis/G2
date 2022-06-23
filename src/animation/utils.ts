import { Container } from '../utils/container';
import { G2Theme } from '../runtime';

export function effectTiming(
  defaults: G2Theme['enter' | 'exit' | 'update'],
  value: Record<string, any>,
  options: Record<string, any>,
): Record<string, any> {
  return Container.of({})
    .call(assignDefined, defaults)
    .call(assignDefined, value)
    .call(assignDefined, options)
    .value();
}

function assignDefined<T>(
  target: Record<string, T>,
  source: Record<string, T>,
): Record<string, T> {
  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined) {
      target[key] = source[key];
    }
  }
  return target;
}
