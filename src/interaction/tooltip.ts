import { DisplayObject, IElement, Line } from '@antv/g';
import { sort, group, mean, range, bisector } from 'd3-array';
import { lowerFirst, throttle } from '@antv/util';
import { Tooltip as TooltipComponent } from '@antv/gui';
import { Constant, Identity } from '@antv/scale';
import { defined, subObject, isStrictObject } from '../utils/helper';
import {
  selectG2Elements,
  createXKey,
  selectPlotArea,
  mousePosition,
  selectFacetG2Elements,
} from './utils';

function getContainer(group: IElement) {
  // @ts-ignore
  return group.getRootNode().defaultView.getConfig().container;
}

function createTooltip(root, x0, y0) {
  const bbox = root.getBounds();
  const {
    min: [x, y],
    max: [x1, y1],
  } = bbox;
  const tooltipElement = new TooltipComponent({
    className: 'tooltip',
    style: {
      x: x0,
      y: y0,
      container: { x: 0, y: 0 },
      items: [],
      bounding: {
        x,
        y,
        width: x1 - x,
        height: y1 - y,
      },
      title: ' ',
      position: 'bottom-right',
      offset: [10, 10],
      style: {
        '.tooltip': {},
        '.tooltip-title': {
          overflow: 'hidden',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
        },
      },
    },
  });
  // @ts-ignore
  const container = getContainer(root);
  container.appendChild(tooltipElement.HTMLTooltipElement);
  return tooltipElement;
}

function showTooltip(root, data, x, y, render, event) {
  const { tooltipElement = createTooltip(root, x, y) } = root;
  const { items, title } = data;
  tooltipElement.show();
  tooltipElement.position = [x, y];
  tooltipElement.update({
    items,
    title,
    ...(render !== undefined && {
      customContent: render(event, { items, title }),
    }),
  });
  root.tooltipElement = tooltipElement;
}

function hideTooltip(root) {
  const { tooltipElement } = root;
  if (tooltipElement) tooltipElement.hide();
}

function destroyTooltip(root) {
  const { tooltipElement } = root;
  if (tooltipElement) {
    tooltipElement.destroy();
    root.tooltipElement = undefined;
  }
}

function singleItem(element) {
  const { __data__: datum } = element;
  const { title, items = [] } = datum;
  const newItems = items.map(({ color = itemColorOf(element), ...item }) => ({
    ...item,
    color,
  }));
  return {
    ...(title && { title }),
    items: newItems,
  };
}

function groupNameOf(scale, datum) {
  const { color: scaleColor, series: scaleSeries } = scale;
  const { color, series } = datum;
  const invertAble = (scale) => {
    return (
      scale &&
      scale.invert &&
      !(scale instanceof Identity) &&
      !(scale instanceof Constant)
    );
  };
  if (invertAble(scaleColor)) return scaleColor.invert(color);
  if (invertAble(scaleSeries)) return scaleSeries.invert(series);
  return null;
}

function itemColorOf(element) {
  const fill = element.getAttribute('fill');
  const stroke = element.getAttribute('stroke');
  const { __data__: datum } = element;
  const { color = fill || stroke } = datum;
  return color;
}

function normalizeTooltip(d) {
  return isStrictObject(d)
    ? d
    : d === null || d === undefined
    ? { value: d }
    : { value: `${d}` };
}

function uniqueTitles(titles) {
  const valueTitle = new Map(
    titles.map((d) => [d instanceof Date ? +d : d, d]),
  );
  return Array.from(valueTitle.values());
}

function groupItems(
  elements,
  scale,
  data = elements.map((d) => d['__data__']),
) {
  const T = uniqueTitles(data.map((d) => d.title)).filter(defined);
  const newItems = data.flatMap((datum, i) => {
    const element = elements[i];
    const { items = [], title } = datum;
    return items.map(({ color = itemColorOf(element), name, ...item }) => ({
      ...item,
      color,
      name: groupNameOf(scale, datum) || name || title,
    }));
  });
  return {
    ...(T.length > 0 && { title: T.join(',') }),
    items: newItems,
  };
}

function updateRuleY(root, points, { height, startX, startY, ...rest }) {
  const X = points.map((p) => p[0]);
  const x = mean(X);
  const x1 = x + startX;
  const x2 = x + startX;
  const y1 = startY;
  const y2 = height - startY;
  const createLine = () => {
    const line = new Line({
      style: {
        x1,
        x2,
        y1,
        y2,
        lineWidth: 1,
        stroke: '#1b1e23',
        strokeOpacity: 0.5,
        ...rest,
      },
    });
    root.appendChild(line);
    return line;
  };
  const ruleY = root.ruleY || createLine();
  ruleY.style.x1 = x1;
  ruleY.style.x2 = x2;
  ruleY.style.y1 = y1;
  ruleY.style.y2 = y2;
  root.ruleY = ruleY;
}

function hideRuleY(root) {
  if (root.ruleY) {
    root.ruleY.remove();
    root.ruleY = undefined;
  }
}

function sizeof(root) {
  const bbox = root.getBounds();
  const {
    min: [minX, minY],
    max: [maxX, maxY],
  } = bbox;
  return [maxX - minX, maxY - minY];
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

/**
 * Show tooltip for series item.
 */
export function seriesTooltip(
  root: DisplayObject,
  {
    elements: elementsof,
    wait = 50,
    leading = true,
    trailing = false,
    scale,
    coordinate,
    crosshairs,
    item,
    render,
    startX = 0,
    startY = 0,
    ...rest
  }: Record<string, any>,
) {
  const elements = elementsof(root);
  const [, height] = sizeof(root);

  // Split elements into series elements and item elements.
  const seriesElements = [];
  const itemElements = [];
  for (const element of elements) {
    const { __data__: data } = element;
    const { seriesX } = data;
    if (seriesX) seriesElements.push(element);
    else itemElements.push(element);
  }

  // Sorted elements from top to bottom visually.
  seriesElements.sort((a, b) => {
    const minY = (d) => d.getBounds().min[1];
    return minY(a) - minY(b);
  });

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

  // Get sortedIndex and X for all item items.
  const itemIndex = itemElements.map((_, i) => i);
  const itemX = itemElements.map((element) => {
    const { __data__: data } = element;
    return data.x;
  });
  const itemSortedIndex = sort(itemIndex, (i) => itemX[i]);

  const ruleStyle = subObject(rest, 'crosshairs');
  const { x: scaleX } = scale;

  // Apply offset for band scale x.
  const offsetX = scaleX?.getBandWidth ? scaleX.getBandWidth() / 2 : 0;

  const indexByFocus = (focus, I, X) => {
    const [normalizedX] = coordinate.invert(focus);
    const finalX = normalizedX - offsetX;
    const [minX, maxX] = sort([X[0], X[X.length - 1]]);
    // Skip x out of range.
    if (finalX < minX || finalX > maxX) return null;
    const search = bisector((i) => X[+i]).center;
    const i = search(I, finalX);
    return I[i];
  };

  const elementsByFocus = (focus, elements) => {
    const x = focus[0];
    const extent = (d) => {
      const { min, max } = d.getLocalBounds();
      return sort([min[0], max[0]]);
    };
    return elements.filter((element) => {
      const [min, max] = extent(element);
      return x >= min && x <= max;
    });
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
      const bbox = root.getBounds();
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
        const index = indexByFocus(focus, sortedIndex, X);
        if (index !== null) {
          selectedSeriesElements.push(element);
          const d = seriesData(element, index);
          const { x, y } = d;
          const p = coordinate.map([x + offsetX, y]);
          selectedSeriesData.push([d, p] as const);
        }
      }
      const selectedData = [
        ...selectedSeriesData.map((d) => d[0]),
        ...selectedItems.map((d) => d.__data__),
      ];

      // Get the displayed tooltip data.
      const selectedElements = [...selectedSeriesElements, ...selectedItems];
      const tooltipData = groupItems(selectedElements, scale, selectedData);

      // Hide tooltip with no selected tooltip.
      if (selectedElements.length === 0) {
        hide();
        return;
      }

      showTooltip(root, tooltipData, mouse[0] + x, mouse[1] + y, render, event);
      if (crosshairs) {
        const points = selectedSeriesData.map((d) => d[1]);
        updateRuleY(root, points, { ...ruleStyle, height, startX, startY });
      }
    },
    wait,
    { leading, trailing },
  ) as (...args: any[]) => void;

  const hide = () => {
    hideTooltip(root);
    if (crosshairs) hideRuleY(root);
  };

  root.addEventListener('pointerenter', update);
  root.addEventListener('pointermove', update);
  root.addEventListener('pointerleave', hide);

  return () => {
    root.removeEventListener('pointerover', update);
    root.removeEventListener('pointerout', update);
    root.removeEventListener('pointerleave', hide);
    destroyTooltip(root);
    if (crosshairs) hideRuleY(root);
  };
}

/**
 * Show tooltip for non-series item.
 */
export function tooltip(
  root: DisplayObject,
  {
    elements: elementsof,
    scale,
    render,
    wait = 50,
    leading = true,
    trailing = false,
    groupKey = (d) => d, // group elements by specified key
  }: Record<string, any>,
) {
  const elements = elementsof(root);
  const elementSet = new Set(elements);
  const keyGroup = group(elements, groupKey);

  const pointerover = throttle(
    (event) => {
      const { target: element } = event;
      if (!elementSet.has(element)) return;
      const k = groupKey(element);
      const group = keyGroup.get(k);
      const data =
        group.length === 1 ? singleItem(group[0]) : groupItems(group, scale);
      const { offsetX, offsetY } = event;
      showTooltip(root, data, offsetX, offsetY, render, event);
    },
    wait,
    { leading, trailing },
  ) as (...args: any[]) => void;

  const pointerout = (event) => {
    const { target: element } = event;
    if (!elementSet.has(element)) return;
    hideTooltip(root);
  };

  root.addEventListener('pointerover', pointerover);
  root.addEventListener('pointermove', pointerover);
  root.addEventListener('pointerout', pointerout);

  return () => {
    root.removeEventListener('pointerover', pointerover);
    root.removeEventListener('pointermove', pointerover);
    root.removeEventListener('pointerout', pointerout);
    destroyTooltip(root);
  };
}

export function Tooltip(options) {
  const {
    shared,
    crosshairs,
    series,
    name,
    item = () => ({}),
    facet = false,
    ...rest
  } = options;
  return (target, viewInstances) => {
    const { container, view } = target;
    const { scale, markState, coordinate } = view;

    // Get default value from mark states.
    const defaultSeries = interactionKeyof(markState, 'seriesTooltip');
    const defaultShowCrosshairs = interactionKeyof(markState, 'crosshairs');
    const plotArea = selectPlotArea(container);
    const isSeries = maybeValue(series, defaultSeries);

    // For non-facet and series tooltip.
    if (isSeries && !facet) {
      return seriesTooltip(plotArea, {
        ...rest,
        elements: selectG2Elements,
        scale,
        coordinate,
        crosshairs: maybeValue(crosshairs, defaultShowCrosshairs),
        item,
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

      // @todo Nested structure rather than flat structure for facet?
      // Add listener to the root area.
      // @ts-ignore
      return seriesTooltip(plotArea.parentNode.parentNode, {
        ...rest,
        elements: () => elements,
        scale,
        coordinate,
        crosshairs: maybeValue(crosshairs, defaultShowCrosshairs),
        item,
        startX,
        startY,
      });
    }

    return tooltip(plotArea, {
      ...rest,
      elements: selectG2Elements,
      scale,
      coordinate,
      groupKey: shared ? createXKey(view) : undefined,
      item,
    });
  };
}
