import { DisplayObject, Path, AABB } from '@antv/g';
import { path as d3Path } from '@antv/vendor/d3-path';
import { sort, bisector } from '@antv/vendor/d3-array';
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
import { traverseElements } from '../utils/traverse-elements';

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

/**
 * Define state priorities, higher number means higher priority.
 */
const STATE_PRIORITIES = {
  selected: 3,
  unselected: 3,
  active: 2,
  inactive: 2,
  default: 1,
};

/**
 * Define state groups, states in the same group are mutually exclusive.
 */
const STATE_GROUPS = {
  selection: ['selected', 'unselected'],
  highlight: ['active', 'inactive'],
};

const setElementAttribute = (element: DisplayObject, k: string, v: string) => {
  traverseElements(element, (el) => {
    if ('setAttribute' in el && typeof el.setAttribute === 'function') {
      (el as DisplayObject).setAttribute(k, v);
    }
  });
};

export function createUseState(
  style: Record<string, any>,
  elements: Element[],
) {
  // Apply interaction style to all elements.
  elements.forEach((element) => {
    // @ts-ignore
    const currentStyle = element.__interactionStyle__;

    if (currentStyle) {
      // @ts-ignore
      element.__interactionStyle__ = { ...currentStyle, ...style };
    } else {
      // @ts-ignore
      element.__interactionStyle__ = style;
    }
  });

  return (valueof = (d, element) => d, setAttribute = setElementAttribute) =>
    useState(undefined, valueof, setAttribute);
}

export function useState(
  style: Record<string, any> | undefined,
  valueof = (d, element) => d,
  setAttribute = setElementAttribute,
) {
  const STATES = '__states__';
  const ORIGINAL = '__ordinal__';

  // Get state priority.
  const getStatePriority = (stateName) =>
    STATE_PRIORITIES[stateName] || STATE_PRIORITIES.default;

  // Get the group that a state belongs to.
  const getStateGroup = (stateName) => {
    return Object.entries(STATE_GROUPS).find(([_, states]) =>
      states.includes(stateName),
    )?.[0];
  };

  // Mix style for each state and apply it to element.
  const applyState = (element) => {
    const { [STATES]: states = [], [ORIGINAL]: original = {} } = element;

    // Sort states by priority.
    const sortedStates = [...states].sort(
      (a, b) => getStatePriority(b) - getStatePriority(a),
    );

    // Create a Map to track the highest priority state for each style attribute.
    const styleAttributeMap = new Map();

    // Iterate through all states to find the highest priority state for each style attribute.
    for (const state of sortedStates) {
      // If style exists, use it directly, else use interaction style on element.
      const stateStyles =
        (style ?? element.__interactionStyle__)?.[state] || {};
      for (const [key, value] of Object.entries(stateStyles)) {
        if (!styleAttributeMap.has(key)) {
          styleAttributeMap.set(key, value);
        }
      }
    }

    // Apply styles including original styles.
    const finalStyle = { ...original };
    for (const [key, value] of styleAttributeMap.entries()) {
      finalStyle[key] = value;
    }

    if (Object.keys(finalStyle).length === 0) return;

    // Apply final styles to the element.
    for (const [key, value] of Object.entries(finalStyle)) {
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
   * Update states and update element, handle conflict states automatically.
   */
  const updateState = (element, ...states) => {
    initState(element);
    const currentStates = element[STATES];

    // Collect all new state groups.
    const newStateGroups = new Set(
      states
        .map((state) => getStateGroup(state))
        .filter((group) => group !== undefined),
    );

    // Exclude old states that are in the new state group.
    const remainingStates = currentStates.filter(
      (existingState) => !newStateGroups.has(getStateGroup(existingState)),
    );

    element[STATES] = [...remainingStates, ...states];
    applyState(element);
  };

  /**
   * Set the states and update element.
   */
  const setState = (element, ...states) => {
    initState(element);
    element[STATES] = [...states];
    applyState(element);
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
    applyState(element);
  };

  const hasState = (element, state) => {
    initState(element);
    return element[STATES].indexOf(state) !== -1;
  };

  return {
    setState,
    updateState,
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

export const VALID_FIND_BY_X_MARKS = ['interval', 'point', 'density'];
/**
 * @description Create function that can find element by event.
 * @returns Element find function.
 */
export function createFindElementByEvent({
  elementsof,
  root,
  coordinate,
  scale,
  validFindByXMarks = VALID_FIND_BY_X_MARKS,
}) {
  let elements = elementsof(root);
  const getValidFindByXMarks = (d) => validFindByXMarks.includes(d.markType);
  const hasValidFindByXMarks = elements.find(getValidFindByXMarks);

  // Try to find element by x position.
  if (hasValidFindByXMarks) {
    elements = elements.filter(getValidFindByXMarks);

    const scaleX = scale.x;
    const scaleSeries = scale.series;
    const bandWidth = scaleX?.getBandWidth?.() ?? 0;
    const xof = scaleSeries
      ? (d) => {
          const seriesCount = Math.round(1 / (scaleSeries.valueBandWidth ?? 1));
          return (
            d.__data__.x +
            (d.__data__.series ?? 0) * bandWidth +
            bandWidth / (seriesCount * 2)
          );
        }
      : (d) => d.__data__.x + bandWidth / 2;

    // Sort for bisector search.
    elements.sort((a, b) => xof(a) - xof(b));

    return (event) => {
      const mouse = mousePosition(root, event);
      if (!mouse) return;
      const [abstractX] = coordinate.invert(mouse);
      const search = bisector(xof).center;
      const i = search(elements, abstractX);
      const target = elements[i];

      return target;
    };
  }

  // If there is no valid element find by x, just return the target element.
  return (event) => {
    const { target } = event;
    return maybeRoot(target, (node) => {
      if (!node.classList) return false;
      return node.classList.includes('element');
    });
  };
}

/**
 * Calculate adaptive sensitivity multiplier (inversely proportional to range).
 *
 * - Smaller range → higher sensitivity
 * - Larger range → lower sensitivity
 *
 * @param range Current range (0-1)
 * @returns Sensitivity multiplier (0.1x ~ 100x)
 */
export function calculateSensitivityMultiplier(range: number): number {
  // Base sensitivity factor (adjust this to tune overall responsiveness)
  const BASE_FACTOR = 0.01;
  const MIN_RANGE_FOR_SENSITIVITY = 0.0001;
  const MIN_MULTIPLIER = 0.1;
  const MAX_MULTIPLIER = 100;

  // Simple inverse relationship with reasonable bounds
  const multiplier = BASE_FACTOR / Math.max(range, MIN_RANGE_FOR_SENSITIVITY);

  // Clamp to reasonable range: 0.1x to 100x
  return Math.max(MIN_MULTIPLIER, Math.min(MAX_MULTIPLIER, multiplier));
}

/**
 * Check if a value is considered "falsy" for configuration purposes.
 * Returns true for false, null, or undefined values.
 * Uses type predicate for better type safety.
 *
 * @param value The value to check
 * @returns true if the value is falsy (false, null, undefined)
 */
export function isFalsyValue(
  value: unknown,
): value is false | null | undefined {
  return value === false || value === null || value === undefined;
}

/**
 * Extract channel data with preserved X-Y relationships from all marks in a view.
 * Supports multi-mark scenarios, bin transforms, and array-encoded Y values.
 *
 * @param view The view object containing markState
 * @returns Object containing flattened values for backward compatibility and structured mark data
 */
export function extractChannelValues(view: G2ViewDescriptor): {
  xChannelValues: unknown[];
  yChannelValues: unknown[];
  markDataPairs: Array<{
    markKey: string;
    channelData: { [key: string]: unknown[] };
  }>;
} {
  const allXChannelValues: unknown[][] = [];
  const allYChannelValues: unknown[][] = [];
  const markDataPairs: Array<{
    markKey: string;
    channelData: { [key: string]: unknown[] };
  }> = [];
  const marks = view.markState;

  if (marks) {
    for (const [mark, state] of marks.entries()) {
      if (state?.channels) {
        const channelData: { [key: string]: any[] } = {};

        // Process each channel for the current mark
        for (const channel of state.channels) {
          if (channel?.name === 'x' && channel.values?.length > 0) {
            // Collect X values (supports bin transforms with multiple values)
            let xValues: unknown[] = [];
            for (const valueItem of channel.values) {
              if (valueItem?.value) {
                xValues = xValues.concat(valueItem.value);
                allXChannelValues.push(valueItem.value);
              }
            }
            channelData['x'] = xValues;
          } else if (
            channel &&
            (channel.name === 'y' || channel.name.startsWith('y')) && // Support y, y1, y2, y3, etc.
            channel.values?.length > 0
          ) {
            const channelName = channel.name;
            const channelValues: unknown[] = [];

            // Handle Y and Y1+ channels for multi-Y marks (e.g., area charts, candlestick charts)
            for (const valueItem of channel.values) {
              if (valueItem?.value) {
                const values = valueItem.value;
                // Preserve G2's internal structure for array-encoded data
                // Area charts: [[low1,low2,low3], [high1,high2,high3]]
                // Line charts: [[value1,value2,value3]]
                channelValues.push(values);
                if (channelName === 'y' || channelName === 'y1') {
                  // For global domain calculation, flatten only for allYChannelValues
                  if (Array.isArray(values)) {
                    allYChannelValues.push(values.flat());
                  } else {
                    allYChannelValues.push([values]);
                  }
                }
              }
            }

            // Store all Y-related channels
            channelData[channelName] = channelValues;
          }
        }

        // Store mark data with preserved X-Y relationships
        const xValues = channelData['x'] || [];
        const yValues = channelData['y'] || [];

        if (xValues.length > 0 && yValues.length > 0) {
          markDataPairs.push({
            markKey: mark.key || `mark_${markDataPairs.length}`,
            channelData,
          });
        }
      }
    }
  }

  return {
    xChannelValues: allXChannelValues.flat(),
    yChannelValues: allYChannelValues.flat(),
    markDataPairs,
  };
}

/**
 * Check if there are multiple independent axis for a given channel.
 * Multi-axis can be defined by:
 * 1. Explicit `independent: true` in scale configuration
 * 2. Different `scale.key` values for the same channel name
 *
 * @param channel1 - Channel name (x or y)
 * @param marks - Array of marks to check
 * @returns true if multiple independent axis exist
 */
export function hasIndependentXYScale(
  channel1: string,
  marks: readonly unknown[],
): boolean {
  const scaleKeys = new Set<string>();

  for (const mark of marks) {
    const { scale: markScale } = mark as Record<string, unknown>;
    const channelScale = (markScale as Record<string, unknown>)?.[channel1] as
      | Record<string, unknown>
      | undefined;

    if (!channelScale) continue;

    // Early return if explicit independent flag is found
    if (channelScale.independent) {
      return true;
    }

    // Collect scale keys, treating undefined/missing key as 'default'
    const key = (channelScale.key as string | undefined) || 'default';
    scaleKeys.add(key);

    // Early return if multiple different keys are detected
    if (scaleKeys.size > 1) {
      return true;
    }
  }

  // No multiple axes detected
  return false;
}

/**
 * Calculate multi-axis channel domains for slider filtering.
 * When independent scales are detected, generates separate domains for each axis (x1, y1, x2, y2, etc.)
 *
 * @param view The view object containing markState
 * @param initDomain Initial domain configuration
 * @param scaleX X scale instance
 * @param scaleY Y scale instance
 * @param independentInfo Pre-computed independent scale information
 * @returns Extended channelDomain object with multi-axis support
 */
export function calculateMultiAxisChannelDomains(
  view: G2ViewDescriptor,
  initDomain: Record<string, unknown>,
  scaleX: { getOptions(): { domain: unknown } },
  scaleY: { getOptions(): { domain: unknown } },
  independentInfo?: IndependentScaleInfo,
): Record<string, unknown[]> {
  const channelDomain: Record<string, unknown[]> = {
    x:
      (initDomain.x as unknown[]) ||
      (scaleX.getOptions().domain as unknown[]) ||
      [],
    y:
      (initDomain.y as unknown[]) ||
      (scaleY.getOptions().domain as unknown[]) ||
      [],
  };

  // Use pre-computed info if available, otherwise calculate
  const info = independentInfo || calculateAllIndependentScaleInfo(view);
  const { hasIndependentX, hasIndependentY } = info;

  if (hasIndependentX || hasIndependentY) {
    let xIndex = 1;
    let yIndex = 1;

    // Iterate through marks to collect independent scale domains
    for (const [mark, state] of view.markState.entries()) {
      if (state?.channels) {
        // Process independent X scales
        if (hasIndependentX) {
          const xChannel = state.channels.find((ch) => ch.name === 'x');
          if (mark?.scale?.x?.independent) {
            const xKey = `x${xIndex}`;
            channelDomain[xKey] = xChannel.scale.domain;
            xIndex++;
          }
        }

        // Process independent Y scales
        if (hasIndependentY) {
          const yChannel = state.channels.find((ch) => ch.name === 'y');
          if (mark?.scale?.y?.independent) {
            const yKey = `y${yIndex}`;
            channelDomain[yKey] = yChannel.scale.domain;
            yIndex++;
          }
        }
      }
    }
  }

  return channelDomain;
}

/**
 * Independent scale information cache interface
 */
export interface IndependentScaleInfo {
  hasIndependentX: boolean;
  hasIndependentY: boolean;
  marksWithSharedX: string[];
  marksWithIndependentX: string[];
  marksWithSharedY: string[];
  marksWithIndependentY: string[];
  markToXScaleMap: Map<string, string>;
  markToYScaleMap: Map<string, string>;
}

/**
 * Calculate all independent scale information in one pass
 * This function performs a single traversal to compute all independent scale related information,
 * avoiding repeated calculations throughout the codebase.
 *
 * Multi-axis detection logic:
 * 1. Explicit independent: scale.y.independent = true
 * 2. Different scale keys: scale.y.key = 'left' vs scale.y.key = 'right'
 *
 * @param view The view object containing markState
 * @returns Complete independent scale information
 */
export function calculateAllIndependentScaleInfo(
  view: G2ViewDescriptor,
): IndependentScaleInfo {
  const marks = Array.from(view.markState.keys());
  const hasIndependentX = hasIndependentXYScale('x', marks);
  const hasIndependentY = hasIndependentXYScale('y', marks);

  const marksWithSharedX: string[] = [];
  const marksWithIndependentX: string[] = [];
  const marksWithSharedY: string[] = [];
  const marksWithIndependentY: string[] = [];

  const markToXScaleMap = new Map<string, string>();
  const markToYScaleMap = new Map<string, string>();

  // Track scale key assignments
  const xScaleKeyMap = new Map<string, number>(); // key -> index
  const yScaleKeyMap = new Map<string, number>(); // key -> index
  let xIndex = 1;
  let yIndex = 1;

  // Single traversal to compute all classifications and mappings
  for (const [mark] of view.markState.entries()) {
    const markKey = mark.key;

    // X axis processing
    const xScaleKey = (mark?.scale?.x?.key as string) || 'x';
    const hasExplicitIndependentX = !!mark?.scale?.x?.independent;

    if (hasExplicitIndependentX || (hasIndependentX && xScaleKey !== 'x')) {
      marksWithIndependentX.push(markKey);

      // Assign scale name based on key
      // Always use indexed names (x1, x2, ...) to avoid collision with shared 'x'
      if (!xScaleKeyMap.has(xScaleKey)) {
        xScaleKeyMap.set(xScaleKey, xIndex++);
      }
      const scaleIndex = xScaleKeyMap.get(xScaleKey);
      markToXScaleMap.set(markKey, `x${scaleIndex}`);
    } else {
      marksWithSharedX.push(markKey);
      markToXScaleMap.set(markKey, 'x');
    }

    // Y axis processing
    const yScaleKey = (mark?.scale?.y?.key as string) || 'y';
    const hasExplicitIndependentY = !!mark?.scale?.y?.independent;

    if (hasExplicitIndependentY || (hasIndependentY && yScaleKey !== 'y')) {
      marksWithIndependentY.push(markKey);

      // Assign scale name based on key
      // Always use indexed names (y1, y2, ...) to avoid collision with shared 'y'
      if (!yScaleKeyMap.has(yScaleKey)) {
        yScaleKeyMap.set(yScaleKey, yIndex++);
      }
      const scaleIndex = yScaleKeyMap.get(yScaleKey);
      markToYScaleMap.set(markKey, `y${scaleIndex}`);
    } else {
      marksWithSharedY.push(markKey);
      markToYScaleMap.set(markKey, 'y');
    }
  }

  return {
    hasIndependentX,
    hasIndependentY,
    marksWithSharedX,
    marksWithIndependentX,
    marksWithSharedY,
    marksWithIndependentY,
    markToXScaleMap,
    markToYScaleMap,
  };
}
