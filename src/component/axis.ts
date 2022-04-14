import { Coordinate, Vector2 } from '@antv/coord';
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
  position?: GuideComponentPosition;
  zIndex?: number;
};

function inferPosition(
  position: GuideComponentPosition,
  bbox: BBox,
): {
  startPos: [number, number];
  endPos: [number, number];
  labelOffset: [number, number];
  titlePosition: 'start' | 'end' | 'center';
  titleOffset: [number, number];
  tickOffset: number;
  titleRotate: number;
  titleAlign?: 'start' | 'end' | 'center' | 'left' | 'right';
  labelAlign?: 'start' | 'end' | 'center' | 'left' | 'right';
} {
  const { x, y, width, height } = bbox;
  if (position === 'bottom') {
    return {
      startPos: [x, y],
      endPos: [x + width, y],
      labelOffset: [0, 15],
      titlePosition: 'end',
      titleOffset: [0, 30],
      titleRotate: 0,
      tickOffset: 0,
    };
  } else if (position === 'left' || position === 'centerHorizontal') {
    return {
      startPos: [x + width, y],
      endPos: [x + width, y + height],
      labelOffset: [0, -10],
      titlePosition: 'center',
      titleOffset: [-20, 0],
      titleRotate: -90,
      titleAlign: 'end',
      labelAlign: 'end',
      tickOffset: -5,
    };
  } else if (position === 'right') {
    return {
      startPos: [x, y],
      endPos: [x, y + height],
      labelOffset: [0, 8],
      titlePosition: 'center',
      titleOffset: [15, 0],
      titleRotate: -90,
      titleAlign: 'start',
      labelAlign: 'start',
      tickOffset: 0,
    };
  }
  return {
    startPos: [x, y + height],
    endPos: [x + width, y + height],
    labelOffset: [0, -15],
    titlePosition: 'end',
    titleOffset: [0, 30],
    titleRotate: 0,
    tickOffset: 0,
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
    const offset = scale.getBandWidth?.() / 2 || 0;
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
  const { position } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, field, bbox } = value;
    const {
      startPos,
      endPos,
      labelOffset,
      titlePosition,
      titleOffset,
      titleRotate,
      titleAlign,
      labelAlign,
      tickOffset,
    } = inferPosition(position, bbox);
    const ticks = getTicks(scale, domain, position, coordinate);
    return new Linear({
      style: {
        startPos,
        endPos,
        ticks,
        label: {
          offset: labelOffset,
          style: {
            default: {
              textAlign: labelAlign,
            },
          },
        },
        axisLine: {
          style: {
            strokeOpacity: 0,
          },
        },
        tickLine: {
          len: 5,
          offset: tickOffset,
          style: { default: { lineWidth: 1 } },
        },
        ...(field && {
          title: {
            content: Array.isArray(field) ? field[0] : field,
            position: scale.getTicks ? titlePosition : 'center',
            style: {
              textAlign: titleAlign,
            },
            offset: titleOffset,
            rotate: titleRotate,
          },
        }),
      },
    });
  };
};

Axis.props = {
  defaultPosition: 'left',
  defaultSize: 45,
  defaultOrder: 0,
};
