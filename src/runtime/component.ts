import { Coordinate } from '@antv/coord';
import { deepMix, get } from '@antv/util';
import {
  G2ScaleOptions,
  G2CoordinateOptions,
  G2Library,
  G2GuideComponentOptions,
  G2View,
  G2TitleOptions,
} from './types/options';
import {
  GuideComponentComponent,
  GuideComponent,
  ScaleComponent,
  Scale,
} from './types/component';
import { G2Theme, GuideComponentPosition } from './types/common';
import { isPolar, isTranspose, isParallel } from './coordinate';
import { useLibrary } from './library';
import { isPosition } from './scale';

export function inferComponent(
  scales: G2ScaleOptions[],
  partialOptions: G2View,
  library: G2Library,
): G2GuideComponentOptions[] {
  const {
    component: partialComponents = [],
    coordinate = [],
    adjust,
    title,
    theme,
  } = partialOptions;
  const [, createGuideComponent] = useLibrary<
    G2GuideComponentOptions,
    GuideComponentComponent,
    GuideComponent
  >('component', library);

  // For view with adjust, the position channel is meaningless for visualization,
  // so there is no need to show axis.
  const displayedScales = scales.filter(({ guide, name }) => {
    if (guide === null) return false;
    if (adjust && isPosition(name)) return false;
    return true;
  });
  const components = [...partialComponents];
  if (title) {
    const { props } = createGuideComponent('title');
    const { defaultPosition, defaultOrder } = props;
    const titleOptions = typeof title === 'string' ? { content: title } : title;
    const size = inferTitleComponentSize(deepMix({}, theme, titleOptions));
    components.push({
      type: 'title',
      position: defaultPosition,
      order: defaultOrder,
      size,
      ...titleOptions,
    });
  }

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

export function renderComponent(
  component: G2GuideComponentOptions,
  coordinate: Coordinate,
  theme: G2Theme,
  library: G2Library,
) {
  const [useScale] = useLibrary<G2ScaleOptions, ScaleComponent, Scale>(
    'scale',
    library,
  );
  const [useGuideComponent] = useLibrary<
    G2GuideComponentOptions,
    GuideComponentComponent,
    GuideComponent
  >('component', library);
  const { scale: scaleDescriptor, bbox, ...options } = component;
  const scale = scaleDescriptor ? useScale(scaleDescriptor) : null;
  const { field, domain } = scaleDescriptor || {};
  const value = { field, domain, bbox };
  const render = useGuideComponent(options);
  return render(scale, value, coordinate, theme);
}

// @todo Render components in non-cartesian coordinate.
// @todo Infer legend for shape.
function inferComponentType(
  scale: G2ScaleOptions,
  coordinates: G2CoordinateOptions[],
) {
  const { name, guide, type: scaleType } = scale;
  const { type } = guide;
  if (type !== undefined) return type;
  if (isTranspose(coordinates)) return null;
  if (isPolar(coordinates)) return null;
  if (name.startsWith('x')) return 'axisX';
  if (name.startsWith('y')) return 'axisY';
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
    const match = /position(\d*)/g.exec(name);
    if (match === null) return ordinalPosition;
    const index = +match[1];
    return index === 0 ? ordinalPosition : 'centerHorizontal';
  } else if (
    (type === 'axisX' && isPolar(coordinate) && !isTranspose(coordinate)) ||
    (type === 'axisY' && isPolar(coordinate) && isTranspose(coordinate))
  ) {
    return 'arc';
  } else if (isPolar(coordinate) && (type === 'axisX' || type === 'axisY')) {
    return 'arcY';
  }
  return ordinalPosition;
}

function inferTitleComponentSize(options: G2TitleOptions) {
  const { size, text, subtitle, style, subtitleStyle } = options;
  if (size) return size;
  const titleSize = get(style, 'fontSize', 14);
  const subtitleSize = get(subtitleStyle, 'fontSize', 12);
  const spacing = get(subtitleStyle, 'spacing', 0);
  // Extra 4px spacing.
  return (text ? titleSize + 4 : 0) + (subtitle ? subtitleSize + spacing : 0);
}
