import { ActionComponent as AC } from '../../types';
import { RecordTipAction } from '../../../spec';

export type RecordTipOptions = Omit<RecordTipAction, 'type'>;

/**
 * If target shape has tip attributes, store in shared variables.
 * User specified options have more higher priority.
 */
export const RecordTip: AC<RecordTipOptions> = (options) => {
  const { tip } = options;
  return (context) => {
    const { shared, event } = context;
    const { target } = event;
    shared.tip = tip ?? target.style.tip;
    return context;
  };
};

RecordTip.props = {};
