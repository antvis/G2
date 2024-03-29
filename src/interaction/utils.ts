import { DisplayObject, Path, AABB } from '@antv/g';
import { path as d3Path } from 'd3-path';
import { sort } from 'd3-array';
import { Vector2 } from '@antv/coord';
import { filter } from '@antv/util';
import type { PathArray } from '@antv/util';
import { G2Element, select } from '../utils/selection';
import { mapObject } from '../utils/array';
import {
  G2ViewDescriptor,
  ELEMENT_CLASS_NAME,
  PLOT_CLASS_NAME,
} from '../runtime';
import { isOrdinalScale } from '../utils/scale';
import { rect } from '../shape/interval/color';
import { isPolar, isTranspose } from '../utils/coordinate';
import { getStyle } from '../utils/style';
import { reorder } from '../shape/utils';
import { angle, angleBetween, sub } from '../utils/vector';

/**
 * Given root of chart returns elements to be manipulated
 */
export function selectG2Elements(root: DisplayObject): DisplayObject[] {
  return select(root)
    .selectAll(`.${ELEMENT_CLASS_NAME}`)
    .nodes()
    .filter((d) => !d.__removed__);
}

export function selectFacetG2Elements(target, viewInstances): DisplayObject[] {
  return selectFacetViews(target, viewInstances).flatMap(({ container }) =>
    selectG2Elements(container),
  );
}

export function selectFacetViews(target, viewInstances) {
  return viewInstances.filter(
    (d) => d !== target && d.options.parentKey === target.options.key,
  );
}

export function selectPlotArea(root: DisplayObject): DisplayObject {
  return select(root).select(`.${PLOT_CLASS_NAME}`).node();
}

export function bboxOf(element: DisplayObject) {
  // The geometry bounds of a group is empty, so return the render bounds.
  if (element.tagName === 'g') return element.getRenderBounds();

  // Compute the geometry bounds related to the parent.
  const bounds = element.getGeometryBounds();
  const aabb = new AABB();
  aabb.setFromTransformedAABB(bounds, element.getWorldTransform());
  return aabb;
}

export function mousePosition(target, event) {
  const { offsetX, offsetY } = event;
  const bbox = bboxOf(target);
  const {
    min: [x, y],
    max: [x1, y1],
  } = bbox;
  const isOutX = offsetX < x || offsetX > x1;
  const isOutY = offsetY < y || offsetY > y1;
  if (isOutX || isOutY) return null;
  return [offsetX - x, offsetY - y];
}

/**
 * @todo Pass bbox rather than calc it here.
 */
export function brushMousePosition(target, event) {
  const { offsetX, offsetY } = event;
  const [x, y, x1, y1] = boundsOfBrushArea(target);
  return [
    Math.min(x1, Math.max(x, offsetX)) - x,
    Math.min(y1, Math.max(y, offsetY)) - y,
  ];
}

export function boundsOfBrushArea(target) {
  // Calc bbox after clipping.
  const bbox = target.getRenderBounds();
  const {
    min: [x0, y0],
    max: [x1, y1],
  } = bbox;
  return [x0, y0, x1, y1];
}

export function createColorKey(view) {
  return (element) => element.__data__.color;
}

export function createXKey(view) {
  return (element) => element.__data__.x;
}

export function createDatumof(view: G2ViewDescriptor | G2ViewDescriptor[]) {
  const views = Array.isArray(view) ? view : [view];
  const keyData = new Map(
    views.flatMap((view) => {
      const marks = Array.from(view.markState.keys());
      return marks.map((mark) => [keyed(view.key, mark.key), mark.data]);
    }),
  );
  return (element) => {
    const { index, markKey, viewKey } = element.__data__;
    const data = keyData.get(keyed(viewKey, markKey));
    return data[index];
  };
}

/**
 * A state manager for G2Element.
 * The keys for each state's style start with the state name.
 * { selectedFill, selectedStroke } is for selected state.
 * { unselectedFill, unselectedStroke } is for unselected state.
 */
export function useState(
  style: Record<string, any>,
  valueof = (d, element) => d,
  setAttribute = (element, key, v) => element.setAttribute(key, v),
) {
  const STATES = '__states__';
  const ORIGINAL = '__ordinal__';

  // Mix style for each state and apply it to element.
  const updateState = (element) => {
    const { [STATES]: states = [], [ORIGINAL]: original = {} } = element;
    const stateStyle = states.reduce(
      (mixedStyle, state) => ({
        ...mixedStyle,
        ...style[state],
      }),
      original,
    );
    if (Object.keys(stateStyle).length === 0) return;
    for (const [key, value] of Object.entries(stateStyle)) {
      const currentValue = getStyle(element, key);
      const v = valueof(value, element);
      setAttribute(element, key, v);
      // Store the attribute if it does not exist in original.
      if (!(key in original)) original[key] = currentValue;
    }
    element[ORIGINAL] = original;
  };

  const initState = (element) => {
    if (element[STATES]) return;
    element[STATES] = [];
    return;
  };

  /**
   * Set the states and update element.
   */
  const setState = (element, ...states) => {
    initState(element);
    element[STATES] = [...states];
    updateState(element);
  };

  /**
   * Remove the states and update element.
   */
  const removeState = (element, ...states) => {
    initState(element);
    for (const state of states) {
      const index = element[STATES].indexOf(state);
      if (index !== -1) {
        element[STATES].splice(index, 1);
      }
    }
    updateState(element);
  };

  const hasState = (element, state) => {
    initState(element);
    return element[STATES].indexOf(state) !== -1;
  };

  return {
    setState,
    removeState,
    hasState,
  };
}

function isEmptyObject(obj: any): boolean {
  if (obj === undefined) return true;
  if (typeof obj !== 'object') return false;
  return Object.keys(obj).length === 0;
}

// A function to generate key for mark each view.
function keyed(viewKey, markKey) {
  return `${viewKey},${markKey}`;
}

export function mergeState(options, states) {
  // Index state by mark key and view key.
  const views = Array.isArray(options) ? options : [options];
  const markState = views.flatMap((view) =>
    view.marks.map((mark) => [keyed(view.key, mark.key), mark.state]),
  );

  const state = {};
  // Update each specified state.
  for (const descriptor of states) {
    const [key, defaults] = Array.isArray(descriptor)
      ? descriptor
      : [descriptor, {}];

    // Update each specified mark state.
    state[key] = markState.reduce((merged, mark) => {
      // Normalize state.
      const [markKey, markState = {}] = mark;
      const selectedState = isEmptyObject(markState[key])
        ? defaults
        : markState[key];

      // Update each state attribute.
      for (const [attr, value] of Object.entries(selectedState)) {
        const oldValue = merged[attr];
        const newValue = (data, index, array, element) => {
          const k = keyed(element.__data__.viewKey, element.__data__.markKey);
          if (markKey !== k) return oldValue?.(data, index, array, element);
          if (typeof value !== 'function') return value;
          return value(data, index, array, element);
        };
        merged[attr] = newValue;
      }
      return merged;
    }, {});
  }
  return state;
}

// @todo Support elements from different view.
export function createValueof(elements, datum) {
  const elementIndex = new Map(elements.map((d, i) => [d, i]));
  const fa = datum ? elements.map(datum) : elements;
  return (d, e) => {
    if (typeof d !== 'function') return d;
    const i = elementIndex.get(e);
    const fe = datum ? datum(e) : e;
    return d(fe, i, fa, e);
  };
}

export function renderLink({
  link = false,
  valueof = (d, element) => d,
  coordinate,
  ...style
}) {
  const LINK_CLASS_NAME = 'element-link';

  if (!link) return [() => {}, () => {}];

  const pointsOf = (element) => element.__data__.points;

  const pathPointsOf = (P0, P1) => {
    const [, p1, p2] = P0;
    const [p0, , , p3] = P1;
    const P: Vector2[] = [p1, p0, p3, p2];
    return P;
  };

  const append = (elements) => {
    if (elements.length <= 1) return;

    // Sort elements by normalized x to avoid cross.
    const sortedElements = sort<G2Element>(elements, (e0, e1) => {
      const { x: x0 } = e0.__data__;
      const { x: x1 } = e1.__data__;
      const dx = x0 - x1;
      return dx;
    });

    for (let i = 1; i < sortedElements.length; i++) {
      const p = d3Path();
      const e0 = sortedElements[i - 1];
      const e1 = sortedElements[i];
      const [p0, p1, p2, p3] = pathPointsOf(pointsOf(e0), pointsOf(e1));
      p.moveTo(...p0);
      p.lineTo(...p1);
      p.lineTo(...p2);
      p.lineTo(...p3);
      p.closePath();
      const { fill = e0.getAttribute('fill'), ...rest } = mapObject(
        style,
        (d) => valueof(d, e0),
      );
      const link = new Path({
        className: LINK_CLASS_NAME,
        style: {
          d: p.toString(),
          fill,
          zIndex: -2,
          ...rest,
        },
      });
      // @ts-ignore
      e0.link?.remove();
      e0.parentNode.appendChild(link);
      // @ts-ignore
      e0.link = link;
    }
  };

  const remove = (element) => {
    element.link?.remove();
    element.link = null;
  };

  return [append, remove] as const;
}

// Apply translate to mock slice out.
export function offsetTransform(element, offset, coordinate) {
  const append = (t) => {
    const { transform } = element.style;
    return transform ? `${transform} ${t}` : t;
  };
  if (isPolar(coordinate)) {
    const { points } = element.__data__;
    const [p0, p1] = isTranspose(coordinate) ? reorder(points) : points;
    const center = coordinate.getCenter();
    const v0 = sub(p0, center);
    const v1 = sub(p1, center);
    const a0 = angle(v0);
    const da = angleBetween(v0, v1);
    const amid = a0 + da / 2;
    const dx = offset * Math.cos(amid);
    const dy = offset * Math.sin(amid);
    return append(`translate(${dx}, ${dy})`);
  }
  if (isTranspose(coordinate)) return append(`translate(${offset}, 0)`);
  return append(`translate(0, ${-offset})`);
}

export function renderBackground({
  document,
  background,
  scale,
  coordinate,
  valueof,
  ...rest
}) {
  const BACKGROUND_CLASS_NAME = 'element-background';

  // Don't have background.
  if (!background) return [() => {}, () => {}];

  const extentOf = (scale, x, padding) => {
    const ax = scale.invert(x);
    const mid = x + scale.getBandWidth(ax) / 2;
    const half = scale.getStep(ax) / 2;
    const offset = half * padding;
    return [mid - half + offset, mid + half - offset];
  };

  const sizeXOf = (element, padding) => {
    const { x: scaleX } = scale;
    if (!isOrdinalScale(scaleX)) return [0, 1];
    const { __data__: data } = element;
    const { x } = data;
    const [e1, e2] = extentOf(scaleX, x, padding);
    return [e1, e2];
  };

  const sizeYOf = (element, padding) => {
    const { y: scaleY } = scale;
    if (!isOrdinalScale(scaleY)) return [0, 1];
    const { __data__: data } = element;
    const { y } = data;
    const [e1, e2] = extentOf(scaleY, y, padding);
    return [e1, e2];
  };

  const bandShapeOf = (element, style) => {
    const { padding } = style;
    const [x1, x2] = sizeXOf(element, padding);
    const [y1, y2] = sizeYOf(element, padding);
    const points = [
      [x1, y1],
      [x2, y1],
      [x2, y2],
      [x1, y2],
    ].map((d) => coordinate.map(d));
    const { __data__: data } = element;
    const { y: dy, y1: dy1 } = data;
    return rect(document, points, { y: dy, y1: dy1 }, coordinate, style);
  };

  // Shape without ordinal style.
  // Clone and scale it.
  const cloneShapeOf = (element, style) => {
    const {
      transform = 'scale(1.2, 1.2)',
      transformOrigin = 'center center',
      stroke = '',
      ...rest
    } = style;
    const finalStyle = { transform, transformOrigin, stroke, ...rest };
    const shape = element.cloneNode(true);
    for (const [key, value] of Object.entries(finalStyle)) {
      shape.style[key] = value;
    }
    return shape;
  };

  const isOrdinalShape = () => {
    const { x, y } = scale;
    return [x, y].some(isOrdinalScale);
  };

  const append = (element) => {
    if (element.background) element.background.remove();
    const {
      fill = '#CCD6EC',
      fillOpacity = 0.3,
      zIndex = -2,
      padding = 0.001,
      lineWidth = 0,
      ...style
    } = mapObject(rest, (d) => valueof(d, element));
    const finalStyle = {
      ...style,
      fill,
      fillOpacity,
      zIndex,
      padding,
      lineWidth,
    };
    const shapeOf = isOrdinalShape() ? bandShapeOf : cloneShapeOf;
    const shape = shapeOf(element, finalStyle);
    shape.className = BACKGROUND_CLASS_NAME;
    element.parentNode.parentNode.appendChild(shape);
    element.background = shape;
  };

  const remove = (element) => {
    element.background?.remove();
    element.background = null;
  };

  const is = (element) => {
    return element.className === BACKGROUND_CLASS_NAME;
  };

  return [append, remove, is] as const;
}

export function setCursor(root, cursor) {
  // @ts-ignore
  const canvas = root.getRootNode().defaultView;
  const dom = canvas.getContextService().getDomElement();
  if (dom?.style) {
    root.cursor = dom.style.cursor;
    dom.style.cursor = cursor;
  }
}

export function restoreCursor(root) {
  setCursor(root, root.cursor);
}

export function selectElementByData(elements, data, datum) {
  return elements.find((d) =>
    Object.entries(data).every(([key, value]) => datum(d)[key] === value),
  );
}

export function getPointsR(point: number[], nextPoint: number[]) {
  return Math.sqrt(
    Math.pow(point[0] - nextPoint[0], 2) + Math.pow(point[1] - nextPoint[1], 2),
  );
}

// Points create path.
export function getPointsPath(points: number[][], isClose = false) {
  const path = filter(points, (d) => !!d).map((d, i) => {
    return [i === 0 ? 'M' : 'L', ...d];
  }) as PathArray;

  if (isClose) {
    path.push(['Z']);
  }
  return path;
}

// Get element.
export function getElements(plot) {
  return plot.querySelectorAll('.element');
}

// Get Theta coordinate round path.
export function getThetaPath(
  center: number[],
  points: number[][],
  isBig = 0,
): PathArray {
  const path = [['M', ...points[1]]];
  const innerRadius = getPointsR(center, points[1]);
  const outerRadius = getPointsR(center, points[0]);

  if (innerRadius === 0) {
    path.push(
      ['L', ...points[3]],
      ['A', outerRadius, outerRadius, 0, isBig, 1, ...points[0]],
      ['Z'],
    );
  } else {
    path.push(
      ['A', innerRadius, innerRadius, 0, isBig, 0, ...points[2]],
      ['L', ...points[3]],
      ['A', outerRadius, outerRadius, 0, isBig, 1, ...points[0]],
      ['Z'],
    );
  }
  return path as PathArray;
}

export function maybeRoot(node, rootOf) {
  if (rootOf(node)) return node;
  let root = node.parent;
  while (root && !rootOf(root)) root = root.parent;
  return root;
}
