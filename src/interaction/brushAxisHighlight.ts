import { Rect } from '@antv/g';
import { subObject } from '../utils/helper';
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
        x: cross ? minX : lineX - size / 2,
        width: cross ? size / 2 : size,
        y: minY,
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
        x: minX,
        width: maxX - minX,
        // If it is not cross, draw brush in both side of axisLine,
        // otherwise the draw brush within bounds area.
        y: cross ? minY : lineY - size,
        height: cross ? size : size * 2,
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
    ...rest // style
  },
) {
  const elements = elementsOf(root);
  const axes = axesOf(root);
  const valueof = createValueof(elements, datum);
  const { setState } = useState(state, valueof);
  const axisExtent = new Map();
  const brushStyle = subObject(rest, 'mask');

  // Only some of shape's points in all mask, it is selected.
  const brushed = (points) =>
    Array.from(axisExtent.values()).every(([x, y, x1, y1]) =>
      points.some(([x0, y0]) => {
        return x0 >= x && x0 <= x1 && y0 >= y && y0 <= y1;
      }),
    );

  // Update element when brush changed.
  const updateElement = () => {
    for (const element of elements) {
      const points = pointsOf(element);
      if (brushed(points)) setState(element, 'active');
      else setState(element, 'inactive');
    }
  };

  // Distinguish between parallel coordinates and normal charts.
  const cross = axes.some(isHorizontal) && axes.some((d) => !isHorizontal(d));
  for (const axis of axes) {
    const createBrush = isHorizontal(axis) ? horizontalBrush : verticalBrush;
    const { hotZone, brushRegion, extent } = createBrush(axis, {
      offsetY,
      offsetX,
      cross,
      zIndex: 999, // Pin mask to top.
      fill: 'transparent', // Make it interactive.
    });
    axis.parentNode.appendChild(hotZone);
    brush(hotZone, {
      ...brushStyle,
      reverse,
      brushRegion,
      brushended() {
        axisExtent.delete(axis);
        updateElement();
      },
      brushed(x, y, x1, y1) {
        axisExtent.set(axis, extent(x, y, x1, y1));
        updateElement();
      },
    });
  }
}

/**
 * @todo Support mask size.
 */
export function BrushAxisHighlight(options) {
  return (target) => {
    const { container, view, options: viewOptions } = target;
    const plotArea = selectPlotArea(container);
    const { x: x0, y: y0 } = plotArea.getBBox();
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
      ...options,
    });
  };
}
