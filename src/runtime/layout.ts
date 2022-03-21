import { group, descending, ascending } from 'd3-array';
import { capitalizeFirst } from '../utils/helper';
import { GuideComponentPosition, Section, BBox, Padding } from './types/common';
import { G2Area, G2GuideComponentOptions } from './types/options';

export function computeLayout(
  components: G2GuideComponentOptions[],
  options: G2Area,
): Padding {
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
  layout: Padding,
  partialOptions: G2Area,
): Map<G2GuideComponentOptions, BBox> {
  const positionComponents = group(components, (d) => d.position);
  const {
    paddingLeft: pl,
    paddingRight: pr,
    paddingTop: pt,
    paddingBottom: pb,
  } = layout;

  const { x, y, width, height } = partialOptions;
  const innerHeight = height - pt - pb;
  const innerWidth = width - pr - pl;
  const section: Section = {
    top: [x + pl, y, innerWidth, pt, 0, descending],
    right: [width - pr, y, pr, innerHeight, 1, ascending],
    bottom: [x + pl, height - pb, innerWidth, pb, 0, ascending],
    left: [x, y + pt, pl, innerHeight, 1, descending],
    center: [x + pl, y + pt, innerWidth, innerHeight, -1, null],
  };

  const componentBBox = new Map<G2GuideComponentOptions, BBox>();

  for (const [key, components] of positionComponents.entries()) {
    const [x, y, width, height, direction, comparator] = section[key];
    // In most case there is only one component in the center.
    if (key === 'center') {
      for (const component of components) {
        componentBBox.set(component, { x, y, width, height });
      }
    } else {
      const [
        mainStartKey,
        mainStartValue,
        crossStartKey,
        crossStartValue,
        mainSizeKey,
        crossSizeKey,
        crossSizeValue,
      ] =
        direction === 0
          ? ['y', y, 'x', x, 'height', 'width', width]
          : ['x', x, 'y', y, 'width', 'height', height];

      // Sort components by order.
      // The smaller the order, the closer to center.
      components.sort((a, b) => comparator(a.order, b.order));

      for (let i = 0, start = mainStartValue; i < components.length; i++) {
        const component = components[i];
        const { size } = component;
        componentBBox.set(component, {
          [mainStartKey]: start,
          [crossStartKey]: crossStartValue,
          [mainSizeKey]: size,
          [crossSizeKey]: crossSizeValue,
        });

        start += size;
      }
    }
  }

  return componentBBox;
}
