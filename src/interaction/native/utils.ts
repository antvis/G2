import { DisplayObject, Path } from '@antv/g';
import { path as d3Path } from 'd3-path';
import { subObject } from '../../utils/helper';
import { select } from '../../utils/selection';
import { mapObject } from '../../utils/array';
import { G2ViewDescriptor } from '../../runtime';

/**
 * Given root of chart returns elements to be manipulated
 */
export function selectG2Elements(root: DisplayObject): DisplayObject[] {
  return select(root).selectAll('.element').nodes();
}

export function applyDefaultsSelectedStyle(
  style: Record<string, any>,
): Record<string, any> {
  if (!style || Object.keys(style).length === 0) {
    return { selectedLineWidth: 1, selectedStroke: '#000' };
  }
  return style;
}

export function createDatumof(view: G2ViewDescriptor) {
  const marks = Array.from(view.markState.keys());
  const keyData = new Map(marks.map((mark) => [mark.key, mark.data]));
  return (element) => {
    const { index, markKey } = element.__data__;
    const data = keyData.get(markKey);
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
) {
  const STATES = '__states__';
  const ORIGINAL = '__ordinal__';

  // Mix style for each state and apply it to element.
  const updateState = (element) => {
    const { [STATES]: states = [], [ORIGINAL]: ordinal = {} } = element;
    const stateStyle = states.reduce(
      (mixedStyle, state) => ({
        ...mixedStyle,
        ...subObject(style, state),
      }),
      ordinal,
    );
    if (Object.keys(stateStyle).length === 0) return;
    for (const [key, value] of Object.entries(stateStyle)) {
      const currentValue = element.getAttribute(key);
      const v = valueof(value, element);
      element.setAttribute(key, v);
      // Store the attribute if it does not exist in ordinal.
      if (!(key in ordinal)) ordinal[key] = currentValue;
    }
    element[ORIGINAL] = ordinal;
  };

  const initState = (element) => {
    if (element[STATES]) return;
    element[STATES] = [];
    return;
  };

  /**
   * Append the states and update element.
   */
  const setState = (element, ...states) => {
    initState(element);
    for (const state of states) {
      element[STATES].push(state);
    }
    updateState(element);
  };

  /**
   * Remove the states and update element.
   */
  const removeState = (element, ...states) => {
    initState(element);
    for (const state of states) {
      const index = element[STATES].indexOf(state);
      if (state !== -1) {
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

export function createValueof(elements, datum) {
  const elementIndex = new Map(elements.map((d, i) => [d, i]));
  return (d, e) => {
    if (typeof d !== 'function') return d;
    const i = elementIndex.get(e);
    const fe = datum ? datum(e) : e;
    const fa = datum ? elements.map(datum) : elements;
    return d(fe, i, fa);
  };
}

export function renderLink(
  root: DisplayObject,
  { valueof = (d, element) => d, ...style },
) {
  const LINK_CLASS_NAME = 'element-link';
  const append = (elements) => {
    if (elements.length <= 1) return;
    const elementBBoxs = elements.map((d) => [d, d.getBBox()]);

    // Sort elements from top to bottom, left to right.
    elementBBoxs.sort(([, b0], [, b1]) => {
      const { x: x0, y: y0 } = b0;
      const { x: x1, y: y1 } = b1;
      return x0 - x1 === 0 ? y0 - y1 : x0 - x1;
    });

    for (let i = 1; i < elementBBoxs.length; i++) {
      const p = d3Path();
      const [e0, b0] = elementBBoxs[i - 1];
      const [, b1] = elementBBoxs[i];
      p.moveTo(b0.x + b0.width, b0.y);
      p.lineTo(b1.x, b1.y);
      p.lineTo(b1.x, b1.y + b1.height);
      p.lineTo(b0.x + b0.width, b0.y + b0.height);
      p.closePath();
      const { fill = e0.getAttribute('fill'), ...rest } = mapObject(
        style,
        (d) => valueof(d, e0),
      );
      const path = new Path({
        className: LINK_CLASS_NAME,
        style: {
          d: p.toString(),
          fill,
          ...rest,
        },
      });
      root.appendChild(path);
    }
  };

  const remove = () => {
    const links = root.getElementsByClassName(LINK_CLASS_NAME);
    for (const link of links) link.remove();
  };

  return [append, remove] as const;
}
