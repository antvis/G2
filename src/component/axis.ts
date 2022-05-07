import { Coordinate, Vector2 } from '@antv/coord';
import { Linear } from '@antv/gui';
import { deepMix, get, upperFirst } from '@antv/util';
import { Linear as LinearScale } from '@antv/scale';
import { isParallel } from '../utils/coordinate';
import {
  BBox,
  G2Theme,
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
): {
  startPos: [number, number];
  endPos: [number, number];
  verticalFactor: 1 | -1;
} {
  const { x, y, width, height } = bbox;
  if (position === 'bottom') {
    return {
      startPos: [x, y],
      endPos: [x + width, y],
      verticalFactor: 1,
    };
  } else if (position === 'left' || position === 'centerHorizontal') {
    return {
      startPos: [x + width, y],
      endPos: [x + width, y + height],
      verticalFactor: -1,
    };
  } else if (position === 'right') {
    return {
      startPos: [x, y],
      endPos: [x, y + height],
      verticalFactor: 1,
    };
  }
  return {
    startPos: [x, y + height],
    endPos: [x + width, y + height],
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

function getTheme(theme: G2Theme, position: string) {
  const axisTheme = deepMix(
    {},
    get(theme, 'axis'),
    get(theme, `axis${upperFirst(position)}`),
  );
  return {
    title: {
      titlePadding: get(axisTheme, 'titlePadding'),
      rotate: get(axisTheme, 'titleRotate'),
      style: get(axisTheme, 'title'),
    },
    tickLine: {
      len: get(axisTheme, 'tickLineLength'),
      style: get(axisTheme, 'tickLine'),
    },
    subTickLine: {
      len: get(axisTheme, 'subTickLineLength'),
      count: get(axisTheme, 'subTickLineCount'),
      style: get(axisTheme, 'subTickLine'),
    },
    label: {
      tickPadding: get(axisTheme, 'labelOffset'),
      style: get(axisTheme, 'label'),
    },
    axisLine: {
      style: get(axisTheme, 'line'),
    },
  };
}
/**
 * Guide Component for position channel(e.g. x, y).
 * @todo Render Circular in polar coordinate.
 * @todo Custom style.
 */
export const Axis: GCC<AxisOptions> = (options) => {
  const { position, title = true, formatter = (d) => `${d}` } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, field, bbox } = value;
    const { startPos, endPos, verticalFactor } = inferPosition(position, bbox);
    const ticks = getTicks(scale, domain, formatter, position, coordinate);
    const themeOptions = getTheme(theme, position);
    const axis = new Linear({
      style: deepMix({}, themeOptions, {
        startPos,
        endPos,
        verticalFactor,
        ticks,
        title:
          field && title
            ? {
                content: Array.isArray(field) ? field[0] : field,
                titleAnchor: !scale.getTicks ? 'center' : undefined,
              }
            : null,
      }),
    });
    return axis;
  };
};

Axis.props = {
  defaultPosition: 'left',
  defaultSize: 45,
  defaultOrder: 0,
};
