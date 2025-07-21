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

    const interaction = SliderFilter({
      initDomain,
      className: SCROLLBAR_CLASS_NAME,
      prefix: 'scrollbar',
      hasState: true,
      setValue: (component, values) => component.setValue(values[0]),
      getInitValues: (scrollbar) => {
        const values = scrollbar.slider.attributes.values;
        if (values[0] !== 0) return values;
      },
      ...options,
    });
    return interaction(context, _, emitter);
  };
}
