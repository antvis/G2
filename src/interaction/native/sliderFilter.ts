import { deepMix, throttle } from '@antv/util';
import { invert, domainOf } from '../../utils/scale';

export const SLIDER_CLASS_NAME = 'slider';

function filterDataByDomain(options, scaleOptions) {
  const { marks } = options;
  const newMarks = marks.map((mark) =>
    deepMix(
      {
        // Hide label to keep smooth transition.
        axis: {
          x: { labelTransforms: [{ type: 'hide' }] },
          y: { labelTransforms: [{ type: 'hide' }] },
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

function abstractValue(values, scale) {
  const [x, x1] = values;
  const d0 = invert(scale, x, true);
  const d1 = invert(scale, x1, false);
  return domainOf(scale, [d0, d1]);
}

/**
 * @todo Support click to reset after fix click and dragend conflict.
 */
export function SliderFilter({
  wait = 50,
  leading = true,
  trailing = false,
}: any) {
  return (context) => {
    const { container, view, options, update } = context;
    const sliders = container.getElementsByClassName(SLIDER_CLASS_NAME);
    if (!sliders.length) return;

    let filtering = false;
    const { scale } = view;
    const { x: scaleX, y: scaleY } = scale;

    const sliderHandler = new Map();

    // Store current domain of x and y scale.
    const channelDomain = {
      x: scaleX.getOptions().domain,
      y: scaleY.getOptions().domain,
    };

    for (const slider of sliders) {
      const { orient } = slider.attributes;

      const onValueChange = throttle(
        async (event) => {
          const { value: values } = event.detail;
          if (filtering) return;
          filtering = true;

          // Update domain of the current channel.
          const channel0 = orient === 'vertical' ? 'y' : 'x';
          const scale0 = scale[channel0];
          const domain0 = abstractValue(values, scale0);
          channelDomain[channel0] = domain0;

          // Get domain of the other channel.
          const channel1 = orient === 'vertical' ? 'x' : 'y';
          const domain1 = channelDomain[channel1];

          // Filter data.
          const newOptions = filterDataByDomain(options, {
            [channel0]: { domain: domain0 },
            [channel1]: { domain: domain1 },
          });
          await update(newOptions);
          filtering = false;
        },
        wait,
        { leading, trailing },
      );

      slider.addEventListener('valuechange', onValueChange);
      sliderHandler.set(slider, onValueChange);
    }

    return () => {
      for (const [slider, handler] of sliderHandler) {
        slider.removeEventListener('valuechange', handler);
      }
    };
  };
}
