/**
 * @see https://github.com/antvis/G2/discussions/4557
 */
import { Coordinate } from '@antv/coord';
import { deepMix, isEqual } from '@antv/util';
import { group, max, sum } from 'd3-array';
import { format } from 'd3-format';
import { DisplayObject, Text } from '@antv/g';
import {
  getPolarOptions,
  getRadialOptions,
  type PolarOptions,
  type RadialOptions,
} from '../coordinate';
import { combine } from '../utils/array';
import { capitalizeFirst, defined, subObject } from '../utils/helper';
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
  ScaleComponent,
  Scale,
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

  const inferredComponents = inferComponentsType(displayedScales, coordinates);

  inferredComponents.forEach(([type, relativeScales]) => {
    const { props } = createGuideComponent(type);
    const { defaultPosition, defaultOrientation, defaultSize, defaultOrder } =
      props;
    // @todo to be confirm if the scale can be merged.
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
  const availableScales = scales.filter((scale) => isValidScale(scale));
  return [
    ...inferLegendComponentType(availableScales, coordinates),
    ...inferAxisComponentType(availableScales, coordinates),
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
  // so we won't render the last axis repeatably.
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

function inferScrollableType(name: string, type: string, coordinates = []) {
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
    const componentType = inferScrollableType(channelName, type, coordinates);
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

// !!! Note Mutate component.size and component.style.
export function computeComponentSize(
  component: G2GuideComponentOptions,
  crossSize: number,
  crossPadding: [number, number],
  position: GCP,
  theme: G2Theme,
  library: G2Library,
): G2GuideComponentOptions {
  const [useScale] = useLibrary<G2ScaleOptions, ScaleComponent, Scale>(
    'scale',
    library,
  );

  // Only compute and update size of axis component in padding area.
  // @todo Legend, slider.
  const { type } = component;
  const paddingAreas = ['left', 'right', 'bottom', 'top'];
  if (typeof type !== 'string' || !type.startsWith('axis')) return;
  if (!paddingAreas.includes(position)) return;

  // If padding is auto, use hide as the labelTransform by default
  // to avoid overlap between labels.
  component.transform = component.transform || [{ type: 'hide' }];

  const { labelFormatter, scales, title, tickCount, tickMethod, tickFilter } =
    component;
  const isVertical = position === 'left' || position === 'right';

  // Get styles to be applied.
  const style = styleOf(component, position, theme);
  const { tickLength = 0, labelSpacing = 0, titleSpacing = 0, ...rest } = style;

  // Init scale, the tickCount of axis has higher priority than scale.
  const [scaleOptions] = scales;
  if (tickCount !== undefined) scaleOptions.tickCount = tickCount;
  if (tickMethod !== undefined) scaleOptions.tickMethod = tickMethod;
  const scale = useScale(scaleOptions);

  // Get labels to be rendered.
  const labels = labelsOf(scale, labelFormatter, tickFilter);
  const labeStyle = subObject(rest, 'label');
  const labelBBoxes = labels.map((d, i) => {
    const normalizeStyle = Object.fromEntries(
      Object.entries(labeStyle).map(([key, value]) => [
        key,
        typeof value === 'function' ? value(d, i) : value,
      ]),
    );
    // Auto padding should ignore transform for horizontal axis.
    if (!isVertical) normalizeStyle.transform = 'none';
    return computeLabelSize(d, normalizeStyle);
  });

  const maxLabelWidth = max(labelBBoxes, (d) => d.width);
  const paddingTick = tickLength + labelSpacing;

  if (isVertical) {
    component.size = maxLabelWidth + paddingTick;
  } else {
    // If the labels can't be placed horizontally,
    // rotate 90 deg to display them.
    if (overflowX(scale, labelBBoxes, crossSize, crossPadding, tickFilter)) {
      component.size = maxLabelWidth + paddingTick;
      component.style = {
        ...component.style,
        labelTransform: 'rotate(90)',
      };
    } else {
      const maxLabelHeight = max(labelBBoxes, (d) => d.height);
      component.size = maxLabelHeight + paddingTick;
    }
  }

  // Cache boxes to avoid computed twice.
  const I = labels.map((_, i) => i);
  component.indexBBox = new Map(I.map((i) => [i, [labels[i], labelBBoxes[i]]]));

  if (title === false || title === null || title === undefined) return;

  // Get title to be rendered.
  const titleStyle = subObject(rest, 'title');
  const titleText = Array.isArray(title) ? title.join(',') : title;
  const titleBBox = computeLabelSize(titleText, titleStyle);

  if (isVertical) {
    component.size += titleSpacing + titleBBox.width;
  } else {
    component.size += titleSpacing + titleBBox.height;
  }
}

function styleOf(
  axis: G2GuideComponentOptions,
  position: GCP,
  theme: G2Theme,
): Record<string, any> {
  const {
    axis: baseStyle,
    // @ts-ignore
    [`axis${capitalizeFirst(position)}`]: positionStyle,
  } = theme;
  return deepMix({}, baseStyle, positionStyle, axis.style);
}

function ticksOf(scale: Scale, tickFilter: (d: any) => boolean): any[] {
  const ticks = scale.getTicks ? scale.getTicks() : scale.getOptions().domain;
  if (!tickFilter) return ticks;
  return ticks.filter(tickFilter);
}

function labelsOf(
  scale: Scale,
  labelFormatter: (d: any) => string | DisplayObject,
  tickFilter,
): (string | DisplayObject)[] {
  const T = ticksOf(scale, tickFilter);
  const ticks = T.map((d) => (typeof d === 'number' ? prettyNumber(d) : d));
  const formatter = labelFormatter
    ? typeof labelFormatter === 'string'
      ? format(labelFormatter)
      : labelFormatter
    : scale.getFormatter
    ? scale.getFormatter()
    : (d) => `${d}`;
  return ticks.map(formatter);
}

function offsetOf(scale: Scale, d: any): number {
  if (!scale.getBandWidth) return 0;
  const offset = scale.getBandWidth(d) / 2;
  return offset;
}

function overflowX(
  scale: Scale,
  labelBBoxes: DOMRect[],
  crossSize: number,
  crossPadding: [number, number],
  tickFilter: (d: any) => boolean,
): boolean {
  // If actual size bigger than container size, overflow.
  const totalSize = sum(labelBBoxes, (d) => d.width);
  if (totalSize > crossSize) return true;

  // Clone scale to get visual position for labels.
  const scaleX = scale.clone();
  scaleX.update({ range: [0, crossSize] });
  const ticks = ticksOf(scale, tickFilter);
  const X = ticks.map((d) => scaleX.map(d) + offsetOf(scaleX, d));

  const I = ticks.map((_, i) => i);
  const startX = -crossPadding[0];
  const endX = crossSize + crossPadding[1];
  const extent = (x, bbox) => {
    const { width } = bbox;
    return [x - width / 2, x + width / 2];
  };

  // Collision detection.
  for (let i = 0; i < I.length; i++) {
    const x = X[i];
    const [x0, x1] = extent(x, labelBBoxes[i]);
    // If a label is out of plot area, overflow.
    if (x0 < startX || x1 > endX) return true;
    const y = X[i + 1];
    if (y) {
      // If two labels intersect, overflow.
      const [y0] = extent(y, labelBBoxes[i + 1]);
      if (x1 > y0) return true;
    }
  }
  return false;
}

function computeLabelSize(
  d: string | DisplayObject,
  style: Record<string, any>,
): DOMRect {
  const shape = normalizeLabel(d);
  shape.attr({ ...style, visibility: 'none' });
  const bbox = shape.getBBox();
  return bbox;
}

function normalizeLabel(d: string | DisplayObject): DisplayObject {
  if (d instanceof DisplayObject) return d;
  return new Text({ style: { text: `${d}` } });
}

function prettyNumber(n: number) {
  return Math.abs(n) < 1e-15 ? n : parseFloat(n.toFixed(15));
}
