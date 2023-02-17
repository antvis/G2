import { MarkComponent as MC } from '../runtime';
import { ConnectorMark } from '../spec';
import {
  baseAnnotationChannels,
  basePostInference,
  basePreInference,
} from './utils';
import { Link } from './link';

export type ConnectorOptions = Omit<ConnectorMark, 'type'>;

export const Connector: MC<ConnectorOptions> = (...args) => {
  return Link(...args);
};

const shapes = ['connector'];

Connector.props = {
  defaultShape: 'connector',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseAnnotationChannels({ shapes }),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
};
