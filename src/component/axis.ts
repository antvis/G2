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
      titlePadding: -20,
      titleOffsetY: -8,
      titleRotate: -90,
      labelOffset: 4,
      verticalFactor: -1,
      label: false,
      axisLine: true,
      tickLine: false,
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

const ArcAxis = (options) => {
  const { position, formatter = (d) => `${d}` } = options;
  return (scale, value, coordinate, theme) => {
    const [cx, cy] = coordinate.getCenter() as Vector2;
    const { domain, bbox } = value;
    const ticks = getTicks(scale, domain, formatter, position, coordinate);
    const radius = Math.min(bbox.width, bbox.height) / 2;
    return new Arc({
      style: deepMix(
        {},
        {
          center: [cx + bbox.x, cy + bbox.y],
          radius,
          startAngle: -90,
          endAngle: 270,
          ticks,
          axisLine: {
            style: {
              lineWidth: 0,
              strokeOpacity: 0,
            },
          },
          tickLine: {
            len: 4,
            style: { lineWidth: 1, stroke: '#BFBFBF' },
          },
          label: {
            align: 'tangential',
            style: { dy: -2 },
          },
        },
        scale.getOptions().guide,
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
  const { position, title = true, formatter = (d) => `${d}` } = options;
  return (scale, value, coordinate, theme) => {
    if (position === 'arc') {
      return ArcAxis(options)(scale, value, coordinate, theme);
    }

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
        scale.getOptions().guide || {},
      ),
    });
  };
};

Axis.props = {
  defaultPosition: 'left',
  defaultSize: 45,
  defaultOrder: 0,
};
