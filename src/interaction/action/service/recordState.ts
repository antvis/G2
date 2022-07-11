import { ActionComponent as AC } from '../../types';
import { RecordStateAction } from '../../../spec';

export type RecordStateOptions = Omit<RecordStateAction, 'type'>;

export const RecordState: AC<RecordStateOptions> = (options) => {
  const { state } = options;
  return (context) => {
    const { shared } = context;
    shared.currentState = state;
    return context;
  };
};

RecordState.props = {};
