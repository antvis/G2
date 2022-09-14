import { DataComponent as DC } from '../runtime';
import { CustomDataTransform } from '../spec';

export type CustomOptions = Omit<CustomDataTransform, 'type'>;

/**
 * Connector transfom by function.
 */
export const Custom: DC<CustomOptions> = (options) => {
  const { callback } = options;
  return (data) => (callback ? callback(data) : data);
};

Custom.props = {};
