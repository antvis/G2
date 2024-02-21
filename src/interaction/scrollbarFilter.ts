import { SliderFilter } from './sliderFilter';

export const SCROLLBAR_CLASS_NAME = 'g2-scrollbar';

export function ScrollbarFilter(options: any = {}) {
  return (context, _, emitter) => {
    const { view, container } = context;
    const scrollbars = container.getElementsByClassName(SCROLLBAR_CLASS_NAME);
    if (!scrollbars.length) return () => {};
    const { scale } = view;
    const { x: scaleX, y: scaleY } = scale;

    // The filtered domain, computed by the ratio attribute.
    const initDomain = {
      x: [...scaleX.getOptions().domain],
      y: [...scaleY.getOptions().domain],
    };

    // The ordinal domain for each channel.
    scaleX.update({ domain: scaleX.getOptions().expectedDomain });
    scaleY.update({ domain: scaleY.getOptions().expectedDomain });

    const interaction = SliderFilter({
      ...options,
      initDomain,
      className: SCROLLBAR_CLASS_NAME,
      prefix: 'scrollbar',
      hasState: true,
      setValue: (component, values) => component.setValue(values[0]),
      getInitValues: (scrollbar) => {
        const values = scrollbar.slider.attributes.values;
        if (values[0] !== 0) return values;
      },
    });
    return interaction(context, _, emitter);
  };
}
