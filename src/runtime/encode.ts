import { mapObject } from '../utils/array';
import { TabularData, Encodings, Encoding, Primitive } from './types/common';
import { G2EncodeOptions } from './types/options';

export function inferEncodeType(
  encode: Encodings,
  data: TabularData,
): Record<string | symbol, G2EncodeOptions> {
  return mapObject(encode, (value) => {
    const typing = (v: Encoding) => {
      if (typeof v === 'object') return v;
      return { type: inferType(data, v), value: v };
    };
    return Array.isArray(value) ? value.map(typing) : typing(value);
  });
}

function inferType(
  data: Record<string, Primitive>[],
  encoding: Primitive | ((...args: any[]) => any),
): string {
  if (typeof encoding === 'function') return 'transform';
  if (typeof encoding === 'string' && data?.[0]?.[encoding] !== undefined) {
    return 'field';
  }
  return 'constant';
}
