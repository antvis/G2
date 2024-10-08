import { Circle, DisplayObject, IElement, Line } from '@antv/g';
import { sort, group, mean, bisector, minIndex } from 'd3-array';
import { deepMix, lowerFirst, throttle } from '@antv/util';
import { Tooltip as TooltipComponent } from '@antv/component';
import { Constant, Band } from '@antv/scale';
import { defined, subObject } from '../utils/helper';
import { isTranspose, isPolar } from '../utils/coordinate';
import { angle, sub, dist } from '../utils/vector';
import { invert } from '../utils/scale';
import { BBox } from '../runtime';
import {
  selectG2Elements,
  createXKey,
  selectPlotArea,
  mousePosition,
  selectFacetG2Elements,
  createDatumof,
  selectElementByData,
  bboxOf,
  maybeRoot,
} from './utils';
import { dataOf } from './event';

function getContainer(
  group: IElement,
  mount?: string | HTMLElement,
): HTMLElement {
  if (mount) {
    return typeof mount === 'string' ? document.querySelector(mount) : mount;
  }
  const canvas: any = group.ownerDocument.defaultView
    .getContextService()
    .getDomElement();
  return canvas.parentElement as unknown as HTMLElement;
}

function getBounding(root: DisplayObject): BBox {
  const bbox = root.getRenderBounds();
  const {
    min: [x1, y1],
    max: [x2, y2],
  } = bbox;
  return {
    x: x1,
    y: y1,
    width: x2 - x1,
    height: y2 - y1,
  };
}

function getContainerOffset(
  container1: HTMLElement,
  container2: HTMLElement,
): { x: number; y: number } {
  const r1 = container1.getBoundingClientRect();
  const r2 = container2.getBoundingClientRect();
  return {
    x: r1.x - r2.x,
    y: r1.y - r2.y,
  };
}

function createTooltip(
  container: HTMLElement,
  x0,
  y0,
  position,
  enterable,
  bounding,
  containerOffset,
  css = {},
  offset: [number, number] = [10, 10],
) {
  const defaults = {
    '.g2-tooltip': {},
    '.g2-tooltip-title': {
      overflow: 'hidden',
      'white-space': 'nowrap',
      'text-overflow': 'ellipsis',
    },
  };
  const tooltipElement = new TooltipComponent({
    className: 'tooltip',
    style: {
      x: x0,
      y: y0,
      container: containerOffset,
      data: [],
      bounding,
      position,
      enterable,
      title: '',
      offset,
      template: {
        prefixCls: 'g2-',
      },
      style: deepMix(defaults, css),
    },
  });
  container.appendChild(tooltipElement.HTMLTooltipElement);
  return tooltipElement;
}

function showTooltip({
  root,
  data,
  x,
  y,
  render,
  event,
  single,
  position = 'right-bottom',
  enterable = false,
  css,
  mount,
  bounding,
  offset,
}) {
  const container = getContainer(root, mount);
  const canvasContainer = getContainer(root);
  // All the views share the same tooltip.
  const parent = single ? canvasContainer : root;
  const b = bounding || getBounding(root);
  const containerOffset = getContainerOffset(canvasContainer, container);
  const {
    tooltipElement = createTooltip(
      container,
      x,
      y,
      position,
      enterable,
      b,
      containerOffset,
      css,
      offset,
    ),
  } = parent as any;
  const { items, title = '' } = data;
  tooltipElement.update({
    x,
    y,
    data: items,
    title,
    position,
    enterable,
    container: containerOffset,
    ...(render !== undefined && {
      content: render(event, { items, title }),
    }),
  });
  parent.tooltipElement = tooltipElement;
}

function hideTooltip({
  root,
  single,
  emitter,
  nativeEvent = true,
  event = null,
}) {
  if (nativeEvent) {
    emitter.emit('tooltip:hide', { nativeEvent });
  }
  const container = getContainer(root);
  const parent = single ? container : root;
  const { tooltipElement } = parent;
  if (tooltipElement) {
    // Must be clientX, clientY.
    tooltipElement.hide(event?.clientX, event?.clientY);
  }
  hideRuleY(root);
  hideRuleX(root);
  hideMarker(root);
}

function destroyTooltip({ root, single }) {
  const container = getContainer(root);
  const parent = single ? container : root;
  if (!parent) return;
  const { tooltipElement } = parent;
  if (tooltipElement) {
    tooltipElement.destroy();
    parent.tooltipElement = undefined;
  }
  hideRuleY(root);
  hideRuleX(root);
  hideMarker(root);
}

function showUndefined(item) {
  const { value } = item;
  return { ...item, value: value === undefined ? 'undefined' : value };
}

function singleItem(element) {
  const { __data__: datum } = element;
  const { title, items = [] } = datum;
  const newItems = items
    .filter(defined)
    .map(({ color = itemColorOf(element), ...item }) => ({
      ...item,
      color,
    }))
    .map(showUndefined);
  return {
    ...(title && { title }),
    items: newItems,
  };
}

function groupNameOf(scale, datum) {
  const { color: scaleColor, series: scaleSeries, facet = false } = scale;
  const { color, series } = datum;
  const invertAble = (scale) => {
    return (
      scale &&
      scale.invert &&
      !(scale instanceof Band) &&
      !(scale instanceof Constant)
    );
  };
  // For non constant color channel.
  if (invertAble(scaleSeries)) {
    const cloned = scaleSeries.clone();
    return cloned.invert(series);
  }
  if (
    series &&
    scaleSeries instanceof Band &&
    scaleSeries.invert(series) !== color &&
    !facet
  ) {
    return scaleSeries.invert(series);
  }
  if (invertAble(scaleColor)) {
    const name = scaleColor.invert(color);
    // For threshold scale.
    if (Array.isArray(name)) return null;
    return name;
  }
  return null;
}

function itemColorOf(element) {
  const fill = element.getAttribute('fill');
  const stroke = element.getAttribute('stroke');
  const { __data__: datum } = element;
  const { color = fill && fill !== 'transparent' ? fill : stroke } = datum;
  return color;
}

function unique(items, key = (d) => d) {
  const valueName = new Map(items.map((d) => [key(d), d]));
  return Array.from(valueName.values());
}

function groupItems(
  elements,
  scale,
  groupName,
  data = elements.map((d) => d['__data__']),
  theme: Record<string, any> = {},
) {
  const key = (d) => (d instanceof Date ? +d : d);
  const T = unique(
    data.map((d) => d.title),
    key,
  ).filter(defined);
  const newItems = data
    .flatMap((datum, i) => {
      const element = elements[i];
      const { items = [], title } = datum;
      const definedItems = items.filter(defined);

      // If there is only one item, use groupName as title by default.
      const useGroupName =
        groupName !== undefined ? groupName : items.length <= 1 ? true : false;

      return definedItems.map(
        ({ color = itemColorOf(element) || theme.color, name, ...item }) => {
          const groupName = groupNameOf(scale, datum);
          const name1 = useGroupName ? groupName || name : name || groupName;
          return {
            ...item,
            color,
            name: name1 || title,
          };
        },
      );
    })
    .map(showUndefined);
  return {
    ...(T.length > 0 && { title: T.join(',') }),
    items: unique(
      newItems,
      (d) => `(${key(d.name)}, ${key(d.value)}, ${key(d.color)})`,
    ),
  };
}

function updateRuleX(
  root,
  points,
  mouse,
  {
    plotWidth,
    plotHeight,
    mainWidth,
    mainHeight,
    startX,
    startY,
    transposed,
    polar,
    insetLeft,
    insetTop,
    ...rest
  },
) {
  const defaults = {
    lineWidth: 1,
    stroke: '#1b1e23',
    strokeOpacity: 0.5,
    ...rest,
  };

  const createCircle = (cx, cy, r) => {
    const circle = new Circle({
      style: {
        cx,
        cy,
        r,
        ...defaults,
      },
    });
    root.appendChild(circle);
    return circle;
  };

  const createLine = (x1, x2, y1, y2) => {
    const line = new Line({
      style: {
        x1,
        x2,
        y1,
        y2,
        ...defaults,
      },
    });
    root.appendChild(line);
    return line;
  };

  const minDistPoint = (mouse, points) => {
    // only one point do not need compute
    if (points.length === 1) {
      return points[0];
    }
    const dists = points.map((p) => dist(p, mouse));
    const minDistIndex = minIndex(dists, (d) => d);
    return points[minDistIndex];
  };

  const target = minDistPoint(mouse, points);

  const pointsOf = () => {
    if (transposed)
      return [
        startX + target[0],
        startX + target[0],
        startY,
        startY + plotHeight,
      ];
    return [startX, startX + plotWidth, target[1] + startY, target[1] + startY];
  };

  const pointsOfPolar = () => {
    const cx = startX + insetLeft + mainWidth / 2;
    const cy = startY + insetTop + mainHeight / 2;
    const cdist = dist([cx, cy], target);
    return [cx, cy, cdist];
  };

  if (polar) {
    const [cx, cy, r] = pointsOfPolar();
    const ruleX = root.ruleX || createCircle(cx, cy, r);
    ruleX.style.cx = cx;
    ruleX.style.cy = cy;
    ruleX.style.r = r;
    root.ruleX = ruleX;
  } else {
    const [x1, x2, y1, y2] = pointsOf();
    const ruleX = root.ruleX || createLine(x1, x2, y1, y2);
    ruleX.style.x1 = x1;
    ruleX.style.x2 = x2;
    ruleX.style.y1 = y1;
    ruleX.style.y2 = y2;
    root.ruleX = ruleX;
  }
}

function updateRuleY(
  root,
  points,
  {
    plotWidth,
    plotHeight,
    mainWidth,
    mainHeight,
    startX,
    startY,
    transposed,
    polar,
    insetLeft,
    insetTop,
    ...rest
  },
) {
  const defaults = {
    lineWidth: 1,
    stroke: '#1b1e23',
    strokeOpacity: 0.5,
    ...rest,
  };

  const Y = points.map((p) => p[1]);
  const X = points.map((p) => p[0]);
  const y = mean(Y);
  const x = mean(X);

  const pointsOf = () => {
    if (polar) {
      const r = Math.min(mainWidth, mainHeight) / 2;
      const cx = startX + insetLeft + mainWidth / 2;
      const cy = startY + insetTop + mainHeight / 2;
      const a = angle(sub([x, y], [cx, cy]));
      const x0 = cx + r * Math.cos(a);
      const y0 = cy + r * Math.sin(a);
      return [cx, x0, cy, y0];
    }
    if (transposed) return [startX, startX + plotWidth, y + startY, y + startY];
    return [x + startX, x + startX, startY, startY + plotHeight];
  };

  const [x1, x2, y1, y2] = pointsOf();
  const createLine = () => {
    const line = new Line({
      style: {
        x1,
        x2,
        y1,
        y2,
        ...defaults,
      },
    });

    root.appendChild(line);
    return line;
  };
  // Only update rule with defined series elements.
  if (X.length > 0) {
    const ruleY = root.ruleY || createLine();
    ruleY.style.x1 = x1;
    ruleY.style.x2 = x2;
    ruleY.style.y1 = y1;
    ruleY.style.y2 = y2;
    root.ruleY = ruleY;
  }
}

function hideRuleY(root) {
  if (root.ruleY) {
    root.ruleY.remove();
    root.ruleY = undefined;
  }
}

function hideRuleX(root) {
  if (root.ruleX) {
    root.ruleX.remove();
    root.ruleX = undefined;
  }
}

function updateMarker(root, { data, style, theme }) {
  if (root.markers) root.markers.forEach((d) => d.remove());
  const { type = '' } = style;

  const markers = data
    .filter((d) => {
      const [{ x, y }] = d;
      return defined(x) && defined(y);
    })
    .map((d) => {
      const [{ color, element }, point] = d;
      const originColor =
        color || // encode value
        element.style.fill ||
        element.style.stroke ||
        theme.color;
      const fill = type === 'hollow' ? 'transparent' : originColor;
      const stroke = type === 'hollow' ? originColor : '#fff';
      const shape = new Circle({
        className: 'g2-tooltip-marker',
        style: {
          cx: point[0],
          cy: point[1],
          fill,
          r: 4,
          stroke,
          lineWidth: 2,
          ...style,
        },
      });
      return shape;
    });
  for (const marker of markers) root.appendChild(marker);
  root.markers = markers;
}

function hideMarker(root) {
  if (root.markers) {
    root.markers.forEach((d) => d.remove());
    root.markers = [];
  }
}

function interactionKeyof(markState, key) {
  return Array.from(markState.values()).some(
    // @ts-ignore
    (d) => d.interaction?.[key],
  );
}

function maybeValue(specified, defaults) {
  return specified === undefined ? defaults : specified;
}

function isEmptyTooltipData(data) {
  const { title, items } = data;
  if (items.length === 0 && title === undefined) return true;
  return false;
}

function hasSeries(markState): boolean {
  return Array.from(markState.values()).some(
    // @ts-ignore
    (d) => d.interaction?.seriesTooltip && d.tooltip,
  );
}

/**
 * Show tooltip for series item.
 */
export function seriesTooltip(
  root: DisplayObject,
  {
    elements: elementsof,
    sort: sortFunction,
    filter: filterFunction,
    scale,
    coordinate,
    crosshairs,
    crosshairsX,
    crosshairsY,
    render,
    groupName,
    emitter,
    wait = 50,
    leading = true,
    trailing = false,
    startX = 0,
    startY = 0,
    body = true,
    single = true,
    position,
    enterable,
    mount,
    bounding,
    theme,
    offset,
    disableNative = false,
    marker = true,
    preserve = false,
    style: _style = {},
    css = {},
    ...rest
  }: Record<string, any>,
) {
  const elements = elementsof(root);
  const transposed = isTranspose(coordinate);
  const polar = isPolar(coordinate);
  const style = deepMix(_style, rest);

  const {
    innerWidth: plotWidth,
    innerHeight: plotHeight,
    width: mainWidth,
    height: mainHeight,
    insetLeft,
    insetTop,
  } = coordinate.getOptions();

  // Split elements into series elements and item elements.
  const seriesElements = [];
  const itemElements = [];
  for (const element of elements) {
    const { __data__: data } = element;
    const { seriesX, title, items } = data;
    if (seriesX) seriesElements.push(element);
    else if (title || items) itemElements.push(element);
  }
  const inInterval = (d) => d.markType === 'interval';
  const isBar =
    itemElements.length &&
    itemElements.every(inInterval) &&
    !isPolar(coordinate);
  const xof = (d) => d.__data__.x;

  // For band scale x, find the closest series element to focus,
  // useful for interval + line mark.
  const isBandScale = !!scale.x.getBandWidth;
  const closest = isBandScale && itemElements.length > 0;

  // Sorted elements from top to bottom visually,
  // or from right to left in transpose coordinate.
  seriesElements.sort((a, b) => {
    const index = transposed ? 0 : 1;
    const minY = (d) => d.getBounds().min[index];
    return transposed ? minY(b) - minY(a) : minY(a) - minY(b);
  });

  const extent = (d) => {
    const index = transposed ? 1 : 0;
    const { min, max } = d.getLocalBounds();
    return sort([min[index], max[index]]);
  };

  // Sort itemElements for bisector search.
  if (isBar) elements.sort((a, b) => xof(a) - xof(b));
  else {
    itemElements.sort((a, b) => {
      const [minA, maxA] = extent(a);
      const [minB, maxB] = extent(b);
      const midA = (minA + maxA) / 2;
      const midB = (minB + maxB) / 2;
      return transposed ? midB - midA : midA - midB;
    });
  }

  // Get sortedIndex and X for each series elements
  const elementSortedX = new Map(
    seriesElements.map((element) => {
      const { __data__: data } = element;
      const { seriesX } = data;
      const seriesIndex = seriesX.map((_, i) => i);
      const sortedIndex = sort(seriesIndex, (i) => seriesX[+i]);
      return [element, [sortedIndex, seriesX]];
    }),
  );

  const { x: scaleX } = scale;

  // Apply offset for band scale x.
  const offsetX = scaleX?.getBandWidth ? scaleX.getBandWidth() / 2 : 0;

  const abstractX = (focus) => {
    const [normalizedX] = coordinate.invert(focus);
    return normalizedX - offsetX;
  };

  const indexByFocus = (event, focus, I, X) => {
    // _x is from emit event, to find the right element.
    const { _x } = event;
    const finalX = _x !== undefined ? scaleX.map(_x) : abstractX(focus);
    const DX = X.filter(defined);
    const [minX, maxX] = sort([DX[0], DX[DX.length - 1]]);
    // If only has one element(minX == maxX), show tooltip when hover whole chart
    const isOnlyOneElement = minX === maxX;

    // If closest is true, always find at least one element.
    // Otherwise, skip element out of plot area.
    if (!closest && (finalX < minX || finalX > maxX) && !isOnlyOneElement)
      return null;
    const search = bisector((i) => X[+i]).center;
    const i = search(I, finalX);
    return I[i];
  };

  const elementsByFocus = isBar
    ? (focus, elements) => {
        const search = bisector(xof).center;
        const i = search(elements, abstractX(focus));
        const find = elements[i];
        const groups = group(elements, xof);
        const selected = groups.get(xof(find));
        return selected;
      }
    : (focus, elements) => {
        const index = transposed ? 1 : 0;
        const x = focus[index];
        const filtered = elements.filter((element) => {
          const [min, max] = extent(element);
          return x >= min && x <= max;
        });
        // If closet is true, always find at least one element.
        if (!closest || filtered.length > 0) return filtered;

        // Search the closet element to the focus.
        const search = bisector((element) => {
          const [min, max] = extent(element);
          return (min + max) / 2;
        }).center;
        const i = search(elements, x);
        return [elements[i]].filter(defined);
      };

  const seriesData = (element, index) => {
    const { __data__: data } = element;
    return Object.fromEntries(
      Object.entries(data)
        .filter(([key]) => key.startsWith('series') && key !== 'series')
        .map(([key, V]) => {
          const d = V[index];
          return [lowerFirst(key.replace('series', '')), d];
        }),
    );
  };

  const update = throttle(
    (event) => {
      const mouse = mousePosition(root, event);
      if (!mouse) return;
      const bbox = bboxOf(root);
      const x = bbox.min[0];
      const y = bbox.min[1];
      const focus = [mouse[0] - startX, mouse[1] - startY];
      if (!focus) return;
      // Get selected item element.
      const selectedItems = elementsByFocus(focus, itemElements);

      // Get selected data item from both series element and item element.
      const selectedSeriesElements = [];
      const selectedSeriesData = [];
      for (const element of seriesElements) {
        const [sortedIndex, X] = elementSortedX.get(element);
        const index = indexByFocus(event, focus, sortedIndex, X);
        if (index !== null) {
          selectedSeriesElements.push(element);
          const d = seriesData(element, index);
          const { x, y } = d;
          const p = coordinate.map([(x || 0) + offsetX, y || 0]);
          selectedSeriesData.push([{ ...d, element }, p] as const);
        }
      }

      // Filter selectedSeriesData with different x,
      // make sure there is only one x closest to focusX.
      const SX = Array.from(new Set(selectedSeriesData.map((d) => d[0].x)));
      const closestX = SX[minIndex(SX, (x) => Math.abs(x - abstractX(focus)))];
      const filteredSeriesData = selectedSeriesData.filter(
        (d) => d[0].x === closestX,
      );

      const selectedData = [
        ...filteredSeriesData.map((d) => d[0]),
        ...selectedItems.map((d) => d.__data__),
      ];

      // Get the displayed tooltip data.
      const selectedElements = [...selectedSeriesElements, ...selectedItems];
      const tooltipData = groupItems(
        selectedElements,
        scale,
        groupName,
        selectedData,
        theme,
      );

      // Sort items and filter items.
      if (sortFunction) {
        tooltipData.items.sort((a, b) => sortFunction(a) - sortFunction(b));
      }
      if (filterFunction) {
        tooltipData.items = tooltipData.items.filter(filterFunction);
      }

      // Hide tooltip with no selected tooltip.
      if (selectedElements.length === 0 || isEmptyTooltipData(tooltipData)) {
        hide(event);
        return;
      }

      if (body) {
        showTooltip({
          root,
          data: tooltipData,
          x: mouse[0] + x,
          y: mouse[1] + y,
          render,
          event,
          single,
          position,
          enterable,
          mount,
          bounding,
          css,
          offset,
        });
      }

      if (crosshairs || crosshairsX || crosshairsY) {
        const ruleStyle = subObject(style, 'crosshairs');

        const ruleStyleX = {
          ...ruleStyle,
          ...subObject(style, 'crosshairsX'),
        };
        const ruleStyleY = {
          ...ruleStyle,
          ...subObject(style, 'crosshairsY'),
        };

        const points = filteredSeriesData.map((d) => d[1]);
        if (crosshairsX) {
          updateRuleX(root, points, mouse, {
            ...ruleStyleX,
            plotWidth,
            plotHeight,
            mainWidth,
            mainHeight,
            insetLeft,
            insetTop,
            startX,
            startY,
            transposed,
            polar,
          });
        }

        if (crosshairsY) {
          updateRuleY(root, points, {
            ...ruleStyleY,
            plotWidth,
            plotHeight,
            mainWidth,
            mainHeight,
            insetLeft,
            insetTop,
            startX,
            startY,
            transposed,
            polar,
          });
        }
      }

      if (marker) {
        const markerStyles = subObject(style, 'marker');
        updateMarker(root, {
          data: filteredSeriesData,
          style: markerStyles,
          theme,
        });
      }

      // X in focus may related multiple points when dataset is large,
      // so we need to find the first x to show tooltip.
      const firstX = filteredSeriesData[0]?.[0].x;
      const transformedX = firstX ?? abstractX(focus);

      emitter.emit('tooltip:show', {
        ...event,
        nativeEvent: true,
        data: {
          data: { x: invert(scale.x, transformedX, true) },
        },
      });
    },
    wait,
    { leading, trailing },
  ) as (...args: any[]) => void;

  const hide = (event: MouseEvent) => {
    hideTooltip({ root, single, emitter, event });
  };

  const destroy = () => {
    destroyTooltip({ root, single });
  };

  const onTooltipShow = ({ nativeEvent, data, offsetX, offsetY, ...rest }) => {
    if (nativeEvent) return;
    const x = data?.data?.x;
    const scaleX = scale.x;
    const x1 = scaleX.map(x);
    const [x2, y2] = coordinate.map([x1, 0.5]);
    const rootBounds = root.getRenderBounds();
    const minX = rootBounds.min[0];
    const minY = rootBounds.min[1];
    update({
      ...rest,
      offsetX: offsetX !== undefined ? offsetX : minX + x2,
      offsetY: offsetY !== undefined ? offsetY : minY + y2,
      _x: x, // a hint, to lookup for the right element if multiple element in the same abstractX.
    });
  };

  const onTooltipHide = () => {
    hideTooltip({ root, single, emitter, nativeEvent: false });
  };

  const onTooltipDisable = () => {
    removeEventListeners();
    destroy();
  };

  const onTooltipEnable = () => {
    addEventListeners();
  };

  const addEventListeners = () => {
    if (!disableNative) {
      root.addEventListener('pointerenter', update);
      root.addEventListener('pointermove', update);
      // Only emit pointerleave event when the pointer is not in the root area.
      root.addEventListener('pointerleave', (e) => {
        if (mousePosition(root, e)) return;
        hide(e);
      });
    }
  };

  const removeEventListeners = () => {
    if (!disableNative) {
      root.removeEventListener('pointerenter', update);
      root.removeEventListener('pointermove', update);
      root.removeEventListener('pointerleave', hide);
    }
  };

  addEventListeners();

  emitter.on('tooltip:show', onTooltipShow);
  emitter.on('tooltip:hide', onTooltipHide);
  emitter.on('tooltip:disable', onTooltipDisable);
  emitter.on('tooltip:enable', onTooltipEnable);

  return () => {
    removeEventListeners();
    emitter.off('tooltip:show', onTooltipShow);
    emitter.off('tooltip:hide', onTooltipHide);
    emitter.off('tooltip:disable', onTooltipDisable);
    emitter.off('tooltip:enable', onTooltipEnable);
    if (preserve) {
      hideTooltip({ root, single, emitter, nativeEvent: false });
    } else {
      destroy();
    }
  };
}

/**
 * Show tooltip for non-series item.
 */
export function tooltip(
  root: DisplayObject,
  {
    elements: elementsof,
    coordinate,
    scale,
    render,
    groupName,
    sort: sortFunction,
    filter: filterFunction,
    emitter,
    wait = 50,
    leading = true,
    trailing = false,
    groupKey = (d) => d, // group elements by specified key
    single = true,
    position,
    enterable,
    datum,
    view,
    mount,
    bounding,
    theme,
    offset,
    shared = false,
    body = true,
    disableNative = false,
    preserve = false,
    css = {},
  }: Record<string, any>,
) {
  const elements = elementsof(root);
  const keyGroup = group(elements, groupKey);
  const inInterval = (d) => d.markType === 'interval';
  const isBar = elements.every(inInterval) && !isPolar(coordinate);
  const scaleX = scale.x;
  const scaleSeries = scale.series;
  const bandWidth = scaleX?.getBandWidth?.() ?? 0;
  const xof = scaleSeries
    ? (d) => {
        const seriesCount = Math.round(1 / scaleSeries.valueBandWidth);
        return (
          d.__data__.x +
          d.__data__.series * bandWidth +
          bandWidth / (seriesCount * 2)
        );
      }
    : (d) => d.__data__.x + bandWidth / 2;

  // Sort for bisector search.
  if (isBar) elements.sort((a, b) => xof(a) - xof(b));

  const findElementByTarget = (event) => {
    const { target } = event;
    return maybeRoot(target, (node) => {
      if (!node.classList) return false;
      return node.classList.includes('element');
    });
  };

  const findElement = isBar
    ? (event) => {
        const mouse = mousePosition(root, event);
        if (!mouse) return;
        const [abstractX] = coordinate.invert(mouse);
        const search = bisector(xof).center;
        const i = search(elements, abstractX);
        const target = elements[i];

        if (!shared) {
          // For grouped bar chart without shared options.
          const isGrouped = elements.find(
            (d) => d !== target && xof(d) === xof(target),
          );
          if (isGrouped) return findElementByTarget(event);
        }
        return target;
      }
    : findElementByTarget;

  const pointermove = throttle(
    (event) => {
      const element = findElement(event);
      if (!element) {
        hideTooltip({ root, single, emitter, event });
        return;
      }
      const k = groupKey(element);
      const group = keyGroup.get(k);
      if (!group) {
        return;
      }
      const data =
        group.length === 1 && !shared
          ? singleItem(group[0])
          : groupItems(group, scale, groupName, undefined, theme);

      // Sort items and sort.
      if (sortFunction) {
        data.items.sort((a, b) => sortFunction(a) - sortFunction(b));
      }
      if (filterFunction) {
        data.items = data.items.filter(filterFunction);
      }

      if (isEmptyTooltipData(data)) {
        hideTooltip({ root, single, emitter, event });
        return;
      }

      const { offsetX, offsetY } = event;
      if (body) {
        showTooltip({
          root,
          data,
          x: offsetX,
          y: offsetY,
          render,
          event,
          single,
          position,
          enterable,
          mount,
          bounding,
          css,
          offset,
        });
      }

      emitter.emit('tooltip:show', {
        ...event,
        nativeEvent: true,
        data: {
          data: dataOf(element, view),
        },
      });
    },
    wait,
    { leading, trailing },
  ) as (...args: any[]) => void;

  const pointerleave = (event) => {
    hideTooltip({ root, single, emitter, event });
  };

  const addEventListeners = () => {
    if (!disableNative) {
      root.addEventListener('pointermove', pointermove);
      // Only emit pointerleave event when the pointer is not in the root area.
      // !!!DO NOT USE pointerout event, it will emit when the pointer is in the child area.
      root.addEventListener('pointerleave', pointerleave);
    }
  };

  const removeEventListeners = () => {
    if (!disableNative) {
      root.removeEventListener('pointermove', pointermove);
      root.removeEventListener('pointerleave', pointerleave);
    }
  };

  const onTooltipShow = ({ nativeEvent, offsetX, offsetY, data: raw }) => {
    if (nativeEvent) return;
    const { data } = raw;
    const element = selectElementByData(elements, data, datum);
    if (!element) return;
    const bbox = element.getBBox();
    const { x, y, width, height } = bbox;
    const rootBBox = root.getBBox();
    pointermove({
      target: element,
      offsetX: offsetX !== undefined ? offsetX + rootBBox.x : x + width / 2,
      offsetY: offsetY !== undefined ? offsetY + rootBBox.y : y + height / 2,
    });
  };

  const onTooltipHide = ({ nativeEvent }: any = {}) => {
    if (nativeEvent) return;
    hideTooltip({ root, single, emitter, nativeEvent: false });
  };

  const onTooltipDisable = () => {
    removeEventListeners();
    destroyTooltip({ root, single });
  };

  const onTooltipEnable = () => {
    addEventListeners();
  };

  emitter.on('tooltip:show', onTooltipShow);
  emitter.on('tooltip:hide', onTooltipHide);
  emitter.on('tooltip:enable', onTooltipEnable);
  emitter.on('tooltip:disable', onTooltipDisable);

  addEventListeners();

  return () => {
    removeEventListeners();
    emitter.off('tooltip:show', onTooltipShow);
    emitter.off('tooltip:hide', onTooltipHide);
    if (preserve) {
      hideTooltip({ root, single, emitter, nativeEvent: false });
    } else {
      destroyTooltip({ root, single });
    }
  };
}

export function Tooltip(options) {
  const {
    shared,
    crosshairs,
    crosshairsX,
    crosshairsY,
    series,
    name,
    item = () => ({}),
    facet = false,
    ...rest
  } = options;

  return (target, viewInstances, emitter) => {
    const { container, view } = target;
    const { scale, markState, coordinate, theme } = view;
    // Get default value from mark states.
    const defaultSeries = interactionKeyof(markState, 'seriesTooltip');
    const defaultShowCrosshairs = interactionKeyof(markState, 'crosshairs');
    const plotArea = selectPlotArea(container);
    const isSeries = maybeValue(series, defaultSeries);
    const crosshairsSetting = maybeValue(crosshairs, defaultShowCrosshairs);

    // For non-facet and series tooltip.
    if (isSeries && hasSeries(markState) && !facet) {
      return seriesTooltip(plotArea, {
        ...rest,
        theme,
        elements: selectG2Elements,
        scale,
        coordinate,
        crosshairs: crosshairsSetting,
        // the crosshairsX settings level: crosshairsX > crosshairs > false
        // it means crosshairsX default is false
        crosshairsX: maybeValue(maybeValue(crosshairsX, crosshairs), false),
        // crosshairsY default depend on the crossharisSettings
        crosshairsY: maybeValue(crosshairsY, crosshairsSetting),
        item,
        emitter,
      });
    }

    // For facet and series tooltip.
    if (isSeries && facet) {
      // Get sub view instances for this view.
      const facetInstances = viewInstances.filter(
        (d) => d !== target && d.options.parentKey === target.options.key,
      );
      const elements = selectFacetG2Elements(target, viewInstances);
      // Use the scale of the first view.
      const scale = facetInstances[0].view.scale;
      const bbox = plotArea.getBounds();
      const startX = bbox.min[0];
      const startY = bbox.min[1];
      Object.assign(scale, { facet: true });

      // @todo Nested structure rather than flat structure for facet?
      // Add listener to the root area.
      // @ts-ignore
      return seriesTooltip(plotArea.parentNode.parentNode, {
        ...rest,
        theme,
        elements: () => elements,
        scale,
        coordinate,
        crosshairs: maybeValue(crosshairs, defaultShowCrosshairs),
        // the crosshairsX settings level: crosshairsX > crosshairs > false
        // it means crosshairsX default is false
        crosshairsX: maybeValue(maybeValue(crosshairsX, crosshairs), false),
        crosshairsY: maybeValue(crosshairsY, crosshairsSetting),
        item,
        startX,
        startY,
        emitter,
      });
    }

    return tooltip(plotArea, {
      ...rest,
      datum: createDatumof(view),
      elements: selectG2Elements,
      scale,
      coordinate,
      groupKey: shared ? createXKey(view) : undefined,
      item,
      emitter,
      view,
      theme,
      shared,
    });
  };
}

Tooltip.props = {
  reapplyWhenUpdate: true,
};
