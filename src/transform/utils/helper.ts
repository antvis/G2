import { Primitive } from '../../runtime';

export function column(value: Primitive[], field?: string) {
  if (value === null) return undefined;
  return { type: 'column', value, field };
}

export function inferredColumn(value: Primitive[], field?: string) {
  const c = column(value, field);
  return { ...c, inferred: true };
}

export function visualColumn(value: Primitive[], field?: string) {
  if (value === null) return undefined;
  return { type: 'column', value, field, visual: true };
}

export function nonConstantColumn(value: Primitive[], field?: string) {
  const c = column(value, field);
  return { ...c, constant: false };
}

export function constant(I: number[], value: any) {
  const array = [];
  for (const i of I) array[i] = value;
  return array;
}

export function columnOf(encode, key: string): [Primitive[], string] {
  const channel = encode[key];
  if (!channel) return [null, null];
  const { value, field = null } = channel;
  return [value, field];
}

export function maybeColumnOf(
  encode,
  ...K: (string | Primitive[])[]
): [Primitive[], string] {
  for (const key of K) {
    if (typeof key === 'string') {
      const [KV, fv] = columnOf(encode, key);
      if (KV !== null) return [KV, fv];
    } else {
      return [key, null];
    }
  }
  return [null, null];
}

export function isObject(d) {
  if (d instanceof Date) return false;
  return typeof d === 'object';
}
