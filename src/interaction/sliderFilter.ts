import { deepMix, throttle, upperFirst } from '@antv/util';
import { CustomEvent } from '@antv/g';
import { isTranspose } from '../utils/coordinate';
import { invert, domainOf, abstractOf } from '../utils/scale';

export const SLIDER_CLASS_NAME = 'slider';

function filterDataByDomain(options, scaleOptions) {
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
        slider: {
          ...(mark.slider.x && { x: { preserve: true } }),
          ...(mark.slider.y && { y: { preserve: true } }),
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

function abstractValue(values, scale, reverse) {
  const [x, x1] = values;
  const v = reverse ? (d) => 1 - d : (d) => d;
  const d0 = invert(scale, v(x), true);
  const d1 = invert(scale, v(x1), false);
  return domainOf(scale, [d0, d1]);
}

function extentOf(domain) {
  return [domain[0], domain[domain.length - 1]];
}

/**
 * @todo Support click to reset after fix click and dragend conflict.
 */
export function SliderFilter({
  wait = 50,
  leading = true,
  trailing = false,
}: any) {
  return (context, _, emitter) => {
    const { container, view, options, update } = context;
    const sliders = container.getElementsByClassName(SLIDER_CLASS_NAME);
    if (!sliders.length) return () => {};

    let filtering = false;
    const { scale, coordinate } = view;
    const { x: scaleX, y: scaleY } = scale;
    const transposed = isTranspose(coordinate);

    const channelOf = (orientation) => {
      const channel0 = orientation === 'vertical' ? 'y' : 'x';
      const channel1 = orientation === 'vertical' ? 'x' : 'y';
      if (transposed) return [channel1, channel0];
      return [channel0, channel1];
    };

    const sliderHandler = new Map();
    const emitHandlers = new Set<[string, (event: any) => void]>();

    // Store current domain of x and y scale.
    const channelDomain = {
      x: scaleX.getOptions().domain,
      y: scaleY.getOptions().domain,
    };

    for (const slider of sliders) {
      const { orientation } = slider.attributes;
      const [channel0, channel1] = channelOf(orientation);
      const eventName = `slider${upperFirst(channel0)}:filter`;
      const isX = channel0 === 'x';
      const domainsOf = (event) => {
        // From abstract values.
        if (event.data) {
          const { selection } = event.data;
          const [X = extentOf(channelDomain.x), Y = extentOf(channelDomain.y)] =
            selection;
          return isX
            ? [domainOf(scaleX, X), domainOf(scaleY, Y)]
            : [domainOf(scaleY, Y), domainOf(scaleX, X)];
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
        async (event) => {
          if (filtering) return;
          filtering = true;

          const { nativeEvent = true } = event;

          // Get and update domain.
          const [domain0, domain1] = domainsOf(event);
          channelDomain[channel0] = domain0;
          channelDomain[channel1] = domain1;

          // Filter data.
          const newOptions = filterDataByDomain(options, {
            [channel0]: { domain: domain0 },
            [channel1]: { domain: domain1 },
          });

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

          await update(newOptions);
          filtering = false;
        },
        wait,
        { leading, trailing },
      );

      const emitHandler = (event) => {
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
        const V = isX ? abstractOf(X, scaleX) : abstractOf(Y, scaleY);
        slider.setValues(V);
      };

      emitter.on(eventName, emitHandler);

      slider.addEventListener('valuechange', onValueChange);
      sliderHandler.set(slider, onValueChange);
      emitHandlers.add([eventName, emitHandler]);
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
