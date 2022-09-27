import { Coordinate } from '@antv/coord';
import { group, ascending } from 'd3-array';
import { capitalizeFirst } from '../utils/helper';
import {
  GuideComponentPosition,
  Section,
  Layout,
  SectionArea,
} from './types/common';
import { G2View, G2GuideComponentOptions } from './types/options';

export function computeLayout(
  components: G2GuideComponentOptions[],
  options: G2View,
): Layout {
  const padding = computePadding(components, options);
  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = padding;
  const { width, height, x = 0, y = 0 } = options;
  return {
    ...padding,
    width,
    height,
    innerWidth: width - paddingLeft - paddingRight,
    innerHeight: height - paddingTop - paddingBottom,
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
  const positions: GuideComponentPosition[] = [
    'left',
    'right',
    'top',
    'bottom',
  ];
  const positionComponents = group(components, (d) => d.position);
  const { paddingLeft, paddingRight, paddingBottom, paddingTop } = options;
  const padding = {
    paddingBottom,
    paddingLeft,
    paddingTop,
    paddingRight,
  };
  for (const position of positions) {
    const key = `padding${capitalizeFirst(position)}`;
    if (padding[key] === undefined) {
      if (!positionComponents.has(position)) {
        padding[key] = 30;
      } else {
        const components = positionComponents.get(position);
        const totalSize = components.reduce((sum, { size }) => sum + size, 0);
        padding[key] = totalSize;
      }
    }
  }
  return padding;
}

export function placeComponents(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  layout: Layout,
): void {
  const positionComponents = group(components, (d) => d.position);
  const {
    paddingLeft: pl,
    paddingRight: pr,
    paddingTop: pt,
    paddingBottom: pb,
    innerHeight,
    innerWidth,
    height,
    width,
  } = layout;

  const section: Section = {
    top: [pl, 0, innerWidth, pt, 0, true, ascending],
    right: [width - pr, pt, pr, innerHeight, 1, false, ascending],
    bottom: [pl, height - pb, innerWidth, pb, 0, false, ascending],
    left: [0, pt, pl, innerHeight, 1, true, ascending],
    centerHorizontal: [pl, pt, innerWidth, innerHeight, -1, null, null],
    arc: [pl, pt, innerWidth, innerHeight, -1, null, null],
    arcY: [pl, pt, innerWidth, innerHeight, -1, null, null],
    arcInner: [pl, pt, innerWidth, innerHeight, -1, null, null],
    center: [pl, pt, innerWidth, innerHeight, -1, null, null],
    arcCenter: [pl, pt, innerWidth, innerHeight, -1, null, null],
  };

  for (const [key, components] of positionComponents.entries()) {
    const area = section[key];
    if (key === 'centerHorizontal') {
      placeCenterHorizontal(components, coordinate, area);
    } else if (key === 'arc') {
      placeArc(components, coordinate, area);
    } else if (key === 'arcY') {
      placeArcY(components, coordinate, area);
    } else if (key === 'arcInner') {
      placeArcInner(components, coordinate, area);
    } else if (key === 'arcCenter') {
      placeArcCenter(components, coordinate, area);
    } else {
      placePaddingArea(components, coordinate, area);
    }
  }
}

function placeCenterHorizontal(
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
    direction === 0
      ? ['y', y, 'x', x, 'height', height, 'width', width]
      : ['x', x, 'y', y, 'width', width, 'height', height];

  // Sort components by order.
  // The smaller the order, the closer to center.
  components.sort((a, b) => comparator(a.order, b.order));

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

function placeArc(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
) {
  const [x, y, width, height] = area;
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    component.bbox = { x, y, width, height };
  }
}

function placeArcY(
  components: G2GuideComponentOptions[],
  coordinate: Coordinate,
  area: SectionArea,
) {
  const [x, y, , height] = area;
  const [cx, cy] = coordinate.getCenter();
  const [innerRadius, outerRadius] = radiusOf(coordinate);
  const r = height / 2;
  const y0 = cy - outerRadius * r;
  const h = (outerRadius - innerRadius) * r;
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    component.bbox = { x: cx + x, y: y0 + y, width: 0, height: h };
  }
}

function placeArcCenter(
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

function radiusOf(coordinate: Coordinate): [number, number] {
  const { transformations } = coordinate.getOptions();
  const [, , , innerRadius, outerRadius] = transformations.find(
    (d) => d[0] === 'polar',
  );
  return [innerRadius as number, outerRadius as number];
}
