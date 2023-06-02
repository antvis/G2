import { SliderFilter } from './sliderFilter';

export const SCROLLBAR_CLASS_NAME = 'g2-scrollbar';

export function ScrollbarFilter(options: any = {}) {
  return (context, _, emitter) => {
    const { view, container } = context;
    const scrollbars = container.getElementsByClassName(SCROLLBAR_CLASS_NAME);
    if (!scrollbars.length) return () => {};
    const { scale } = view;
    const { x: scaleX, y: scaleY } = scale;
    const channelDomain = {
      x: scaleX.getOptions().domain,
      y: scaleY.getOptions().domain,
    };
    scaleX.update({
      domain: scaleX.getOptions().expectedDomain,
    });
    scaleY.update({
      domain: scaleY.getOptions().expectedDomain,
    });
    const interaction = SliderFilter({
      ...options,
      channelDomain,
      className: SCROLLBAR_CLASS_NAME,
      prefix: 'scrollbar',
      hasState: true,
      setValue: (component, values) => component.setValue(values[0]),
    });
    return interaction(context, _, emitter);
  };
}
