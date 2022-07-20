import { ActionComponent as AC } from '../../types';
import { RecordCurrentPointAction } from '../../../spec';

export type RecordCurrentPointOptions = Omit<RecordCurrentPointAction, 'type'>;

export const RecordCurrentPoint: AC<RecordCurrentPointOptions> = (options) => {
  const { clear } = options;
  return (context) => {
    const { shared, event } = context;
    const { offsetX, offsetY } = event;

    if (clear) {
      shared.currentPoint = null;
    } else {
      shared.currentPoint = [offsetX, offsetY];
    }

    return context;
  };
};

RecordCurrentPoint.props = {};
