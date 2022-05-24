import { EncodeComponent as EC } from '../runtime';
import { ConstantEncode } from '../spec';

export type ConstantOptions = Omit<ConstantEncode, 'type'>;

/**
 * Extract a column of data filled with the specified constant.
 */
export const Constant: EC<ConstantOptions> = ({ value }) => {
  return (data) => data.map(() => value);
};

Constant.props = {};
