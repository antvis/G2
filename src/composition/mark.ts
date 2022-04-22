import { CompositionComponent as CC } from '../runtime';
import { MarkComposition } from '../spec';

export type MarkOptions = Omit<MarkComposition, 'type'>;

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
        marks: [{ ...mark, key: `${key}-0`, data }],
      },
    ];
  };
};

Mark.props = {};
