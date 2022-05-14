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
    { name: 'enterType' },
    { name: 'enterDelay' },
    { name: 'enterDuration' },
    { name: 'enterEasing' },
    { name: 'key', scale: 'identity' },
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'd' },
    { name: 'shape' },
  ],
  infer: [{ type: 'maybeTuple' }],
  shapes: ['annotation.connector'],
};
