import { DisplayObject, Rect, Path } from '@antv/g';
import { subObject } from '../utils/helper';
import {
  selectG2Elements,
  selectPlotArea,
  createDatumof,
  useState,
  createValueof,
  setCursor,
  brushMousePosition,
  selectFacetG2Elements,
  mergeState,
  selectFacetViews,
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

function bboxOf(root: DisplayObject) {
  const { width, height } = root.getBBox();
  return [0, 0, width, height];
}

export function brush(
  root: DisplayObject,
  {
    brushed = () => {},
    brushended = () => {},
    brushcreated = () => {},
    extent = bboxOf(root),
    brushRegion = (x, y, x1, y1, extent) => [x, y, x1, y1],
    reverse = false,
    fill = '#777',
    fillOpacity = '0.3',
    stroke = '#fff',
    ...style
  }: Record<string, any>,
) {
  let start = null; // Start point of mask.
  let end = null; // End point of mask.
  let moveStart = null; // Start point of moving mask.
  let mask = null; // Mask instance.
  let background = null;
  let resizing = false;

  const [originX, originY, width, height] = extent;

  setCursor(root, 'crosshair');
  root.style.draggable = true; // Make it response to drag event.

  // Remove old mask and init new mask.
  const initMask = (x, y) => {
    if (mask) mask.remove();
    if (background) background.remove();
    start = [x, y];
    if (reverse) return initReverseMask();
    initNormalMask();
  };

  const initReverseMask = () => {
    background = new Path({
      style: {
        ...style,
        fill,
        fillOpacity,
        stroke,
        pointerEvents: 'none',
      },
    });
    mask = new Rect({
      // @ts-ignore
      style: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        draggable: true,
      },
      className: 'mask',
    });
    root.appendChild(background);
    root.appendChild(mask);
  };

  const initNormalMask = () => {
    mask = new Rect({
      // @ts-ignore
      style: {
        x: 0,
        y: 0,
        ...style,
        fill,
        fillOpacity,
        stroke,
        draggable: true, // Make it response to drag event.
      },
      className: 'mask',
    });
    root.appendChild(mask);
  };

  // Remove mask and reset states.
  const removeMask = () => {
    if (mask) mask.remove();
    if (background) background.remove();
    start = null;
    end = null;
    moveStart = null;
    resizing = false;
    mask = null;
    background = null;
    brushended();
  };

  // Update mask and invoke brushended callback.
  const updateMask = (start, end) => {
    const [x, y, x1, y1] = normalizeBounds(
      start[0],
      start[1],
      end[0],
      end[1],
      extent,
    );
    const [fx, fy, fx1, fy1] = brushRegion(x, y, x1, y1, extent);
    if (reverse) updateReverseMask(fx, fy, fx1, fy1);
    else updateNormalMask(fx, fy, fx1, fy1);
    brushed(fx, fy, fx1, fy1);
    return [fx, fy, fx1, fy1];
  };

  const updateNormalMask = (x, y, x1, y1) => {
    mask.style.x = x;
    mask.style.y = y;
    mask.style.width = x1 - x;
    mask.style.height = y1 - y;
  };

  const updateReverseMask = (x, y, x1, y1) => {
    background.style.d = `
      M${originX},${originY}L${width},${originY}L${width},${height}L${originX},${height}Z
      M${x},${y}L${x},${y1}L${x1},${y1}L${x1},${y}Z
    `;
    mask.style.x = x;
    mask.style.y = y;
    mask.style.width = x1 - x;
    mask.style.height = y1 - y;
  };

  // Move and update mask.
  const moveMask = (current) => {
    const clip = (dt, start, end, min, max) => {
      if (dt + start < min) return min - start;
      if (dt + end > max) return max - end;
      return dt;
    };
    const dx = current[0] - moveStart[0];
    const dy = current[1] - moveStart[1];
    const dx1 = clip(dx, start[0], end[0], originX, width);
    const dy1 = clip(dy, start[1], end[1], originY, height);
    const currentStart = [start[0] + dx1, start[1] + dy1];
    const currentEnd = [end[0] + dx1, end[1] + dy1];
    updateMask(currentStart, currentEnd);
  };

  // If target is plot area, create mask.
  // If target is mask, about to update position.
  const dragstart = (event) => {
    const { target } = event;
    const [offsetX, offsetY] = brushMousePosition(root, event);
    if (target === mask) {
      moveStart = [offsetX, offsetY];
      return;
    }
    initMask(offsetX, offsetY);
    resizing = true;
  };

  // If target is plot area, resize mask.
  // If target is mask, move mask.
  const drag = (event) => {
    const mouse = brushMousePosition(root, event);
    if (!start) return;
    if (moveStart) return moveMask(mouse);
    updateMask(start, mouse);
  };

  // If target is plot area, finish resizing.
  // If target is mask, finish moving mask.
  const dragend = (event) => {
    if (moveStart) {
      moveStart = null;
      // Update start and end;
      const { x, y, width, height } = mask.style;
      start = [x, y];
      end = [x + width, y + height];
      return;
    }
    end = brushMousePosition(root, event);
    const [fx, fy, fx1, fy1] = updateMask(start, end);
    resizing = false;
    brushcreated(fx, fy, fx1, fy1);
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

  const pointerleave = () => {
    setCursor(root, 'default');
  };

  root.addEventListener('dragstart', dragstart);
  root.addEventListener('drag', drag);
  root.addEventListener('dragend', dragend);
  root.addEventListener('click', click);
  root.addEventListener('pointermove', pointermove);
  root.addEventListener('pointerleave', pointerleave);

  return {
    mask,
    remove() {
      if (mask) removeMask();
    },
    destroy() {
      if (mask) removeMask();
      root.removeEventListener('dragstart', dragstart);
      root.removeEventListener('drag', drag);
      root.removeEventListener('dragend', dragend);
      root.removeEventListener('click', click);
      root.removeEventListener('pointermove', pointermove);
      root.removeEventListener('pointerleave', pointerleave);
    },
  };
}

function selectSiblingViews(target, viewInstances, brushKey) {
  return viewInstances.filter((d) => {
    if (d === target) return false;
    const { interaction = {} } = d.options;
    return Object.values(interaction as Record<string, any>).find(
      (d) => d.brushKey === brushKey,
    );
  });
}

function selectSiblingContainers(target, viewInstances, brushKey) {
  return selectSiblingViews(target, viewInstances, brushKey).map((d) =>
    selectPlotArea(d.container),
  );
}

function selectSiblingOptions(target, viewInstances, brushKey) {
  return selectSiblingViews(target, viewInstances, brushKey).map(
    (d) => d.options,
  );
}

/**
 * @todo Brush over view for series view.
 * @todo Test perf.
 */
export function brushHighlight(
  root,
  {
    elements: elementof,
    siblings: siblingsof = (root) => [],
    datum,
    brushRegion,
    extent: optionalExtent,
    reverse,
    series = false,
    key = (d) => d,
    bboxOf = (root) => {
      const { x, y, width, height } = root.style;
      return { x, y, width, height };
    },
    state = {},
    ...rest
  },
) {
  const elements = elementof(root);
  const siblings = siblingsof(root);
  const siblingElements = siblings.flatMap(elementof);
  const valueof = createValueof(elements, datum);
  const brushStyle = subObject(rest, 'mask');
  const { setState, removeState } = useState(state, valueof);
  const clonedElement = new Map();
  const {
    width: rootWidth,
    height: rootHeight,
    x: ordinalX = 0,
    y: ordinalY = 0,
  } = bboxOf(root);
  const extent = optionalExtent
    ? optionalExtent
    : [0, 0, rootWidth, rootHeight];

  const brushended = () => {
    for (const element of [...elements, ...siblingElements]) {
      removeState(element, 'active', 'inactive');
    }
  };

  const brushed = (x, y, x1, y1) => {
    // Hide brush for the sibling view.
    for (const sibling of siblings) sibling.brush?.remove();

    // Store the key of the active element.
    const keys = new Set();

    // Highlight and store selected elements.
    for (const element of elements) {
      const { min, max } = element.getLocalBounds();
      const [ex, ey] = min;
      const [ex1, ey1] = max;
      if (!intersect([ex, ey, ex1, ey1], [x, y, x1, y1])) {
        setState(element, 'inactive');
      } else {
        setState(element, 'active');
        keys.add(key(element));
      }
    }

    // Highlight elements with same key in sibling view.
    for (const element of siblingElements) {
      if (keys.has(key(element))) setState(element, 'active');
      else setState(element, 'inactive');
    }
  };

  const seriesBrushend = () => {
    for (const element of elements) removeState(element, 'inactive');
    for (const cloned of clonedElement.values()) cloned.remove();
    clonedElement.clear();
  };

  const seriesBrushed = (x, y, x1, y1) => {
    const clone = (element) => {
      const cloned = element.cloneNode();
      cloned.__data__ = element.__data__;
      element.parentNode.appendChild(cloned);
      clonedElement.set(element, cloned);
      return cloned;
    };
    for (const element of elements) {
      const cloned = clonedElement.get(element) || clone(element);
      cloned.style.clipPath = new Rect({
        style: {
          x: x + ordinalX,
          y: y + ordinalY,
          width: x1 - x,
          height: y1 - y,
        },
      });
      setState(element, 'inactive');
      setState(cloned, 'active');
    }
  };

  return brush(root, {
    ...brushStyle,
    extent,
    brushRegion,
    reverse,
    brushended: series ? seriesBrushend : brushended,
    brushed: series ? seriesBrushed : brushed,
  });
}

export function BrushHighlight({ facet, brushKey, ...rest }) {
  return (target, viewInstances) => {
    const { container, view, options } = target;
    const plotArea = selectPlotArea(container);
    const defaultOptions = {
      maskFill: '#777',
      maskFillOpacity: '0.3',
      maskStroke: '#fff',
      reverse: false,
    };
    const defaultStates = ['active', ['inactive', { opacity: 0.5 }]];

    if (facet) {
      const bbox = plotArea.getBounds();
      const x = bbox.min[0];
      const y = bbox.min[1];
      const x1 = bbox.max[0];
      const y1 = bbox.max[1];
      return brushHighlight(plotArea.parentNode.parentNode, {
        elements: () => selectFacetG2Elements(target, viewInstances),
        datum: createDatumof(
          selectFacetViews(target, viewInstances).map((d) => d.view),
        ),
        brushRegion: (x, y, x1, y1) => [x, y, x1, y1],
        extent: [x, y, x1, y1],
        state: mergeState(
          selectFacetViews(target, viewInstances).map((d) => d.options),
          defaultStates,
        ),
        ...defaultOptions,
        ...rest,
      });
    }

    const brush = brushHighlight(plotArea, {
      elements: selectG2Elements,
      key: (element) => element.__data__.key,
      siblings: () => selectSiblingContainers(target, viewInstances, brushKey),
      datum: createDatumof([
        view,
        ...selectSiblingViews(target, viewInstances, brushKey).map(
          (d) => d.view,
        ),
      ]),
      brushRegion: (x, y, x1, y1) => [x, y, x1, y1],
      extent: undefined,
      state: mergeState(
        [options, ...selectSiblingOptions(target, viewInstances, brushKey)],
        defaultStates,
      ),
      ...defaultOptions,
      ...rest,
    });

    // Bind brush to the view it belongs to.
    //@ts-ignore
    plotArea.brush = brush;

    return () => brush.destroy();
  };
}
