import { Coordinate, Vector2 } from '@antv/coord';
import { IElement, Circle } from '@antv/g';
import {
  Tooltip as TooltipComponent,
  LineCrosshair,
  CircleCrosshair,
} from '@antv/gui';
import { least } from 'd3-array';
import { isPolar } from '../../../utils/coordinate';
import { G2Element, Selection } from '../../../utils/selection';
import { dist } from '../../../utils/vector';
import { ActionComponent as AC, InteractionContext } from '../../types';
import { G2Theme } from '../../../runtime';
import { TooltipAction } from '../../../spec';

type TooltipItem = {
  // x,y relative to the coordinate.
  x: number;
  y: number;
  color: string;
  title: string;
  name: string;
  value: string;
};

type TooltipData = {
  // x,y relative to the canvas.
  x: number;
  y: number;
  title: string;
  data: TooltipItem[];
};

function getContainer(group: IElement) {
  // @ts-ignore
  return group.getRootNode().defaultView.getConfig().container;
}

function getCrosshairCfgOfPoint(
  coordinate: Coordinate,
  point: Vector2,
  crosshairOptions: any,
): any[] {
  let lineX;
  let lineY;
  const {
    type = 'y',
    line: lineStyle = { lineDash: [4, 4], lineWidth: 1 },
    text = false,
  } = crosshairOptions;

  if (isPolar(coordinate)) {
    const center = coordinate.getCenter();
    const radius = dist(center, point);
    lineY = {
      id: 'circle-y',
      center,
      defaultRadius: radius,
      type: 'circle',
      text,
      lineStyle,
    };
    lineX = {
      id: 'line-x',
      startPos: [center[0], center[1]],
      endPos: point,
      text,
      lineStyle,
    };
  } else {
    const { x, y, width, height } = coordinate.getOptions();

    lineX = {
      id: 'line-x',
      startPos: [x, point[1]],
      endPos: [x + width, point[1]],
      text,
      lineStyle,
    };
    lineY = {
      id: 'line-y',
      startPos: [point[0], y],
      endPos: [point[0], y + height],
      text,
      lineStyle,
    };
  }

  if (type === 'x') return [lineX];
  if (type === 'xy') return [lineX, lineY];
  return [lineY];
}

function hideCrosshairs(selection: Selection) {
  selection.selectAll('.tooltip-crosshairs').each(function () {
    this.hide();
  });
}

function hideTooltipMarkers(selection: Selection) {
  selection.selectAll('.tooltip-markers').each(function () {
    this.hide();
  });
}

function hideTooltip(transientLayer: Selection) {
  transientLayer.selectAll('.tooltip').each(function () {
    this.hide();
  });
  hideCrosshairs(transientLayer);
  hideTooltipMarkers(transientLayer);
}

/**
 * If has multiple items, show the crosshairs of the item which has the highest y value.
 */
function renderCrosshair(
  context: InteractionContext,
  tooltipData: TooltipData | null,
  crosshairsCfg: any = {},
) {
  const { transientLayer, coordinate } = context;

  if (!tooltipData) {
    hideCrosshairs(transientLayer);
    return;
  }

  const { follow, ...options } = crosshairsCfg;
  const { x, y, data: items } = tooltipData;

  const point = (follow ? [x, y] : [items[0].x, items[0].y]) as Vector2;
  const data = getCrosshairCfgOfPoint(coordinate, point, options);

  transientLayer
    .selectAll('.tooltip-crosshairs')
    .data(data, (_, i) => i)
    .join(
      (enter) =>
        enter.append(({ type, ...style }) => {
          const Ctor = type === 'circle' ? CircleCrosshair : LineCrosshair;
          return new Ctor({ className: 'tooltip-crosshairs', style });
        }),
      (update) =>
        update.each(function (datum) {
          this.update(datum);
          this.show();
        }),
      (exit) => exit.remove(),
    );
}

function renderMarkers(
  context: InteractionContext,
  tooltipData: TooltipData | null,
  markerCfg = {},
) {
  const { transientLayer } = context;

  if (!tooltipData) {
    hideTooltipMarkers(transientLayer);
    return;
  }

  const data = tooltipData.data.map((item) => {
    const { x, y, color } = item;
    return {
      cx: x,
      cy: y,
      fill: color,
      r: 3,
      stroke: '#fff',
      lineWidth: 1.5,
      zIndex: 1,
      ...markerCfg,
    };
  });

  transientLayer
    .selectAll('.tooltip-markers')
    .data(data, (_, i) => i)
    .join(
      (enter) =>
        enter.append(
          (style) => new Circle({ className: 'tooltip-markers', style }),
        ),
      (update) =>
        update.each(function (datum) {
          this.attr(datum);
          this.show();
        }),
      (exit) => exit.remove(),
    );
}

function createTooltipComponent(
  transientLayer: Selection,
  container: HTMLElement,
  bounding: any,
) {
  let tooltip = transientLayer.select('.tooltip').node() as TooltipComponent;
  if (!tooltip) {
    tooltip = new TooltipComponent({
      className: 'tooltip',
      style: {
        data: [],
        style: {
          container: { x: 0, y: 0 },
          bounding,
          position: 'bottom-right',
          offset: [10, 10],
          style: {
            '.tooltip': {
              'max-width': '170px',
            },
            '.tooltip-title': {
              overflow: 'hidden',
              'white-space': 'nowrap',
              'text-overflow': 'ellipsis',
            },
          },
        },
      },
    });
    transientLayer.append(() => tooltip);
    container.appendChild(tooltip.HTMLTooltipElement);
  }
  return tooltip;
}

function valuesByDim(datum: any, dim: string) {
  return Object.entries(datum)
    .filter(([key]) => key.startsWith(dim))
    .map(([, value]) => value) as number[];
}

/**
 * Point to render tooltip marker.
 */
function getMarkerPoint(datum: any, scale, coordinate): [number, number] {
  const X = valuesByDim(datum, 'x');
  const Y = valuesByDim(datum, 'y');

  const { x: scaleX } = scale;
  const sumX = X.reduce((r, x) => r + x + bandWidth(scaleX, x) / 2, 0);

  return coordinate.map([sumX / X.length, Math.min.apply(null, Y)]);
}

function bandWidth(scale, x): number {
  return scale?.getBandWidth?.(scale.invert(x)) || 0;
}

/**
 * @todo Remove duplicate items.
 */
function getTooltipData(
  context: InteractionContext,
  pointX: number,
  pointY: number,
  theme: G2Theme,
) {
  const { shared, scale, coordinate } = context;
  const { mouseX, mouseY, selectedElements } = shared;
  const { defaultColor } = theme;
  const { x: scaleX } = scale;

  const elements = selectedElements as G2Element[];
  const data = elements
    .map((element) => {
      const { __data__: datum } = element;
      const {
        seriesX = [],
        seriesY = [],
        seriesTooltip = [],
        seriesTitle = [],
      } = datum;

      if (seriesX.length) {
        return seriesX.map((_, i) => {
          const [x, y] = coordinate.map([seriesX[i], seriesY[i]]);
          return {
            x,
            y,
            datum: {
              ...datum,
              x: seriesX[i],
              title: seriesTitle[i],
              tooltip: seriesTooltip[i],
            },
          };
        });
      } else {
        const [x, y] = getMarkerPoint(datum, scale, coordinate);
        return { x, y, datum };
      }
    })
    .flat();

  // Find closestPoint by x (normalized).
  const invertCoordX = coordinate.invert([pointX, pointY])[0];
  const closestPoint = least(
    data,
    ({ datum: { x } }) => (x + bandWidth(scaleX, x) / 2 - invertCoordX) ** 2,
  );

  if (!closestPoint) return null;

  const items = data
    .filter(({ datum: { x } }) => x === closestPoint.datum.x)
    .map((item) => {
      const { datum, x, y } = item;
      const { color = defaultColor, title } = datum;

      return Object.entries(datum)
        .filter(([key]) => key.startsWith('tooltip'))
        .map(([key, d]: any) => {
          const { field, title: name = field } = scale[key].getOptions();
          const isObject = typeof d === 'object' && !(d instanceof Date);
          return {
            x,
            y,
            title,
            color,
            name,
            value: isObject ? d.value : d === undefined ? d : `${d}`,
          };
        })
        .filter(({ value }) => value !== undefined);
    })
    .flat();

  return items.length
    ? {
        x: mouseX,
        y: mouseY,
        // Default use the first one.
        title: items[0].title,
        data: items,
      }
    : null;
}

export type TooltipOptions = Omit<TooltipAction, 'type'>;

/**
 * @todo Using the color(fill or stroke) attribute of each
 * @todo Add tooltip for parallel coordinate
 * shape as the item.
 */
export const Tooltip: AC<TooltipOptions> = (options) => {
  const { showCrosshairs, showMarkers, ...tooltipCfg } = options;
  return (context) => {
    const { scale, coordinate, theme, selection, shared, transientLayer } =
      context;
    const { tooltip } = scale;

    if (tooltip === undefined) {
      hideTooltip(transientLayer);
      return context;
    }

    const { mouseX, mouseY } = shared;
    // Find the first of main layers.
    const plot = selection.select('.plot').node();
    const container = getContainer(plot);
    const { x, y, width, height } = coordinate.getOptions();
    const [x0, y0] = plot.getBounds().min;

    const tooltipComponent = createTooltipComponent(transientLayer, container, {
      x: x0 + x,
      y: y0 + y,
      width,
      height,
    });

    const data = getTooltipData(context, mouseX - x0, mouseY - y0, theme);

    if (!data) {
      hideTooltip(transientLayer);
    } else {
      const { title, data: items } = data;
      tooltipComponent.update({
        style: {
          x: mouseX,
          y: mouseY,
          title,
          position: 'bottom-right',
          offset: [14, 10],
        },
        data: items,
      });
      tooltipComponent.show();
    }

    renderMarkers(context, showMarkers ? data : null, tooltipCfg.markers);
    renderCrosshair(
      context,
      showCrosshairs ? data : null,
      tooltipCfg.crosshairs,
    );

    return context;
  };
};

Tooltip.props = {};
