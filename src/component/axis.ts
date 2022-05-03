import { Coordinate, Vector2 } from '@antv/coord';
import { Group } from '@antv/g';
import { Linear } from '@antv/gui';
import { Linear as LinearScale } from '@antv/scale';
import { isParallel } from '../utils/coordinate';
import {
  BBox,
  GuideComponentComponent as GCC,
  GuideComponentPosition,
  Scale,
} from '../runtime';

export type AxisOptions = {
  container: Group;
  position?: GuideComponentPosition;
  zIndex?: number;
  title?: boolean;
};

function inferPosition(
  position: GuideComponentPosition,
  bbox: BBox,
  showTitle?: boolean,
): {
  startPos: [number, number];
  endPos: [number, number];
  labelOffset: number;
  titlePosition: 'start' | 'end' | 'center';
  titlePadding: number;
  titleRotate: number;
  verticalFactor: 1 | -1;
  labelLimit?: number;
  titleBounds?: { x1?: number; x2?: number };
  labelAlign?: 'start' | 'end' | 'center' | 'left' | 'right';
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
      titlePadding: 4,
      titleRotate: -90,
      labelAlign: 'end',
      labelOffset: 4,
      verticalFactor: -1,
      // 16px for show axis-title.
      labelLimit: showTitle && position === 'left' ? width - 16 : undefined,
      // Limit axis-title not out-of bounds. 14px is determined by fontSize and textBaseline.
      titleBounds:
        showTitle && position === 'left'
          ? { x1: x + 14, x2: x + width }
          : undefined,
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
  position: GuideComponentPosition,
  coordinate: Coordinate,
) {
  const ticks = scale.getTicks?.() || domain;
  const formatter = scale.getFormatter?.() || ((d) => `${d}`);
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

/**
 * Guide Component for position channel(e.g. x, y).
 * @todo Render Circular in polar coordinate.
 * @todo Custom style.
 */
export const Axis: GCC<AxisOptions> = (options) => {
  const { container, position, title = true } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, field, bbox } = value;
    const showTitle = field && title;
    const {
      startPos,
      endPos,
      labelOffset,
      titlePosition,
      titlePadding,
      titleRotate,
      verticalFactor,
      labelLimit,
      titleBounds,
    } = inferPosition(position, bbox, showTitle);
    const ticks = getTicks(scale, domain, position, coordinate);
    const axis = new Linear({
      style: {
        container,
        startPos,
        endPos,
        verticalFactor,
        ticks,
        label: {
          tickPadding: labelOffset,
          maxLength: labelLimit,
          style: {},
        },
        axisLine: {
          style: {
            strokeOpacity: 0,
          },
        },
        tickLine: {
          len: 5,
          style: { lineWidth: 1 },
        },
        ...(showTitle && {
          title: {
            content: Array.isArray(field) ? field[0] : field,
            titleAnchor: scale.getTicks ? titlePosition : 'center',
            style: {},
            titlePadding,
            rotate: titleRotate,
            bounds: titleBounds,
          },
        }),
      },
    });
    return axis;
  };
};

Axis.props = {
  defaultPosition: 'left',
  defaultSize: 45,
  defaultOrder: 0,
};
