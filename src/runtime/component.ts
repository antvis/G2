/**
 * @see https://github.com/antvis/G2/discussions/4557
 */
import { Coordinate } from '@antv/coord';
import {
  isHelix,
  isParallel,
  isPolar,
  isRadar,
  isRadial,
  isReflect,
  isReflectY,
  isTheta,
  isTranspose,
} from './coordinate';
import { useLibrary } from './library';
import { useRelationScale } from './scale';
import { G2Theme, GuideComponentPosition as GCP } from './types/common';
import {
  GuideComponent,
  GuideComponentComponent as GCC,
} from './types/component';
import {
  G2CoordinateOptions,
  G2GuideComponentOptions,
  G2Library,
  G2ScaleOptions,
  G2View,
} from './types/options';
import { CategoryScale, ContinuousScale, DiscreteScale } from './types/scale';

export function inferComponent(
  scales: G2ScaleOptions[],
  partialOptions: G2View,
  library: G2Library,
): G2GuideComponentOptions[] {
  const {
    component: partialComponents = [],
    coordinates = [],
    title,
    theme,
  } = partialOptions;
  const [, createGuideComponent] = useLibrary<
    G2GuideComponentOptions,
    GCC,
    GuideComponent
  >('component', library);

  const displayedScales = scales.filter(({ guide, name }) => {
    if (guide === null) return false;
    return true;
  });
  const sliders = inferScrollableComponents(partialOptions, scales, library);
  const components = [...partialComponents, ...sliders];
  if (title) {
    const { props } = createGuideComponent('title');
    const { defaultPosition, defaultOrder, defaultSize } = props;
    const titleOptions = typeof title === 'string' ? { title } : title;
    components.push({
      type: 'title',
      position: defaultPosition,
      order: defaultOrder,
      size: defaultSize,
      ...titleOptions,
    });
  }

  for (const scale of displayedScales) {
    const type = inferComponentType(scale, coordinates);
    if (type !== null) {
      const { props } = createGuideComponent(type);
      const { defaultPosition, defaultSize, defaultOrder } = props;
      const { guide: guideOptions, name, field } = scale;
      // A scale may have multiple guides.
      const guides = Array.isArray(guideOptions)
        ? guideOptions
        : [guideOptions];
      for (const partialGuide of guides) {
        const position = inferComponentPosition(
          name,
          type,
          defaultPosition,
          partialGuide,
          coordinates,
        );
        const { size = defaultSize, order = defaultOrder } = partialGuide;
        components.push({
          title: field,
          ...partialGuide,
          position,
          order,
          size,
          type,
          scale,
        });
      }
    }
  }

  return components;
}

export function renderComponent(
  component: G2GuideComponentOptions,
  coordinates: Coordinate,
  theme: G2Theme,
  library: G2Library,
) {
  const [useGuideComponent] = useLibrary<
    G2GuideComponentOptions,
    GCC,
    GuideComponent
  >('component', library);
  const { scale: scaleDescriptor, bbox, ...options } = component;
  const scale = scaleDescriptor
    ? useRelationScale(scaleDescriptor, library)
    : null;

  const { field, domain } = scaleDescriptor || {};
  const value = { field, domain, bbox };
  const render = useGuideComponent(options);
  return render(scale, value, coordinates, theme);
}

// @todo Render axis in polar with parallel coordinate.  雷达图
// @todo Infer legend for shape.
function inferComponentType(
  scale: G2ScaleOptions,
  coordinates: G2CoordinateOptions[],
) {
  const { name, guide, type: scaleType } = scale;
  const { type } = guide;
  if (type !== undefined) return type;
  const scaleCategories = {
    continuous: Object.keys(ContinuousScale),
    category: Object.keys(CategoryScale),
    discrete: Object.keys(DiscreteScale),
  };

  const generalComponentInfer = {
    color: {
      continuous: 'legendContinuous',
      category: 'legendContinuousBlock',
      discrete: 'legendCategory',
    },
    opacity: {
      continuous: 'legendContinuous',
      category: 'legendContinuousBlock',
      discrete: 'legendCategory',
    },
    shape: {
      continuous: null,
      category: null,
      discrete: 'legendCategory',
    },
    size: {
      continuous: 'legendContinuousSize',
      category: 'continuousBlockSize',
      discrete: 'legendCategory',
    },
  };

  if (Object.keys(generalComponentInfer).includes(name)) {
    const scaleCat = Object.entries(scaleCategories).find(([cat, list]) =>
      list.includes(scaleType as string),
    );
    if (!scaleCat) return null;
    return generalComponentInfer[name][scaleCat[0]];
  }

  // todo wait for gui provide helix axis
  // theta doesn't need axis
  if (
    (isTranspose(coordinates) && isPolar(coordinates)) ||
    isHelix(coordinates) ||
    isTheta(coordinates)
  )
    return null;
  // infer axis
  if (name.startsWith('x')) {
    if (isPolar(coordinates)) return 'axisArc';
    if (isRadial(coordinates)) return 'axisLinear';
    return isTranspose(coordinates) ? 'axisY' : 'axisX';
  }
  if (name.startsWith('y')) {
    if (isPolar(coordinates)) return 'axisLinear';
    if (isRadial(coordinates)) return 'axisArc';
    return isTranspose(coordinates) ? 'axisX' : 'axisY';
  }
  if (name.startsWith('position')) {
    if (isRadar(coordinates)) return 'axisLinear';
    if (!isPolar(coordinates)) return 'axisY';
  }

  return null;
}

function inferAxisPosition(
  name: string,
  type: string,
  ordinalPosition: GCP,
  guide: G2GuideComponentOptions,
  coordinates: G2CoordinateOptions[],
): GCP {
  // There are multiple axes for parallel coordinate.
  // Place the first one in the border area and put others in the center.
  if (type === 'axisY' && isParallel(coordinates)) {
    // name looks like `position${number}`
    const match = /position(\d*)/g.exec(name);
    if (match === null) return ordinalPosition;
    const index = +match[1];
    if (isTranspose(coordinates)) {
      return index === 0
        ? { anchor: 'top' }
        : { anchor: 'center', orientation: 'horizontal' };
    }
    return index === 0
      ? ordinalPosition
      : { anchor: 'center', orientation: 'vertical' };
  }

  // in non-cartesian coordinate systems, infer the arc axis
  if (
    (type === 'axisX' && isPolar(coordinates) && !isTranspose(coordinates)) ||
    (type === 'axisY' && isPolar(coordinates) && isTranspose(coordinates)) ||
    (type === 'axisY' && isTheta(coordinates)) ||
    (type === 'axisY' && isHelix(coordinates)) ||
    (type === 'axisY' && isRadial(coordinates))
  ) {
    if (ordinalPosition[0] === 'inner') {
      return { anchor: 'inner' };
    }
    return { anchor: 'outer' };
  }

  if (isPolar(coordinates) && type === 'axisY') {
    return { anchor: 'center' };
  }

  if (isRadial(coordinates) && type === 'axisX') {
    return { anchor: 'center' };
  }

  if (
    (type === 'axisX' && isReflect(coordinates)) ||
    (type === 'axisX' && isReflectY(coordinates))
  ) {
    return { anchor: 'top' };
  }

  if (type === 'axisX') return { anchor: 'bottom' };
  return { anchor: 'left' };
}

// @todo Infer position by coordinates.
function inferComponentPosition(
  name: string,
  type: string | GCC,
  defaultPosition: GCP,
  guide: G2GuideComponentOptions,
  coordinates: G2CoordinateOptions[],
): GCP {
  const ordinalPosition = guide.position || defaultPosition;

  if (typeof type === 'string' && type.startsWith('axis')) {
    return inferAxisPosition(name, type, ordinalPosition, guide, coordinates);
  }

  if (
    typeof type === 'string' &&
    type.startsWith('legend') &&
    isPolar(coordinates)
  ) {
    if (guide.anchor === 'center')
      return { anchor: 'center', orientation: 'vertical' };
  }
  // for general component, use default position
  return ordinalPosition;
}

function inferSrollableType(name: string, type: string, coordinates = []) {
  if (name === 'x') return isTranspose(coordinates) ? `${type}Y` : `${type}X`;
  if (name === 'y') return isTranspose(coordinates) ? `${type}X` : `${type}Y`;
  return null;
}

/**
 * Infer scrollable components, such as slider and scrollbar.
 */
function inferScrollableComponents(
  partialOptions: G2View,
  scales: G2ScaleOptions[],
  library,
): G2GuideComponentOptions[] {
  const [, createGuideComponent] = useLibrary<
    G2GuideComponentOptions,
    GCC,
    GuideComponent
  >('component', library);

  const { coordinates } = partialOptions;

  function normalized(
    type: string,
    channelName: string,
    scale: G2ScaleOptions,
    options: Record<string, any>,
  ) {
    const componentType = inferSrollableType(channelName, type, coordinates);
    if (!options || !componentType) return;

    const { props } = createGuideComponent(componentType);
    const { defaultPosition, defaultSize, defaultOrder } = props;
    return {
      position: defaultPosition,
      size: defaultSize,
      order: defaultOrder,
      type: componentType,
      ...options,
      scale,
    };
  }

  return scales
    .filter((d) => d.slider || d.scrollbar)
    .flatMap((scale) => {
      const { slider, scrollbar, name: channelName } = scale;

      return [
        normalized('slider', channelName, scale, slider),
        normalized('scrollbar', channelName, scale, scrollbar),
      ];
    })
    .filter((d) => !!d);
}
