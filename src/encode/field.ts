import { EncodeComponent as EC } from '../runtime';

export type FieldOptions = {
  value: string;
};

export const Field: EC<FieldOptions> = ({ value }) => {
  return (data) => data.map((d) => d[value]);
};

Field.props = {};
