import { Coordinate } from '@antv/coord';
import { ascending, group, max, min, sum } from 'd3-array';
import { deepMix } from '@antv/util';
import { isParallel, isPolar, isRadar, radiusOf } from '../utils/coordinate';
import { capitalizeFirst, defined } from '../utils/helper';
import { divide } from '../utils/array';
import { camelCase } from '../utils/string';
import {
  GuideComponentPosition as GCP,
  GuideComponentOrientation as GCO,
  Layout,
  Section,
  SectionArea,
  G2Theme,
  GuideComponentPlane,
} from './types/common';
import {
  computeComponentSize,
  computeLabelsBBox,
  computeTitleBBox,
  createScale,
  groupComponents,
  styleOf,
} from './component';
import { G2GuideComponentOptions, G2Library, G2View } from './types/options';
import {
  isPolar as isPolarOptions,
  isRadial as isRadarOptions,
} from './coordinate';

export function processAxisZ(components: G2GuideComponentOptions[]) {
  const axisX = components.find(({ type }) => type === 'axisX');
  const axisY = components.find(({ type }) => type === 'axisY');
  const axisZ = components.find(({ type }) => type === 'axisZ');
  if (axisX && axisY && axisZ) {
    axisX.plane = 'xy';
    axisY.plane = 'xy';
    axisZ.plane = 'yz';
    axisZ.origin = [axisX.bbox.x, axisX.bbox.y, 0];
    axisZ.eulerAngles = [0, -90, 0];
    axisZ.bbox.x = axisX.bbox.x;
    axisZ.bbox.y = axisX.bbox.y;
    components.push({
      ...axisX,
      plane: 'xz',
      showLabel: false,
      showTitle: false,
      origin: [axisX.bbox.x, axisX.bbox.y, 0],
      eulerAngles: [-90, 0, 0],
    });
    components.push({
      ...axisY,
      plane: 'yz',
      showLabel: false,
      showTitle: false,
      origin: [axisY.bbox.x + axisY.bbox.width, axisY.bbox.y, 0],
      eulerAngles: [0, -90, 0],
    });
    components.push({
      ...axisZ,
      plane: 'xz',
      actualPosition: 'left',
      showLabel: false,
      showTitle: false,
      eulerAngles: [90, -90, 0],
    });
  }
}

export function computeLayout(
  components: G2GuideComponentOptions[],
  options: G2View,
  theme: G2Theme,
  library: G2Library,
): Layout {
  const {
    width,
    height,
    depth,
    x = 0,
    y = 0,
    z = 0,
    inset = theme.inset ?? 0,
    insetLeft = inset,
    insetTop = inset,
    insetBottom = inset,
    insetRight = inset,
    margin = theme.margin ?? 0,
    marginLeft = margin,
    marginBottom = margin,
    marginTop = margin,
    marginRight = margin,
    padding = theme.padding,
    paddingBottom = padding,
    paddingLeft = padding,
    paddingRight = padding,
    paddingTop = padding,
  } = computeInset(components, options, theme, library);

  const MIN_CONTENT_RATIO = 1 / 4;

  const maybeClamp = (viewWidth, paddingLeft, paddingRight, pl0, pr0) => {
    // Only clamp when has marks.
    const { marks } = options;
    if (marks.length === 0) return [pl0, pr0];

    // If size of content is enough, skip.
    const contentSize = viewWidth - pl0 - pr0;
    const diff = contentSize - viewWidth * MIN_CONTENT_RATIO;
    if (diff > 0) return [pl0, pr0];

    // Shrink start and end size equally.
    const shrinkSize = viewWidth * (1 - MIN_CONTENT_RATIO);
    return [
      paddingLeft === 'auto' ? (shrinkSize * pl0) / (pl0 + pr0) : pl0,
      paddingRight === 'auto' ? (shrinkSize * pr0) / (pl0 + pr0) : pr0,
    ];
  };

  const roughPadding = (padding) => (padding === 'auto' ? 20 : padding ?? 20);
  const rpt = roughPadding(paddingTop);
  const rpb = roughPadding(paddingBottom);

  // Compute paddingLeft and paddingRight first to get innerWidth.
  const horizontalPadding = computePadding(
    components,
    height - rpt - rpb,
    [rpt + marginTop, rpb + marginBottom],
    ['left', 'right'],
    options,
    theme,
    library,
  );
  const { paddingLeft: pl0, paddingRight: pr0 } = horizontalPadding;
  const viewWidth = width - marginLeft - marginRight;
  const [pl, pr] = maybeClamp(viewWidth, paddingLeft, paddingRight, pl0, pr0);
  const iw = viewWidth - pl - pr;

  // Compute paddingBottom and paddingTop based on innerWidth.
  const verticalPadding = computePadding(
    components,
    iw,
    [pl + marginLeft, pr + marginRight],
    ['bottom', 'top'],
    options,
    theme,
    library,
  );
  const { paddingTop: pt0, paddingBottom: pb0 } = verticalPadding;
  const viewHeight = height - marginBottom - marginTop;
  const [pb, pt] = maybeClamp(viewHeight, paddingBottom, paddingTop, pb0, pt0);
  const ih = viewHeight - pb - pt;

  return {
    width,
    height,
    depth,
    insetLeft,
    insetTop,
    insetBottom,
    insetRight,
    innerWidth: iw,
    innerHeight: ih,
    paddingLeft: pl,
    paddingRight: pr,
    paddingTop: pt,
    paddingBottom: pb,
    marginLeft,
    marginBottom,
    marginTop,
    marginRight,
    x,
    y,
    z,
  };
}

// For composite mark with a layout algorithm and without axis,
// such as worldcloud, circlepack.
export function computeRoughPlotSize(options: G2View) {
  const {
    height,
    width,
    padding = 0,
    paddingLeft = padding,
    paddingRight = padding,
    paddingTop = padding,
    paddingBottom = padding,
    margin = 16,
    marginLeft = margin,
    marginRight = margin,
    marginTop = margin,
    marginBottom = margin,
    inset = 0,
    insetLeft = inset,
    insetRight = inset,
    insetTop = inset,
    insetBottom = inset,
  } = options;

  // @todo Add this padding to theme.
  // 30 is default size for padding, which defined in runtime.
  const maybeAuto = (padding) => (padding === 'auto' ? 20 : padding);

  const finalWidth =
    width -
    maybeAuto(paddingLeft) -
    maybeAuto(paddingRight) -
    marginLeft -
    marginRight -
    insetLeft -
    insetRight;

  const finalHeight =
    height -
    maybeAuto(paddingTop) -
    maybeAuto(paddingBottom) -
    marginTop -
    marginBottom -
    insetTop -
    insetBottom;

  return { width: finalWidth, height: finalHeight };
}

function computeInset(
  components: G2GuideComponentOptions[],
  options: G2View,
  theme: G2Theme,
  library: G2Library,
) {
  const { coordinates } = options;
  if (!isPolarOptions(coordinates) && !isRadarOptions(coordinates)) {
    return options;
  }

  // Filter axis.
  const axes = components.filter(
    (d) => typeof d.type === 'string' && d.type.startsWith('axis'),
  );

  if (axes.length === 0) return options;

  const styles = axes.map((component) => {
    const key = component.type === 'axisArc' ? 'arc' : 'linear';
    return styleOf(component, key as any, theme);
  });

  // Compute max labelSpacing.
  const maxLabelSpacing = max(styles, (d) => d.labelSpacing ?? 0);

  // Compute labelBBoxes.
  const labelBBoxes = axes
    .flatMap((component, i) => {
      const style = styles[i];
      const scale = createScale(component, library);
      const labels = computeLabelsBBox(style, scale);
      return labels;
    })
    .filter(defined);

  const size = max(labelBBoxes, (d) => d.height) + maxLabelSpacing;

  // Compute titles.
  const titleBBoxes = axes
    .flatMap((_, i) => {
      const style = styles[i];
      return computeTitleBBox(style);
    })
    .filter((d) => d !== null);
  const titleSize =
    titleBBoxes.length === 0 ? 0 : max(titleBBoxes, (d) => d.height);

  // Update inset.
  const {
    inset = size,
    insetLeft = inset,
    insetBottom = inset,
    insetTop = inset + titleSize,
    insetRight = inset,
  } = options;
  return { ...options, insetLeft, insetBottom, insetTop, insetRight };
}

/**
 * @todo Support percentage size(e.g. 50%)
 */
function computePadding(
  components: G2GuideComponentOptions[],
  crossSize: number,
  crossPadding: [number, number],
  positions: GCP[],
  options: G2View,
  theme: G2Theme,
  library: G2Library,
) {
  const positionComponents = group(components, (d) => d.position);
  const {
    padding = theme.padding,
    paddingLeft = padding,
    paddingRight = padding,
    paddingBottom = padding,
    paddingTop = padding,
  } = options;
  const layout = {
    paddingBottom,
    paddingLeft,
    paddingTop,
    paddingRight,
  };

  for (const position of positions) {
    const key = `padding${capitalizeFirst(camelCase(position))}`;
    const components = positionComponents.get(position) || [];
    const value = layout[key];
    const defaultSizeOf = (d) => {
      if (d.size === undefined) d.size = d.defaultSize;
    };
    const sizeOf = (d) => {
      if (d.type === 'group') {
        d.children.forEach(defaultSizeOf);
        d.size = max(d.children, (d) => (d as any).size);
      } else {
        d.size = d.defaultSize;
      }
    };
    const autoSizeOf = (d) => {
      if (d.size) return;
      if (value !== 'auto') sizeOf(d);
      else {
        // Compute component size dynamically.
        computeComponentSize(
          d,
          crossSize,
          crossPadding,
          position,
          theme,
          library,
        );
        defaultSizeOf(d);
      }
    };

    const maybeHide = (d) => {
      if (!d.type.startsWith('axis')) return;
      if (d.labelAutoHide === undefined) d.labelAutoHide = true;
    };

    const isHorizontal = position === 'bottom' || position === 'top';

    // !!!Note
    // Mute axis component padding.
    // The first axis do not has padding.
    const minOrder = min(components, (d) => d.order);
    const axes = components.filter(
      (d) => (d.type as string).startsWith('axis') && d.order == minOrder,
    );
    if (axes.length) axes[0].crossPadding = 0;

    // Specified padding.
    if (typeof value === 'number') {
      components.forEach(defaultSizeOf);
      components.forEach(maybeHide);
    } else {
      // Compute padding dynamically.
      if (components.length === 0) {
        layout[key] = 0;
      } else {
        const size = isHorizontal
          ? crossSize + crossPadding[0] + crossPadding[1]
          : crossSize;
        const grouped = groupComponents(components, size);
        grouped.forEach(autoSizeOf);
        const totalSize = grouped.reduce(
          (sum, { size, crossPadding = 12 }) => sum + size + crossPadding,
          0,
        );
        layout[key] = totalSize;
      }
    }
  }

  return layout;
}

export function placeComponents(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  layout: Layout,
): void {
  // Group components by plane & position.
  const positionComponents = group<G2GuideComponentOptions, string>(
    components,
    (d) => `${d.plane || 'xy'}-${d.position}`,
  );
  const {
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    marginLeft,
    marginTop,
    marginBottom,
    marginRight,
    innerHeight,
    innerWidth,
    insetBottom,
    insetLeft,
    insetRight,
    insetTop,
    height,
    width,
    depth,
  } = layout;

  const planes = {
    xy: createSection({
      width,
      height,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      marginLeft,
      marginTop,
      marginBottom,
      marginRight,
      innerHeight,
      innerWidth,
      insetBottom,
      insetLeft,
      insetRight,
      insetTop,
    }),
    yz: createSection({
      width: depth,
      height: height,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginLeft: 0,
      marginTop: 0,
      marginBottom: 0,
      marginRight: 0,
      innerWidth: depth,
      innerHeight: height,
      insetBottom: 0,
      insetLeft: 0,
      insetRight: 0,
      insetTop: 0,
    }),
    xz: createSection({
      width,
      height: depth,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginLeft: 0,
      marginTop: 0,
      marginBottom: 0,
      marginRight: 0,
      innerWidth: width,
      innerHeight: depth,
      insetBottom: 0,
      insetLeft: 0,
      insetRight: 0,
      insetTop: 0,
    }),
  };

  for (const [key, components] of positionComponents.entries()) {
    const [plane, position] = key.split('-') as [GuideComponentPlane, GCP];
    const area = planes[plane][position];

    /**
     * @description non-entity components: axis in the center, inner, outer, component in the center
     * @description entity components: other components
     * @description no volume components take up no extra space
     */

    const [nonEntityComponents, entityComponents] = divide(
      components,
      (component) => {
        if (typeof component.type !== 'string') return false;
        if (position === 'center') return true;
        if (
          component.type.startsWith('axis') &&
          ['inner', 'outer'].includes(position)
        ) {
          return true;
        }
        return false;
      },
    );

    if (nonEntityComponents.length) {
      placeNonEntityComponents(nonEntityComponents, coordinate, area, position);
    }
    if (entityComponents.length) {
      placePaddingArea(components, coordinate, area);
    }
  }
}

function createSection({
  width,
  height,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  marginLeft,
  marginTop,
  marginBottom,
  marginRight,
  innerHeight,
  innerWidth,
  insetBottom,
  insetLeft,
  insetRight,
  insetTop,
}: {
  width: number;
  height: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  marginLeft: number;
  marginTop: number;
  marginBottom: number;
  marginRight: number;
  innerHeight: number;
  innerWidth: number;
  insetBottom: number;
  insetLeft: number;
  insetRight: number;
  insetTop: number;
}): Section {
  const pl = paddingLeft + marginLeft;
  const pt = paddingTop + marginTop;
  const pr = paddingRight + marginRight;
  const pb = paddingBottom + marginBottom;
  const plotWidth = width - marginLeft - marginRight;

  const centerSection: SectionArea = [
    pl + insetLeft,
    pt + insetTop,
    innerWidth - insetLeft - insetRight,
    innerHeight - insetTop - insetBottom,
    'center',
    null,
    null,
  ];

  const xySection: Section = {
    top: [
      pl,
      0,
      innerWidth,
      pt,
      'vertical',
      true,
      ascending,
      marginLeft,
      plotWidth,
    ],
    right: [width - pr, pt, pr, innerHeight, 'horizontal', false, ascending],
    bottom: [
      pl,
      height - pb,
      innerWidth,
      pb,
      'vertical',
      false,
      ascending,
      marginLeft,
      plotWidth,
    ],
    left: [0, pt, pl, innerHeight, 'horizontal', true, ascending],
    'top-left': [pl, 0, innerWidth, pt, 'vertical', true, ascending],
    'top-right': [pl, 0, innerWidth, pt, 'vertical', true, ascending],
    'bottom-left': [
      pl,
      height - pb,
      innerWidth,
      pb,
      'vertical',
      false,
      ascending,
    ],
    'bottom-right': [
      pl,
      height - pb,
      innerWidth,
      pb,
      'vertical',
      false,
      ascending,
    ],
    center: centerSection,
    inner: centerSection,
    outer: centerSection,
  };

  return xySection;
}

function placeNonEntityComponents(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
  position: GCP,
) {
  const [axisComponents, nonAxisComponents] = divide(
    components,
    (component) => {
      if (
        typeof component.type === 'string' &&
        component.type.startsWith('axis')
      ) {
        return true;
      }
      return false;
    },
  );

  placeNonEntityAxis(axisComponents, coordinate, area, position);
  // in current stage, only legend component which located in the center can be placed
  placeCenter(nonAxisComponents, coordinate, area);
}

function placeNonEntityAxis(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
  position: GCP,
) {
  if (position === 'center') {
    if (isRadar(coordinate)) {
      placeAxisRadar(components, coordinate, area, position);
    } else if (isPolar(coordinate)) {
      placeArcLinear(components, coordinate, area);
    } else if (isParallel(coordinate)) {
      placeAxisParallel(
        components,
        coordinate,
        area,
        components[0].orientation, // assume that all components have the same orientation
      );
    }
  } else if (position === 'inner') {
    placeAxisArcInner(components, coordinate, area);
  } else if (position === 'outer') {
    placeAxisArcOuter(components, coordinate, area);
  }
}

function placeAxisArcInner(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
) {
  const [x, y, , height] = area;
  const [cx, cy] = coordinate.getCenter();
  const [innerRadius] = radiusOf(coordinate);
  const r = height / 2;
  const size = innerRadius * r;
  const x0 = cx - size;
  const y0 = cy - size;
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    component.bbox = {
      x: x + x0,
      y: y + y0,
      width: size * 2,
      height: size * 2,
    };
  }
}

function placeAxisArcOuter(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
) {
  const [x, y, width, height] = area;
  for (const component of components) {
    component.bbox = { x, y, width, height };
  }
}

/**
 * @example arcX, arcY, axisLinear with angle
 */
function placeArcLinear(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
) {
  const [x, y, width, height] = area;
  for (const component of components) {
    component.bbox = { x: x, y, width, height };
  }
}

function placeAxisParallel(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
  orientation: GCO,
) {
  if (orientation === 'horizontal') {
    placeAxisParallelHorizontal(components, coordinate, area);
  } else if (orientation === 'vertical') {
    placeAxisParallelVertical(components, coordinate, area);
  }
}

function placeAxisParallelVertical(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
): void {
  const [x, y, , height] = area;

  // Create a high dimension vector and map to a list of two-dimension points.
  // [0, 0, 0] -> [x0, 0, x1, 0, x2, 0]
  const vector = new Array(components.length).fill(0);
  const points = coordinate.map(vector);

  // Extract x of each points.
  // [x0, 0, x1, 0, x2, 0] -> [x0, x1, x2]
  const X = points.filter((_, i) => i % 2 === 0).map((d) => d + x);

  // Place each axis by coordinate in parallel coordinate.
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    const x = X[i];
    const width = X[i + 1] - x;
    component.bbox = { x, y, width, height };
  }
}

function placeAxisParallelHorizontal(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
): void {
  const [x, y, width] = area;

  // Create a high dimension vector and map to a list of two-dimension points.
  // [0, 0, 0] -> [height, y0, height, y1, height, y2]
  const vector = new Array(components.length).fill(0);
  const points = coordinate.map(vector);

  // Extract y of each points.
  // [x0, 0, x1, 0, x2, 0] -> [x0, x1, x2]
  const Y = points.filter((_, i) => i % 2 === 1).map((d) => d + y);

  // Place each axis by coordinate in parallel coordinate.
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    const y = Y[i];
    const height = Y[i + 1] - y;
    component.bbox = { x, y, width, height };
  }
}

function placeAxisRadar(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
  position: GCP,
) {
  const [x, y, width, height] = area;
  for (const component of components) {
    component.bbox = { x, y, width, height };
    component.radar = {
      index: components.indexOf(component),
      count: components.length,
    };
  }
}

function placePaddingArea(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
) {
  const [x, y, width, height, direction, reverse, comparator, minX, totalSize] =
    area;
  const [
    mainStartKey,
    mainStartValue,
    crossStartKey,
    crossStartValue,
    mainSizeKey,
    mainSizeValue,
    crossSizeKey,
    crossSizeValue,
  ] =
    direction === 'vertical'
      ? ['y', y, 'x', x, 'height', height, 'width', width]
      : ['x', x, 'y', y, 'width', width, 'height', height];

  // Sort components by order.
  // The smaller the order, the closer to center.
  components.sort((a, b) => comparator?.(a.order, b.order));

  const isLarge = (type) =>
    type === 'title' || type === 'group' || type.startsWith('legend');

  const crossSizeOf = (type, small, bigger) => {
    if (bigger === undefined) return small;
    if (isLarge(type)) return bigger;
    return small;
  };

  const crossStartOf = (type, x, minX) => {
    if (minX === undefined) return x;
    if (isLarge(type)) return minX;
    return x;
  };

  const startValue = reverse ? mainStartValue + mainSizeValue : mainStartValue;
  for (let i = 0, start = startValue; i < components.length; i++) {
    const component = components[i];
    const { crossPadding = 0, type } = component;
    const { size } = component;
    component.bbox = {
      [mainStartKey]: reverse
        ? start - size - crossPadding
        : start + crossPadding,
      [crossStartKey]: crossStartOf(type, crossStartValue, minX),
      [mainSizeKey]: size,
      [crossSizeKey]: crossSizeOf(type, crossSizeValue, totalSize),
    };
    start += (size + crossPadding) * (reverse ? -1 : 1);
  }

  // Place group components.
  const groupComponents = components.filter((d) => d.type === 'group');
  for (const group of groupComponents) {
    const { bbox, children } = group;
    const size = bbox[crossSizeKey];
    const step = size / children.length;
    const justifyContent = children.reduce((j, child) => {
      const j0 = child.layout?.justifyContent;
      return j0 ? j0 : j;
    }, 'flex-start');
    const L = children.map((d, i) => {
      const { length = step, padding = 0 } = d;
      return length + (i === children.length - 1 ? 0 : padding);
    });
    const totalLength = sum(L);
    const diff = size - totalLength;
    const offset =
      justifyContent === 'flex-start'
        ? 0
        : justifyContent === 'center'
        ? diff / 2
        : diff;

    for (
      let i = 0, start = bbox[crossStartKey] + offset;
      i < children.length;
      i++
    ) {
      const component = children[i];
      const { padding = 0 } = component;
      const interval = i === children.length - 1 ? 0 : padding;
      component.bbox = {
        [mainSizeKey]: bbox[mainSizeKey],
        [mainStartKey]: bbox[mainStartKey],
        [crossStartKey]: start,
        [crossSizeKey]: L[i] - interval,
      };
      deepMix(component, { layout: { justifyContent } });
      start += L[i];
    }
  }
}

/**
 * @example legend in the center of radial or polar system
 */
function placeCenter(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
) {
  if (components.length === 0) return;
  const [x, y, width, height] = area;
  const [innerRadius] = radiusOf(coordinate);
  const r = ((height / 2) * innerRadius) / Math.sqrt(2);
  const cx = x + width / 2;
  const cy = y + height / 2;
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    component.bbox = { x: cx - r, y: cy - r, width: r * 2, height: r * 2 };
  }
}
