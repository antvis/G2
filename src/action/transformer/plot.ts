import { ActionComponent as AC } from '../../runtime';
import { PlotAction } from '../../spec';

export type PlotOptions = Omit<PlotAction, 'type'>;

export const Plot: AC<PlotOptions> = () => {
  return (context) => {
    const { updater, update } = context;
    update(updater);
    return context;
  };
};

Plot.props = {};
