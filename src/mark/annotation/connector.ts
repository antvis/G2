import {
  baseAnnotationChannels,
  basePostInference,
  basePreInference,
} from '../utils';
import { MarkComponent as MC } from '../../runtime';
import { AnnotationConnector } from '../../spec';
import { Link } from '../geometry/link';

export type ConnectorOptions = Omit<AnnotationConnector, 'type'>;

export const Connector: MC<ConnectorOptions> = (...args) => {
  return Link(...args);
};

Connector.props = {
  defaultShape: 'annotation.connector',
  channels: [
    ...baseAnnotationChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
  shapes: ['annotation.connector'],
};
