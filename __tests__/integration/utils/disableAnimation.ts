import { G2Spec } from '../../../src';

export function disableAnimation(options): G2Spec {
  const { children } = options;
  if (!children) return { ...options, animate: false };
  const newChildren = children.map((d) => {
    const spec = { ...d, animate: false };
    if (d.axis?.x && typeof d.axis.x !== 'function') {
      spec.axis.x.animate = false;
    }
    if (d.axis?.y && typeof d.axis.x !== 'function') {
      spec.axis.y.animate = false;
    }
    return spec;
  });
  return {
    ...options,
    children: newChildren,
  };
}
