import { Coordinate, Vector2 } from '@antv/coord';
import { Axis as AxisComponent, AxisStyleProps } from '@antv/gui';
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

/**
 * @todo More position besides bottom and left.
 */
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
 * @todo Parallel coordinate.
 * @todo More position besides bottom and left.
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

function inferStyle(
  position: GuideComponentPosition,
  direction: string,
  bbox: BBox,
  coordinate: Coordinate,
  scale: Scale,
): {
  type: 'linear';
  startPos: [number, number];
  endPos: [number, number];
  labelSpacing: number;
  titlePosition: AxisStyleProps['titlePosition'];
  titleTextBaseline: 'top' | 'bottom' | 'middle';
  titleSpacing?: number;
  titleTransform: string;
  titleTransformOrigin: string;
  labelDirection: 'negative' | 'positive';
  labelTransform?: string;
  tickDirection: 'negative' | 'positive';
  showLabel?: boolean;
  showTick?: boolean;
  gridLength: number;
  gridDirection: 'negative' | 'positive';
  gridConnect?: string;
  gridType?: string;
  gridCenter?: Vector2;
  gridControlAngles?: number[];
  girdClosed?: true;
} {
  const gridLength = getGridLength(position, coordinate);
  const [, cy] = coordinate.getCenter();
  const { x, y, width, height } = bbox;

  const common = {
    type: 'linear' as const,
    lineArrow: null,
    titleTransform: undefined,
    titleTransformOrigin: 'center',
    labelAlign: 'horizontal',
    gridLength,
  };

  if (position === 'bottom') {
    return {
      ...common,
      startPos: [x, y],
      endPos: [x + width, y],
      titlePosition: scale.getTicks ? 'right-bottom' : 'bottom',
      titleTransform: scale.getTicks ? 'translate(-100%, 0)' : undefined,
      titleSpacing: 10,
      titleTextBaseline: 'bottom',
      labelSpacing: 12,
      labelDirection: 'positive',
      tickDirection: 'positive',
      gridDirection: 'negative',
    };
  } else if (position === 'left' || position === 'centerHorizontal') {
    return {
      ...common,
      startPos: [x + width, y],
      endPos: [x + width, y + height],
      titleSpacing: 10,
      titleTextBaseline: 'middle',
      titlePosition: 'left',
      titleTransform: `translate(50%, 0) rotate(-90)`,
      labelSpacing: 4,
      labelDirection: 'positive',
      tickDirection: 'positive',
      gridDirection: 'negative',
    };
  } else if (position === 'right') {
    return {
      ...common,
      endPos: [x, y + height],
      startPos: [x, y],
      titlePosition: 'right',
      titleSpacing: 0,
      titleTextBaseline: 'top',
      titleTransform: `translate(-50%, 0) rotate(-90)`,
      labelSpacing: 4,
      labelDirection: 'negative',
      tickDirection: 'negative',
      gridDirection: 'negative',
    };
  } else if (position === 'arcY') {
    return {
      ...common,
      startPos: [x, y],
      endPos: [x + width, y + height],
      titlePosition: 'top',
      titleSpacing: 0,
      titleTextBaseline: 'bottom',
      labelDirection: 'positive',
      labelTransform: direction === 'center' ? 'translate(50%, 0)' : '',
      tickDirection: 'positive',
      // showTick: direction === 'center' ? false : true,
      labelSpacing: direction === 'center' ? 0 : 4,
      gridDirection: 'negative',
      gridConnect: 'arc',
      gridType: 'surround',
      gridCenter: [bbox.x, cy + bbox.y],
      gridControlAngles: [90, 180, 360],
      girdClosed: true,
    };
  }

  return {
    ...common,
    startPos: [x, y + height],
    endPos: [x + width, y + height],
    titlePosition: 'top',
    titleSpacing: 0,
    titleTextBaseline: 'middle',
    labelSpacing: 8,
    labelDirection: 'negative',
    tickDirection: 'negative',
    gridDirection: 'positive',
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
        // @todo should remove later, and get default style from theme definition.
        gridStroke: '#1b1e23',
        gridLineDash: [0, 0],
        gridStrokeOpacity: 0.1,
        tickStroke: '#BFBFBF',
        tickLength: 4,
        tickLineWidth: 1,
        ...rest,
      }),
    });
  };
};

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
    labelAutoHide = false,
    labelAutoRotate = false,
    grid,
    line: showLine = false,
    ...userDefinitions
  } = options;

  return (scale, value, coordinate, theme) => {
    const { domain, bbox } = value;

    const { axis: axisTheme } = theme;
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

    const showGrid = inferGrid(grid, coordinate, scale);

    const {
      showLabel = options.label === undefined ? true : options.label,
      showTick = options.tick === undefined ? true : options.tick,
      ...defaultStyle
    } = inferStyle(position, direction, bbox, coordinate, scale);

    const axisStyle = {
      ...defaultStyle,
      data: ticks,
      title: titleContent(title),
      showLabel,
      labelTransforms: labelTransforms(labelAutoHide, labelAutoRotate),
      showGrid,
      showTick,
      // @todo should remove later, and get default style from theme definition.
      lineStroke: '#BFBFBF',
      gridStroke: '#1b1e23',
      gridStrokeOpacity: 0.05,
      gridLineDash: [0, 0],
      tickStroke: '#BFBFBF',
      tickLength: 4,
      tickLineWidth: 1,
      titleFontWeight: 'bold',
      titleFill: '#000',
      titleFillOpacity: 1,
      ...userDefinitions,
      // Always showLine, make title could align the end of axis.
      showLine: true,
      ...(!showLine ? { lineOpacity: 0 } : null),
    } as AxisStyleProps;

    return new AxisComponent({
      style: Object.assign({}, axisTheme, axisStyle),
    });
  };
};

/**
 * Guide Component for position channel(e.g. x, y).
 * @todo Render Circular in polar coordinate.
 * @todo Custom style.
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
