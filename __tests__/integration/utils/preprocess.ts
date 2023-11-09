import { G2Spec } from '../../../src';

export function disableAnimation(options): G2Spec {
  const { children } = options;
  if (!children) return { ...options, animate: false };
  const newChildren = children.map((d) => ({ ...d, animate: false }));
  return {
    ...options,
    children: newChildren,
  };
}

export function disableAxis(options): G2Spec {
  const { children } = options;
  if (!children) return { ...options, axis: false };
  const newChildren = children.map((d) => ({
    ...d,
    axis: false,
  }));
  return {
    ...options,
    children: newChildren,
  };
}
