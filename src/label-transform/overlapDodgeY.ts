import { DisplayObject } from '@antv/g';
import { ascending } from 'd3-array';
import { OverlapDodgeYLabelTransform } from '../spec';
import { LabelTransformComponent as LLC } from '../runtime';

export type OverlapDodgeYOptions = Omit<OverlapDodgeYLabelTransform, 'type'>;

function isSegmentIntersect([a, b], [c, d]) {
  return d > a && b > c;
}

function useMap<K, V>() {
  const map = new Map<K, V>();
  const get = (key: K) => map.get(key);
  const set = (key: K, value: V) => map.set(key, value);
  return [get, set] as const;
}

function getBoundsWithoutConnector(shape: DisplayObject) {
  const node = shape.cloneNode(true);
  const connectorShape = node.getElementById('connector');
  connectorShape && node.removeChild(connectorShape);
  const { min, max } = node.getRenderBounds();
  node.destroy();
  return { min, max };
}

/**
 * An iterative dodge method avoids label overlap. (n * log(n))
 */
export const OverlapDodgeY: LLC<OverlapDodgeYOptions> = (options) => {
  const { maxIterations = 10, maxError = 0.1, padding = 1 } = options;
  return (labels: DisplayObject[]) => {
    const n = labels.length;
    if (n <= 1) return labels;

    // Index y, x0, x, height, by label.
    const [y0, setY0] = useMap<DisplayObject, number>();
    const [y, setY] = useMap<DisplayObject, number>();
    const [h, setH] = useMap<DisplayObject, number>();
    const [xx, setXX] = useMap<DisplayObject, [number, number]>();
    for (const label of labels) {
      const { min, max } = getBoundsWithoutConnector(label);
      const [x0, y0] = min;
      const [x1, y1] = max;
      setY0(label, y0);
      setY(label, y0);
      setH(label, y1 - y0);
      setXX(label, [x0, x1]);
    }

    // Offsets position Y.
    for (let iter = 0; iter < maxIterations; iter++) {
      labels.sort((a, b) => ascending(y(a), y(b)));
      let error = 0;
      for (let i = 0; i < n - 1; i++) {
        const l0 = labels[i];
        let j = i + 1;
        let l1;
        // Find the next label overlapping with the current label in x direction.
        while ((l1 = labels[j]) && !isSegmentIntersect(xx(l0), xx(l1))) j += 1;
        if (l1) {
          const y0 = y(l0);
          const h0 = h(l0);
          const y1 = y(l1);
          const delta = y1 - (y0 + h0);
          if (delta < padding) {
            const newDelta = (padding - delta) / 2;
            error = Math.max(error, newDelta);
            setY(l0, y0 - newDelta);
            setY(l1, y1 + newDelta);
          }
        }
      }
      if (error < maxError) break;
    }

    for (const label of labels) {
      label.style.y += y(label) - y0(label);
    }

    return labels;
  };
};
