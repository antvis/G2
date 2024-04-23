import { DisplayObject, Rect, Path } from '@antv/g';
import { subObject, omitPrefixObject } from '../utils/helper';
import { selectionOf, pixelsOf } from '../utils/scale';
import { createElement } from '../utils/createElement';
import { G2Element, select, Selection } from '../utils/selection';
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

function applyStyle(selection: Selection, style: Record<string, any>) {
  for (const [key, value] of Object.entries(style)) {
    selection.style(key, value);
  }
}

const ResizableMask = createElement((g) => {
  const {
    x,
    y,
    width,
    height,
    class: className,
    renders = {},
    handleSize: size = 10,
    document,
    ...style
  } = g.attributes;

  if (
    !document ||
    width === undefined ||
    height === undefined ||
    x === undefined ||
    y === undefined
  )
    return;

  const half = size / 2;

  const renderRect = (g, options, document) => {
    if (!g.handle) {
      g.handle = document.createElement('rect');
      g.append(g.handle);
    }
    const { handle } = g;
    handle.attr(options);
    return handle;
  };

  const { render: handleNRender = renderRect, ...handleNStyle } = subObject(
    omitPrefixObject(style, 'handleNW', 'handleNE'),
    'handleN',
  );

  const { render: handleERender = renderRect, ...handleEStyle } = subObject(
    style,
    'handleE',
  );
  const { render: handleSRender = renderRect, ...handleSStyle } = subObject(
    omitPrefixObject(style, 'handleSE', 'handleSW'),
    'handleS',
  );
  const { render: handleWRender = renderRect, ...handleWStyle } = subObject(
    style,
    'handleW',
  );
  const { render: handleNWRender = renderRect, ...handleNWStyle } = subObject(
    style,
    'handleNW',
  );
  const { render: handleNERender = renderRect, ...handleNEStyle } = subObject(
    style,
    'handleNE',
  );
  const { render: handleSERender = renderRect, ...handleSEStyle } = subObject(
    style,
    'handleSE',
  );
  const { render: handleSWRender = renderRect, ...handleSWStyle } = subObject(
    style,
    'handleSW',
  );

  const renderHandle = (g, renderNode) => {
    const { id } = g;
    const handle = renderNode(g, g.attributes, document);
    handle.id = id;
    handle.style.draggable = true;
  };

  const appendHandle = (handleRender) => {
    return () => {
      const Node = createElement((g) => renderHandle(g, handleRender));
      return new Node({});
    };
  };

  const container = select(g)
    .attr('className', className)
    .style('transform', `translate(${x}, ${y})`)
    .style('draggable', true);

  container
    .maybeAppend('selection', 'rect')
    .style('draggable', true)
    .style('fill', 'transparent')
    .call(applyStyle, {
      width,
      height,
      ...omitPrefixObject(style, 'handle'),
      transform: undefined,
    });

  container
    .maybeAppend('handle-n', appendHandle(handleNRender))
    .style('x', half)
    .style('y', -half)
    .style('width', width - size)
    .style('height', size)
    .style('fill', 'transparent')
    .call(applyStyle, handleNStyle);

  container
    .maybeAppend('handle-e', appendHandle(handleERender))
    .style('x', width - half)
    .style('y', half)
    .style('width', size)
    .style('height', height - size)
    .style('fill', 'transparent')
    .call(applyStyle, handleEStyle);

  container
    .maybeAppend('handle-s', appendHandle(handleSRender))
    .style('x', half)
    .style('y', height - half)
    .style('width', width - size)
    .style('height', size)
    .style('fill', 'transparent')
    .call(applyStyle, handleSStyle);

  container
    .maybeAppend('handle-w', appendHandle(handleWRender))
    .style('x', -half)
    .style('y', half)
    .style('width', size)
    .style('height', height - size)
    .style('fill', 'transparent')
    .call(applyStyle, handleWStyle);

  container
    .maybeAppend('handle-nw', appendHandle(handleNWRender))
    .style('x', -half)
    .style('y', -half)
    .style('width', size)
    .style('height', size)
    .style('fill', 'transparent')
    .call(applyStyle, handleNWStyle);

  container
    .maybeAppend('handle-ne', appendHandle(handleNERender))
    .style('x', width - half)
    .style('y', -half)
    .style('width', size)
    .style('height', size)
    .style('fill', 'transparent')
    .call(applyStyle, handleNEStyle);

  container
    .maybeAppend('handle-se', appendHandle(handleSERender))
    .style('x', width - half)
    .style('y', height - half)
    .style('width', size)
    .style('height', size)
    .style('fill', 'transparent')
    .call(applyStyle, handleSEStyle);

  container
    .maybeAppend('handle-sw', appendHandle(handleSWRender))
    .style('x', -half)
    .style('y', height - half)
    .style('width', size)
    .style('height', size)
    .style('fill', 'transparent')
    .call(applyStyle, handleSWStyle);
});

export function brush(
  root: DisplayObject,
  {
    brushed = () => {},
    brushended = () => {},
    brushcreated = () => {},
    brushstarted = () => {},
    brushupdated = () => {},
    extent = bboxOf(root),
    brushRegion = (x, y, x1, y1, extent) => [x, y, x1, y1],
    reverse = false,
    fill = '#777',
    fillOpacity = '0.3',
    stroke = '#fff',
    selectedHandles = [
      'handle-n',
      'handle-e',
      'handle-s',
      'handle-w',
      'handle-nw',
      'handle-ne',
      'handle-se',
      'handle-sw',
    ],
    ...style
  }: Record<string, any>,
) {
  let start = null; // Start point of mask.
  let end = null; // End point of mask.
  let moveStart = null; // Start point of moving mask.
  let mask = null; // Mask instance.
  let background = null;
  let creating = false;

  const [originX, originY, width, height] = extent;

  setCursor(root, 'crosshair');
  root.style.draggable = true; // Make it response to drag event.

  // Remove old mask and init new mask.
  const initMask = (x, y, event) => {
    brushstarted(event);
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
    mask = new ResizableMask({
      // @ts-ignore
      style: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        draggable: true,
        document: root.ownerDocument,
      },
      className: 'mask',
    });
    root.appendChild(background);
    root.appendChild(mask);
  };

  const initNormalMask = () => {
    mask = new ResizableMask({
      // @ts-ignore
      style: {
        document: root.ownerDocument,
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
  const removeMask = (emit = true) => {
    if (mask) mask.remove();
    if (background) background.remove();
    start = null;
    end = null;
    moveStart = null;
    creating = false;
    mask = null;
    background = null;
    brushended(emit);
  };

  // Update mask and invoke brushended callback.
  const updateMask = (start, end, emit = true) => {
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
    brushed(fx, fy, fx1, fy1, emit);
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

  const handles = {
    'handle-n': { vector: [0, 1, 0, 0], cursor: 'ns-resize' },
    'handle-e': { vector: [0, 0, 1, 0], cursor: 'ew-resize' },
    'handle-s': { vector: [0, 0, 0, 1], cursor: 'ns-resize' },
    'handle-w': { vector: [1, 0, 0, 0], cursor: 'ew-resize' },
    'handle-nw': { vector: [1, 1, 0, 0], cursor: 'nwse-resize' },
    'handle-ne': { vector: [0, 1, 1, 0], cursor: 'nesw-resize' },
    'handle-se': { vector: [0, 0, 1, 1], cursor: 'nwse-resize' },
    'handle-sw': { vector: [1, 0, 0, 1], cursor: 'nesw-resize' },
  };

  const isMask = (target) => {
    return isSelection(target) || isHandle(target);
  };

  const isHandle = (target) => {
    const { id } = target;
    if (selectedHandles.indexOf(id) === -1) return false;
    return new Set(Object.keys(handles)).has(id);
  };

  const isSelection = (target) => {
    return target === mask.getElementById('selection');
  };

  // If target is plot area, create mask.
  // If target is mask, about to update position.
  const dragstart = (event) => {
    const { target } = event;
    const [offsetX, offsetY] = brushMousePosition(root, event);
    if (!mask || !isMask(target)) {
      initMask(offsetX, offsetY, event);
      creating = true;
      return;
    }
    if (isMask(target)) {
      moveStart = [offsetX, offsetY];
    }
  };

  const drag = (event) => {
    const { target } = event;
    const mouse = brushMousePosition(root, event);
    if (!start) return;
    // If target is plot area, resize mask.
    if (!moveStart) return updateMask(start, mouse);

    // If target is selection area, move mask.
    if (isSelection(target)) return moveMask(mouse);

    // If target is handle area, resize mask.
    const [dx, dy] = [mouse[0] - moveStart[0], mouse[1] - moveStart[1]];
    const { id } = target;
    if (handles[id]) {
      const [sx, sy, ex, ey] = handles[id].vector;
      return updateMask(
        [start[0] + dx * sx, start[1] + dy * sy],
        [end[0] + dx * ex, end[1] + dy * ey],
      );
    }
  };

  // If target is plot area, finish creating.
  // If target is mask, finish moving mask.
  const dragend = (event) => {
    if (moveStart) {
      moveStart = null;
      // Update start and end;
      const { x, y, width, height } = mask.style;
      start = [x, y];
      end = [x + width, y + height];
      brushupdated(x, y, x + width, y + height, event);
      return;
    }
    end = brushMousePosition(root, event);
    const [fx, fy, fx1, fy1] = updateMask(start, end);
    creating = false;
    brushcreated(fx, fy, fx1, fy1, event);
  };

  // Hide mask.
  const click = (event) => {
    const { target } = event;
    if (mask && !isMask(target)) removeMask();
  };

  // Update cursor depends on hovered element.
  const pointermove = (event) => {
    const { target } = event;
    if (!mask || !isMask(target) || creating) setCursor(root, 'crosshair');
    else if (isSelection(target)) setCursor(root, 'move');
    else if (isHandle(target)) setCursor(root, handles[target.id].cursor);
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
    move(x, y, x1, y1, emit = true) {
      if (!mask) initMask(x, y, {});
      start = [x, y];
      end = [x1, y1];
      updateMask([x, y], [x1, y1], emit);
    },
    remove(emit = true) {
      if (mask) removeMask(emit);
    },
    destroy() {
      // Do not emit brush:end event.
      if (mask) removeMask(false);
      setCursor(root, 'default');
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
    selectedHandles,
    siblings: siblingsof = (root) => [],
    datum,
    brushRegion,
    extent: optionalExtent,
    reverse,
    scale,
    coordinate,
    series = false,
    key = (d) => d,
    bboxOf = (root) => {
      const { x, y, width, height } = root.style;
      return { x, y, width, height };
    },
    state = {},
    emitter,
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

    // Create a clipPath shared between all children.
    const clipPath = new Rect({
      style: {
        x: x + ordinalX,
        y: y + ordinalY,
        width: x1 - x,
        height: y1 - y,
      },
    });
    root.appendChild(clipPath);

    for (const element of elements) {
      const cloned = clonedElement.get(element) || clone(element);
      cloned.style.clipPath = clipPath;
      setState(element, 'inactive');
      setState(cloned, 'active');
    }
  };

  const brushHandler = brush(root, {
    ...brushStyle,
    extent,
    brushRegion,
    reverse,
    selectedHandles,
    brushended: (emit) => {
      const handler = series ? seriesBrushend : brushended;
      if (emit) {
        emitter.emit('brush:remove', { nativeEvent: true });
      }
      handler();
    },
    brushed: (x, y, x1, y1, emit) => {
      const selection = selectionOf(x, y, x1, y1, scale, coordinate);
      if (emit) {
        emitter.emit('brush:highlight', {
          nativeEvent: true,
          data: { selection },
        });
      }
      const handler = series ? seriesBrushed : brushed;
      handler(x, y, x1, y1);
    },
    brushcreated: (x, y, x1, y1, event) => {
      const selection = selectionOf(x, y, x1, y1, scale, coordinate);
      emitter.emit('brush:end', {
        ...event,
        nativeEvent: true,
        data: { selection },
      });
    },
    brushupdated: (x, y, x1, y1, event) => {
      const selection = selectionOf(x, y, x1, y1, scale, coordinate);
      emitter.emit('brush:end', {
        ...event,
        nativeEvent: true,
        data: { selection },
      });
    },
    brushstarted: (e) => {
      emitter.emit('brush:start', e);
    },
  });

  // Move brush and highlight data.
  const onHighlight = ({ nativeEvent, data }) => {
    if (nativeEvent) return;
    const { selection } = data;
    const [x, y, x1, y1] = pixelsOf(selection, scale, coordinate);
    brushHandler.move(x, y, x1, y1, false);
  };
  emitter.on('brush:highlight', onHighlight);

  // Remove brush and reset data.
  const onRemove = ({ nativeEvent }: any = {}) => {
    if (nativeEvent) return;
    brushHandler.remove(false);
  };
  emitter.on('brush:remove', onRemove);

  // Remove event handlers.
  const preBrushDestroy = brushHandler.destroy.bind(brushHandler);
  brushHandler.destroy = () => {
    emitter.off('brush:highlight', onHighlight);
    emitter.off('brush:remove', onRemove);
    preBrushDestroy();
  };

  return brushHandler;
}

export function BrushHighlight({ facet, brushKey, ...rest }) {
  return (target, viewInstances, emitter) => {
    const { container, view, options } = target;
    const plotArea = selectPlotArea(container);
    const defaultOptions = {
      maskFill: '#777',
      maskFillOpacity: '0.3',
      maskStroke: '#fff',
      reverse: false,
    };
    const defaultStates = ['active', ['inactive', { opacity: 0.5 }]];
    const { scale, coordinate } = view;

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
        emitter,
        scale,
        coordinate,
        selectedHandles: undefined,
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
      emitter,
      scale,
      coordinate,
      selectedHandles: undefined,
      ...defaultOptions,
      ...rest,
    });

    // Bind brush to the view it belongs to.
    //@ts-ignore
    plotArea.brush = brush;

    return () => brush.destroy();
  };
}
