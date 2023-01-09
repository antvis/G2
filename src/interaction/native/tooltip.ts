import { DisplayObject, IElement, Line } from '@antv/g';
import { sort, group, mean, range, bisector } from 'd3-array';
import { lowerFirst, throttle } from '@antv/util';
import { Tooltip as TooltipComponent } from '@antv/gui';
import { Identity } from '@antv/scale';
import { defined, subObject, isStrictObject } from '../../utils/helper';
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

function showTooltip(root, data, x, y) {
  const { tooltipElement = createTooltip(root, x, y) } = root;
  const { items, title } = data;
  tooltipElement.show();
  tooltipElement.position = [x, y];
  tooltipElement.update({
    items,
    title,
  });
  root.tooltipElement = tooltipElement;
}

function hideTooltip(root) {
  const { tooltipElement } = root;
  if (tooltipElement) tooltipElement.hide();
}

function filterDefined(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => defined(value)),
  );
}

function singleItem(element, item, scale) {
  const { __data__: datum } = element;
  const { title, ...rest } = datum;
  const defaultColor = itemColorOf(element);
  const items = Object.entries(rest)
    .filter(([key]) => key.startsWith('tooltip'))
    .map(([key, d]: any) => {
      const { field: f, title = f } = scale[key].getOptions();
      const {
        field = undefined,
        color = defaultColor,
        name = field || title,
        value,
        ...rest
      } = normalizeTooltip(d);
      return {
        ...rest,
        color,
        name,
        value,
        ...filterDefined(item({ channel: key, value })),
      };
    })
    .filter(({ value }) => value !== undefined);
  return {
    ...(title && { title }),
    items,
  };
}

function groupNameOf(scale, datum) {
  const { color: scaleColor, series: scaleSeries } = scale;
  const { color, series } = datum;
  const invertAble = (scale) => {
    return scale && scale.invert && !(scale instanceof Identity);
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
  return isStrictObject(d) ? d : { value: d === undefined ? d : `${d}` };
}

function uniqueTitles(titles) {
  const valueTitle = new Map(
    titles.map((d) => [d instanceof Date ? +d : d, d]),
  );
  return Array.from(valueTitle.values());
}

function groupItems(
  elements,
  item,
  scale,
  data = elements.map((d) => d['__data__']),
) {
  const T = uniqueTitles(data.map((d) => d.title)).filter(defined);
  const items = data.flatMap((datum, i) => {
    const element = elements[i];
    const { title, ...rest } = datum;
    const defaultColor = itemColorOf(element);
    return Object.entries(rest)
      .filter(([key]) => key.startsWith('tooltip'))
      .map(([key, d]: any) => {
        const { field: f, title = f } = scale[key].getOptions();
        const {
          field = undefined,
          color = defaultColor,
          name = groupNameOf(scale, datum) || field || title,
          value,
          ...rest
        } = normalizeTooltip(d);
        return {
          ...rest,
          name,
          color,
          value,
          ...filterDefined(item({ channel: key, value })),
        };
      })
      .filter(({ value }) => value !== undefined);
  });
  return {
    ...(T.length > 0 && { title: T.join(',') }),
    items,
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
    const search = bisector((i) => X[+i]).center;
    const i = search(I, normalizedX - offsetX);
    return I[i];
  };

  const indicesByFocus = (focus, I, X) => {
    const len = I.length;
    if (len === 0) return [];
    const [normalizedX] = coordinate.invert(focus);
    const x = normalizedX - offsetX;
    const search = bisector((i) => X[+i]).center;
    const center = search(I, x);

    // Find the least index and greatest index of X[center]
    let left = center;
    let right = center;
    while (left - 1 > 0 && X[I[left - 1]] == X[I[center]]) left--;
    while (right + 1 < len && X[I[right + 1]] === X[I[center]]) right++;
    return range(left, right + 1).map((i) => I[i]);
  };

  const seriesData = (element, index) => {
    const { __data__: data } = element;
    return Object.fromEntries(
      Object.entries(data)
        .filter(([key]) => key.startsWith('series'))
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
      const selectedItemIndices = indicesByFocus(focus, itemSortedIndex, itemX);
      const selectedItems = selectedItemIndices.map((i) => itemElements[i]);

      // Get selected data item from both series element and item element.
      const selectedSeriesData = seriesElements.map((element) => {
        const [sortedIndex, X] = elementSortedX.get(element);
        const index = indexByFocus(focus, sortedIndex, X);
        const d = seriesData(element, index);
        const { x, y } = d;
        return [d, coordinate.map([x + offsetX, y])] as const;
      });
      const selectedData = [
        ...selectedSeriesData.map((d) => d[0]),
        ...selectedItems.map((d) => d.__data__),
      ];

      // Get the displayed tooltip data.
      const selectedElements = [...seriesElements, ...selectedItems];
      const tooltipData = groupItems(
        selectedElements,
        item,
        scale,
        selectedData,
      );

      showTooltip(root, tooltipData, mouse[0] + x, mouse[1] + y);
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
    wait = 50,
    leading = true,
    trailing = false,
    groupKey = (d) => d, // group elements by specified key
    item,
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
        group.length === 1
          ? singleItem(group[0], item, scale)
          : groupItems(group, item, scale);
      const { offsetX, offsetY } = event;
      showTooltip(root, data, offsetX, offsetY);
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
