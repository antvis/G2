import {
  InferComponent as IC,
  TabularData,
  Primitive,
  Encoding,
  EncodeFunction,
} from '../runtime';
import { mapObject } from '../utils';

export type MayBeTypeOptions = {
  data: TabularData;
};

export const MayBeType: IC<MayBeTypeOptions> = ({ data }) => {
  return (encodings) =>
    mapObject(encodings, (value) => {
      const typing = (v: Encoding) => {
        if (typeof v === 'object') return v;
        return { type: inferType(data, v), value: v };
      };
      return Array.isArray(value) ? value.map(typing) : typing(value);
    });
};

MayBeType.props = {};

function inferType(
  data: Record<string, Primitive>[],
  encoding: Primitive | EncodeFunction,
) {
  if (typeof encoding === 'function') return 'transform';
  if (typeof encoding === 'string' && data?.[0]?.[encoding] !== undefined) {
    return 'field';
  }
  return 'constant';
}
