import { Linear } from '@antv/gui';
import {
  BBox,
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';

export type AxisOptions = {
  position?: GuideComponentPosition;
};

/**
 * Guide Component for position channel(e.g. x, y).
 * @todo Render Circular in polar coordinate.
 * @todo Custom style.
 */
export const Axis: GCC<AxisOptions> = (options) => {
  const { position } = options;
  return (scale, bbox, value, coordinate, theme) => {
    const { domain, field } = value;
    const {
      startPos,
      endPos,
      labelOffset,
      titlePosition,
      titleOffset,
      titleRotate,
      titleAlign,
      labelAlign,
    } = inferPosition(position, bbox);
    const tickNumbers = scale.getTicks?.() || domain;
    const formatter = scale.getFormatter ? scale.getFormatter() : (d) => `${d}`;
    const ticks = tickNumbers.map((d) => {
      const offset = scale.getBandWidth?.() / 2 || 0;
      return {
        value: scale.map(d) + offset,
        text: formatter(d),
      };
    });
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
          style: { default: { lineWidth: 1 } },
        },
        ...(field && {
          title: {
            content: field,
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

function inferPosition(
  position: GuideComponentPosition,
  bbox: BBox,
): {
  startPos: [number, number];
  endPos: [number, number];
  labelOffset: [number, number];
  titlePosition: 'start' | 'end';
  titleOffset: [number, number];
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
    };
  } else if (position === 'left') {
    return {
      startPos: [x + width, y],
      endPos: [x + width, y + height],
      labelOffset: [0, -5],
      titlePosition: 'start',
      titleOffset: [0, -20],
      titleRotate: 0,
      titleAlign: 'end',
      labelAlign: 'end',
    };
  } else if (position === 'right') {
    return {
      startPos: [x, y],
      endPos: [x, y + height],
      labelOffset: [0, 15],
      titlePosition: 'start',
      titleOffset: [0, 30],
      titleRotate: 0,
    };
  }
  return {
    startPos: [x, y + height],
    endPos: [x + width, y + height],
    labelOffset: [0, -15],
    titlePosition: 'end',
    titleOffset: [0, 30],
    titleRotate: 0,
  };
}
