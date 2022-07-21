import { Coordinate, Vector2 } from '@antv/coord';
import { Arc, Linear } from '@antv/gui';
import { Linear as LinearScale } from '@antv/scale';
import { deepMix } from '@antv/util';
import { isParallel, isPolar, isTranspose } from '../utils/coordinate';
import {
  BBox,
  GuideComponentComponent as GCC,
  GuideComponentPosition,
  Scale,
} from '../runtime';

export type AxisOptions = {
  position?: GuideComponentPosition;
  zIndex?: number;
  title?: boolean;
  formatter?: (d: any) => string;
};

function inferPosition(
  position: GuideComponentPosition,
  bbox: BBox,
  coordinate: Coordinate,
): {
  startPos: [number, number];
  endPos: [number, number];
  labelOffset: number;
  titlePosition: 'start' | 'end' | 'center';
  titlePadding: number;
  titleRotate: number;
  verticalFactor: 1 | -1;
  titleOffsetY?: number;
  labelAlign?: 'start' | 'end' | 'center' | 'left' | 'right';
  label?: boolean;
  axisLine?: boolean;
  tickLine?: boolean;
} {
  const { x, y, width, height } = bbox;
  if (position === 'bottom') {
    return {
      startPos: [x, y],
      endPos: [x + width, y],
      labelOffset: 8,
      titlePosition: 'end',
      titlePadding: 2,
      titleRotate: 0,
      verticalFactor: 1,
    };
  } else if (position === 'left' || position === 'centerHorizontal') {
    return {
      startPos: [x + width, y],
      endPos: [x + width, y + height],
      titlePosition: 'center',
      titlePadding: 6,
      titleRotate: -90,
      labelAlign: 'end',
      labelOffset: 4,
      verticalFactor: -1,
    };
  } else if (position === 'right') {
    return {
      startPos: [x, y],
      endPos: [x, y + height],
      titlePosition: 'center',
      titlePadding: 16,
      titleRotate: -90,
      labelAlign: 'start',
      labelOffset: 4,
      verticalFactor: 1,
    };
  } else if (position === 'arcY') {
    const [cx, cy] = coordinate.getCenter() as Vector2;
    const radius = Math.min(bbox.width, bbox.height) / 2;
    return {
      startPos: [cx + bbox.x, cy + bbox.y - radius],
      endPos: [cx + bbox.x, cy + bbox.y],
      titlePosition: 'start',
      titlePadding: 4,
      titleOffsetY: 0,
      titleRotate: -90,
      labelOffset: 4,
      verticalFactor: -1,
      axisLine: false,
    };
  }
  return {
    startPos: [x, y + height],
    endPos: [x + width, y + height],
    titlePosition: 'end',
    titlePadding: 2,
    titleRotate: 0,
    labelOffset: 4,
    verticalFactor: -1,
  };
}

/**
 * @todo More position besides bottom and left.
 */
function getTickValue(
  vector: [number, number],
  position: GuideComponentPosition,
  coordinate: Coordinate,
) {
  const { width, height } = coordinate.getOptions();
  if (position === 'bottom') {
    const v = vector[0];
    const x = new LinearScale({
      domain: [0, width],
      range: [0, 1],
    });
    return x.map(v);
  }
  const v = vector[1];
  const x = new LinearScale({
    domain: [0, height],
    range: [0, 1],
  });
  return x.map(v);
}

/**
 * @todo More position besides bottom and left.
 */
function getTickPoint(tick: number, position: GuideComponentPosition) {
  return position === 'bottom' ? [tick, 1] : [0, tick];
}

/**
 * Calc ticks based on scale and coordinate.
 * @todo Parallel coordinate.
 * @todo More position besides bottom and left.
 */
function getTicks(
  scale: Scale,
  domain: any[],
  defaultFormatter: (d: any) => string,
  position: GuideComponentPosition,
  coordinate: Coordinate,
) {
  const ticks = scale.getTicks?.() || domain;
  const formatter = scale.getFormatter?.() || defaultFormatter;

  if (isPolar(coordinate) || isTranspose(coordinate)) {
    const axisTicks = ticks.map((d) => {
      const offset = scale.getBandWidth?.(d) / 2 || 0;
      const tick = scale.map(d) + offset;
      return {
        value: isTranspose(coordinate) && scale.getTicks?.() ? 1 - tick : tick,
        text: formatter(d),
      };
    });
    // @todo GUI should consider the overlap problem for the first
    // and label of arc axis.
    return axisTicks;
  }

  return ticks.map((d) => {
    const offset = scale.getBandWidth?.(d) / 2 || 0;
    const tick = scale.map(d) + offset;
    const point = getTickPoint(tick, position);
    const vector = coordinate.map(point) as Vector2;
    const value = getTickValue(vector, position, coordinate);
    return {
      value: isParallel(coordinate) ? tick : value,
      text: formatter(d),
    };
  });
}

function getTickGridItem(
  tick: number,
  position: GuideComponentPosition,
  coordinate: Coordinate,
  startPos: Vector2,
  endPos: Vector2,
) {
  const [sx, sy] = startPos;
  const [ex, ey] = endPos;
  const [width, height] = coordinate.getSize();
  let x1, x2, y1, y2;
  if (position === 'bottom' || position === 'top') {
    x1 = x2 = sx + (ex - sx) * tick;
    y1 = sy;
    y2 = position === 'bottom' ? sy - height : sy + height;
  } else {
    y1 = y2 = sy + (ey - sy) * tick;
    x1 = sx;
    x2 = position === 'left' ? sx + width : sx - width;
  }
  return [
    [x1, y1],
    [x2, y2],
  ];
}

function getArcGridItems(
  ticks: any[],
  center: [number, number],
  startAngle: number,
  endAngle: number,
  radius: number,
) {
  const [cx, cy] = center;
  return ticks.map(({ value }) => {
    const angle = (endAngle - startAngle) * value + startAngle;
    return {
      points: [
        [cx, cy],
        [
          cx + radius * Math.cos((angle * Math.PI) / 180),
          cy + radius * Math.sin((angle * Math.PI) / 180),
        ],
      ],
    };
  });
}

/**
 * @todo render grid in arcY positioned axis.
 */
function getGridItems(
  ticks: any[],
  position: GuideComponentPosition,
  coordinate: any,
  startPos: Vector2,
  endPos: Vector2,
) {
  if (isPolar(coordinate) || isParallel(coordinate)) return [];
  return ticks.map((tick) => {
    const points = getTickGridItem(
      tick.value,
      position,
      coordinate,
      startPos,
      endPos,
    );
    return { points };
  });
}

const ArcAxis = (options) => {
  const { position, formatter = (d) => `${d}` } = options;
  return (scale, value, coordinate, theme) => {
    const [cx, cy] = coordinate.getCenter() as Vector2;
    const { domain, bbox } = value;
    const center = [cx + bbox.x, cy + bbox.y] as [number, number];
    const ticks = getTicks(scale, domain, formatter, position, coordinate);
    const radius = Math.min(bbox.width, bbox.height) / 2;
    const startAngle = -90;
    const endAngle = 270;

    const guideOptions = scale.getOptions().guide || {};
    const { grid: showGrid } = guideOptions;
    const gridItems = showGrid
      ? getArcGridItems(ticks, center, startAngle, endAngle, radius)
      : [];
    return new Arc({
      style: deepMix(
        {},
        {
          center,
          radius,
          startAngle,
          endAngle,
          ticks,
          axisLine: {
            style: {
              lineWidth: 0,
              strokeOpacity: 0,
            },
          },
          grid: {
            items: gridItems,
            lineStyle: {
              stroke: '#1b1e23',
              strokeOpacity: 0.1,
              lineDash: [0, 0],
            },
          },
          tickLine: {
            len: 4,
            style: { lineWidth: 1, stroke: '#BFBFBF' },
          },
          label: {
            align: 'tangential',
            tickPadding: 2,
          },
        },
        guideOptions,
      ),
    });
  };
};

const LinearAxis: GCC<AxisOptions> = (options) => {
  const { position, title = true, formatter = (d) => `${d}` } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, field, bbox } = value;
    const {
      startPos,
      endPos,
      labelOffset,
      titlePosition,
      titlePadding,
      titleRotate,
      verticalFactor,
      titleOffsetY,
      label = true,
      axisLine,
      tickLine = true,
    } = inferPosition(position, bbox, coordinate);
    const ticks = getTicks(scale, domain, formatter, position, coordinate);

    const guideOptions = scale.getOptions().guide || {};
    // Display axis grid for non-discrete values.
    const { grid: showGrid = !!scale.getTicks } = guideOptions;
    const gridItems = showGrid
      ? getGridItems(ticks, position, coordinate, startPos, endPos)
      : [];
    return new Linear({
      style: deepMix(
        {
          startPos,
          endPos,
          verticalFactor,
          ticks,
          label: label
            ? {
                tickPadding: labelOffset,
                autoHide: false,
                style: {},
              }
            : null,
          axisLine: axisLine ? { stroke: '#BFBFBF' } : null,
          grid: {
            items: gridItems,
            lineStyle: {
              stroke: '#1b1e23',
              strokeOpacity: 0.1,
              lineDash: [0, 0],
            },
          },
          tickLine: tickLine
            ? {
                len: 4,
                style: { lineWidth: 1, stroke: '#BFBFBF' },
              }
            : null,
          ...(field &&
            title && {
              title: {
                content: Array.isArray(field) ? field[0] : field,
                titleAnchor: scale.getTicks ? titlePosition : 'center',
                style: { fontWeight: 'bold', fillOpacity: 1, dy: titleOffsetY },
                titlePadding,
                rotate: titleRotate,
              },
            }),
        },
        guideOptions,
      ),
    });
  };
};

/**
 * Guide Component for position channel(e.g. x, y).
 * @todo Render Circular in polar coordinate.
 * @todo Custom style.
 */
export const Axis: GCC<AxisOptions> = (options) => {
  const { position } = options;
  return (scale, value, coordinate, theme) => {
    return position === 'arc'
      ? ArcAxis(options)(scale, value, coordinate, theme)
      : LinearAxis(options)(scale, value, coordinate, theme);
  };
};

Axis.props = {
  defaultPosition: 'left',
  defaultSize: 45,
  defaultOrder: 0,
};
