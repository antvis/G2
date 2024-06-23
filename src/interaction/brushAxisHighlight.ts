import { Rect } from '@antv/g';
import { subObject } from '../utils/helper';
import { domainOf, pixelsOf } from '../utils/scale';
import { brush } from './brushHighlight';
import { brushXRegion } from './brushXHighlight';
import { brushYRegion } from './brushYHighlight';
import {
  selectG2Elements,
  createDatumof,
  createValueof,
  useState,
  selectPlotArea,
  mergeState,
} from './utils';

export const AXIS_CLASS_NAME = 'axis';

export const AXIS_LINE_CLASS_NAME = 'axis-line';

export const AXIS_MAIN_CLASS_NAME = 'axis-main-group';

export const AXIS_HOT_AREA_CLASS_NAME = 'axis-hot-area';

function axesOf(container) {
  return container.getElementsByClassName(AXIS_CLASS_NAME);
}

function lineOf(axis) {
  return axis.getElementsByClassName(AXIS_LINE_CLASS_NAME)[0];
}

function mainGroupOf(axis) {
  return axis.getElementsByClassName(AXIS_MAIN_CLASS_NAME)[0];
}

// Use the bounds of main group of axis as the bounds of axis,
// get rid of grid and title.
function boundsOfAxis(axis) {
  return mainGroupOf(axis).getLocalBounds();
}

// Brush for vertical axis.
function verticalBrush(axis, { cross, offsetX, offsetY, ...style }) {
  const bounds = boundsOfAxis(axis);
  const axisLine = lineOf(axis);
  const [lineX] = axisLine.getLocalBounds().min;
  const [minX, minY] = bounds.min;
  const [maxX, maxY] = bounds.max;
  const size = (maxX - minX) * 2;
  return {
    brushRegion: brushYRegion,
    hotZone: new Rect({
      className: AXIS_HOT_AREA_CLASS_NAME,
      style: {
        // If it is not cross, draw brush in both side of axisLine,
        // otherwise the draw brush within bounds area.
        width: cross ? size / 2 : size,
        transform: `translate(${(cross ? minX : lineX - size / 2).toFixed(
          2,
        )}, ${minY})`,
        height: maxY - minY,
        ...style,
      },
    }),
    extent: cross
      ? // If it is cross, the x range is ignored.
        (x, y, x1, y1) => [-Infinity, y, Infinity, y1]
      : (x, y, x1, y1) => [
          Math.floor(minX - offsetX),
          y,
          Math.ceil(maxX - offsetX),
          y1,
        ],
  };
}

// Brush for horizontal axis.
function horizontalBrush(axis, { offsetY, offsetX, cross = false, ...style }) {
  const bounds = boundsOfAxis(axis);
  const axisLine = lineOf(axis);
  const [, lineY] = axisLine.getLocalBounds().min;
  const [minX, minY] = bounds.min;
  const [maxX, maxY] = bounds.max;
  const size = maxY - minY;
  return {
    brushRegion: brushXRegion,
    hotZone: new Rect({
      className: AXIS_HOT_AREA_CLASS_NAME,
      style: {
        width: maxX - minX,
        // If it is not cross, draw brush in both side of axisLine,
        // otherwise the draw brush within bounds area.
        height: cross ? size : size * 2,
        transform: `translate(${minX}, ${cross ? minY : lineY - size})`,
        ...style,
      },
    }),
    extent: cross
      ? // If it is cross, the y range is ignored.
        (x, y, x1, y1) => [x, -Infinity, x1, Infinity]
      : (x, y, x1, y1) => [
          x,
          Math.floor(minY - offsetY),
          x1,
          Math.ceil(maxY - offsetY),
        ],
  };
}

export function brushAxisHighlight(
  root,
  {
    axes: axesOf, // given root, return axes
    elements: elementsOf, // given root, return elements
    points: pointsOf, // given shape, return control points
    horizontal: isHorizontal, // given axis, return direction
    datum, // given shape, return datum
    offsetY, // offsetY for shape area
    offsetX, // offsetX for shape area
    reverse = false,
    state = {},
    emitter,
    coordinate,
    ...rest // style
  },
) {
  const elements = elementsOf(root);
  const axes = axesOf(root);
  const valueof = createValueof(elements, datum);
  const { setState, removeState } = useState(state, valueof);
  const axisExtent = new Map();
  const brushStyle = subObject(rest, 'mask');

  // Only some of shape's points in all mask, it is selected.
  const brushed = (points) =>
    Array.from(axisExtent.values()).every(([x, y, x1, y1]) =>
      points.some(([x0, y0]) => {
        return x0 >= x && x0 <= x1 && y0 >= y && y0 <= y1;
      }),
    );

  const scales = axes.map((d) => d.attributes.scale);

  const extentOf = (D) => (D.length > 2 ? [D[0], D[D.length - 1]] : D);

  const indexDomain = new Map<number, [any, any]>();

  const initIndexDomain = () => {
    indexDomain.clear();
    for (let i = 0; i < axes.length; i++) {
      const scale = scales[i];
      const { domain } = scale.getOptions();
      indexDomain.set(i, extentOf(domain));
    }
  };

  initIndexDomain();

  // Update element when brush changed.
  const updateElement = (i, emit) => {
    const selectedElements = [];
    for (const element of elements) {
      const points = pointsOf(element);
      if (brushed(points)) {
        setState(element, 'active');
        selectedElements.push(element);
      } else setState(element, 'inactive');
    }

    indexDomain.set(i, selectionOf(selectedElements, i));

    if (!emit) return;

    // Emit events.
    const selection = () => {
      if (!cross) return Array.from(indexDomain.values());
      const S = [];
      for (const [index, domain] of indexDomain) {
        const scale = scales[index];
        const { name } = scale.getOptions();
        if (name === 'x') S[0] = domain;
        else S[1] = domain;
      }
      return S;
    };
    emitter.emit('brushAxis:highlight', {
      nativeEvent: true,
      data: {
        selection: selection(),
      },
    });
  };

  const clearElement = (emit) => {
    for (const element of elements) removeState(element, 'active', 'inactive');
    initIndexDomain();
    if (!emit) return;
    emitter.emit('brushAxis:remove', { nativeEvent: true });
  };

  const selectionOf = (selected, i) => {
    const scale = scales[i];
    const { name } = scale.getOptions();
    const domain = selected.map((d) => {
      const data = d.__data__;
      return scale.invert(data[name]);
    });
    return extentOf(domainOf(scale, domain));
  };

  // Distinguish between parallel coordinates and normal charts.
  const cross = axes.some(isHorizontal) && axes.some((d) => !isHorizontal(d));
  const handlers = [];
  for (let i = 0; i < axes.length; i++) {
    const axis = axes[i];
    const createBrush = isHorizontal(axis) ? horizontalBrush : verticalBrush;
    const { hotZone, brushRegion, extent } = createBrush(axis, {
      offsetY,
      offsetX,
      cross,
      zIndex: 999, // Pin mask to top.
      fill: 'transparent', // Make it interactive.
    });
    axis.parentNode.appendChild(hotZone);

    const brushHandler = brush(hotZone, {
      ...brushStyle,
      reverse,
      brushRegion,
      brushended(emit) {
        axisExtent.delete(axis);
        if (Array.from(axisExtent.entries()).length === 0) clearElement(emit);
        else updateElement(i, emit);
      },
      brushed(x, y, x1, y1, emit) {
        axisExtent.set(axis, extent(x, y, x1, y1));
        updateElement(i, emit);
      },
    });
    handlers.push(brushHandler);
  }

  const onRemove = (event: any = {}) => {
    const { nativeEvent } = event;
    if (nativeEvent) return;
    handlers.forEach((d) => d.remove(false));
  };

  const rangeOf = (domain, scale, axis) => {
    const [d0, d1] = domain;
    const maybeStep = (scale) => (scale.getStep ? scale.getStep() : 0);
    const x = abstractOf(d0, scale, axis);
    const x1 = abstractOf(d1, scale, axis) + maybeStep(scale);
    if (isHorizontal(axis)) return [x, -Infinity, x1, Infinity];
    return [-Infinity, x, Infinity, x1];
  };

  const abstractOf = (x, scale, axis) => {
    const { height, width } = coordinate.getOptions();
    const scale1 = scale.clone();
    if (isHorizontal(axis)) scale1.update({ range: [0, width] });
    else scale1.update({ range: [height, 0] });
    return scale1.map(x);
  };

  const onHighlight = (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) return;
    const { selection } = event.data;
    for (let i = 0; i < handlers.length; i++) {
      const domain = selection[i];
      const handler = handlers[i];
      const axis = axes[i];
      if (domain) {
        const scale = scales[i];
        handler.move(...rangeOf(domain, scale, axis), false);
      } else {
        handler.remove(false);
      }
    }
  };

  emitter.on('brushAxis:remove', onRemove);
  emitter.on('brushAxis:highlight', onHighlight);

  return () => {
    handlers.forEach((d) => d.destroy());
    emitter.off('brushAxis:remove', onRemove);
    emitter.off('brushAxis:highlight', onHighlight);
  };
}

/**
 * @todo Support mask size.
 */
export function BrushAxisHighlight(options) {
  return (target, _, emitter) => {
    const { container, view, options: viewOptions } = target;
    const plotArea = selectPlotArea(container);
    const { x: x0, y: y0 } = plotArea.getBBox();
    const { coordinate } = view;
    return brushAxisHighlight(container, {
      elements: selectG2Elements,
      axes: axesOf,
      offsetY: y0,
      offsetX: x0,
      points: (element) => element.__data__.points,
      horizontal: (axis) => {
        const {
          startPos: [sx, sy],
          endPos: [ex, ey],
        } = axis.attributes;
        // attention, non-horizontal does not mean vertical
        // it may has a specific degree angle
        return sx !== ex && sy === ey;
      },
      datum: createDatumof(view),
      state: mergeState(viewOptions, [
        'active',
        ['inactive', { opacity: 0.5 }],
      ]),
      coordinate,
      emitter,
      ...options,
    });
  };
}
