/**
 * @see https://github.com/antvis/G2/discussions/4557
 */
import { Coordinate } from '@antv/coord';
import { deepMix, isEqual } from '@antv/util';
import { groups, max, sum } from 'd3-array';
import { format } from 'd3-format';
import { DisplayObject, Text } from '@antv/g';
import {
  getPolarOptions,
  getRadialOptions,
  type PolarOptions,
  type RadialOptions,
} from '../coordinate';
import { combine } from '../utils/array';
import { prettyNumber } from '../utils/number';
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
import { isValidScale } from './scale';
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
  const { coordinates = [], title } = partialOptions;
  const [, createGuideComponent] = useLibrary<
    G2GuideComponentOptions,
    GCC,
    GuideComponent
  >('component', library);

  const displayedScales = scales.filter(({ guide }) => {
    if (guide === null) return false;
    return true;
  });

  const components = [];

  // Sliders and scrollbar component.
  const sliders = inferScrollableComponents(partialOptions, scales, library);
  components.push(...sliders);

  // Title components.
  if (title) {
    const { props } = createGuideComponent('title');
    const {
      defaultPosition,
      defaultOrientation,
      defaultOrder,
      defaultSize,
      defaultCrossPadding,
    } = props;
    const titleOptions = typeof title === 'string' ? { title } : title;
    components.push({
      type: 'title',
      position: defaultPosition,
      orientation: defaultOrientation,
      order: defaultOrder,
      crossPadding: defaultCrossPadding[0],
      defaultSize,
      ...titleOptions,
    });
  }

  // Axis and legends.
  const inferredComponents = inferComponentsType(displayedScales, coordinates);

  inferredComponents.forEach(([type, relativeScales]) => {
    const { props } = createGuideComponent(type);
    const {
      defaultPosition,
      defaultPlane = 'xy',
      defaultOrientation,
      defaultSize,
      defaultOrder,
      defaultLength,
      defaultPadding: DP = [0, 0],
      defaultCrossPadding: DCP = [0, 0],
    } = props;
    // @todo to be confirm if the scale can be merged.
    // const scale: G2ScaleOptions = Object.assign({}, ...relativeScales);
    const scale: G2ScaleOptions = deepMix({}, ...relativeScales);
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

      const isVertical = position === 'left' || position === 'right';
      const defaultPadding = isVertical ? DP[1] : DP[0];
      const defaultCrossPadding = isVertical ? DCP[1] : DCP[0];

      const {
        size,
        order = defaultOrder,
        length = defaultLength,
        padding = defaultPadding,
        crossPadding = defaultCrossPadding,
      } = partialGuide;

      components.push({
        title: field,
        ...partialGuide,
        defaultSize,
        length,
        position,
        plane: defaultPlane,
        orientation,
        padding,
        order,
        crossPadding,
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
  const { scaleInstances: scales, scale, bbox, ...options } = component;
  const value = { bbox, library };
  const render = useGuideComponent(options);
  return render({
    coordinate,
    library,
    markState,
    scales,
    theme,
    value,
    scale,
  });
}

export function normalizeComponents(components: G2GuideComponentOptions[]) {
  return components.map((d) => {
    const component = deepMix(d, d.style);
    delete component.style;
    return component;
  });
}

export function flatComponents(
  components: G2GuideComponentOptions[],
): G2GuideComponentOptions[] {
  return components.flatMap((d) => (d.type == 'group' ? d.children : d));
}

// Wrap legends into a group component.
export function groupComponents(
  components: G2GuideComponentOptions[],
  crossSize?: number,
): G2GuideComponentOptions[] {
  // Group components by key.
  const P = ['left', 'right', 'bottom', 'top'];
  const key = ({ type, position, group }) => {
    if (!P.includes(position)) return Symbol('independent');
    if (group === undefined) {
      if (type.startsWith('legend')) return `legend-${position}`;
      return Symbol('independent');
    }
    if (group === 'independent') return Symbol('independent');
    return group;
  };
  const grouped = groups(components, key);

  // Update attributes of group components,
  // and maybe flatten group components without enough room.
  return grouped.flatMap(([, components]) => {
    if (components.length === 1) return components[0];

    // If crossSize defined, group components only when has
    // enough room.
    if (crossSize !== undefined) {
      // Compute total length.
      const DL = components
        .filter((d) => d.length !== undefined)
        .map((d) => d.length);
      const totalLength = sum(DL);

      // If there is no enough room for components,
      // do not group.
      if (totalLength > crossSize) {
        components.forEach((d) => (d.group = Symbol('independent')));
        return components;
      }

      // Group legends and update legend length.
      const emptyLength = crossSize - totalLength;
      const emptyCount = components.length - DL.length;
      const length = emptyLength / emptyCount;
      components.forEach((d) => {
        if (d.length !== undefined) return;
        d.length = length;
      });
    }

    // Create a group component.
    const size = max(components, (d) => d.size);
    const order = max(components, (d) => d.order);
    const crossPadding = max(components, (d) => d.crossPadding);
    const position = components[0].position;
    return {
      type: 'group',
      size,
      order,
      position,
      children: components,
      crossPadding,
    };
  });
}

function inferLegendComponentType(
  scales: G2ScaleOptions[],
  coordinates: G2CoordinateOptions[],
) {
  // Filter accepts scales.
  const channels = ['shape', 'size', 'color', 'opacity'];
  const isConstantSize = (type, name) => type === 'constant' && name === 'size';
  const accepts = scales.filter(
    ({ type, name }) =>
      typeof type === 'string' &&
      channels.includes(name) &&
      !isConstantSize(type, name), // Do not support constant size scale.
  );

  // Group scales by fields.
  const constants = accepts.filter(({ type }) => type === 'constant');
  const nonConstants = accepts.filter(({ type }) => type !== 'constant');
  const groupKey = (d) => (d.field ? d.field : Symbol('independent'));
  const fieldScales = groups(nonConstants, groupKey)
    .map(([key, scales]) => [key, [...scales, ...constants]] as const)
    .filter(([, scales]) => scales.some((scale) => scale.type !== 'constant'));
  const scalesByField = new Map(fieldScales) as Map<string, G2ScaleOptions[]>;

  // Skip empty scales.
  if (scalesByField.size === 0) return [];

  // Infer components.
  const sort = (arr: string[][]) => arr.sort(([a], [b]) => a.localeCompare(b));
  const components = Array.from(scalesByField)
    .map(([, scs]) => {
      const combinations = combine(scs).sort((a, b) => b.length - a.length);
      const options = combinations.map((combination) => ({
        combination,
        option: combination.map((scale) => [scale.name, getScaleType(scale)]),
      }));

      // For category legend.
      for (const { option, combination } of options) {
        // If every scale is constant, do not display legend.
        if (option.every((d) => d[1] === 'constant')) continue;
        if (option.every((d) => d[1] === 'discrete' || d[1] === 'constant')) {
          return ['legendCategory', combination] as [string, G2ScaleOptions[]];
        }
      }

      // For reset legend.
      // @todo Remove this.
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

function getScaleType(scale: G2ScaleOptions): string {
  const { type } = scale;
  if (typeof type !== 'string') return null;
  if (type in ContinuousScale) return 'continuous';
  if (type in DiscreteScale) return 'discrete';
  if (type in DistributionScale) return 'distribution';
  if (type in ConstantScale) return 'constant';
  return null;
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
      // Only support linear axis for z.
      if (name.startsWith('z')) {
        return ['axisZ', [scale]];
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

  if (type === 'axisY' && isParallel(coordinates)) {
    return isTranspose(coordinates)
      ? ['center', 'horizontal']
      : ['center', 'vertical'];
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
    const {
      defaultPosition,
      defaultSize,
      defaultOrder,
      defaultCrossPadding: [crossPadding],
    } = props;
    return {
      position: defaultPosition,
      defaultSize,
      order: defaultOrder,
      type: componentType,
      crossPadding,
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

// !!! Note Mutate component.size and component.
export function computeComponentSize(
  component: G2GuideComponentOptions,
  crossSize: number,
  crossPadding: [number, number],
  position: GCP,
  theme: G2Theme,
  library: G2Library,
) {
  // Only compute and update size of components in padding area.
  const { type } = component;
  const paddingAreas = ['left', 'right', 'bottom', 'top'];
  if (!paddingAreas.includes(position)) return;
  if (typeof type !== 'string') return;
  const t = type as unknown as string;
  const createCompute = () => {
    if (t.startsWith('axis')) return computeAxisSize;
    if (t.startsWith('group')) return computeGroupSize;
    if (t.startsWith('legendContinuous')) return computeContinuousLegendSize;
    if (t === 'legendCategory') return computeCategoryLegendSize;
    if (t.startsWith('slider')) return computeSliderSize;
    if (t === 'title') return computeTitleSize;
    if (t.startsWith('scrollbar')) return computeScrollbarSize;
    return () => {};
  };
  return createCompute()(
    component,
    crossSize,
    crossPadding,
    position,
    theme,
    library,
  );
}

function computeGroupSize(
  component: G2GuideComponentOptions,
  crossSize: number,
  crossPadding: [number, number],
  position: GCP,
  theme: G2Theme,
  library: G2Library,
) {
  const { children } = component;
  const maxCrossPadding = max(
    children,
    (d: G2GuideComponentOptions) => d.crossPadding,
  );
  children.forEach((d) => (d.crossPadding = maxCrossPadding));
  children.forEach((child) =>
    computeComponentSize(
      child,
      crossSize,
      crossPadding,
      position,
      theme,
      library,
    ),
  );
  const maxSize = max(children, (d: G2GuideComponentOptions) => d.size);
  component.size = maxSize;
  children.forEach((d) => (d.size = maxSize));
}

function computeScrollbarSize(
  component: G2GuideComponentOptions,
  crossSize: number,
  crossPadding: [number, number],
  position: GCP,
  theme: G2Theme,
  library: G2Library,
) {
  const { trackSize = 6 } = deepMix({}, theme.scrollbar, component);
  component.size = trackSize;
}

function computeTitleSize(
  component: G2GuideComponentOptions,
  crossSize: number,
  crossPadding: [number, number],
  position: GCP,
  theme: G2Theme,
  library: G2Library,
) {
  const {
    title,
    subtitle,
    spacing = 0,
    ...style
  } = deepMix({}, theme.title, component);
  if (title) {
    const titleStyle = subObject(style, 'title');
    const titleBBox = computeLabelSize(title, titleStyle);
    component.size = titleBBox.height;
  }
  if (subtitle) {
    const subtitleStyle = subObject(style, 'subtitle');
    const subtitleBBox = computeLabelSize(subtitle, subtitleStyle);
    component.size += spacing + subtitleBBox.height;
  }
}

function computeSliderSize(
  component: G2GuideComponentOptions,
  crossSize: number,
  crossPadding: [number, number],
  position: GCP,
  theme: G2Theme,
  library: G2Library,
) {
  const styleOf = () => {
    const { slider } = theme;
    return deepMix({}, slider, component);
  };
  const { trackSize, handleIconSize } = styleOf();
  const size = Math.max(trackSize, handleIconSize * 2.4);
  component.size = size;
}

function computeAxisSize(
  component: G2GuideComponentOptions,
  crossSize: number,
  crossPadding: [number, number],
  position: GCP,
  theme: G2Theme,
  library: G2Library,
) {
  // If padding is auto, use hide as the labelTransform by default
  // to avoid overlap between labels.
  component.transform = component.transform || [{ type: 'hide' }];

  // Vertical or horizontal.
  const isVertical = position === 'left' || position === 'right';

  // Get styles to be applied.
  const style = styleOf(component, position, theme);
  const {
    tickLength = 0,
    labelSpacing = 0,
    titleSpacing = 0,
    labelAutoRotate,
    ...rest
  } = style;

  // Compute Labels.
  const scale = createScale(component, library);
  const labelBBoxes = computeLabelsBBox(rest, scale);
  const paddingTick = tickLength + labelSpacing;
  if (labelBBoxes && labelBBoxes.length) {
    const maxLabelWidth = max(labelBBoxes, (d) => d.width);
    const maxLabelHeight = max(labelBBoxes, (d) => d.height);
    if (isVertical) {
      component.size = maxLabelWidth + paddingTick;
    } else {
      const { tickFilter, labelTransform } = component;
      // If the labels can't be placed horizontally, and labelTransform is unset,
      // rotate 90 deg to display them.
      if (
        overflowX(scale, labelBBoxes, crossSize, crossPadding, tickFilter) &&
        !labelTransform &&
        labelAutoRotate !== false &&
        labelAutoRotate !== null
      ) {
        component.labelTransform = 'rotate(90)';
        component.size = maxLabelWidth + paddingTick;
      } else {
        component.labelTransform = component.labelTransform ?? 'rotate(0)';
        component.size = maxLabelHeight + paddingTick;
      }
    }
  } else {
    component.size = tickLength;
  }

  // Compute title.
  const titleBBox = computeTitleBBox(rest);
  if (titleBBox) {
    if (isVertical) {
      component.size += titleSpacing + titleBBox.width;
    } else {
      component.size += titleSpacing + titleBBox.height;
    }
  }
}

function computeContinuousLegendSize(
  component: G2GuideComponentOptions,
  crossSize: number,
  crossPadding: [number, number],
  position: GCP,
  theme: G2Theme,
  library: G2Library,
) {
  // Get styles.
  const styleOf = () => {
    const { legendContinuous } = theme;
    return deepMix({}, legendContinuous, component);
  };
  const { labelSpacing = 0, titleSpacing = 0, ...rest } = styleOf();

  // Vertical or horizontal.
  const isVertical = position === 'left' || position === 'right';

  // Ribbon styles.
  const ribbonStyles = subObject(rest, 'ribbon');
  const { size: ribbonSize } = ribbonStyles;

  const handleIconStyles = subObject(rest, 'handleIcon');
  const { size: handleIconSize } = handleIconStyles;

  const mainSize = Math.max(
    ribbonSize,
    handleIconSize * 2.4, // height = width * 2.4
  );

  component.size = mainSize;

  // Compute labels.
  const scale = createScale(component, library);
  const labelBBoxes = computeLabelsBBox(rest, scale);
  if (labelBBoxes) {
    const key = isVertical ? 'width' : 'height';
    const size = max(labelBBoxes, (d) => d[key]);
    component.size += size + labelSpacing;
  }

  // Compute title.
  const titleBBox = computeTitleBBox(rest);
  if (titleBBox) {
    if (isVertical) {
      component.size = Math.max(component.size, titleBBox.width);
    } else {
      component.size += titleSpacing + titleBBox.height;
    }
  }
}

function computeCategoryLegendSize(
  component: G2GuideComponentOptions,
  crossSize0: number,
  crossPadding: [number, number],
  position: GCP,
  theme: G2Theme,
  library: G2Library,
) {
  const styleOf = () => {
    const { legendCategory } = theme;
    const { title } = component;
    const [defaultTitle, specifiedTitle] = Array.isArray(title)
      ? [title, undefined]
      : [undefined, title];
    return deepMix({ title: defaultTitle }, legendCategory, {
      ...component,
      title: specifiedTitle,
    });
  };

  const {
    itemSpacing,
    itemMarkerSize,
    titleSpacing,
    rowPadding,
    colPadding,
    maxCols = Infinity,
    maxRows = Infinity,
    ...rest
  } = styleOf();

  const { cols, length } = component;

  const getRows = (rows) => Math.min(rows, maxRows);
  const getCols = (cols) => Math.min(cols, maxCols);

  // Vertical or horizontal.
  const isVertical = position === 'left' || position === 'right';

  const crossSize =
    length === undefined
      ? crossSize0 + (isVertical ? 0 : crossPadding[0] + crossPadding[1])
      : length;

  // Compute title.
  const titleBBox = computeTitleBBox(rest);

  const scale = createScale(component, library);
  const labelBBoxes = computeLabelsBBox(rest, scale, 'itemLabel');

  const height = Math.max(labelBBoxes[0].height, itemMarkerSize) + rowPadding;
  const widthOf = (w, padding = 0) =>
    itemMarkerSize + w + itemSpacing[0] + padding;

  // Only support grid layout for vertical area.
  const computeVerticalSize = () => {
    let maxSize = -Infinity;
    let pos = 0;
    let cols = 1;
    let rows = 0;
    let maxRows = -Infinity;
    let maxPos = -Infinity;
    const titleHeight = titleBBox ? titleBBox.height : 0;
    const maxHeight = crossSize - titleHeight;
    for (const { width } of labelBBoxes) {
      const w = widthOf(width, colPadding);
      maxSize = Math.max(maxSize, w);
      if (pos + height > maxHeight) {
        cols++;
        maxRows = Math.max(maxRows, rows);
        maxPos = Math.max(maxPos, pos);
        rows = 1;
        pos = height;
      } else {
        pos += height;
        rows++;
      }
    }
    if (cols <= 1) {
      maxRows = rows;
      maxPos = pos;
    }
    component.size = maxSize * getCols(cols);
    component.length = maxPos + titleHeight;
    deepMix(component, { cols: getCols(cols), gridRow: maxRows });
  };

  // Horizontal grid layout.
  const computeHorizontalGrid = () => {
    const rows = Math.ceil(labelBBoxes.length / cols);
    const maxWidth = max(labelBBoxes, (d) => widthOf(d.width)) * cols;
    component.size = height * getRows(rows) - rowPadding;
    component.length = Math.min(maxWidth, crossSize);
  };

  // Horizontal flex layout.
  const computeHorizontalFlex = () => {
    let rows = 1;
    let pos = 0;
    let maxPos = -Infinity;
    for (const { width } of labelBBoxes) {
      const w = widthOf(width, colPadding);
      if (pos + w > crossSize) {
        maxPos = Math.max(maxPos, pos);
        pos = w;
        rows++;
      } else {
        pos += w;
      }
    }
    if (rows === 1) maxPos = pos;
    component.size = height * getRows(rows) - rowPadding;
    component.length = maxPos;
  };

  if (isVertical) computeVerticalSize();
  else if (typeof cols === 'number') computeHorizontalGrid();
  else computeHorizontalFlex();

  // Compute titles.
  if (titleBBox) {
    if (isVertical) {
      component.size = Math.max(component.size, titleBBox.width);
    } else {
      component.size += titleSpacing + titleBBox.height;
    }
  }
}

export function createScale(
  component: G2GuideComponentOptions,
  library: G2Library,
): Scale {
  const [useScale] = useLibrary<G2ScaleOptions, ScaleComponent, Scale>(
    'scale',
    library,
  );
  // Init scale, the tickCount of axis has higher priority than scale.
  const { scales, tickCount, tickMethod } = component;
  const scaleOptions = scales.find(
    (d) => d.type !== 'constant' && d.type !== 'identity',
  );
  if (tickCount !== undefined) scaleOptions.tickCount = tickCount;
  if (tickMethod !== undefined) scaleOptions.tickMethod = tickMethod;
  return useScale(scaleOptions);
}

export function computeLabelsBBox(
  component: G2GuideComponentOptions,
  scale: Scale,
  key = 'label',
) {
  const { labelFormatter, tickFilter, label = true, ...style } = component;
  if (!label) return null;

  // Get labels to be rendered.
  const labels = labelsOf(scale, labelFormatter, tickFilter);
  const labelStyle = subObject(style, key);
  const labelStyles = labels.map((d, i) =>
    Object.fromEntries(
      Object.entries(labelStyle).map(([key, value]) => [
        key,
        typeof value === 'function' ? value(d, i) : value,
      ]),
    ),
  );
  const labelBBoxes = labels.map((d, i) => {
    const normalizeStyle = labelStyles[i];
    return computeLabelSize(d, normalizeStyle);
  });

  // Cache boxes to avoid computed twice.
  // @todo GUI use untransformed bbox, so it can't cache if
  // label.style has transform attributes.
  const hasTransform = labelStyles.some((d) => d.transform);
  if (!hasTransform) {
    const I = labels.map((_, i) => i);
    component.indexBBox = new Map(
      I.map((i) => [i, [labels[i], labelBBoxes[i]]]),
    );
  }

  return labelBBoxes;
}

export function computeTitleBBox(component: G2GuideComponentOptions) {
  const isFalsy = (x) => x === false || x === null;
  const { title, ...style } = component;
  if (isFalsy(title) || title === undefined) return null;
  const titleStyle = subObject(style, 'title');
  const { direction, transform } = titleStyle;
  const titleText = Array.isArray(title) ? title.join(',') : title;
  if (typeof titleText !== 'string') return null;
  const titleBBox = computeLabelSize(titleText, {
    ...titleStyle,
    transform: transform || (direction === 'vertical' ? 'rotate(-90)' : ''),
  });
  return titleBBox;
}

export function styleOf(
  axis: G2GuideComponentOptions,
  position: GCP,
  theme: G2Theme,
): Record<string, any> {
  const { title } = axis;
  const [defaultTitle, specifiedTitle] = Array.isArray(title)
    ? [title, undefined]
    : [undefined, title];
  const {
    axis: baseStyle,
    // @ts-ignore
    [`axis${capitalizeFirst(position)}`]: positionStyle,
  } = theme;
  return deepMix({ title: defaultTitle }, baseStyle, positionStyle, {
    ...axis,
    title: specifiedTitle,
  });
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
  const { filter, ...rest } = style;
  shape.attr({ ...rest, visibility: 'none' });
  const bbox = shape.getBBox();
  return bbox;
}

function normalizeLabel(d: string | DisplayObject): DisplayObject {
  if (d instanceof DisplayObject) return d;
  return new Text({ style: { text: `${d}` } });
}
