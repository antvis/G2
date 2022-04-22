import { Container } from '../utils/container';
import { G2Theme } from '../runtime';

export function effectTiming(
  theme: G2Theme,
  style: Record<string, any>,
  options: Record<string, any>,
): Record<string, any> {
  const { enter = {} } = theme;
  return Container.of({})
    .call(assignDefined, enter)
    .call(assignDefined, style)
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
