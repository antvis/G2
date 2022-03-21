import { EncodeComponent as EC } from '../runtime';
import { ConstantEncode } from '../spec';

export type ConstantOptions = Omit<ConstantEncode, 'type'>;

/**
 * Extract an array filled with the specified constant from the data.
 */
export const Constant: EC<ConstantOptions> = ({ value }) => {
  return (data) => data.map(() => value);
};

Constant.props = {};
