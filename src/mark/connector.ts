import { MarkComponent as MC } from '../runtime';
import { ConnectorMark } from '../spec';
import { ConnectorShape } from '../shape';
import {
  baseAnnotationChannels,
  basePostInference,
  basePreInference,
} from './utils';
import { Link } from './link';

const shape = {
  connector: ConnectorShape,
};

export type ConnectorOptions = Omit<ConnectorMark, 'type'>;

export const Connector: MC<ConnectorOptions> = (...args) => {
  return Link(...args);
};

Connector.props = {
  defaultShape: 'connector',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseAnnotationChannels({ shapes: Object.keys(shape) }),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
};
