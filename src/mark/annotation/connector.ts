import {
  baseAnnotationChannels,
  basePostInference,
  basePreInference,
} from '../utils';
import { MarkComponent as MC } from '../../runtime';
import { AnnotationConnector } from '../../spec';
import { Edge } from '../geometry/edge';

export type ConnectorOptions = Omit<AnnotationConnector, 'type'>;

export const Connector: MC<ConnectorOptions> = () => {
  return Edge();
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
