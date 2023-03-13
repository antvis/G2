import { deepMix } from '@antv/util';
import { isUnset, subObject } from './helper';

export function subTooltip(tooltip, name, defaults = {}, main = false) {
  if (isUnset(tooltip)) return tooltip;
  if (Array.isArray(tooltip) && main) return tooltip;
  const sub = subObject(tooltip, name);
  return deepMix(defaults, sub);
}

export function maybeTooltip(tooltip, defaults = {}) {
  if (isUnset(tooltip)) return tooltip;
  if (Array.isArray(tooltip)) return tooltip;
  if (!isFullTooltip(tooltip)) return tooltip;
  return deepMix(defaults, tooltip);
}

export function isFullTooltip(tooltip) {
  if (Object.keys(tooltip).length === 0) return true;
  const { title, items } = tooltip;
  return title !== undefined || items !== undefined;
}

export function maybeAnimation(animate, sub) {
  return typeof animate === 'object' ? subObject(animate, sub) : animate;
}
