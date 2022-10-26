import { Coordinate, Vector2 } from '@antv/coord';
import { Arc, Linear } from '@antv/gui';
import { Linear as LinearScale } from '@antv/scale';
import { deepMix } from '@antv/util';
import { format } from 'd3-format';
import { extent } from 'd3-array';
import {
  isParallel,
  isPolar,
  isTranspose,
  isTheta,
  isRadial,
} from '../utils/coordinate';
import {
  BBox,
  GuideComponentComponent as GCC,
  GuideComponentPosition,
  Scale,
} from '../runtime';
import { subObject } from '../utils/helper';

export type AxisOptions = {
  position?: GuideComponentPosition;
  zIndex?: number;
  title?: string | string[];
  direction?: 'left' | 'center' | 'right';
  tickFormatter?: (d: any, index: number, array: any) => string;
  tickFilter?: (datum: any, index: number, array: any) => boolean;
  tickMethod?: (
    start: number | Date,
    end: number | Date,
    tickCount: number,
  ) => number[];
  tickCount?: number;
  grid: any;
  [key: string]: any;
};

function inferPosition(
  position: GuideComponentPosition,
  direction: string,
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
    return {
      startPos: [x, y],
      endPos: [x + width, y + height],
      titlePosition: 'start',
      titlePadding: 4,
      titleOffsetY: -5,
      titleRotate: 0,
      labelOffset: direction === 'left' ? 4 : direction === 'right' ? -4 : 0,
      verticalFactor: -1,
      labelAlign:
        direction === 'center'
          ? 'center'
          : direction === 'right'
          ? 'start'
          : undefined,
      axisLine: false,
    };
  }
  // position === 'centerVertical'
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

function angleOf(coordinate: Coordinate): [number, number] {
  const { transformations } = coordinate.getOptions();
  const [, startAngle, endAngle] = transformations.find(
    (d) => d[0] === 'polar',
  );
  return [(+startAngle * 180) / Math.PI, (+endAngle * 180) / Math.PI];
}

function radiusOf(coordinate: Coordinate): [number, number] {
  const { transformations } = coordinate.getOptions();
  const [, , , innerRadius, outerRadius] = transformations.find(
    (d) => d[0] === 'polar',
  );
  return [+innerRadius, +outerRadius];
}

function sizeOf(coordinate: Coordinate): [number, number] {
  // @ts-ignore
  const { innerWidth, innerHeight } = coordinate.getOptions();
  return [innerWidth, innerHeight];
}

function reverseTicks(ticks) {
  return ticks.map(({ value, text }) => ({ value: 1 - value, text }));
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

function ticksOf(
  scale: Scale,
  domain: any[],
  tickMethod: AxisOptions['tickMethod'],
) {
  if (scale.getTicks) return scale.getTicks();
  if (!tickMethod) return domain;
  const [min, max] = extent(domain, (d) => +d);
  const { tickCount } = scale.getOptions();
  return tickMethod(min, max, tickCount);
}

// Set inset for axis.
function createInset(position, coordinate) {
  const options = coordinate.getOptions();
  const {
    innerWidth,
    innerHeight,
    insetTop,
    insetBottom,
    insetLeft,
    insetRight,
  } = options;
  const [start, end, size] =
    position === 'left' || position === 'right'
      ? [insetTop, insetBottom, innerHeight]
      : [insetLeft, insetRight, innerWidth];
  const x = new LinearScale({
    domain: [0, 1],
    range: [start / size, 1 - end / size],
  });
  return (i) => x.map(i);
}

/**
 * Calc ticks based on scale and coordinate.
 * @todo Parallel coordinate.
 * @todo More position besides bottom and left.
 */
function getTicks(
  scale: Scale,
  domain: any[],
  tickCount: number,
  defaultTickFormatter: AxisOptions['tickFormatter'],
  tickFilter: AxisOptions['tickFilter'],
  tickMethod: AxisOptions['tickMethod'],
  position: GuideComponentPosition,
  coordinate: Coordinate,
) {
  if (tickCount !== undefined || tickMethod !== undefined) {
    scale.update({
      ...(tickCount && { tickCount }),
      ...(tickMethod && { tickMethod }),
    });
  }

  const ticks = ticksOf(scale, domain, tickMethod);
  const filteredTicks = tickFilter ? ticks.filter(tickFilter) : ticks;
  const tickFormatter = scale.getFormatter?.() || defaultTickFormatter;
  const applyInset = createInset(position, coordinate);

  if (isPolar(coordinate) || isTranspose(coordinate)) {
    const axisTicks = filteredTicks.map((d, i, array) => {
      const offset = scale.getBandWidth?.(d) / 2 || 0;
      const tick = applyInset(scale.map(d) + offset);
      return {
        value: isTranspose(coordinate) && scale.getTicks?.() ? 1 - tick : tick,
        text: tickFormatter(d, i, array),
      };
    });
    // @todo GUI should consider the overlap problem for the first
    // and label of arc axis.
    return isRadial(coordinate) && position === 'arcY'
      ? reverseTicks(axisTicks)
      : axisTicks;
  }

  return filteredTicks.map((d, i, array) => {
    const offset = scale.getBandWidth?.(d) / 2 || 0;
    const tick = applyInset(scale.map(d) + offset);
    // @todo For interaction.
    // const point = getTickPoint(tick, position);
    // const vector = coordinate.map(point) as Vector2;
    // const value = getTickValue(vector, position, coordinate);
    return {
      value: tick,
      text: `${tickFormatter(d, i, array)}`,
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
  const [width, height] = sizeOf(coordinate);
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
  innerRadius: number,
  outerRadius: number,
  coordinate: Coordinate,
) {
  const [cx, cy] = center;
  const [w, h] = sizeOf(coordinate);
  const r = Math.min(w, h) / 2;
  const ir = innerRadius * r;
  const or = outerRadius * r;
  return ticks.map(({ value }) => {
    const angle = (endAngle - startAngle) * value + startAngle;
    const dx = Math.cos((angle * Math.PI) / 180);
    const dy = Math.sin((angle * Math.PI) / 180);
    return {
      points: [
        [cx + ir * dx, cy + ir * dy],
        [cx + or * dx, cy + or * dy],
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
  if (isTheta(coordinate) || isParallel(coordinate)) return [];
  return ticks.map((tick) => {
    const points = getTickGridItem(
      tick.value,
      position,
      coordinate,
      startPos,
      endPos,
    );
    const finalPoints = isPolar(coordinate) ? [points[0]] : points;
    return { points: finalPoints };
  });
}

function titleContent(field: string | string[]): string {
  return Array.isArray(field) ? field.join(', ') : `${field}`;
}

const ArcAxis = (options) => {
  const {
    position,
    tickFormatter = (d) => `${d}`,
    tickFilter,
    tickCount,
    tickMethod,
    ...rest
  } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, bbox } = value;
    const { x, y, width, height } = bbox;
    const center: [number, number] = [x + width / 2, y + height / 2];
    const ticks = getTicks(
      scale,
      domain,
      tickCount,
      tickFormatter,
      tickFilter,
      tickMethod,
      position,
      coordinate,
    );

    const radius = Math.min(width, height) / 2;
    const [startAngle, endAngle] = angleOf(coordinate);
    const [innerRadius, outerRadius] = radiusOf(coordinate);
    const { grid: showGrid = false } = rest;
    const gridItems = showGrid
      ? getArcGridItems(
          ticks,
          center,
          startAngle,
          endAngle,
          innerRadius,
          outerRadius,
          coordinate,
        )
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
          verticalFactor: position === 'arc' ? 1 : -1,
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
            // @todo fix bug in @antv/gui related to tangential.
            align: position === 'arcInner' ? 'radial' : 'tangential',
            tickPadding: 2,
          },
        },
      ),
    });
  };
};

const LinearAxis: GCC<AxisOptions> = (options) => {
  const {
    position,
    title,
    tickFormatter = (d) => `${d}`,
    direction = 'left',
    tickCount,
    tickFilter,
    tickMethod,
    titleAnchor,
    ...rest
  } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, bbox } = value;
    const {
      startPos,
      endPos,
      labelOffset,
      titlePosition,
      titlePadding,
      titleRotate,
      verticalFactor,
      titleOffsetY,
      labelAlign,
      axisLine,
      label = options.label === undefined ? true : options.label,
      tickLine = options.tickLine === undefined ? true : options.tickLine,
    } = inferPosition(position, direction, bbox, coordinate);
    const ticks = getTicks(
      scale,
      domain,
      tickCount,
      tickFormatter,
      tickFilter,
      tickMethod,
      position,
      coordinate,
    );
    const anchor =
      position === 'arcY' || scale.getTicks ? titlePosition : 'center';
    const [, cy] = coordinate.getCenter();
    // Display axis grid for non-discrete values.
    const { grid: showGrid = !!scale.getTicks } = rest;
    const gridItems = showGrid
      ? getGridItems(ticks, position, coordinate, startPos, endPos)
      : [];

    const { axis: axisTheme } = theme;
    const axisLineStyle = subObject(rest, 'line');
    return new Linear({
      style: deepMix({
        startPos,
        endPos,
        verticalFactor,
        ticks,
        label: label
          ? {
              tickPadding: labelOffset,
              autoHide: false,
              autoRotate: true,
              style: {
                ...subObject(axisTheme, 'label'),
                ...(labelAlign && { textAlign: labelAlign }),
                ...subObject(rest, 'label'),
              },
            }
          : null,
        axisLine:
          axisLine || Object.keys(axisLineStyle).length
            ? {
                style: {
                  ...subObject(axisTheme, 'axisLine'),
                  ...axisLineStyle,
                },
              }
            : null,
        grid: {
          items: gridItems,
          lineStyle: subObject(axisTheme, 'gridLine'),
          ...(position === 'arcY' && {
            type: 'circle',
            center: [bbox.x, cy + bbox.y],
            closed: true,
          }),
        },
        tickLine: tickLine
          ? {
              len: 4,
              style: {
                ...subObject(axisTheme, 'tickLine'),
                ...subObject(rest, 'tick'),
              },
            }
          : null,
        ...(title && {
          title: {
            content: titleContent(title),
            titleAnchor: titleAnchor || anchor,
            style: {
              ...subObject(axisTheme, 'title'),
              dy: titleOffsetY,
              textAnchor: anchor,
              ...subObject(rest, 'title'),
            },
            titlePadding,
            rotate: titleRotate,
          },
        }),
      }),
    });
  };
};

/**
 * Guide Component for position channel(e.g. x, y).
 * @todo Render Circular in polar coordinate.
 * @todo Custom style.
 */
export const Axis: GCC<AxisOptions> = (options) => {
  const { position, tickFormatter: f = (d) => `${d}` } = options;
  const tickFormatter = typeof f === 'string' ? format(f) : f;
  const normalizedOptions = { ...options, tickFormatter };
  return (scale, value, coordinate, theme) => {
    return position === 'arc' || position === 'arcInner'
      ? ArcAxis(normalizedOptions)(scale, value, coordinate, theme)
      : LinearAxis(normalizedOptions)(scale, value, coordinate, theme);
  };
};

Axis.props = {
  defaultPosition: 'left',
  defaultSize: 45,
  defaultOrder: 0,
};
