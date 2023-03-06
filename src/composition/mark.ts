import { CompositionComponent as CC } from '../runtime';
import { Mark as MarkComposition } from '../spec';

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
      padding,
      inset,
      insetLeft,
      insetTop,
      insetRight,
      insetBottom,
      margin,
      marginLeft,
      marginBottom,
      marginTop,
      marginRight,
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
      labelTransform,
      parentKey,
      clip,
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
        padding,
        paddingLeft,
        paddingRight,
        paddingTop,
        inset,
        insetLeft,
        insetTop,
        insetRight,
        insetBottom,
        paddingBottom,
        theme,
        coordinate,
        component,
        interaction,
        frame,
        title,
        labelTransform,
        margin,
        marginLeft,
        marginBottom,
        marginTop,
        marginRight,
        parentKey,
        clip,
        marks: [{ ...mark, key: `${key}-0`, data }],
      },
    ];
  };
};

Mark.props = {};
