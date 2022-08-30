import { DataComponent as DC } from '../runtime';
import { ConnectorTransform } from '../spec';

export type ConnectorOptions = Omit<ConnectorTransform, 'type'>;

/**
 * Connector transfom by function.
 */
export const Connector: DC<ConnectorOptions> = (options) => {
  const { callback } = options;
  return (data) => (callback ? callback(data) : data);
};

Connector.props = {};
