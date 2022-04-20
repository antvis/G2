import { CompositionComponent as CC } from '../runtime';
import { ViewComposition } from '../spec';

export type ViewOptions = Omit<ViewComposition, 'type'>;

export const View: CC<ViewOptions> = () => {
  return (options) => {
    const { children = [], data: viewData, ...rest } = options;
    const marks = children.map(({ data = viewData, ...rest }) => ({
      data,
      ...rest,
    }));
    return [{ ...rest, marks, type: 'standardView' }];
  };
};

View.props = {};
