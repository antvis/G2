import { EncodeComponent as EC } from '../runtime';
import { TransformEncode } from '../spec';

export type TransformOptions = Omit<TransformEncode, 'type'>;

/**
 * Extract a column of data with specified map function from data.
 * Each datum in the array is not visual data by default.
 * Specifying identity scale for related channel explicitly will treat them as visual data.
 */
export const Transform: EC<TransformOptions> = ({ value }) => {
  return (data) => data.map(value);
};

Transform.props = {};
