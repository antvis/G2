import {
  G2ScaleOptions,
  G2CoordinateOptions,
  G2Library,
  G2GuideComponentOptions,
  G2Area,
} from './types/options';
import { GuideComponentComponent, GuideComponent } from './types/component';
import { GuideComponentPosition } from './types/common';
import { isPolar, isTranspose, isParallel } from './coordinate';
import { useLibrary } from './library';

export function inferComponent(
  scales: G2ScaleOptions[],
  partialOptions: G2Area,
  library: G2Library,
): G2GuideComponentOptions[] {
  const { component: partialComponents = [], coordinate = [] } = partialOptions;
  const [, createGuideComponent] = useLibrary<
    G2GuideComponentOptions,
    GuideComponentComponent,
    GuideComponent
  >('component', library);

  const displayedScales = scales.filter(({ guide }) => guide !== null);
  const components = [...partialComponents];

  for (const scale of displayedScales) {
    const type = inferComponentType(scale, coordinate);
    if (type !== null) {
      const { props } = createGuideComponent(type);
      const { defaultPosition, defaultSize, defaultOrder } = props;
      const { guide: partialGuide, name } = scale;
      const {
        position = inferComponentPosition(
          name,
          type,
          defaultPosition,
          partialGuide,
          coordinate,
        ),
        size = defaultSize,
        order = defaultOrder,
      } = partialGuide;
      components.push({ ...partialGuide, position, order, size, type, scale });
    }
  }

  return components;
}

// @todo Render components in non-cartesian coordinate.
// @todo Infer legend for shape.
function inferComponentType(
  scale: G2ScaleOptions,
  coordinates: G2CoordinateOptions[],
) {
  if (isPolar(coordinates)) return null;
  if (isTranspose(coordinates)) return null;

  const { name, guide, type: scaleType } = scale;
  const { type } = guide;
  if (type !== undefined) return type;
  if (name === 'x') return 'axisX';
  if (name === 'y') return 'axisY';
  if (name.startsWith('position')) return 'axisY';
  if (name === 'color') {
    switch (scaleType) {
      case 'ordinal':
        return 'legendCategory';
      case 'linear':
        return 'legendContinuous';
      default:
        return null;
    }
  }
  return null;
}

// @todo Infer position by coordinates.
function inferComponentPosition(
  name: string,
  type: string | GuideComponentComponent,
  defaultPosition: GuideComponentPosition,
  guide: G2GuideComponentOptions,
  coordinate: G2CoordinateOptions[],
): GuideComponentPosition {
  const positions: GuideComponentPosition[] = [
    'left',
    'right',
    'top',
    'bottom',
    'centerHorizontal',
  ];
  const ordinalPosition = !positions.includes(guide.position)
    ? defaultPosition
    : guide.position;

  // There are multiple axes for parallel coordinate.
  // Place the first one in the border area and put others in the center.
  if (type === 'axisY' && isParallel(coordinate)) {
    const match = /position\[(\d+)\]/g.exec(name);
    if (match === null) return ordinalPosition;
    const index = +match[1];
    return index === 0 ? ordinalPosition : 'centerHorizontal';
  }
  return ordinalPosition;
}
