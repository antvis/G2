/**
 * @see https://github.com/antvis/G2/discussions/4557
 */
import { Coordinate } from '@antv/coord';
import { head, last } from '@antv/util';
import { getPolarOptions, getRadialOptions } from '../coordinate';
import {
  coordOf,
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
import { isValidScale, useRelationScale } from './scale';
import {
  G2Theme,
  GuideComponentOrientation as GCO,
  GuideComponentPosition as GCP,
} from './types/common';
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
import {
  DistributionScale,
  ContinuousScale,
  DiscreteScale,
} from './types/scale';

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
    const { defaultPosition, defaultOrientation, defaultOrder, defaultSize } =
      props;
    const titleOptions = typeof title === 'string' ? { title } : title;
    components.push({
      type: 'title',
      position: defaultPosition,
      orientation: defaultOrientation,
      order: defaultOrder,
      size: defaultSize,
      ...titleOptions,
    });
  }

  for (const scale of displayedScales) {
    const type = inferComponentType(scale, coordinates);
    if (type !== null) {
      const { props } = createGuideComponent(type);
      const { defaultPosition, defaultOrientation, defaultSize, defaultOrder } =
        props;
      const { guide: guideOptions, name, field } = scale;
      // A scale may have multiple guides.
      const guides = Array.isArray(guideOptions)
        ? guideOptions
        : [guideOptions];
      for (const partialGuide of guides) {
        const [position, orientation] = inferComponentPositionAndOrientation(
          name,
          type,
          defaultPosition,
          defaultOrientation,
          partialGuide,
          guides,
          displayedScales,
          coordinates,
        );

        // Skip if position and orientation are not specified.
        // @example the last axis of radar chart
        if (!position && !orientation) continue;

        const { size = defaultSize, order = defaultOrder } = partialGuide;
        components.push({
          title: field,
          ...partialGuide,
          position,
          orientation,
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
  const value = { field, domain, bbox, scale: scaleDescriptor, library };
  const render = useGuideComponent(options);
  return render(scale, value, coordinates, theme);
}

function inferLegendComponentType(scale: G2ScaleOptions) {
  const { name, type: scaleType } = scale;

  const scaleCategories = {
    continuous: Object.keys(ContinuousScale),
    distribution: Object.keys(DistributionScale),
    discrete: Object.keys(DiscreteScale),
  };

  const generalComponentInfer = {
    color: {
      continuous: 'legendContinuous',
      distribution: 'legendContinuousBlock',
      discrete: 'legendCategory',
    },
    // opacity: {
    //   continuous: 'legendContinuous',
    //   distribution: 'legendContinuousBlock',
    //   discrete: 'legendCategory',
    // },
    shape: {
      continuous: null,
      distribution: null,
      discrete: 'legendCategory',
    },
    size: {
      continuous: 'legendContinuousSize',
      distribution: 'continuousBlockSize',
      discrete: 'legendCategory',
    },
  };

  if (Object.keys(generalComponentInfer).includes(name)) {
    const kindOfScale = Object.entries(scaleCategories).find(([cat, list]) =>
      list.includes(scaleType as string),
    );
    if (!kindOfScale) return null;
    return generalComponentInfer[name][head(kindOfScale)] as string;
  }
  return null;
}

function inferAxisComponentType(
  scale: G2ScaleOptions,
  coordinates: G2CoordinateOptions[],
) {
  const { name } = scale;
  // todo wait for gui provide helix axis
  if (isHelix(coordinates) || isTheta(coordinates)) return null;
  if (
    isTranspose(coordinates) &&
    (isPolar(coordinates) || isRadial(coordinates))
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
    if (isRadar(coordinates)) return 'axisRadar';
    if (!isPolar(coordinates)) return 'axisY';
  }
  return null;
}

function inferComponentType(
  scale: G2ScaleOptions,
  coordinates: G2CoordinateOptions[],
) {
  const {
    guide: { type },
  } = scale;

  if (type !== undefined) return type;
  if (!isValidScale(scale)) return null;

  return (
    inferLegendComponentType(scale) ||
    inferAxisComponentType(scale, coordinates) ||
    null
  );
}

function angleOf(coordinates: G2CoordinateOptions[]) {
  const polar = coordOf(coordinates, 'polar');
  if (polar.length) {
    const { startAngle, endAngle } = getPolarOptions(last(polar));
    return [startAngle, endAngle];
  }
  const radial = coordOf(coordinates, 'radial');
  if (radial.length) {
    const { startAngle, endAngle } = getRadialOptions(last(radial));
    return [startAngle, endAngle];
  }
  return [-Math.PI / 2, (Math.PI / 2) * 3];
}

/**
 * match index of position
 */
function matchPosition(name: string) {
  const match = /position(\d*)/g.exec(name);
  if (!match) return null;
  return +match[1];
}

function inferAxisPositionAndOrientation(
  name: string,
  type: string,
  ordinalPosition: [GCP, GCO],
  guide: G2GuideComponentOptions,
  guides: G2GuideComponentOptions[],
  scales: G2ScaleOptions[],
  coordinates: G2CoordinateOptions[],
): [GCP, GCO] {
  // todo, in current resolution, the radar chart is implement by parallel + polar coordinate.
  // implementation plan to be confirmed.
  // in current implementation, it must to add the first position encode to it's last.
  // so we won't render the last axis repeatly.
  if (type === 'axisRadar') {
    const positions = scales.filter((scale) =>
      scale.name.startsWith('position'),
    );
    const index = matchPosition(name);
    if (name === last(positions).name || index === null) return [null, null];
    // infer radar axis orientation
    const [startAngle, endAngle] = angleOf(coordinates);
    const angle =
      ((endAngle - startAngle) / (positions.length - 1)) * index + startAngle;
    return ['center', angle];
  }

  // There are multiple axes for parallel coordinate.
  // Place the first one in the border area and put others in the center.
  if (type === 'axisY' && isParallel(coordinates)) {
    // name looks like `position${number}`
    const index = matchPosition(name);
    if (index === null) return ordinalPosition;

    if (isTranspose(coordinates)) {
      return index === 0 ? ['top', null] : ['center', 'horizontal'];
    }
    return index === 0 ? ordinalPosition : ['center', 'vertical'];
  }

  // in non-cartesian coordinate systems, infer the arc axis angle
  if (type === 'axisLinear') {
    const [startAngle] = angleOf(coordinates);
    return ['center', startAngle];
  }

  if (type === 'axisArc') {
    if (ordinalPosition[0] === 'inner') return ['inner', null];
    return ['outer', null];
  }

  if (isPolar(coordinates)) return ['center', null];
  if (isRadial(coordinates)) return ['center', null];
  if (
    (type === 'axisX' && isReflect(coordinates)) ||
    (type === 'axisX' && isReflectY(coordinates))
  ) {
    return ['top', null];
  }

  // if (type === 'axisX') return ['bottom', null];
  return ordinalPosition;
}

// @todo Infer position by coordinates.
function inferComponentPositionAndOrientation(
  name: string,
  type: string | GCC,
  defaultPosition: GCP,
  defaultOrientation: GCO,
  guide: G2GuideComponentOptions,
  guides: G2GuideComponentOptions[],
  scales: G2ScaleOptions[],
  coordinates: G2CoordinateOptions[],
): [GCP, GCO] {
  const [startAngle] = angleOf(coordinates);

  const ordinalPositionAndOrientation: [GCP, GCO] = [
    guide.position || defaultPosition,
    startAngle ?? defaultOrientation,
  ];

  if (typeof type === 'string' && type.startsWith('axis')) {
    return inferAxisPositionAndOrientation(
      name,
      type,
      ordinalPositionAndOrientation,
      guide,
      guides,
      scales,
      coordinates,
    );
  }

  if (
    typeof type === 'string' &&
    type.startsWith('legend') &&
    isPolar(coordinates)
  ) {
    if (guide.position === 'center') return ['center', 'vertical'];
  }
  // for general component, use default position
  return ordinalPositionAndOrientation;
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
