import { DisplayObject, Rect } from '@antv/g';
import { subObject } from '../../utils/helper';
import {
  selectG2Elements,
  selectPlotArea,
  createDatumof,
  useState,
  createValueof,
  setCursor,
  mousePositionClamp,
} from './utils';

function intersect(bbox1: any, bbox2: any) {
  const [minX1, minY1, maxX1, maxY1] = bbox1;
  const [minX2, minY2, maxX2, maxY2] = bbox2;
  return !(minX2 > maxX1 || maxX2 < minX1 || minY2 > maxY1 || maxY2 < minY1);
}

function normalizeBounds(x, y, x1, y1, extent) {
  const [minX, minY, maxX, maxY] = extent;
  return [
    Math.max(minX, Math.min(x, x1)),
    Math.max(minY, Math.min(y, y1)),
    Math.min(maxX, Math.max(x, x1)),
    Math.min(maxY, Math.max(y, y1)),
  ];
}

export function brush(
  root: DisplayObject,
  { brushed, brushend, brushRegion, ...style }: Record<string, any>,
) {
  let start = null; // Start point of mask.
  let end = null; // End point of mask.
  let moveStart = null; // Start point of moving mask.
  let mask = null; // Mask instance.
  let resizing = false;

  const { width, height } = root.getBBox();

  setCursor(root, 'crosshair');
  root.style.draggable = true; // Make it response to drag event.

  // Remove old mask and init new mask.
  const initMask = (x, y) => {
    if (mask) mask.remove();
    start = [x, y];
    mask = new Rect({
      // @ts-ignore
      style: {
        ...style,
        draggable: true, // Make it response to drag event.
      },
      className: 'mask',
    });
    root.appendChild(mask);
  };

  // Remove mask and reset states.
  const removeMask = () => {
    mask.remove();
    start = null;
    mask = null;
    end = null;
    moveStart = null;
    resizing = false;
    brushend();
  };

  // Update mask and invoke brushend callback.
  const updateMask = (start, end) => {
    const extent = [0, 0, width, height];
    const [x, y, x1, y1] = normalizeBounds(
      start[0],
      start[1],
      end[0],
      end[1],
      extent,
    );
    const [fx, fy, fx1, fy1] = brushRegion(x, y, x1, y1, extent);
    mask.style.x = fx;
    mask.style.y = fy;
    mask.style.width = fx1 - fx;
    mask.style.height = fy1 - fy;
    brushed(fx, fy, fx1, fy1);
  };

  // Move and update mask.
  const moveMask = (current) => {
    const clip = (dt, start, end, min, max) => {
      if (dt + start < min) return -start;
      if (dt + end > max) return max - end;
      return dt;
    };
    const dx = current[0] - moveStart[0];
    const dy = current[1] - moveStart[1];
    const dx1 = clip(dx, start[0], end[0], 0, width);
    const dy1 = clip(dy, start[1], end[1], 0, height);
    const currentStart = [start[0] + dx1, start[1] + dy1];
    const currentEnd = [end[0] + dx1, end[1] + dy1];
    updateMask(currentStart, currentEnd);
  };

  // If target is plot area, create mask.
  // If target is mask, about to update position.
  const dragstart = (event) => {
    const { target } = event;
    const [offsetX, offsetY] = mousePositionClamp(root, event);
    if (target === mask) return (moveStart = [offsetX, offsetY]);
    initMask(offsetX, offsetY);
    resizing = true;
  };

  // If target is plot area, resize mask.
  // If target is mask, move mask.
  const drag = (event) => {
    const mouse = mousePositionClamp(root, event);
    if (!start) return;
    if (moveStart) return moveMask(mouse);
    updateMask(start, mouse);
  };

  // If target is plot area, finish resizing.
  // If target is mask, finish moving mask.
  const dragend = (event) => {
    if (moveStart) return (moveStart = null);
    end = mousePositionClamp(root, event);
    updateMask(start, end);
    resizing = false;
  };

  // Hide mask.
  const click = (event) => {
    const { target } = event;
    if (mask && target !== mask) removeMask();
  };

  // Update cursor depends on hovered element.
  const pointermove = (event) => {
    const { target } = event;
    if (target === mask && !resizing) setCursor(root, 'move');
    else setCursor(root, 'crosshair');
  };

  root.addEventListener('dragstart', dragstart);
  root.addEventListener('drag', drag);
  root.addEventListener('dragend', dragend);
  root.addEventListener('click', click);
  root.addEventListener('pointermove', pointermove);

  return () => {
    if (mask) mask.remove();
    root.removeEventListener('dragstart', dragstart);
    root.removeEventListener('drag', drag);
    root.removeEventListener('dragend', dragend);
    root.removeEventListener('click', click);
    root.removeEventListener('pointermove', pointermove);
  };
}

export function brushHighlight(
  root,
  { elements: elementof, datum, brushRegion, ...rest },
) {
  const elements = elementof(root);
  const valueof = createValueof(elements, datum);
  const brushStyle = subObject(rest, 'mask');
  const { setState, removeState } = useState(rest, valueof);
  return brush(root, {
    ...brushStyle,
    brushRegion,
    brushend: () => {
      for (const element of elements) {
        removeState(element, 'highlighted', 'unhighlighted');
      }
    },
    brushed: (x, y, x1, y1) => {
      for (const element of elements) {
        const { min, max } = element.getLocalBounds();
        const [ex, ey] = min;
        const [ex1, ey1] = max;
        if (!intersect([ex, ey, ex1, ey1], [x, y, x1, y1])) {
          setState(element, 'unhighlighted');
        } else {
          setState(element, 'highlighted');
        }
      }
    },
  });
}

export function BrushHighlight(options) {
  return (context) => {
    const { container, view } = context;
    const plotArea = selectPlotArea(container);
    return brushHighlight(plotArea, {
      elements: selectG2Elements,
      datum: createDatumof(view),
      brushRegion: (x, y, x1, y1) => [x, y, x1, y1],
      maskFill: '#777',
      maskFillOpacity: '0.3',
      maskStroke: '#fff',
      unhighlightedOpacity: 0.5,
      ...options,
    });
  };
}
