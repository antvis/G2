import { TransformComponent as TC } from '../../runtime';
import { ConnectorTransform } from '../../spec';
import { merge } from '../utils/helper';

export type ConnectorOptions = Omit<ConnectorTransform, 'type'>;

/**
 * Connector transfom by function.
 */
export const Connector: TC<ConnectorOptions> = (options) => {
  return merge(({ data }) => {
    const { callback } = options;

    return {
      data: callback ? callback(data) : data,
    };
  });
};

Connector.props = {
  category: 'preprocessor',
};
