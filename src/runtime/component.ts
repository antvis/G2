/**
 * @see https://github.com/antvis/G2/discussions/4557
 */
import { Coordinate } from '@antv/coord';
import { isEqual } from '@antv/util';
import { group } from 'd3-array';
import {
  getPolarOptions,
  getRadialOptions,
  type PolarOptions,
  type RadialOptions,
} from '../coordinate';
import { combine } from '../utils/array';
import { defined } from '../utils/helper';
import { LEGEND_INFER_STRATEGIES } from '../component/constant';
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
  G2MarkState,
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
  G2Mark,
  G2ScaleOptions,
  G2View,
} from './types/options';
import {
  ConstantScale,
  ContinuousScale,
  DiscreteScale,
  DistributionScale,
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

  const inferedComponents = inferComponentsType(displayedScales, coordinates);

  inferedComponents.forEach(([type, relativeScales]) => {
    const { props } = createGuideComponent(type);
    const { defaultPosition, defaultOrientation, defaultSize, defaultOrder } =
      props;
    // @todo to be comfirm if the scale can be merged.
    const scale: G2ScaleOptions = Object.assign({}, ...relativeScales);
    const { guide: guideOptions, field } = scale;
    // A scale may have multiple guides.
    const guides = Array.isArray(guideOptions) ? guideOptions : [guideOptions];
    for (const partialGuide of guides) {
      const [position, orientation] = inferComponentPositionAndOrientation(
        type,
        defaultPosition,
        defaultOrientation,
        partialGuide,
        relativeScales,
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
        scales: relativeScales,
      });
    }
  });

  return components;
}

export function renderComponent(
  component: G2GuideComponentOptions,
  coordinate: Coordinate,
  theme: G2Theme,
  library: G2Library,
  markState: Map<G2Mark, G2MarkState>,
) {
  const [useGuideComponent] = useLibrary<
    G2GuideComponentOptions,
    GCC,
    GuideComponent
  >('component', library);
  const { scales: scaleDescriptors = [], bbox, ...options } = component;
  const scales = scaleDescriptors.map((descriptor) =>
    useRelationScale(descriptor, library),
  );
  const value = { bbox, scales: scaleDescriptors, library };
  const render = useGuideComponent(options);
  return render({ coordinate, library, markState, scales, theme, value });
}

function inferLegendComponentType(
  scales: G2ScaleOptions[],
  coordinates: G2CoordinateOptions[],
) {
  const acceptScales = scales
    .filter((scale) =>
      typeof scale.type === 'string'
        ? ['shape', 'size', 'color', 'opacity'].includes(scale.name)
        : true,
    )
    // not support constant size scale
    .filter((scale) => !(scale.type === 'constant' && scale.name === 'size'));

  // scale with undefined field
  const undefinedScales = acceptScales.filter((scale) => !scale.field);
  const definedScales = acceptScales.filter((scale) => !!scale.field);

  // exclude the scales that all type are constant
  const scalesByField = new Map(
    Array.from(group(definedScales, (d) => d.field))
      .map(
        ([field, scales]) =>
          [
            field,
            [
              ...scales,
              ...undefinedScales.filter((scale) => scale.type === 'constant'),
            ],
          ] as const,
      )
      .concat([[undefined, undefinedScales]])
      .filter(([field, scales]) =>
        scales.some((scale) => scale.type !== 'constant'),
      ),
  ) as Map<string, G2ScaleOptions[]>;

  if (scalesByField.size === 0) return [];

  function getScaleType(scale: G2ScaleOptions): string {
    const { type } = scale;
    if (typeof type !== 'string') return null;
    if (type in ContinuousScale) return 'continuous';
    if (type in DiscreteScale) return 'discrete';
    if (type in DistributionScale) return 'distribution';
    if (type in ConstantScale) return 'constant';
    return null;
  }

  const components = Array.from(scalesByField)
    .map(([channel, scs]) => {
      const combinations = combine(scs).sort((a, b) => b.length - a.length);
      const options = combinations.map((combination) => ({
        combination,
        option: combination.map((scale) => [scale.name, getScaleType(scale)]),
      }));

      const sort = (arr: string[][]) =>
        arr.sort((a, b) => a[0].localeCompare(b[0]));
      for (const [componentType, accords] of LEGEND_INFER_STRATEGIES) {
        for (const { option, combination } of options) {
          if (accords.some((accord) => isEqual(sort(accord), sort(option)))) {
            return [componentType, combination] as [string, G2ScaleOptions[]];
          }
        }
      }
      return null;
    })
    .filter(defined);
  return components;
}

function inferAxisComponentType(
  scales: G2ScaleOptions[],
  coordinates: G2CoordinateOptions[],
) {
  return scales
    .map((scale) => {
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
        if (isPolar(coordinates)) return ['axisArc', [scale]];
        if (isRadial(coordinates)) return ['axisLinear', [scale]];
        return [isTranspose(coordinates) ? 'axisY' : 'axisX', [scale]];
      }
      if (name.startsWith('y')) {
        if (isPolar(coordinates)) return ['axisLinear', [scale]];
        if (isRadial(coordinates)) return ['axisArc', [scale]];
        return [isTranspose(coordinates) ? 'axisX' : 'axisY', [scale]];
      }
      if (name.startsWith('position')) {
        if (isRadar(coordinates)) return ['axisRadar', [scale]];
        if (!isPolar(coordinates)) return ['axisY', [scale]];
      }
      return null;
    })
    .filter(defined) as [string | GCC, G2ScaleOptions[]][];
}

function inferComponentsType(
  scales: G2ScaleOptions[],
  coordinates: G2CoordinateOptions[],
): [string | GCC, G2ScaleOptions[]][] {
  const avaliableScales = scales.filter((scale) => isValidScale(scale));
  return [
    ...inferLegendComponentType(avaliableScales, coordinates),
    ...inferAxisComponentType(avaliableScales, coordinates),
  ];
}

function angleOf(coordinates: G2CoordinateOptions[]) {
  const polar = coordOf(coordinates, 'polar');
  if (polar.length) {
    const lastPolar = polar[polar.length - 1] as PolarOptions;
    const { startAngle, endAngle } = getPolarOptions(lastPolar);
    return [startAngle, endAngle];
  }
  const radial = coordOf(coordinates, 'radial') as RadialOptions[];
  if (radial.length) {
    const lastRadial = radial[radial.length - 1];
    const { startAngle, endAngle } = getRadialOptions(lastRadial);
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
  type: string,
  ordinalPosition: [GCP, GCO],
  relativeScales: G2ScaleOptions[],
  scales: G2ScaleOptions[],
  coordinates: G2CoordinateOptions[],
): [GCP, GCO] {
  // a axis only has one scale
  const { name } = relativeScales[0];
  // todo, in current resolution, the radar chart is implement by parallel + polar coordinate.
  // implementation plan to be confirmed.
  // in current implementation, it must to add the first position encode to it's last.
  // so we won't render the last axis repeatly.
  if (type === 'axisRadar') {
    const positions = scales.filter((scale) =>
      scale.name.startsWith('position'),
    );
    const index = matchPosition(name);
    if (name === positions.slice(-1)[0].name || index === null)
      return [null, null];
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
  type: string | GCC,
  defaultPosition: GCP,
  defaultOrientation: GCO,
  guide: G2GuideComponentOptions,
  relativeScales: G2ScaleOptions[],
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
      type,
      ordinalPositionAndOrientation,
      relativeScales,
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
  library: G2Library,
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
      scales: [scale],
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
