import { ActionComponent as AC } from '../../types';
import { PlotAction } from '../../../spec';

export type PlotOptions = Omit<PlotAction, 'type'>;

export const Plot: AC<PlotOptions> = () => {
  return (context) => {
    const { shared, update } = context;
    const { updatedOptions } = shared;
    update(updatedOptions);
    return context;
  };
};

Plot.props = {};
