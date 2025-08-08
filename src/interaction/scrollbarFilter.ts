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
    const scaleXOptions = scaleX.getOptions();
    if (
      get(scaleXOptions, 'domain.length') ===
      get(scaleXOptions, 'expectedDomain.length')
    ) {
      scaleX.update({ domain: scaleXOptions.expectedDomain });
    }

    const scaleYOptions = scaleY.getOptions();
    if (
      get(scaleYOptions, 'domain.length') ===
      get(scaleYOptions, 'expectedDomain.length')
    ) {
      scaleY.update({ domain: scaleYOptions.expectedDomain });
    }

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
