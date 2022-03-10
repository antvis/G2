import { EncodeComponent as EC, Primitive } from '../runtime';

export type ConstantOptions = {
  value: Primitive;
};

export const Constant: EC<ConstantOptions> = ({ value }) => {
  return (data) => data.map(() => value);
};

Constant.props = {};
