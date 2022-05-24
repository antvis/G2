import { EncodeComponent as EC } from '../runtime';
import { ColumnEncode } from '../spec';

export type ColumnOptions = Omit<ColumnEncode, 'type'>;

/**
 * Extract a column of data specified in encoding.
 */
export const Column: EC<ColumnOptions> = ({ value }) => {
  return () => value;
};

Column.props = {};
