import { deepMix, throttle, upperFirst } from '@antv/util';
import { CustomEvent } from '@antv/g';
import { isTranspose } from '../utils/coordinate';
import {
  invert,
  domainOf,
  sliderAbstractOf,
  isOrdinalScale,
} from '../utils/scale';
import { SliderFilterInteraction } from '../spec/interaction';
import { extractChannelValues } from './utils';

export const SLIDER_CLASS_NAME = 'slider';

interface FilterDataByDomainOptions {
  marks: any[];
  [key: string]: any;
}

interface ScaleOptions {
  [key: string]: any;
}

interface CalculateFilteredDomainOptions {
  isTargetDiscrete: boolean;
  filteredValues: number[];
  shouldPreserveZeroBaseline: boolean;
}

function filterDataByDomain(
  options: FilterDataByDomainOptions,
  scaleOptions: ScaleOptions,
  prefix: string,
  hasState = false,
  channel0 = 'x',
  channel1 = 'y',
) {
  const { marks } = options;
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
        // Don't rerender sliders.
        [prefix]: {
          ...(mark[prefix]?.[channel0] && {
            [channel0]: { preserve: true, ...(hasState && { ratio: null }) },
          }),
          // Only remove ratio state with filtered channel.
          ...(mark[prefix]?.[channel1] && {
            [channel1]: { preserve: true },
          }),
        },
        animate: false,
      },
    ),
  );

  // Rerender and update view.
  return {
    ...options,
    marks: newMarks,
    clip: true, // Clip shapes out of plot area.
    animate: false,
  };
}

function abstractValue(values: [number, number], scale: any, reverse: boolean) {
  const [x, x1] = values;
  const v = reverse ? (d: number) => 1 - d : (d: number) => d;
  const d0 = invert(scale, v(x), true);
  const d1 = invert(scale, v(x1), false);
  return domainOf(scale, [d0, d1]);
}

function extentOf(domain: any[]) {
  return [domain[0], domain[domain.length - 1]];
}

function getUniqueSortedValues(values: number[]): any[] {
  // Use Set to remove duplicates, then sort
  const uniqueValues = Array.from(new Set(values));
  return uniqueValues.sort((a, b) => a - b);
}

function calculateFilteredDomain({
  isTargetDiscrete,
  filteredValues,
  shouldPreserveZeroBaseline,
}: CalculateFilteredDomainOptions): any[] {
  if (isTargetDiscrete) {
    // Target is discrete scale: use unique filtered values as domain
    return getUniqueSortedValues(filteredValues);
  } else {
    // Target is continuous scale: use value range
    const min = Math.min(...filteredValues);
    const max = Math.max(...filteredValues);
    // If the original domain starts from 0, keep 0 as the lower limit
    return shouldPreserveZeroBaseline ? [0, max] : [min, max];
  }
}

/**
 * Enhanced multi-mark filtering for calculating filtered domain
 * considering data from multiple marks in the same view
 */

function filterValuesByDiscreteDomain(
  domain: any[],
  sourceValues: number[],
  targetValues: number[],
  isTargetDiscrete: boolean,
  shouldPreserveZeroBaseline: boolean,
): any[] {
  const filteredValues: number[] = [];

  // Discrete scale processing logic
  for (let i = 0; i < sourceValues.length; i++) {
    const value = sourceValues[i];
    // Check if value is in domain array
    if (domain.includes(value) && i < targetValues.length) {
      filteredValues.push(targetValues[i]);
    }
  }

  // Calculate filtered domain for discrete scale
  if (filteredValues.length > 0) {
    return calculateFilteredDomain({
      isTargetDiscrete,
      filteredValues,
      shouldPreserveZeroBaseline,
    });
  }

  return [];
}

function filterValuesByContinuousDomain(
  domain: any[],
  sourceValues: number[],
  targetValues: number[],
  isTargetDiscrete: boolean,
  shouldPreserveZeroBaseline: boolean,
): any[] {
  const filteredValues: number[] = [];
  const [min, max] = [Math.min(...domain), Math.max(...domain)];

  // Continuous scale processing logic
  for (let i = 0; i < sourceValues.length; i++) {
    const value = sourceValues[i];
    // Use value range comparison
    if (value >= min && value <= max && i < targetValues.length) {
      filteredValues.push(targetValues[i]);
    }
  }

  // Calculate filtered domain for continuous scale
  if (filteredValues.length > 0) {
    return calculateFilteredDomain({
      isTargetDiscrete,
      filteredValues,
      shouldPreserveZeroBaseline,
    });
  }

  return [];
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
  enableAdaptive = false,
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
    const { scale, coordinate, layout } = view;
    const { paddingLeft, paddingTop, paddingBottom, paddingRight } = layout;
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

    // Store current domain of x and y scale.
    const channelDomain = {
      x: initDomain.x || scaleX.getOptions().domain,
      y: initDomain.y || scaleY.getOptions().domain,
    };

    // Slider configuration detection: Determine the current existing slider types
    // 1. Only X slider: Adaptively adjust Y-axis range when filtering on X-axis
    // 2. Only Y slider: Adaptively adjust X-axis range when filtering on Y-axis
    // 3. Both sliders exist: Work independently without adaptive adjustment

    const sliderArray = Array.from(sliders);

    const hasSliderOfType = (type: string) =>
      sliderArray.some((slider: any) => {
        const { orientation } = slider.attributes;
        const [channel0] = channelOf(orientation);
        return channel0 === type;
      });

    const hasOnlyXSlider = hasSliderOfType('x') && !hasSliderOfType('y');
    const hasOnlyYSlider = hasSliderOfType('y') && !hasSliderOfType('x');

    // Determine whether to enable adaptive filtering based on enableAdaptive parameter and slider types
    const enableAdaptiveFiltering =
      enableAdaptive && (hasOnlyXSlider || hasOnlyYSlider);

    for (const slider of sliders) {
      const { orientation } = slider.attributes;
      const [channel0, channel1] = channelOf(orientation);
      const eventName = `${prefix}${upperFirst(channel0)}:filter`;
      const isX = channel0 === 'x';
      const { ratio: ratioX } = scaleX.getOptions();
      const { ratio: ratioY } = scaleY.getOptions();
      const domainsOf = (event: any) => {
        // From abstract values.
        if (event.data) {
          const { selection } = event.data;
          const [X = extentOf(channelDomain.x), Y = extentOf(channelDomain.y)] =
            selection;
          return isX
            ? [domainOf(scaleX, X, ratioX), domainOf(scaleY, Y, ratioY)]
            : [domainOf(scaleY, Y, ratioY), domainOf(scaleX, X, ratioX)];
        }

        // From visual values.
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

      const onValueChange = throttle(
        async (event: any) => {
          const { initValue = false } = event;
          if (filtering && !initValue) return;
          filtering = true;

          const { nativeEvent = true } = event;

          // Extract x and y channel data from marks (now supports multi-mark)
          const { xChannelValues, yChannelValues } = extractChannelValues(view);

          // Get and update domain.
          const [domain0, domain1] = domainsOf(event);

          let filteredDomain = domain1;
          if (
            enableAdaptiveFiltering &&
            xChannelValues.length > 0 &&
            yChannelValues.length > 0
          ) {
            // When only X slider exists, filter Y domain based on X domain
            // When only Y slider exists, filter X domain based on Y domain
            if ((hasOnlyXSlider && isX) || (hasOnlyYSlider && !isX)) {
              // Determine which axis we should filter
              const shouldFilterXAxis = hasOnlyYSlider && !isX;
              const domain = domain0 || [];
              if (domain.length > 0) {
                const sourceValues = shouldFilterXAxis
                  ? yChannelValues
                  : xChannelValues;
                const targetValues = shouldFilterXAxis
                  ? xChannelValues
                  : yChannelValues;

                // Get current scale to determine if it's a discrete scale
                const currentScale = shouldFilterXAxis ? scaleY : scaleX;
                const targetScale = shouldFilterXAxis ? scaleX : scaleY;
                const isSourceDiscrete = isOrdinalScale(currentScale);
                const isTargetDiscrete = isOrdinalScale(targetScale);

                // Check if the target scale's original domain starts from 0, used to preserve 0 baseline
                const targetOriginalDomain = targetScale.getOptions().domain;
                const shouldPreserveZeroBaseline =
                  !isTargetDiscrete &&
                  targetOriginalDomain &&
                  targetOriginalDomain.length >= 2 &&
                  targetOriginalDomain[0] === 0;

                // Simplified multi-mark filtering logic
                if (isSourceDiscrete) {
                  filteredDomain = filterValuesByDiscreteDomain(
                    domain,
                    sourceValues,
                    targetValues,
                    isTargetDiscrete,
                    shouldPreserveZeroBaseline,
                  );
                } else {
                  filteredDomain = filterValuesByContinuousDomain(
                    domain,
                    sourceValues,
                    targetValues,
                    isTargetDiscrete,
                    shouldPreserveZeroBaseline,
                  );
                }

                if (filteredDomain.length > 0) {
                  channelDomain[shouldFilterXAxis ? 'x' : 'y'] = filteredDomain;
                }
              }
            }
          }

          if (nativeEvent) {
            // Emit events.
            const X = isX ? domain0 : domain1;
            const Y = isX ? domain1 : domain0;
            emitter.emit(eventName, {
              ...event,
              nativeEvent,
              data: { selection: [extentOf(X), extentOf(Y)] },
            });
          }
          // Update the current slider
          setState(slider, (options: any) => ({
            ...filterDataByDomain(
              options,
              // Set nice to false to avoid modify domain.
              // Only update domain of current slider / scrollbar.
              {
                [channel0]: { domain: domain0, nice: false },
                // Only apply adaptive filtering when there's only one slider
                ...(enableAdaptiveFiltering
                  ? {
                      [channel1]: {
                        domain: filteredDomain,
                        nice: false,
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

          await update();
          filtering = false;
        },
        wait,
        { leading, trailing },
      );

      const emitHandler = (event: any) => {
        const { nativeEvent } = event;
        if (nativeEvent) return;

        const { data } = event;
        const { selection } = data;
        const [X, Y] = selection;

        // Update data.
        slider.dispatchEvent(
          new CustomEvent('valuechange', {
            data,
            nativeEvent: false,
          }),
        );

        // Update slider.
        // For slider display, use direct index-based mapping instead of scale.map()
        // to avoid inaccuracies caused by padding, band width, etc.

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
        // Init values.
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
