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

Connector.props = {
  defaultShape: 'connector',
  defaultLabelShape: 'label',
  channels: [
    ...baseAnnotationChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
  shapes: ['connector'],
};
