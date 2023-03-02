import { Coordinate } from '@antv/coord';
import { Axis as AxisComponent } from '@antv/gui';
import { Linear as LinearScale } from '@antv/scale';
import { deepMix } from '@antv/util';
import { extent } from 'd3-array';
import { format } from 'd3-format';
import {
  BBox,
  G2Theme,
  GuideComponentComponent as GCC,
  GuideComponentOrientation as GCO,
  GuideComponentPosition as GCP,
  Scale,
} from '../runtime';
import {
  angleOf,
  isFisheye,
  isParallel,
  isPolar,
  isRadial,
  isTheta,
  isTranspose,
  radiusOf,
} from '../utils/coordinate';
import { capitalizeFirst } from '../utils/helper';
import { titleContent } from './utils';

export type AxisOptions = {
  position?: GCP;
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
  // options won't be overridden
  important: Record<string, any>;
  [key: string]: any;
};

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

function isHorizontal(orientation: GCO) {
  return orientation === 'horizontal' || orientation === 0;
}

function isVertical(orientation: GCO) {
  return orientation === 'vertical' || orientation === -Math.PI / 2;
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
  position: GCP,
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
    return isRadial(coordinate) && position === 'center'
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

function inferGridLength(position: GCP, coordinate: Coordinate) {
  const [width, height] = sizeOf(coordinate);
  if (position.includes('bottom') || position.includes('top')) return height;
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
  position: GCP,
  bbox: BBox,
  innerRadius: number,
  outerRadius: number,
  coordinate: Coordinate,
) {
  const { x, y, width, height } = bbox;
  const center: [number, number] = [x + width / 2, y + height / 2];
  const radius = Math.min(width, height) / 2;
  const [startAngle, endAngle] = angleOf(coordinate);

  const [w, h] = sizeOf(coordinate);
  const r = Math.min(w, h) / 2;

  const common = {
    center,
    radius,
    angleRange: [startAngle, endAngle],
    titleFillOpacity: 0,
    titlePosition: 'inner',
    showLine: false,
    showTick: true,
    gridLength: (outerRadius - innerRadius) * r,
  };

  if (position === 'inner') {
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

  // arc outer
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

function inferAxisLinearOverrideStyle(
  position: GCP,
  orientation: GCO,
  bbox: BBox,
  coordinate: Coordinate,
): {
  startPos?: [number, number];
  endPos?: [number, number];
  showLine?: boolean;
  [k: string]: any;
} {
  const { x, y, width, height } = bbox;

  if (position === 'bottom') {
    return { startPos: [x, y], endPos: [x + width, y] };
  }
  if (position === 'left') {
    return { startPos: [x + width, y], endPos: [x + width, y + height] };
  }
  if (position === 'right') {
    return { endPos: [x, y + height], startPos: [x, y] };
  }
  if (position === 'top') {
    return { startPos: [x, y + height], endPos: [x + width, y + height] };
  }
  // linear axis, maybe in parallel, polar, radial or radar systems.
  if (position === 'center') {
    // axisY
    if (orientation === 'vertical') {
      return {
        startPos: [x + width, y],
        endPos: [x + width, y + height],
        showLine: true,
      };
    }
    // axisX
    else if (orientation === 'horizontal') {
      return {
        startPos: [x, y + height],
        endPos: [x + width, y + height],
        showLine: true,
      };
    }
    // axis with rotate
    else if (typeof orientation === 'number') {
      const [cx, cy] = coordinate.getCenter();
      const [innerRadius, outerRadius] = radiusOf(coordinate);
      const [startAngle, endAngle] = angleOf(coordinate);
      const r = height / 2;

      const innerR = innerRadius * r;
      const outerR = outerRadius * r;

      const [actualCx, actualCy] = [cx + x, cy + y];
      const [cos, sin] = [Math.cos(orientation), Math.sin(orientation)];

      const startPos: [number, number] = [
        actualCx + outerR * cos,
        actualCy + outerR * sin,
      ];
      const endPos: [number, number] = [
        actualCx + innerR * cos,
        actualCy + innerR * sin,
      ];

      return {
        startPos,
        endPos,
        gridClosed: endAngle - startAngle === 360,
        gridCenter: [cx + x, y + cy],
        gridControlAngles: new Array(3)
          .fill(0)
          .map((d, i, arr) => ((endAngle - startAngle) / (arr.length - 1)) * i),
      };
    }
  }

  // position is inner or outer for arc axis won't be here

  return {};
}

const ArcAxisComponent: GCC<AxisOptions> = (options) => {
  const {
    order,
    size,
    position,
    orientation,
    labelFormatter = (d) => `${d}`,
    tickFilter,
    tickCount,
    tickMethod,
    title,
    grid: showGrid = false,
    important = {},
    style,
    ...rest
  } = options;
  return ([scale], value, coordinate, theme) => {
    const { bbox } = value;
    const { domain } = scale.getOptions();
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

    const [innerRadius, outerRadius] = radiusOf(coordinate);

    const defaultStyle = inferArcStyle(
      position,
      bbox,
      innerRadius,
      outerRadius,
      coordinate,
    );

    const { axis: axisTheme } = theme;
    return new AxisComponent({
      style: deepMix({}, axisTheme, defaultStyle, {
        type: 'arc',
        data: ticks,
        title: titleContent(title),
        showGrid,
        ...rest,
        ...important,
      }),
    });
  };
};

function inferThemeStyle(
  scale: Scale,
  coordinate: Coordinate,
  theme: G2Theme,
  direction,
  position: GCP,
  orientation: GCO,
) {
  const baseStyle = theme.axis;
  let furtherStyle = theme.axisLinear;

  if (['top', 'right', 'bottom', 'left'].includes(position)) {
    furtherStyle = theme[`axis${capitalizeFirst(position)}`];
  }
  return Object.assign({}, baseStyle, furtherStyle);
}

function inferDefaultStyle(
  scale: Scale,
  coordinate: Coordinate,
  theme: G2Theme,
  direction,
  position: GCP,
  orientation: GCO,
) {
  const themeStyle = inferThemeStyle(
    scale,
    coordinate,
    theme,
    direction,
    position,
    orientation,
  );

  if (position === 'bottom') {
    return {
      ...themeStyle,
      titlePosition: scale.getTicks ? 'right-bottom' : 'bottom',
      titleTransformOrigin: 'center',
      titleTransform: scale.getTicks ? 'translate(-100%, 0)' : undefined,
    };
  }
  if (position === 'center') {
    return {
      ...themeStyle,
      labelDirection: direction === 'right' ? 'negative' : 'positive',
      labelTransform: direction === 'center' ? 'translate(50%, 0)' : '',
      tickDirection: direction === 'right' ? 'negative' : 'positive',
      labelSpacing: direction === 'center' ? 0 : 4,
      titleSpacing: isVertical(orientation) ? 10 : 0,
      tick: direction === 'center' ? false : undefined,
    };
  }
  return themeStyle;
}

const LinearAxisComponent: GCC<AxisOptions> = (options) => {
  const {
    direction = 'left',
    important = {},
    labelFormatter = (d) => `${d}`,
    order,
    orientation,
    position,
    size,
    tickCount,
    tickFilter,
    tickMethod,
    title,
    transform,
    style,
    ...userDefinitions
  } = options;

  return ([scale], value, coordinate, theme) => {
    const { bbox } = value;
    const { domain } = scale.getOptions();

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

    const defaultStyle = inferDefaultStyle(
      scale,
      coordinate,
      theme,
      direction,
      position,
      orientation,
    );
    const {
      labelAutoRotate = true,
      labelAutoHide = false,
      label: showLabel = true,
      tick: showTick = true,
      line = false,
      grid,
    } = Object.assign({}, defaultStyle, userDefinitions);

    const showGrid = inferGrid(grid, coordinate, scale);
    const gridLength = inferGridLength(position, coordinate);

    const { showLine = line, ...overrideStyle } = inferAxisLinearOverrideStyle(
      position,
      orientation,
      bbox,
      coordinate,
    );
    const axisStyle = {
      ...defaultStyle,
      ...style,
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
      ...important,
    };

    return new AxisComponent({
      className: 'axis',
      style: axisStyle,
    });
  };
};

const axisFactor: (
  axis: typeof ArcAxisComponent | typeof LinearAxisComponent,
) => GCC<AxisOptions> = (axis) => {
  return (options) => {
    const { labelFormatter: f = (d) => `${d}` } = options;
    const labelFormatter = typeof f === 'string' ? format(f) : f;
    const normalizedOptions = { ...options, labelFormatter };
    return (...args) => axis(normalizedOptions)(...args);
  };
};

export const LinearAxis = axisFactor(LinearAxisComponent);

export const ArcAxis = axisFactor(ArcAxisComponent);

LinearAxis.props = {
  defaultPosition: 'center',
  defaultSize: 45,
  defaultOrder: 0,
};

ArcAxis.props = {
  defaultPosition: 'outer',
  defaultOrientation: 'vertical',
  defaultSize: 45,
  defaultOrder: 0,
};
