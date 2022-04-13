import { ActionComponent as AC } from '../../runtime';
import { PlotAction } from '../../spec';

export type PlotOptions = Omit<PlotAction, 'type'>;

export const Plot: AC<PlotOptions> = () => {
  return (context) => {
    const { shared, update } = context;
    const { updater } = shared;
    update(updater);
    return context;
  };
};

Plot.props = {};
