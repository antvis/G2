import { DisplayObject, IElement, Line } from '@antv/g';
import { sort, bisectCenter, group, mean } from 'd3-array';
import { lowerFirst, throttle } from '@antv/util';
import { Tooltip as TooltipComponent } from '@antv/gui';
import { defined, subObject } from '../../utils/helper';
import {
  selectG2Elements,
  createXKey,
  selectPlotArea,
  mousePosition,
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
  const container = getContainer(root);
  container.appendChild(tooltipElement.HTMLTooltipElement);
  return tooltipElement;
}

function showTooltip(root, data, x, y) {
  const tooltipElement = root.tooltipElement || createTooltip(root, x, y);
  const { items, title } = data;
  tooltipElement.show();
  tooltipElement.update({
    x,
    y,
    items,
    title,
  });
  root.tooltipElement = tooltipElement;
}

function hideTooltip(root) {
  const { tooltipElement } = root;
  if (tooltipElement) tooltipElement.hide();
}

function unique(data) {
  return Array.from(new Set(data));
}

function filterDefined(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => defined(value)),
  );
}

function singleItem(element, item, scale) {
  const { __data__: datum } = element;
  const { title, ...rest } = datum;
  const color = itemColorof(element);
  const items = Object.entries(rest)
    .filter(([key]) => key.startsWith('tooltip'))
    .map(([key, d]: any) => {
      const { field, title = field } = scale[key].getOptions();
      return {
        color,
        name: title,
        value: d === undefined ? d : `${d}`,
        ...filterDefined(item({ channel: key, value: d })),
      };
    })
    .filter(({ value }) => value !== undefined);
  return {
    ...(title && { title }),
    items,
  };
}

function groupTitleof(scale, datum) {
  const { color: scaleColor, series: scaleSeries } = scale;
  const { color, series } = datum;
  if (scaleColor && scaleColor.invert) return scaleColor.invert(color);
  if (scaleSeries && scaleSeries.invert) return scaleSeries.invert(series);
  return null;
}

function itemColorof(element) {
  const fill = element.getAttribute('fill');
  const stroke = element.getAttribute('stroke');
  const { __data__: datum } = element;
  const { color = fill || stroke } = datum;
  return color;
}

function groupItems(
  elements,
  item,
  scale,
  data = elements.map((d) => d['__data__']),
) {
  const T = unique(data.map((d) => d.title)).filter(defined);
  const items = data.flatMap((datum, i) => {
    const element = elements[i];
    const { title, ...rest } = datum;
    const color = itemColorof(element);
    return Object.entries(rest)
      .filter(([key]) => key.startsWith('tooltip'))
      .map(([key, d]: any) => {
        const { field, title = field } = scale[key].getOptions();
        return {
          color,
          name: groupTitleof(scale, datum) || title,
          value: d === undefined ? d : `${d}`,
          ...filterDefined(item({ channel: key, value: d })),
        };
      })
      .filter(({ value }) => value !== undefined);
  });
  return {
    ...(T.length > 0 && { title: T.join(',') }),
    items,
  };
}

function updateRuleY(root, points, { height, ...rest }) {
  const X = points.map((p) => p[0]);
  const x = mean(X);
  const x1 = x;
  const x2 = x;
  const y1 = 0;
  const y2 = height;
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
    showCrosshairs,
    item,
    ...rest
  }: Record<string, any>,
) {
  const elements = elementsof(root);
  const [, height] = sizeof(root);
  const elementSortedX = new Map(
    elements.map((element) => {
      const { __data__: data } = element;
      const { seriesX } = data;
      return [element, sort(seriesX)];
    }),
  );
  const ruleStyle = subObject(rest, 'crosshairs');

  const indexByFocus = (focus, X) => {
    const [normalizedX] = coordinate.invert(focus);
    return bisectCenter(X, normalizedX);
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
      const focus = mousePosition(root, event);
      const bbox = root.getBounds();
      const x = bbox.min[0];
      const y = bbox.min[1];
      if (!focus) return;
      const data = elements.map((element) => {
        const sortedX = elementSortedX.get(element);
        const index = indexByFocus(focus, sortedX);
        const d = seriesData(element, index);
        const { x, y } = d;
        return [d, coordinate.map([x, y])] as const;
      });
      const dataItems = data.map((d) => d[0]);
      const points = data.map((d) => d[1]);
      const tooltipData = groupItems(elements, item, scale, dataItems);
      showTooltip(root, tooltipData, focus[0] + x, focus[1] + y);
      if (showCrosshairs) updateRuleY(root, points, { ...ruleStyle, height });
    },
    wait,
    { leading, trailing },
  ) as (...args: any[]) => void;

  const hide = () => {
    hideTooltip(root);
    if (showCrosshairs) hideRuleY(root);
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
    showCrosshairs,
    series,
    name,
    item = () => ({}),
    ...rest
  } = options;
  return (context) => {
    const { container, view } = context;
    const { scale, markState, coordinate } = view;
    // Get default value from mark states.
    const defaultSeries = interactionKeyof(markState, 'seriesTooltip');
    const defaultShowCrosshairs = interactionKeyof(markState, 'showCrosshairs');
    const plotArea = selectPlotArea(container);
    if (maybeValue(series, defaultSeries)) {
      return seriesTooltip(plotArea, {
        ...rest,
        elements: selectG2Elements,
        scale,
        coordinate,
        showCrosshairs: maybeValue(showCrosshairs, defaultShowCrosshairs),
        item,
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
