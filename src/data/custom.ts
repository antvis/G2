import { DataComponent as DC } from '../runtime';
import { CustomDataTransform } from '../spec';
import { identity } from '../utils/helper';

export type CustomOptions = Omit<CustomDataTransform, 'type'>;

/**
 * Connector transfom by function.
 */
export const Custom: DC<CustomOptions> = (options) => {
  const { callback = identity } = options;
  return (data) => callback(data);
};

Custom.props = {};
