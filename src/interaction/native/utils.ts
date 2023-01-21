import { DisplayObject, Path, Rect } from '@antv/g';
import { path as d3Path } from 'd3-path';
import { sort } from 'd3-array';
import { subObject } from '../../utils/helper';
import { select } from '../../utils/selection';
import { mapObject } from '../../utils/array';
import {
  G2ViewDescriptor,
  ELEMENT_CLASS_NAME,
  PLOT_CLASS_NAME,
} from '../../runtime';
import { isOrdinalScale } from '../../utils/scale';
import { rect } from '../../shape/interval/color';

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

export function renderLink({
  link = false,
  valueof = (d, element) => d,
  ...style
}) {
  const LINK_CLASS_NAME = 'element-link';

  if (!link) return [() => {}, () => {}];

  const append = (elements) => {
    if (elements.length <= 1) return;
    const elementBBox = new Map<DisplayObject, any>(
      elements.map((d) => [d, d.getBBox()]),
    );

    // Sort elements from top to bottom, left to right.
    const sortedElements = sort<DisplayObject>(elements, (e0, e1) => {
      const b0: any = elementBBox.get(e0);
      const b1: any = elementBBox.get(e1);
      const { x: x0, y: y0 } = b0;
      const { x: x1, y: y1 } = b1;
      return x0 - x1 === 0 ? y0 - y1 : x0 - x1;
    });

    for (let i = 1; i < sortedElements.length; i++) {
      const p = d3Path();
      const e0 = sortedElements[i - 1];
      const e1 = sortedElements[i];
      const b0 = elementBBox.get(e0);
      const b1 = elementBBox.get(e1);
      p.moveTo(b0.x + b0.width, b0.y);
      p.lineTo(b1.x, b1.y);
      p.lineTo(b1.x, b1.y + b1.height);
      p.lineTo(b0.x + b0.width, b0.y + b0.height);
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

  const extentOf = (scale, x) => {
    const ax = scale.invert(x);
    const mid = x + scale.getBandWidth(ax) / 2;
    const half = scale.getStep(ax) / 2;
    const offset = half * padding;
    return [mid - half + offset, mid + half - offset];
  };

  const sizeXOf = (element) => {
    const { x: scaleX } = scale;
    if (!isOrdinalScale(scaleX)) return [0, 1];
    const { __data__: data } = element;
    const { x } = data;
    const [e1, e2] = extentOf(scaleX, x);
    return [e1, e2];
  };

  const sizeYOf = (element) => {
    const { y: scaleY } = scale;
    if (!isOrdinalScale(scaleY)) return [0, 1];
    const { __data__: data } = element;
    const { y } = data;
    const [e1, e2] = extentOf(scaleY, y);
    return [e1, e2];
  };

  const bandShapeOf = (element, style) => {
    const [x1, x2] = sizeXOf(element);
    const [y1, y2] = sizeYOf(element);
    const points = [
      [x1, y1],
      [x2, y1],
      [x2, y2],
      [x1, y2],
    ].map((d) => coordinate.map(d));
    const { __data__: data } = element;
    const { y: dy, y1: dy1 } = data;
    return rect(points, { y: dy, y1: dy1 }, coordinate, style);
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
      ...style
    } = mapObject(rest, (d) => valueof(d, element));
    const finalStyle = {
      ...style,
      fill,
      fillOpacity,
      zIndex,
    };
    const shapeOf = isOrdinalShape() ? bandShapeOf : cloneShapeOf;
    const shape = shapeOf(element, finalStyle);
    shape.className = BACKGROUND_CLASS_NAME;
    element.parentNode.appendChild(shape);
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
  if (dom?.style) dom.style.cursor = cursor;
}

export function restoreCursor(root) {
  setCursor(root, 'default');
}
