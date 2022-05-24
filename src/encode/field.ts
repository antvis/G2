import { EncodeComponent as EC } from '../runtime';
import { FieldEncode } from '../spec';

export type FieldOptions = Omit<FieldEncode, 'type'>;

/**
 * Extract a column of data with specified field.
 */
export const Field: EC<FieldOptions> = ({ value }) => {
  return (data) => data.map((d) => d[value]);
};

Field.props = {};
