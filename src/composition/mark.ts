import { CompositionComponent as CC } from '../runtime';
import { MarkComposition } from '../spec';

export type MarkOptions = Omit<MarkComposition, 'type'>;

// @todo Move this to runtime.
export const Mark: CC<MarkOptions> = () => {
  return (options) => {
    const {
      width,
      height,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      data,
      coordinate,
      theme,
      component,
      interaction,
      x,
      y,
      key,
      frame,
      title,
      labelLayout,
      ...mark
    } = options;

    return [
      {
        type: 'standardView',
        x,
        y,
        key,
        width,
        height,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
        theme,
        coordinate,
        component,
        interaction,
        frame,
        title,
        labelLayout,
        marks: [{ ...mark, key: `${key}-0`, data }],
      },
    ];
  };
};

Mark.props = {};
