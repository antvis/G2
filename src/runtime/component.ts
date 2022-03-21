import {
  G2ScaleOptions,
  G2CoordinateOptions,
  G2Library,
  G2GuideComponentOptions,
  G2Area,
} from './types/options';
import { GuideComponentComponent, GuideComponent } from './types/component';
import { GuideComponentPosition } from './types/common';
import { isPolar, isTranspose } from './coordinate';
import { useLibrary } from './library';

type NormalizedScaleOptions = Omit<G2ScaleOptions, 'guide'> & {
  guide: G2GuideComponentOptions;
};

export function inferComponent(
  scales: G2ScaleOptions[],
  partialOptions: G2Area,
  library: G2Library,
): [G2GuideComponentOptions[], Map<G2GuideComponentOptions, G2ScaleOptions>] {
  const { component: partialComponents = [], coordinate = [] } = partialOptions;
  const [, createGuideComponent] = useLibrary<
    G2GuideComponentOptions,
    GuideComponentComponent,
    GuideComponent
  >('component', library);

  const displayedScales: NormalizedScaleOptions[] = scales
    .filter(({ guide = true }) => guide !== false)
    .map((scale) => {
      const { guide } = scale;
      return {
        ...scale,
        guide: typeof guide === 'boolean' || guide === undefined ? {} : guide,
      };
    });

  const componentScale = new Map<G2GuideComponentOptions, G2ScaleOptions>();
  const components = [...partialComponents];
  for (const scale of displayedScales) {
    const type = inferComponentType(scale, coordinate);
    if (type !== null) {
      const { props } = createGuideComponent(type);
      const { defaultPosition, defaultSize, defaultOrder } = props;
      const { guide: partialGuide } = scale;
      const {
        position = inferComponentPosition(
          defaultPosition,
          partialGuide,
          coordinate,
        ),
        size = defaultSize,
        order = defaultOrder,
      } = partialGuide;
      const guide = {
        ...partialGuide,
        position,
        order,
        size,
        type,
      };
      components.push(guide);
      componentScale.set(guide, scale);
    }
  }

  return [components, componentScale];
}

// @todo Render components in non-cartesian coordinate.
// @todo Infer legend for shape.
function inferComponentType(
  scale: NormalizedScaleOptions,
  coordinates: G2CoordinateOptions[],
) {
  if (isPolar(coordinates)) return null;
  if (isTranspose(coordinates)) return null;

  const { name, guide, type: scaleType } = scale;
  const { type } = guide;
  if (type !== undefined) return type;
  if (name === 'x') return 'axisX';
  if (name === 'y') return 'axisY';
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
  defaultPosition: GuideComponentPosition,
  guide: G2GuideComponentOptions,
  coordinate: G2CoordinateOptions,
): GuideComponentPosition {
  const positions: GuideComponentPosition[] = [
    'left',
    'right',
    'top',
    'bottom',
    'center',
  ];
  const ordinalPosition = !positions.includes(guide.position)
    ? defaultPosition
    : guide.position;
  return ordinalPosition;
}
