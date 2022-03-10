import { EncodeComponent as EC, Primitive } from '../runtime';

export type TransformOptions = {
  value: (
    value: Record<string, Primitive>,
    index: number,
    array: Record<string, Primitive>[],
  ) => Primitive;
};

export const Transform: EC<TransformOptions> = ({ value }) => {
  return (data) => data.map(value);
};

Transform.props = {};
