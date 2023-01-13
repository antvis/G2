import { Coordinate } from '@antv/coord';
import { ascending, group } from 'd3-array';
import { isNumber } from '_@antv_util@3.3.2@@antv/util';
import { isParallel, isPolar, isRadar } from '../utils/coordinate';
import { capitalizeFirst } from '../utils/helper';
import {
  GuideComponentPosition as GCP,
  Layout,
  Section,
  SectionArea,
} from './types/common';
import { G2GuideComponentOptions, G2View } from './types/options';

export function computeLayout(
  components: G2GuideComponentOptions[],
  options: G2View,
): Layout {
  const padding = computePadding(components, options);
  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = padding;
  const {
    width,
    height,
    x = 0,
    y = 0,
    inset = 0,
    insetLeft = inset,
    insetTop = inset,
    insetBottom = inset,
    insetRight = inset,
    margin = 0,
    marginLeft = margin,
    marginBottom = margin,
    marginTop = margin,
    marginRight = margin,
  } = options;
  return {
    ...padding,
    width,
    height,
    insetLeft,
    insetTop,
    insetBottom,
    insetRight,
    innerWidth: width - paddingLeft - paddingRight - marginLeft - marginRight,
    innerHeight: height - paddingTop - paddingBottom - marginTop - marginBottom,
    marginLeft,
    marginBottom,
    marginTop,
    marginRight,
    x,
    y,
  };
}

/**
 * @todo Support percentage size(e.g. 50%)
 */
function computePadding(
  components: G2GuideComponentOptions[],
  options: G2View,
) {
  const anchors: GCP['anchor'][] = ['left', 'right', 'top', 'bottom'];
  const positionComponents = group(components, (d) => d.position.anchor);
  const {
    padding,
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
  for (const anchor of anchors) {
    const key = `padding${capitalizeFirst(anchor)}`;
    if (layout[key] === undefined) {
      if (!positionComponents.has(anchor)) {
        layout[key] = 30;
      } else {
        const components = positionComponents.get(anchor);
        const totalSize = components.reduce((sum, { size }) => sum + size, 0);
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
  const positionComponents = group(components, (d) => d.position);
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
    height,
    width,
  } = layout;

  const pl = paddingLeft + marginLeft;
  const pt = paddingTop + marginTop;
  const pr = paddingRight + marginRight;
  const pb = paddingBottom + marginBottom;

  const section: Section = {
    top: [pl, 0, innerWidth, pt, 'vertical', true, ascending],
    right: [width - pr, pt, pr, innerHeight, 'horizontal', false, ascending],
    bottom: [pl, height - pb, innerWidth, pb, 'vertical', false, ascending],
    left: [0, pt, pl, innerHeight, 'horizontal', true, ascending],
    center: [pl, pt, innerWidth, innerHeight, 'center', null, null],
    inner: [pl, pt, innerWidth, innerHeight, 'center', null, null],
    outer: [pl, pt, innerWidth, innerHeight, 'center', null, null],
  };

  for (const [position, components] of positionComponents.entries()) {
    const { anchor } = position;
    const area = section[anchor];
    /**
     * @description no volumn components take up no extra space
     */
    const [nonCollisionComponents, generalComponents]: [
      G2GuideComponentOptions[],
      G2GuideComponentOptions[],
    ] = components.reduce(
      (acc, curr) => {
        if (typeof curr.type === 'string') {
          if (curr.type.startsWith('axis')) {
            if (['center', 'inner', 'outer'].includes(anchor)) {
              acc[0].push(curr);
            }
          } else if (anchor === 'center') acc[0].push(curr);
          else acc[1].push(curr);
        } else acc[1].push(curr);
        return acc;
      },
      [[], []],
    );

    if (nonCollisionComponents.length) {
      placeNonCollisionComponents(
        nonCollisionComponents,
        coordinate,
        area,
        position,
      );
    }
    if (generalComponents.length) {
      placePaddingArea(components, coordinate, area);
    }
  }
}

function placeNonCollisionComponents(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
  position: GCP,
) {
  // in current stage, only center/inner/outer axis components have no volumn
  placeNonCollisionAxis(components, coordinate, area, position);
}

function placeNonCollisionAxis(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
  position: GCP,
) {
  const { anchor } = position;
  if (anchor === 'center') {
    if (isPolar(coordinate)) {
      placeArcLinear(components, coordinate, area, position);
    }
    if (isParallel(coordinate)) {
      placeParallel(components, coordinate, area, position);
    }
    if (isRadar(coordinate)) {
      placeRadar(components, coordinate, area, position);
    }
  } else if (anchor === 'inner') {
    placeArcInner(components, coordinate, area);
  } else if (anchor === 'outer') {
    placeArcOuter(components, coordinate, area);
  }
}

function placeArcInner(
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

function placeArcOuter(
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
  position: GCP,
) {
  const [x, y, width, height] = area;
  const [cx, cy] = coordinate.getCenter();
  const [innerRadius, outerRadius] = radiusOf(coordinate);
  const r = height / 2;
  const y0 = cy - outerRadius * r;
  const h = (outerRadius - innerRadius) * r;
  const { orientation } = position;

  let bbox;
  if (orientation === 'vertical') {
    bbox = { x: cx + x, y: y0 + y, width: 0, height: h };
  } else if (orientation === 'horizontal') {
    bbox = { x: cx + x, y: y0 + y, width: h, height: 0 };
  } else {
    bbox = { x: cx + x, y: y0 + y, width, height };
  }
  for (const component of components) {
    component.bbox = bbox;
  }
}

function placeParallel(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
  position: GCP,
) {
  const { orientation } = position;
  if (orientation === 'horizontal') {
    placeParallelHorizontal(components, coordinate, area);
  } else if (orientation === 'vertical') {
    placeParallelVertical(components, coordinate, area);
  }
}

function placeParallelVertical(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
): void {
  const [x, y, , height] = area;

  // Create a high dimension vector and map to a list of two-dimension points.
  // [0, 0, 0] -> [x0, 0, x1, 0, x2, 0]
  const vector = new Array(components.length + 1).fill(0);
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

function placeParallelHorizontal(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
): void {
  const [x, y, width] = area;

  // Create a high dimension vector and map to a list of two-dimension points.
  // [0, 0, 0] -> [height, y0, height, y1, height, y2]
  const vector = new Array(components.length + 1).fill(0);
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

  // override style
}

function placeRadar(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
  position: GCP,
) {
  const [x, y, width, height] = area;
  for (const component of components) {
    component.bbox = { x, y, width, height };
  }
}

function placePaddingArea(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
): void {
  const [x, y, width, height, direction, reverse, comparator] = area;
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

  const startValue = reverse ? mainStartValue + mainSizeValue : mainStartValue;
  for (let i = 0, start = startValue; i < components.length; i++) {
    const component = components[i];
    const { size } = component;
    component.bbox = {
      [mainStartKey]: reverse ? start - size : start,
      [crossStartKey]: crossStartValue,
      [mainSizeKey]: size,
      [crossSizeKey]: crossSizeValue,
    };
    start += size * (reverse ? -1 : 1);
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

function radiusOf(coordinate: Coordinate): [number, number] {
  const { transformations } = coordinate.getOptions();
  const [, , , innerRadius, outerRadius] = transformations.find(
    (d) => d[0] === 'polar',
  );
  return [innerRadius as number, outerRadius as number];
}
