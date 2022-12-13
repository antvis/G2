import { Coordinate } from '@antv/coord';
import { Axis as AxisComponent } from '@antv/gui';
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
  isFisheye,
} from '../utils/coordinate';
import { capitalizeFirst } from '../utils/helper';
import {
  BBox,
  GuideComponentComponent as GCC,
  GuideComponentPosition,
  Scale,
} from '../runtime';
import { titleContent } from './utils';

export type AxisOptions = {
  position?: GuideComponentPosition;
  zIndex?: number;
  title?: string | string[];
  d;
  direction?: 'left' | 'center' | 'right';
  labelFormatter?: (d: any, index: number, array: any) => string;
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
  return ticks.map(({ value, ...rest }) => ({ value: 1 - value, ...rest }));
}

function createFisheye(position, coordinate) {
  const { width, height } = coordinate.getOptions();
  return (tick) => {
    if (!isFisheye(coordinate)) return tick;
    const tickPoint = position === 'bottom' ? [tick, 1] : [0, tick];
    const vector = coordinate.map(tickPoint);
    if (position === 'bottom') {
      const v = vector[0];
      const x = new LinearScale({
        domain: [0, width],
        range: [0, 1],
      });
      return x.map(v);
    } else if (position === 'left') {
      const v = vector[1];
      const x = new LinearScale({
        domain: [0, height],
        range: [0, 1],
      });
      return x.map(v);
    }
    return tick;
  };
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

function prettyNumber(n: number) {
  if (typeof n !== 'number') return n;
  return Math.abs(n) < 1e-15 ? n : parseFloat(n.toFixed(15));
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
 */
function getTicks(
  scale: Scale,
  domain: any[],
  tickCount: number,
  defaultTickFormatter: AxisOptions['labelFormatter'],
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
  const labelFormatter = scale.getFormatter?.() || defaultTickFormatter;
  const applyInset = createInset(position, coordinate);
  const applyFisheye = createFisheye(position, coordinate);

  if (isPolar(coordinate) || isTranspose(coordinate)) {
    const axisTicks = filteredTicks.map((d, i, array) => {
      const offset = scale.getBandWidth?.(d) / 2 || 0;
      const tick = applyInset(scale.map(d) + offset);
      return {
        value: isTranspose(coordinate) && scale.getTicks?.() ? 1 - tick : tick,
        label: labelFormatter(d, i, array),
        id: String(i),
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
    const tick = applyFisheye(applyInset(scale.map(d) + offset));
    return {
      value: tick,
      label: `${labelFormatter(prettyNumber(d), i, array)}`,
      id: String(i),
    };
  });
}

function getGridLength(position: GuideComponentPosition, coordinate) {
  const [width, height] = sizeOf(coordinate);
  if (position === 'bottom' || position === 'top') return height;
  return width;
}

function labelTransforms(autoHide?: boolean, autoRotate?: boolean) {
  const transforms = [];
  if (autoHide) transforms.push({ type: 'hide' });
  if (autoRotate)
    transforms.push({ type: 'rotate', optionalAngles: [0, 30, 45, 60, 90] });
  return transforms;
}

function inferArcStyle(
  position: GuideComponentPosition,
  innerRadius: number,
  outerRadius: number,
  coordinate: Coordinate,
) {
  const [w, h] = sizeOf(coordinate);
  const r = Math.min(w, h) / 2;

  const common = {
    titleFillOpacity: 0,
    titlePosition: 'inner',
    showLine: false,
    showTick: true,
    gridLength: (outerRadius - innerRadius) * r,
  };

  if (position === 'arcInner') {
    const [w, h] = sizeOf(coordinate);
    const r = Math.min(w, h) / 2;
    return {
      ...common,
      labelAlign: 'perpendicular',
      labelDirection: 'positive',
      labelSpacing: 4,
      tickDirection: 'positive',
      gridDirection: 'negative',
    };
  }

  return {
    ...common,
    labelAlign: 'parallel',
    labelDirection: 'negative',
    labelSpacing: 8,
    tickDirection: 'negative',
    gridDirection: 'positive',
  };
}

function inferGrid(value: boolean, coordinate: Coordinate, scale: Scale) {
  if (isTheta(coordinate) || isParallel(coordinate)) return false;
  // Display axis grid for non-discrete values.
  return value === undefined ? !!scale.getTicks : value;
}

function inferOverrideStyle(
  position: GuideComponentPosition,
  bbox: BBox,
  coordinate: Coordinate,
): {
  startPos: [number, number];
  endPos: [number, number];
  showLine?: boolean;
  [k: string]: any;
} {
  const [, cy] = coordinate.getCenter();
  const { x, y, width, height } = bbox;

  if (position === 'bottom') {
    return {
      startPos: [x, y],
      endPos: [x + width, y],
    };
  } else if (position === 'left' || position === 'centerHorizontal') {
    return {
      startPos: [x + width, y],
      endPos: [x + width, y + height],
      showLine: position === 'centerHorizontal' ? true : undefined,
    };
  } else if (position === 'right') {
    return {
      endPos: [x, y + height],
      startPos: [x, y],
    };
  } else if (position === 'arcY') {
    return {
      startPos: [x, y],
      endPos: [x + width, y + height],
      gridCenter: [bbox.x, cy + bbox.y],
    };
  }

  return {
    startPos: [x, y + height],
    endPos: [x + width, y + height],
    showLine: position === 'centerVertical' ? true : undefined,
  };
}

const ArcAxis = (options) => {
  const {
    order,
    size,
    position,
    labelFormatter = (d) => `${d}`,
    tickFilter,
    tickCount,
    tickMethod,
    title,
    grid: showGrid = false,
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
      labelFormatter,
      tickFilter,
      tickMethod,
      position,
      coordinate,
    );

    const radius = Math.min(width, height) / 2;
    const [startAngle, endAngle] = angleOf(coordinate);
    const [innerRadius, outerRadius] = radiusOf(coordinate);

    const defaultStyle = inferArcStyle(
      position,
      innerRadius,
      outerRadius,
      coordinate,
    );
    const { axis: axisTheme } = theme;
    return new AxisComponent({
      style: deepMix({}, axisTheme, defaultStyle, {
        type: 'arc',
        center,
        radius,
        angleRange: [startAngle, endAngle],
        data: ticks,
        title: titleContent(title),
        showGrid,
        ...rest,
      }),
    });
  };
};

function inferDefaultStyle(scale, theme, position, direction) {
  const p = position === 'centerHorizontal' ? 'left' : position;

  const themeStyle = Object.assign(
    {},
    theme.axis,
    theme[`axis${capitalizeFirst(p)}`] || theme.axisTop,
  );

  if (position === 'bottom') {
    return {
      ...themeStyle,
      titlePosition: scale.getTicks ? 'right-bottom' : 'bottom',
      titleTransformOrigin: 'center',
      titleTransform: scale.getTicks ? 'translate(-100%, 0)' : undefined,
    };
  } else if (position === 'arcY') {
    return {
      ...themeStyle,
      labelDirection: direction === 'right' ? 'negative' : 'positive',
      labelTransform: direction === 'center' ? 'translate(50%, 0)' : '',
      tickDirection: direction === 'right' ? 'negative' : 'positive',
      labelSpacing: direction === 'center' ? 0 : 4,
    };
  }

  return themeStyle;
}

const LinearAxis: GCC<AxisOptions> = (options) => {
  const {
    order,
    size,
    transform,
    position,
    title,
    labelFormatter = (d) => `${d}`,
    direction = 'left',
    tickCount,
    tickFilter,
    tickMethod,
    ...userDefinitions
  } = options;

  return (scale, value, coordinate, theme) => {
    const { domain, bbox } = value;

    const ticks = getTicks(
      scale,
      domain,
      tickCount,
      labelFormatter,
      tickFilter,
      tickMethod,
      position,
      coordinate,
    );

    const defaultStyle = inferDefaultStyle(scale, theme, position, direction);
    const {
      labelAutoRotate = true,
      labelAutoHide = false,
      label: showLabel = true,
      tick: showTick = true,
      line = false,
      grid,
    } = Object.assign({}, defaultStyle, userDefinitions);

    const showGrid = inferGrid(grid, coordinate, scale);
    const gridLength = getGridLength(position, coordinate);

    const { showLine = line, ...overrideStyle } = inferOverrideStyle(
      position,
      bbox,
      coordinate,
    );

    const axisStyle = {
      ...defaultStyle,
      type: 'linear' as const,
      data: ticks,
      title: titleContent(title),
      showLabel,
      labelTransforms: labelTransforms(labelAutoHide, labelAutoRotate),
      showGrid,
      showTick,
      gridLength,
      ...userDefinitions,
      // Always showLine, make title could align the end of axis.
      showLine: true,
      ...(!showLine ? { lineOpacity: 0 } : null),
      ...overrideStyle,
    };

    return new AxisComponent({ style: axisStyle });
  };
};

/**
 * Guide Component for position channel(e.g. x, y).
 */
export const Axis: GCC<AxisOptions> = (options) => {
  const { position, labelFormatter: f = (d) => `${d}` } = options;
  const labelFormatter = typeof f === 'string' ? format(f) : f;
  const normalizedOptions = { ...options, labelFormatter };
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
