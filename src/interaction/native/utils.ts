import { DisplayObject, Path, Rect } from '@antv/g';
import { path as d3Path } from 'd3-path';
import { subObject } from '../../utils/helper';
import { select } from '../../utils/selection';
import { mapObject } from '../../utils/array';
import {
  G2ViewDescriptor,
  ELEMENT_CLASS_NAME,
  PLOT_CLASS_NAME,
} from '../../runtime';
import { isOrdinalScale } from '../../utils/scale';

/**
 * Given root of chart returns elements to be manipulated
 */
export function selectG2Elements(root: DisplayObject): DisplayObject[] {
  return select(root).selectAll(`.${ELEMENT_CLASS_NAME}`).nodes();
}

export function selectFacetG2Elements(target, viewInstances): DisplayObject[] {
  const facetInstances = viewInstances.filter(
    (d) => d !== target && d.options.parentKey === target.options.key,
  );
  return facetInstances.flatMap(({ container }) => selectG2Elements(container));
}

export function selectPlotArea(root: DisplayObject): DisplayObject {
  return select(root).select(`.${PLOT_CLASS_NAME}`).node();
}

export function mousePosition(target, event) {
  const { offsetX, offsetY } = event;
  const bbox = target.getBounds();
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

export function applyDefaultsHighlightedStyle(
  style: Record<string, any>,
): Record<string, any> {
  if (!style || Object.keys(style).length === 0) {
    return { highlightedLineWidth: 1, highlightedStroke: '#000' };
  }
  return style;
}

export function createColorKey(view) {
  return (element) => element.__data__.color;
}

export function createXKey(view) {
  const { x: scaleX } = view.scale;
  return (element) => {
    const { x } = element.__data__;
    return scaleX.invert(x);
  };
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
        ...subObject(style, state),
      }),
      original,
    );
    if (Object.keys(stateStyle).length === 0) return;
    for (const [key, value] of Object.entries(stateStyle)) {
      const currentValue = element.getAttribute(key);
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
  const append = (elements, key?) => {
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
        className: `${LINK_CLASS_NAME}${key ? ' ' + key : ''}`,
        style: {
          d: p.toString(),
          fill,
          ...rest,
        },
      });
      root.appendChild(path);
    }
  };

  const remove = (key?) => {
    const className = key || LINK_CLASS_NAME;
    const links = root.getElementsByClassName(className) || [];
    for (const link of links) link.remove();
  };

  return [append, remove] as const;
}

/**
 * @todo Different coordinates.
 * @todo Other marks link point, area, line, etc.
 */
export function renderBackground({
  background,
  scale,
  coordinate,
  valueof,
  padding = 0.001,
  ...rest
}) {
  const BACKGROUND_CLASS_NAME = 'element-background';

  // Don't have background.
  if (!background) return [() => {}, () => {}];

  const [width, height] = coordinate.getSize();

  const backgroundOf = (element) => {
    if (element.background) return element.background;
    const background = new Rect({
      // @ts-ignore
      style: {
        zIndex: -1,
      },
      className: BACKGROUND_CLASS_NAME,
    });
    element.background = background;
    element.parentNode.append(background);
    return background;
  };

  const extentOf = (scale, x) => {
    const ax = scale.invert(x);
    const mid = x + scale.getBandWidth(ax) / 2;
    const half = scale.getStep(ax) / 2;
    const offset = half * padding;
    return [mid - half + offset, mid + half - offset];
  };

  const sizeXOf = (element) => {
    const { x: scaleX } = scale;
    if (!isOrdinalScale(scaleX)) return [0, width];
    const { __data__: data } = element;
    const { x } = data;
    const [e1, e2] = extentOf(scaleX, x);
    const [x1] = coordinate.map([e1, 0]);
    const [x2] = coordinate.map([e2, 0]);
    return [x1, x2];
  };

  const sizeYOf = (element) => {
    const { y: scaleY } = scale;
    if (!isOrdinalScale(scaleY)) return [0, height];
    const { __data__: data } = element;
    const { y } = data;
    const [e1, e2] = extentOf(scaleY, y);
    const [, y1] = coordinate.map([0, e1]);
    const [, y2] = coordinate.map([0, e2]);
    return [y1, y2];
  };

  const dimensionOf = (element) => {
    const [x1, x2] = sizeXOf(element);
    const [y1, y2] = sizeYOf(element);
    return [x1, y1, x2 - x1, y2 - y1];
  };

  const append = (element) => {
    const [x, y, width, height] = dimensionOf(element);
    const background = backgroundOf(element);
    const {
      fill = '#CCD6EC',
      fillOpacity = 0.3,
      ...style
    } = mapObject(rest, (d) => valueof(d, element));
    background.style.x = x;
    background.style.y = y;
    background.style.width = width;
    background.style.height = height;
    for (const [name, key] of Object.entries({ ...style, fill, fillOpacity })) {
      background.style[name] = key;
    }
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
  if (dom?.style) dom.style.cursor = cursor;
}

export function restoreCursor(root) {
  setCursor(root, 'default');
}
