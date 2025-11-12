import { deepMix, get, throttle, upperFirst } from '@antv/util';
import { CustomEvent } from '@antv/g';
import { isTranspose } from '../utils/coordinate';
import { invert, domainOf, sliderAbstractOf } from '../utils/scale';
import { SliderFilterInteraction } from '../spec/interaction';
import { Mark } from '../spec';
import { G2ViewDescriptor, G2MarkState } from '../runtime/types/common';
import {
  extractChannelValues,
  isFalsyValue,
  calculateMultiAxisChannelDomains,
  calculateAllIndependentScaleInfo,
} from './utils';
import {
  RuntimeScale,
  extractSingleAxisScaleInfo,
  extractMultiAxisScaleInfo,
  processSingleAxisFiltering,
  processMultiAxisViewFiltering,
  processMultiAxisMarkFiltering,
  updateChannelDomains,
} from './adaptiveFilter';

export const SLIDER_CLASS_NAME = 'slider';

/**
 * Calculates extra inset needed for point marks based on size scale range or values
 *
 * @param view - View descriptor containing markState
 * @returns Calculated inset value from size scale range or values
 */
function calculatePointInset(view: G2ViewDescriptor): number {
  if (!view?.markState) return 0;

  let maxSize = 0;

  for (const [mark, state] of view.markState.entries()) {
    if (mark.type !== 'point' || !state?.channels) continue;

    const sizeChannel = state.channels?.find((ch) => ch.name === 'size');
    if (!sizeChannel) continue;

    // Priority 1: Use scale range if available
    if (sizeChannel.scale?.range?.length > 0) {
      const rangeMax = Math.max(
        ...sizeChannel.scale.range.filter((val) => typeof val === 'number'),
      );
      maxSize = Math.max(maxSize, rangeMax);
      continue;
    }

    // Priority 2: Fallback to values maximum
    if (sizeChannel.values?.length > 0) {
      const sizes = sizeChannel.values
        .filter((item) => item.value !== undefined)
        .flatMap((item) =>
          Array.isArray(item.value) ? item.value : [item.value],
        )
        .filter(
          (value): value is number =>
            typeof value === 'number' && !isNaN(value),
        );

      if (sizes.length > 0) {
        maxSize = Math.max(maxSize, ...sizes);
      }
    }
  }

  return maxSize;
}

/**
 * Options for filtering data by domain.
 * Uses Mark[] type for better type safety.
 */
interface FilterDataByDomainOptions {
  marks: Mark[];
  [key: string]: unknown;
}

/**
 * Scale configuration options.
 * Uses Record<string, unknown> to accommodate various scale property types.
 */
interface ScaleOptions {
  [key: string]: unknown;
}

/**
 * Emits filter events with proper X/Y domain mapping.
 *
 * @param emitter - Event emitter instance
 * @param eventName - Name of the event to emit
 * @param event - Event data object
 * @param domain0 - Primary domain values
 * @param channelDomain - Channel domain configuration
 * @param isX - Whether this is an X-axis event
 * @param nativeEvent - Whether this is a native DOM event
 */
function emitFilterEvent(
  emitter: { emit: (eventName: string, data: unknown) => void },
  eventName: string,
  event: Record<string, unknown>,
  domain0: unknown[],
  channelDomain: Record<string, unknown[]>,
  isX: boolean,
  nativeEvent: boolean,
): void {
  if (nativeEvent) {
    const X = isX ? domain0 : channelDomain.x;
    const Y = isX ? channelDomain.y : domain0;
    emitter.emit(eventName, {
      ...event,
      nativeEvent,
      data: { selection: [extentOf(X), extentOf(Y)] },
    });
  }
}

/**
 * Updates slider state with appropriate filter function.
 * Handles both single-axis and multi-axis scenarios.
 *
 * @param setState - State setter function
 * @param slider - Slider component instance
 * @param params - Configuration parameters for state update
 */
function updateSliderState(
  setState: (slider: unknown, fn: (options: unknown) => unknown) => void,
  slider: unknown,
  view: G2ViewDescriptor,
  params: {
    domain0: unknown[];
    filteredDomain: unknown[] | Map<string, unknown[]>;
    channel0: string;
    channel1: string;
    prefix: string;
    hasState: boolean;
    isMultiAxis: boolean;
    markToScaleMap?: Map<string, string>;
    enableAdaptiveFiltering: boolean;
  },
): void {
  const {
    domain0,
    filteredDomain,
    channel0,
    channel1,
    prefix,
    hasState,
    isMultiAxis,
    markToScaleMap,
    enableAdaptiveFiltering,
  } = params;

  if (isMultiAxis && filteredDomain instanceof Map) {
    setState(slider, (options: FilterDataByDomainOptions) => ({
      ...filterDataByDomainMultiAxis(
        options,
        view,
        {
          [channel0]: { domain: domain0, nice: false },
        },
        prefix,
        hasState,
        channel0,
        channel1,
        markToScaleMap || new Map(),
        filteredDomain,
      ),
    }));
  } else {
    setState(slider, (options: FilterDataByDomainOptions) => ({
      ...filterDataByDomain(
        options,
        view,
        {
          [channel0]: { domain: domain0, nice: false },
          ...(enableAdaptiveFiltering && Array.isArray(filteredDomain)
            ? {
                [channel1]: {
                  domain: filteredDomain,
                  nice: true,
                },
              }
            : {}),
        },
        prefix,
        hasState,
        channel0,
        channel1,
      ),
    }));
  }
}

/**
 * Filters data by domain for single-axis scenarios.
 * Applies scale options and preserves slider state.
 *
 * @param options - Filter data options
 * @param scaleOptions - Scale configuration
 * @param prefix - Slider prefix identifier
 * @param hasState - Whether slider has state
 * @param channel0 - Primary channel (x or y)
 * @param channel1 - Secondary channel (y or x)
 * @returns Filtered options with updated marks
 */
function filterDataByDomain(
  options: FilterDataByDomainOptions,
  view: G2ViewDescriptor,
  scaleOptions: ScaleOptions,
  prefix: string,
  hasState = false,
  channel0 = 'x',
  channel1 = 'y',
) {
  const { marks } = options;
  const extraInset = calculatePointInset(view);

  const newMarks = marks.map((mark) =>
    deepMix(
      {
        // Hide label to keep smooth transition.
        axis: {
          x: { transform: [{ type: 'hide' }] },
          y: { transform: [{ type: 'hide' }] },
        },
      },
      mark,
      {
        scale: scaleOptions,
        [prefix]: {
          ...(mark[prefix]?.[channel0] && {
            [channel0]: { preserve: true, ...(hasState && { ratio: null }) },
          }),
          ...(mark[prefix]?.[channel1] && {
            [channel1]: { preserve: true },
          }),
        },
        animate: false,
      },
    ),
  );

  return {
    ...options,
    marks: newMarks,
    // Add adaptive inset based on actual point sizes from markState
    insetLeft: extraInset,
    insetRight: extraInset,
    insetTop: extraInset,
    insetBottom: extraInset,
    clip: true,
    animate: false,
  };
}

/**
 * Filters data by domain for multi-axis scenarios.
 * Handles independent scales and mark-specific filtering.
 *
 * @param options - Filter data options
 * @param scaleOptions - Scale configuration
 * @param prefix - Slider prefix identifier
 * @param hasState - Whether slider has state
 * @param channel0 - Primary channel (x or y)
 * @param channel1 - Secondary channel (y or x)
 * @param markToScaleMap - Mapping of marks to scale keys
 * @param filteredDomainList - Map of filtered domains by scale key
 * @returns Filtered options with updated marks
 */
function filterDataByDomainMultiAxis(
  options: FilterDataByDomainOptions,
  view: G2ViewDescriptor,
  scaleOptions: ScaleOptions,
  prefix: string,
  hasState = false,
  channel0 = 'x',
  channel1 = 'y',
  markToScaleMap = new Map<string, string>(),
  filteredDomainList = new Map<string, unknown[]>(),
) {
  const { marks } = options;
  const extraInset = calculatePointInset(view);

  const newMarks = marks.map((mark: Record<string, unknown>) => {
    const markKey =
      typeof mark?.key === 'string' ? mark.key : String(mark?.key || '');
    const markToScale = markToScaleMap.get(markKey);
    const filterDomain = filteredDomainList.get(markToScale);
    const scaleNew = filterDomain && {
      y: {
        domain: filterDomain,
        nice: true,
        ...(markToScale !== 'y'
          ? {
              independent: true,
            }
          : undefined),
      },
    };
    return deepMix(
      {
        // Hide label to keep smooth transition.
        axis: {
          x: { transform: [{ type: 'hide' }] },
          y: { transform: [{ type: 'hide' }] },
        },
      },
      mark,
      {
        scale: { ...scaleOptions, ...scaleNew },
        [prefix]: {
          ...(mark[prefix]?.[channel0] && {
            [channel0]: { preserve: true, ...(hasState && { ratio: null }) },
          }),
          ...(mark[prefix]?.[channel1] && {
            [channel1]: { preserve: true },
          }),
        },
        animate: false,
      },
    );
  });
  return {
    ...options,
    marks: newMarks,
    // Add adaptive inset based on actual point sizes from markState
    insetLeft: extraInset,
    insetRight: extraInset,
    insetTop: extraInset,
    insetBottom: extraInset,
    clip: true,
    animate: false,
  };
}

/**
 * Converts slider values to abstract domain values.
 *
 * @param values - Slider value range [start, end]
 * @param scale - Scale instance for conversion
 * @param reverse - Whether to reverse the mapping
 * @returns Abstract domain values
 */
function abstractValue(
  values: [number, number],
  scale: RuntimeScale,
  reverse: boolean,
) {
  const [x, x1] = values;
  const v = reverse ? (d: number) => 1 - d : (d: number) => d;
  const d0 = invert(scale, v(x), true);
  const d1 = invert(scale, v(x1), false);
  return domainOf(scale, [d0, d1]);
}

/**
 * Gets the extent (first and last) values from a domain array.
 *
 * @param domain - Domain array
 * @returns Array containing first and last domain values
 */
function extentOf(domain: unknown[]): unknown[] {
  return [domain[0], domain[domain.length - 1]];
}

/**
 * @todo Support click to reset after fix click and dragend conflict.
 */
export function SliderFilter({
  initDomain = {},
  className = SLIDER_CLASS_NAME,
  prefix = 'slider',
  setValue = (component, values) => component.setValues(values),
  hasState = false,
  wait = 50,
  leading = true,
  trailing = false,
  adaptiveMode = 'filter',
  getInitValues = (slider) => {
    const values = slider?.attributes?.values;
    if (values[0] !== 0 || values[1] !== 1) return values;
  },
}: SliderFilterInteraction) {
  return (context: any, _: any, emitter: any) => {
    const { container, view, update, setState } = context;
    const sliders = container.getElementsByClassName(className);
    if (!sliders.length) return () => {};

    let filtering = false;
    const { scale, coordinate } = view;
    const { x: scaleX, y: scaleY } = scale;
    const transposed = isTranspose(coordinate);

    const channelOf = (orientation: string) => {
      const channel0 = orientation === 'vertical' ? 'y' : 'x';
      const channel1 = orientation === 'vertical' ? 'x' : 'y';
      if (transposed) return [channel1, channel0];
      return [channel0, channel1];
    };

    const sliderHandler = new Map();
    const emitHandlers = new Set<[string, (event: any) => void]>();

    const independentScaleInfo = calculateAllIndependentScaleInfo(view);

    const channelDomain = calculateMultiAxisChannelDomains(
      view,
      initDomain,
      scaleX,
      scaleY,
      independentScaleInfo,
    );

    const sliderArray = Array.from(sliders);

    const hasSliderOfType = (type: string) =>
      sliderArray.some((slider: any) => {
        const { orientation } = slider.attributes;
        const [channel0] = channelOf(orientation);
        return channel0 === type;
      });

    const hasOnlyXSlider = hasSliderOfType('x') && !hasSliderOfType('y');
    const hasOnlyYSlider = hasSliderOfType('y') && !hasSliderOfType('x');

    const enableAdaptiveFiltering =
      !isFalsyValue(adaptiveMode) && (hasOnlyXSlider || hasOnlyYSlider);

    for (const slider of sliders) {
      const { orientation } = slider.attributes;
      const [channel0, channel1] = channelOf(orientation);
      const eventName = `${prefix}${upperFirst(channel0)}:filter`;
      const isX = channel0 === 'x';
      const { ratio: ratioX } = scaleX.getOptions();
      const { ratio: ratioY } = scaleY.getOptions();
      const domainsOf = (event: any): [unknown[], unknown[]] => {
        if (event.data) {
          const { selection } = event.data;
          const [X = extentOf(channelDomain.x), Y = extentOf(channelDomain.y)] =
            selection;
          return isX
            ? [domainOf(scaleX, X, ratioX), domainOf(scaleY, Y, ratioY)]
            : [domainOf(scaleY, Y, ratioY), domainOf(scaleX, X, ratioX)];
        }

        const { value: values } = event.detail;
        const scale0 = scale[channel0];
        const domain0 = abstractValue(
          values,
          scale0,
          transposed && orientation === 'horizontal',
        );
        const domain1 = channelDomain[channel1];
        return [domain0, domain1];
      };

      // Create value change handler with independent filtering state
      // Each slider maintains its own filtering state to prevent mutual interference in dual-axis scenarios
      let isFiltering = false;
      const setFiltering = (value: boolean) => {
        isFiltering = value;
        // Only reset global state when all sliders are not filtering
        if (!value) {
          filtering = false;
        }
      };

      const onValueChange = createValueChangeHandler({
        getFiltering: () => isFiltering,
        setFiltering,
        domainsOf,
        view,
        independentScaleInfo,
        enableAdaptiveFiltering,
        hasOnlyXSlider,
        hasOnlyYSlider,
        adaptiveMode,
        scaleX,
        scaleY,
        scale,
        channelDomain,
        channel0,
        channel1,
        isX,
        emitter,
        eventName,
        setState,
        slider,
        prefix,
        hasState,
        update,
        wait,
        leading,
        trailing,
      });

      const emitHandler = (event: any) => {
        const { nativeEvent } = event;
        if (nativeEvent) return;

        const { data } = event;
        const { selection } = data;
        const [X, Y] = selection;

        slider.dispatchEvent(
          new CustomEvent('valuechange', {
            data,
            nativeEvent: false,
          }),
        );

        const V = isX
          ? sliderAbstractOf(X, scaleX)
          : sliderAbstractOf(Y, scaleY);
        setValue(slider, V);
      };

      emitter.on(eventName, emitHandler);

      slider.addEventListener('valuechange', onValueChange);
      sliderHandler.set(slider, onValueChange);
      emitHandlers.add([eventName, emitHandler]);

      const values = getInitValues(slider);

      if (values) {
        slider.dispatchEvent(
          new CustomEvent('valuechange', {
            detail: {
              value: values,
            },
            nativeEvent: false,
            initValue: true,
          }),
        );
      }
    }

    return () => {
      for (const [slider, handler] of sliderHandler) {
        slider.removeEventListener('valuechange', handler);
      }
      for (const [name, handler] of emitHandlers) {
        emitter.off(name, handler);
      }
    };
  };
}

/**
 * Processes multi-axis filtering for view-level sliders.
 * Handles both view-level and mark-level slider configurations.
 *
 * @param params - Multi-axis filtering parameters
 * @returns Filtered domain mapping
 */
function processMultiAxisFiltering({
  view,
  domain0,
  shouldFilterXAxis,
  enableAdaptiveFiltering,
  markDataPairs,
  adaptiveMode,
  scaleX,
  scaleY,
  scale,
  channelDomain,
  independentScaleInfo,
  channel0,
}: {
  view: any;
  domain0: unknown[];
  shouldFilterXAxis: boolean;
  enableAdaptiveFiltering: boolean;
  markDataPairs: any[];
  adaptiveMode: any;
  scaleX: RuntimeScale;
  scaleY: RuntimeScale;
  scale: Record<string, RuntimeScale>;
  channelDomain: Record<string, unknown[]>;
  independentScaleInfo: any;
  channel0: string;
}): {
  filteredDomain: Map<string, unknown[]>;
  markToScaleMap: Map<string, string>;
} {
  const filteredDomain = new Map<string, unknown[]>();
  const markToScaleMap = new Map<string, string>();

  if (
    !enableAdaptiveFiltering ||
    markDataPairs.length === 0 ||
    !domain0?.length
  ) {
    return { filteredDomain, markToScaleMap };
  }

  const viewSlider = get(view, 'options.slider');
  const isViewSlider =
    Object.keys(viewSlider).length > 0 &&
    Object.prototype.hasOwnProperty.call(viewSlider, channel0);

  if (isViewSlider) {
    // Handle view-level slider
    const multiAxisScaleInfo = extractMultiAxisScaleInfo(
      shouldFilterXAxis,
      scale,
      scaleX,
      scaleY,
      channelDomain,
    );

    const scaleMapToUse = shouldFilterXAxis
      ? independentScaleInfo.markToXScaleMap
      : independentScaleInfo.markToYScaleMap;

    scaleMapToUse.forEach((scaleKey, markKey) => {
      markToScaleMap.set(markKey, scaleKey);
    });

    const processedFilteredDomain = processMultiAxisViewFiltering({
      markDataPairs,
      domain: domain0,
      scaleInfo: multiAxisScaleInfo,
      markToScaleMap,
      adaptiveMode,
      isViewSlider: true,
      shouldFilterXAxis,
    });

    updateChannelDomains(
      channelDomain,
      processedFilteredDomain,
      shouldFilterXAxis,
      true,
    );
    return { filteredDomain: processedFilteredDomain, markToScaleMap };
  } else {
    // Handle mark-level slider
    const targetMarkKey = findTargetMarkKey(view, channel0);
    if (targetMarkKey) {
      const singleAxisScaleInfo = extractSingleAxisScaleInfo(
        shouldFilterXAxis,
        scaleX,
        scaleY,
      );
      const scaleMapping = shouldFilterXAxis
        ? independentScaleInfo.markToXScaleMap
        : independentScaleInfo.markToYScaleMap;
      const targetScaleKey = scaleMapping.get(targetMarkKey) || '';

      if (targetScaleKey) {
        markToScaleMap.set(targetMarkKey, targetScaleKey);
        const processedFilteredDomain = processMultiAxisMarkFiltering(
          markDataPairs,
          domain0,
          singleAxisScaleInfo,
          targetMarkKey,
          targetScaleKey,
          adaptiveMode,
          shouldFilterXAxis,
          scaleMapping,
        );
        return { filteredDomain: processedFilteredDomain, markToScaleMap };
      }
    }
  }

  return { filteredDomain, markToScaleMap };
}

/**
 * Finds the target mark key for mark-level sliders.
 *
 * @param view - View instance
 * @param channel0 - Channel identifier
 * @returns Target mark key or null if not found
 */
function findTargetMarkKey(view: any, channel0: string): string | null {
  for (const [mark] of view.markState.entries()) {
    const markSlider = get(mark, 'slider');
    const hasMarkSlider =
      Object.keys(markSlider || {}).length > 0 &&
      Object.prototype.hasOwnProperty.call(markSlider, channel0);
    if (hasMarkSlider) {
      return String(mark.key || '');
    }
  }
  return null;
}

/**
 * Processes single-axis filtering for scenarios without independent scales.
 *
 * @param params - Single-axis filtering parameters
 * @returns Filtered domain array
 */
function processSingleAxisFilteringWithDomainUpdate({
  domain0,
  domain1,
  shouldFilterXAxis,
  enableAdaptiveFiltering,
  markDataPairs,
  adaptiveMode,
  scaleX,
  scaleY,
  channelDomain,
  hasOnlyXSlider,
  hasOnlyYSlider,
  isX,
}: {
  domain0: unknown[];
  domain1: unknown[];
  shouldFilterXAxis: boolean;
  enableAdaptiveFiltering: boolean;
  markDataPairs: any[];
  adaptiveMode: any;
  scaleX: RuntimeScale;
  scaleY: RuntimeScale;
  channelDomain: Record<string, unknown[]>;
  hasOnlyXSlider: boolean;
  hasOnlyYSlider: boolean;
  isX: boolean;
}): unknown[] {
  let filteredDomain: unknown[] = domain1;

  if (
    enableAdaptiveFiltering &&
    markDataPairs.length > 0 &&
    ((hasOnlyXSlider && isX) || (hasOnlyYSlider && !isX)) &&
    domain0?.length > 0
  ) {
    const singleAxisScaleInfo = extractSingleAxisScaleInfo(
      shouldFilterXAxis,
      scaleX,
      scaleY,
    );
    filteredDomain = processSingleAxisFiltering({
      markDataPairs,
      domain: domain0,
      scaleInfo: singleAxisScaleInfo,
      adaptiveMode,
      shouldFilterXAxis,
    });

    // Update channelDomain if filtering was applied
    updateChannelDomains(
      channelDomain,
      filteredDomain,
      shouldFilterXAxis,
      false,
    );
  }

  return filteredDomain;
}

/**
 * Creates the main value change handler for slider filtering.
 *
 * @param params - Handler creation parameters
 * @returns Throttled value change handler
 */
function createValueChangeHandler({
  getFiltering,
  setFiltering,
  domainsOf,
  view,
  independentScaleInfo,
  enableAdaptiveFiltering,
  hasOnlyXSlider,
  hasOnlyYSlider,
  adaptiveMode,
  scaleX,
  scaleY,
  scale,
  channelDomain,
  channel0,
  channel1,
  isX,
  emitter,
  eventName,
  setState,
  slider,
  prefix,
  hasState,
  update,
  wait,
  leading,
  trailing,
}: {
  getFiltering: () => boolean;
  setFiltering: (value: boolean) => void;
  domainsOf: (event: any) => [unknown[], unknown[]];
  view: any;
  independentScaleInfo: any;
  enableAdaptiveFiltering: boolean;
  hasOnlyXSlider: boolean;
  hasOnlyYSlider: boolean;
  adaptiveMode: any;
  scaleX: RuntimeScale;
  scaleY: RuntimeScale;
  scale: Record<string, RuntimeScale>;
  channelDomain: Record<string, unknown[]>;
  channel0: string;
  channel1: string;
  isX: boolean;
  emitter: any;
  eventName: string;
  setState: any;
  slider: any;
  prefix: string;
  hasState: boolean;
  update: () => Promise<void>;
  wait: number;
  leading: boolean;
  trailing: boolean;
}) {
  return throttle(
    async (event: any) => {
      const { initValue = false } = event;
      if (getFiltering() && !initValue) {
        return;
      }
      setFiltering(true);

      const { nativeEvent = true } = event;
      const { markDataPairs } = extractChannelValues(view);
      const hasIndependentScale =
        independentScaleInfo[`hasIndependent${channel1.toUpperCase()}`];

      if (hasIndependentScale) {
        // Handle multi-axis scenario
        const [domain0] = domainsOf(event);
        const shouldFilterXAxis = hasOnlyYSlider && !isX;
        const { filteredDomain, markToScaleMap } = processMultiAxisFiltering({
          view,
          domain0,
          shouldFilterXAxis,
          enableAdaptiveFiltering:
            enableAdaptiveFiltering &&
            ((hasOnlyXSlider && isX) || (hasOnlyYSlider && !isX)),
          markDataPairs,
          adaptiveMode,
          scaleX,
          scaleY,
          scale,
          channelDomain,
          independentScaleInfo,
          channel0,
        });

        // Update channelDomain to reflect the current filter state
        channelDomain[channel0] = domain0;

        emitFilterEvent(
          emitter,
          eventName,
          event,
          domain0,
          channelDomain,
          isX,
          nativeEvent,
        );
        updateSliderState(setState, slider, view, {
          domain0,
          filteredDomain,
          channel0,
          channel1,
          prefix,
          hasState,
          isMultiAxis: true,
          markToScaleMap,
          enableAdaptiveFiltering,
        });
      } else {
        // Handle single-axis scenario
        const [domain0, domain1] = domainsOf(event);
        const shouldFilterXAxis = hasOnlyYSlider && !isX;
        const filteredDomain = processSingleAxisFilteringWithDomainUpdate({
          domain0,
          domain1,
          shouldFilterXAxis,
          enableAdaptiveFiltering,
          markDataPairs,
          adaptiveMode,
          scaleX,
          scaleY,
          channelDomain,
          hasOnlyXSlider,
          hasOnlyYSlider,
          isX,
        });

        // Update channelDomain to reflect the current filter state
        channelDomain[channel0] = domain0;

        emitFilterEvent(
          emitter,
          eventName,
          event,
          domain0,
          channelDomain,
          isX,
          nativeEvent,
        );
        updateSliderState(setState, slider, view, {
          domain0,
          filteredDomain,
          channel0,
          channel1,
          prefix,
          hasState,
          isMultiAxis: false,
          markToScaleMap: undefined,
          enableAdaptiveFiltering,
        });
      }

      await update();
      setFiltering(false);
    },
    wait,
    { leading, trailing },
  );
}
